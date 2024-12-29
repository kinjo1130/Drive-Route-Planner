// src/components/auth/AuthButton.tsx
import { Button } from "@/components/ui/Button";
import { signInWithGoogle, auth } from "@/lib/firebase/client";
import { signOut } from "firebase/auth";

export const AuthButton = () => {
  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={auth.currentUser ? handleSignOut : handleSignIn}
    >
      {auth.currentUser ? 'ログアウト' : 'Googleでログイン'}
    </Button>
  );
};