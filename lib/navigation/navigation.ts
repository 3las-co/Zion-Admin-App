import {
  createNavigationContainerRef,
  StackActions,
  CommonActions,
} from '@react-navigation/native';
import {RootStackParamList} from './stack_param_list';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const navigate = (name: keyof RootStackParamList, params?: any) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

// const navigateToTab = (tabName: keyof RootStackParamList, params?: any) => {
//   if (navigationRef.isReady()) {
//     navigationRef.navigate('Tab', {
//       screen: tabName,
//       params: params,
//     });
//   }
// };

const goBack = () => {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
};

const reset = (name: keyof RootStackParamList, params?: any) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name, params}],
      }),
    );
  }
};

const replace = (name: keyof RootStackParamList, params?: any) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
};

const NavigationService = {
  navigate,
  // navigateToTab,
  goBack,
  reset,
  replace,
};

export default NavigationService;
