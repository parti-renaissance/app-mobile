import React from "react";
import { ListRenderItem, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  isPollExtraMultipleChoicesAnswer,
  isPollExtraSingleChoiceAnswer,
  PollExtraAnswer,
  PollExtraCompoundAnswer,
  PollExtraMultipleChoicesAnswer,
  PollExtraSingleChoiceAnswer,
  PollExtraTextAnswer,
} from "../../../../../core/entities/PollExtraAnswer";
import {
  PollExtraQuestion,
  PollExtraQuestionChoiceOptions,
  PollExtraQuestionCompoundOptions,
  PollExtraQuestionPage,
} from "../../../../../core/entities/PollExtraQuestion";
import { StepType } from "../../../../../core/entities/StepType";
import { Spacing } from "../../../../../styles";
import PollDetailQuestionChoice from "../../../../pollDetail/PollDetailQuestionChoice";
import { PollDetailQuestionChoiceViewModel } from "../../../../pollDetail/PollDetailQuestionChoiceViewModel";
import PollDetailQuestionInput from "../../../../pollDetail/PollDetailQuestionInput";
import { PollDetailComponentProvider } from "../../../../pollDetail/providers/PollDetailComponentProvider";
import QualificationDescription from "../../qualification/QualificationDescription";
import QualificationFormUserData from "../../qualification/QualificationFormUserData";
import { QualificationResult } from "../DoorToDoorQuestionResult";
import { PollExtraQuestionMapper, QUESTION_CODE_GENDER } from "../mapper/PollExtraQuestionMapper";

const DUAL_CHOICE_COLUMNS = 2;

