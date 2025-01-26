import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  HStack,
  Img,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
  Flex,
  useToast
} from "@chakra-ui/react";
import { useDispatch } from 'react-redux';
import { add } from '../features/Auth/cartSlice';
import { Link } from 'react-router-dom';
import ProductVariants from './ProductVariants/ProductVariants';
import Productinfo from './ProductInfo/Productinfo';

// Dummy products data
const dummyProducts = [
  {
    id: 1,
    title: "CompTIA Security+ (SY0-601)",
    description: "Build essential cybersecurity skills. Covers attacks, threats, penetration testing, risk management, and security architecture.",
    price: 389,
    image: "/sec.svg",
    category: "CompTIA",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 2,
    title: "CompTIA Network+ (N10-008)",
    description: "Master networking fundamentals. Covers infrastructure, network operations, security, and troubleshooting.",
    price: 348,
    image: "/net.svg",
    category: "CompTIA",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 3,
    title: "CompTIA PenTest+ (PT0-002)",
    description: "Advanced penetration testing certification. Learn vulnerability scanning, penetration testing, and security assessment skills.",
    price: 399,
    image: "/pen.svg",
    category: "CompTIA",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 4,
    title: "CompTIA CySA+ (CS0-003)",
    description: "Cybersecurity Analytics certification. Focus on threat detection, security analysis, and incident response.",
    price: 399,
    image: "/cysa.svg",
    category: "CompTIA",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 5,
    title: "ISC2 CISSP",
    description: "The gold standard in cybersecurity certification. Master security and risk management, asset security, security architecture, and more.",
    price: 749,
    image: "/cissp.png",
    category: "ISC2",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 6,
    title: "ISC2 CCSP",
    description: "Cloud Security certification. Covers cloud concepts, architecture, security, platform & infrastructure security, and compliance.",
    price: 599,
    image: "/ccsp.webp",
    category: "ISC2",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 7,
    title: "ISC2 SSCP",
    description: "Systems Security Practitioner certification. Learn access controls, security operations, risk identification, and incident response.",
    price: 549,
    image: "/sscp.png",
    category: "ISC2",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 8,
    title: "ISC2 CC",
    description: "Entry-level cybersecurity certification. Foundation in security principles, network security, and security operations.",
    price: 399,
    image: "/cc.jpg",
    category: "ISC2",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 9,
    title: "Breeze Prime Strawberry",
    description: "Indulge in the sweet and juicy flavor of fresh strawberries.",
    price: 34.99,
    image: "/product2.png",
    category: "Breeze Prime",
    mgVariants: ["25mg", "40mg", "55mg"]
  },
  {
    id: 10,
    title: "Breeze Elite Mint",
    description: "Cool and refreshing mint flavor for a crisp vaping experience.",
    price: 39.99,
    image: "/product3.png",
    category: "Breeze Elite",
    mgVariants: ["30mg", "45mg", "60mg"]
  }
];

