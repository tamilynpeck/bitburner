import findLargestPrimeFactor from "./FindLargestPrimeFactor.js";
import subarrayWithMaximumSum from "./SubarrayWithMaximumSum.js";
import spiralizeMatrix from "./SpiralizeMatrix.js";
import arrayJumpingGame from "./ArrayJumpingGame.js";
import compressionTwoLZDecompression from "./CompressionTwoLZDecompression.js";
import encryptionOneCaesarCipher from "./EncryptionOneCaesarCipher.js";
import encryptionTwoVigenereCipher from "./EncryptionTwoVigenereCipher.js";
import mergeOverlapingIntervals from "./MergeOverlapingIntervals.js";
import generateIPAddresses from "./GenerateIPAddresses.js";
import {
  totalWaystoSum,
  totalWaystoSumTwo,
} from "./TotalWaystoSum.js";
import {
  algorithmicStockTraderOne,
  algorithmicStockTraderTwo,
  algorithmicStockTraderThree,
  algorithmicStockTraderFour,
} from "./AlgorithmicStockTrader.js";

// CodingContractSignatures
// ns.enums.CodingContractName
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
/** @param {NS} ns */
export default function getContractFunction(ns, type, input) {
  // ns.enums.CodingContractName
  let func = CONTRACTS_MAP[type];
  if (!func) {
    ns.tprint(`Contract type ${type} not found.`);
    return null;
  }

  return func(input);
}
