export type CurrencyCode = "ZAR" | "KES";
export type PaymentRail = "PayShap" | "M-Pesa" | "InstantEFT";

export interface TransferQuote {
  fromAmount: number;
  fromCurrency: CurrencyCode;
  toAmount: number;
  toCurrency: CurrencyCode;
  exchangeRate: number;
  serviceFee: number;
  networkRewardVeld: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  targetCurrency: CurrencyCode;
  rewardVeld: number;
  rewardEnergy: number;
  progressPercent: number;
  completed: boolean;
}

export interface TransactionRecord {
  id: string;
  timestamp: string;
  fromAmount: number;
  fromCurrency: CurrencyCode;
  toAmount: number;
  toCurrency: CurrencyCode;
  recipientAccount: string;
  rail: PaymentRail;
  status: "pending" | "settled" | "failed";
}
