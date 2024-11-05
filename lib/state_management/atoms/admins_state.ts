import { atom } from 'recoil';
import { Admin } from "../../models/admin_model";

export const adminListState = atom<Admin[]>({
  key: 'adminListState',
  default: [],
});
