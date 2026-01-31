import { RegistrationData } from "src/domain/authentication/valueobject/registration-data";

export type UpdateRegistrationCommand = {
  token: string;
  data: RegistrationData;
  canCommit: boolean;
};
