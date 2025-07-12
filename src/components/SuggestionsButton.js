import React, { useState } from 'react';
import { fetchSuggestions } from '../api';
import { useNavigate } from 'react-router-dom';
import './SuggestionsButton.css'; 

const SuggestionsButton = ({ userId }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showList, setShowList] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!showList) {
      const results = await fetchSuggestions(userId);
      setSuggestions(results);
    }
    setShowList(!showList);
  };

  const handleNavigate = (id) => {
    navigate(`/product/${id}`, { state: { scrollToTop: true } });
    setShowList(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'flex-start',
      }}
    >
      <button
        className="btn btn-primary rounded-circle p-3 shadow"
        title="Gợi ý sản phẩm phù hợp"
        onClick={handleClick}
      >
        <i className="fas fa-magic fs-4"></i>
      </button>

      <div className={`suggestion-box ${showList ? 'show' : 'hide'}`}>
        <strong className="d-block mb-2">Gợi ý cho bạn:</strong>
        {suggestions.length > 0 ? (
          suggestions.map((product) => (
            <button
              key={product.id}
              className="list-group-item list-group-item-action mb-1"
              onClick={() => handleNavigate(product.id)}
            >
              {product.name}
            </button>
          ))
        ) : (
          <div>Không có gợi ý</div>
        )}
      </div>
    </div>
  );
};

export default SuggestionsButton;
