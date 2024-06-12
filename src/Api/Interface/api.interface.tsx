export interface IApiResponse {
    records: any;
    id: string;
    code: number;
    status: boolean;
    message: string;
    data: object | string;
    title: string;
  }
  
  export interface IUser {
    username: string;
    password: string;
  }

  export interface IAuth {
    token: string;
  }