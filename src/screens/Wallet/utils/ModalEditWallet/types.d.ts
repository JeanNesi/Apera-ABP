export interface IModalEditWallet {
  setModal: (setModal: boolean) => void;
  walletName: string;
  callback: () => void;
}

export interface IFormData {
  name: string;
}
