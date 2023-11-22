export interface IFormData {
  name: string;
  corporateReason: string;
  fantasy_name: string;
  email: string;
  cpf: string;
  cnpj: string;
  birthDate: string;
  gender: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export type TIabOptions = 'company' | 'person';
export interface ITab {
  label: string;
  value: TIabOptions;
}
