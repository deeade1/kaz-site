import { useEffect, useState } from 'react';

export default function DynamicPriceIndicator({ basePrice, seatsAvailable, totalSeats }) {
  const [currentPrice, setCurrentPrice] = useState(basePrice);
  const [trend, setTrend] = useState('steady');

  useEffect(() => {
    const availabilityFactor = 1 + (0.5 * (1 - (seatsAvailable / totalSeats)));
    const newPrice = Math.round(basePrice * availabilityFactor * 100) / 100;
    
    setTrend(newPrice > currentPrice ? 'up' : newPrice < currentPrice ? 'down' : 'steady');
    setCurrentPrice(newPrice);
  }, [seatsAvailable, basePrice, totalSeats]);

  return (
    <div className={`price-indicator ${trend}`}>
      <span className="price">${currentPrice.toFixed(2)}</span>
      {trend === 'up' && <span className="trend">↑</span>}
      {trend === 'down' && <span className="trend">↓</span>}
      <div className="explanation">
        {seatsAvailable <= 2 ? 'Few seats left!' : 'Price varies by demand'}
      </div>
    </div>
  );
}