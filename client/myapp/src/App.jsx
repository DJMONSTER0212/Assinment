import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
  useUser,
  UserButton,
  WithUser,
} from "@clerk/clerk-react";
import { withUser} from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import CanvasCard from "../components/CanvasCard";
import CreateCanavasModal from "../components/modals/CreateCanavasModal";
import Canvas from "../components/Canvas";
import { useEffect, useState } from "react";
import axios from "axios";

if (!import.meta.env.VITE_SOME_KEY) {
  throw new Error("Missing Publishable Key")
}

const clerkPubKey = import.meta.env.VITE_SOME_KEY;
axios.defaults.baseURL = "http://localhost:3000"
function PublicPage() {
  return (
    <>
      <h1>Public page</h1>
      <a href="/protected">Go to protected page</a>
    </>
  );
}

function ProtectedPage() {
  const [cuser,setCuser] = useState(null);
  const [canvases,setCanvases] = useState([]);
  const getAllCanvases = async ()=>{
    try {
      const data = await axios.get(`/api/canvas/${cuser}`)   
      // setCanvases(data);
      console.log(data.data)
      // setCanvases(canvases.data);
      // console.log(data);   
      setCanvases(data.data);
      console.log(canvases)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getAllCanvases();
  },[])
  return (
    <>
      <WithUser>
        {(user) => {
          // console.log(user.id)
          setCuser(user.id);
          console.log(cuser);
          }}
      </WithUser>

      {/* <CanvasCard/> */}
      <CreateCanavasModal/>
      {canvases.map((canvas)=>(<CanvasCard id={canvas._id} cId ={canvas.creatorId} title={canvas.title} link={canvas.link} />))}
      <UserButton />
    </>
  );
}

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route
          path="/sign-in/*"
          element={<SignIn routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" />}
        />
        <Route path="/canvas/:userId/:canvasId" element={<Canvas/>} />
        <Route
          path="/protected"
          element={
            <>
              <SignedIn>
                <ProtectedPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </ClerkProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  );
}

export default App;