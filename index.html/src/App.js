import './App.css';
import { React } from 'react';
import Header from './component/Header';
import Home from './modules/Home';
import Footer from './component/Footer';
import { Route, Routes } from 'react-router-dom';
import Product from './modules/Product';
import Products from './modules/Products';
import CategoryProducts from './modules/CategoryProducts';
import Cart from './modules/Cart';
import About from './component/About';
import Contact from './component/Contact';


function App() {
  return (
    <div>


      <Header />


      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/products/:id" element={<Product/>} />
        <Route path='/products' element={<Products/>}/>
        <Route path='/categories/:name' element={<CategoryProducts/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='*' element={<div>404</div>} />
      </Routes>


      <Footer />

    </div>
  );
}

export default App;
