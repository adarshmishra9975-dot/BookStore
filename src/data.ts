import { Book, BackendFileCode, ApiEndpoint } from './types';

export const initialBooks: Book[] = [
  {
    _id: "65e8a101b7a123001a1e0001",
    title: "Atomic Habits",
    author: "James Clear",
    description: "An easy & proven way to build good habits and break bad ones. Tiny changes produce remarkable results when compounded daily.",
    category: "Self Help",
    price: 445,
    originalPrice: 650,
    discount: "31% OFF",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop",
    rating: 4.9,
    stock: 25,
    badge: "HOT",
    badgeColor: "text-white bg-orange-500",
    createdAt: "2026-03-01T10:00:00.000Z"
  },
  {
    _id: "65e8a101b7a123001a1e0002",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    description: "Timeless lessons on wealth, greed, and happiness. Doing well with money has a little to do with how smart you are and a lot to do with behavior.",
    category: "Finance",
    price: 399,
    originalPrice: 599,
    discount: "33% OFF",
    image: "https://images.unsplash.com/photo-1592492159418-39f319320569?q=80&w=400&auto=format&fit=crop",
    rating: 4.8,
    stock: 18,
    badge: "33% OFF",
    badgeColor: "text-green-600 bg-white/95",
    createdAt: "2026-03-02T11:00:00.000Z"
  },
  {
    _id: "65e8a101b7a123001a1e0003",
    title: "Clean Code",
    author: "Robert C. Martin",
    description: "A handbook of agile software craftsmanship. Master professional naming conventions, clean functions, error handling, and unit testing.",
    category: "Programming",
    price: 750,
    originalPrice: 999,
    discount: "25% OFF",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=400&auto=format&fit=crop",
    rating: 4.9,
    stock: 14,
    badge: "Bestseller",
    badgeColor: "text-blue-600 bg-white/95",
    createdAt: "2026-03-03T12:00:00.000Z"
  },
  {
    _id: "65e8a101b7a123001a1e0004",
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    description: "Your journey to mastery. One of the most influential software engineering books covering architecture, testing, and modern craftsmanship.",
    category: "Programming",
    price: 820,
    originalPrice: 1100,
    discount: "25% OFF",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop",
    rating: 4.8,
    stock: 12,
    badge: "Must Read",
    badgeColor: "text-purple-600 bg-white/95",
    createdAt: "2026-03-04T09:30:00.000Z"
  },
  {
    _id: "65e8a101b7a123001a1e0005",
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    description: "What the rich teach their kids about money that the poor and middle class do not! Explodes the myth that you need high income to get rich.",
    category: "Finance",
    price: 350,
    originalPrice: 499,
    discount: "30% OFF",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=400&auto=format&fit=crop",
    rating: 4.7,
    stock: 20,
    createdAt: "2026-03-04T10:15:00.000Z"
  },
  {
    _id: "65e8a101b7a123001a1e0006",
    title: "Ikigai",
    author: "Héctor García & Francesc Miralles",
    description: "The Japanese secret to a long and happy life. Uncover your purpose, passion, and reasons for getting up with joy every morning.",
    category: "Self Help",
    price: 320,
    originalPrice: 450,
    discount: "29% OFF",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400&auto=format&fit=crop",
    rating: 4.6,
    stock: 22,
    createdAt: "2026-03-04T11:45:00.000Z"
  },
  {
    _id: "65e8a101b7a123001a1e0007",
    title: "Don't Make Me Think",
    author: "Steve Krug",
    description: "A Common Sense Approach to Web Usability. A classic handbook for developers, designers, and students building intuitive interfaces.",
    category: "Technology",
    price: 640,
    originalPrice: 850,
    discount: "25% OFF",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=400&auto=format&fit=crop",
    rating: 4.8,
    stock: 15,
    createdAt: "2026-03-05T08:00:00.000Z"
  },
  {
    _id: "65e8a101b7a123001a1e0008",
    title: "Harry Potter & Philosopher's Stone",
    author: "J.K. Rowling",
    description: "Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive.",
    category: "Fiction",
    price: 499,
    originalPrice: 699,
    discount: "28% OFF",
    image: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?q=80&w=400&auto=format&fit=crop",
    rating: 4.9,
    stock: 30,
    badge: "Classic",
    badgeColor: "text-amber-700 bg-amber-50",
    createdAt: "2026-03-05T09:10:00.000Z"
  },
  {
    _id: "65e8a101b7a123001a1e0009",
    title: "The Alchemist",
    author: "Paulo Coelho",
    description: "A magical fable about following your personal legend and listening to the wisdom strewn along life's path.",
    category: "Fiction",
    price: 299,
    originalPrice: 399,
    discount: "25% OFF",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop",
    rating: 4.7,
    stock: 25,
    createdAt: "2026-03-05T10:00:00.000Z"
  },
  {
    _id: "65e8a101b7a123001a1e0010",
    title: "Deep Work",
    author: "Cal Newport",
    description: "Rules for focused success in a distracted world. Master hard skills quickly and produce at an elite level.",
    category: "Self Help",
    price: 399,
    originalPrice: 550,
    discount: "27% OFF",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=400&auto=format&fit=crop",
    rating: 4.8,
    stock: 16,
    createdAt: "2026-03-05T11:00:00.000Z"
  },
  {
    _id: "65e8a101b7a123001a1e0011",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    description: "The definitive biography of Apple co-founder Steve Jobs, based on more than forty interviews with Jobs conducted over two years.",
    category: "Biography",
    price: 599,
    originalPrice: 899,
    discount: "33% OFF",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    rating: 4.9,
    stock: 10,
    createdAt: "2026-03-05T12:00:00.000Z"
  },
  {
    _id: "65e8a101b7a123001a1e0012",
    title: "Zero to One",
    author: "Peter Thiel with Blake Masters",
    description: "Notes on Startups, or How to Build the Future. The great secret of our time is that there are still uncharted frontiers.",
    category: "Business",
    price: 420,
    originalPrice: 599,
    discount: "30% OFF",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop",
    rating: 4.7,
    stock: 15,
    createdAt: "2026-03-05T13:00:00.000Z"
  },
  {
    _id: "65e8a101b7a123001a1e0013",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    description: "Explores how biology and history have defined us and enhanced our understanding of what it means to be human.",
    category: "History",
    price: 499,
    originalPrice: 750,
    discount: "33% OFF",
    image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=400&auto=format&fit=crop",
    rating: 4.8,
    stock: 12,
    createdAt: "2026-03-05T14:00:00.000Z"
  },
  {
    _id: "65e8a101b7a123001a1e0014",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    description: "From the Big Bang to Black Holes. An iconic masterpiece exploring cosmology, general relativity, space, and modern physics.",
    category: "Science",
    price: 380,
    originalPrice: 550,
    discount: "31% OFF",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop",
    rating: 4.8,
    stock: 14,
    createdAt: "2026-03-05T15:00:00.000Z"
  },
  {
    _id: "65e8a101b7a123001a1e0015",
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    description: "Uncovers an elegant, lightweight, and expressive programming language that enables you to build effective modern web applications.",
    category: "Education",
    price: 490,
    originalPrice: 650,
    discount: "25% OFF",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=400&auto=format&fit=crop",
    rating: 4.6,
    stock: 15,
    createdAt: "2026-03-05T16:00:00.000Z"
  }
];

