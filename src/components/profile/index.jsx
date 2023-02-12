import React from 'react'
import {
    Button,
    Divider,
    Flex,
    HStack,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import Avatar from './Avatar';
import { useNavigate, useParams } from "react-router-dom";
import { PostsLists } from '../post/PostsList';
import { usePosts } from '../../hooks/posts';
import { useAuth } from '../../hooks/auth';
import { format } from "date-fns";
import { useUser } from '../../hooks/users';
import EditProfile from './EditProfile';

export default function Profile() {
    const {id} = useParams();
    const {posts, isLoading: postsLoading} = usePosts(id)
    const {user, isLoading: userLoading} = useUser(id)
    const { user: authUser, isLoading: authLoading } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    if (userLoading) return "Loading..."

    return (
            <Stack spacing="5">
                <Flex p={["4", "6"]} pos="relative" align="center">
                    <Avatar size="2xl" user={user} />

                    {!authLoading && authUser.id === user.id && (
                    <Button
                        pos="absolute"
                        mb="2"
                        top="6"
                        right="6"
                        colorScheme="teal"
                        onClick={onOpen}
                    >
                        Change avatar
                    </Button>
                    )}

                    <Stack ml="10">
                        <Text fontSize="2x1">u/{user.username}</Text>
                        <HStack spacing="10">
                            <Text color="gray.700" fontSize={["sm", "lg"]}>
                            Posts: {posts?.length}
                            </Text>
                            <Text color="gray.700" fontSize={["sm", "lg"]}>
                                Todo
                            </Text>
                            <Text color="gray.700" fontSize={["sm", "lg"]}>
                            Joined: {format(user.date, "MMMM YYY")}
                            </Text>
                        </HStack>
                    </Stack>

                    <EditProfile isOpen={isOpen} onClose={onClose} />
                </Flex>
                <Divider />

                {postsLoading ? (
                    <Text>Posts are loading...</Text>
                ) : (
                    <PostsLists posts={posts} />
                )}
            </Stack>
    );

    navigate(0)
    
}
