import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar as ChakraAvatar } from '@chakra-ui/react'
import { PROTECTED } from '../../lib/routes';

export default function Avatar({user, size="xl", avatarOverride=null}) {
    if (!user) return "Loading...";
    return (
        <div>
            <ChakraAvatar 
                as={Link}
                to={`${PROTECTED}/profile/${user.id}`}
                name={user.username} 
                size={size} 
                src={avatarOverride || user.Avatar} 
                _hover={{cursor: "pointer", opacity: "0.8" }} 
                />
        </div>
    )
}