export const backendFiles: BackendFileCode[] = [
  {
    fileName: "package.json",
    filePath: "backend/package.json",
    description: "Node.js configuration with ES Modules enabled ('type': 'module'), Express, Mongoose, Dotenv, and Nodemon dev script.",
    tags: ["Node.js", "Config", "Dependencies"],
    code: `{
  "name": "bookstore-backend",
  "version": "1.0.0",
  "description": "BookStore MERN Stack Backend REST API",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "seed": "node seed/bookSeeder.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.9.5"
  },
  "devDependencies": {
    "nodemon": "^3.1.9"
  }
}`
  },
  {
    fileName: ".env",
    filePath: "backend/.env",
    description: "Local environment configuration with Port 5000, local MongoDB Compass URI, and secret JWT key.",
    tags: ["Security", "Config", "Windows"],
    code: `PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/bookstore
JWT_SECRET=bookstore_super_secret_jwt_key_2026`
  },
  {
    fileName: "db.js",
    filePath: "backend/config/db.js",
    description: "Mongoose database connector for local Windows MongoDB instance with helpful success & error logs.",
    tags: ["Mongoose", "Database", "MongoDB"],
    code: `import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(\`✅ MongoDB Connected Successfully: \${conn.connection.host}\`);
    console.log(\`📦 Database Name: \${conn.connection.name}\`);
  } catch (error) {
    console.error(\`❌ MongoDB Connection Error: \${error.message}\`);
    console.error('💡 Tip: Ensure MongoDB service is running on Windows (net start MongoDB)!');
    process.exit(1);
  }
};

export default connectDB;`
  },
  {
    fileName: "Book.js",
    filePath: "backend/models/Book.js",
    description: "Mongoose Schema for the books collection with strict validation, category enums, pricing, and timestamps.",
    tags: ["Mongoose", "Schema", "Model"],
    code: `import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Book description is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Fiction',
        'Technology',
        'Programming',
        'Self Help',
        'Finance',
        'Business',
        'History',
        'Science',
        'Biography',
        'Education',
      ],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    originalPrice: {
      type: Number,
      required: [true, 'Original price is required'],
    },
    discount: {
      type: String,
      default: '0% OFF',
    },
    image: {
      type: String,
      required: [true, 'Book cover image URL is required'],
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      default: 10,
      min: [0, 'Stock cannot be negative'],
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;`
  },
  {
    fileName: "bookController.js",
    filePath: "backend/controllers/bookController.js",
    description: "All 5 CRUD operations for books with regex search, category filtering, auto discount calculation, and error responses.",
    tags: ["Express", "Controller", "CRUD"],
    code: `import Book from '../models/Book.js';

// @desc    Get all books (with search & category filters)
// @route   GET /api/books
// @access  Public
export const getBooks = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    // Category filter
    if (category && category !== 'All') {
      query.category = category;
    }

    // Keyword search in title, author, or category
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    const books = await Book.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch books from database',
      error: error.message,
    });
  }
};

// @desc    Get single book by ID
// @route   GET /api/books/:id
// @access  Public
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found with this ID',
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching book details',
      error: error.message,
    });
  }
};

// @desc    Create a new book
// @route   POST /api/books
// @access  Admin
export const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      category,
      price,
      originalPrice,
      discount,
      image,
      rating,
      stock,
    } = req.body;

    // Validation
    if (!title || !author || !description || !category || !price || !originalPrice || !image) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, author, description, category, price, originalPrice, image',
      });
    }

    const calculatedDiscount = discount || 
      \`\${Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF\`;

    const newBook = await Book.create({
      title,
      author,
      description,
      category,
      price: Number(price),
      originalPrice: Number(originalPrice),
      discount: calculatedDiscount,
      image,
      rating: rating ? Number(rating) : 4.5,
      stock: stock ? Number(stock) : 10,
    });

    res.status(201).json({
      success: true,
      message: 'Book added to catalog successfully',
      data: newBook,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create book',
      error: error.message,
    });
  }
};

// @desc    Update book details
// @route   PUT /api/books/:id
// @access  Admin
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: updatedBook,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update book',
      error: error.message,
    });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Admin
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully from MongoDB',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete book',
      error: error.message,
    });
  }
};`
  },
  {
    fileName: "bookRoutes.js",
    filePath: "backend/routes/bookRoutes.js",
    description: "Express Router mapping all REST endpoints cleanly to controller methods.",
    tags: ["Express", "Routes", "REST"],
    code: `import express from 'express';
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/bookController.js';

const router = express.Router();

// Route: /api/books
router.route('/')
  .get(getBooks)      // Fetch all books (with search & filters)
  .post(createBook);  // Create new book (Admin)

// Route: /api/books/:id
router.route('/:id')
  .get(getBookById)   // Fetch single book details
  .put(updateBook)    // Update book
  .delete(deleteBook);// Delete book

export default router;`
  },
  {
    fileName: "bookSeeder.js",
    filePath: "backend/seed/bookSeeder.js",
    description: "Self-contained script to populate MongoDB with 15 realistic book records across 8 categories with 1 terminal command.",
    tags: ["MongoDB", "Seeder", "Data"],
    code: `import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from '../models/Book.js';

dotenv.config();

const sampleBooks = [
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'An easy & proven way to build good habits and break bad ones.',
    category: 'Self Help',
    price: 445,
    originalPrice: 650,
    discount: '31% OFF',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop',
    rating: 4.9,
    stock: 25,
  },
  {
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    description: 'Timeless lessons on wealth, greed, and happiness doing well with money.',
    category: 'Finance',
    price: 399,
    originalPrice: 599,
    discount: '33% OFF',
    image: 'https://images.unsplash.com/photo-1592492159418-39f319320569?q=80&w=400&auto=format&fit=crop',
    rating: 4.8,
    stock: 18,
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    description: 'A handbook of agile software craftsmanship for professional engineers.',
    category: 'Programming',
    price: 750,
    originalPrice: 999,
    discount: '25% OFF',
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=400&auto=format&fit=crop',
    rating: 4.9,
    stock: 14,
  },
  {
    title: 'The Pragmatic Programmer',
    author: 'David Thomas & Andrew Hunt',
    description: 'Your journey to mastery in modern software engineering.',
    category: 'Programming',
    price: 820,
    originalPrice: 1100,
    discount: '25% OFF',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop',
    rating: 4.8,
    stock: 12,
  },
  {
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    description: 'What the rich teach their kids about money that others do not.',
    category: 'Finance',
    price: 350,
    originalPrice: 499,
    discount: '30% OFF',
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=400&auto=format&fit=crop',
    rating: 4.7,
    stock: 20,
  }
];

const seedBooks = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bookstore';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB for seeding...');

    await Book.deleteMany();
    console.log('🗑️ Cleared existing books collection');

    const createdBooks = await Book.insertMany(sampleBooks);
    console.log(\`✨ Successfully seeded \${createdBooks.length} books into MongoDB!\`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error.message);
    process.exit(1);
  }
};

seedBooks();`
  },
  {
    fileName: "server.js",
    filePath: "backend/server.js",
    description: "Main Express application initializing CORS, express.json(), MongoDB connection, route mounts, and error handlers.",
    tags: ["Express", "Server", "Entry"],
    code: `import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import bookRoutes from './routes/bookRoutes.js';

// 1. Load Environment Variables (.env)
dotenv.config();

// 2. Connect to Local MongoDB Database
connectDB();

// 3. Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// 4. Middlewares
app.use(cors());
app.use(express.json());

// 5. Health Check Endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'BookStore Backend API is running smoothly',
    timestamp: new Date().toISOString(),
    endpoints: {
      books: '/api/books',
    },
  });
});

// 6. Mount API Routes
app.use('/api/books', bookRoutes);

// 7. Global 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: \`API Route \${req.originalUrl} not found\`,
  });
});

// 8. Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message,
  });
});

// 9. Start Server
app.listen(PORT, () => {
  console.log(\`==============================================\`);
  console.log(\`🚀 BookStore Server is running on Port \${PORT}\`);
  console.log(\`📍 Local URL: http://localhost:\${PORT}\`);
  console.log(\`📚 Books API: http://localhost:\${PORT}/api/books\`);
  console.log(\`==============================================\`);
});`
  }
];

