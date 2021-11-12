interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  provider?: string;
  role?: number;
  confirmPassword?: string;
  tc?: boolean;
}

interface StepList {
  id: string;
  title: string;
}

interface ProfileInfo {
  goal: string;
  calories: string;
  type: string;
  allergies: string[];
  incompatibilities: string[];
  additional: string[];
}
