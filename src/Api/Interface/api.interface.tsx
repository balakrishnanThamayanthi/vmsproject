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
    id: number, 
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
    id: number, 
    companyName: string;
    displayName: string;
    address: string;
    description: string;
    openingHours: string;
    closingHours: string;
    imgUrl: string;
  }

  export interface IDepartment {
    id: number, 
    departmentName: string;
    description: string;
  }

  export interface ICoursing {
    id: number, 
    coursingName: string;
    priocity: string;
  }

  export interface ITaxes {
    id: number, 
    taxName: string;
    taxType: string;
    applyTo: string;
    percentage: string;
    taxCode: string;
  }

  export interface IProductCategory {
    id: number, 
    productCatName: string;
    productCatDescription: string;
    productCatImg: string;
    isMain: boolean;
    isActive: boolean;
    mainCatId: number
  }

  export interface IProductTag {
    id: number, 
    tagName: string;
    isActive: boolean;
  }

  export interface IProductBrand {
    id: number, 
    productBrandName: string;
    isActive: boolean;
  }

  export interface IPrinter {
    id: number, 
    printerName: string;
    printerDescription: string;
  }

  export interface IProduct {
    productName: string;
    productShortDescription: string;
    productLongDescription: string;
    productConversionUnit: number[];
    productBrandId: number | null;
    productCategoryId: number | null;
    productTagIds: number[];
    productViewOnline: boolean; // Assuming this should be a boolean
    productPrinterIds: number[];
    productIcon: string;
    productImg: string;
    productButtonColor: string;
    productBarcode: string;
    isActive: boolean; // Assuming this should be a boolean
  }
  
  