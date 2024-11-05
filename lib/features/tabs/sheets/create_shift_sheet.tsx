import React, { useEffect } from "react";
import { CreateShiftSheetProps } from "../../../utils/types";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FacilityModel } from "../../../models/facility_model";
import { useRecoilValue } from "recoil";
import { facilityState } from "../../../state_management/atoms/facility_state";
import useClientsViewModel from "../clients_tab/clients_view_model";
import CustomDropDown from "../../../components/CustomDropDown";
import CustomDatePicker from "../../../components/CustomDatePicker";
import CustomTimePicker from "../../../components/CustomTimePicker";
import CustomTextField from "../../../components/CustomTextField";
import FormValidator from "../../../services/form_validator";
import CustomButton from "../../../components/CustomButton";
import { addHours } from "date-fns";

const CreateShiftSheet: React.FC<CreateShiftSheetProps> = ({visible, onClose}) => {
  const options = [
    { label: '12 hours', value: '12hr Shift' },
    { label: '24 hours', value: '24hr Shift' },
    { label: 'Custom', value: 'custom' },
  ];

  const {
    isLoading,
    shiftName,
    selectedDuration,
    canCreateShift,
    startTime,
    setShiftName,
    setStartDate,
    setEndDate,
    setStartTime,
    setEndTime,
    setSelectedFacility,
    setSelectedDuration,
    createShift,
  } = useClientsViewModel();

  const handleSelect = (value: string) => {
    setSelectedDuration(value);
  };

  const facilityList: FacilityModel[] = useRecoilValue(facilityState);

  useEffect(() => {
    console.log(selectedDuration);
    if (selectedDuration === '12hr Shift') {
        const currentDate: Date = startTime || new Date();
        setEndTime(addHours(currentDate, 12));
    }

    if (selectedDuration === '24hr Shift') {
        const currentDate: Date = startTime || new Date();
        setEndTime(addHours(currentDate, 24));
    }
  }, [selectedDuration]);

  return (
      <Modal visible={visible} animationType="slide" transparent={true}>
          <View style={styles.overlay}>
              <View style={styles.container}>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                  <Ionicons name='close' size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Create shift</Text>
                <Text style={styles.subtitle}>Fill in the details below</Text>
                <ScrollView>
                  {/*Select Facility*/}
                  <CustomDropDown
                      options={facilityList.map(e => ({label: e.name, value: e}))}
                      onValueChange={(val) => {
                          setSelectedFacility(val as FacilityModel);
                      }}
                      placeholder={'Select Facility'}
                      showSearch={true}
                  />
                  <View style={{height: 16}} />
                  {/*Start Date*/}
                  <CustomDatePicker onDateChange={setStartDate}  title={'Start Date'}/>
                  <View style={{height: 16}} />
                  {/*End Date*/}
                  <CustomDatePicker onDateChange={setEndDate}  title={'End Date'}/>
                  <View style={{height: 24}} />
                  {/*Duration*/}
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Shift duration</Text>
                    <View style={styles.radioGroup}>
                      {options.map((option) => (
                        <TouchableOpacity
                          key={option.value}
                          style={styles.radioButton}
                          onPress={() => handleSelect(option.value)}
                        >
                          <View style={styles.radioCircle}>
                            {selectedDuration === option.value && (
                              <View style={styles.selectedRb} />
                            )}
                          </View>
                          <Text style={styles.radioText}>{option.label}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                  <View style={{height: 24}} />
                  {selectedDuration === 'custom' && (
                      <CustomTextField
                          style={{width: '100%', height: 40}}
                          placeholder="Shift name"
                          value={shiftName}
                          onValueChange={setShiftName}
                          isPassword={false}
                          validator={{
                              errorMessage: 'Enter a name',
                              validate: FormValidator.basicValidator,
                          }}
                      />
                  )}
                  <View style={{height: 16}} />
                  {/*Start Time*/}
                  <CustomTimePicker onTimeChange={setStartTime}  title={'Start Time'}/>
                  <View style={{height: 16}} />
                  {/*End Time*/}
                  <CustomTimePicker
                      onTimeChange={setEndTime}
                      title={'End Time'}
                  />
                  <View style={{height: 32}} />
                  <CustomButton onPress={() => {
                      createShift().then(() => {
                          onClose();
                      });
                  }} text={'Create Shift'} loading={isLoading} active={canCreateShift} />
                </ScrollView>
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
    height: '90%',
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
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#444',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#444',
  },
  radioText: {
    fontSize: 14,
    color: '#444',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
    color: '#434446',
  },
  section: {
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
  }
});

export default CreateShiftSheet;
