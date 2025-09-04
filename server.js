// server.js - Production JSON Server setup
const jsonServer = require('json-server')
const cors = require('cors')
const path = require('path')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults({
  noCors: false
})

// Enable CORS for all origins (production ready)
server.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))

// Use default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes for authentication
server.use(jsonServer.bodyParser)

// Custom login endpoint
server.post('/auth/login', (req, res) => {
  const { username, password } = req.body
  const users = router.db.get('users').value()
  
  const user = users.find(u => u.username === username && u.password === password)
  
  if (user) {
    // Generate mock JWT token
    const token = Buffer.from(JSON.stringify({
      userId: user.id,
      role: user.role,
      timestamp: Date.now()
    })).toString('base64')
    
    const { password: _, ...userWithoutPassword } = user
    
    res.json({
      success: true,
      user: userWithoutPassword,
      token: token
    })
  } else {
    res.status(401).json({
      success: false,
      message: 'Username atau password salah'
    })
  }
})

// Custom token validation endpoint
server.post('/auth/validate', (req, res) => {
  const { token } = req.body
  
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString())
    
    // Check if token is expired (24 hours)
    const isExpired = Date.now() - decoded.timestamp > 24 * 60 * 60 * 1000
    
    if (isExpired) {
      return res.status(401).json({ valid: false, message: 'Token expired' })
    }
    
    const users = router.db.get('users').value()
    const user = users.find(u => u.id === decoded.userId)
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user
      res.json({
        valid: true,
        user: userWithoutPassword
      })
    } else {
      res.status(404).json({ valid: false, message: 'User not found' })
    }
  } catch (error) {
    res.status(401).json({ valid: false, message: 'Invalid token' })
  }
})

// Health check endpoint
server.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// Use router for all other requests
server.use('/api', router)
server.use(router)

// Start server
const PORT = process.env.PORT || 3001
const HOST = process.env.HOST || '0.0.0.0'

server.listen(PORT, HOST, () => {
  console.log(`🚀 JSON Server is running on http://${HOST}:${PORT}`)
  console.log(`📊 Database: ${path.join(__dirname, 'db.json')}`)
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`)
})