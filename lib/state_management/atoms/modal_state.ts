// modalState.ts
import { atom } from 'recoil';

export const modalVisibleState = atom<boolean>({
  key: 'modalVisibleState',
  default: false,
});

export const modalTypeState = atom<'provider' | 'facility' | 'shift' | null>({
  key: 'modalTypeState',
  default: null,
});
