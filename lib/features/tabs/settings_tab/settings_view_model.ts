import { useEffect, useState } from "react";
import { User } from "../../../repository/user";
import { AccessLevel, Admin } from "../../../models/admin_model";
import FormValidator from "../../../services/form_validator";
import { Auth } from "../../../repository/auth";
import { useSetRecoilState } from "recoil";
import { adminListState } from "../../../state_management/atoms/admins_state";

const useSettingsViewModel = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [canCreateAdmin, setCreateAdmin] = useState(false);
    const [showChangePasswordSheet, setShowChangePasswordSheet] = useState(false);
    const [showCreateAdminSheet, setShowCreateAdminSheet] = useState(false);
    const [showMenuSheet, setShowMenuSheet] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [accessLevel, setAccessLevel] = useState<AccessLevel>('principal');
    const [search, setSearch] = useState('');

    const setAdminsList = useSetRecoilState(adminListState);

    useEffect(() => {
        setChangePassword(
            FormValidator.isValidForm([
                {value: password, validator: FormValidator.basicValidator},
                {value: confirmPassword, validator: FormValidator.basicValidator},
                {value: oldPassword, validator: FormValidator.basicValidator},
            ]) && password === confirmPassword,
        )
        setCreateAdmin(
            FormValidator.isValidForm([
                {value: email, validator: FormValidator.emailValidator},
                {value: firstName, validator: FormValidator.basicValidator},
                {value: lastName, validator: FormValidator.basicValidator},
            ])
        )
    }, [password, confirmPassword, oldPassword, email, firstName, lastName]);

    const createAdmin = async () => {
        setIsLoading(true);
        const res = await User.createAdmin(email.toLowerCase(), firstName, lastName, accessLevel);
        setIsLoading(false);

        if (res) {
            getAdminsList().then();
        }
    };

    const deleteAdmin = async (email: string) => {
        await User.deleteAdmin(email.toLowerCase());
    };

    const getAdminsList = async () => {
        setIsLoading(true);
        const res: Admin[] | null = await User.viewAdmins();
        setIsLoading(false);

        setAdminsList(res ?? []);
    };

    const updatePassword = async () => {
        setIsLoading(true);
        const res: boolean = await Auth.updatePassword(oldPassword, password);
        setIsLoading(false);

        setOldPassword('');
        setPassword('');
        setConfirmPassword('');

        if (res) {
            setShowChangePasswordSheet(false);
        }
    };

    return {
        isLoading,
        email,
        firstName,
        lastName,
        accessLevel,
        password,
        confirmPassword,
        oldPassword,
        showChangePasswordSheet,
        changePassword,
        search,
        showCreateAdminSheet,
        canCreateAdmin,
        showMenuSheet,
        setShowMenuSheet,
        setShowCreateAdminSheet,
        setSearch,
        setShowChangePasswordSheet,
        setPassword,
        setConfirmPassword,
        setOldPassword,
        setEmail,
        setFirstName,
        setLastName,
        setAccessLevel,
        createAdmin,
        getAdminsList,
        updatePassword,
        deleteAdmin,
    }
};

export default useSettingsViewModel;
