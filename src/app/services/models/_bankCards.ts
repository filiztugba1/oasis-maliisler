
export interface BankCards {
    value: string;
    label: string;
  }
  export interface BankCardsResponse {
    status: number;
    data: BankCards[];
  }