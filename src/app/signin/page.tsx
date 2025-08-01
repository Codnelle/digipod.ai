'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Image from 'next/image';
console.log('Firebase config (signin):', auth.app.options);

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const router = useRouter();

  // Check if user is already signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('onAuthStateChanged (signin) fired. User:', user);
      if (user) {
        // User is already signed in, redirect to dashboard
        router.push('/dashboard');
      } else {
        // User is not signed in, show signin form
        setAuthChecking(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking authentication
  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-gray-900 shadow-xl rounded-xl p-8 w-full max-w-md border border-blue-900">
        <div className="flex justify-center mb-6">
          <Image src="/digilogo.png" alt="Digipod Logo" width={120} height={40} />
        </div>
        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          <input
            type="email"
            className="border px-4 py-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-800 text-white placeholder-gray-400 border-gray-700"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="border px-4 py-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-800 text-white placeholder-gray-400 border-gray-700"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 transition text-white px-6 py-3 rounded-lg font-semibold shadow-sm disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="text-center text-sm text-gray-400 mt-4">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="text-blue-400 hover:underline font-semibold">Sign up</a>
        </div>
      </div>
    </div>
  );
} 