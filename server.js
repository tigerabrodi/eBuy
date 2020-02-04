const express = require('express');
const connectDB = require('./config/db');
const uuidv4 = require("uuid/v4")
const colors = require("colors");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 9067;

// Importing Routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const questionsRoutes = require("./routes/questions");
const cartRoutes = require("./routes/cart");

// Connect Database
connectDB();

// Configuring Multer storage
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    // I used a regex to trim the name from spaces
    cb(null, uuidv4() + "_" + file.originalname.replace(/\s/g, ''));
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};




// Init Middleware
app.use(express.json({ extended: false }));



// Use Multer
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);

// Serving static for images folder
app.use('/images', express.static(path.join(__dirname, 'images')));


// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Define Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/questions', questionsRoutes);
app.use("/cart", cartRoutes);



// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}



app.listen(PORT, () => console.log(`Server started on port ${PORT}`.cyan.underline.bold));