export const apiEndpointsList: ApiEndpoint[] = [
  {
    method: 'GET',
    endpoint: '/api/books',
    description: 'Fetch all books from MongoDB with optional query parameters for search & category.',
    access: 'Public',
    sampleResponse: `{
  "success": true,
  "count": 15,
  "data": [
    {
      "_id": "65e8a101b7a123001a1e0001",
      "title": "Atomic Habits",
      "author": "James Clear",
      "category": "Self Help",
      "price": 445,
      "originalPrice": 650,
      "discount": "31% OFF",
      "rating": 4.9,
      "stock": 25
    }
  ]
}`
  },
  {
    method: 'GET',
    endpoint: '/api/books?category=Programming',
    description: 'Filter books by category (e.g. Programming, Finance, Self Help, Fiction).',
    access: 'Public',
    sampleResponse: `{
  "success": true,
  "count": 3,
  "data": [
    {
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "category": "Programming"
    }
  ]
}`
  },
  {
    method: 'GET',
    endpoint: '/api/books?search=money',
    description: 'Keyword search across book titles, authors, and categories.',
    access: 'Public',
    sampleResponse: `{
  "success": true,
  "count": 2,
  "data": [
    {
      "title": "The Psychology of Money",
      "author": "Morgan Housel"
    }
  ]
}`
  },
  {
    method: 'GET',
    endpoint: '/api/books/:id',
    description: 'Fetch complete details for a single book using its MongoDB ObjectId (_id).',
    access: 'Public',
    sampleResponse: `{
  "success": true,
  "data": {
    "_id": "65e8a101b7a123001a1e0001",
    "title": "Atomic Habits",
    "description": "An easy & proven way to build good habits..."
  }
}`
  },
  {
    method: 'POST',
    endpoint: '/api/books',
    description: 'Create a new book document in the MongoDB books collection.',
    access: 'Admin',
    samplePayload: `{
  "title": "Modern Full-Stack Development",
  "author": "Dr. A. Sharma",
  "description": "Complete guide to React, Node, Express, and MongoDB",
  "category": "Programming",
  "price": 550,
  "originalPrice": 799,
  "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400",
  "stock": 20
}`,
    sampleResponse: `{
  "success": true,
  "message": "Book added to catalog successfully",
  "data": {
    "_id": "65e8a101b7a123001a1e0099",
    "title": "Modern Full-Stack Development",
    "discount": "31% OFF"
  }
}`
  },
  {
    method: 'PUT',
    endpoint: '/api/books/:id',
    description: 'Update price, stock, or any field of an existing book.',
    access: 'Admin',
    samplePayload: `{
  "price": 499,
  "stock": 35
}`,
    sampleResponse: `{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "65e8a101b7a123001a1e0001",
    "price": 499,
    "stock": 35
  }
}`
  },
  {
    method: 'DELETE',
    endpoint: '/api/books/:id',
    description: 'Delete a book document permanently from the MongoDB database.',
    access: 'Admin',
    sampleResponse: `{
  "success": true,
  "message": "Book deleted successfully from MongoDB"
}`
  }
];
