import AuthForm from '@/components/AuthForm';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpScreen() {
    return (
        <SafeAreaView style={{ flex: 1 }} className="bg-white dark:bg-gray-900">
            <AuthForm
                mode="sign-up"
                footerText="Already have an account?"
                footerActionText="Sign in"
                onFooterPress={() => router.replace("/auth/sign-in")}
                onSubmit={async ({ email, password }) => {
                    const { data, error } = await supabase.auth.signUp({ email, password });
                    if (error) {
                        Alert.alert('Sign Up Error', error.message);
                    } else {
                        Alert.alert('Success', 'Please check your email to confirm your account!');
                        console.log('Signed up successfully:', data.user?.email);
                    }
                }}
            />
        </SafeAreaView>
    );
}
