const Session = require('../models/sessionModel');
const { initializeTransaction } = require('../utils/paystack');

// Sample restaurant menu
const menuItems = [
  { id: 1, name: "Jollof Rice", price: 1500 },
  { id: 2, name: "Amala & Ewedu", price: 2000 },
  { id: 3, name: "Fried Rice & Chicken", price: 2500 },
  { id: 4, name: "Pounded Yam & Egusi", price: 2300 },
  { id: 5, name: "Pepper Soup", price: 1800 },
];

// Start Chatbot
const startChatbot = (req, res) => {
  res.json({
    message: `
👋 Welcome to Damoz Restaurant Chatbot!

Select:
1️⃣ - Place an Order
9️⃣9️⃣ - Checkout Order
9️⃣8️⃣ - See Order History
9️⃣7️⃣ - See Current Order
0️⃣ - Cancel Order
`.trim()
  });
};

// Handle User Input
const handleUserInput = async (req, res) => {
  const { deviceId, userInput } = req.body;

  let session = await Session.findOne({ deviceId });

  if (!session) {
    session = await Session.create({
      deviceId,
      currentOrder: [],
      orderHistory: [],
      isSelectingFood: false
    });
  }

  // 👉 Step 1: If selecting food mode
  if (session.isSelectingFood) {
    if (userInput === "99") {
      if (session.currentOrder.length > 0) {
        const totalAmount = session.currentOrder.reduce((sum, item) => sum + item.price, 0);
        const email = `${deviceId}@test.com`;

        try {
          const payment = await initializeTransaction({
            email,
            amount: totalAmount,
            metadata: {
              deviceId,
              items: session.currentOrder.map(item => item.name),
            },
          });

          session.orderHistory.push([...session.currentOrder]);
          session.currentOrder = [];
          session.isSelectingFood = false;
          await session.save();

          return res.json({
            message: `✅ Order placed!\n\nTotal Amount: ₦${totalAmount}\n\n[Click Here to Pay](${payment.authorization_url})`
          });
        } catch (error) {
          console.error('❌ Paystack Error:', error.response?.data || error.message);
          return res.json({ message: "❗ Payment initiation failed. Please try again later." });
        }
      } else {
        session.isSelectingFood = false;
        await session.save();
        return res.json({ message: "❗ No active order. Please add items first." });
      }
    } else {
      // Treat input as selecting a food item
      const selectedItem = menuItems.find(item => item.id === parseInt(userInput));
      if (selectedItem) {
        session.currentOrder.push(selectedItem);
        await session.save();
        return res.json({
          message: `✅ ${selectedItem.name} added to your order!\n\nType 99 to checkout, or select more items.`
        });
      } else {
        return res.json({
          message: "❓ Invalid item number. Please select from the menu."
        });
      }
    }
  }

  // 👉 Step 2: If NOT selecting food (normal chatbot command mode)
  switch (userInput) {
    case "1":
      session.isSelectingFood = true;
      await session.save();
      return res.json({
        message: "🍽️ Menu:\n" + menuItems.map(item => `${item.id}. ${item.name} - ₦${item.price}`).join('\n') + "\n\nSelect the item number to add to your order."
      });

    case "98":
      if (session.orderHistory.length > 0) {
        return res.json({
          message: "🧾 Order History:\n" + session.orderHistory.map((order, idx) => `Order ${idx + 1}: ${order.map(i => i.name).join(', ')}`).join('\n')
        });
      } else {
        return res.json({ message: "📭 No previous orders found." });
      }

    case "97":
      if (session.currentOrder.length > 0) {
        return res.json({
          message: "🛒 Current Order:\n" + session.currentOrder.map(i => i.name).join(', ')
        });
      } else {
        return res.json({ message: "🛒 No active items in your order." });
      }

    case "0":
      if (session.currentOrder.length > 0) {
        session.currentOrder = [];
        session.isSelectingFood = false;
        await session.save();
        return res.json({ message: "🚫 Order canceled successfully." });
      } else {
        session.isSelectingFood = false;
        await session.save();
        return res.json({ message: "🚫 No active order to cancel." });
      }

    default:
      return res.json({
        message: "❓ Invalid option. Please select 1, 99, 98, 97, 0."
      });
  }
};

module.exports = { startChatbot, handleUserInput };
