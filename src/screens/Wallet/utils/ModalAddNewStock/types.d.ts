import { IStocksWalletList } from '../../types';

export interface IModalAddNewStock {
  setModal: (setModal: boolean) => void;
  stocksWalletList?: IStocksWalletList[];
  callback: () => void;
}

export interface IFormData {
  stock: string;
  asset: string;
  buyDate: string;
  amount: string;
  value: string;
  otherCosts: string;
}
