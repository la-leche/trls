import { assertEquals } from "https://deno.land/std@0.215.0/assert/mod.ts";
import { ITransaction } from "./interfaces/blockchain.ts";
import { Epoch } from "./blockchain/Epoch.ts";
import { hash } from "./lib/hash.ts";
import { assertNotEquals } from "https://deno.land/std@0.215.0/assert/assert_not_equals.ts";

const epoch = new Epoch("111");
const tx: ITransaction = {
  hash: "123",
  data: "hi world",
  sign: "my sign",
};
epoch.addTransaction(tx);
tx.data = "NEW TX";
epoch.addTransaction(tx);

Deno.test(function checkEpoch() {
  hash("111").then((_hash) => assertEquals(epoch.hash, _hash));
});

Deno.test(function checkAddedTX() {
  assertEquals(epoch.addTransaction(tx), tx);
});

Deno.test(async function checkSequence() {
  assertEquals(
    epoch.sequence[epoch.sequence.length - 1].hash,
    await hash(JSON.stringify(tx))
  );
});

Deno.test(function testTxs() {
  let i = 0;
  tx.data = "test500";
  while (i !== 500) {
    epoch.addTransaction(tx);
    i++;
  }
  epoch.addTransaction({ ...tx, data: "NEW TX_500" });
  assertNotEquals(
    epoch.transactions[epoch.transactions.length - 1],
    epoch.transactions[epoch.transactions.length - 2]
  );
});
