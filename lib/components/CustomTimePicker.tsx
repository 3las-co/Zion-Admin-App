import React, { useState } from 'react';
import { View, Platform, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

interface TimePickerProps {
  onTimeChange: (time: Date) => void; // Callback to set the time in the ViewModel
  title: string;
}

const TimePicker: React.FC<TimePickerProps> = ({ onTimeChange, title }) => {
  const [time, setTime] = useState<Date | null>(null);
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || time;
    setShow(Platform.OS === 'ios'); // On iOS, keep the picker visible after selection
    if (currentTime) {
      setTime(currentTime);
      onTimeChange(currentTime); // Pass the time to the ViewModel
    }
  };

  // Use 'hh:mm a' format for 12-hour time with AM/PM
  const formattedTime = time ? format(time, 'hh:mm a') : 'Select a time';

  return (
      <View>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          {Platform.OS === 'ios' && (
            <DateTimePicker
              value={time || new Date()} // Use current date if no date is selected
              mode="time"
              display="default"
              onChange={onChange}
            />
          )}
          {Platform.OS === 'android' && (
            <TouchableOpacity onPress={() => setShow(true)}>
              <Text style={styles.btn}>{formattedTime}</Text>
            </TouchableOpacity>
          )}
        </View>
        {show && Platform.OS === 'android' && (
          <DateTimePicker
            value={time || new Date()} // Use current date if no date is selected
            mode="time"
            display="default"
            is24Hour={false} // Set to 12-hour format
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

export default TimePicker;