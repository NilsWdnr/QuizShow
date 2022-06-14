import {useEffect, useContext, useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

import Page from "./Page";
import Loading from "./components/Loading";
import Header from './components/Header';
import Footer from './components/Footer';

import { UserContext } from './context/UserProvider';

function App() {

  const {userState} = useContext(UserContext);

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
            {loading ? <Loading /> : <><Header />
                <Router/>
            <Footer />
            </>}
          </Page>
      </BrowserRouter>  
    </>
  );
}

export default App;
