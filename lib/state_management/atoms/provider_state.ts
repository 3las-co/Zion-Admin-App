import { atom } from 'recoil';
import { ProviderModel } from "../../models/provider_model";

export const providerState = atom<ProviderModel[]>({
    key: "providerListState",
    default: [],
});
