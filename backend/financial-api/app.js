// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

// PostgreSQL client setup
const client = new Client({
  port: 5432,
  host: 'localhost',
  user: 'postgres',
  password: '0',
  database: 'fin',
});

let currentUserId = null;

// Connect to PostgreSQL
client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Connection error', err.stack));

// Export the client for use in other modules (if needed)
module.exports = client;

// Express app setup
const app = express();
app.use(bodyParser.json()); // Parse JSON request bodies

// Port for the Express app
const PORT = 5000;

// Sample routes for API
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});



app.get('/get-income', async (req, res) => {
  if (!currentUserId) {
      return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
      const query = `
          SELECT 
              t.transaction_id AS _id, 
              t.amount, 
              t.date, 
              c.name AS category, 
              t.description
          FROM transactions t
          JOIN categories c ON t.category_id = c.category_id
          WHERE t.user_id = $1 AND t.expense = 'no'
          ORDER BY t.date DESC;
      `;
      const result = await client.query(query, [currentUserId]);

      res.status(200).json(result.rows);
  } catch (error) {
      console.error('Error retrieving incomes:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

app.post('/add-income', async (req, res) => {
  if (!currentUserId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  // Validate the required fields
  const { amount, date, category, description } = req.body;

    if (!amount || !date || !category) {
      return res.status(400).json({ error: 'Amount, date, and category are required' });
    }


  try {
    
    // Fetch the category ID from the categories table
    const categoryQuery = 'SELECT category_id FROM categories WHERE name = $1';
    const categoryResult = await client.query(categoryQuery, [category]);

    if (categoryResult.rows.length === 0) {
    return res.status(400).json({ error: `Invalid category name  ${amount}, ${date}, ${category}, ${description}` });
    }

    const category_Id = categoryResult.rows[0].category_id;


    

    // Insert the new income transaction
    const query = `
      INSERT INTO transactions (user_id, amount, date, category_id, description)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING transaction_id, amount, date, category_id, description
    `;
    const result = await client.query(query, [currentUserId, amount, date, category_Id, description]);

    const newIncome = result.rows[0];

    res.status(201).json(newIncome);
  } catch (error) {
    console.error('Error adding income:', error);
    res.status(500).json({ message: 'server error' });
  }
});


app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
       
        const userCheck = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

     
        // const usernameCheck = await client.query('SELECT * FROM users WHERE username = $1', [username]);
        // if (usernameCheck.rows.length > 0) {
        //     return res.status(400).json({ error: 'Username is already taken' });
        // }

        const insertUser = await client.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id, username, email',
            [username, email, password] 
        );

        const newUser = insertUser.rows[0];

        
        res.status(201).json({
            message: 'User created successfully',
            user: {
                user_id: newUser.user_id,
                username: newUser.username,
                email: newUser.email,
            }
        });
    } catch (error) {
        console.error('Error during sign-up:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Check if user exists and validate password
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    currentUserId = result.rows[0].user_id;

    if (user.password !== password) { // Replace this with a hashed password comparison
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Redirect URL
    const appURL = 'http://158.101.230.135:3000'; // Replace with your app's actual URL

    res.status(200).json({ message: 'Login successful', redirect: appURL });
  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

//adding expenses endpoint
app.post('/add-expense', async (req, res) => {
    const { amount, date, category, description } = req.body;

    

    try {
      // Fetch the category ID from the categories table
      const categoryQuery = 'SELECT category_id FROM categories WHERE name = $1';
      const categoryResult = await client.query(categoryQuery, [category]);

      if (categoryResult.rows.length === 0) {
      return res.status(400).json({ error: `Invalid category name  ${amount}, ${date}, ${category}, ${description}` });
      }

      // Basic validation
      if (!amount || !date || !category || !description) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const category_Id = categoryResult.rows[0].category_id;
      const query = `
          INSERT INTO transactions (user_id, amount, date, category_id, description, expense)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING transaction_id, amount, date, category_id, description
      `;
      const result = await client.query(query, [currentUserId, amount, date, category_Id, description, "yes"]);

      const newExpense = result.rows[0];

      res.status(201).json(newExpense);
    } catch (error) {
        console.error(`Error adding expense in category ${category}:`, error);
        res.status(500).json({ message: `Server error in category ${category}` });
    }
});

// Fetch all expenses
app.get('/get-expense', async (req, res) => {
  try {
      const query = `
          SELECT transaction_id, amount, date, category_id, description, expense
          FROM transactions
          WHERE user_id = $1 AND expense = 'yes'
      `;
      const result = await client.query(query, [currentUserId]);

      const expenses = result.rows;

      res.status(200).json(expenses);
  } catch (error) {
      console.error('Error fetching expenses:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

// Delete an expense
app.delete('/delete-expense/:id', async (req, res) => {
  const transactionId = req.params.id;

  if (!currentUserId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // if (isNaN(transactionId)) {
  //   return res.status(400).json({ message: 'Invalid transaction ID' });
  // }

  try {
    const query = 'DELETE FROM transactions WHERE transaction_id = $1 AND user_id = $2 AND expense = $3 RETURNING *';
    const result = await client.query(query, [transactionId, currentUserId, 'yes']);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Expense not found or not authorized to delete' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// delete an income
app.delete('/delete-income/:id', async (req, res) => {
  const transactionId = req.params.id;

  if (!currentUserId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (isNaN(transactionId)) {
    return res.status(400).json({ message: 'Invalid transaction ID' });
  }

  try {
    const query = 'DELETE FROM transactions WHERE transaction_id = $1 AND user_id = $2 AND expense = $3 RETURNING *';
    const result = await client.query(query, [transactionId, currentUserId, 'no']);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Income not found or not authorized to delete' });
    }

    res.status(200).json({ message: 'Income deleted successfully' });
  } catch (error) {
    console.error('Error deleting income:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
