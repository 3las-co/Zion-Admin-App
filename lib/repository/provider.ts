// Provider.ts
import { collection, deleteDoc, updateDoc, getDocs, doc, setDoc } from 'firebase/firestore';
import { db as firestore, auth } from '../services/firebase_config';
import { sendPasswordResetEmail } from 'firebase/auth';
import { ProviderModel } from "../models/provider_model";
import { FacilityModel } from "../models/facility_model";

export default class Provider {
  static async createProvider(
      firstName: string,
      lastName: string,
      email: string,
      type: string,
      allowedFacilities: FacilityModel[],
  ) {
    const providersDoc = doc(firestore, 'providers', email);

    const newProvider = {
      firstName,
      lastName,
      email,
      type,
      allowedFacilities,
    };

    setDoc(providersDoc, newProvider).then(() => {
      // Send email to reset password
      sendPasswordResetEmail(auth, email, {
        url: `https://zion-medical/reset-password`, // Customize this link
      }).then();
    });
  }

  static async deleteProvider(providerId: string) {
    const providerRef = doc(firestore, 'providers', providerId);
    await deleteDoc(providerRef);
  }

  static async getAllProviders(): Promise<ProviderModel[]> {
    const providersCollection = collection(firestore, 'providers');
    const providersSnapshot = await getDocs(providersCollection);
    return providersSnapshot.docs.map((doc) => doc.data()) as ProviderModel[];
  }

  static async updateProvider(providerId: string, updatedData: any) {
    const providerRef = doc(firestore, 'providers', providerId);
    await updateDoc(providerRef, updatedData);
  }
}
