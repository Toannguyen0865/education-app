import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container d-flex flex-column flex-md-row flex-wrap justify-content-between align-items-start gap-4">
        <div className="flex-fill" style={{ minWidth: '200px' }}>
          <h5>EduCommerce AI</h5>
          <p className="mb-0">Nơi học tập trực tuyến chất lượng với AI hỗ trợ</p>
        </div>

        <div className="d-flex flex-column flex-sm-row gap-3 flex-fill" style={{ minWidth: '200px' }}>
          <a href="/" className="text-light text-decoration-none">Trang chủ</a>
          <a href="/favorites" className="text-light text-decoration-none">Yêu thích</a>
          <a href="/history" className="text-light text-decoration-none">Lịch sử</a>
          <a href="/contact" className="text-light text-decoration-none">Liên hệ</a>
        </div>

        <div className="d-flex gap-3 flex-fill justify-content-md-end" style={{ minWidth: '200px' }}>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-light">
            <i className="fab fa-facebook fa-lg"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-light">
            <i className="fab fa-tiktok fa-lg"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-light">
            <i className="fab fa-instagram fa-lg"></i>
          </a>
        </div>
      </div>

      <div className="text-center mt-4 small">
        &copy; {new Date().getFullYear()} EduCommerce AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
