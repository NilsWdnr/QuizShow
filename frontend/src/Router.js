import React, { useContext } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import Root from './RouteGuards/Root';
import Home from './pages/Home';
import Friends from './pages/Friends'
import Leaderboard from './pages/Leaderboard';
import InGame from './pages/InGame';
import Login from './pages/Login';
import ProfileSelf from './pages/ProfileSelf';
import Register from './pages/Register';
import Logout from './pages/Logout';
import TimerTest from './pages/TimerTest';

import GuestsOnlyRoutes from './RouteGuards/GuestsOnlyRoutes';
import LoggedInOnlyRoutes from './RouteGuards/LoggedInOnlyRoutes';

import { UserContext } from './context/UserProvider';


export default function Router(){

    const { userState, setUser } = useContext(UserContext);

    return( 
        <Routes>
            <Route path="/" element={<Root />} />
            
            <Route element={<LoggedInOnlyRoutes />}>
                <Route path="/timerTest" element={<TimerTest />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/ingame" element={<InGame />} />              
                <Route path="/profileSelf" element={<ProfileSelf />}/>
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Route>

            <Route element={<GuestsOnlyRoutes />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />}/>   
            </Route>
        </Routes> 
    )       

}
