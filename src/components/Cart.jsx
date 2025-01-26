import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Box, Button, Image, Text, VStack, HStack, Divider, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { closeDrawer } from '../features/Auth/drawerSlice';
import { remove, clearCart } from '../features/Auth/cartSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isOpen = useSelector((state) => state.cartDrawer.isOpen); 
    const items = useSelector((state) => state.cart);
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const removeFromCart = (id) => {
        dispatch(remove(id));
    };

    const handleProceedToContact = () => {
        dispatch(closeDrawer());
        dispatch(clearCart());
        navigate('/contact');
    };

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={() => dispatch(closeDrawer())}>
            <DrawerOverlay />
            <DrawerContent maxW={"800px"} w="100%" bg={'#272937'}>
                <DrawerCloseButton color={"white"} />
                <DrawerHeader color="white">Your Shopping Cart</DrawerHeader>

                <DrawerBody>
                    {items.length === 0 ? (
                        <Box display="flex" alignItems="center" justifyContent="center" minH="100%">
                            <Text color="white" fontSize="2xl" fontWeight="bold">
                                Your cart is empty
                            </Text>
                        </Box>
                    ) : (
                        <VStack spacing={4} align="stretch">
                            {items.map((item) => (
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
                                            <Text color="gray.300">Quantity: {item.quantity}</Text>
                                        </VStack>
                                        
                                        <Button
                                            onClick={() => removeFromCart(item.id)}
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
                            ))}
                        </VStack>
                    )}
                </DrawerBody>

                <DrawerFooter>
                    {items.length > 0 && (
                        <Box w="100%">
                            <Flex justifyContent="space-between">
                                <Text color="white" fontSize="xl" fontWeight="bold">
                                    Total:
                                </Text>
                                <Text color="white" fontSize="xl" fontWeight="bold">
                                    ${total}
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
