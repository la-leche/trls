export interface ITransaction {
  hash: string;
  sign: string;
  data: any;
}

export interface ISequence {
  timestamp: number;
  hash: string;
  data?: string;
}

export interface IEpoch {
  transactions: ITransaction[];
  sequence: ISequence[];
  hash: string;
  previousEpochHash: string;
}

export interface IState {
  source: ITransaction[];
  destination: ITransaction[];
  diff: ITransaction[];
  id: string;
}
