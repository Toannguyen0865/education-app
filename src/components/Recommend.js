import React from 'react';
import ProductCard from '../components/ProductCard';
import products from '../data';

const Recommend = ({ onDetailClick }) => {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  const recommended = shuffled.slice(0, 4);
  

  return (
    <div className="mt-5" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px' }}>
      <h4 className="mb-3">Có thể bạn quan tâm</h4>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
        {recommended.map((product) => (
          <div className="col" key={product.id}>
            <div style={{ height: '100%' }}>
              <ProductCard product={product} onDetailClick={onDetailClick} customHeight="300px" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommend;
