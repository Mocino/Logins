import { User } from "./login-response.interfaces";

export interface checkTokenResponse {
  user: User,
  token: string
}
