import React from "react";
import { Image, StyleSheet, View } from "react-native";
import useAuthViewModel from "./auth_view_model";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../components/BackButton";
import CustomText from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";
import CustomTextField from "../../components/CustomTextField";
import FormValidator from "../../services/form_validator";

const CreatePasswordView: React.FC = () => {
    const {
        password,
        confirmPassword,
        setPassword,
        setConfirmPassword,
        isLoading,
        canCreatePassword,
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
                    containerStyle={{width:'100%'}}
                    placeholder="Password"
                    value={password}
                    onValueChange={setPassword}
                    isPassword={true}
                    validator={{
                        errorMessage: 'Password field is required',
                        validate: FormValidator.basicValidator,
                    }}
                />
                <View style={{height: 16}} />
                <CustomTextField
                    containerStyle={{width:'100%'}}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onValueChange={setConfirmPassword}
                    isPassword={true}
                    validator={{
                        errorMessage: 'Password does not match',
                        validate: (val) => val === password,
                    }}
                />
                <View style={{height: 32}} />
                <CustomButton onPress={() => {
                    // update password
                }} text={'Proceed'} active={canCreatePassword} loading={isLoading} />
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

export default CreatePasswordView;
