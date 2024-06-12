import React, { useMemo } from 'react';
import Auth from '.';
import { useSelector } from 'react-redux';
import { MainLayoutProps } from '../../Api/Interface/layout.interface';
import { useGetUserQuery } from '../../Api/attoDeskApi';
import { selectEnableAuth } from '../../Store/Auth/AuthSelector';
import { Loader } from '../../Components/Loader';

const LoginProvider = ({ children }: MainLayoutProps) => {
  const { isLoading } = useGetUserQuery();
  const authEnable =  useSelector(selectEnableAuth)
  
  const renderComponent = useMemo(() => {
    if (isLoading) {
      return <Loader />;
    }
    return authEnable ? children : <Auth />;
  }, [isLoading, authEnable, children]);
  return <>{renderComponent}</>;
};

export default React.memo(LoginProvider);
