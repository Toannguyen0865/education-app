import { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    if (!window.difyChatbotConfig) {
      window.difyChatbotConfig = {
        token: 'LP7RJVzyet6LcjCn',
        systemVariables: {},
        userVariables: {},
      };
    }

    if (!document.getElementById('dify-chatbot-script')) {
      const script = document.createElement('script');
      script.src = 'https://udify.app/embed.min.js';
      script.id = 'dify-chatbot-script';
      script.defer = true;
      setTimeout(() => {
        document.body.appendChild(script);
      }, 500);
    }

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

    return () => {
      const style = document.getElementById('dify-chatbot-style');
      if (style) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return null;
};

export default Chatbot;
