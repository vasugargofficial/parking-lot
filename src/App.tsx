import React from 'react';
import './App.css';
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import {ParkingLotsPage} from "./pages/ParkingLotsPage";
import {ParkingLotDetailsPage} from "./pages/ParkingLotDetailsPage";
import {RootStore} from "./stores/rootStore";
import {observer} from "mobx-react";
import {ParkingLotComposer} from "./components/ParkingLotComposer";
import {CarSlotComposer} from "./components/CarSlotComposer";
import {UncontrolledAlert} from "reactstrap";
import {Alert} from "react-bootstrap";

export interface IStore {
    store: RootStore;
}

const App = observer((props: IStore) => {
    return (
        <div className={'App-container'}>
            <div className='layout'>
                <Header {...props}/>
                <div className='content-main p-5'>
                    <Routes>
                        <Route path={'/'} element={<ParkingLotsPage {...props}/>}/>
                        <Route path={'/details'} element={<ParkingLotDetailsPage {...props}/>}/>
                    </Routes>
                </div>
                <ParkingLotComposer {...props}/>
                <CarSlotComposer {...props}/>
            </div>
        </div>
    );
})

export default App;
