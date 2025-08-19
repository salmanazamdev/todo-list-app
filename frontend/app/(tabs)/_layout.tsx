import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#8875FF',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#181818',
          borderTopColor: 'transparent',
          borderTopWidth: 0,
        },
        tabBarLabelStyle: { fontSize: 13, marginBottom: 8 },
        tabBarItemStyle: { alignItems: 'center', justifyContent: 'center' },
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
      }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <Octicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => <Ionicons name="calendar-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="focus"
        options={{
          title: 'Focus',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="target" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="head-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}