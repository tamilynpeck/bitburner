// AlgorithmicStockTraderI


/**
 * Algorithmic Stock Trader I
 *
 * @param	{number[]}	stockPrices
 * @return	{number}
 **/
export function algorithmicStockTraderOne(stockPrices) {
/*
You are given the following array of stock prices (which are numbers) where the i-th element represents the stock price on day i:
stockPrices: [162,66,98,182,186,27,61,9,30,198,19,139,45,176,132,7,52,23,164,87,76,105,15,49,93,15,28,127,167,121,173,52,166,141,178,111,200,189,111,144,26,171,103,173,19,103]
Determine the maximum possible profit you can earn using at most one transaction (i.e. you can only buy and sell the stock once). If no profit can be made then the answer should be 0. Note that you have to buy the stock before you can sell it.
min 7, max 200
return: 193
*/

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
 * @param	{number[]}	stockPrices
 * @return	{number}
 **/
export function algorithmicStockTraderTwo(stockPrices) {
  return algorithmicStockTrader(stockPrices, stockPrices.length);
}

// AlgorithmicStockTraderIII
export function algorithmicStockTraderThree(stockPrices) {
  return algorithmicStockTrader(stockPrices, 2);
}

// AlgorithmicStockTraderIV
export function algorithmicStockTraderFour(stockPrices, maxTransactions) {
  return algorithmicStockTrader(stockPrices, maxTransactions);
}

function algorithmicStockTrader(stockPrices, maxTransactions = 1) {
  return null;
}