export class DoorToDoorQualificationComponentProvider
  implements PollDetailComponentProvider<QualificationResult>
{
  private onUpdate: () => void;
  private numberOfSteps: number;
  private pages: Array<PollExtraQuestionPage>;
  private storage = new Map<string, PollExtraAnswer>();

  constructor(pages: Array<PollExtraQuestionPage>, onUpdate: () => void) {
    this.numberOfSteps = pages.length;
    this.pages = pages;
    this.onUpdate = onUpdate;
  }

  public getStepComponent(step: number): JSX.Element {
    // eslint-disable-next-line security/detect-object-injection
    const page = this.pages[step];
    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={this.filterQuestionsUsingDependencies(page)}
        renderItem={this.renderItem}
        ListHeaderComponent={() => this.renderHeader(page.description)}
        ItemSeparatorComponent={this.renderSeparator}
      />
    );
  }

  private renderHeader = (description: string | null) => {
    return description ? (
      <QualificationDescription
        key="page_description"
        style={styles.header}
        description={description}
      />
    ) : null;
  };

  public getStepType(_step: number): StepType {
    return "doorToDoorQualification";
  }

  public getNumberOfSteps(): number {
    return this.numberOfSteps;
  }

  public isDataComplete(step: number): boolean {
    // eslint-disable-next-line security/detect-object-injection
    const page = this.pages[step];
    return this.filterQuestionsUsingDependencies(page).reduce(
      (previous: boolean, current: PollExtraQuestion): boolean => {
        if (current.options.required) {
          let nestedQUestionsComplete = true;
          if (current.type === "compound") {
            nestedQUestionsComplete = this.isCompoundDataComplete(current);
          }
          return previous && this.storage.has(current.code) && nestedQUestionsComplete;
        } else {
          return previous;
        }
      },
      true,
    );
  }

  private isCompoundDataComplete = (compoundQuestion: PollExtraQuestion) => {
    const children = (compoundQuestion.options as PollExtraQuestionCompoundOptions).children;
    const answer = this.storage.get(compoundQuestion.code)?.answer as
      | PollExtraCompoundAnswer
      | undefined;
    return children.reduce((previous: boolean, current: PollExtraQuestion): boolean => {
      return previous && answer?.values?.has(current.code) === true;
    }, true);
  };

  public getResult(): QualificationResult {
    return {
      qualificationAnswers: Array.from(this.storage.values()),
    };
  }

  private renderItem: ListRenderItem<PollExtraQuestion> = ({ item }) => {
    const answer = this.storage.get(item.code);
    switch (item.type) {
      case "dualChoice":
        const dualChoiceAnswer = (answer?.answer as PollExtraSingleChoiceAnswer) ?? {
          choiceId: "",
        };
        // Dual choice question is mapped to a single choice question with 2 columns
        return this.getSingleChoiceComponent(
          item.code,
          dualChoiceAnswer,
          PollExtraQuestionMapper.mapDualChoice(item, dualChoiceAnswer),
          DUAL_CHOICE_COLUMNS,
        );
      case "choice":
        return this.getChoiceComponent(item, answer);
      case "compound":
        return this.getCompoundComponent(
          item,
          (answer?.answer as PollExtraCompoundAnswer) ?? {
            values: new Map<string, string>(),
          },
        );
      case "text":
        return this.getTextComponent(
          item,
          (answer?.answer as PollExtraTextAnswer) ?? { value: "" },
        );
    }
  };

  private getChoiceComponent(
    item: PollExtraQuestion,
    answer: PollExtraAnswer | undefined,
  ): JSX.Element {
    const options = item.options as PollExtraQuestionChoiceOptions;
    if (options.multiple === true) {
      return this.getMultipleChoicesComponent(
        item,
        (answer?.answer as PollExtraMultipleChoicesAnswer) ?? { choiceIds: [] },
      );
    } else {
      const singleChoiceAnswer = (answer?.answer as PollExtraSingleChoiceAnswer) ?? {
        choiceId: "",
      };
      return this.getSingleChoiceComponent(
        item.code,
        singleChoiceAnswer,
        PollExtraQuestionMapper.mapSingleChoice(item, singleChoiceAnswer),
        (item.options as PollExtraQuestionChoiceOptions).columns,
      );
    }
  }

  private getSingleChoiceComponent(
    questionCode: string,
    answer: PollExtraSingleChoiceAnswer,
    viewModel: PollDetailQuestionChoiceViewModel,
    columns: number,
  ): JSX.Element {
    return (
      <PollDetailQuestionChoice
        viewModel={viewModel}
        toggleChoice={(choiceId: string) => {
          if (answer.choiceId === choiceId) {
            this.removeAnswer(questionCode);
          } else {
            this.saveAnswer({
              questionId: questionCode,
              answer: { choiceId: choiceId },
            });
          }
        }}
        columns={columns}
        choiceRadius={questionCode === QUESTION_CODE_GENDER ? Spacing.unit : undefined}
      />
    );
  }

  private getMultipleChoicesComponent(
    question: PollExtraQuestion,
    answer: PollExtraMultipleChoicesAnswer,
  ): JSX.Element {
    return (
      <PollDetailQuestionChoice
        key={question.code}
        viewModel={PollExtraQuestionMapper.mapMultipleChoice(question, answer)}
        toggleChoice={(choiceId) => {
          const choiceIds: Array<string> = answer?.choiceIds.includes(choiceId)
            ? answer?.choiceIds.filter((id) => id !== choiceId) ?? []
            : answer?.choiceIds.concat([choiceId]) ?? [];
          const newAnswer: PollExtraAnswer = {
            questionId: question.code,
            answer: { choiceIds: choiceIds },
          };
          if (choiceIds.length === 0) {
            this.removeAnswer(question.code);
          } else {
            this.saveAnswer(newAnswer);
          }
        }}
      />
    );
  }

  private getTextComponent(question: PollExtraQuestion, answer: PollExtraTextAnswer): JSX.Element {
    const viewModel = PollExtraQuestionMapper.mapInput(question, answer);
    return (
      <PollDetailQuestionInput
        key={question.code}
        viewModel={viewModel}
        onChangeText={(text) => {
          if (text === "") {
            this.removeAnswer(question.code);
          } else {
            this.saveAnswer({
              questionId: question.code,
              answer: { value: text },
            });
          }
        }}
      />
    );
  }

  private getCompoundComponent(
    question: PollExtraQuestion,
    answer: PollExtraCompoundAnswer,
  ): JSX.Element {
    return (
      <QualificationFormUserData
        key={question.code}
        viewModel={PollExtraQuestionMapper.mapCompound(
          question,
          answer ?? { values: new Map<string, string>() },
        )}
        onValueChange={(id: string, value: string) => {
          if (value === "") {
            answer.values.delete(id);
            if (answer.values.size === 0) {
              this.removeAnswer(question.code);
              return;
            }
          } else {
            answer.values.set(id, value);
          }
          this.saveAnswer({
            questionId: question.code,
            answer: answer,
          });
        }}
        onBlur={() => {}}
      />
    );
  }

  private renderSeparator = () => <View style={styles.separator} />;

  private saveAnswer(answer: PollExtraAnswer) {
    this.storage.set(answer.questionId, answer);
    this.onUpdate();
  }

  private removeAnswer(questionId: string) {
    this.storage.delete(questionId);
    this.onUpdate();
  }

  private filterQuestionsUsingDependencies = (
    page: PollExtraQuestionPage,
  ): Array<PollExtraQuestion> => {
    return page.questions.filter((question) => {
      const dependency = question.dependency;
      if (dependency) {
        const storedAnswer = this.storage.get(dependency.question);
        if (storedAnswer && isPollExtraSingleChoiceAnswer(storedAnswer.answer)) {
          const choice = (storedAnswer.answer as PollExtraSingleChoiceAnswer).choiceId;
          return dependency.choices.some((condition) => choice === condition);
        } else if (storedAnswer && isPollExtraMultipleChoicesAnswer(storedAnswer.answer)) {
          const choices = (storedAnswer.answer as PollExtraMultipleChoicesAnswer).choiceIds;
          return dependency.choices.some((choice) => choices.includes(choice));
        } else {
          // Compound and TextInput cannot be in a dependency
          return false;
        }
      }
      return true;
    });
  };
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.unit,
  },
  header: {
    marginBottom: Spacing.margin,
  },
  separator: {
    height: Spacing.margin,
  },
});
