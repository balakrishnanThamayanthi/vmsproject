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
    categoryButtonColor: string;
    categoryIsLooping: string;
    categoryLoopingConstant: string;
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
    DepartmentPrinterIds: number[];
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
    productCategoryIsLooping: boolean;
    productCategoryIsLoopingConstant: number;
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
    productBrandId: string;
    productCategoryId: string;
    productTagIds: number[];
    productViewOnline: boolean; // Assuming this should be a boolean
    productPrinterIds: number[];
    productIcon: string;
    productImg: string;
    productButtonColor: string;
    productBarcode: string;
    isActive: boolean; 
    phoneType: string;
    computerModel: string;
    computerRam: string;
    phoneColor: string;
    productDetailsIsLooping: boolean;
    productsDetailsLoopingConstant: string
    productCanSell: boolean;
  }

  export interface IProductEx {

    productName: string;
    phoneType: string;
    productCategoryId: string;
    productDetailsIsLooping: boolean;
    productsDetailsLoopingConstant: string
    
  }

  export interface IProductPopUP {
    id: number;
    productName: string;
    phoneType: string;
    productShortDescription: string;
    productLongDescription: string;
    productConversionUnit: number[];
    productBrandId: number | null;
    productCategoryId: number;
    productTagIds: number[];
    productViewOnline: boolean; // Assuming this should be a boolean
    productPrinterIds: number[];
    productIcon: string;
    productImg: string;
    productButtonColor: string;
    productBarcode: string;
    isActive: boolean; 
    productDetailsIsLooping: boolean;
    productsDetailsLoopingConstant: string;
    phoneLoopingDetails?: {
      productId: string;
      phoneType: string;
      phoneColor: string;
      phoneLoopingId: number;
    };
    computerLoopingDetails?: {
      productId: string;
      computerModel: string;
      computerRam: string;
      computerLoopingId: number;
    };
    productCanSell: boolean;
  }

  export interface ILastProductId {
    lastInsertedId: number, 
  }
  
  export interface IProductPayload {
    productBrandId: string;
    productCategoryId: string;
    productTagIds: string[];
    productViewOnline: string;
    createdDateEnd: Date;
    createdDateStart: Date;
  }

  export interface ICategoryPayload {
    departmentId: string;
    coursingId: string;
    roleId: string[];
    taxeId: string;
    createdDateEnd: Date;
    createdDateStart: Date;
  }

  export interface ISearchPayload {
    searchText: string;
  }

  export interface IModifier {
    id: number;
    modifierName: string;
    modifierTaxeIds: number[];
    modifierPrinterIds: number[];
    maxNoOfTimes: number;
    setModifierPrice: boolean;
    modifierPrice: number;
  }