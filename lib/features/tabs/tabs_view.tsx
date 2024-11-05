// Import necessary modules and components
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTabView from "./home_tab/home_tab_view";
import ClientsTabView from "./clients_tab/clients_tab_view";
import ShiftsTabView from "./shifts_tab/ShiftsTabView";
import AlertsTabView from "./alerts_tab/alerts_tab_view";
import SettingsTabView from "./settings_tab/settings_tab_view";
import MenuSheet from "./sheets/menu_sheet";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { modalTypeState } from "../../state_management/atoms/modal_state";
import CreateProviderSheet from "./sheets/create_provider_sheet";
import CreateFacilitySheet from "./sheets/create_facility_sheet";
import CreateShiftSheet from "./sheets/create_shift_sheet";

const Tab = createBottomTabNavigator();

const tabBarIcon = (route: any, focused: boolean) => {
  let iconName;
  if (route.name === 'Home') {
    iconName = require('../../../assets/icons/home.png');
  } else if (route.name === 'Facilities') {
    iconName = require('../../../assets/icons/clients.png');
  } else if (route.name === 'Providers') {
    iconName = require('../../../assets/icons/shifts.png');
  } else if (route.name === 'Alerts') {
    iconName = require('../../../assets/icons/alerts.png');
  } else if (route.name === 'Settings') {
    iconName = require('../../../assets/icons/settings.png');
  }

  return <Image source={iconName} style={[styles.icon, {tintColor: focused ? '#662D91' : '#66686B'}]} />;
};

const TabView = () => {
  const [showMenu, setShowMenu] = useState(false);

  const showingModal = useRecoilValue(modalTypeState);
  const setModalState = useSetRecoilState(modalTypeState);

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => tabBarIcon(route, focused),
          tabBarActiveTintColor: '#662D91',
          tabBarInactiveTintColor: '#66686B',
        })}>
        <Tab.Screen
          name="Home"
          options={{headerShown: false}}
          component={HomeTabView}
        />
        <Tab.Screen
          name="Facilities"
          options={{headerShown: false}}
          component={ClientsTabView}
        />
        <Tab.Screen
          name="Providers"
          options={{headerShown: false}}
          component={ShiftsTabView}
        />
        {/*<Tab.Screen*/}
        {/*  name="Alerts"*/}
        {/*  options={{headerShown: false}}*/}
        {/*  component={AlertsTabView}*/}
        {/*/>*/}
        <Tab.Screen
          name="Settings"
          options={{headerShown: false}}
          component={SettingsTabView}
        />
      </Tab.Navigator>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          // show add admin sheet
          setShowMenu(true);
        }}
      >
        <Image
          style={{ height: 44, width: 44 }}
          source={require('../../../assets/icons/add.png')}
        />
      </TouchableOpacity>
      <MenuSheet visible={showMenu} onClose={() => {
        setShowMenu(false);
      }} />
        <CreateProviderSheet visible={showingModal === 'provider'} onClose={() => {
            setModalState(null);
        }} />
        <CreateFacilitySheet visible={showingModal === 'facility'} onClose={() => {
            setModalState(null);
        }} />
        <CreateShiftSheet visible={showingModal === 'shift'} onClose={() => {
            setModalState(null);
        }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
  fab: {
    position: 'absolute',
    bottom: 60,  // Position the button at the bottom
    right: 16,   // Position the button at the trailing end (right side)
  },
});

export default TabView;
