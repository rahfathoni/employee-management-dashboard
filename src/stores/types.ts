export interface IUserLoginRequest {
  email: string;
  password: string;
}

// export interface UserLoginResponse {
//   "status": boolean,
//   "message": string,
//   "data": {
//       "token": string,
//       "expires_in": number,
//       "user_data": {
//           "id": number,
//           "name": string,
//           "email": string,
//           "email_verified_at": string,
//           "created_at": string,
//           "updated_at": string
//       }
//   }
// }

export interface IEmployees {
  id: number;
  name: string;
  gender: string;
  email: string;
  phone: string;
  date_of_birth: string;
  address: string;
  departement: string;
  position: string;
  status: string;
}

// export interface IEmployeesListResponse {
//   status: boolean;
//   message: string;
//   data: {
//     list: IEmployees[];
//     total: number;
//     current_page: number;
//     total_page: number;
//   };
// }