// CustomTextField.tsx
import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInputProps,
  KeyboardTypeOptions,
  ViewStyle,
} from 'react-native';

interface CustomTextFieldProps extends TextInputProps {
  readOnly?: boolean;
  onValueChange?: (value: string) => void;
  onTapped?: () => void;
  validator?: {errorMessage: string; validate: (value: string) => boolean};
  placeholder?: string;
  isPassword?: boolean;
  trailing?: React.ReactNode;
  leading?: React.ReactNode;
  borderColor?: string;
  keyboardType?: KeyboardTypeOptions;
  containerStyle?: ViewStyle;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  readOnly = false,
  onValueChange,
  onTapped,
  validator,
  placeholder,
  isPassword = false,
  trailing,
  leading,
  borderColor = '#D0D5DD',
  keyboardType = 'default',
  containerStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFocused && validator && props.value) {
      if (!validator.validate(props.value)) {
        setError(validator.errorMessage);
      } else {
        setError(null);
      }
    }
  }, [isFocused, props.value, validator]);

  return (
    <View style={containerStyle}>
      <View
        style={[
          styles.container,
          {borderColor: isFocused ? '#411391' : error ? 'red' : borderColor},
        ]}>
        {leading && <View style={styles.leading}>{leading}</View>}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#667085"
          editable={!readOnly}
          secureTextEntry={secureTextEntry}
          value={props.value}
          onChangeText={text => {
            if (onValueChange) {
              onValueChange(text);
            }
          }}
          onFocus={() => {
            setIsFocused(true);
            if (onTapped) {
              onTapped();
            }
          }}
          onBlur={() => setIsFocused(false)}
          keyboardType={keyboardType}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setSecureTextEntry(!secureTextEntry)}>
            <Image
              style={styles.icon}
              source={
                secureTextEntry
                  ? require('../../assets/icons/eye.png')
                  : require('../../assets/icons/eye.png')
              }
            />
          </TouchableOpacity>
        )}
        {trailing && <View style={styles.trailing}>{trailing}</View>}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  input: {
    paddingVertical: 10,
    flex: 1,
  },
  icon: {
    width: 14,
    height: 10,
  },
  leading: {
    marginRight: 10,
  },
  trailing: {
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
});

export default CustomTextField;
