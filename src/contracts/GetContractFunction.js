/** @param {NS} ns */
/** @param {import(".").NS} ns */

import findLargestPrimeFactor from "./contracts/FindLargestPrimeFactor.js";
import subarrayWithMaximumSum from "./contracts/SubarrayWithMaximumSum.js";
import spiralizeMatrix from "./contracts/SpiralizeMatrix.js";
import arrayJumpingGame from "./contracts/ArrayJumpingGame.js";
import compressionTwoLZDecompression from "./contracts/CompressionTwoLZDecompression.js";
import encryptionOneCaesarCipher from "./contracts/EncryptionOneCaesarCipher.js";
import encryptionTwoVigenereCipher from "./contracts/EncryptionTwoVigenereCipher.js";
import mergeOverlapingIntervals from "./contracts/MergeOverlapingIntervals.js";
import generateIPAddresses from "./contracts/GenerateIPAddresses.js";
import {
  totalWaystoSum,
  totalWaystoSumTwo,
} from "./contracts/TotalWaystoSum.js";
import {
  algorithmicStockTraderOne,
  algorithmicStockTraderTwo,
  algorithmicStockTraderThree,
  algorithmicStockTraderFour,
} from "./contracts/AlgorithmicStockTrader.js";

const CONTRACTS_MAP = {
  "Find Largest Prime Factor": findLargestPrimeFactor,
  "Subarray with Maximum Sum": subarrayWithMaximumSum,
  "Total Ways to Sum": totalWaystoSum,
  "Total Ways to Sum II": totalWaystoSumTwo,
  "Spiralize Matrix": spiralizeMatrix,
  "Array Jumping Game": arrayJumpingGame,
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
  if (!func) return null;
  let result = func(input);
  if (result) ns.tprint(result);
  return result;
}
