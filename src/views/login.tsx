import { Box, Button, Heading, Stack } from '@chakra-ui/core';
import { RouteComponentProps } from '@reach/router';
import React, { FC } from 'react';
import { ReactComponent as Logo } from '../assets/logo-charcoal.svg';
import { useAuth0 } from '../react-auth0-spa';

export const Login: FC<RouteComponentProps> = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Stack align="center" flex={1} justify="center" spacing={8}>
      <Box
        as={Logo}
        height={20}
        // @ts-ignore
        viewBox="21.899999618530273 197.79998779296875 599.9999389648438 246.5999755859375"
        width="auto"
      />
      <Heading as="h3" size="lg">
        Dashboard Embed Example
      </Heading>
      <Button
        variantColor="blue"
        onClick={() => {
          loginWithRedirect({});
        }}
      >
        Log-In
      </Button>
    </Stack>
  );
};
