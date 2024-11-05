// TextButton.tsx
import React from 'react';
import {
  Text,
  TouchableOpacity,
  TextStyle,
  TextProps,
  GestureResponderEvent,
} from 'react-native';

interface TextButtonProps extends TextProps {
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  color?: string;
  alignment?: TextStyle['textAlign'];
  numOfLines?: number;
  onTap?: (event: GestureResponderEvent) => void;
  text: string;
}

const TextButton: React.FC<TextButtonProps> = ({
  fontSize = 14,
  fontWeight = '600',
  color = '#662D91',
  alignment = 'center',
  numOfLines = 1,
  onTap,
  text,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity style={style} onPress={onTap}>
      <Text
        style={[
          {
            fontSize,
            fontWeight,
            color,
            textAlign: alignment,
            fontFamily: 'Inter',
          },
        ]}
        numberOfLines={numOfLines}
        {...props}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;
