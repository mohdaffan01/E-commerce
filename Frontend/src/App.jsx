import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import api from './services/api';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import AddProduct from './pages/AddProduct';


function App() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingCart, setLoadingCart] = useState(false);

  // Authenticate user on startup
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const { data } = await api.get('/auth/me');
          setUser(data);
        } catch (err) {
          console.error('Session expired or token invalid:', err);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoadingUser(false);
    };

    checkAuth();
  }, []);

  // Fetch cart whenever user logins or shifts
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoadingCart(true);
      const { data } = await api.get('/cart');
      setCartItems(data);
      setLoadingCart(false);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setLoadingCart(false);
    }
  };

  const login = (userData) => {
    setUser({
      _id: userData._id,
      name: userData.name,
      email: userData.email,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setCartItems([]);
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      await api.post('/cart/add', { productId, quantity });
      await fetchCart(); // Refresh cart items and trigger Nav count update
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert(err.response?.data?.error || 'Failed to add product to cart');
      throw err;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await api.put('/cart/update', { productId, quantity });
      await fetchCart(); // Refresh
    } catch (err) {
      console.error('Error updating cart quantity:', err);
      alert(err.response?.data?.error || 'Failed to update quantity');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/remove/${productId}`);
      await fetchCart(); // Refresh
    } catch (err) {
      console.error('Error removing cart item:', err);
      alert(err.response?.data?.error || 'Failed to remove product from cart');
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  if (loadingUser) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', color: '#64748b' }}>
        <h3>Loading your experience...</h3>
      </div>
    );
  }

  return (
    <Router>
      <div id="app-root-layout">
        <Navbar user={user} cartCount={cartCount} logout={logout} />
        
        <main className="main-content-layout">
          <Routes>
            <Route path="/" element={<Home onAddToCart={addToCart} isAuthenticated={!!user} />} />
            <Route path="/products" element={<Products onAddToCart={addToCart} isAuthenticated={!!user} />} />
            <Route path="/products/:id" element={<ProductDetails onAddToCart={addToCart} isAuthenticated={!!user} />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/add-product" 
              element={user ? <AddProduct /> : <Navigate to="/login" />} 
            />
            
            <Route 
              path="/login" 
              element={user ? <Navigate to="/" /> : <Login login={login} />} 
            />
            <Route 
              path="/register" 
              element={user ? <Navigate to="/" /> : <Register login={login} />} 
            />
            <Route 
              path="/cart" 
              element={user ? (
                <Cart 
                  cartItems={cartItems} 
                  onUpdateQuantity={updateQuantity} 
                  onRemoveFromCart={removeFromCart} 
                  loadingCart={loadingCart} 
                />
              ) : (
                <Navigate to="/login" />
              )} 
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
