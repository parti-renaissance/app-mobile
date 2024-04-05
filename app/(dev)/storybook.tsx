import Storybook from '../../.storybook';
import { Stack, router } from 'expo-router';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { Button } from '@/components';

export default () => (
    <>
        <Stack.Screen options={{
            headerTitle: 'Storybook',
            headerLeft: () =>
                <Button variant="text" onPress={()=> router.replace('/home/')}>
                    <ArrowLeft size={16} color="$blue6" />
                    <Button.Text color="$blue6">Back</Button.Text>
                </Button>
        }} />
        <Storybook />
    </>
);
