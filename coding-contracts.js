/** @param {NS} ns */
/** @param {import(".").NS} ns */
import { getServers } from "utils.js";

export async function main(ns) {
  const action = ns.args[0];
  let contracts = findContracts(ns);

  // if (action === "find") {
  //   ns.tprint(contracts);
  // }

  if (action === "caesar") {
    let type = "Encryption I: Caesar Cipher";
    let caesarContracts = contracts.filter(findType(type));
    caesarContracts.forEach((item) => {
      let input = ns.codingcontract.getData(item.name, item.server);
      let answer = encryptionOneCaesarCipher(ns, input);
      ns.tprint(item.name, " ", item.server);
      ns.tprint(answer);
    });
  }

  // let answer = mergeOverlapingIntervals(ns, input);
  // ns.codingcontract.attempt(answer, filename, host);
  // ns.codingcontract.attempt(answer, filename, host, opts);
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
      ns.tprint(`${i}: ${type} Contract Found on ${server} ${files[i]}`);
      contractList.push({ name: files[i], server: server, type: type });
    }
  }
  return contractList;
}

function findType(type) {
  return function (element) {
    return element.type === type;
  };

  // let result = contracts.forEach((item) => {
  //   if (item.type === type) {
  //     return item;
  //   }
  // });
  // return result;
}

function mergeOverlapingIntervals(ns, input) {
  let result = [
    [4, 15],
    [16, 31],
  ];

  return result;
}

function spiralizeMatrix(ns, input) {
  // const input = [
  //   [41, 32, 29, 17, 47, 21, 12, 13, 18, 4],
  //   [33, 8, 2, 21, 9, 20, 45, 27, 42, 19],
  //   [12, 11, 36, 26, 13, 21, 36, 47, 4, 44],
  //   [12, 6, 12, 35, 26, 50, 39, 1, 26, 35],
  //   [45, 11, 8, 36, 25, 26, 34, 11, 26, 39],
  //   [48, 4, 28, 8, 32, 9, 2, 4, 12, 49],
  //   [30, 33, 7, 32, 12, 1, 45, 26, 42, 34],
  //   [24, 26, 19, 25, 32, 18, 20, 50, 10, 4],
  // ];

  const result = [41, 32, 29, 17, 47, 21, 12, 13, 18, 4];
}

function algorithmicStockTraderOne(ns, input) {
  return algorithmicStockTrader(ns, input, 1);
}

function algorithmicStockTraderTwo(ns, input) {
  return algorithmicStockTrader(ns, input, Infinity);
}

function algorithmicStockTraderThree(ns, input) {
  return algorithmicStockTrader(ns, input, 2);
}

function algorithmicStockTraderFour(ns, input) {
  let maxTransactions = input[0];
  let stockPrices = input[1];
  return algorithmicStockTrader(ns, stockPrices, maxTransactions);
}

function algorithmicStockTrader(ns, stockPrices, maxTransactions) {
  const lastIndex = stockPrices.length - 1;
  let stocks = 0;
  let total = 0;
  for (var i = 0; i < stockPrices.length; i++) {
    if (i != lastIndex && stockPrices[i] < stockPrices[i + 1]) {
      stocks = +1;
      total -= stockPrices[i];
    }
  }

  return result;
}

function totalWaystoSumTwo(ns, input) {
  const testNumber = 87;
  const test = [1, 9, 11, 15, 16, 17, 18, 19, 22, 24, 26, 29];
}

function encryptionOneCaesarCipher(ns, input) {
  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  let text = input[0];
  let key = input[1];
  ns.tprint(`Cipher: ${text} with key: ${key}`);

  let cipheredText = "";
  text.split("").forEach((letter) => {
    let isLetter = (element) => element === letter;
    let index = letters.findIndex(isLetter);
    if (index >= 0) {
      cipheredText += letters[newIndex(index, key)];
    } else {
      cipheredText += letter;
    }
  });
  return cipheredText;
}

function newIndex(index, key) {
  let i = index - key;
  if (i > 25) {
    i -= 26;
  }
  if (i < 0) {
    i += 26;
  }
  return i;
}

function encryptionTwoVigenèreCipher(ns, input) {}
