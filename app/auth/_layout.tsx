import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack 
            screenOptions={{
                headerShown: false,
                animation: 'fade_from_bottom',
                animationDuration: 300,
            }}
        >
            <Stack.Screen 
                name="sign-in" 
                options={{
                    animation: 'fade',
                    animationDuration: 200,
                }} 
            />
            <Stack.Screen 
                name="sign-up" 
                options={{
                    animation: 'fade',
                    animationDuration: 200,
                }} 
            />
        </Stack>
    );
}