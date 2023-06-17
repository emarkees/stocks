import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStockData } from '../../redux/Stocks/StocksSlice';
import Homepage from './Homepage';

// Mock the useSelector and useDispatch hooks
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Import axios inside a module
const axios = require('axios');

describe('Homepage', () => {
  beforeEach(() => {
    // Reset the mocked functions before each test
    useSelector.mockClear();
    useDispatch.mockClear();
  });

  test('renders the homepage with stock data', () => {
    // Mock the useSelector hook to return sample data
    useSelector.mockReturnValue({
      stocks: [
        { symbol: 'AAPL', name: 'Apple', price: 150, changesPercentage: '+2.5%' },
        { symbol: 'GOOGL', name: 'Google', price: 2500, changesPercentage: '-1.2%' },
      ],
      status: 'succeeded',
    });

    const { getByText } = render(<Homepage />);

    // Check if the stock data is rendered
    expect(getByText('Apple')).toBeInTheDocument();
    expect(getByText('Google')).toBeInTheDocument();
  });

  test('handles search input change', () => {
    const setSearchItem = jest.fn();
    const setErrorMsg = jest.fn();

    // Mock the useDispatch hook to return mock functions
    useDispatch.mockReturnValue(jest.fn());

    const { getByPlaceholderText } = render(<Homepage />);

    const searchInput = getByPlaceholderText('Search');

    // Simulate user input
    fireEvent.change(searchInput, { target: { value: 'Apple' } });

    // Check if the setSearchItem and setErrorMsg functions are called correctly
    expect(setSearchItem).toHaveBeenCalledWith('Apple');
    expect(setErrorMsg).toHaveBeenCalledWith('');

    // Simulate clearing the input
    fireEvent.change(searchInput, { target: { value: '' } });

    // Check if the setSearchItem and setErrorMsg functions are called correctly
    expect(setSearchItem).toHaveBeenCalledWith('');
    expect(setErrorMsg).toHaveBeenCalledWith('Please enter a name');
  });

  test('navigates to the correct stock URL on stock click', () => {
    const navigate = jest.fn();
    const mockUseNavigate = jest.fn(() => navigate);

    // Mock the useNavigate hook
    jest.mock('react-router-dom', () => ({
      useNavigate: mockUseNavigate,
    }));

    const { getByText } = render(<Homepage />);

    const stockButton = getByText('Apple');

    // Simulate clicking on the stock button
    fireEvent.click(stockButton);

    // Check if the navigate function is called with the correct URL
    expect(navigate).toHaveBeenCalledWith('/stock/AAPL');
  });
});