export interface Admin {
  email: string;
  accessLevel: AccessLevel;
  firstName: string;
  lastName: string;
}

// Define possible access levels
export type AccessLevel = 'principal' | 'standard';
