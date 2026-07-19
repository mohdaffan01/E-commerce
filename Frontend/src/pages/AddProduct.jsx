import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './AddProduct.css';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('Desks');
  const [stock, setStock] = useState('10');
  const [tag, setTag] = useState('');
  const [legs, setLegs] = useState('None');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    'Desks', 'Furnitures', 'Boxes', 'Drawers', 'Cabinets', 'Bins', 'Lamps', 'Services', 'Multimedia'
  ];

  const legOptions = ['None', 'Steel', 'Aluminium', 'Custom', 'Wood'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !description || !price || !image || !category) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    if (Number(price) <= 0) {
      setError('Price must be a positive number.');
      return;
    }

    if (Number(stock) < 0) {
      setError('Stock cannot be negative.');
      return;
    }

    try {
      setLoading(true);
      const productData = {
        name,
        description,
        price: Number(price),
        image,
        category,
        stock: Number(stock),
        tag,
        legs,
      };

      await api.post('/products', productData);
      setSuccess('Product successfully added to the catalog!');
      setLoading(false);

      // Redirect to home page after a short delay so user can see success feedback
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to add product. Please check your inputs.');
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page container">
      <div className="add-product-card">
        <div className="add-product-header">
          <h2>Add New Product</h2>
          <p>Register a new product in the store catalog database</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-grid">
            {/* Left Column */}
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="name">Product Name *</label>
                <input
                  type="text"
                  id="name"
                  placeholder="e.g. Ergonomic Office Chair"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  id="price"
                  placeholder="e.g. 199.99"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="legs">Legs Material</label>
                <select
                  id="legs"
                  value={legs}
                  onChange={(e) => setLegs(e.target.value)}
                >
                  {legOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="image">Image URL *</label>
                <input
                  type="url"
                  id="image"
                  placeholder="https://images.unsplash.com/..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="stock">Stock Quantity *</label>
                <input
                  type="number"
                  id="stock"
                  placeholder="e.g. 25"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="tag">Promo Tag (Optional)</label>
                <input
                  type="text"
                  id="tag"
                  placeholder="e.g. New!, Sale, 15% OFF"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  placeholder="Write details about the product's quality, features, size..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
