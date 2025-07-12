import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const History = () => {
  const [viewedProducts, setViewedProducts] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    setViewedProducts(history);
  }, []);

  return (
    <div className="container mt-4">
      <h4>Khóa học đã xem</h4>
      {viewedProducts.length === 0 ? (
        <p>Bạn chưa khóa học nào.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-3">
          {viewedProducts.map((product) => (
            <div className="col" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
