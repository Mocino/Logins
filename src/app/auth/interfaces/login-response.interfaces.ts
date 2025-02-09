export interface LoginResponse {
  user: User,
  token: string
}

export interface User {
  email: string,
  password: string,
}
