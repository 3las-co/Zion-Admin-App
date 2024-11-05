// adminState.ts
import { atom } from 'recoil';
import { Admin } from "../../models/admin_model";

export const adminState = atom<Admin | null>({
  key: 'adminState', // Unique ID (with respect to other atoms/selectors)
  default: null, // Default value (initial state)
});
