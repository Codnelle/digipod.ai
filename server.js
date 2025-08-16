const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fetch = require('node-fetch'); // Using regular import without node: prefix

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
    
    // Initialize email monitoring service after server starts
    console.log('Initializing email monitoring service...');
    setTimeout(() => {
      fetch('http://localhost:3000/api/email-monitor/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log('Email monitoring service initialized:', data);
      })
      .catch(error => {
        console.error('Error initializing email monitoring service:', error);
      });
    }, 3000); // Wait 3 seconds for server to fully initialize
  });

  // Handle graceful shutdown
  const handleShutdown = () => {
    console.log('Server shutting down...');
    process.exit(0);
  };

  // Listen for termination signals
  process.on('SIGINT', handleShutdown);
  process.on('SIGTERM', handleShutdown);
});