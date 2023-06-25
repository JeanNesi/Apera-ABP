export interface IModal {
  title: string;
  children: JSX.Element | JSX.Element[];
  setModal: (setModal: boolean) => void;
}
