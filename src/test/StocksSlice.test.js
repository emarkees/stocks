jest.mock('axios');

import { createAsyncThunk } from '@reduxjs/toolkit';

const axios = jest.requireActual('axios');
const { fetchHistoricalData, fetchStockData } = jest.requireActual('./stocksSlice');

describe('stocksSlice', () => {
  describe('fetchStockData', () => {
    it('should fetch stock data and update the state', async () => {
      const mockedStockData = [
        {
          id: 1,
          symbol: 'AAPL',
          name: 'Apple Inc.',
          price: 150.25,
        },
      ];

      axios.get.mockResolvedValueOnce({ data: mockedStockData });

      const dispatch = jest.fn();
      const getState = jest.fn();

      await fetchStockData()(dispatch, getState, undefined);

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/quote/'), expect.any(Object));
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, fetchStockData.pending());
      expect(dispatch).toHaveBeenNthCalledWith(2, fetchStockData.fulfilled(mockedStockData));
    });

    it('should handle errors when fetching stock data', async () => {
      const errorMessage = 'Network Error';

      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      await fetchStockData()(dispatch, getState, undefined);

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/quote/'), expect.any(Object));
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, fetchStockData.pending());
      expect(dispatch).toHaveBeenNthCalledWith(2, fetchStockData.rejected(expect.any(Error)));
    });
  });

  describe('fetchHistoricalData', () => {
    it('should fetch historical data and update the state', async () => {
      const mockedHistoricalData = [
        {
          date: '2022-06-14',
          open: 150.35,
          high: 152.2,
          low: 149.7,
          close: 151.8,
          adjClose: 151.8,
          volume: 2000000,
          unadjustedVolume: 2000000,
          change: 1.45,
          changePercent: 0.96,
          vwap: 150.91667,
          label: 'June 14, 22',
          changeOverTime: 0.0096,
        },
      ];

      axios.get.mockResolvedValueOnce({ data: { historical: mockedHistoricalData } });

      const dispatch = jest.fn();
      const getState = jest.fn();

      await fetchHistoricalData()(dispatch, getState, undefined);

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/historical-price-full/'), expect.any(Object));
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, fetchHistoricalData.pending());
      expect(dispatch).toHaveBeenNthCalledWith(2, fetchHistoricalData.fulfilled(mockedHistoricalData));
    });

    it('should handle errors when fetching historical data', async () => {
      const errorMessage = 'Network Error';

      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      await fetchHistoricalData()(dispatch, getState, undefined);

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/historical-price-full/'), expect.any(Object));
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, fetchHistoricalData.pending());
      expect(dispatch).toHaveBeenNthCalledWith(2, fetchHistoricalData.rejected(expect.any(Error)));
    });
  });

  describe('stocksReducer', () => {
    it('should handle fetchStockData.fulfilled', () => {
      const mockedStockData = [
        {
          id: 1,
          symbol: 'AAPL',
          name: 'Apple Inc.',
          price: 150.25,
        },
      ];

      const initialState = {
        stocks: [],
        historicalData: [],
        status: 'idle',
      };

      const action = { type: fetchStockData.fulfilled.type, payload: mockedStockData };

      const nextState = stocksReducer(initialState, action);

      expect(nextState).toEqual({
        stocks: mockedStockData,
        historicalData: [],
        status: 'success',
      });
    });

    it('should handle fetchStockData.pending', () => {
      const initialState = {
        stocks: [],
        historicalData: [],
        status: 'idle',
      };

      const action = { type: fetchStockData.pending.type };

      const nextState = stocksReducer(initialState, action);

      expect(nextState).toEqual({
        stocks: [],
        historicalData: [],
        status: 'loading',
      });
    });

    it('should handle fetchStockData.rejected', () => {
      const initialState = {
        stocks: [],
        historicalData: [],
        status: 'idle',
      };

      const action = { type: fetchStockData.rejected.type };

      const nextState = stocksReducer(initialState, action);

      expect(nextState).toEqual({
        stocks: [],
        historicalData: [],
        status: 'rejected',
      });
    });

    it('should handle fetchHistoricalData.fulfilled', () => {
      const mockedHistoricalData = [
        {
          date: '2022-06-14',
          open: 150.35,
          high: 152.2,
          low: 149.7,
          close: 151.8,
          adjClose: 151.8,
          volume: 2000000,
          unadjustedVolume: 2000000,
          change: 1.45,
          changePercent: 0.96,
          vwap: 150.91667,
          label: 'June 14, 22',
          changeOverTime: 0.0096,
        },
      ];

      const initialState = {
        stocks: [],
        historicalData: [],
        status: 'idle',
      };

      const action = { type: fetchHistoricalData.fulfilled.type, payload: mockedHistoricalData };

      const nextState = stocksReducer(initialState, action);

      expect(nextState).toEqual({
        stocks: [],
        historicalData: mockedHistoricalData,
        status: 'success',
      });
    });

    it('should handle fetchHistoricalData.pending', () => {
      const initialState = {
        stocks: [],
        historicalData: [],
        status: 'idle',
      };

      const action = { type: fetchHistoricalData.pending.type };

      const nextState = stocksReducer(initialState, action);

      expect(nextState).toEqual({
        stocks: [],
        historicalData: [],
        status: 'loading',
      });
    });

    it('should handle fetchHistoricalData.rejected', () => {
      const initialState = {
        stocks: [],
        historicalData: [],
        status: 'idle',
      };

      const action = { type: fetchHistoricalData.rejected.type };

      const nextState = stocksReducer(initialState, action);

      expect(nextState).toEqual({
        stocks: [],
        historicalData: [],
        status: 'rejected',
      });
    });
  });
});
