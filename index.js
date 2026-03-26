const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// 1. MongoDB Connection
const mongoURI = "mongodb+srv://maulisorgesorge_db_user:Cj7VpYpXk5v9Uv6u@cluster0.mongodb.net/mySocialApp?retryWrites=true&w=majority";
mongoose.connect(mongoURI)
    .then(() => console.log("Database Connected! ✅"))
    .catch(err => console.log("DB Error: ", err));

// 2. Database Models (यूजर और पोस्ट का ढांचा)
const User = mongoose.model('User', new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,
    profilePic: String
}));

const Post = mongoose.model('Post', new mongoose.Schema({
    userEmail: String,
    userName: String,
    content: String,
    imageUrl: String,
    createdAt: { type: Date, default: Date.now }
}));

// 3. ROUTES (सारे फीचर्स यहाँ हैं)

// --- होम चेक ---
app.get('/', (req, res) => res.send("Social App Server is Fully Functional! 🚀"));

// --- नया अकाउंट बनाना (Signup) ---
app.post('/signup', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ status: "success", message: "Account Created!" });
    } catch (err) {
        res.status(400).json({ status: "error", message: "User already exists or data missing" });
    }
});

// --- असली लॉगिन (Login) ---
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
        res.json({ status: "success", message: "Welcome back!", user });
    } else {
        res.status(401).json({ status: "error", message: "Invalid email or password" });
    }
});

// --- नई पोस्ट डालना (Create Post) ---
app.post('/posts', async (req, res) => {
    try {
        const newPost = new Post(req.body);
        await newPost.save();
        res.json({ status: "success", message: "Post shared!" });
    } catch (err) {
        res.status(500).json({ status: "error", message: "Could not post" });
    }
});

// --- सारी पोस्ट देखना (Get All Posts) ---
app.get('/posts', async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
});

// 4. Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
           
