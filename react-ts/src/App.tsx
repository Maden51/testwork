import React from 'react';
import {Route, Routes} from 'react-router-dom'
import AboutProductPage from './pages/AboutProductPage';
import ProductsPage from './pages/ProductsPage';
import Navigation from './components/Navigation';
 
function App() {
  return (
    <>
    <Navigation />
      <Routes>
        <Route path="/" element={ <ProductsPage />} />
        <Route path="about" element={ <AboutProductPage />} />
      </Routes>
    </>
  )
}

export default App;
