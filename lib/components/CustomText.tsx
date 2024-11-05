// CustomText.tsx
import React from 'react';
import {Text, TextProps, TextStyle} from 'react-native';

interface CustomTextProps extends TextProps {
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  color?: string;
  alignment?: TextStyle['textAlign'];
  numOfLines?: number;
  text: string;
}

const CustomText: React.FC<CustomTextProps> = ({
  fontSize = 14,
  fontWeight = 'normal',
  color = '#434446',
  alignment = 'left',
  numOfLines,
  text,
  style,
  ...props
}) => {
  return (
    <Text
      style={[
        {
          fontSize,
          fontWeight,
          color,
          textAlign: alignment,
        },
        style,
      ]}
      numberOfLines={numOfLines}
      {...props}>
      {text}
    </Text>
  );
};

export default CustomText;
