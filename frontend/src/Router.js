import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import Root from './routeGuards/Root';
import Friends from './pages/Friends'
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';
import InGame from './pages/InGame';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import UserProfile from './pages/UserProfile';
import Restart from './pages/Restart';

import GuestsOnlyRoutes from './routeGuards/GuestsOnlyRoutes';
import LoggedInOnlyRoutes from './routeGuards/LoggedInOnlyRoutes';


export default function Router(){

    return( 
        <Routes>
            <Route path="/" element={<Root />} />
            
            <Route element={<LoggedInOnlyRoutes />}>
                <Route path="/friends" element={<Friends />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/ingame" element={<InGame />} />              
                <Route path="/logout" element={<Logout />} />
                <Route path="/user/:username" element={<UserProfile />} /> 
                <Route path="/restart" element={<Restart />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Route>

            <Route element={<GuestsOnlyRoutes />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />}/>   
            </Route>
        </Routes> 
    )       

}
