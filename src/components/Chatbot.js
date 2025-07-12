import { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Cấu hình chatbot, chỉ set nếu chưa tồn tại để tránh ghi đè
    if (!window.difyChatbotConfig) {
      window.difyChatbotConfig = {
        token: 'LP7RJVzyet6LcjCn',
        systemVariables: {},
        userVariables: {},
      };
    }

    // Thêm script chatbot nếu chưa có
    if (!document.getElementById('dify-chatbot-script')) {
      const script = document.createElement('script');
      script.src = 'https://udify.app/embed.min.js';
      script.id = 'dify-chatbot-script';
      script.defer = true;
      // Trì hoãn 500ms để đảm bảo DOM render xong
      setTimeout(() => {
        document.body.appendChild(script);
      }, 500);
    }

    // Thêm style nếu chưa có
    if (!document.getElementById('dify-chatbot-style')) {
      const style = document.createElement('style');
      style.id = 'dify-chatbot-style';
      style.innerHTML = `
        #dify-chatbot-bubble-button {
          background-color: #1C64F2 !important;
          z-index: 9999 !important;
        }
        #dify-chatbot-bubble-window {
          position: fixed !important;
          bottom: 80px !important;
          right: 20px !important;
          width: 24rem !important;
          height: 40rem !important;
          z-index: 9999 !important;
          border-radius: 12px !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }
      `;
      document.head.appendChild(style);
    }

    // Cleanup khi unmount
    return () => {
      // Không xóa script để tránh mất chatbot khi chuyển trang, chỉ xóa style
      const style = document.getElementById('dify-chatbot-style');
      if (style) {
        document.head.removeChild(style);
      }
      // Không nên xóa window.difyChatbotConfig để chatbot vẫn hoạt động ổn định
    };
  }, []);

  return null;
};

export default Chatbot;
