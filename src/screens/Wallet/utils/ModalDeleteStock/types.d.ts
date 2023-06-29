export interface IModalDeleteStock {
  setModal: (setModal: boolean) => void;
  stockId: string;
  callback: () => void;
}
