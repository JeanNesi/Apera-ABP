import { IReleasesList, IStocksWalletList } from '../../types';

export interface IModalEditRelease {
  releaseDetails: IReleasesList;
  setModal: (setModal: boolean) => void;
  callback: () => void;
}

export interface IFormData {
  stock: {
    value: string;
    label: string;
    icon: string;
  };
  buyDate: string;
  amount: string;
  value: string;
  otherCosts: string;
}
