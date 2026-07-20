/*
A transaction is defined as buying and then selling one share of the stock.
Note that you cannot engage in multiple transactions at once. In other words, you must sell the stock before you buy it again.
If no profit can be made then the answer should be 0.
Note that you have to buy the stock before you can sell it.
*/

/**
 * Algorithmic Stock Trader I
 *
 * Given the following array of stock prices (which are numbers) where the i-th element represents the stock price on day i.
 * Determine the maximum possible profit you can earn using at most one transaction (i.e. you can only buy and sell the stock once).
 *
 * @param	{number[]}	stockPrices
 * @return	{number}
 **/
export function algorithmicStockTraderOne(stockPrices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (const price of stockPrices) {
    if (price < minPrice) {
      minPrice = price;
    } else {
      maxProfit = Math.max(maxProfit, price - minPrice);
    }
  }

  return maxProfit;
}

/**
 * AlgorithmicStockTraderII
 *
 * Given the following array of stock prices (which are numbers) where the i-th element represents the stock price on day i.
 * Determines the maximum possible profit you can earn using as many transactions as you'd like.
 *
 * @param	{number[]}	stockPrices
 * @return	{number}
 **/
export function algorithmicStockTraderTwo(stockPrices) {
  let profit = 0;
  for (let i = 1; i < stockPrices.length; i++) {
    if (stockPrices[i] > stockPrices[i - 1]) {
      profit += stockPrices[i] - stockPrices[i - 1];
    }
  }

  return profit;
}

/**
 * AlgorithmicStockTraderIII
 *
 * Given the following array of stock prices (which are numbers) where the i-th element represents the stock price on day i.
 * Determines the maximum possible profit you can earn using at most two transactions.
 *
 * @param	{number[]}	stockPrices
 * @return	{number}
 **/
export function algorithmicStockTraderThree(stockPrices) {
  let profit1 = 0;
  let profit2 = 0;
  let minPrice1 = Infinity;
  let minPrice2 = Infinity;

  for (const price of stockPrices) {
    minPrice1 = Math.min(minPrice1, price);
    profit1 = Math.max(profit1, price - minPrice1);
    minPrice2 = Math.min(minPrice2, price - profit1);
    profit2 = Math.max(profit2, price - minPrice2);
  }

  return profit2;
}

/**
 * AlgorithmicStockTraderIV
 *
 * given the following array with two elements:
 * stockPrices: [7, [117,177,11,143,11,67,81,118,131,108,129,110,189,106,13,10,18,194,111,99,176,54,112]]
 * The first element is an integer k. The second element is an array of stock prices (which are numbers) where the i-th element represents the stock price on day i.
 * Determine the maximum possible profit you can earn using at most k transactions.
 *
 * @param	{[number, number[]]}	stockPrices
 * @return	{number}
 **/
export function algorithmicStockTraderFour(stockPrices) {
  const maxTransactions = stockPrices[0];
  const prices = stockPrices[1];

  if (maxTransactions === 0 || prices.length === 0) {
    return 0;
  }

  const n = prices.length;
  const dp = Array.from({ length: maxTransactions + 1 }, () => Array(n).fill(0));

  for (let t = 1; t <= maxTransactions; t++) {
    let maxDiff = -prices[0];
    for (let d = 1; d < n; d++) {
      dp[t][d] = Math.max(dp[t][d - 1], prices[d] + maxDiff);
      maxDiff = Math.max(maxDiff, dp[t - 1][d] - prices[d]);
    }
  }

  return dp[maxTransactions][n - 1];
}
