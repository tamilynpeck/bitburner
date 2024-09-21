export function algorithmicStockTraderOne(input) {
  // check if min comes before max, if yes return diff
  return algorithmicStockTrader(input, 1);
}

export function algorithmicStockTraderTwo(input) {
  return algorithmicStockTrader(input, input.length);
}

export function algorithmicStockTraderThree(input) {
  return algorithmicStockTrader(input, 2);
}

export function algorithmicStockTraderFour(input) {
  let maxTransactions = input[0];
  let stockPrices = input[1];
  return algorithmicStockTrader(stockPrices, maxTransactions);
}

function algorithmicStockTrader(stockPrices, maxTransactions) {
  const lastIndex = stockPrices.length - 1;
  let hasStock = false;
  let total = 0;
  let transactionCount = 0;

  for (var i = 0; i < stockPrices.length; i++) {
    if (i != lastIndex && stockPrices[i] < stockPrices[i + 1] && !hasStock) {
      hasStock = true;
      total -= stockPrices[i];
    }
  }
  let result = "todo";

  return null;
}
