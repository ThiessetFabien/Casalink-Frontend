import { SignupCredentialsI } from './signupCredentials';
import { SiginCredentialsI } from './signinCredentials';

export interface UserStateI {
  logged: boolean;
  foyer: string;
  credentials: {
    login: SiginCredentialsI;
    signup: SignupCredentialsI;
  };
  pseudo: null | string;
  token: null | string;
  error: null | string;
}
