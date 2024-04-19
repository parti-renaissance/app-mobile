import {exec} from 'child_process'
import {promisify} from 'util'
import chalk from 'chalk'
import appJson from '../../app.json' assert {type: 'json'}
import path from 'path'
import {fileURLToPath} from 'url'
import {program} from "commander";

/*

    This app simplify the build run instead of running it directly on bash
 */


/********* ENV VARS ************/
const branchName = process.env.BRANCH_NAME
const appStoreBundleId = process.env.APP_STORE_BUNDLE_ID
const refType = process.env.REF_TYPE // -> can be tag or branch, @see https://docs.github.com/en/actions/learn-github-actions/contexts
/*******************************/

const aExec = promisify(exec)
const candidate = appJson.expo.version

// Declare non available features un mJS
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


async function actionHandler () {

    const expoCommandBase = `eas build --platform all --non-interactive --no-wait`
    const expoUpdateCommandBase = `eas update --auto`

    const {stdout: appStoreVersion, stderr: error1} = await aExec(
        `node ${__dirname}/readAppVersion.mjs -i ${appStoreBundleId}`
    )

    // Exit on sub process error
    if (error1 !== '') {
        process.exit(1)
    }

    const {stdout: buildOrUpdate, stderr: error2} = await aExec(
        `node ${__dirname}/isBuildOrUpdate.mjs -l ${appStoreVersion} -r ${candidate}`,
    )

    // Exit on sub process error
    if (error2 !== '') {
        process.exit(2)
    }

    console.log(chalk.green(`app version is : ${appStoreVersion}`))
    console.log(chalk.green(`update is : ${buildOrUpdate}`))

    switch (buildOrUpdate) {
        case 'patch':
            console.log(chalk.magenta('Will do an UPDATE on expo.'))
                await aExec(expoUpdateCommandBase)
                process.exit(0)
            break;
        case 'archive':
        case 'build':
            console.log("Branch name is ", branchName)
            console.log("Ref type is  ", refType)
            console.log("Branch start with rc/  ", branchName.startsWith('rc/'))
            console.log("Branch start with v  ", branchName.startsWith('v'))

            if (refType === 'branch' && branchName.startsWith('rc/') || refType === 'tag' && branchName.startsWith('v')) {
                console.log(chalk.magenta('Will do a build on production env...'))
                await aExec(`${expoCommandBase} --profile production --auto-submit`)
                process.exit(0)
            } else {
                console.log(chalk.blue('Will do a build on staging env...'))
                await aExec(`${expoCommandBase} --profile staging`)
                process.exit(0)
            }
    }

    console.error(chalk.red('No build ran at all !'))
    process.exit(3)
}



program
    .description('This app simplify the build run instead of running it directly on bash')
    .action(actionHandler)
    .parse()
