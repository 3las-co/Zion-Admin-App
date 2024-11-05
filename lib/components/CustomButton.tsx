import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  DimensionValue,
  AnimatableNumericValue,
  ViewStyle,
} from 'react-native';

interface ButtonProps {
  height?: DimensionValue;
  width?: DimensionValue;
  onPress: () => void;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  text: string;
  loading?: boolean;
  active?: boolean;
  outlined?: boolean;
  borderRadius?: AnimatableNumericValue;
  style?: ViewStyle;
}

const CustomButton: React.FC<ButtonProps> = ({
  height = 44,
  width = '100%',
  onPress,
  backgroundColor = '#662D91',
  borderColor = '#D0D5DD',
  textColor,
  text,
  loading = false,
  active = true,
  outlined = false,
  borderRadius = 8,
  style,
}) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: active
        ? outlined
          ? 'white'
          : backgroundColor
        : '#F2F4F7',
      borderColor: outlined ? borderColor : 'transparent',
      height,
      width,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      marginVertical: 10,
      borderRadius: borderRadius,
    },
    text: {
      color: active
        ? textColor !== undefined
          ? textColor
          : outlined
          ? '#66686B'
          : 'white'
        : '#66686B',
      fontSize: 16,
      fontWeight: '600',
      fontFamily: 'Inter',
    },
  });

  return (
    <TouchableOpacity
      style={StyleSheet.compose(styles.button, style)}
      onPress={active ? onPress : undefined}>
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
