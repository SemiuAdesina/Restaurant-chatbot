const axios = require('axios');

const initializeTransaction = async ({ email, amount, metadata }) => {
  const response = await axios.post('https://api.paystack.co/transaction/initialize',
    {
      email,
      amount: amount * 100, // Paystack expects amount in kobo
      metadata
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.data; // Return only data part (authorization_url etc)
};

module.exports = { initializeTransaction };
