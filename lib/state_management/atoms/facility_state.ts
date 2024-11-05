import { atom } from 'recoil';
import { FacilityModel } from "../../models/facility_model";
import { ShiftModel } from "../../models/shift_model";

export const facilityState = atom<FacilityModel[]>({
   key: "facilityListState",
   default: [],
});

export const selectedFacilityState = atom<FacilityModel | null>({
   key: "selectedFacilityState",
   default: null,
});

export const shiftsState = atom<ShiftModel[]>({
   key: "shiftListState",
   default: [],
});

export const allShiftsState = atom<ShiftModel[]>({
   key: "allShiftListState",
   default: [],
});

export const selectedShiftState = atom<ShiftModel | null>({
   key: "selectedShiftState",
   default: null,
});
