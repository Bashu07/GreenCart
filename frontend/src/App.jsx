import React, { useContext } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import { AppContext} from './context/AppContext'
import Login from './components/Login'
import AllProducts from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Address from './pages/Address'
import MyOrders from './pages/MyOrders'
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './pages/seller/SellerLayout'
import AddProduct from './pages/seller/AddProduct'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'
import Contact from './pages/Contact'




const App = () => {

  const isSellerPath = useLocation().pathname.includes('seller')

  const {  showUserLogin , isSeller } = useContext(AppContext)

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      <Toaster />

      {isSellerPath ? null : <Navbar />}

      {
        showUserLogin  ? <Login/>
        :null

      }

      <div className={` ${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}  `}>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts/>} />
          <Route path='/contact' element={<Contact/>} />

          <Route path='/products/:category' element={<ProductCategory/>} />
          <Route path='/products/:category/:id' element={<ProductDetails/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/add-address' element={<Address/>} />
          <Route path='/my-orders' element={<MyOrders/>} />

          <Route path='seller' element={isSeller ? <SellerLayout/> : <SellerLogin/>}>
          <Route index element={isSeller ? <AddProduct/>: null}/>
          <Route path='product-list' element={ <ProductList/> }/>
          <Route path='orders' element={ <Orders/> }/>

            
          </Route>


          


        </Routes>
      </div>

      {
        !isSellerPath && <Footer />
      }

    </div>
  )
}

export default App