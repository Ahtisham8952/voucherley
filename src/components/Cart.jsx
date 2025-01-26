import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Image,
  Box,
  useToast,
  Flex,
  Divider
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { closeDrawer } from '../features/Auth/drawerSlice';
import { remove, clearCart } from '../features/Auth/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const isOpen = useSelector((state) => state.cartDrawer.isOpen); 
  const items = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleClose = () => {
    dispatch(closeDrawer());
  };

  const handleRemoveItem = (id) => {
    dispatch(remove(id));
    toast({
      title: "Item Removed",
      description: "Item has been removed from cart",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  const handleProceedToContact = () => {
    if (items.length > 0) {
      // Get all exam names and join them with comma
      const examNames = items.map(item => item.title).join(', ');
      dispatch(closeDrawer());
      navigate('/contact', { 
        state: { examName: examNames },
        replace: true  
      });
      dispatch(clearCart());
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={handleClose} size="md">
      <DrawerOverlay />
      <DrawerContent bg="#272937">
        <DrawerCloseButton color="white" />
        <DrawerHeader color="white">Your Shopping Cart</DrawerHeader>
        <DrawerBody>
          <VStack spacing={4} align="stretch">
            {items.length === 0 ? (
              <Box display="flex" alignItems="center" justifyContent="center" minH="100%">
                <Text color="white" fontSize="2xl" fontWeight="bold">
                  Your cart is empty
                </Text>
              </Box>
            ) : (
              items.map((item) => (
                <Box key={item.id} p={4} bg="gray.700" borderRadius="md" shadow="md">
                  <Flex gap="20px" alignItems={"center"} flexDirection={{base:'column',sm:'row'}}>
                    <Image 
                      src={item.image} 
                      boxSize="100px" 
                      objectFit="cover" 
                      borderRadius="md" 
                    />
                    <VStack align="start" flex="1">
                      <Text color="white" fontSize="lg" fontWeight="bold">{item.title}</Text>
                      <Text color="gray.300">${item.price}</Text>
                      <Text color="gray.300">Quantity: {item.quantity || 1}</Text>
                    </VStack>
                    
                    <Button
                      onClick={() => handleRemoveItem(item.id)}
                      colorScheme='#7D31EA'
                      bg={"#7D31EA"}
                      color="white"
                      borderRadius="md"
                      shadow="md"
                      py={6}
                      px={8}
                      fontSize="lg"
                      fontWeight="bold"
                    >
                      Remove
                    </Button>
                  </Flex>
                  <Divider mt={4} />
                </Box>
              ))
            )}
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          {items.length > 0 && (
            <Box w="100%">
              <Flex justifyContent="space-between">
                <Text color="white" fontSize="xl" fontWeight="bold">
                  Total:
                </Text>
                <Text color="white" fontSize="xl" fontWeight="bold">
                  ${calculateTotal()}
                </Text>
              </Flex>
              <Button
                mt="20px"
                colorScheme='#7D31EA'
                bg={"#7D31EA"}
                color="white"
                borderRadius="md"
                shadow="md"
                py={6}
                px={8}
                fontSize="lg"
                fontWeight="bold"
                w="100%"
                onClick={handleProceedToContact}
              >
                Proceed to Contact
              </Button>
            </Box>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
