import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './page/Home';
import Favorites from './page/Favorite';
import History from './page/History';
import ProductDetail from './page/ProductDetail';
import Recommend from './components/Recommend';
import Footer from './components/Footer';
// import Chatbot from './components/Chatbot';
import SuggestionsButton from './components/SuggestionsButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  const userId = 'user-123';
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/history' element={<History />} />
        <Route path='/product/:id' element={<ProductDetail />} />
      </Routes>
      <Recommend />
      <Footer />
      {/* <Chatbot /> */}
      <SuggestionsButton userId={userId} />
    </Router>
  );
}

export default App;
