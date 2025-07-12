import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleDetailClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="container mt-4">
      <h3>Khóa học yêu thích</h3>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-3">
        {favorites.map((product) => (
          <div className="col" key={product.id}>
            <ProductCard
              product={product}
              onDetailClick={() => handleDetailClick(product)}
            />
          </div>
        ))}
        {favorites.length === 0 && (
          <div className="col-12">
            <p>Chưa có khóa học yêu thích nào.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
