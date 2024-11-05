// MenuButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { modalVisibleState } from '../state_management/atoms/modal_state'; // Import the Recoil atom

const MenuButton = () => {
  const setModalVisible = useSetRecoilState(modalVisibleState);

  const handlePress = () => {
    setModalVisible(true); // Open the modal
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>Open Menu</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default MenuButton;
