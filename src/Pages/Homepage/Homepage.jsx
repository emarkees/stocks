import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStockData } from '../../redux/Stocks/StocksSlice';
import './Homepage.css';

const Homepage = () => {
  const [searchItem, setSearchItem] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stocks = useSelector((state) => state.stocks.stocks);
  const loading = useSelector((state) => state.stocks.status === 'loading');
  const value = -10;

  useEffect(() => {
    dispatch(fetchStockData());
  }, [dispatch]);

  const filteredStock = stocks.filter((data) => data.name.toLowerCase().includes(searchItem.toLowerCase()));

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value.trim();

    if (inputValue) {
      setSearchItem(inputValue);
      setErrorMsg('');
    } else {
      setSearchItem('');
      setErrorMsg('Please enter a name');
    }
  };

  const handleStockClick = (stockId) => {
    navigate(`/stock/${stockId}`);
  };

  const valueStyles = [];

  for (let i = 0; i < valueStyles.length; i + 1) {
    let color;

    if (valueStyles[i] > 0.01) {
      color = 'green';
    } else {
      color = 'red';
    }

    valueStyles.push(color);
  }

  const valueStyle = {
    color: value >= 0.01 ? 'green' : 'red',
  };

  const transit = filteredStock.map((data) => (
    <div className="stock-trans" key={data.symbol}>
      <span>{data.symbol}</span>
      <span>{data.price}</span>
      <span style={valueStyle}>
        {data.changesPercentage}
        %
      </span>
    </div>
  ));

  const stock = filteredStock.map((data) => (
    <button type="button" className="card-item card card-ref" key={data.symbol} onClick={() => handleStockClick(data.symbol)}>
      <span className="symbol">{data.symbol}</span>
      <span className="name">{data.name}</span>
      <div className="price-data">
        <span className="price">
          $
          {data.price}
        </span>
        <span className="changesPecentage" style={valueStyle}>
          {data.changesPercentage}
          %
        </span>
      </div>
    </button>
  ));

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search"
        className="search"
        value={searchItem}
        onChange={handleSearchInputChange}
      />
      {loading && <div>Loading...</div>}
      <span>{errorMsg}</span>

      <div className="stock-trnsit">
        <div className="stock-trans">
          {transit}
        </div>
      </div>
      <div className="stock-container border">
        {stock}
      </div>
    </div>
  );
};

export default Homepage;
