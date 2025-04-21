# 🍽️ Damoz Restaurant Chatbot

An AI-powered restaurant chatbot that helps customers place orders, checkout, view order history, and make payments via Paystack — all in a smooth, chat-like interface!

---

## ✨ Features

- Chat interface for ordering food
- Menu browsing and item selection
- View current order and order history
- Cancel current order anytime
- Checkout and Paystack test payment integration
- Session tracking by device ID (no authentication required)
- MongoDB database for storing sessions and orders
- Animated, responsive frontend built with React + TailwindCSS

---

## 🚀 Tech Stack

| Frontend | Backend | Database | Payment |
|----------|---------|----------|---------|
| React.js (Vite) | Node.js + Express | MongoDB (Mongoose) | Paystack (Test Environment) |
| TailwindCSS | CORS |  |  |

---

## 🛠️ Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/restaurant-chatbot.git
cd restaurant-chatbot


Backend Setup (/backend)
bash
Copy
Edit
cd backend
npm install
Create a .env file in backend/ and add:

bash
Copy
Edit
PORT=5001
MONGO_URI=your_mongodb_connection_string
PAYSTACK_SECRET_KEY=your_paystack_secret_key
Start the backend server:

bash
Copy
Edit
npm run dev
✅ Server running at http://localhost:5001

3. Frontend Setup (/frontend)
bash
Copy
Edit
cd frontend
npm install
Create a .env file in frontend/ and add:

bash
Copy
Edit
VITE_API_BASE_URL=http://localhost:5001/api/chatbot
Start the frontend:

bash
Copy
Edit
npm run dev
✅ Frontend running at http://localhost:5173 (or whichever port Vite gives)

💳 Paystack Test Payment
Use the following test card to simulate payments:

yaml
Copy
Edit
Card Number: 4242 4242 4242 4242
Expiry Date: Any future date
CVV: 123
PIN: 1111
OTP: 123456
✅ After payment, you will see "Payment Successful" notice back on the chatbot.

📸 Screenshots

Landing Page	Menu Display	Checkout Payment
(📸 Add screenshots if you want — Optional)

📂 Folder Structure
arduino
Copy
Edit
restaurant-chatbot/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── assets/
│   └── vite.config.js
└── README.md



---

# 📢 Important Notes:

✅ Replace `your-username` with your GitHub username.  
✅ Replace `your_mongodb_connection_string` and `your_paystack_secret_key` when setting up `.env`.  
✅ If you want you can add screenshots too (optional) under a `/screenshots` folder.

---

# 📋 **SUMMARY:**

- You will have a FULL professional project README
- Looks good to recruiters and companies
- Makes your project super easy for others to set up and run!

---

# ✋ After this:

Reply me:
> ✅ README finished bro, what next? 🚀  
or  
> 🛑 I want you to also help write GitHub description, topics and nice commit message.

I'm ready to help you **polish it to Upwork, Freelancer, GitHub job level**! 🚀  
Waiting for your signal! 🎯
