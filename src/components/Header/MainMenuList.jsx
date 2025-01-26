import { Badge, Box, Flex, Image, Text, HStack } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from 'react-router-dom';
import { openDrawer } from "../../features/Auth/drawerSlice";

const MainMenuList = () => {
  const location = useLocation();
  const handleClick = () => {
    // Handle click if needed
  };

  
  const items = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <Flex
      alignItems="center"
      gap={{base: "20px", md: "40px"}}
      fontSize="14px"
      fontWeight="500"
      letterSpacing="0.04em"
      textTransform="uppercase"
    >
      <HStack 
        spacing={{base: '10px', md: '15px'}}
        alignItems="center"
        justifyContent="center"
      >
        <NavLink to="/" end>
          {({ isActive }) => (
            <Box
              p={{base: "10px 30px", md: "14px 46px"}}
              bg={isActive ? '#FFFFFF' : 'transparent'}
              color={isActive ? '#7D31EA' : 'rgba(255, 255, 255, 0.65)'}
              borderRadius="50px"
              fontSize={{base: "14px", md: "16px"}}
              transition="all 0.3s ease"
              _hover={{
                bg: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.8)'
              }}
              onClick={handleClick}
            >
              Home
            </Box>
          )}
        </NavLink>

        <NavLink to="/products">
          {({ isActive }) => (
            <Box
              p={{base: "10px 30px", md: "14px 46px"}}
              bg={isActive ? '#FFFFFF' : 'transparent'}
              color={isActive ? '#7D31EA' : 'rgba(255, 255, 255, 0.65)'}
              borderRadius="50px"
              fontSize={{base: "14px", md: "16px"}}
              transition="all 0.3s ease"
              _hover={{
                bg: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.8)'
              }}
              onClick={handleClick}
            >
              Products
            </Box>
          )}
        </NavLink>

        <NavLink to="/contact">
          {({ isActive }) => (
            <Box
              p={{base: "10px 30px", md: "14px 46px"}}
              bg={isActive ? '#FFFFFF' : 'transparent'}
              color={isActive ? '#7D31EA' : 'rgba(255, 255, 255, 0.65)'}
              borderRadius="50px"
              fontSize={{base: "14px", md: "16px"}}
              transition="all 0.3s ease"
              _hover={{
                bg: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.8)'
              }}
              onClick={handleClick}
            >
              Contact
            </Box>
          )}
        </NavLink>
      </HStack>

      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          gap="10px"
          cursor="pointer"
          onClick={() => dispatch(openDrawer())}
        >
          <Box position="relative">
            <Image
              src="/cart-icon.svg"
              alt="cart"
              w="24px"
              h="24px"
              cursor="pointer"
            />
            <Badge
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="absolute"
              top="-8px"
              right="-8px"
              w="18px"
              h="18px"
              bg="#DD490A"
              color="white"
              borderRadius="full"
            >
              {items.length}
            </Badge>
          </Box>
          <Text color="white">Cart</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default MainMenuList;
