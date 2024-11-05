import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomTextField from "../../../components/CustomTextField";
import FormValidator from "../../../services/form_validator";
import useSettingsViewModel from "./settings_view_model";
import CustomButton from "../../../components/CustomButton";
import Constants from "../../../utils/constants";
import CustomDropDown from "../../../components/CustomDropDown";
import { GeneralSheetProps } from "../../../utils/types";

const CreateAdminSheet: React.FC<GeneralSheetProps> = ({visible, onClose}) => {
    const {
        isLoading,
        canCreateAdmin,
        email,
        firstName,
        lastName,
        setAccessLevel,
        setEmail,
        setFirstName,
        setLastName,
        createAdmin,
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
                        placeholder="First Name"
                        value={firstName}
                        onValueChange={setFirstName}
                        validator={{
                            errorMessage: 'Please enter your first name',
                            validate: FormValidator.basicValidator,
                        }}
                    />
                    <View style={{height: 16}} />
                    <CustomTextField
                        containerStyle={{width:'100%'}}
                        placeholder="Last Name"
                        value={lastName}
                        onValueChange={setLastName}
                        validator={{
                            errorMessage: 'Please enter your last name',
                            validate: FormValidator.basicValidator,
                        }}
                    />
                    <View style={{height: 16}} />
                    <CustomTextField
                        style={{width: '100%', height: 40}}
                        placeholder="Email address"
                        value={email}
                        onValueChange={setEmail}
                        keyboardType="email-address"
                        isPassword={false}
                        validator={{
                            errorMessage: 'Invalid email address',
                            validate: FormValidator.emailValidator,
                        }}
                    />
                    <View style={{height: 16}} />
                    <CustomDropDown options={Constants.adminTypes} onValueChange={(val) => {
                        setAccessLevel(val);
                    }} placeholder={'Access Level'} />
                    <View style={{height: 32}} />
                    <CustomButton onPress={() => {
                        createAdmin().then(() => {
                            onClose();
                        });
                    }} text={'Create admin'} loading={isLoading} active={canCreateAdmin} />
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

export default CreateAdminSheet;
