import { Box, Button, Flex, Img, Text, Checkbox, Image, useToast, } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { Buttons } from "../signup/Buttons";
import CustomInput from "../signup/CustomInput";
import { useNavigate } from "react-router-dom";
import { useDisplayUser } from "../../context/UserContextProvider";
import PassHideShow from "../signup/PassHideShow";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const SigninForm = () => {
  const {user}=useDisplayUser();
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const navigator = useNavigate();
  const { setUser } = useDisplayUser();
  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/login`, {
        email,
        password,
      });
      const data = response.data;
      console.log(data);
      setUser(data.data.user);
      console.log(data.data.user);
     
      toast({
        title: "Login Successfull",
        description: `Login Successfull, ${user.fullName} please Continue Shopping `,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigator("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      w="100%"
      display={"flex"}
      flexDirection={{ base: "column", md: "column", lg: "row" }}
    >
      <Box bg=" #161A2D" w={{ base: "100%", md: "100%", lg: "50%" }}>
        <form onSubmit={handleSubmit}>
          <Box
            display={"flex"}
            justifyContent={{
              base: "flex-start",
              md: "flex-start",
              lg: "center",
            }}
            flexDirection="column"
            height={{ base: "100%", md: "100vh", lg: "100%" }}
            margin={"0 auto"}
            py="60px"
            maxW={{ base: "100%", md: "100%", lg: "688px" }}
            w="100%"
            px={{ base: "30px", md: "30px", lg: "40px" }}
          >
            <Box>
         

              <Text as="p" color="#9FBCD6" fontSize={"15px"} fontWeight="400">
                A first-of-its-kind Social Commerce platform & application built
                on Web 3.0. The future is a magical place, where everyone can
                freely create, consume and trade digital goods, game assets, and
                services without complicated terms and conditions. Imagine a
                more efficient no-code and open future.
              </Text>
            </Box>

            <Box mt={"24px"}>
              <Text
              textAlign={"left"}
                fontSize="16px"
                fontWeight={"600"}
                lineHeight="24px"
                color={"#F9FAFC"}
                mb="16px"
              >
                Email or Phone number
              </Text>
              <CustomInput
                Formlabel="Email ID"
                Required={true}
                type="email"
                nameofinput="email"
                FormInputVal={email}
                onTextChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box mt={"24px"}>
              <Text
               textAlign={"left"}
                fontSize="16px"
                fontWeight={"600"}
                lineHeight="24px"
                color={"#F9FAFC"}
                mb="16px"
              >
                Password
              </Text>
              <PassHideShow Formlabel="Password" 
              nameofinput="email"
              FormInputVal={password}
              onTextChange={(e)=>setPassowrd(e.target.value)} />
            </Box>

            <Box my="24px" display={"flex"} justifyContent="space-between">
              <Checkbox
                borderRadius={"2px"}
                w="18px "
                h="18px"
                bg="#3C5A82"
                borderColor="transparent"
                colorScheme={"transparent"}
              >
                <Text as="p" w={"max-content"} color="#7993B4">
                  {" "}
                  Remember me
                </Text>
              </Checkbox>

              <Link
                color="#1DB4F4"
                href="/passwordrecovery"
                fontSize={"15px"}
                fontWeight="400px"
              >
                Forget Password?
              </Link>
            </Box>
            {/* <Buttons btntype="submit" Text={"Sign in"} /> */}
            <Button
              type="submit"
              w={{ base: "100%", md: "row" }}
              h="48px"
              color="white"
              colorScheme={"transparent"}
              bg="transparent"
              border="1px solid white"
              py="12px"
              fontSize={{ base: "16px", md: "14px", xl: "16px" }}
            >
              {" "}
             SIGN IN 
            </Button>
            <Box
              _before={{
                content: `""`,

                h: "2px",
                w: "100%",
                bg: "#4A607C",
                mr: "14px",
              }}
              _after={{
                content: `""`,

                h: "2px",
                w: "100%",
                bg: "#4A607C",
                ml: "14px",
              }}
              w="100%"
              color="#7993B4"
              display={"flex"}
              alignItems="center"
              fontSize={"16px"}
              fontWeight="700px"
              mt="22px"
            >
              OR
            </Box>
            
            <Box mt="32px">
              <Text
                as="span"
                color="#F9FAFC"
                fontSize={{ base: "16px", md: "14px", xl: "16px" }}
                fontWeight="400"
                lineHeight={"22px"}
              >
                Not Registered yet?{" "}
                <Link to="/signup" color="#1DB4F4">
                  Create an account
                </Link>
              </Text>
            </Box>
          </Box>
        </form>
      </Box>

      {/* <RightSection /> */}
    </Box>
  );
};
