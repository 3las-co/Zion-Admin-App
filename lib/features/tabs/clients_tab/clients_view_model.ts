import { useEffect, useState } from "react";
import FormValidator from "../../../services/form_validator";
import { FacilityModel } from "../../../models/facility_model";
import Provider from "../../../repository/provider";
import { ProviderModel } from "../../../models/provider_model";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { providerState } from "../../../state_management/atoms/provider_state";
import { allShiftsState, facilityState, shiftsState } from "../../../state_management/atoms/facility_state";
import Facility from "../../../repository/facility";
import Shift from "../../../repository/shift";
import { ShiftModel } from "../../../models/shift_model";
import Utils from "../../../utils/utils";

const useClientsViewModel = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showProviderList, setShowProviderList] = useState(false);
    const [showCreateShiftSheet, setShowCreateShiftSheet] = useState(false);
    const [canCreateProvider, setCanCreateProvider] = useState(false);
    const [canCreateFacility, setCanCreateFacility] = useState(false);
    const [canCreateShift, setCanCreateShift] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [shiftName, setShiftName] = useState('');
    const [lastName, setLastName] = useState('');
    const [facilityName, setFacilityName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [search, setSearch] = useState('');
    const [selectedFacility, setSelectedFacility] = useState<FacilityModel | null>(null);
    const [selectedFacilities, setSelectedFacilities] = useState<FacilityModel[]>([]);
    const [providerType, setProviderType] = useState<string | null>(null);
    const [facilityCategory, setFacilityCategory] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [dates, setDates] = useState<Date[]>([]);

    const providerList: ProviderModel[] = useRecoilValue(providerState);
    const facilityList: FacilityModel[] = useRecoilValue(facilityState);
    const setProviderList = useSetRecoilState(providerState);
    const setFacilityList = useSetRecoilState(facilityState);
    const setShiftList = useSetRecoilState(shiftsState);
    const setAllShiftList = useSetRecoilState(allShiftsState);

    useEffect(() => {
        setCanCreateProvider(
            FormValidator.isValidForm([
                {value: email, validator: FormValidator.emailValidator},
                {value: firstName, validator: FormValidator.basicValidator},
                {value: lastName, validator: FormValidator.basicValidator},
            ]) && providerType !== null && selectedFacilities.length > 0
        );
        setCanCreateFacility(
            FormValidator.isValidForm([
                {value: email, validator: FormValidator.emailValidator},
                {value: facilityName, validator: FormValidator.basicValidator},
                {value: phoneNumber, validator: FormValidator.basicValidator},
                {value: address, validator: FormValidator.basicValidator},
            ]) && facilityCategory !== null
        );
        setCanCreateShift(
          startDate !== null
            && endDate !== null
            && selectedDuration !== null
            && selectedFacility !== null
            && startTime !== null
            && endTime !== null
            && (selectedDuration === 'custom' ? shiftName !== '' : selectedDuration !== null)
        );
    }, [
        email,
        firstName,
        lastName,
        providerType,
        selectedFacility,
        selectedFacilities,
        facilityName,
        phoneNumber,
        address,
        facilityCategory,
        startDate,
        endDate,
        startTime,
        endTime,
        selectedDuration,
        shiftName,
    ]);

    const createProvider = async () => {
        setIsLoading(true);
        try {
            await Provider.createProvider(
                firstName,
                lastName,
                email.toLowerCase(),
                providerType!,
                selectedFacilities,
            );
            getProviders().then();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    };

    const createFacility = async () => {
        setIsLoading(true);
        try {
            await Facility.createFacility(
                facilityList.length + 1,
                facilityName,
                email,
                phoneNumber,
                address,
                facilityCategory!,
            );
            getFacilities().then();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    };

    const createShift = async () => {
      setIsLoading(true);
      const uniqueId = `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;

      const shift: ShiftModel = {
          id: uniqueId,
          facility: selectedFacility!,
          assignedTo: null,
          assignedByAdmin: true,
          startDate: Utils.formatDate(startDate!),
          endDate: Utils.formatDate(endDate!),
          name: selectedDuration === 'custom' ? shiftName : selectedDuration!,
          startTime: Utils.formatTime24Hour(startTime!),
          endTime: Utils.formatTime24Hour(endTime!),
      }

      console.log(shift);

      try {
        const res = await Shift.createShift(shift);
        if (res) {
            // do something
        }
      } catch (e) {
          console.log(e);
      }
    };

    const getProviders = async () => {
      setIsLoading(true);
      try {
          const res = await Provider.getAllProviders();
          setProviderList(res);
          setIsLoading(false);
      } catch (error) {
          setIsLoading(false);
          console.error(error);
      }
    };

    const getFacilities = async () => {
        setIsLoading(true);
        try {
            const res = await Facility.getAllFacilities();
            setFacilityList(res);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    };

    const getShifts = async (facility: FacilityModel | null) => {
        if (facility === null) {
            return;
        }
      try {
          const res = await Shift.getShiftsByFacility(facility.uniqueId);
          if (res.length > 0) {
              setShiftList(res);
          }
      } catch (e) {
          console.error(e);
      }
    };

    const getAllShifts = async () => {
        const res = await Shift.getAllShifts();
        if (res.length > 0) {
            setAllShiftList(res);
        }
    }

    const assignShift = async (facilityId: string, shiftId: string, provider: ProviderModel) => {
        try {
            await Shift.assignShiftToProvider(facilityId, shiftId, provider);
        } catch (e) {
            console.error(e);
        }
    };

    return {
        isLoading,
        canCreateProvider,
        canCreateFacility,
        canCreateShift,
        firstName,
        lastName,
        email,
        facilityName,
        facilityCategory,
        phoneNumber,
        address,
        providerType,
        selectedFacility,
        selectedFacilities,
        search,
        startDate,
        endDate,
        startTime,
        endTime,
        selectedDuration,
        shiftName,
        selectedDate,
        dates,
        showProviderList,
        showCreateShiftSheet,
        setShowCreateShiftSheet,
        setShowProviderList,
        setDates,
        setSelectedDate,
        setShiftName,
        setStartDate,
        setEndDate,
        setStartTime,
        setEndTime,
        setSearch,
        setSelectedFacility,
        setSelectedFacilities,
        setProviderType,
        setAddress,
        setPhoneNumber,
        setFacilityCategory,
        setFacilityName,
        setEmail,
        setLastName,
        setFirstName,
        createFacility,
        createProvider,
        getFacilities,
        getProviders,
        setSelectedDuration,
        createShift,
        getShifts,
        assignShift,
        getAllShifts,
    }
};

export default useClientsViewModel;
