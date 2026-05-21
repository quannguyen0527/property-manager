const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { clerkMiddleware, getAuth } = require('@clerk/express')
const pool = require('./db')

const app = express()
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running' })
})

// DB test route
app.get('/api/db-test', async (req, res) => {
  const result = await pool.query('SELECT NOW()')
  res.json(result.rows)
})

// Houses route — only return current user's houses
app.get('/api/houses', async (req, res) => {
  const { userId } = getAuth(req)
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })
  const result = await pool.query('SELECT * FROM houses WHERE user_id = $1', [userId])
  res.json(result.rows)
})

app.listen(3000, () => console.log('Server running on port 3000'))