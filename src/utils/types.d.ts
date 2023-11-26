export interface IMask {
  value: string;
  length: number;
}

export type ICatchHandler = {
  response?: { data: any; status: number };
};
