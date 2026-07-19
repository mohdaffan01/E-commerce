const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

async function seed() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected successfully. Cleaning and seeding products...');
    
    // Clear all existing products first
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
      {
        name: 'Adjustable Desk Lamp',
        description: 'Modern LED desk lamp with adjustable arm, wireless charging base, and multiple color temperature settings.',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=60',
        category: 'Lamps',
        stock: 30,
        tag: 'New!',
        legs: 'None',
      },
      {
        name: 'Mesh Waste Bin',
        description: 'Sleek matte black mesh wastebasket, perfect for matching under-desk office aesthetics.',
        price: 12.50,
        image: 'https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?w=800&auto=format&fit=crop&q=60',
        category: 'Bins',
        stock: 50,
        tag: '',
        legs: 'None',
      },
      {
        name: 'Premium Dual Monitor Arm',
        description: 'Heavy-duty dual monitor mount with gas spring mechanics, offering seamless full-motion height adjustments.',
        price: 129.00,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=60',
        category: 'Multimedia',
        stock: 15,
        tag: 'Sale',
        legs: 'Custom',
      },
      {
        name: 'Mobile Under-Desk Drawer',
        description: 'Compact white 3-drawer filing cabinet featuring lockable keys and silent ball-bearing sliding tracks.',
        price: 89.00,
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format&fit=crop&q=60',
        category: 'Drawers',
        stock: 8,
        tag: '',
        legs: 'Custom',
      }
    ];

    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`Successfully seeded ${createdProducts.length} products to database.`);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

seed();
