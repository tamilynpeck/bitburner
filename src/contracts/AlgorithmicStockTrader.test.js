import { algorithmicStockTraderOne } from "./AlgorithmicStockTrader.js";
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
