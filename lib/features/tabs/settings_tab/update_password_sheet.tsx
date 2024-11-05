import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomTextField from "../../../components/CustomTextField";
import FormValidator from "../../../services/form_validator";
import useSettingsViewModel from "./settings_view_model";
import CustomButton from "../../../components/CustomButton";

interface GeneralSheetProps {
    visible: boolean;
    onClose: () => void;
}

const UpdatePasswordSheet: React.FC<GeneralSheetProps> = ({visible, onClose}) => {
    const {
        isLoading,
        changePassword,
        password,
        oldPassword,
        confirmPassword,
        setConfirmPassword,
        setOldPassword,
        setPassword,
        updatePassword,
    } = useSettingsViewModel();

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {/* Cancel Button */}
                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                      <Ionicons name='close' size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Update password</Text>
                    <Text style={styles.subtitle}>Choose a secure password that is easy to remember</Text>
                    <CustomTextField
                        containerStyle={{width:'100%'}}
                        placeholder="Old Password"
                        value={oldPassword}
                        onValueChange={setOldPassword}
                        isPassword={true}
                        validator={{
                            errorMessage: 'Password must be 8+ characters long',
                            validate: FormValidator.passwordValidator,
                        }}
                    />
                    <View style={{height: 16}} />
                    <CustomTextField
                        containerStyle={{width:'100%'}}
                        placeholder="New Password"
                        value={password}
                        onValueChange={setPassword}
                        isPassword={true}
                        validator={{
                            errorMessage: 'Password must be 8+ characters long',
                            validate: FormValidator.passwordValidator,
                        }}
                    />
                    <View style={{height: 16}} />
                    <CustomTextField
                        containerStyle={{width:'100%'}}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onValueChange={setConfirmPassword}
                        isPassword={true}
                        validator={{
                            errorMessage: 'Password does not match',
                            validate: (val) => val === password,
                        }}
                    />
                    <View style={{height: 32}} />
                    <CustomButton onPress={() => {
                        updatePassword().then(() => {
                            onClose();
                        });
                    }} text={'Update password'} loading={isLoading} active={changePassword} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: '96%',
      padding: 16,
  },
  header: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  cancelButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 10,
    textAlign: 'center',
      color: '#434446',
  },
  subtitle: {
    fontSize: 16,
    color: '#434446',
    marginBottom: 20,
    textAlign: 'center',
      fontWeight: '400',
  },
});

export default UpdatePasswordSheet;
