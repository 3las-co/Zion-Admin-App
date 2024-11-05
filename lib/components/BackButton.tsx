import React from 'react';
import {TouchableOpacity, Image, StyleSheet, ViewStyle} from 'react-native';
import Navigation from "../navigation/navigation";

type BackButtonProps = {style?: ViewStyle};

const BackButton: React.FC<BackButtonProps> = props => {
  return (
    <TouchableOpacity style={props.style} onPress={() => Navigation.goBack()}>
      <Image
        source={require('../../assets/icons/back_icon.png')}
        style={styles.backIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    width: 24,
    height: 24,
  },
});

export default BackButton;
