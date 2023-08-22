import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Input, Switch, useDisclosure } from '@chakra-ui/react'
axios.defaults.baseURL = "http://localhost:3000"
function MyComponent() {

    const [mouseLocalCoordinates, setMouseLocalCoordinates] = useState({ x: 0, y: 0 });

    const mouseMoveHandler = (event) => {
        setMouseLocalCoordinates({
            x: event.clientX - event.target.offsetLeft,
            y: event.clientY - event.target.offsetTop
        });
    }

    useEffect(() => {
        window.addEventListener('mousemove', mouseMoveHandler);
        return (() => {
            window.removeEventListener('mousemove', mouseMoveHandler);
        })
    }, [])

    return (
        <>
            Mouse Local Coordinates: x = {mouseLocalCoordinates.x}, y={mouseLocalCoordinates.y}
        </>
    )
}



const Canvas = () => {
    const { canvasId, userId } = useParams();
    const [remarks, setRemarks] = useState([]);

    const getAllRemarks = async () => {
        try {
            const data = await axios.get(`/api/remark/${canvasId}`);
            console.log(data.data);
            setRemarks(data.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getAllRemarks();
    },[])

    const [enabled, setEnabled] = useState(false)
    const [mobileView, setMobileView] = useState(false)
    const [canvas, setCanvas] = useState("")
    const ref = useRef(null);
    const [mouseLocalCoordinates, setMouseLocalCoordinates] = useState({ x: 0, y: 0 });
    const mouseMoveHandler = (event) => {
        setMouseLocalCoordinates({
            x: event.clientX - event.target.offsetLeft,
            y: event.clientY - event.target.offsetTop
        });
        console.log(mouseLocalCoordinates)
    }
    useEffect(() => {
        const element = ref.current;
        element.addEventListener('mousemove', mouseMoveHandler);
        return (() => {
            element.removeEventListener('mousemove', mouseMoveHandler);
        })
    }, [])
    const getCanvas = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            };
            var currentCanvas = await axios.get(`/api/canvas/${userId}/${canvasId}`,);
            // setCanva(currentCanvas);
            setCanvas(currentCanvas.data)
            console.log(currentCanvas)
        } catch (error) {

        }
    }
    useEffect(() => {
        getCanvas();
    }, [])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    const [newTitle, setNewTitle] = useState("")
    const [newRemark, setNewRemark] = useState("")
    const [loading, setLoading] = useState(false)
    const handleSave = async () => {
        let bp = "";
        if (mobileView) {
            bp = "MB";
        }
        else {
            bp = "PC";
        }
        try {
            setLoading(true)
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            }

            const data = await axios.post('/api/remark/create', {
                creatorId: userId,
                breakpoints: bp,
                title: newTitle,
                canvasId: canvasId
            }, config);
            console.log(data);
            await getAllRemarks();
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            {/* <h1 className='bg-rose-300'> */}

            {/* Hello */}
            {/* </h1> */}
            {/* {canvasId} */}
            <div style={{ width: "100%" }} ref={ref}>
                <div>
                    <iframe src={`${canvas.link}`} width={mobileView ? "30%" : "100%"} height={600} sandbox={`allow-scripts allow-modal`} allow='full' style={{ display: 'flex', }}>
                    </iframe>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
                Remark mode
                <Switch
                    checked={enabled}
                    onChange={() => setEnabled(!enabled)}
                    className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'
                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                    <span
                        className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                </Switch>
                Mobile View
                <Switch
                    checked={mobileView}
                    onChange={() => setMobileView(!mobileView)}
                    className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'
                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                    <span
                        className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                </Switch>
                <div style={{ marginTop: "10px" }}>
                    <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
                        Remarks
                    </Button>
                    <Drawer
                        isOpen={isOpen}
                        placement='right'
                        onClose={onClose}
                        finalFocusRef={btnRef}
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            {remarks.map((remark) => (
                                <div>
                                    <h1>{remark.title}</h1>
                                </div>
                            ))}
                            <DrawerCloseButton />
                            <DrawerHeader>Create Remark</DrawerHeader>

                            <DrawerBody>
                                <div style={{ display: 'flex', flexDirection: "column", }}>
                                    <div style={{ marginBottom: "5px" }}>
                                        <Input isDisabled={loading} onChange={(e) => setNewTitle(e.target.value)} placeholder='Title... ' />
                                    </div>
                                    <Input isDisabled={loading} onChange={(e) => setNewRemark(e.target.value)} placeholder='Enter Your Remark' />
                                </div>
                            </DrawerBody>

                            <DrawerFooter>
                                <Button variant='outline' isDisabled={loading} mr={3} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSave} isDisabled={loading} colorScheme='blue'>Save</Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>
            {mouseLocalCoordinates.x}
            <br />
            {mouseLocalCoordinates.y}
        </div>

    )
}

export default Canvas
