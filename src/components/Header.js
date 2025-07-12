import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../data';

const Header = () => {
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true); // NEW
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const suggestionRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value.trim()) {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowDropdown(true);
      navigate(`/?search=${encodeURIComponent(value)}`);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
      navigate('/');
    }
  };

  const handleSelectSuggestion = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
    setSearchInput('');
    setSuggestions([]);
    setShowDropdown(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary position-relative z-3" style={{ minHeight: '70px' }}>
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand fs-3 d-flex align-items-center fw-bold" href="/">
          <i className="fas fa-graduation-cap me-2 fs-2"></i>EduCommerce AI
        </a>

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-controls="navbarContent"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`} id="navbarContent">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center w-100 gap-3 mt-3 mt-lg-0">
            {/* Search input */}
            <div className="position-relative w-100 px-2" style={{ maxWidth: '600px' }}>
              <div className="input-group w-100 position-relative" ref={inputRef}>
                <div className="position-relative w-100">
                  <i
                    className="fas fa-search position-absolute"
                    style={{
                      left: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#aaa',
                      pointerEvents: 'none',
                      zIndex: 10,
                    }}
                  ></i>
                  <input
                    type="text"
                    className="form-control ps-5 border border-light rounded"
                    placeholder="Tìm kiếm khóa học..."
                    value={searchInput}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>

                {/* Gợi ý dropdown */}
                <ul
                  className="list-group position-absolute w-100 mt-2"
                  style={{
                    top: '100%',
                    left: 0,
                    zIndex: 9999,
                    backgroundColor: 'white',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    maxHeight: showDropdown ? '300px' : '0',
                    opacity: showDropdown ? 1 : 0,
                    transform: showDropdown ? 'translateY(0)' : 'translateY(-10px)',
                    overflowY: 'auto',
                    transition: 'all 0.3s ease',
                    pointerEvents: showDropdown ? 'auto' : 'none',
                    borderRadius: '0.5rem',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#ccc transparent',
                  }}
                  ref={suggestionRef}
                >
                  {suggestions.length > 0 ? (
                    suggestions.map((product) => (
                      <li
                        key={product.id}
                        className="list-group-item d-flex align-items-center"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleSelectSuggestion(product)}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          width="40"
                          height="40"
                          className="me-2 rounded"
                        />
                        <span>{product.name}</span>
                      </li>
                    ))
                  ) : (
                    searchInput.trim() && (
                      <li
                        className="list-group-item text-center text-muted"
                        style={{ cursor: 'default' }}
                      >
                        Không có khóa học phù hợp
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Button */}
            <div className="d-flex justify-content-center align-items-center gap-2 px-2">
              <button
                type="button"
                className="btn btn-outline-light fw-bold"
                onClick={() => navigate('/favorites')}
              >
                Yêu thích
              </button>
              <button
                type="button"
                className="btn btn-outline-light fw-bold"
                onClick={() => navigate('/history')}
              >
                Lịch sử
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
