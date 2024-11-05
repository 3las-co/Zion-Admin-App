// Facility.ts
import { collection, addDoc, deleteDoc, updateDoc, getDocs, doc } from 'firebase/firestore';
import { db as firestore } from '../services/firebase_config';
import { FacilityModel } from "../models/facility_model";

export default class Facility {
  static async createFacility(
      position: number,
      name: string,
      email: string,
      phone: string,
      address: string,
      category: string,
  ) {
    const facilitiesCollection = collection(firestore, 'facilities');
    const uniqueId = `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${position.toString().padStart(3, '0')}`;

    const newFacility = {
      uniqueId,
      name,
      email,
      phone,
      address,
      category,
    };

    await addDoc(facilitiesCollection, newFacility);
  }

  static async deleteFacility(facilityId: string) {
    const facilityRef = doc(firestore, 'facilities', facilityId);
    await deleteDoc(facilityRef);
  }

  static async getAllFacilities(): Promise<FacilityModel[]> {
    const facilitiesCollection = collection(firestore, 'facilities');
    const facilitiesSnapshot = await getDocs(facilitiesCollection);
    return facilitiesSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        uniqueId: doc.id,
        name: data.name,
        email: data.email,
        address: data.address,
        phone: data.phone,
        category: data.category,
      }
    }) as FacilityModel[];
  }

  static async updateFacility(facilityId: string, updatedData: any) {
    const facilityRef = doc(firestore, 'facilities', facilityId);
    await updateDoc(facilityRef, updatedData);
  }
}
