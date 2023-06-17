import { configureStore } from '@reduxjs/toolkit';
import stocksReducer from './Stocks/StocksSlice';

const store = configureStore({
  reducer: {
    stocks: stocksReducer,
  },
});

export default store;
