import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTextField from "../../../components/CustomTextField";
import useClientsViewModel from "./clients_view_model";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { FacilityModel } from "../../../models/facility_model";
import { facilityState, selectedFacilityState, shiftsState } from "../../../state_management/atoms/facility_state";
import Navigation from "../../../navigation/navigation";

const ClientsTabView = () => {
    const {
        search,
        setSearch,
    } = useClientsViewModel();

    const facilityList: FacilityModel[] = useRecoilValue(facilityState);
    const setFacility = useSetRecoilState(selectedFacilityState);
    const setShiftList = useSetRecoilState(shiftsState);

    const filteredFacilities: FacilityModel[] = search.length > 1 ? facilityList.filter(item => item.name.toLowerCase().includes(search.toLowerCase())) : facilityList;

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
                      data={filteredFacilities}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.itemContainer}
                            onPress={() => {
                                // navigate to detail view with facility
                                setFacility(item);
                                setShiftList([]);
                                Navigation.navigate('ShiftList', item);
                            }}>
                          <Text style={{ fontSize: 16, color: '#434446' }}>{item.name}</Text>
                        </TouchableOpacity>
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
    itemContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        marginBottom: 12,
    },
    containerView: {
        flex: 1,
        alignItems: 'center',
    },
    listView: {
        flex: 1,
        width: '100%',
        padding: 16,
        backgroundColor: '#F7F7F8',
    },
    img: {
        width: 100,
        height: 64,
        resizeMode: 'contain',
    },
    text: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        color: '#434446',
        fontWeight: '400',
    },
});

export default ClientsTabView;
