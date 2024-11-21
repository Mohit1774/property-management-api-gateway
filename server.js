const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 5001;

// Proxy /api/properties requests to the property-management-service
app.use('/api/properties', createProxyMiddleware({
  target: 'http://property-management-service:5000/api/properties',
  changeOrigin: true,
  logLevel: 'debug'  // Optional: adds logging to debug the proxy
}));

// Proxy /api/users requests to the user-management-service
app.use('/api/users', createProxyMiddleware({
  target: 'http://user-management-service:3000/api/users',
  changeOrigin: true,
  logLevel: 'debug'  // Optional: adds logging to debug the proxy
}));

// Proxy /api/agents requests to the agent-management-service
app.use('/api/agents', createProxyMiddleware({
  target: 'http://agent-management-service:3001/api/agents',
  changeOrigin: true,
  logLevel: 'debug'  // Optional: adds logging to debug the proxy
}));

app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
