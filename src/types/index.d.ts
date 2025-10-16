import { ReactNode } from "react";
export type FormFieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  touched?: boolean;
  children: ReactNode;
  className?: string;
};

export type FormHeadingProps = {
  title: string;
  subtitle: string;
};
export type User = {
  avatar: string;
  email: string;
  id: string;
  idToken: string;
  role: string;
};
export type AuthContextType = {
  signIn: (user: User) => void;
  signOut: () => void;
  user: User | null;
  isAuthenticated: () => boolean;
  hasRole: (role: string) => boolean;
  loading: boolean;
};

export type RoleContextType = {
  role: string;
  setRole: (role: string) => void;
};
export type BiometricType = {
  id: string;
  label: string;
  value: number;
  unit: string;
};
export type BiometricStatsProps = {
  biometrics: BiometricType[];
};
export type BiometricCardProps = {
  id: string;
  label: string;
  value: number;
  unit: string;
  onClick: (id: string) => void;
  activeStat: string;
};

export interface ChartDataType {
  date: string;
  value: number;
}

export interface ChartProps {
  chartName: string;
  data: ChartDataType[];
}

export type AiMessageType = {
  type: "user" | "ai";
  text: string;
}

export type ChatWindowProps = {
  messages: AiMessageType[];
  loading: boolean;
}
export type ChatInputProps = {
  onSend: (text: string) => void;
  loading: boolean;
}
