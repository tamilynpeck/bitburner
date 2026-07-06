import { getServers } from "./utils.js";
import getContractFunction from "./contracts/GetContractFunction.js";

/** @param {NS} ns */
export async function main(ns) {
  const action = ns.args[0];
  let contracts = findContracts(ns);

  if (action === "find" && contracts.length > 0) {
    contracts = sortByKey(contracts, "type");
    ns.toast(`${contracts.length} Contracts Found`, "info", 10000);
    for (var i = 0; i < contracts.length; i++) {
      let type = contracts[i].type;
      let server = contracts[i].server;
      let name = contracts[i].name;
      ns.tprint(`${i}: ${type} Contract Found on ${server} ${name}`);
      let input = ns.codingcontract.getData(name, server);
      let answer = getContractFunction(ns, type, input);
      if (answer) {
        const reward = ns.codingcontract.attempt(answer, name, server);
        if (reward) {
          ns.tprint(`Contract solved successfully! Reward: ${reward}`);
        } else {
          ns.tprint("Failed to solve contract.");
        }
      }
    }
  }
}

function sortByKey(array, key) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

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

function byType(type) {
  return function (element) {
    return element.type === type;
  };
}