const Products = () => {
  const [products] = useState(dummyProducts);
  const [counters, setCounters] = useState(() => {
    const initialCounters = {};
    dummyProducts.forEach(product => {
      initialCounters[product.id] = 0;
    });
    return initialCounters;
  });
  const [selectedVariants, setSelectedVariants] = useState(() => {
    const initialVariants = {};
    dummyProducts.forEach(product => {
      initialVariants[product.id] = product.mgVariants[0];
    });
    return initialVariants;
  });
  const dispatch = useDispatch();
  const toast = useToast();

  const addToCart = (product, counter, selectedVariant) => {
    if (counter > 0 && selectedVariant) {
      const productWithDetails = {
        ...product,
        quantity: counter,
        selectedVariant: selectedVariant,
      };
      dispatch(add(productWithDetails));
      toast({
        title: "Added to Cart",
        description: `${counter} ${product.title} with ${selectedVariant} mg added to your cart.`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: "Missing Information",
        description: "Please select a quantity and variant before adding to the cart.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const incrementCounter = (productId) => {
    setCounters(prevCounters => ({
      ...prevCounters,
      [productId]: prevCounters[productId] + 1,
    }));
  };

  const decrementCounter = (productId) => {
    setCounters(prevCounters => ({
      ...prevCounters,
      [productId]: Math.max(prevCounters[productId] - 1, 0),
    }));
  };

  const handleVariantChange = (productId, variant) => {
    setSelectedVariants(prevSelectedVariants => ({
      ...prevSelectedVariants,
      [productId]: variant,
    }));
  };

  const renderProducts = (category) => {
    return products.filter(product => product.category === category).map((product) => (
      <Box p="24px" h="auto" w={{base:'100%',md:'40%',lg:'23%'}} mb="24px" bg="#FFFFFFED" borderRadius={"16px"} key={product.id}>
        <Box mb="10px" position={"relative"}>
          <Link to={`/products/${product.id}`}>
            <Img mx={"auto"} h="200px" src={product.image} borderRadius={"2px"} w="200px"></Img>
          </Link>
        </Box>
        <Box mb="8px">
          <Text as="p" color="#222222" fontSize={"18px"} fontWeight="600" lineHeight={"27px"}>
            {product.title}
          </Text>
        </Box>
        <Box mb="10px">
          <Text color="#A7B3BF" fontSize="15px" fontWeight="400" minH="69px" lineHeight="22px" overflow="hidden" display="-webkit-box" sx={{ WebkitBoxOrient: "vertical", WebkitLineClamp: 3 }}>
            {product.description}
          </Text>
        </Box>
        <Box mb="8px">
          <Text color="#222222" fontSize="16px" fontWeight="500">
            
          </Text>
        </Box>
        <Box mb="8px" border="2px solid #5111AE" borderRadius={"4px"} p="6px 9px">
          <Flex justifyContent={"space-between"} alignItems={"center"}  >
            <Text color="#222222" fontSize="14px" fontWeight="600" lineHeight={"14px"}>
              Price
            </Text>
            <Text color="#222222" fontSize="14px" fontWeight="800" lineHeight={"17px"}>
              ${product.price}
            </Text>
          </Flex>
        </Box>
        <Flex gap="20px" alignItems={"center"} justifyContent={"center"} mb="8px">
         
            <Image cursor={"pointer"}   onClick={() => decrementCounter(product.id)} src="/blackminus.svg"></Image>
        
          <Text color="#000000" fontSize="24px" fontWeight="600">
            {counters[product.id]}
          </Text>
        
          
            <Image cursor={"pointer"}    onClick={() => incrementCounter(product.id)} src="/blackplus.svg"></Image>
      
        </Flex>
        <Button
          colorScheme='#7D31EA'
          onClick={() => addToCart(product, counters[product.id], selectedVariants[product.id])}
          bg="#7D31EA"
          color="white"
          fontSize="14px"
          fontWeight="600"
          w="100%"
          _focus={{ outline: 'none' }} 
          _focusVisible={{ outline: 'none' }}  
          borderRadius="md"
          shadow="md"
          py={"13px"}
          px={"10px"}
        >
          Add to cart
        </Button>
      </Box>
    ));
  };

  return (
    <Tabs variant="soft-rounded" colorScheme="blue" mt="40px" mx='20px'>
      <TabList flexDirection={{base:'column',sm:'row'}}  p='16px 32px' mx={"auto"} justifyContent="space-between" borderBottom={"none"} bg="rgba(49, 17, 100, 0.75)" maxW={"650px"} borderRadius={{base:'35px',md:'100px'}}>
        <Tab
          p="14px 46px"
          bg="transparent"
          color="rgba(255, 255, 255, 0.65)"
          borderRadius="50px"
          _selected={{ bg: '#FFFFFF', color: '#7D31EA' }}
          _focus={{ outline: 'none' }} 
          _focusVisible={{ outline: 'none' }}  
        >
          CompTIA
        </Tab>
        <Tab p="14px 46px" bg="transparent" color="rgba(255, 255, 255, 0.65)" borderRadius={"50px"} _selected={{bg:'#FFFFFF',color:'#7D31EA'}}  _focus={{ outline: 'none' }} 
          _focusVisible={{ outline: 'none' }}  
        >ISC2</Tab>
        <Tab p="14px 46px" bg="transparent" color="rgba(255, 255, 255, 0.65)" borderRadius={"50px"} _selected={{bg:'#FFFFFF',color:'#7D31EA'}}  _focus={{ outline: 'none' }} 
          _focusVisible={{ outline: 'none' }}  
        >ISACA</Tab>
      </TabList>

      <TabPanels maxW={"1440px"} mx={"auto"}>
        <TabPanel>
          <Flex flexWrap={"wrap"} gap="40px" justifyContent={"center"}>
            {renderProducts("CompTIA")}
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex flexWrap={"wrap"} gap="40px" justifyContent={"center"}>
            {renderProducts("ISC2")}
          </Flex>
        </TabPanel>
        <TabPanel>
          <Productinfo productname={'Breeze Elite'}/>
          <Flex flexWrap={"wrap"} gap="40px" justifyContent={"center"}>
            {renderProducts("Breeze Elite")}
            <Image h="537px" w={{base:'100%',md:'40%',lg:'23%'}} src="/breezeelite.png"></Image>
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Products;
