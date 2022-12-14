/** @param {NS} ns */
/** @param {import(".").NS} ns */
import { getServers } from "utils.js";
import getContractFunction from "./contracts/getContractFunction.js";

export async function main(ns) {
  const action = ns.args[0];
  let contracts = findContracts(ns);

  if (action === "find" && contracts.length > 0) {
    contracts = sortByKey(contracts, "type");
    ns.toast(`${contracts.length} Contracts Found`, "info", 10000);
    for (var i = 0; i < contracts.length; i++) {
      ns.tprint(
        `${i}: ${contracts[i].type} Contract Found on ${contracts[i].server} ${contracts[i].name}`
      );
    }
  }

  if (action === "caesar") {
    let type = "Encryption I: Caesar Cipher";
    let caesarContracts = contracts.filter(byType(type));
    caesarContracts.forEach((item) => {
      let input = ns.codingcontract.getData(item.name, item.server);
      let answer = getContractFunction(ns, type, input);
      ns.tprint(item.name, " ", item.server);
      ns.tprint(answer);
    });
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
  const extention = ".cct";
  let contractList = [];
  for (var i = 0; i < files.length; i++) {
    if (files[i].includes(extention)) {
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
