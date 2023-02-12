import React from 'react'
import { Link as RouterLink } from "react-router-dom";
import { Button, Flex, Link, Text } from "@chakra-ui/react";
import { DASHBOARD } from '../../lib/routes';
import { useLogout } from '../../hooks/auth';

export default function Navbar() {
    const { logout, isLoading } = useLogout();
    
    return (
        <div>
            <Flex
                shadow="sm"
                pos="fixed"
                width="full"
                borderTop="6px solid"
                borderTopColor="teal.400"
                height="16"
                zIndex="3"
                justify="center"
                bg="#FFE67C"
                >
                <Flex px="4" w="full" align="center" maxW="1200px" bg="#FFE67C">
                    <Text color="teal" fontWeight="bold" mr="20" as={RouterLink} to={DASHBOARD}>Socialfy</Text>
                    <Link color="teal" as={RouterLink} to={DASHBOARD} fontWeight="bold">
                        Home
                    </Link>
                    <Button
                        ml="auto"
                        colorScheme="teal"
                        size="sm"
                        onClick={logout}
                        isLoading={isLoading}
                        >
                        Logout
                    </Button>
                </Flex>            
            </Flex>
        </div>
    )
    return { logout, isLoading };
}
