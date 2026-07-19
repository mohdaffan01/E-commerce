const Product = require('../models/Product');

// @desc    Get all products (with filters)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { category, search, legs, priceMax } = req.query;
    let query = {};

    // Filter by Category (exclude 'All Products' label if sent)
    if (category && category !== 'All Products') {
      query.category = category;
    }

    // Filter by Search Query
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Filter by Legs material
    if (legs) {
      query.legs = legs;
    }

    // Filter by Price range
    if (priceMax) {
      query.price = { $lte: Number(priceMax) };
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching products' });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(500).json({ error: 'Server error fetching product details' });
  }
};

// @desc    Seed database with sample products matching screenshot
// @route   POST /api/products/seed
// @access  Public
const seedProducts = async (req, res) => {
  try {
    // Clear all existing products first to ensure fresh seed update
    await Product.deleteMany({});

    const sampleProducts = [
      {
        name: 'Customizable Desk',
        description: 'Premium height-adjustable standing desk featuring a solid maple top and silent dual-motor system.',
        price: 750,
        image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=60',
        category: 'Desks',
        stock: 12,
        tag: 'New!',
        legs: 'Wood',
      },
      {
        name: 'Storage Box',
        description: 'Heavy duty modular storage container made of durable recycled polymers. Perfect for organizing toys or office supplies.',
        price: 15.80,
        image: 'https://images.unsplash.com/photo-1581241863380-935587b92f7f?w=800&auto=format&fit=crop&q=60',
        category: 'Boxes',
        stock: 45,
        tag: '',
        legs: 'None',
      },
      {
        name: 'Conference Chair',
        description: 'Comfortable ergonomic conference room chair made of molded plywood and steel frame legs.',
        price: 33,
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop&q=60',
        category: 'Furnitures',
        stock: 18,
        tag: 'Sale',
        legs: 'Steel',
      },
      {
        name: 'Desk Combination',
        description: 'Complete workspace combination setup including an L-shaped desk surface and double storage cabinets.',
        price: 450,
        image: 'https://images.unsplash.com/photo-1530018607912-eff2df114f11?w=800&auto=format&fit=crop&q=60',
        category: 'Desks',
        stock: 6,
        tag: 'Sale',
        legs: 'Aluminium',
      },
      {
        name: 'Office Chair',
        description: 'Swivel office chair with a yellow shell, padded cushion, and adjustable height control levers.',
        price: 70,
        image: 'https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?w=800&auto=format&fit=crop&q=60',
        category: 'Furnitures',
        stock: 10,
        tag: '',
        legs: 'Steel',
      },
      {
        name: 'Drawer Black',
        description: 'Mobile filing drawer cabinet with smooth-gliding locking drawers and custom roller wheels.',
        price: 25,
        image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&auto=format&fit=crop&q=60',
        category: 'Drawers',
        stock: 15,
        tag: '',
        legs: 'Custom',
      },
      {
        name: 'Acoustic Bloc Screens',
        description: 'Freestanding sound-dampening office divider screens to create personal cubicles.',
        price: 295,
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=60',
        category: 'Cabinets',
        stock: 5,
        tag: '',
        legs: 'None',
      },
      {
        name: 'Corner Desk Left Sit',
        description: 'Classic space-saving corner writing desk constructed from rich oak veneer wood and solid framing.',
        price: 85,
        image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&auto=format&fit=crop&q=60',
        category: 'Desks',
        stock: 14,
        tag: '',
        legs: 'Wood',
      },
    ];

    const createdProducts = await Product.insertMany(sampleProducts);
    res.status(201).json({ message: 'Products seeded successfully', count: createdProducts.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during product seeding' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  seedProducts,
};
