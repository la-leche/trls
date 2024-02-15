import { IEpoch, ISequence, ITransaction } from "../interfaces/blockchain.ts";
import { hash } from "../lib/hash.ts";

export class Epoch implements IEpoch {
  transactions: ITransaction[] = [];
  sequence: ISequence[] = [];

  readonly initTime = Date.now();
  readonly endTime = this.initTime + 500;

  readonly hash: string;
  readonly previousEpochHash: string;

  constructor(previousEpochHash: string) {
    this.previousEpochHash = previousEpochHash;
    let _hash = "";
    hash(previousEpochHash).then((generatedHash) => (_hash = generatedHash));
    this.hash = _hash;
  }

  private updateSequence(transaction: ITransaction) {
    const data = JSON.stringify(transaction);
    hash(data).then((_hash) =>
      this.sequence.push({
        timestamp: Date.now(),
        data: data,
        hash: _hash,
      })
    );
  }

  addTransaction(transaction: ITransaction) {
    this.updateSequence(transaction);
    this.transactions.push(transaction);
    return this.transactions[this.transactions.length - 1];
  }
}
