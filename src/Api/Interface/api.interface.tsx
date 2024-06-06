export interface IApiResponse {
    records: any;
    id: string;
    department: IApiResponse | undefined;
    // title(title: any): unknown;
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