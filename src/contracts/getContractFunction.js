/** @param {NS} ns */
/** @param {import(".").NS} ns */

import subarrayWithMaximumSum from "./contracts/subarrayWithMaximumSum.js";
import compressionTwoLZDecompression from "./contracts/compressionTwoLZDecompression.js";
import encryptionOneCaesarCipher from "./contracts/encryptionOneCaesarCipher.js";
import encryptionTwoVigenereCipher from "./contracts/encryptionTwoVigenereCipher.js";
import mergeOverlapingIntervals from "./contracts/mergeOverlapingIntervals.js";
import spiralizeMatrix from "./contracts/spiralizeMatrix.js";
import generateIPAddresses from "./contracts/generateIPAddresses.js";
import {
  totalWaystoSum,
  totalWaystoSumTwo,
} from "./contracts/totalWaystoSum.js";
import {
  algorithmicStockTraderOne,
  algorithmicStockTraderTwo,
  algorithmicStockTraderThree,
  algorithmicStockTraderFour,
} from "./contracts/algorithmicStockTrader.js";

const CONTRACTS_MAP = {
  "Find Largest Prime Factor": null,
  "Subarray with Maximum Sum": subarrayWithMaximumSum,
  "Total Ways to Sum": totalWaystoSum,
  "Total Ways to Sum II": totalWaystoSumTwo,
  "Spiralize Matrix": spiralizeMatrix,
  "Array Jumping Game": null,
  "Array Jumping Game II": null,
  "Merge Overlapping Intervals": mergeOverlapingIntervals,
  "Generate IP Addresses": generateIPAddresses,
  "Algorithmic Stock Trader I": algorithmicStockTraderOne,
  "Algorithmic Stock Trader II": algorithmicStockTraderTwo,
  "Algorithmic Stock Trader III": algorithmicStockTraderThree,
  "Algorithmic Stock Trader IV": algorithmicStockTraderFour,
  "Minimum Path Sum in a Triangle": null,
  "Unique Paths in a Grid I": null,
  "Unique Paths in a Grid II": null,
  "Shortest Path in a Grid": null,
  "Sanitize Parentheses in Expression": null,
  "Find All Valid Math Expressions": null,
  "HammingCodes: Integer to Encoded Binary": null,
  "HammingCodes: Encoded Binary to Integer": null,
  "Proper 2-Coloring of a Graph": null,
  "Compression I: RLE Compression": null,
  "Compression II: LZ Decompression": compressionTwoLZDecompression,
  "Compression III: LZ Compression": null,
  "Encryption I: Caesar Cipher": encryptionOneCaesarCipher,
  "Encryption II: Vigenère Cipher": encryptionTwoVigenereCipher,
};

// TODO: Factory pattern opportunity??
export default function getContractFunction(ns, type, input) {
  let func = CONTRACTS_MAP[type];
  return func(input);
}
