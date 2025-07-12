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

  // Lọc ra sản phẩm chưa xem/chưa thích, để đề xuất thêm
  const suggested = products.filter(p => !interactedIds.has(p.id));

  // Giả lập delay và trả về tối đa 4 sản phẩm gợi ý
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(suggested.slice(0, 4));
    }, 500);
  });
}
