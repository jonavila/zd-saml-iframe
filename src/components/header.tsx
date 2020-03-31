import { Box, Button, Flex, Link, Text } from '@chakra-ui/core';
import { Link as ReachLink } from '@reach/router';
import React, { FC, useState } from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { useAuth0 } from '../react-auth0-spa';

const MenuItems: FC = (props) => {
  const { children } = props;
  return (
    <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
      {children}
    </Text>
  );
};

export const Header: FC = (props) => {
  const [show, setShow] = useState(false);
  const { logout } = useAuth0();
  const handleToggle = () => setShow(!show);

  const logoutWithRedirect = () =>
    logout({
      returnTo: `${window.location.origin}/login`,
    });

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="blackAlpha.800"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Link href="/">
          <Box as={Logo} height={8} width="auto" fill="none" />
        </Link>
      </Flex>

      <Box display={{ sm: 'block', md: 'none' }} onClick={handleToggle}>
        <svg fill="white" width="12px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'flex' }}
        width={{ sm: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
      >
        {/*
        // @ts-ignore */}
        <Link as={ReachLink} to="/home">
          Home
        </Link>
      </Box>

      <Box display={{ sm: show ? 'block' : 'none', md: 'block' }} mt={{ base: 4, md: 0 }}>
        <Button bg="transparent" border="1px" onClick={logoutWithRedirect}>
          Log out
        </Button>
      </Box>
    </Flex>
  );
};
