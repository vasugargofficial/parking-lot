import React from 'react';
import './App.css';
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import {ParkingLotsPage} from "./pages/ParkingLotsPage";
import {ParkingLotDetailsPage} from "./pages/ParkingLotDetailsPage";

const App = () => {
    return (
        <div className={'App-container'}>
            <div className='layout'>
                <Header/>
                <div className='content-main p-4'>
                    <Routes>
                        <Route path={'/'} element={<ParkingLotsPage/>}/>
                        <Route path={'/details'} element={<ParkingLotDetailsPage/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
