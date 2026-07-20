import { getServers } from "./utils.js";
import getContractFunction from "./contracts/GetContractFunction.js";

/** @param {NS} ns */
export async function main(ns) {
  const action = ns.args[0] ? String(ns.args[0]) : "find";
  let contracts = findContracts(ns);

  if (action !== "find" || contracts.length === 0) {
    return
  }

  contracts = sortByKey(contracts, "type");
  ns.toast(`${contracts.length} Contracts Found`, "info", 10000);

  // let tempMax = contracts.length > 11 ? 11 : contracts.length;
  let tempMax = contracts.length;
  let solved = 0;

  for (var i = 1; i < tempMax; i++) {
    let type = contracts[i].type;
    let server = contracts[i].server;
    let name = contracts[i].name;
    ns.tprint(`${i}: ${type} Contract Found on ${server} ${name}`);

    let input = ns.codingcontract.getData(name, server);
    ns.tprint(`Input: ${JSON.stringify(input, (key, value) => typeof value === 'bigint' ? value.toString() : value)}`);
    let answer = getContractFunction(ns, type, input);
    if (answer === null) continue;
    ns.tprint(`Answer: ${answer}`);

    if (answer) {
      const reward = ns.codingcontract.attempt(answer, name, server);
      if (reward) {
        ns.tprint(`Contract solved successfully! Reward: ${reward}`);
        solved += 1;
      } else {
        ns.tprint("Failed to solve contract.");
      }
    }
  }

  ns.toast(`Solved ${solved} of ${tempMax} Contracts`, "info", 10000);
  ns.tprint(`Solved ${solved} of ${tempMax} Contracts`);
}

function sortByKey(array, key) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

/** @param {NS} ns */
export function findContracts(ns) {
  const servers = getServers(ns);
  let contracts = [];

  for (var i = 0; i < servers.length; i++) {
    let target = servers[i];
    let files = ns.ls(target);
    let result = containsContract(ns, target, files);
    contracts.push(...result);
  }

  return contracts;
}

/** @param {NS} ns */
function containsContract(ns, server, files) {
  const extension = ".cct";
  let contractList = [];
  for (var i = 0; i < files.length; i++) {
    if (files[i].includes(extension)) {
      let type = ns.codingcontract.getContractType(files[i], server);
      contractList.push({ name: files[i], server: server, type: type });
    }
  }
  return contractList;
}
