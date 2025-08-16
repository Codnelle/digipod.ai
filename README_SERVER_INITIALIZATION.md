# Server Initialization for Email Monitoring

## Overview

This document explains the implementation of automatic initialization for the email monitoring background service when the Next.js server starts.

## Implementation Details

Two approaches have been implemented to ensure the email monitoring service starts automatically:

### 1. Custom Server Implementation

A custom Next.js server has been created in `server.js` that:

- Initializes the Next.js application
- Makes an API call to `/api/email-monitor/init` after the server starts
- Uses a timeout to ensure the server is fully initialized before making the API call
- Handles graceful shutdown when the server stops

### 2. Next.js Middleware Implementation

A middleware file (`src/middleware.ts`) has been created that:

- Runs on all non-API and non-static paths
- Directly initializes the email monitoring service on the first request
- Uses a flag to ensure the service is only initialized once
- Avoids circular initialization by checking the request path

## Usage

The package.json scripts have been updated to use the custom server:

```json
"scripts": {
  "dev": "node server.js",
  "build": "next build",
  "start": "NODE_ENV=production node server.js",
  "lint": "eslint src/"
},
```

## Benefits

- **Automatic Initialization**: Email monitoring service starts automatically with the server
- **Redundancy**: Two methods ensure the service starts even if one approach fails
- **Reliability**: The custom server uses the existing API endpoint for initialization
- **Simplicity**: No need for complex module imports or dynamic loading

## Testing

To verify the email monitoring service is running:

1. Start the server with `npm run dev`
2. Check the console logs for "Email monitoring service initialized successfully"
3. Access the email monitoring dashboard to confirm it's operational

## Troubleshooting

If the email monitoring service is not starting:

1. Check the console logs for any initialization errors
2. Verify that the middleware is running by checking for the log message
3. Check if the API endpoint `/api/email-monitor/init` is working correctly
4. Try manually initializing the service by making a POST request to `/api/email-monitor/init`
5. Ensure node-fetch is properly installed for the custom server approach