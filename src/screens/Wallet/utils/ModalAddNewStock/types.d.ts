import { IStocksWalletList } from '../../types';

export interface IModalAddNewStock {
  setModal: (setModal: boolean) => void;
  callback: () => void;
}

export interface IFormData {
  stock: string;
  buyDate: string;
  amount: string;
  value: string;
  otherCosts: string;
}
