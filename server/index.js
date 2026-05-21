const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running' })
})

app.listen(3000, () => console.log('Server running on port 3000'))

const pool = require('./db')

app.get('/api/db-test', async (req, res) => {
  const result = await pool.query('SELECT NOW()')
  res.json(result.rows)
})