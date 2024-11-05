import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AlertsTabView = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerView}>
                <Image style={styles.img} source={require('../../../../assets/icons/logo.png')} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    containerView: {
        flex: 1,
        alignItems: 'center',
    },
    img: {
        width: 100,
        height: 64,
        resizeMode: 'contain',
    },
});

export default AlertsTabView;
