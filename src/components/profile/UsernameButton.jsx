import { Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { PROTECTED } from '../../lib/routes'

export function UsernameButton({ user }) {
    return (
        <Button 
            as={Link}
            to={`${PROTECTED}/profile/${user.id}`}
            colorScheme="teal" 
            variant="link"
        >
            s/{user.username}
        </Button>
    )
}
