import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import CryptoDetail from '../components/detail';
import CryptoList from '../components/list';
function Routeing() {
  return (
    <>
    <Router>
    <Routes>
      <Route exact path="/" element={<CryptoList />} />
      <Route exact path="/detail/:crypto_id" element={<CryptoDetail />} />
    </Routes>
</Router>
    </>
   
  )
}

export default Routeing;