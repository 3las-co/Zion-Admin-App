import Facility from "../repository/facility";
import { ProviderModel } from "../models/provider_model";

export interface GeneralSheetProps {
    visible: boolean;
    onClose: () => void;
}

export interface SelectFacilitySheetProps {
    visible: boolean;
    onClose: (facility: Facility | null) => void;
}

export interface CreateProviderSheetProps {
    visible: boolean;
    onClose: () => void;
}

export interface CreateShiftSheetProps {
    visible: boolean;
    onClose: () => void;
}

export interface ProviderListSheetProps {
    visible: boolean;
    onClose: (val?: ProviderModel) => void;
}

export type DropDownItem = {
  id?: number;
  label: string;
  value: any;
};
