export interface IStocksWalletList {
  stock: string;
  stockLogoUrl: string;
  amount: number;
  averagePrice: number;
  userId: string;
  id: string;
  currentPrice: string;
  appreciation: number;
  balance: string;
}

export type TIabOptions = 'wallet' | 'releases';
export interface ITab {
  label: string;
  value: TIabOptions;
}

export interface IReleasesList {
  id: number;
  amount: number;
  extraCosts: number;
  price: number;
  releaseType: string;
  asset: { name: string; corporateReason: string; companyImage: string };
  wallet: { id: number };
}

export interface IStocksWalletList {
  stock: string;
  stockLogoUrl: string;
  amount: number;
  averagePrice: number;
  userId: string;
  id: string;
  currentPrice: string;
  appreciation: number;
  balance: string;
}

export interface IStockData {
  results: {
    symbol: string;
    shortName: string;
    longName: string;
    currency: string;
    regularMarketPrice: number;
    regularMarketDayHigh: number;
    regularMarketDayLow: number;
    regularMarketDayRange: string;
    regularMarketChange: number;
    regularMarketChangePercent: number;
    regularMarketTime: string;
    marketCap: number;
    regularMarketVolume: number;
    regularMarketPreviousClose: number;
    regularMarketOpen: number;
    averageDailyVolume10Day: number;
    averageDailyVolume3Month: number;
    fiftyTwoWeekLowChange: number;
    fiftyTwoWeekLowChangePercent: number;
    fiftyTwoWeekRange: string;
    fiftyTwoWeekHighChange: number;
    fiftyTwoWeekHighChangePercent: number;
    fiftyTwoWeekLow: number;
    fiftyTwoWeekHigh: number;
    twoHundredDayAverage: number;
    twoHundredDayAverageChange: number;
    twoHundredDayAverageChangePercent: number;
    validRanges: '1d' | '5d' | '1mo' | '3mo' | '6mo' | '1y' | '2y' | '5y' | '10y' | 'ytd' | 'max'[];
    historicalDataPrice: IHistoricalDataPrice[];
    priceEarnings: number;
    earningsPerShare: number;
    logourl: string;
  }[];
}
