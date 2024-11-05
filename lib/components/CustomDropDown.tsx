import React, {useState} from 'react';
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

interface CustomDropDownProps {
  options: DropDownItem[];
  onValueChange: (value: any) => void;
  placeholder?: string;
  showSearch?: boolean;
}

const CustomDropDown: React.FC<CustomDropDownProps> = ({
  options,
  onValueChange,
  placeholder,
  showSearch,
}) => {
  const [selectedValue, setSelectedValue] = useState<any | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState(''); // Added searchText state

  // If searchText is empty, display all options. Otherwise, filter options based on the search text.
  const filteredOptions =
    searchText.length > 1
      ? Utils.addIds(options).filter(option =>
          option.label.toLowerCase().includes(searchText.toLowerCase()),
        )
      : Utils.addIds(options);

  const handleSelect = (value: any, label: string) => {
    setSelectedValue(label);
    onValueChange(value);
    setIsDropdownOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsDropdownOpen(true)}>
        <Text
          style={{
            color: selectedValue == null ? '#98A2B3' : '#101828',
            fontSize: 16,
          }}>
          {selectedValue
            ? options.find(opt => opt.label == selectedValue)?.label
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
        <View
          style={[
            styles.modalContent,
            {
              maxHeight: showSearch === true ? '96%' : null,
              height: showSearch === true ? '94%' : null,
            },
          ]}>
          {/* Search Input */}
          {showSearch === true && (
            <CustomTextField
              containerStyle={styles.searchInput}
              placeholder="Search"
              leading={
                <Ionicons name={'search'} />
              }
              trailing={
                searchText.length > 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSearchText('');
                    }}>
                    <Ionicons name={'search'} />
                  </TouchableOpacity>
                )
              }
              onValueChange={setSearchText}
              value={searchText}
            />
          )}
          {/* Options List */}
          <FlatList
            data={filteredOptions}
            keyExtractor={item =>
              item.id === undefined ? item.label : item.id.toString()
            } // Use unique id as keyExtractor
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  // console.log('item', item);
                  handleSelect(item.value, item.label)
                }}>
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#98A2B3',
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
    maxHeight: '60%',
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
    paddingBottom: 4,
  },
});

export default CustomDropDown;
