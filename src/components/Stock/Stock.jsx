import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { fetchStockData } from '../../redux/Stocks/StocksSlice';
import './Stock.css';
import logo from '../../assests/images/logo.svg';

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
      <div className="container-border">
        <div className="stock card-item-border card-border card-ref-border" key={uuidv4()}>
          <div className="link-container">
            <Link to="/" className="home">&lt;</Link>
            <img src={logo} alt="logo" className="logo" />
          </div>
          <div className="header-border">
            <table>
              <tbody>
                <tr className="exchange">
                  <td>
                    {selectedStock.name}
                  </td>
                  <td>
                    (
                    {selectedStock.symbol}
                    )
                  </td>
                </tr>
                <tr>
                  <td className="stock-symbol">
                    {selectedStock.exchange}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="market-value">
            <table className="divider-cell font">
              <tbody>
                <tr>
                  <th>Symbol</th>
                  <td>{selectedStock.symbol}</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td>{selectedStock.price}</td>
                </tr>
                <tr>
                  <th>Stock Change</th>
                  <td style={valueStyles}>{selectedStock.change}</td>
                </tr>
                <tr>
                  <th>Changes percentage</th>
                  <td style={valueStyles}>{selectedStock.changesPercentage}</td>
                </tr>
                <tr>
                  <th>Day Low</th>
                  <td>{selectedStock.dayLow}</td>
                </tr>
                <tr>
                  <th>Day High</th>
                  <td>{selectedStock.dayHigh}</td>
                </tr>
                <tr>
                  <th>Year High</th>
                  <td>{selectedStock.yearHigh}</td>
                </tr>
                <tr>
                  <th>Year Low</th>
                  <td>{selectedStock.yearLow}</td>
                </tr>
                <tr>
                  <th>Market Cap</th>
                  <td>{formatMarketCap(selectedStock.marketCap)}</td>

                </tr>
                <tr>
                  <th>Price Avg 50</th>
                  <td>{formatMarketCap(selectedStock.priceAvg50)}</td>

                </tr>
                <tr>
                  <th>Price Avg 200</th>

                  <td>{formatMarketCap(selectedStock.priceAvg200)}</td>

                </tr>
                <tr>
                  <th>Average Volume</th>

                  <td>{formatMarketCap(selectedStock.avgVolume)}</td>
                </tr>
                <tr>
                  <th>Open</th>
                  <td>{selectedStock.open}</td>
                </tr>
                <tr>
                  <th>Previous Close</th>
                  <td>{selectedStock.previousClose}</td>
                </tr>
                <tr>
                  <th>EPS</th>
                  <td>{selectedStock.eps}</td>
                </tr>
                <tr>
                  <th>PE Ratio</th>
                  <td>{formatMarketCap(selectedStock.pe)}</td>
                </tr>
                <tr>
                  <th>Earnings</th>
                  <td>{selectedStock.earningsAnnouncement}</td>
                </tr>
                <tr>
                  <th>Shares Outstanding</th>
                  <td>{formatMarketCap(selectedStock.sharesOutstanding)}</td>
                </tr>
                <tr>
                  <th>timestamp</th>
                  <td className="time">{formattedTimestamp}</td>
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
