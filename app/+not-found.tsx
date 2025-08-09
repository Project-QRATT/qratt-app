import { Link, Stack } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Page Not Found' }} />
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Page Not Found
          </Text>
          <Text className="text-gray-600 dark:text-gray-300 mb-8 text-center">
            The page you're looking for doesn't exist.
          </Text>
          <Link 
            href="/" 
            className="bg-blue-600 px-6 py-3 rounded-xl"
          >
            <Text className="text-white font-semibold">
              Go to Home
            </Text>
          </Link>
        </View>
      </SafeAreaView>
    </>
  );
}