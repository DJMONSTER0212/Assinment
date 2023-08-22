import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
} from '@chakra-ui/react'
import axios from "axios"
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import { WithUser } from '@clerk/clerk-react'

import { useNavigate } from "react-router-dom";
axios.defaults.baseURL = "http://localhost:3000"


const CreateCanavasModal = () => {
    const [name,setName] = useState("")
    const [loading,setIsloading] = useState(false)
    const [link,setLink] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [cuser,setCuser] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsloading(true);
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            }
                const data = await axios.post('/api/canvas/create',{
                    creatorId : cuser.id,
                    title : name,
                    link : link
                },config)
                console.log(data.data);
                navigate(`/canvas/${cuser.id}/${data.data}`);
                setIsloading(false);
        } catch (error) {
            console.log(error)
        }
        // console.log(cuser.id)
    }
    
    return (
        <div>
            <WithUser>
                {(user) => setCuser(user)}
            </WithUser>
            <Button onClick={onOpen}>Create Canvas &nbsp; <i className="fa-solid fa-plus"></i></Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Canvas</ModalHeader>
                    <ModalCloseButton disabled={loading} />
                    <ModalBody >
                        <FormControl>
                            <div style={{marginBottom: "25px"}}>
                                <FormLabel>Project Name</FormLabel>
                                <Input disabled={loading} onChange={(e)=>setName(e.target.value)} type='text' />
                            </div>
                            <FormLabel>Deployed link of your website.</FormLabel>
                            <Input disabled={loading} onChange={(e) => setLink(e.target.value)} type='text' />
                            <FormHelperText>Please give us live link of you webpage.</FormHelperText>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button disabled={loading} colorScheme='red' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button disabled={loading} onClick={(e)=>handleSubmit(e)} colorScheme='blue' >Create Project</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default CreateCanavasModal
