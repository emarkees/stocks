import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Homepage from '../components/Homepage/Homepage';
import { fetchStockData } from '../redux/Stocks/StocksSlice';
import '../components/Homepage/Homepage.css';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('./Homepage.css');


jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../redux/Stocks/StocksSlice', () => ({
  fetchStockData: jest.fn(),
}));

describe('Homepage', () => {
  beforeEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
    useNavigate.mockClear();
    fetchStockData.mockClear();
  });

  test('renders search input', () => {
    useSelector.mockReturnValue({
      stocks: [],
      status: '',
    });

    render(<Homepage />);

    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();
  });

  test('dispatches fetchStockData on mount', () => {
    useSelector.mockReturnValue({
      stocks: [],
      status: '',
    });

    render(<Homepage />);

    expect(fetchStockData).toHaveBeenCalled();
  });

  test('handles search input change', () => {
    const mockedDispatch = jest.fn();
    useDispatch.mockReturnValue(mockedDispatch);

    const mockedStocks = [
      { symbol: 'AAPL', name: 'Apple', price: 150, changesPercentage: 1.5 },
      { symbol: 'GOOGL', name: 'Google', price: 2500, changesPercentage: -2.0 },
    ];
    useSelector.mockReturnValue({
      stocks: mockedStocks,
      status: '',
    });

    render(<Homepage />);

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'Apple' } });

    expect(searchInput.value).toBe('Apple');
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    expect(mockedDispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  test('handles stock click', () => {
    const mockedNavigate = jest.fn();
    useNavigate.mockReturnValue(mockedNavigate);

    const mockedStocks = [
      { symbol: 'AAPL', name: 'Apple', price: 150, changesPercentage: 1.5 },
      { symbol: 'GOOGL', name: 'Google', price: 2500, changesPercentage: -2.0 },
    ];
    useSelector.mockReturnValue({
      stocks: mockedStocks,
      status: '',
    });

    render(<Homepage />);

    const stockButton = screen.getByText('Apple');
    fireEvent.click(stockButton);

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('/stock/AAPL');
  });

  test('renders loading message when stocks are loading', () => {
    useSelector.mockReturnValue({
      stocks: [],
      status: 'loading',
    });

    render(<Homepage />);

    const loadingMessage = screen.getByText('Loading...');
    expect(loadingMessage).toBeInTheDocument();
  });

  test('renders error message when search input is empty', () => {
    useSelector.mockReturnValue({
      stocks: [],
      status: '',
    });

    render(<Homepage />);

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: '' } });

    const errorMessage = screen.getByText('Please enter a name');
    expect(errorMessage).toBeInTheDocument();
  });

  // Add more tests as needed...
});
