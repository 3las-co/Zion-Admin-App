import React, { useState } from 'react';
import { View, Platform, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

interface DatePickerProps {
  onDateChange: (date: Date) => void; // Callback to set the date in the ViewModel
  title: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDateChange, title }) => {
  const [date, setDate] = useState<Date | null>(null);
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios'); // On iOS, keep the picker visible after selection
    if (currentDate) {
      setDate(currentDate);
      onDateChange(currentDate); // Pass the date to the ViewModel
    }
  };

  const formattedDate = format(date ?? Date.now(), 'dd-MM-yyyy');

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {Platform.OS === 'ios' && (
          <DateTimePicker
            value={date || new Date()} // Use current date if no date is selected
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
        {Platform.OS === 'android' && (
          <TouchableOpacity onPress={() => setShow(true)}>
            <Text style={styles.btn}>{formattedDate}</Text>
          </TouchableOpacity>
        )}
      </View>
      {show && Platform.OS === 'android' && (
        <DateTimePicker
          value={date || new Date()} // Use current date if no date is selected
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#F8F3FB',
    color: '#434446',
    padding: 4,
    borderRadius: 8,
    fontSize: 16,
  },
  title: {
    fontSize: 16,
    color: '#434446',
  }
});

export default DatePicker;