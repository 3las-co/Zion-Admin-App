import { RecoilRoot } from "recoil";
import MainNavigator from "./lib/navigation/navigator";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./lib/navigation/navigation";
import NotificationHandler from "./lib/components/NotificationHandler";

export default function App() {
    return (
        <RecoilRoot>
            <NotificationHandler />
            <NavigationContainer ref={navigationRef}>
                <MainNavigator/>
                <Toast/>
            </NavigationContainer>
        </RecoilRoot>
    );
}
