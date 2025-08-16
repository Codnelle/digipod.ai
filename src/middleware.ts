import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Initialize background services when server starts
let servicesInitialized = false;

export async function middleware(request: NextRequest) {
  // Only initialize on non-API routes to avoid circular initialization
  if (!servicesInitialized && !request.nextUrl.pathname.startsWith('/api')) {
    try {
      console.log('Initializing email monitoring service from middleware...');
      // Note: Background services are now initialized in API routes instead
      servicesInitialized = true;
      console.log('Email monitoring service initialization handled by API routes');
    } catch (error) {
      console.error('Error in middleware:', error);
    }
  }
  
  // Continue with the request
  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  // Run on all paths except static assets and API routes
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};