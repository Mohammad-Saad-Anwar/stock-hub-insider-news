
import App from './app';
import path from 'path';
import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

// Convert ESM-style __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = new App();
const expressApp = app.app;

// Path to built client files
const clientBuildPath = path.resolve(__dirname, '../../dist/client');
const serverEntryPath = path.resolve(__dirname, '../../dist/server/entry-server.js');

// Server-side rendering middleware
expressApp.get('*', async (req, res, next) => {
  // Skip API routes
  if (req.url.startsWith('/api')) {
    return next();
  }

  try {
    // Load the server entry point
    const { default: AppComponent } = await import(serverEntryPath);

    // Render the app to HTML
    const appHtml = ReactDOMServer.renderToString(
      React.createElement(
        StaticRouter,
        { location: req.url },
        React.createElement(AppComponent)
      )
    );

    // Read the index.html template
    const indexHtml = fs.readFileSync(path.resolve(clientBuildPath, 'index.html'), 'utf-8');

    // Inject the rendered app HTML into the template
    const html = indexHtml.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    // Send the complete HTML to the client
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('Error during SSR:', error);
    // Fallback to client-side rendering
    next();
  }
});

// Serve static files
expressApp.use(express.static(clientBuildPath));

app.listen();
