import React from "react";
import useAuthViewModel from "./auth_view_model";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, StyleSheet, View } from "react-native";
import BackButton from "../../components/BackButton";
import CustomText from "../../components/CustomText";
import FormValidator from "../../services/form_validator";
import CustomTextField from "../../components/CustomTextField";
import CustomButton from "../../components/CustomButton";
import Navigation from "../../navigation/navigation";

const ForgotPasswordView: React.FC = () => {
    const {
        email,
        setEmail,
        emailEntered,
        forgotPassword,
    } = useAuthViewModel();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerView}>
                <View  style={styles.header}>
                    <BackButton />
                    <View style={{flex: 1}} />
                    <Image style={styles.img} source={require('../../../assets/icons/logo.png')} />
                    <View style={{flex: 1}} />
                </View>
                <View style={{height: 16}} />
                <CustomText text={'Forgot your password?'} fontSize={18} fontWeight={'400'} />
                <View style={{height: 8}} />
                <CustomText text={'Enter your email and a reset link will be sent to you'} fontSize={16} fontWeight={'400'} color={'#434446'} alignment={'center'} />
                <View style={{height: 16}} />
                <CustomTextField
                    style={{width: '100%', height: 40}}
                    placeholder="Email address"
                    value={email}
                    onValueChange={setEmail}
                    keyboardType="email-address"
                    isPassword={false}
                    validator={{
                        errorMessage: 'Invalid email address',
                        validate: FormValidator.emailValidator,
                    }}
                />
                <View style={{height: 32}} />
                <CustomButton onPress={() => {
                    // navigate to create password view
                    forgotPassword().then();
                }} text={'Reset password'} active={emailEntered} />
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    img: {
        width: 100,
        height: 64,
        resizeMode: 'contain',
        marginRight: 24,
    },
});

export default ForgotPasswordView;
