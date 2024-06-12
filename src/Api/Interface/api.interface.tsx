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

  export interface ICategory {
    categoryName: string;
    departmentId: number;
    roleId: number;
    coursingId: number;
    servingSize: number;
    hidePos: boolean;
    hideOnlineOrder: boolean;
    hideKiosk: boolean;
    Conversational: boolean;
    itemServiceCharge: string;
    ageRestriction: boolean;
    excludeCheckTax: boolean;
    kitchenPrinters: boolean;
    labelPrinters: boolean;
    restrictPrinters: boolean;
    taxeId: number;
    kitchenPrintersTypes: string;
  }
  
  export interface ICompany {
    companyName: string;
    displayName: string;
    address: string;
    description: string;
    openingHours: string;
    closingHours: string;
    imgUrl: string;
  }