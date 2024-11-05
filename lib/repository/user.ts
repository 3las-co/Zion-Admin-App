// User.ts
import { auth, db } from '../services/firebase_config';
import { Auth } from './auth';
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';
import { AccessLevel, Admin } from "../models/admin_model";
import { ShiftModel } from "../models/shift_model";
import firebase from "firebase/compat";
import firestore = firebase.firestore;

export class User {
  email: string;
  accessLevel: AccessLevel;

  constructor(email: string, accessLevel: AccessLevel = 'standard') {
    this.email = email;
    this.accessLevel = accessLevel;
  }

  // Get User Access
  static async getUserAccess(email: string): Promise<AccessLevel | null> {
    try {
      const userDoc = await getDoc(doc(db, 'admins', email));
      if (userDoc.exists()) {
        return userDoc.data()?.accessLevel as AccessLevel;
      } else {
        console.log('User not found.');
      }
    } catch (error) {
      console.error('Error getting user access:', error);
      return null;
    }

    return null;
  }

  // Create a New Admin
  static async createAdmin(email: string, firstName: string, lastName: string, accessLevel: AccessLevel = 'standard'): Promise<boolean> {
    try {
      const user = await Auth.sendEmailWithGeneratedPassword(email);
      if (user !== null) {
        await setDoc(doc(db, 'admins', email), {
          email,
          accessLevel,
          firstName,
          lastName,
        });
      }

      console.log(`Admin ${email} created with access level ${accessLevel}.`);
    } catch (error) {
      console.error('Error creating admin:', error);
      throw error;
    }

    return false;
  }

  // Delete an Admin
  static async deleteAdmin(email: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'admins', email));
      console.log(`Admin ${email} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  }

  static listenToAdmins(onAdminsUpdate: (shifts: Admin[]) => void): () => void {
    const adminsRef = collection(db, 'admins');

    return onSnapshot(adminsRef, snapshot => {
      const admins: Admin[] = snapshot.docs.map(doc => doc.data() as Admin);
      onAdminsUpdate(admins);
    }, error => {
      console.error('Error updating admins:', error);
    })
  }

  // View List of Admins
  static async viewAdmins(): Promise<Admin[] | null> {
    try {
      if (!(await User.isTopAccess(auth.currentUser?.email || ''))) {
        console.log('Only top access admins can view the list of admins.');
      }

      const snapshot = await getDocs(collection(db, 'admins'));
      // console.log('List of Admins:', admins);
      return snapshot.docs.map((doc) => doc.data() as Admin);
    } catch (error) {
      console.error('Error viewing admins:', error);
      return null;
    }
  }

  // Helper Method: Check if User Has Top Access
  static async isTopAccess(email: string): Promise<boolean> {
    try {
      const accessLevel = await User.getUserAccess(email);
      return accessLevel === 'principal';
    } catch (error) {
      console.error('Error checking access level:', error);
      return false;
    }
  }
}
