import { RegistrationData } from "../valueobject/registration-data";

export type StartRegistrationResult = {
  token: string;
  registrationData: RegistrationData;
};
