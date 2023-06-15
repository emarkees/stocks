import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const symbol = 'A';

const apiKey = '8ad02420a2fa95c85c6d259810c4f20';

const quoteUrl = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`;
const historicalDataUrl = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${apiKey}`;

const initialState = {
  stocks: [],
  historicalData: [],
  status: 'idle',
};

export const fetchStockData = createAsyncThunk('stocks/fetchStockData', async () => {
  try {
    const res = await axios.get(quoteUrl);
    const stockWithId = res.data.map((stock) => ({
      id: stock.id,
      symbol: stock.symbol,
      name: stock.name,
      price: stock.price,
      changesPercentage: stock.changesPercentage,
      change: stock.change,
      dayLow: stock.dayLow,
      dayHigh: stock.dayHigh,
      yearHigh: stock.yearHigh,
      yearLow: stock.yearLow,
      marketCap: stock.marketCap,
      priceAvg50: stock.priceAvg50,
      priceAvg200: stock.priceAvg200,
      volume: stock.volume,
      avgVolume: stock.avgVolume,
      exchange: stock.exchange,
      open: stock.open,
      previousClose: stock.previousClose,
      eps: stock.eps,
      pe: stock.pe,
      earningsAnnouncement: stock.earningsAnnouncement,
      sharesOutstanding: stock.sharesOutstanding,
      timestamp: stock.timestamp,
    }));
    return stockWithId;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const fetchHistoricalData = createAsyncThunk('stocks/fetchHistoricalData', async () => {
  try {
    const res = await axios.get(historicalDataUrl);
    const historicalData = res.data.historical;

    const formattedHistoricalData = historicalData.map((stock) => ({
      date: stock.date,
      open: stock.open,
      high: stock.high,
      low: stock.low,
      close: stock.close,
      adjClose: stock.adjClose,
      volume: stock.volume,
      unadjustedVolume: stock.unadjustedVolume,
      change: stock.change,
      changePercent: stock.changePercent,
      vwap: stock.vwap,
      label: stock.label,
      changeOverTime: stock.changeOverTime,
    }));

    return formattedHistoricalData;
  } catch (error) {
    throw new Error(error.message);
  }
});

const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchStockData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.status = 'success';
        state.stocks = action.payload;
      })
      .addCase(fetchStockData.rejected, (state) => {
        state.status = 'rejected';
      })
      .addCase(fetchHistoricalData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHistoricalData.fulfilled, (state, action) => {
        state.status = 'success';
        state.historicalData = action.payload;
      })
      .addCase(fetchHistoricalData.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export default stocksSlice.reducer;
