import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { z } from "zod";

import { useColorScheme } from "@/hooks/useColorScheme";
import { cn } from "@/lib/utils";

/**
 * Validation schema for authentication forms
 */
const authSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

/**
 * Type definition for form data
 */
export type AuthFormData = z.infer<typeof authSchema>;

/**
 * Props for AuthForm component
 */
interface AuthFormProps {
    /** Form mode - determines UI text and behavior */
    mode: "sign-in" | "sign-up";
    /** Callback function when form is submitted */
    onSubmit: (data: AuthFormData) => Promise<void>;
    /** Text to display in footer */
    footerText: string;
    /** Text for footer action button */
    footerActionText: string;
    /** Callback for footer action button */
    onFooterPress: () => void;
}

/**
 * Authentication Form Component
 * 
 * A reusable form component for both sign-in and sign-up flows.
 * Features include:
 * - Form validation with Zod schema
 * - Password visibility toggle
 * - Dark mode support
 * - Accessible design with proper labels
 * - Loading states
 * 
 * @param props - AuthForm properties
 */
export default function AuthForm({
    mode,
    onSubmit,
    footerText,
    footerActionText,
    onFooterPress,
}: AuthFormProps) {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AuthFormData>({
        resolver: zodResolver(authSchema),
        defaultValues: { email: "", password: "" },
    });

    const [showPassword, setShowPassword] = useState(false);
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    /**
     * Handles form submission with error handling
     */
    const handleFormSubmit = async (data: AuthFormData): Promise<void> => {
        try {
            await onSubmit(data);
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    /**
     * Toggles password visibility
     */
    const togglePasswordVisibility = (): void => {
        setShowPassword(prev => !prev);
    };

    return (
        <View className="flex-1 justify-center px-6">
            {/* Header Section */}
            <View className="mb-8">
                <Text className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
                    {mode === "sign-in" ? "Welcome Back" : "Create Account"}
                </Text>
                <Text className="text-center text-gray-600 dark:text-gray-300">
                    {mode === "sign-in" 
                        ? "Sign in to your account to continue" 
                        : "Join us today and get started"
                    }
                </Text>
            </View>

            <View className="space-y-6">
                {/* Email Field */}
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <View>
                            <Text className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                Email Address
                            </Text>
                            <View className="relative">
                                <View className="absolute left-3 top-0 bottom-0 justify-center z-10">
                                    <Ionicons 
                                        name="mail-outline" 
                                        size={20} 
                                        color={isDark ? "#9CA3AF" : "#6B7280"} 
                                    />
                                </View>
                                <TextInput
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Enter your email"
                                    placeholderTextColor={isDark ? "#9CA3AF" : "#9CA3AF"}
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    keyboardType="email-address"
                                    className={cn(
                                        "pl-12 pr-4 py-4 rounded-xl text-base",
                                        "bg-gray-50 border border-gray-200",
                                        "dark:bg-gray-800 dark:border-gray-600",
                                        "text-gray-900 dark:text-white",
                                        "focus:border-blue-500 dark:focus:border-blue-400",
                                        errors.email && "border-red-500 dark:border-red-400"
                                    )}
                                />
                            </View>
                            {errors.email && (
                                <Text className="text-red-500 dark:text-red-400 text-sm mt-1 ml-1">
                                    {errors.email.message}
                                </Text>
                            )}
                        </View>
                    )}
                />

                {/* Password Field */}
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                        <View>
                            <Text className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                Password
                            </Text>
                            <View className="relative">
                                <View className="absolute left-3 top-0 bottom-0 justify-center z-10">
                                    <Ionicons 
                                        name="lock-closed-outline" 
                                        size={20} 
                                        color={isDark ? "#9CA3AF" : "#6B7280"} 
                                    />
                                </View>
                                <TextInput
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Enter your password"
                                    placeholderTextColor={isDark ? "#9CA3AF" : "#9CA3AF"}
                                    secureTextEntry={!showPassword}
                                    autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
                                    className={cn(
                                        "pl-12 pr-12 py-4 rounded-xl text-base",
                                        "bg-gray-50 border border-gray-200",
                                        "dark:bg-gray-800 dark:border-gray-600",
                                        "text-gray-900 dark:text-white",
                                        "focus:border-blue-500 dark:focus:border-blue-400",
                                        errors.password && "border-red-500 dark:border-red-400"
                                    )}
                                />
                                <TouchableOpacity
                                    onPress={togglePasswordVisibility}
                                    className="absolute right-3 top-0 bottom-0 justify-center"
                                    accessibilityLabel={showPassword ? "Hide password" : "Show password"}
                                >
                                    <Ionicons
                                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                                        size={20}
                                        color={isDark ? "#9CA3AF" : "#6B7280"}
                                    />
                                </TouchableOpacity>
                            </View>
                            {errors.password && (
                                <Text className="text-red-500 dark:text-red-400 text-sm mt-1 ml-1">
                                    {errors.password.message}
                                </Text>
                            )}
                        </View>
                    )}
                />

                {/* Submit Button */}
                <Pressable
                    onPress={handleSubmit(handleFormSubmit)}
                    disabled={isSubmitting}
                    className={cn(
                        "py-4 rounded-xl items-center mt-6",
                        "bg-blue-600 active:bg-blue-700",
                        "dark:bg-blue-500 dark:active:bg-blue-600",
                        "shadow-lg shadow-blue-500/25",
                        isSubmitting && "opacity-70"
                    )}
                    accessibilityLabel={`${mode === "sign-in" ? "Sign in" : "Create account"} button`}
                >
                    <Text className="text-white font-semibold text-base">
                        {isSubmitting 
                            ? "Please wait..." 
                            : mode === "sign-in" ? "Sign In" : "Create Account"
                        }
                    </Text>
                </Pressable>
            </View>

            {/* Footer */}
            <View className="flex-row justify-center items-center mt-8">
                <Text className="text-gray-600 dark:text-gray-300">{footerText} </Text>
                <TouchableOpacity 
                    onPress={onFooterPress}
                    accessibilityLabel={footerActionText}
                >
                    <Text className="text-blue-600 dark:text-blue-400 font-medium">
                        {footerActionText}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}