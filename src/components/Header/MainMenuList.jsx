import { Badge, Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import UserMenu from "./UserMenu";
import { useDisplayUser } from "../../context/UserContextProvider";
import { openDrawer } from "../../features/Auth/drawerSlice";

const MainMenuList = ({ onMenuLinkClick }) => {
  const location = useLocation();
  const handleClick = () => {
    if (onMenuLinkClick) {
      onMenuLinkClick();
    }
  };
  const { user, setUser } = useDisplayUser();
  const items = useSelector((state) => state.cart);

  const linkStyles = (path) => ({
    textDecoration: "none",
    opacity: location.pathname === path ? "1" : "80%",
    color: location.pathname === path ? "#DD490A" : "#F0FCFB", // Change colors as needed
  });
  const dispatch = useDispatch();

  return (
    <Flex
      minWidth="max-content"
      justifyContent="space-between"
      alignItems="center"
      flexDirection={{ base: "column", lg: "row" }}
      gap={{ base: "25px", lg: "none" }}
      maxW={{ base: "100%", lg: "390px", xl: "531px" }}
      w="100%"
      ml="auto"
      color="#F0FCFB"
      fontSize={{ base: "18px", lg: "14px", xl: "18px" }}
      lineHeight="27px"
      fontWeight="600"
      letterSpacing="0.04em"
      textTransform="uppercase"
    >
      <Link onClick={handleClick} to="/" style={linkStyles("/")}>
       Home
      </Link> 
      <Link onClick={handleClick} to="/products" style={linkStyles("/products")}>
        Products
      </Link>
      {/* <Link  onClick={handleClick} to="/login" style={linkStyles("/login")}>
        Login
      </Link>
      <Link onClick={handleClick} to="/signup" style={linkStyles("/signup")}>
        Signup
      </Link> */}
      {/* <Flex alignItems={"center"} gap="5px">
        <Image w="25px" h="25px" borderRadius={"50%"} src={user.avatar || '/profileicon.svg'} />
       
        <Link onClick={handleClick} to="/profile" style={linkStyles("/profile")}>
        {user ? user.fullName : 'Profile'}
        </Link>

      </Flex> */}
      <Link onClick={handleClick} to="/contact" style={linkStyles("/contact")}>
        Contact 
      </Link> 
      

      <Flex
        minWidth="max-content"
        justifyContent="flex-end"
        alignItems="center"
        minH="64px"
        gap="42px"
      >
        <Link
          onClick={() => dispatch(openDrawer())}
          display="flex"
          gap="16px"
          color="white"
          bg="transparent"
          fontSize="14px"
        // Assuming you want to style this link similarly
        >
          <Box display={"flex"} alignItems={"center"} gap="10px">
            <Box position="relative">
              <Image src="/cart-icon.svg" alt="icon" />
              <Badge
                borderRadius="50%"
                height="21px"
                width="21px"
                bg="#DD490A"
                border="1px solid #B13906"
                color="#fff"
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="absolute"
                top="-8px"
                right="-8px"
              >
                {items.length}
              </Badge>
            </Box>
            <Link >
        Cart
      </Link>
          </Box>
        </Link>
      </Flex>
    </Flex>
  );
};

export default MainMenuList;
