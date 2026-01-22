import { User } from "../models/user";
import { StartRegistrationResult } from "./start-registration-result";

export type CheckOtpResult = {
    isValid: boolean;
    registration?: StartRegistrationResult;
    user?: User
};