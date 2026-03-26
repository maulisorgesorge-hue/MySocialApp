const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware - यह ऐप और सर्वर के बीच की रुकावट दूर करेगा
app.use(cors()); 
app.use(express.json());

// 1. MongoDB Connection (आपकी पुरानी स्ट्रिंग का इस्तेमाल किया है)
const mongoURI = "mongodb+srv://maulisorgesorge_db_user:Cj7VpYpXk5v9Uv6u@cluster0.mongodb.net/mySocialApp?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
    .then(() => console.log("डेटाबेस कनेक्ट हो गया भाई! ✅"))
    .catch(err => console.log("डेटाबेस एरर: ", err));

// 2. होम रूट - यह चेक करने के लिए कि सर्वर चालू है
app.get('/', (req, res) => {
    res.send("सोशल ऐप का सर्वर अब लाइव है! 🚀");
});

// 3. लॉगिन रूट - जो आपके ऐप से डेटा रिसीव करेगा
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    console.log("लॉगिन की कोशिश:", email);

    // अभी के लिए हम सबको सक्सेस भेज रहे हैं ताकि आपका ऐप चले
    if (email && password) {
        res.status(200).json({ 
            status: "success", 
            message: "लॉगिन सफल रहा! ✅",
            user: { email: email }
        });
    } else {
        res.status(400).json({ 
            status: "error", 
            message: "ईमेल या पासवर्ड गायब है!" 
        });
    }
});

// 4. पोर्ट सेटअप
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`सर्वर पोर्ट ${PORT} पर चालू है`);
});
