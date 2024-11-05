import { FacilityModel } from "./facility_model";

export interface ProviderModel {
    email: string;
    firstName: string;
    lastName: string;
    providerType: string;
    facilities: FacilityModel[];
    pushToken: string;
}
