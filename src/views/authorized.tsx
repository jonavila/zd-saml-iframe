import { Flex, Spinner } from '@chakra-ui/core';
import { Redirect, RouteComponentProps } from '@reach/router';
import React, { FC } from 'react';
import { useAuth0 } from '../react-auth0-spa';

export const Authorized: FC<RouteComponentProps> = () => {
  const { isAuthenticated, loading } = useAuth0();

  if (!isAuthenticated || loading) {
    return (
      <Flex align="center" flex={1} justify="center">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Flex>
    );
  }

  return <Redirect noThrow to="/home" />
};
