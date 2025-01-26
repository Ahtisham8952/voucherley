import React, { useState } from 'react';
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useToast,
  Select
} from '@chakra-ui/react';

const Contact = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    examName: '',
    address: '',
    examDate: '',
    examTime: '',
    country: '',
    couponCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Form Submitted",
      description: "We'll process your exam registration soon!",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Box bg="rgba(49, 17, 100, 0.75)" minH="100vh" py={20}>
      <Container maxW="container.xl">
        <Box
          w="100%"
          bg="#FFFFFFED"
          p={8}
          borderRadius="16px"
          boxShadow="xl"
        >
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="#7D31EA"
            textAlign="center"
            mb={6}
          >
            Exam Registration Form
          </Text>

          <form onSubmit={handleSubmit}>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel color="#333">First Name</FormLabel>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    borderColor="#7D31EA"
                    _hover={{ borderColor: '#5111AE' }}
                    _focus={{ borderColor: '#5111AE', boxShadow: '0 0 0 1px #5111AE' }}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isRequired>
                  <FormLabel color="#333">Last Name</FormLabel>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    borderColor="#7D31EA"
                    _hover={{ borderColor: '#5111AE' }}
                    _focus={{ borderColor: '#5111AE', boxShadow: '0 0 0 1px #5111AE' }}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isRequired>
                  <FormLabel color="#333">Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    borderColor="#7D31EA"
                    _hover={{ borderColor: '#5111AE' }}
                    _focus={{ borderColor: '#5111AE', boxShadow: '0 0 0 1px #5111AE' }}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isRequired>
                  <FormLabel color="#333">Exam Name</FormLabel>
                  <Select
                    name="examName"
                    value={formData.examName}
                    onChange={handleChange}
                    placeholder="Select exam"
                    borderColor="#7D31EA"
                    _hover={{ borderColor: '#5111AE' }}
                    _focus={{ borderColor: '#5111AE', boxShadow: '0 0 0 1px #5111AE' }}
                  >
                    <option value="CompTIA Security+">CompTIA Security+ (SY0-601)</option>
                    <option value="CompTIA Network+">CompTIA Network+ (N10-008)</option>
                    <option value="CompTIA PenTest+">CompTIA PenTest+ (PT0-002)</option>
                    <option value="CompTIA CySA+">CompTIA CySA+ (CS0-003)</option>
                    <option value="ISC2 CISSP">ISC2 CISSP</option>
                    <option value="ISC2 CCSP">ISC2 CCSP</option>
                    <option value="ISC2 SSCP">ISC2 SSCP</option>
                    <option value="ISC2 CC">ISC2 CC</option>
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 2 }}>
                <FormControl isRequired>
                  <FormLabel color="#333">Address</FormLabel>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your full address"
                    borderColor="#7D31EA"
                    _hover={{ borderColor: '#5111AE' }}
                    _focus={{ borderColor: '#5111AE', boxShadow: '0 0 0 1px #5111AE' }}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isRequired>
                  <FormLabel color="#333">Exam Date</FormLabel>
                  <Input
                    name="examDate"
                    type="date"
                    value={formData.examDate}
                    onChange={handleChange}
                    borderColor="#7D31EA"
                    _hover={{ borderColor: '#5111AE' }}
                    _focus={{ borderColor: '#5111AE', boxShadow: '0 0 0 1px #5111AE' }}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isRequired>
                  <FormLabel color="#333">Exam Time</FormLabel>
                  <Input
                    name="examTime"
                    type="time"
                    value={formData.examTime}
                    onChange={handleChange}
                    borderColor="#7D31EA"
                    _hover={{ borderColor: '#5111AE' }}
                    _focus={{ borderColor: '#5111AE', boxShadow: '0 0 0 1px #5111AE' }}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isRequired>
                  <FormLabel color="#333">Country</FormLabel>
                  <Select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Select country"
                    borderColor="#7D31EA"
                    _hover={{ borderColor: '#5111AE' }}
                    _focus={{ borderColor: '#5111AE', boxShadow: '0 0 0 1px #5111AE' }}
                  >
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="IN">India</option>
                    <option value="Other">Other</option>
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel color="#333">Coupon Code</FormLabel>
                  <Input
                    name="couponCode"
                    value={formData.couponCode}
                    onChange={handleChange}
                    placeholder="Enter coupon code (if any)"
                    borderColor="#7D31EA"
                    _hover={{ borderColor: '#5111AE' }}
                    _focus={{ borderColor: '#5111AE', boxShadow: '0 0 0 1px #5111AE' }}
                  />
                </FormControl>
              </GridItem>
            </Grid>

            <Button
              type="submit"
              mt={8}
              w="full"
              bg="#7D31EA"
              color="white"
              size="lg"
              _hover={{ bg: '#5111AE' }}
              _active={{ bg: '#5111AE' }}
            >
              Submit Registration
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
