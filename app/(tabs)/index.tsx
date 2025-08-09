import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/useColorScheme';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';

export default function HomeScreen() {
  const router = useRouter();
  const { session } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  /**
   * Handles user logout with proper error handling and navigation
   */
  const handleLogout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        Alert.alert('Logout Error', error.message);
        return;
      }
      
      // Navigation will be handled automatically by ProtectedLayout
      console.log('User logged out successfully');
      
    } catch (error) {
      console.error('Unexpected error during logout:', error);
      Alert.alert('Error', 'An unexpected error occurred during logout');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-1 px-6 py-8">
        {/* Header Section */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            QR Attendance
          </Text>
          <Text className="text-gray-600 dark:text-gray-300">
            Welcome back, {session?.user?.email || 'User'}!
          </Text>
        </View>

        {/* Main Content */}
        <View className="flex-1 justify-center items-center">
          <View className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 w-full max-w-sm items-center">
            <Ionicons 
              name="qr-code-outline" 
              size={80} 
              color={isDark ? "#60A5FA" : "#3B82F6"} 
            />
            <Text className="text-xl font-semibold text-gray-900 dark:text-white mt-4 text-center">
              QR Attendance System
            </Text>
            <Text className="text-gray-600 dark:text-gray-300 mt-2 text-center">
              Your attendance tracking solution
            </Text>
          </View>
        </View>

        {/* User Info Section */}
        <View className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Account Information
          </Text>
          <View className="flex-row items-center">
            <Ionicons 
              name="person-circle-outline" 
              size={24} 
              color={isDark ? "#9CA3AF" : "#6B7280"} 
            />
            <Text className="text-gray-900 dark:text-white ml-3 flex-1">
              {session?.user?.email || 'Not available'}
            </Text>
          </View>
        </View>

        {/* Logout Button */}
        <Pressable
          onPress={handleLogout}
          className="bg-red-600 active:bg-red-700 dark:bg-red-500 dark:active:bg-red-600 rounded-xl py-4 items-center"
        >
          <View className="flex-row items-center">
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text className="text-white font-semibold text-base ml-2">
              Sign Out
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}