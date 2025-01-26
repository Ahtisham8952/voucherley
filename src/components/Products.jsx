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
  useToast,
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
  },
 
  {
    id: 15,
    title: "CompTIA Server+",
    description: "CompTIA Server+ ensures professionals have the skills to work in data centers and cloud environments, validating hands-on skills required to work with servers.",
    price: 219,
    image: "/serdard.svg",
    category: "CompTIA",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 16,
    title: "CompTIA Cloud+",
    description: "CompTIA Cloud+ validates the skills needed to maintain and optimize cloud infrastructure services, covering cloud concepts, models, virtualization, infrastructure, security, resource management and business continuity.",
    price: 229,
    image: "/cloud.svg",
    category: "CompTIA",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 17,
    title: "CompTIA Linux+",
    description: "CompTIA Linux+ validates the competencies required of an early career system administrator supporting Linux systems, covering system configuration, management, troubleshooting, and security.",
    price: 219,
    image: "/linux.svg",
    category: "CompTIA",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 18,
    title: "CompTIA CASP+",
    description: "CompTIA Advanced Security Practitioner (CASP+) is an advanced-level cybersecurity certification for security architects and senior security engineers charged with leading and improving an enterprise's cybersecurity readiness.",
    price: 299,
    image: "/casp.svg",
    category: "CompTIA",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 19,
    title: "CompTIA Data+",
    description: "CompTIA Data+ is a certification that validates the skills needed to transform business requirements in support of data-driven decisions through mining, manipulating, and reporting data.",
    price: 219,
    image: "/data.svg",
    category: "CompTIA",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 20,
    title: "CompTIA Project+",
    description: "CompTIA Project+ gives business professionals the basic concepts to successfully manage small to medium-sized projects, validating the entire project life cycle.",
    price: 199,
    image: "/project.svg",
    category: "CompTIA",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 21,
    title: "CompTIA Cloud Essentials+",
    description: "CompTIA Cloud Essentials+ is a certification that demonstrates the knowledge and skills required to make business decisions about cloud technologies, covering cloud concepts, business principles, management and technical operations.",
    price: 179,
    image: "/essentials.svg",
    category: "CompTIA",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 23,
    title: "ISACA CISA",
    description: "The Certified Information Systems Auditor (CISA) certification is globally recognized for IS/IT audit, control, and assurance professionals. Validates expertise in assessing vulnerabilities, reporting on compliance, and implementing enterprise controls.",
    price: 575,
    image: "/cisa.svg",
    category: "ISACA",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 24,
    title: "ISACA CISM",
    description: "The Certified Information Security Manager (CISM) certification is designed for information security managers. Focuses on security strategy, program development, and governance, demonstrating expertise in managing enterprise information security.",
    price: 575,
    image: "/cism.svg",
    category: "ISACA",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 25,
    title: "ISACA CRISC",
    description: "The Certified in Risk and Information Systems Control (CRISC) certification is for IT professionals who identify and manage risks through the development, implementation and maintenance of information systems controls.",
    price: 575,
    image: "/crisc.svg",
    category: "ISACA",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 26,
    title: "ISACA CGEIT",
    description: "The Certified in the Governance of Enterprise IT (CGEIT) certification validates knowledge in enterprise IT governance principles and practices. Ideal for professionals managing and providing advisory services in Enterprise IT Governance.",
    price: 575,
    image: "/cgeit.svg",
    category: "ISACA",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 27,
    title: "ISACA CSX-P",
    description: "The Cybersecurity Practitioner Certification (CSX-P) is designed for cybersecurity practitioners. Validates hands-on ability to identify, analyze, respond to and mitigate cybersecurity threats in real-time.",
    price: 575,
    image: "/csxp.svg",
    category: "ISACA",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 28,
    title: "ISACA CDPSE",
    description: "The Certified Data Privacy Solutions Engineer (CDPSE) certification validates technical skills in implementing privacy by design to enable organizations to enhance privacy technology platforms and products.",
    price: 575,
    image: "/cdpse.svg",
    category: "ISACA",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 29,
    title: "ISACA ITCA",
    description: "The Information Technology Certified Associate (ITCA) certification is perfect for entry-level professionals. Provides foundational knowledge across key technology domains including computing, networks, cybersecurity, and software development.",
    price: 575,
    image: "/itca.svg",
    category: "ISACA",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 30,
    title: "ISACA CET",
    description: "The Certified in Emerging Technology (CET) certification focuses on the most innovative and promising technologies. Covers cloud computing, blockchain, IoT, and artificial intelligence, preparing professionals for future technological challenges.",
    price: 575,
    image: "/cet.svg",
    category: "ISACA",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 31,
    title: "ISC2 CC",
    description: "The Certified in Cybersecurity (CC) is an entry-level certification that proves your competency in fundamental cybersecurity concepts. Perfect for those starting their cybersecurity career.",
    price: 199,
    image: "/cc.svg",
    category: "ISC2",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 32,
    title: "ISC2 CISSP",
    description: "The Certified Information Systems Security Professional (CISSP) is the most globally recognized certification in information security. Validates advanced knowledge and experience in cybersecurity leadership.",
    price: 749,
    image: "/cissp.svg",
    category: "ISC2",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 33,
    title: "ISC2 CISSP-ISSAP",
    description: "The Information Systems Security Architecture Professional (CISSP-ISSAP) concentration demonstrates your expertise in designing security architecture that meets business needs.",
    price: 599,
    image: "/issap.svg",
    category: "ISC2",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 34,
    title: "ISC2 CISSP-ISSEP",
    description: "The Information Systems Security Engineering Professional (CISSP-ISSEP) concentration focuses on security engineering concepts and practices. Perfect for security engineers working with government agencies.",
    price: 599,
    image: "/issep.svg",
    category: "ISC2",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 35,
    title: "ISC2 CISSP-ISSMP",
    description: "The Information Systems Security Management Professional (CISSP-ISSMP) concentration validates your expertise in security leadership and program management.",
    price: 599,
    image: "/issmp.svg",
    category: "ISC2",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 36,
    title: "ISC2 CSSLP",
    description: "The Certified Secure Software Lifecycle Professional (CSSLP) certification validates your expertise in securing applications throughout the software development lifecycle.",
    price: 599,
    image: "/csslp.svg",
    category: "ISC2",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 37,
    title: "ISC2 CCSP",
    description: "The Certified Cloud Security Professional (CCSP) certification demonstrates your knowledge and competency in cloud security design, implementation, architecture, operations, and service orchestration.",
    price: 599,
    image: "/ccsp.svg",
    category: "ISC2",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 38,
    title: "ISC2 CGRC",
    description: "The Certified in Governance, Risk and Compliance (CGRC) certification validates your expertise in establishing and maintaining an enterprise-wide view of governance, risk management, and compliance.",
    price: 599,
    image: "/cgrc.svg",
    category: "ISC2",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 39,
    title: "ISC2 SSCP",
    description: "The Systems Security Certified Practitioner (SSCP) certification demonstrates your technical skills and hands-on experience in implementing, monitoring and administering IT infrastructure.",
    price: 249,
    image: "/sscp.svg",
    category: "ISC2",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 40,
    title: "EC-Council CEH",
    description: "Certified Ethical Hacker (CEH) is a certification program that certifies individuals in the specific network security discipline of Ethical Hacking from a vendor-neutral perspective.",
    price: 850,
    image: "/ceh.svg",
    category: "EC-Council",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 41,
    title: "EC-Council CHFI",
    description: "Computer Hacking Forensic Investigator (CHFI) provides the necessary skills to perform effective digital forensic investigations.",
    price: 850,
    image: "/chfi.svg",
    category: "EC-Council",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 42,
    title: "EC-Council CCISO",
    description: "Certified Chief Information Security Officer (CCISO) certification is an industry-leading program that recognizes the real-world experience necessary to succeed at the highest executive levels of information security.",
    price: 999,
    image: "/cciso.svg",
    category: "EC-Council",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 50,
    title: "Mile2 CPTE",
    description: "Certified Penetration Testing Engineer (CPTE) certification validates your ability to conduct penetration tests using the latest tools and techniques.",
    price: 599,
    image: "/cpte.svg",
    category: "Mile2",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 51,
    title: "Mile2 CPTC",
    description: "Certified Penetration Testing Consultant (CPTC) is designed for security professionals who want to master advanced penetration testing methodologies.",
    price: 699,
    image: "/cptc.svg",
    category: "Mile2",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 52,
    title: "Mile2 CDFE",
    description: "Certified Digital Forensics Examiner (CDFE) certification proves your ability to conduct digital forensics investigations using industry-standard tools and procedures.",
    price: 599,
    image: "/cdfe.svg",
    category: "Mile2",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 60,
    title: "PMI PMP",
    description: "Project Management Professional (PMP) certification is the most important industry-recognized certification for project managers.",
    price: 555,
    image: "/pmp.svg",
    category: "PMI",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 61,
    title: "PMI CAPM",
    description: "Certified Associate in Project Management (CAPM) is a valuable entry-level certification for project practitioners.",
    price: 300,
    image: "/capm.svg",
    category: "PMI",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 62,
    title: "PMI ACP",
    description: "PMI Agile Certified Practitioner (PMI-ACP) certification recognizes your knowledge of agile principles and your skill with agile techniques.",
    price: 495,
    image: "/acp.svg",
    category: "PMI",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 70,
    title: "Cisco CCNA",
    description: "Cisco Certified Network Associate (CCNA) validates your ability to install, configure, operate, and troubleshoot medium-size routed and switched networks.",
    price: 299,
    image: "/ccna.svg",
    category: "CISCO",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 71,
    title: "Cisco CCNP Enterprise",
    description: "Cisco Certified Network Professional Enterprise (CCNP Enterprise) certification proves your skills with enterprise networking solutions.",
    price: 399,
    image: "/ccnp.svg",
    category: "CISCO",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  },
  {
    id: 72,
    title: "Cisco CCIE Enterprise",
    description: "Cisco Certified Internetwork Expert Enterprise Infrastructure (CCIE Enterprise) certification is the highest level of certification offered by Cisco.",
    price: 1599,
    image: "/ccie.svg",
    category: "CISCO",
    mgVariants: ["Practice Test", "Study Guide", "Full Bundle"]
  }
];

