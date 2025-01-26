import React, { useEffect, useState } from 'react';
import { Box, Text, Container, Flex, keyframes, Image } from '@chakra-ui/react';

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
    <Box
      position="relative"
      h={{base: "100vh", md: "80vh"}}
      w="100%"
      bgImage="url('/ban1.jpg')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      className="hero-section"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: "rgba(0, 0, 0, 0.5)",
        zIndex: 1
      }}
    >
      <Container maxW="1440px" h="100%" position="relative" zIndex={2}>
        <Flex
          direction="column"
          justify="center"
          align="center"
          h="100%"
          textAlign="center"
          color="white"
          pt={{base: "100px", md: "0"}}
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
              textAlign={{ base: "center", md: "center" }}
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
        </Flex>
      </Container>
    </Box>
  );
};

export default HeroSection;