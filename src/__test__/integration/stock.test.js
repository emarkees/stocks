import React from 'react';
import Stock from '../../components/Stock/Stock';
import { render } from '@testing-library/react';

// Test that the `Stock` component renders correctly when passed a valid stock symbol.
test('renders correctly with valid stock symbol', () => {
  const stockSymbol = 'AAPL';
  const { getByText } = render(<Stock stockSymbol={stockSymbol} />);
  expect(getByText(stockSymbol)).toBeInTheDocument();
});
// Test that the `Stock` component renders an error message when passed an invalid stock symbol.
test('renders error message with invalid stock symbol', () => {
  const stockSymbol = 'INVALID';
  const { getByText } = render(<Stock stockSymbol={stockSymbol} />);
  expect(getByText('Invalid stock symbol')).toBeInTheDocument();
});
// Test that the `Stock` component updates its state when the stock price changes.
test('updates state when stock price changes', () => {
  const stockSymbol = 'AAPL';
  const { getByText } = render(<Stock stockSymbol={stockSymbol} />);
  // Simulate a change in the stock price.
  const newPrice = 100;
  useEffect(() => {
    // Update the stock price in the state.
    const stock = {
      symbol: stockSymbol,
      price: newPrice,
    };
    setStock(stock);
  }, [stockSymbol]);
  // Check that the stock price has been updated in the UI.
  expect(getByText(newPrice)).toBeInTheDocument();
});