// src/hooks/useAuth.ts
"use client";
import { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};
