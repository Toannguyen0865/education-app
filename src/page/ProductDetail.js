import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import products from '../data';
import './ProductDetail.css'; 
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);
  const [animateLike, setAnimateLike] = useState(false);


  useEffect(() => {
    const found = products.find((p) => p.id === parseInt(id));
    if (found) {
      setProduct(found);
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const isLiked = favorites.some((item) => item.id === found.id);
      setLiked(isLiked);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const toggleLike = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  let updatedFavorites;

  if (liked) {
    updatedFavorites = favorites.filter((item) => item.id !== product.id);
  } else {
    updatedFavorites = [...favorites, product];
    setAnimateLike(true);
    setTimeout(() => setAnimateLike(false), 500); 
  }

  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  setLiked(!liked);
};


  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {'★'.repeat(fullStars)}
        {halfStar && '½'}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  if (!product) {
    return (
      <div className="container mt-5">
        <p>Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow-sm"
          />
        </div>
        <div className="col-md-6">
          <div className="d-flex justify-content-between align-items-start">
            <h2 className="mb-3">{product.name}</h2>
            <i
              className={`fas fa-heart fs-3 ${liked ? 'text-danger' : 'text-secondary'} ${animateLike ? 'like-animate' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={toggleLike}
              title={liked ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
            ></i>

          </div>
          <h4 className="text-muted mb-3">
            Giá: {product.price.toLocaleString()} VND
          </h4>
          <p className="mb-4">
            {product.longDescription || product.description}
          </p>
          <div className="mb-4">
            <strong>Đánh giá: </strong>
            <span className="text-warning" style={{ fontSize: '1.2rem' }}>
              {renderStars(product.rating)}
            </span>{' '}
            ({(product.rating * 25).toFixed(0)} đánh giá)
          </div>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
