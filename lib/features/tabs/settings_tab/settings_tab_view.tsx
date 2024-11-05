import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { adminState } from "../../../state_management/atoms/user_state";
import { useRecoilValue } from "recoil";
import { Admin } from "../../../models/admin_model";
import CustomText from "../../../components/CustomText";
import SettingsItem from "../../../components/SettingsItem";
import UpdatePasswordSheet from "./update_password_sheet";
import useSettingsViewModel from "./settings_view_model";
import Navigation from "../../../navigation/navigation";

const SettingsTabView = () => {
    const {
        showChangePasswordSheet,
        setShowChangePasswordSheet,
    } = useSettingsViewModel();

    const user: Admin | null = useRecoilValue(adminState);

    const handleChangePassword = () => {
        // show change password sheet
        setShowChangePasswordSheet(true);
    };

    const handleAdminManagement = () => {
        // Navigate to Admin Management Screen
        Navigation.navigate('AdminMgt');
    };

    const handleLogout = () => {
        // Perform logout action
        Navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.img} source={require('../../../../assets/icons/logo.png')} />
            <View style={{height: 16}} />
            <View style={styles.containerView}>
                <CustomText text={`${user?.firstName ?? ''} ${user?.lastName ?? ''}`} fontSize={16} fontWeight={'600'} color={'#434446'} />
                <CustomText text={user?.email ?? ''} fontSize={14} fontWeight={'500'} color={'#66686B'} />
                <View style={{height: 16}} />
                <SettingsItem
                    label="Change password"
                    icon="lock-closed-outline"
                    onPress={handleChangePassword}
                    iconColor="#000"
                />
                <View style={{height: 16}} />
                <SettingsItem
                    label="Admin management"
                    icon="settings-outline"
                    onPress={handleAdminManagement}
                    iconColor="#000"
                />
                <View style={{height: 16}} />
                <SettingsItem
                    label="Logout"
                    icon="log-out-outline"
                    onPress={handleLogout}
                    iconColor="red"
                    textColor="red"
                />

            </View>
            <UpdatePasswordSheet visible={showChangePasswordSheet} onClose={() => {
                setShowChangePasswordSheet(false);
            }} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 16,
        alignItems: 'center',
    },
    containerView: {
        flex: 1,
        width: '100%',
        padding: 16,
        backgroundColor: '#F7F7F8',
        alignItems: 'center',
    },
    img: {
        width: 100,
        height: 64,
        resizeMode: 'contain',
    },
    fab: {
        position: 'absolute',
        bottom: 16,  // Position the button at the bottom
        right: 16,   // Position the button at the trailing end (right side)
      },
});

export default SettingsTabView;
