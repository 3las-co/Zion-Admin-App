// src/navigation/MainNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginView from "../features/authentication/login_view";
import ForgotPasswordView from "../features/authentication/forgot_password_view";
import TabView from "../features/tabs/tabs_view";
import AdminMgtView from "../features/tabs/settings_tab/admin_mgt_view";
import ShiftsView from "../features/tabs/shifts_tab/ShiftsView";

// Create a stack navigator
const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tab"
          component={TabView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AdminMgt"
          component={AdminMgtView}
          options={{headerShown: false}}
        />
        <Stack.Screen
            name="ShiftList"
            component={ShiftsView}
            options={{headerShown: false}}
        />
    </Stack.Navigator>
  );
};

export default MainNavigator;
