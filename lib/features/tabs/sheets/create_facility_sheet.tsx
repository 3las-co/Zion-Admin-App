import React from "react";
import { GeneralSheetProps } from "../../../utils/types";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FormValidator from "../../../services/form_validator";
import CustomTextField from "../../../components/CustomTextField";
import useClientsViewModel from "../clients_tab/clients_view_model";
import CustomDropDown from "../../../components/CustomDropDown";
import Constants from "../../../utils/constants";
import CustomButton from "../../../components/CustomButton";

const CreateFacilitySheet: React.FC<GeneralSheetProps> = ({visible, onClose}) => {
    const {
        isLoading,
        facilityName,
        email,
        phoneNumber,
        address,
        canCreateFacility,
        setFacilityCategory,
        setEmail,
        setPhoneNumber,
        setFacilityName,
        setAddress,
        createFacility,
    } = useClientsViewModel();

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                      <Ionicons name='close' size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Create facility</Text>
                    <Text style={styles.subtitle}>Fill in the details below</Text>
                    <CustomTextField
                        containerStyle={{width:'100%'}}
                        placeholder="Facility Name"
                        value={facilityName}
                        onValueChange={setFacilityName}
                        validator={{
                            errorMessage: 'Please enter the facility name',
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
                    <CustomTextField
                        containerStyle={{width:'100%'}}
                        placeholder="Phone number"
                        value={phoneNumber}
                        onValueChange={setPhoneNumber}
                        validator={{
                            errorMessage: 'Please enter the phone number',
                            validate: FormValidator.basicValidator,
                        }}
                    />
                    <View style={{height: 16}} />
                    <CustomTextField
                        containerStyle={{width:'100%'}}
                        placeholder="Address"
                        value={address}
                        onValueChange={setAddress}
                        validator={{
                            errorMessage: 'Please enter the address',
                            validate: FormValidator.basicValidator,
                        }}
                    />
                    <View style={{height: 16}} />
                    <CustomDropDown options={Constants.facilityCategories} onValueChange={(val) => {
                        setFacilityCategory(val);
                    }} placeholder={'Select Category'} />
                    <View style={{height: 32}} />
                    <CustomButton onPress={() => {
                        createFacility().then(() => {
                            onClose();
                        });
                    }} text={'Create Facility'} loading={isLoading} active={canCreateFacility} />
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

export default CreateFacilitySheet;
