import React, { useEffect, useState } from 'react';
import { Box, Text, Container, keyframes, Image } from '@chakra-ui/react';

const typewriter = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Box position="relative" height={{ base: "300px", md: "400px", lg: "500px" }}>
      {/* Background Image */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgImage="url('/ban1.jpg')"
        bgSize="cover"
        bgPosition="right"
        _after={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: 'rgba(0, 0, 0, 0.6)', // Darker overlay for better purple text visibility
        }}
      />

      {/* Content */}
      <Container 
        maxW="container.xl" 
        height="100%" 
        position="relative" 
        zIndex="1"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        padding={{ base: "4", md: "6", lg: "8" }}
      >
        {/* Animated Heading */}
        <Box
          overflow="hidden"
          width="100%"
          marginBottom={{ base: "2", md: "4", lg: "6" }}
        >
          <Text
            color="#7D31EA"
            fontSize={{ base: "xl", sm: "2xl", md: "2xl", lg: "2xl", xl: "4xl" }}
            fontWeight="bold"
            opacity={isVisible ? 1 : 0}
            animation={`${typewriter} 2s steps(40, end)`}
            whiteSpace={{ base: "normal", md: "nowrap" }}
            overflow="hidden"
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.7)"
            lineHeight={{ base: "1.2", md: "1.4" }}
            textAlign={{ base: "center", md: "left" }}
          >
            Certification Goals for Less! Discounts & Vouchers!
          </Text>
        </Box>

        {/* Description */}
        <Text
          color="white"
          fontSize={{ base: "sm", sm: "md", md: "lg", lg: "xl" }}
          maxW={{ base: "100%", md: "80%", lg: "800px" }}
          opacity={isVisible ? 1 : 0}
          transition="opacity 1s ease-in"
          transitionDelay="2s"
          textShadow="1px 1px 2px rgba(0, 0, 0, 0.5)"
          lineHeight="1.6"
          textAlign={{ base: "center", md: "left" }}
        >
          Voucherley offers discounted vouchers for top certification exams, including CompTIA Security+, 
          Network+, CySA+, CISSP, CCSP, and more. We're here to help you save on the certifications 
          that boost your career in IT and cybersecurity. Start saving today and advance your 
          professional journey with Voucherley.
        </Text>
      </Container>
    </Box>
  );
};

export default HeroSection;