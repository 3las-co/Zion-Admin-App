import React from "react";
import { GeneralSheetProps } from "../../../utils/types";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSetRecoilState } from "recoil";
import { modalTypeState } from "../../../state_management/atoms/modal_state";

const MenuSheet: React.FC<GeneralSheetProps> = ({visible, onClose}) => {
  const setModalState = useSetRecoilState(modalTypeState);

    return (
        <Modal visible={visible} animationType={'fade'} transparent={true}>
            <View style={styles.overlay}>
              <View style={styles.container}>
                <View style={styles.header}>
                  <View style={{flex: 1}} />
                  <Text style={styles.title}>Menu</Text>
                  <View style={{flex: 1}} />
                  <TouchableOpacity onPress={onClose}>
                    <Ionicons name='close' size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => {
                  // set the modal state to provider
                  setModalState('provider');
                  // close menu
                  onClose();
                }}>
                  <Text style={styles.subtitle}>
                    Create Provider
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  setModalState('facility');
                  onClose();
                }}>
                  <Text style={styles.subtitle}>
                    Create Facility
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  setModalState('shift');
                  onClose();
                }}>
                  <Text style={styles.subtitle}>
                    Create Shift
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  container: {
    width: '60%',
    position: 'absolute',
    right: 16,
    bottom: 60,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'flex-start',
  },
  header: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    marginLeft: 24,
    textAlign: 'center',
    color: '#434446',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#434446',
    paddingVertical: 8,
    borderTopWidth: 2,
    borderTopColor: '#434446',
  }
});

export default MenuSheet;