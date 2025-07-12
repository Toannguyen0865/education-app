import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css'; // Import your CSS for animations

const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const [animateLike, setAnimateLike] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkFavorite = () => {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setLiked(storedFavorites.some((item) => item.id === product.id));
    };

    checkFavorite();

    window.addEventListener('storage', checkFavorite);
    return () => window.removeEventListener('storage', checkFavorite);
  }, [product.id]);

  const toggleFavorite = (e) => {
    e.stopPropagation();

    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let updatedFavorites;

    if (liked) {
      updatedFavorites = storedFavorites.filter((item) => item.id !== product.id);
    } else {
      updatedFavorites = [...storedFavorites, product];
      setAnimateLike(true);
      setTimeout(() => setAnimateLike(false), 500); // reset animation
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setLiked(!liked);
  };

  const handleViewDetail = (e) => {
    e.stopPropagation();
    // Lấy lịch sử hiện tại
    const storedHistory = JSON.parse(localStorage.getItem('history')) || [];
    // Thêm sản phẩm mới vào đầu, bỏ sản phẩm trùng nếu có
    const updatedHistory = [product, ...storedHistory.filter(p => p.id !== product.id)];
    // Giới hạn lưu tối đa 20 sản phẩm
    localStorage.setItem('history', JSON.stringify(updatedHistory.slice(0, 20)));

    // Điều hướng đến trang chi tiết
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="card h-100 d-flex flex-column" onClick={handleViewDetail} style={{ cursor: 'pointer' }}>
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body d-flex flex-column flex-grow-1">
        <h5 className="card-title">{product.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{product.price.toLocaleString()} VND</h6>
        <p className="card-text flex-grow-1">{product.description}</p>
        <div className="d-flex justify-content-between align-items-center mt-3">
          {/* Nút xem chi tiết không cần onClick nữa vì toàn thẻ đã có onClick */}
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetail(e);
            }}
          >
            Xem chi tiết
          </button>
          <i
            className={`fas fa-heart fs-4 ${liked ? 'text-danger' : 'text-secondary'} ${animateLike ? 'like-animate' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(e);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
