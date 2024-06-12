import React, { useEffect } from 'react';
import { UnAuthorised } from './UnAuthorised';
import { MainLayoutProps } from '../../Api/Interface/layout.interface';
import { useAppDispatch } from '../../Store/hooks';
import { useGetUserQuery } from '../../Api/attoDeskApi';
import { setEnableAuth } from '../../Store/Auth/AuthSlice';

/**
 * Main layout which will load the content with the children
 * @param children - Component
 */
const MainLayout = ({ children }: MainLayoutProps) => {
  const dispatch = useAppDispatch();
  const { data, isError } = useGetUserQuery();
  useEffect(() => {
    if (data?.code === 200) {
      dispatch(setEnableAuth());
    }
  }, [data?.code, dispatch]);
  return (
    <>
    {children}
      {/* {!data && <>{children}</>}
      {!data && <UnAuthorised data-testid="unautorised-fallback" />} */}
    </>
  );
};

export default React.memo(MainLayout);
