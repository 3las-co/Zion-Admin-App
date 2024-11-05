import { atom } from 'recoil';
import { ShiftModel } from "../../models/shift_model";

export const clientState = atom<ShiftModel[]>({
    key: "clientState",
    default: []
});
