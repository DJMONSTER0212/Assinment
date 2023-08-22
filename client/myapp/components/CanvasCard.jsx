import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Divider, ButtonGroup, Button, Image } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
const CanvasCard = ({id,title,cId}) => {
    const navigate = useNavigate();
    return (
        <Card id={`OAIFJ`+`${id}`} maxW='sm'>
            <CardBody>
                <Image src='https://e0.pxfuel.com/wallpapers/1021/452/desktop-wallpaper-anime-ultra-8k-for-mobile-jpeg-1-anime.jpg'/>
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{title}</Heading>
                    <Text>
                        Created By - {cId} 
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='solid' onClick={() => navigate(`/canvas/${cId}/${id}`)} colorScheme='blue'>
                        View
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}

export default CanvasCard
