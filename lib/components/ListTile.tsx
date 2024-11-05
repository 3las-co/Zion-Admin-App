// ListTile.tsx
import React from 'react';
import {View, TouchableOpacity, StyleSheet, ViewStyle} from 'react-native';

interface ListTileProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

const ListTile: React.FC<ListTileProps> = ({
  title,
  subtitle,
  leading,
  trailing,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={StyleSheet.compose(styles.container, style)}
      onPress={onPress}>
      {leading && <View style={styles.leading}>{leading}</View>}
      <View style={styles.content}>
        {title}
        {subtitle && <View style={{height: 8}} />}
        {subtitle && subtitle}
      </View>
      {trailing && <View style={styles.trailing}>{trailing}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  leading: {
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  trailing: {
    marginLeft: 16,
  },
});

export default ListTile;
