import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { fetchStockData } from '../../redux/Stocks/StocksSlice';
import './Stock.css';
import StockChart from '../../Components/Chart/Chart';

const Stock = () => {
  const stocks = useSelector((state) => state.stocks.stocks);
  const dispatch = useDispatch();
  const { id } = useParams();
  const value = -10;

  useEffect(() => {
    dispatch(fetchStockData());
  }, [dispatch]);

  const selectedStock = stocks.find((data) => data.symbol === id);

  if (!selectedStock || !selectedStock.timestamp) {
    return <div>Stock not found</div>;
  }

  const formattedTimestamp = new Date(selectedStock.timestamp * 1000).toLocaleString();

  const formatMarketCap = (value) => {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    let magnitude = 0;
    let modifiedValue = value;

    while (modifiedValue >= 100000) {
      modifiedValue /= 100000;
      magnitude += 1;
    }

    const roundedValue = modifiedValue.toFixed(2);
    const suffix = suffixes[magnitude];

    return `$${roundedValue}${suffix}`;
  };

  const valueStyles = {
    color: value >= 0 ? 'green' : 'red',
  };

  return (
    <>
      <Link to="/" className="home">&lt;</Link>
      <div className="container-border">
        <div className="stock card-item-border card-border card-ref-border" key={uuidv4()}>

          <StockChart symbol={selectedStock.symbol} />
          <div className="header-border">
            <div className="header-container">
              <span className="stock-symbol">
                {selectedStock.exchange}
                :
                {selectedStock.symbol}
              </span>
              <span className="stock-name">{selectedStock.name}</span>
            </div>
            <div className="price-change-container">
              <div className="divider-cell  time-price font">
                <span className="divider">
                  $
                  {selectedStock.price}
                </span>
                <span className="time">{formattedTimestamp}</span>
              </div>
              <div className="price">
                <span style={valueStyles}>{selectedStock.changesPercentage}</span>

                <span style={valueStyles} className="symbol">
                  {selectedStock.change}
                </span>
              </div>
            </div>
          </div>
          <div className="market-value">
            <table>
              <thead>
                <tr>
                  <th className="divider-cell font">Day Low</th>
                  <th className="divider-cell font">Day High</th>
                  <th className="divider-cell font">Year High</th>
                  <th className="non-divider font">Year Low</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="divider-cell font">{selectedStock.dayLow}</td>
                  <td className="divider-cell font">{selectedStock.dayHigh}</td>
                  <td className="divider-cell font">{selectedStock.yearHigh}</td>
                  <td className="non-divider font">{selectedStock.yearLow}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="market-value">
            <table>
              <thead>
                <tr>
                  <th className="divider-cell font">Market Cap</th>
                  <th className="divider-cell font">Price Avg 50</th>
                  <th className="divider-cell font">Price Avg 200</th>
                  <th className="non-divider font">Average Volume</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="divider-cell font">{formatMarketCap(selectedStock.marketCap)}</td>
                  <td className="divider-cell font">{formatMarketCap(selectedStock.priceAvg50)}</td>
                  <td className="divider-cell font">{formatMarketCap(selectedStock.priceAvg200)}</td>
                  <td className="non-divider font font">{formatMarketCap(selectedStock.avgVolume)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="market-value">
            <table>
              <thead>
                <tr>
                  <th className="divider-cell font">Open</th>
                  <th className="divider-cell font">Previous Close</th>
                  <th className="divider-cell font">EPS</th>
                  <th className="non-divider font">PE Ratio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="divider-cell font">{selectedStock.open}</td>
                  <td className="divider-cell font">{selectedStock.previousClose}</td>
                  <td className="divider-cell font">{selectedStock.eps}</td>
                  <td className="non-divider font">{formatMarketCap(selectedStock.pe)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="market-value">
            <table>
              <thead>
                <tr>
                  <th className="divider-cell font"> earnings Announcement</th>
                  <th className="non-divider font">shares Outstanding</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="divider-cell font">{selectedStock.earningsAnnouncement}</td>
                  <td className="non-divider font">{formatMarketCap(selectedStock.sharesOutstanding)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stock;
