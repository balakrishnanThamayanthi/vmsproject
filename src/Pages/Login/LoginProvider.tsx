import React, { ReactNode } from 'react';
import Auth from '.'; // Ensure the correct path

interface LoginProviderProps {
  children?: ReactNode;
}

const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  return (
    <div>
      <Auth />
      {children}
    </div>
  );
};

export default React.memo(LoginProvider);
