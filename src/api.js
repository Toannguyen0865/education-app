// src/api.js
import products from './data';

// Giả lập API trả về sản phẩm gợi ý dựa trên userId, dựa trên liked và viewed products
export function fetchSuggestions(userId) {
  // Giả sử lấy danh sách favorite + history từ localStorage
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const history = JSON.parse(localStorage.getItem('history')) || [];

  // Lấy id sản phẩm đã thích hoặc đã xem
  const interactedIds = new Set([
    ...favorites.map(p => p.id),
    ...history.map(p => p.id),
  ]);

  const suggested = products.filter(p => !interactedIds.has(p.id));


  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(suggested.slice(0, 4));
    }, 500);
  });
}
