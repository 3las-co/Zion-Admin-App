import React from "react";
import {Image, StyleSheet, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import CustomText from "../../components/CustomText";
import CustomTextField from "../../components/CustomTextField";
import FormValidator from "../../services/form_validator";
import useAuthViewModel from "./auth_view_model";
import CustomButton from "../../components/CustomButton";
import TextButton from "../../components/TextButton";
import Navigation from "../../navigation/navigation";

const LoginView = () => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        isLoading,
        canLogin,
        handleLogin,
    } = useAuthViewModel();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerView}>
                <Image style={styles.img} source={require('../../../assets/icons/logo.png')} />
                <View style={{height: 16}} />
                <CustomText text={'WELCOME'} fontSize={18} fontWeight={'400'} />
                <View style={{height: 8}} />
                <CustomText text={'Sign in to access admin dashboard'} fontSize={16} fontWeight={'400'} color={'#434446'} />
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
                <View style={{height: 16}} />
                <CustomTextField
                    containerStyle={{width:'100%'}}
                    placeholder="Password"
                    value={password}
                    onValueChange={setPassword}
                    isPassword={true}
                    validator={{
                        errorMessage: 'Password must not be empty',
                        validate: FormValidator.basicValidator,
                    }}
                />
                <View style={{height: 16}} />
                <TextButton
                  style={styles.forgotPasswordText}
                  text="Forgot password?"
                  onTap={() => {
                      Navigation.navigate('ForgotPassword');
                  }}
                />
                <View style={{height: 32}} />
                <CustomButton onPress={() => {
                    handleLogin().then();
                }} text={'Login'} loading={isLoading} active={canLogin} />
            </View>
        </SafeAreaView>
    );
}

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
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    img: {
        width: 100,
        height: 64,
        resizeMode: 'contain',
    },
    forgotPasswordText: {
        alignSelf: 'flex-end',
    }
});

export default LoginView;
