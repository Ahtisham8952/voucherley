import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Text,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { useDisplayUser } from "../../context/UserContextProvider";
import { useSelector, useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { clearCart } from "../../features/Auth/cartSlice";


const CheckOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector((state) => state.cart);
    const total = useSelector((state) =>  state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0));
    const { user } = useDisplayUser();

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        dispatch(clearCart()); // Clear the cart
        navigate('/contact', { replace: true }); // Use replace to avoid navigation issues
    };

    return (
        <Box w="100%" p="30px">
            <Text
                as={"span"}
                pb="10px"
                fontSize={{ base: "24px", md: "28px", lg: "36px" }}
                fontWeight={{ base: "600", md: "900" }}
                color="#FFFFFF"
            >
                Checkout
            </Text>

            <Flex w="100%" gap="30px" mt="30px" flexDirection={{base:'column',md:'row'}}>
                <Box bg="gray.700" p="20px" w={{base:'100%',md:'50%'}}>
                    <Heading as="h2" size="md" mb={4} color="#FFFFFF">
                        Billing Address
                    </Heading>
                    <VStack spacing={4}>
                        <FormControl id="fullName">
                            <FormLabel color="#FFFFFF">Full Name</FormLabel>
                            <FormLabel color="#FFFFFF">{user.fullName}</FormLabel>
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel color="#FFFFFF">Email</FormLabel>
                            <FormLabel color="#FFFFFF">{user.email}</FormLabel>
                        </FormControl>
                    </VStack>
                </Box>

                <Box bg="gray.700" p="20px" w={{base:'100%',md:'50%'}}>
                    <Heading as="h2" size="md" mb={4} color="#FFFFFF">
                        Order Summary
                    </Heading>
                    <VStack spacing={4} align="stretch">
                        {items.map((item) => (
                            <Flex key={item.id} justify="space-between">
                                <Text color="#FFFFFF">
                                    {item.title} x {item.quantity}
                                </Text>
                                <Text color="#FFFFFF">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </Text>
                            </Flex>
                        ))}
                        <Divider />
                        <Flex justify="space-between">
                            <Text fontWeight="bold" color="#FFFFFF">Total</Text>
                            <Text fontWeight="bold" color="#FFFFFF">${total.toFixed(2)}</Text>
                        </Flex>
                    </VStack>
                </Box>
            </Flex>

            <Button
                mt={8}
                colorScheme="purple"
                size="lg"
                w="full"
                onClick={handlePlaceOrder}
                bg="#7D31EA"
                _hover={{ bg: '#5111AE' }}
            >
                Proceed to Contact
            </Button>
        </Box>
    );
};

export default CheckOut;
