import { useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import ProductCard from '../components/ProductCard';
// import SuggestionsButton from '../components/SuggestionsButton';
import products from '../data';  // import data sản phẩm

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
   
  }, []);

  const handleDetailClick = (id) => {
    navigate(`/product/${id}`);
  };


  return (
    <div className="container mt-4">
      <div className="mb-4" style={{ maxWidth: '1140px', margin: '0 auto', borderRadius: '1rem'}}>
        <Carousel fade pause="hover" interval={4000}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1622295023876-0cdf583c41f6?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Slide 1"
              style={{ height: '400px', objectFit: 'cover', borderRadius: '.5rem'}}
            />
            <Carousel.Caption>
              <h3>Chào mừng đến EduCommerce AI</h3>
              <p>Khóa học chất lượng hàng đầu.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Slide 2"
              style={{ height: '400px', objectFit: 'cover', borderRadius: '.5rem'}}
            />
            <Carousel.Caption>
              <h3>Học tập cùng AI</h3>
              <p>Tận dụng trí tuệ nhân tạo để học hiệu quả hơn.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
              alt="Slide 3"
              style={{ height: '400px', objectFit: 'cover', borderRadius: '.5rem'}}
            />
            <Carousel.Caption>
              <h3>Khóa học đa dạng</h3>
              <p>Từ frontend đến backend, từ cơ bản đến nâng cao.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <h4 className="mb-3">Danh sách khóa học</h4>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-3">
        {products.map((product) => (
          <div className="col" key={product.id}>
            <ProductCard product={product} onDetailClick={handleDetailClick} />
          </div>
        ))}
      </div>
    </div>
  );
  };

export default Home;
