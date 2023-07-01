import { Routes,Route } from 'react-router';
import './App.css';
import Nav from './Nav';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Addproduct from './Addproduct';
import Profile from './Profile';
import Products from './Products';
import Personallist from './Personallist';
import Cart from './Cart';
import Searchpage from './Searchpage';
import Producttype from './Producttype';
import Details from './Details';
import Review from './Review';


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/addproduct' element={<Addproduct/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/personallist' element={<Personallist/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/searchpage' element={<Searchpage/>}/>
      <Route path='/producttype' element={<Producttype/>}/>
      <Route path='/detail' element={<Details/>}/>
      <Route path='/review' element={<Review/>}/>
      
    </Routes>
    </>
  );
}

export default App;
