import {useEffect, useContext, useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

import Page from "./Page";
import Header from './components/Header';
import Footer from './components/Footer';

import { UserProvider, UserContext } from './context/UserProvider';

function App() {

  const {userState,setUser} = useContext(UserContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(userState.isLoading!==true){
      setLoading(false);
    };
  }, [userState])

  return (
    <>
      <BrowserRouter>
          <Page>
            {loading ? <h1>Loading...</h1> : <><Header />
                <Router/>
            <Footer />
            </>}
          </Page>
      </BrowserRouter>  
    </>
  );
}

export default App;
