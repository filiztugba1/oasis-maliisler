
export interface CreditCard {
    value: string;
    label: string;
  }
  export interface CreditCardResponse {
    status: number;
    data: CreditCard[];
  }