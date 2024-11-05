import React, { useEffect } from "react";
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useClientsViewModel from "../clients_tab/clients_view_model";
import { ProviderModel } from "../../../models/provider_model";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { providerState } from "../../../state_management/atoms/provider_state";
import { FacilityModel } from "../../../models/facility_model";
import { allShiftsState, facilityState, shiftsState } from "../../../state_management/atoms/facility_state";
import { addDays } from "date-fns";
import Utils from "../../../utils/utils";
import Shift from "../../../repository/shift";
import { ShiftModel } from "../../../models/shift_model";
import ShiftPieChart from "./shift_pie_chart";

const SCREEN_WIDTH = Dimensions.get('window').width;

const HomeTabView = () => {
    const shifts: ShiftModel[] = useRecoilValue(allShiftsState);
    const setShiftList = useSetRecoilState(allShiftsState);

    const {
        dates,
        selectedDate,
        setSelectedDate,
        setDates,
        getFacilities,
        getProviders,
        getAllShifts,
    } = useClientsViewModel();

    useEffect(() => {
        const generateDates = () => {
          const newDates = [];
          for (let i = 0; i < 20; i++) {
            const currentDate = addDays(new Date(), i);
            newDates.push(currentDate);
          }
          setDates(newDates);
        };

        generateDates();
        getFacilities().then();
        getProviders().then();
        getAllShifts().then();

        Shift.listenToAllShifts((val) => {
            setShiftList(val);
        })
    }, []);

    const providerList: ProviderModel[] = useRecoilValue(providerState);
    const facilityList: FacilityModel[] = useRecoilValue(facilityState);

    const renderItem = ({ item }: { item: { key: Date; day: string; date: string; month: string } }) => {
        const isSelected = selectedDate === item.key;
        return (
          <TouchableOpacity
            style={[styles.dateContainer, isSelected && styles.selectedDateContainer]}
            onPress={() => setSelectedDate(item.key)}
          >
            <Text style={[styles.dayText, isSelected && styles.selectedText]}>{item.day}</Text>
            <Text style={[styles.dateText, isSelected && styles.selectedText]}>{item.date}</Text>
            <Text style={[styles.monthText, isSelected && styles.selectedText]}>{item.month}</Text>
          </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerView}>
                <Image style={styles.img} source={require('../../../../assets/icons/logo.png')} />
                <ScrollView>
                    <View>
                        <Text style={styles.text}>Admin Overview</Text>
                        <View style={{height: 16}} />
                        <View style={styles.clientContainer}>
                            <View style={styles.facilityContainer}>
                                <Text style={styles.text}>{facilityList.length}</Text>
                                <View style={{height: 8}} />
                                <Text style={styles.desc}>{'Facilities'}</Text>
                            </View>
                            <View style={{width: 16}} />
                            <View style={styles.facilityContainer}>
                                <Text style={styles.text}>{providerList.length}</Text>
                                <View style={{height: 8}} />
                                <Text style={styles.desc}>{'Providers'}</Text>
                            </View>
                        </View>
                        <View style={{height: 32}} />
                        <FlatList
                            horizontal
                            data={dates.map((e) => Utils.dateToDetails(e))}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.key.toString()}
                            showsHorizontalScrollIndicator={false}
                        />
                        <View style={{height: 32}} />
                        <Text style={styles.text}>Shift Overview</Text>
                        <View style={{height: 16}} />
                        <View style={styles.clientContainer}>
                            <View style={styles.facilityContainer}>
                                <Text style={styles.text}>{shifts.length}</Text>
                                <View style={{height: 8}} />
                                <Text style={styles.desc}>{'Shifts'}</Text>
                            </View>
                            <View style={{width: 16}} />
                            <View style={styles.facilityContainer}>
                                <Text style={styles.text}>{shifts.filter(val => val.assignedTo !== null).length}</Text>
                                <View style={{height: 8}} />
                                <Text style={styles.desc}>{'Assigned'}</Text>
                            </View>
                            <View style={{width: 16}} />
                            <View style={styles.facilityContainer}>
                                <Text style={styles.text}>{shifts.filter(val => val.assignedTo === null).length}</Text>
                                <View style={{height: 8}} />
                                <Text style={styles.desc}>{'Unassigned'}</Text>
                            </View>
                        </View>
                        {shifts.length > 0 && (
                            <ShiftPieChart
                                assignedCount={shifts.filter(val => val.assignedTo !== null).length}
                                unassignedCount={shifts.filter(val => val.assignedTo === null).length}
                            />
                        )}
                    </View>
                </ScrollView>
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
    img: {
        width: 100,
        height: 64,
        resizeMode: 'contain',
    },
    text: {
        color: '#434446',
        fontSize: 16,
        fontWeight: '400',
    },
    clientContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    facilityContainer: {
        flex: 1,
        backgroundColor: '#F7F7F8',
        borderColor: '#DDDEDF',
        borderRadius: 4,
        height: 72,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    txt: {
        color: '#434446',
        fontSize: 20,
        fontWeight: '500',
    },
    desc: {
        color: '#66686B',
        fontSize: 12,
        fontWeight: '400',
    },
    dateContainer: {
        width: SCREEN_WIDTH / 6, // Adjust based on the number of items you want visible on the screen
        marginRight: 12,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#EDEDED',
      },
      selectedDateContainer: {
        backgroundColor: '#6A0DAD', // Purple color for selected item
      },
    dayText: {
        fontSize: 14,
        color: '#555',
      },
      dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
      },
      monthText: {
        fontSize: 14,
        color: '#555',
      },
      selectedText: {
        color: '#FFFFFF', // White text for selected item
      },
});

export default HomeTabView;
