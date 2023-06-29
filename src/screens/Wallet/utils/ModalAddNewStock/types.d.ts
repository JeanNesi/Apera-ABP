export interface IModalAddNewStock {
  setModal: (setModal: boolean) => void;
}

export interface IFormData {
  assetType: string;
  asset: string;
  buyDate: string;
  amount: string;
  value: string;
  otherCosts: string;
}
