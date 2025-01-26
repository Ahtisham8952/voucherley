import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useToast,
  Select,
  Spinner,
  Textarea
} from '@chakra-ui/react';

const Contact = () => {
  const location = useLocation();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useRef();
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

  // Set exam name from navigation state when component mounts
  useEffect(() => {
    if (location.state?.examName) {
      console.log('Setting exam name:', location.state.examName); // Debug log
      setFormData(prevData => ({
        ...prevData,
        examName: location.state.examName
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        reply_to: formData.email,
        to_name: "CertBills Support",
        message: `
Registration Details:

First Name: ${formData.firstName}
Last Name: ${formData.lastName}
Email: ${formData.email}
Exam Name: ${formData.examName}
Address: ${formData.address}
Exam Date: ${formData.examDate}
Exam Time: ${formData.examTime}
Country: ${formData.country}
Coupon Code: ${formData.couponCode || 'N/A'}
`
      };

      // Initialize EmailJS
      emailjs.init("t4SLSJoO9l00n2g0t");

      // Send email using EmailJS
      const result = await emailjs.send(
        'service_z61jsz5',
        'template_mos5kld',
        templateParams
      );

      if (result.text === 'OK') {
        // Show success message based on coupon code
        if (formData.couponCode === 'Examdiscount2025') {
          toast({
            title: "Registration Submitted Successfully!",
            description: "Thanks! You will get 25% discount on exam fee according to your region. we will get back to you shortly",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        } else {
          toast({
            title: "Registration Submitted",
            description: "Thanks for the submission, we will get back to you shortly.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }

        // Clear form
        setFormData({
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
      } else {
        throw new Error('Email sending failed');
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your registration. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
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

          <form onSubmit={handleSubmit} ref={form}>
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
                  <FormLabel color="#333">Selected Exams</FormLabel>
                  <Textarea
                    name="examName"
                    value={formData.examName}
                    onChange={handleChange}
                    placeholder="Your selected exams will appear here"
                    borderColor="#7D31EA"
                    _hover={{ borderColor: '#5111AE' }}
                    _focus={{ borderColor: '#5111AE', boxShadow: '0 0 0 1px #5111AE' }}
                    readOnly
                    minHeight="80px"
                  />
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
                    placeholder="Enter EXAMDISCOUNT for 25% off"
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
              isLoading={isLoading}
              loadingText="Submitting"
              spinner={<Spinner color="white" />}
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
