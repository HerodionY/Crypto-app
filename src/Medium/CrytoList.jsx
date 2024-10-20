import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CryptoList = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mengambil data dari CoinGecko API
    axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd', // Mata uang yang digunakan
        order: 'market_cap_desc',
        per_page: 10, // Jumlah data yang diambil
        page: 1,
        sparkline: false
      }
    })
    .then(response => {
      setCryptos(response.data);
      setLoading(false);
    })
    .catch(error => {
      setError('Error fetching data');
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Top 10 Cryptocurrencies</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto) => (
            <tr key={crypto.id}>
              <td>{crypto.market_cap_rank}</td>
              <td>{crypto.name}</td>
              <td>${crypto.current_price.toLocaleString()}</td>
              <td
                style={{ color: crypto.price_change_percentage_24h >= 0 ? 'green' : 'red' }}
              >
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td>${crypto.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoList;
