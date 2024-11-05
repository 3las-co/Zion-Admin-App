// GlobalModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useRecoilState } from 'recoil';
import { modalTypeState, modalVisibleState } from '../state_management/atoms/modal_state'; // Import the Recoil atom
import { Ionicons } from '@expo/vector-icons';

// Define a type for Ionicons name
type IoniconName = keyof typeof Ionicons.glyphMap;

// Options array with type definition for icon
const options: { id: string; label: string; icon: IoniconName }[] = [
  { id: '1', label: 'Create Provider', icon: 'person-outline' },
  { id: '2', label: 'Create Facility', icon: 'people-outline' },
  { id: '3', label: 'Create Shift', icon: 'calendar-outline' },
];

const OptionsModal = () => {
  const [isModalVisible, setModalVisible] = useRecoilState(modalVisibleState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  const handleOptionPress = (option: string) => {
    if (option === 'Create Provider') {
      setModalType('provider'); // Set modal type to "provider"
    } else if (option === 'Create Facility') {
      setModalType('facility'); // Set modal type to "facility"
    }
    toggleModalVisibility(); // Close the menu modal
  };

  return (
      <>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModalVisibility}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Menu</Text>
                <TouchableOpacity onPress={toggleModalVisibility}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={options}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => handleOptionPress(item.label)}
                  >
                    {/* Now TypeScript recognizes that `item.icon` is a valid Ionicon name */}
                    <Ionicons name={item.icon} size={20} color="black" />
                    <Text style={styles.optionText}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
        {/* Conditionally Render Bottom Sheets Based on Selected Option */}
        {/*{modalType === 'provider' && <CreateProviderSheet />}*/}
        {/*{modalType === 'facility' && <CreateFacilitySheet />}*/}
      </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default OptionsModal;
