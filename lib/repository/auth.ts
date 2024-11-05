// Auth.ts
import { auth, db } from '../services/firebase_config';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
  updatePassword as firebaseUpdatePassword,
  UserCredential
} from 'firebase/auth';
import firebase from "firebase/compat";
import Toast from "react-native-toast-message";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { Admin } from "../models/admin_model";
import FirebaseError = firebase.FirebaseError;
import firestore = firebase.firestore;

export class Auth {
  // Login Method
  static async login(email: string, password: string): Promise<Admin | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const adminsCollectionRef = collection(db, 'admins');
      const q = query(adminsCollectionRef, where('email', '==', userCredential.user.email));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs[0].data() as Admin;
    } catch (error) {
      const e = error as FirebaseError;
      console.log('Login Error:', e.message);
      Toast.show({
        type: 'error',
        text1: 'Login',
        text2: 'Invalid Credentials',
        position: 'bottom',
        onShow: (() => {
          return null;
        })
      });
      return null;
    }
  }

  static async updateToken(email: string, token: string): Promise<boolean> {
    try {
      const adminsRef = doc(db, 'admins', email);
      await updateDoc(adminsRef, { pushToken: token });
      console.log('Token saved successfully');
      return true;
    } catch (error) {
      console.error('Error saving token to Firestore:', error);
      return false;
    }
  }

  static async forgotPassword(email: string): Promise<boolean> {
    if (!email) {
      console.error('Forgot Password Error: Email is required.');
      return false;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error: any) {
      console.error('Forgot Password Error:', error);
      if (error.code === 'auth/invalid-email') {
        Toast.show({
          type: 'error',
          text1: 'Forgot Password',
          text2: 'Invalid email address. Please check the email and try again.',
          position: 'bottom',
        });
      } else if (error.code === 'auth/user-not-found') {
        Toast.show({
          type: 'error',
          text1: 'Forgot Password',
          text2: 'No user found with this email address.',
          position: 'bottom',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Forgot Password',
          text2: 'Failed to send password reset email. Please try again later.',
          position: 'bottom',
        });
      }

      return false;
    }
  }

  // Update Password Method
  static async updatePassword(currentPassword: string, newPassword: string): Promise<boolean> {
    try {
      const user = auth.currentUser;

      console.log(user);

      if (user && user.email) {
        // Step 1: Reauthenticate the user with the current password
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);

        // Step 2: Update the user's password
        await firebaseUpdatePassword(user, newPassword);
        return true;
      } else {
        console.log('No user is currently logged in or user does not have an email.');
        return false;
      }
    } catch (error: any) {
      console.error('Error updating user password:', error);
      if (error.code === 'auth/wrong-password') {
        Toast.show({
          type: 'error',
          text1: 'Update Password',
          text2: 'The password is incorrect.',
          position: 'bottom',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Update Password',
          text2: 'An error occurred.',
          position: 'bottom',
        });
      }
      return false;
    }
  }

  // Send Email with Generated Password
  static async sendEmailWithGeneratedPassword(email: string): Promise<UserCredential | null> {
    try {
      const generatedPassword = Math.random().toString(36).slice(-8); // Generate random password
      const userCredential = await createUserWithEmailAndPassword(auth, email, generatedPassword);
      await sendPasswordResetEmail(auth, email); // Send password reset email
      console.log(`Email sent to ${email} with instructions to reset password.`);
      return userCredential;
    } catch (error) {
      console.error('Error sending email:', error);
      return null;
    }
  }
}
