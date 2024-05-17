export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  "status": boolean,
  "message": string,
  "data": {
      "token": string,
      "expires_in": number,
      "user_data": {
          "id": number,
          "name": string,
          "email": string,
          "email_verified_at": string,
          "created_at": string,
          "updated_at": string
      }
  }
}