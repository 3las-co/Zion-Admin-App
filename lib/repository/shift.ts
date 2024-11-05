import { ShiftModel } from "../models/shift_model";
import {
    collection,
    collectionGroup,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    onSnapshot,
    query,
} from "firebase/firestore";
import { db as firestore } from '../services/firebase_config';
import { ProviderModel } from "../models/provider_model";

export default class Shift {
    // Function to create a new shift under a specific facility
    static async createShift(shift: ShiftModel): Promise<boolean> {
        try {
            const facilityRef = doc(firestore, 'facilities', shift.facility.uniqueId);
            const facilitySnapshot = await getDoc(facilityRef);

            if (facilitySnapshot.exists()) {
                const shiftsRef = collection(facilityRef, 'shifts'); // Create or get the Shifts subcollection
                const shiftRef = doc(shiftsRef); // Create a document reference for the shift
                await setDoc(shiftRef, shift); // Create the shift document

                console.log(`Shift ${shift.name} created successfully under facility ${shift.facility.uniqueId}`);
                return true;
            } else {
                console.error(`Facility with id ${shift.facility.uniqueId} does not exist`);
                return false;
            }
        } catch (error) {
            console.error('Error creating shift: ', error);
            return false;
        }
    }

    // Function to update an existing shift
    static async updateShift(shift: ShiftModel): Promise<void> {
        try {
            const facilityRef = doc(firestore, 'facilities', shift.facility.uniqueId);
            const facilitySnapshot = await getDoc(facilityRef);

            if (facilitySnapshot.exists()) {
                const shiftRef = doc(facilityRef, 'shifts', shift.id); // Get shift reference

                // Manually create an update object
                const shiftUpdate = {
                    id: shift.id,
                    facilityId: shift.facility.uniqueId,
                    assignedTo: shift.assignedTo,
                    startDate: shift.startDate, // Serialize date
                    endDate: shift.endDate, // Serialize date
                    name: shift.name,
                    startTime: shift.startTime,
                    endTime: shift.endTime,
                };

                await updateDoc(shiftRef, shiftUpdate); // Update shift document
                console.log(`Shift ${shift.id} updated successfully in facility ${shift.facility.uniqueId}`);
            } else {
                console.error(`Facility with id ${shift.facility.uniqueId} does not exist`);
            }
        } catch (error) {
            console.error('Error updating shift: ', error);
        }
    }

    // Function to delete a shift
    static async deleteShift(facilityId: string, shiftId: string): Promise<void> {
        try {
            const shiftRef = doc(firestore, 'facilities', facilityId, 'shifts', shiftId); // Get shift document reference
            await deleteDoc(shiftRef); // Delete the shift
            console.log(`Shift ${shiftId} deleted successfully from facility ${facilityId}`);
        } catch (error) {
            console.error('Error deleting shift: ', error);
        }
    }

    // Function to fetch all shifts for a specific facility
    static async getShiftsByFacility(facilityId: string): Promise<ShiftModel[]> {
        try {
            const shiftsRef = collection(firestore, 'facilities', facilityId, 'shifts');
            const shiftsSnapshot = await getDocs(shiftsRef);

            return shiftsSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                  id: doc.id,
                  facility: data.facility,
                  assignedTo: data.assignedTo,
                  assignedByAdmin: data.assignedByAdmin,
                  startDate: data.startDate,
                  endDate: data.endDate,
                  name: data.name,
                  startTime: data.startTime,
                  endTime: data.endTime,
                }
            }) as ShiftModel[];
        } catch (error) {
            console.error(`Error fetching shifts for facility with ID: ${facilityId}`, error);
            return [];
        }
    }

    static async getAllShifts(): Promise<ShiftModel[]> {
        const shifts: ShiftModel[] = [];

        try {
            const q = query(
                collectionGroup(firestore, 'shifts')
            );
            const snapshot = await getDocs(q);

            snapshot.docs.forEach(doc => {
            const data = doc.data();
            shifts.push({
              id: doc.id,
              facility: data.facility,
              assignedTo: data.assignedTo,
              assignedByAdmin: data.assignedByAdmin,
              startDate: data.startDate,
              endDate: data.endDate,
              name: data.name,
              startTime: data.startTime,
              endTime: data.endTime,
            });
          });
        } catch (e) {
            console.error('Error getting all shifts: ', e);
        }
        return shifts;
    }

    // Real-time listener for shifts of a specific facility
    static listenToShifts(facilityId: string, onShiftsUpdate: (shifts: ShiftModel[]) => void): () => void {
        const shiftsRef = collection(firestore, 'facilities', facilityId, 'shifts');

        // Set up the real-time listener
        // Return the unsubscribe function to stop listening when no longer needed
        return onSnapshot(shiftsRef, snapshot => {
            const shifts: ShiftModel[] = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                  id: doc.id,
                  facility: data.facility,
                  assignedTo: data.assignedTo,
                  assignedByAdmin: data.assignedByAdmin,
                  startDate: data.startDate,
                  endDate: data.endDate,
                  name: data.name,
                  startTime: data.startTime,
                  endTime: data.endTime,
                }
            }) as ShiftModel[];
            onShiftsUpdate(shifts); // Trigger callback with updated shifts data
        }, error => {
            console.error('Error listening to shifts: ', error);
        });
    }

    static listenToAllShifts(
        onShiftsUpdate: (shifts: ShiftModel[]) => void
      ): () => void {
        const shiftsRef = collectionGroup(firestore, 'shifts');

        return onSnapshot(
          shiftsRef,
          snapshot => {
            const shifts: ShiftModel[] = snapshot.docs.map(doc => {
              const data = doc.data();
              return {
                id: doc.id,
                facility: data.facility,
                assignedTo: data.assignedTo,
                assignedByAdmin: data.assignedByAdmin,
                startDate: data.startDate,
                endDate: data.endDate,
                name: data.name,
                startTime: data.startTime,
                endTime: data.endTime,
              };
            }) as ShiftModel[];
            onShiftsUpdate(shifts);
          },
          error => {
            console.error('Error listening to shifts: ', error);
          }
        );
      }

    // Function to assign a shift to a provider
    static async assignShiftToProvider(facilityId: string, shiftId: string, provider: ProviderModel): Promise<void> {
        try {
            const shiftRef = doc(firestore, 'facilities', facilityId, 'shifts', shiftId); // Get shift reference
            await updateDoc(shiftRef, { assignedTo: provider, assignedByAdmin: true }); // Assign provider to the shift
            console.log(`Shift ${shiftId} assigned to provider ${provider.email} in facility ${facilityId}`);
        } catch (error) {
            console.error('Error assigning shift: ', error);
        }
    }
}
