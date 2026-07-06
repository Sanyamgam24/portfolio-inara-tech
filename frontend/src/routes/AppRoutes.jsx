import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing/Landing';
import Education from '../pages/Education/Education';
import NGO from '../pages/NGO/NGO';
import StockMarket from '../pages/StockMarket/StockMarket';
import Business from '../pages/Business/Business';
import Blog from '../pages/Blog/Blog';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/education" element={<Education />} />
      <Route path="/ngo" element={<NGO />} />
      <Route path="/stock-market" element={<StockMarket />} />
      <Route path="/business" element={<Business />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  );
};

export default AppRoutes;
