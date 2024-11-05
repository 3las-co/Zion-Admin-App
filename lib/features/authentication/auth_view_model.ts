import {useEffect, useState} from "react";
import FormValidator from "../../services/form_validator";
import {Auth} from "../../repository/auth";
import Navigation from "../../navigation/navigation";
import { Admin } from "../../models/admin_model";
import { adminState } from "../../state_management/atoms/user_state";
import { useSetRecoilState } from "recoil";
import { registerForPushNotificationsAsync } from "../../services/notifications";

const useAuthViewModel = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [canLogin, setCanLogin] = useState(false);
    const [emailEntered, setEmailEntered] = useState(false);
    const [canCreatePassword, setCanCreatePassword] = useState(false);

    const setAdminState = useSetRecoilState(adminState);

    useEffect(() => {
      setCanLogin(
        FormValidator.isValidForm([
          {value: email, validator: FormValidator.emailValidator},
          {value: password, validator: FormValidator.basicValidator},
        ]),
      );
      setEmailEntered(
        FormValidator.isValidForm([
          {value: email, validator: FormValidator.emailValidator},
        ]),
      );
      setCanCreatePassword(
        FormValidator.isValidForm([
          {value: password, validator: FormValidator.passwordValidator},
        ]) && password === confirmPassword,
      );
    }, [email, password, confirmPassword]);

    const handleLogin = async () => {
      setIsLoading(true);
      const user: Admin | null = await Auth.login(email.toLowerCase(), password);
      const token: string | null = await registerForPushNotificationsAsync();
      if (token !== null) {
          await Auth.updateToken(email.toLowerCase(), token);
      }
      setIsLoading(false);

      if (user !== null) {
          setEmail('');
          setPassword('');
        // save user data
        setAdminState(user);
        // navigate to dashboard
        Navigation.navigate('Tab');
      }
    };

    const forgotPassword = async () => {
      setIsLoading(true);
      const res: boolean = await Auth.forgotPassword(email.toLowerCase());
      setIsLoading(false);

      if (res) {
        Navigation.goBack();
      }
    };

    return {
      email,
      password,
      confirmPassword,
      isLoading,
      canLogin,
      emailEntered,
      canCreatePassword,
      setEmail,
      setPassword,
      setConfirmPassword,
      setIsLoading,
      handleLogin,
      forgotPassword
    };
};

export default useAuthViewModel;
