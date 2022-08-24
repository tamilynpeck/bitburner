export function algorithmicStockTraderOne(input) {
  return algorithmicStockTrader(ns, input, 1);
}

export function algorithmicStockTraderTwo(input) {
  return algorithmicStockTrader(ns, input, input.length);
}

export function algorithmicStockTraderThree(input) {
  return algorithmicStockTrader(ns, input, 2);
}

export function algorithmicStockTraderFour(input) {
  let maxTransactions = input[0];
  let stockPrices = input[1];
  return algorithmicStockTrader(ns, stockPrices, maxTransactions);
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

  return result;
}
