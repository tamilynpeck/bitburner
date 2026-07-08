import getContractFunction from "./contracts/GetContractFunction.js";

/** @param {NS} ns */
export async function main(ns) {
  // SPECIFY THE CONTRACT NAME YOU WANT TO TEST
  const TEST_NAME = ns.enums.CodingContractName.AlgorithmicStockTraderI;


  const contract = ns.codingcontract.createDummyContract(TEST_NAME);
  if (!contract) {
    ns.tprint("Failed to create dummy contract.");
    return;
  }
  const data = ns.codingcontract.getData(contract);
  ns.tprint(`Data: ${JSON.stringify(data)}`);
  const answer = getContractFunction(ns, TEST_NAME, data);
  ns.tprint(`Answer: ${answer}`);

  if (answer) {
    const reward = ns.codingcontract.attempt(answer, contract);
    if (reward) {
      ns.tprint(`Contract solved successfully! Reward: ${reward}`);
    } else {
      ns.tprint("Failed to solve contract.");
    }
  }
}
