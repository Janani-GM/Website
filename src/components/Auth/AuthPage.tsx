import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <LoginForm onToggle={() => setIsLogin(false)} />
  ) : (
    <SignupForm onToggle={() => setIsLogin(true)} />
  );
}
