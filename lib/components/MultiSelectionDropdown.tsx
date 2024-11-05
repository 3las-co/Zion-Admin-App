import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import CustomTextField from "./CustomTextField";
import { Ionicons } from "@expo/vector-icons";
import { DropDownItem } from "../utils/types";
import Utils from "../utils/utils";

interface MultiSelectionDropDownProps {
  options: DropDownItem[];
  onValuesChange: (values: any[]) => void;
  placeholder?: string;
  showSearch?: boolean;
}

const MultiSelectionDropDown: React.FC<MultiSelectionDropDownProps> = ({
  options,
  onValuesChange,
  placeholder,
  showSearch,
}) => {
  const [selectedValues, setSelectedValues] = useState<any[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filteredOptions =
    searchText.length > 1
      ? Utils.addIds(options).filter(option =>
          option.label.toLowerCase().includes(searchText.toLowerCase()),
        )
      : Utils.addIds(options);

  const handleSelect = (value: any, label: string) => {
    let updatedValues = [...selectedValues];
    if (updatedValues.includes(value)) {
      updatedValues = updatedValues.filter(v => v !== value);
    } else {
      updatedValues.push(value);
    }
    setSelectedValues(updatedValues);
    onValuesChange(updatedValues);
  };

  const isSelected = (value: any) => selectedValues.includes(value);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsDropdownOpen(true)}>
        <Text
          style={{
            color: selectedValues.length === 0 ? '#98A2B3' : '#101828',
            fontSize: 16,
          }}>
          {selectedValues.length > 0
            ? `${selectedValues.length} selected`
            : placeholder}
        </Text>
        <Ionicons name={'arrow-down'} />
      </TouchableOpacity>

      <Modal
        visible={isDropdownOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsDropdownOpen(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsDropdownOpen(false)}
        />
        <View style={styles.modalContent}>
          {showSearch === true && (
            <CustomTextField
              containerStyle={styles.searchInput}
              placeholder="Search"
              leading={<Ionicons name={'search'} />}
              trailing={
                searchText.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchText('')}>
                    <Ionicons name={'close-circle'} />
                  </TouchableOpacity>
                )
              }
              onValueChange={setSearchText}
              value={searchText}
            />
          )}
          <FlatList
            data={filteredOptions}
            keyExtractor={item => item.id?.toString() || item.label}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.option,
                  isSelected(item.value) && styles.selectedOption,
                ]}
                onPress={() => handleSelect(item.value, item.label)}>
                <Text
                  style={[
                    styles.optionText,
                    isSelected(item.value) && styles.selectedOptionText,
                  ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => setIsDropdownOpen(false)}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  dropdown: {
    borderColor: '#D0D5DD',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    height: '90%',
  },
  searchInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#D0D5DD',
    padding: 10,
    fontSize: 16,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EAECF0',
  },
  optionText: {
    fontSize: 16,
  },
  selectedOption: {
    backgroundColor: '#E0F7FA',
  },
  selectedOptionText: {
    color: '#00796B',
  },
  doneButton: {
    padding: 15,
    backgroundColor: '#00796B',
    alignItems: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MultiSelectionDropDown;