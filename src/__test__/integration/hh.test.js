import React from 'react';
import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import Stock from '../../components/Stock/Stock';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('Stock', () => {
  beforeEach(() => {
    useSelector.mockClear();
  });

  test('renders stock data when selected stock is available', () => {
    useSelector.mockReturnValue({
      stocks: [
        {
          symbol: 'AAPL',
          name: 'Apple Inc.',
          exchange: 'NASDAQ',
          price: 150,
          change: '+2.5',
          changesPercentage: '+2.5%',
          dayLow: 145,
          dayHigh: 155,
          yearLow: 120,
          yearHigh: 160,
          marketCap: 2000000000,
          priceAvg50: 148,
          priceAvg200: 140,
          avgVolume: 1000000,
          open: 148,
          previousClose: 145,
          eps: 5,
          pe: 30,
          earningsAnnouncement: '2023-06-16',
          sharesOutstanding: 1000000,
          timestamp: 1623928800,
        },
      ],
    });

    const { getByText } = render(<Stock />);

    expect(getByText('Apple Inc.')).toBeInTheDocument();
    expect(getByText('NASDAQ')).toBeInTheDocument();
    expect(getByText('150')).toBeInTheDocument();
    // ... assert other expected values ...
  });

  test('displays "Stock not found" message when selected stock is not available', () => {
    useSelector.mockReturnValue({
      stocks: [],
    });

    const { getByText } = render(<Stock />);

    expect(getByText('Stock not found')).toBeInTheDocument();
  });
});
