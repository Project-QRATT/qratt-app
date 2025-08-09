import AuthForm from '@/components/AuthForm';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignInScreen() {
    return (
        <SafeAreaView style={{ flex: 1 }} className="bg-white dark:bg-gray-900">
            <AuthForm
                mode="sign-in"
                footerText="Don't have an account?"
                footerActionText="Sign up"
                onFooterPress={() => router.replace("/auth/sign-up")}
                onSubmit={async ({ email, password }) => {
                    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                    if (error) {
                        Alert.alert('Sign In Error', error.message);
                    } else {
                        // Navigation will be handled by the ProtectedLayout
                        console.log('Signed in successfully:', data.user?.email);
                    }
                }}
            />
        </SafeAreaView>
    );
}
