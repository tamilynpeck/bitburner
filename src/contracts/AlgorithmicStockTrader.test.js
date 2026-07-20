import {
  algorithmicStockTraderOne,
  algorithmicStockTraderTwo,
  algorithmicStockTraderThree,
  algorithmicStockTraderFour
} from "./AlgorithmicStockTrader.js";

// I - 1 transaction
// 162,66,98,182,186,27,61,9,30,198,19,139,45,176,132,7,52,23,164,87,76,105,15,49,93,15,28,127,167,121,173,52,166,141,178,111,200,189,111,144,26,171,103,173,19,103
// min 7, max 200
// 193

// You are given the following array of stock prices (which are numbers) where the i-th element represents the stock price on day i:
// Determine the maximum possible profit you can earn using at most one transaction (i.e. you can only buy and sell the stock once). If no profit can be made then the answer should be 0. Note that you have to buy the stock before you can sell it.

describe("AlgorithmicStockTraderI", () => {
  it("should return the maximum profit for a single transaction", () => {
    const input = [162,66,98,182,186,27,61,9,30,198,19,139,45,176,132,7,52,23,164,87,76,105,15,49,93,15,28,127,167,121,173,52,166,141,178,111,200,189,111,144,26,171,103,173,19,103];
    const expected = 193;
    const actual = algorithmicStockTraderOne(input);
    expect(actual).toBe(expected);
  });

  it("should return the maximum profit for a single transaction", () => {
    const input = [28, 177, 63, 191, 157, 161, 104, 188, 35, 121, 127, 156, 162, 185, 99, 25, 73, 83, 21, 36, 35, 108, 43, 29, 46, 105, 90, 85, 140, 57, 74, 195];
    const expected = 174;
    const actual = algorithmicStockTraderOne(input);
    expect(actual).toBe(expected);
  });
});

describe("AlgorithmicStockTraderII", () => {
  it("should return the maximum profit for multiple transactions", () => {
    const input = [122,109,77,199,106,56,153,50,94,25,109,17,55,79,70,96,33,134,177,139,179,125,9,69,149,7,105,103,119,59,159,18,105,117,196,4,20,40,155,4,98,56,11];
    const expected = 1396;
    const actual = algorithmicStockTraderTwo(input);
    expect(actual).toBe(expected);
  });

  it("should return the maximum profit for multiple transactions", () => {
    const input = [181,23,41,195,151,128,156,164,101,184,62,24,4,177,126,10,129,42,37,140,61,7,167,14,141,184,67,91,112,47,125,45,171,80,133,150,60,3,130];
    const expected = 1462;
    const actual = algorithmicStockTraderTwo(input);
    expect(actual).toBe(expected);
  });
});

describe("AlgorithmicStockTraderIII", () => {
  it("should return the maximum profit for at most two transactions", () => {
    const input = [186,99,98,14,82,55,144,62,53,148,111,90,156,69,200,147,96,183,74,40,47,38];
    const expected = 277;
    const actual = algorithmicStockTraderThree(input);
    expect(actual).toBe(expected);
  });

  it("should return the maximum profit for at most two transactions", () => {
    const input = [94,77,109,96,200,34,194,42,62,192,192,189,15,177,16,123,43,176,12,38,190,14,105,138,54];
    const expected = 340;
    const actual = algorithmicStockTraderThree(input);
    expect(actual).toBe(expected);
  });
});

describe("AlgorithmicStockTraderIV", () => {
  it("should return the maximum profit for at most k transactions", () => {
    const input = [7, [117,177,11,143,11,67,81,118,131,108,129,110,189,106,13,10,18,194,111,99,176,54,112]];
    const expected = 712;
    const actual = algorithmicStockTraderFour(input);
    expect(actual).toBe(expected);
  });

  it("should return the maximum profit for at most k transactions", () => {
    const input = [3,[122,109,77,199,106,56,153,50,94,25]];
    const expected = 263;
    const actual = algorithmicStockTraderFour(input);
    expect(actual).toBe(expected);
  });
});
