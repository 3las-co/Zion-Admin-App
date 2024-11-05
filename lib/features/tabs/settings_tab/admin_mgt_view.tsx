import React, { useEffect } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../../components/BackButton";
import CustomTextField from "../../../components/CustomTextField";
import useSettingsViewModel from "./settings_view_model";
import { Ionicons } from "@expo/vector-icons";
import { Admin } from "../../../models/admin_model";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { adminState } from "../../../state_management/atoms/user_state";
import CreateAdminSheet from "./create_admin_sheet";
import { adminListState } from "../../../state_management/atoms/admins_state";
import { User } from "../../../repository/user";

const AdminMgtView = () => {
  const { search, showCreateAdminSheet, setShowCreateAdminSheet, setSearch, getAdminsList, deleteAdmin } = useSettingsViewModel();

  const user: Admin | null = useRecoilValue(adminState);
  const adminList: Admin[] = useRecoilValue(adminListState);

  const setAdminsList = useSetRecoilState(adminListState);

  useEffect(() => {
    getAdminsList().then();

    User.listenToAdmins((val) => {
      setAdminsList(val);
    });
  }, []);

  const isPrincipal: boolean = user?.accessLevel === "principal";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <View style={{ flex: 1 }} />
        <Image style={styles.img} source={require('../../../../assets/icons/logo.png')} />
        <View style={{ flex: 1 }} />
      </View>
      <CustomTextField
        containerStyle={{ padding: 16 }}
        style={{ width: '100%', height: 40 }}
        placeholder="Search"
        value={search}
        onValueChange={setSearch}
      />
      <View style={styles.containerView}>
        <FlatList
          data={adminList}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={{ fontSize: 16, color: '#434446' }}>{`${item.firstName} ${item.lastName}`}</Text>
              {isPrincipal && <Ionicons
                  onPress={() => {
                    deleteAdmin(item.email).then();
                  }}
                  name="trash" size={24}
                  color="#D64C4C"
              />}
            </View>
          )}
          keyExtractor={item => item.email}
        />
        {isPrincipal && (
          <TouchableOpacity
            style={styles.fab}
            onPress={() => {
              // show add admin sheet
              setShowCreateAdminSheet(true);
            }}
          >
            <Image
              style={{ height: 44, width: 44 }}
              source={require('../../../../assets/icons/add.png')}
            />
          </TouchableOpacity>
        )}
      </View>
      <CreateAdminSheet visible={showCreateAdminSheet} onClose={() => {
        setShowCreateAdminSheet(false);
      }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 16,  // Position the button at the bottom
    right: 16,   // Position the button at the trailing end (right side)
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  img: {
    width: 100,
    height: 64,
    resizeMode: 'contain',
    marginRight: 24,
  },
  containerView: {
    flex: 1,
    width: '100%',
    padding: 16,
    backgroundColor: '#F7F7F8',
  },
});

export default AdminMgtView;
