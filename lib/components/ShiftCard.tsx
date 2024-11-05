import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ShiftModel } from "../models/shift_model";
import Utils from "../utils/utils";


interface ShiftCardProps {
  shift: ShiftModel;
  onOptionsPress: () => void;
  onPlusPress: () => void;
}

const ShiftCard: React.FC<ShiftCardProps> = ({
  shift,
  onOptionsPress,
  onPlusPress,
}) => {
  console.log('Shift Card', shift);
    return (
        <View style={styles.cardContainer}>
          {/* Left Line */}
          <View style={styles.leftLine} />

          {/* Content */}
          <View style={styles.contentContainer}>
            <Text style={styles.shiftTypeText}>{shift.name}</Text>
            <Text style={styles.hospitalNameText}>{shift.facility.name}</Text>
            <View style={{height: 12}} />
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>{shift.startTime}</Text>
              <Text style={styles.separator}> - </Text>
              <Text style={styles.timeText}>{shift.endTime}</Text>
            </View>
          </View>
          <View style={{flex: 1}} />
          {/* Right Side - Options and Avatar */}
          <View style={styles.rightContainer}>
            <TouchableOpacity onPress={onOptionsPress}>
              <MaterialIcons style={styles.ellipses} name="more-vert" size={24} color="#777" />
            </TouchableOpacity>
            <View style={{flex: 1}} />
            <TouchableOpacity onPress={onPlusPress}>
                {shift.assignedTo === null ? (
                    <MaterialIcons style={styles.plus} name="add" size={24} color="#777" />
                ) : (
                    <Text>{`${shift.assignedTo!.firstName[0]}${shift.assignedTo!.lastName[0]}`}</Text>
                )}
            </TouchableOpacity>
          </View>
        </View>
    );
};

const styles = StyleSheet.create({
  plus: {
    color: '#662D91',
    borderWidth: 1,
    borderColor: '#662D91',
    borderRadius: 12,
  },
  ellipses: {
    color: '#662D91',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  leftLine: {
    width: 4,
    height: '100%',
    backgroundColor: '#6A0DAD', // Purple color
    borderRadius: 4,
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 16,
  },
  shiftTypeText: {
    color: '#6A0DAD',
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 4,
  },
  hospitalNameText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#555',
  },
  separator: {
    fontSize: 14,
    color: '#777',
    marginHorizontal: 4,
  },
  rightContainer: {
    justifyContent: 'space-between',
    padding: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginTop: 8,
  },
});

export default ShiftCard;
