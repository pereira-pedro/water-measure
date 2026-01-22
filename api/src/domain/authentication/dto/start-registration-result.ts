import { User } from "../models/user";

export type StartRegistrationResult = {
  token: string;
  user: User;
};
