//import { useState } from 'react'

import './App.css'
import { Routes, Route, NavLink, Navigate, Link, Outlet} from 'react-router-dom';
import AboutPage from './components/AboutPage';
import HomePage from './components/HomePage';
import ArticleForm from './components/ArticleForm';
import ArticleDetail from './components/ArticleDetail';
import Header from './components/Header';
import Authorized from './components/Authorized';

function App() {

  return (
    <div className="app">

      <Header/>
      <Routes>
        <Route path='/about' element={ <AboutPage />}  >
          <Route path="" element={ <Navigate replace to="aa" />} />
          <Route path="aa" element = {<h3>AA</h3>} />
          <Route path="bb" element = {<h3>BB</h3>} />

        </Route>
        <Route path='/' element={ <HomePage />}  />
        <Route element={<Authorized />}>
          <Route path='/add' element={ <ArticleForm />}  />
        </Route>

        <Route path="/articles/:id" element={ <ArticleDetail/>} />
        <Route path='*' element={ <h1> Not Found </h1>}  />

      </Routes>
    </div>
  );
}

export default App;
