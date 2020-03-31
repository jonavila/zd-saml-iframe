import { Flex } from '@chakra-ui/core/';
import { RouteComponentProps } from '@reach/router';
import React, { FC, Fragment } from 'react';
import { Dashboard } from '../components/dashboard';
import { Header } from '../components/header';

export const Home: FC<RouteComponentProps> = () => {

  return (
    <Fragment>
      <Header />
      <Flex direction="column" flex={1}>
        <Dashboard id="5e8227ddffd36615bf9b8136" mode="embedded" />
      </Flex>
    </Fragment>
  );
};
