import React, { useEffect } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useClientsViewModel from "../clients_tab/clients_view_model";
import { SafeAreaView } from "react-native-safe-area-context";
import { addDays } from "date-fns";
import { FacilityModel } from "../../../models/facility_model";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedFacilityState, selectedShiftState, shiftsState } from "../../../state_management/atoms/facility_state";
import { ShiftModel } from "../../../models/shift_model";
import Utils from "../../../utils/utils";
import ShiftCard from "../../../components/ShiftCard";
import CustomDatePicker from "../../../components/CustomDatePicker";
import BackButton from "../../../components/BackButton";
import ProviderListSheet from "../sheets/provider_list_sheet";
import Shift from "../../../repository/shift";
import CustomButton from "../../../components/CustomButton";
import CreateShiftSheet from "../sheets/create_shift_sheet";

const SCREEN_WIDTH = Dimensions.get('window').width;

const ShiftsView = () => {
    const data: FacilityModel | null = useRecoilValue(selectedFacilityState);
    const shifts: ShiftModel[] = useRecoilValue(shiftsState);
    const selectedShift: ShiftModel | null = useRecoilValue(selectedShiftState);

    const setSelectedShift = useSetRecoilState(selectedShiftState);
    const setShiftList = useSetRecoilState(shiftsState);

    const {
        dates,
        selectedDate,
        showProviderList,
        showCreateShiftSheet,
        setShowCreateShiftSheet,
        setShowProviderList,
        setSelectedDate,
        setDates,
        getShifts,
        assignShift,
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
        getShifts(data).then();
        if (data !== null) {
            Shift.listenToShifts(data?.uniqueId, (val) => {
                setShiftList(val);
            });
        }
    }, []);

    const filterShiftsByDate = (): ShiftModel[] => {
        if (selectedDate === null) {
            return shifts;
        }
      return shifts.filter((shift) => {
        const start = Utils.parseDateString(shift.startDate) ?? new Date();
        const end = Utils.parseDateString(shift.endDate) ?? new Date();
        return selectedDate >= start && selectedDate <= end;
      });
    };

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
                <View style={styles.header}>
                    <BackButton />
                    <View style={{ flex: 1 }} />
                    <Image style={styles.img} source={require('../../../../assets/icons/logo.png')} />
                    <View style={{ flex: 1 }} />
                </View>
                <View style={{height: 16}} />
                <FlatList
                    horizontal
                    data={dates.map((e) => Utils.dateToDetails(e))}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.key.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                />
                <View style={{height: 16}} />
                <CustomDatePicker onDateChange={setSelectedDate} title={''}/>
                <View style={{height: 16}} />
                {shifts.length > 0 && (
                    <FlatList
                        horizontal={false}
                        data={filterShiftsByDate()}
                        renderItem={({item}) => (
                            <ShiftCard
                                shift={item}
                                onOptionsPress={() => {
                                    // show Shift menu sheet
                                }}
                                onPlusPress={() => {
                                    // if unassigned. show provider list
                                    if (item.assignedTo === null) {
                                        // show sheet
                                        setSelectedShift(item);
                                        setShowProviderList(true);
                                    }
                                }}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ width: SCREEN_WIDTH }}
                    />
                )}
                {shifts.length === 0 && (
                    <View style={{}}>
                        <View style={{height: 32}} />
                        <Text>No Shifts have been created for this Facility</Text>
                        <CustomButton style={{paddingHorizontal: 16, alignSelf: 'center'}} onPress={() => {
                            setShowCreateShiftSheet(true);
                        }} text={'Create Shift'} />
                    </View>
                )}
            </View>
            <ProviderListSheet
                visible={showProviderList}
                onClose={(val) => {
                    setShowProviderList(false);
                    // if val is not undefined, assign shift
                    if (val && data !== null && selectedShift !== null) {
                        assignShift(data?.uniqueId, selectedShift?.id, val).then();
                    }
                }}
            />
            <CreateShiftSheet visible={showCreateShiftSheet} onClose={() => {
                setShowCreateShiftSheet(false);
            }} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 16,
    },
    containerView: {
        alignItems: 'center',
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
    },
    dateContainer: {
        width: SCREEN_WIDTH / 6, // Adjust based on the number of items you want visible on the screen
        marginHorizontal: 5,
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

export default ShiftsView;
