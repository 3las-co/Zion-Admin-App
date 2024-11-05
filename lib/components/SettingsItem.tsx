// SettingsItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import icons

type SettingsItemProps = {
  label: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  onPress: () => void;
  iconColor?: string;
  textColor?: string;
};

const SettingsItem: React.FC<SettingsItemProps> = ({
  label,
  icon,
  onPress,
  iconColor = '#434446',
  textColor = '#434446',
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconLabelContainer}>
        <Ionicons name={icon} size={24} color={iconColor} style={styles.icon} />

        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      </View>
        <View style={{flex: 1}} />
      <Ionicons name="chevron-forward" size={20} color="gray" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  label: {
    fontSize: 16,
  },
});

export default SettingsItem;