const Products = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [products] = useState(dummyProducts);
  const dispatch = useDispatch();
  const toast = useToast();

  const addToCart = (product) => {
    const productWithDetails = {
      ...product,
      quantity: 1
    };
    dispatch(add(productWithDetails));
    toast({
      title: "Added to Cart",
      description: `${product.title} added to your cart.`,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  const renderProducts = (category) => {
    return products.filter(product => product.category === category).map((product) => (
      <Box p="24px" h="auto" w={{base:'100%',md:'100%',lg:'100%'}} mb="24px" bg="#FFFFFFED" borderRadius={"16px"} key={product.id}>
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
        <Button
          colorScheme='#7D31EA'
          onClick={() => addToCart(product)}
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
      <TabList 
        flexDirection={{base: 'column', md: 'row'}}
        flexWrap={{md: 'wrap'}}
        gap={{base: '10px', md: '15px'}}
        p={{base: '16px', md: '20px 32px'}} 
        mx={"auto"} 
        justifyContent={{base: 'center', md: 'center'}} 
        alignItems="center"
        borderBottom={"none"} 
        bg="rgba(49, 17, 100, 0.75)" 
        maxW={"1500px"} 
        borderRadius={{base:'25px', md:'50px'}}
      >
        <Tab
          p={{base: "10px 30px", md: "14px 46px"}}
          bg="transparent"
          color="rgba(255, 255, 255, 0.65)"
          borderRadius="50px"
          _selected={{ bg: '#FFFFFF', color: '#7D31EA' }}
          _focus={{ outline: 'none' }} 
          _focusVisible={{ outline: 'none' }}
          fontSize={{base: "14px", md: "16px"}}
        >
          CompTIA
        </Tab>
        <Tab 
          p={{base: "10px 30px", md: "14px 46px"}} 
          bg="transparent" 
          color="rgba(255, 255, 255, 0.65)" 
          borderRadius={"50px"} 
          _selected={{bg:'#FFFFFF',color:'#7D31EA'}}  
          _focus={{ outline: 'none' }} 
          _focusVisible={{ outline: 'none' }}
          fontSize={{base: "14px", md: "16px"}}
        >
          ISC2
        </Tab>
        <Tab 
          p={{base: "10px 30px", md: "14px 46px"}} 
          bg="transparent" 
          color="rgba(255, 255, 255, 0.65)" 
          borderRadius={"50px"} 
          _selected={{bg:'#FFFFFF',color:'#7D31EA'}}  
          _focus={{ outline: 'none' }} 
          _focusVisible={{ outline: 'none' }}
          fontSize={{base: "14px", md: "16px"}}
        >
          ISACA
        </Tab>
        <Tab 
          p={{base: "10px 30px", md: "14px 46px"}} 
          bg="transparent" 
          color="rgba(255, 255, 255, 0.65)" 
          borderRadius={"50px"} 
          _selected={{bg:'#FFFFFF',color:'#7D31EA'}}  
          _focus={{ outline: 'none' }} 
          _focusVisible={{ outline: 'none' }}
          fontSize={{base: "14px", md: "16px"}}
        >
          EC-Council
        </Tab>
        <Tab 
          p={{base: "10px 30px", md: "14px 46px"}} 
          bg="transparent" 
          color="rgba(255, 255, 255, 0.65)" 
          borderRadius={"50px"} 
          _selected={{bg:'#FFFFFF',color:'#7D31EA'}}  
          _focus={{ outline: 'none' }} 
          _focusVisible={{ outline: 'none' }}
          fontSize={{base: "14px", md: "16px"}}
        >
          Mile2
        </Tab>
        <Tab 
          p={{base: "10px 30px", md: "14px 46px"}} 
          bg="transparent" 
          color="rgba(255, 255, 255, 0.65)" 
          borderRadius={"50px"} 
          _selected={{bg:'#FFFFFF',color:'#7D31EA'}}  
          _focus={{ outline: 'none' }} 
          _focusVisible={{ outline: 'none' }}
          fontSize={{base: "14px", md: "16px"}}
        >
          PMI
        </Tab>
        <Tab 
          p={{base: "10px 30px", md: "14px 46px"}} 
          bg="transparent" 
          color="rgba(255, 255, 255, 0.65)" 
          borderRadius={"50px"} 
          _selected={{bg:'#FFFFFF',color:'#7D31EA'}}  
          _focus={{ outline: 'none' }} 
          _focusVisible={{ outline: 'none' }}
          fontSize={{base: "14px", md: "16px"}}
        >
          CISCO
        </Tab>
      </TabList>

      <TabPanels maxW={"1440px"} mx={"auto"}>
        <TabPanel>
          <Grid 
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)"
            }}
            gap={{base: "20px", md: "30px"}}
            justifyItems="center"
          >
            {renderProducts("CompTIA")}
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid 
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)"
            }}
            gap={{base: "20px", md: "30px"}}
            justifyItems="center"
          >
            {renderProducts("ISC2")}
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid 
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)"
            }}
            gap={{base: "20px", md: "30px"}}
            justifyItems="center"
          >
            {renderProducts("ISACA")}
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid 
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)"
            }}
            gap={{base: "20px", md: "30px"}}
            justifyItems="center"
          >
            {renderProducts("EC-Council")}
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid 
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)"
            }}
            gap={{base: "20px", md: "30px"}}
            justifyItems="center"
          >
            {renderProducts("Mile2")}
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid 
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)"
            }}
            gap={{base: "20px", md: "30px"}}
            justifyItems="center"
          >
            {renderProducts("PMI")}
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid 
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)"
            }}
            gap={{base: "20px", md: "30px"}}
            justifyItems="center"
          >
            {renderProducts("CISCO")}
          </Grid>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Products;
