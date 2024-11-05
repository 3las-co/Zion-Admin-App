import { FacilityModel } from "./facility_model";
import { ProviderModel } from "./provider_model";

export interface ShiftModel {
    id: string;
    facility: FacilityModel;
    assignedTo: ProviderModel | null;
    assignedByAdmin: boolean;
    startDate: string;
    endDate: string;
    name: string;
    startTime: string;
    endTime: string;
}
