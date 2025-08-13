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
        tabBarActiveTintColor: '#8A4DFF',
        tabBarInactiveTintColor: '#bbb',
        tabBarStyle: {
          backgroundColor: '#111',
          borderColor: "black",
        },
        
        tabBarLabelStyle: { fontSize: 13, marginBottom: 8 },
        tabBarItemStyle: { alignItems: 'center', justifyContent: 'center', },

        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Index',
          tabBarIcon: ({ color }) => <Octicons name="home" size={24} color="lightgray" />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => <Ionicons name="calendar-outline" size={24} color="lightgray" />,
        }}
      />
      <Tabs.Screen
        name="focus"
        options={{
          title: 'Focus',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="target" size={24} color="lightgray" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="head-outline" size={24} color="lightgray" />,
        }}
      />
    </Tabs>
  );
}