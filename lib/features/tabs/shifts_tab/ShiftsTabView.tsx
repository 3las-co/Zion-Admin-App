import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTextField from "../../../components/CustomTextField";
import useClientsViewModel from "../clients_tab/clients_view_model";
import { ProviderModel } from "../../../models/provider_model";
import { useRecoilValue } from "recoil";
import { providerState } from "../../../state_management/atoms/provider_state";

const ShiftsTabView = () => {
    const {
        search,
        setSearch,
    } = useClientsViewModel();

    const providerList: ProviderModel[] = useRecoilValue(providerState);

    const filteredProviders: ProviderModel[] = search.length > 1 ? providerList.filter(item => item.firstName.toLowerCase().includes(search.toLowerCase())) : providerList;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerView}>
                <Image style={styles.img} source={require('../../../../assets/icons/logo.png')} />
                <CustomTextField
                    containerStyle={{ padding: 16 }}
                    style={{ width: '100%', height: 40 }}
                    placeholder="Search"
                    value={search}
                    onValueChange={setSearch}
                />
                <View style={styles.listView}>
                    <FlatList
                      data={filteredProviders}
                      renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                          <Text style={{ fontSize: 16, color: '#434446' }}>{`${item.firstName} ${item.lastName}`}</Text>
                        </View>
                      )}
                      keyExtractor={item => item.email}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 16,
    },
    listView: {
        flex: 1,
        width: '100%',
        padding: 16,
        backgroundColor: '#F7F7F8',
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
});

export default ShiftsTabView;
