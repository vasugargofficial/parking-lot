import React from 'react';
import './App.css';
import Header from "./components/Header";
import {ParkingLotsPage} from "./pages/ParkingLotsPage";
import {RootStore} from "./stores/rootStore";
import {observer} from "mobx-react";
import {ParkingLotComposer} from "./components/ParkingLotComposer";
import {CarSlotComposer} from "./components/CarSlotComposer";
import {QueryDataModal} from "./components/QueryDataModal";

export interface IStore {
    store: RootStore;
}

const App = observer((props: IStore) => {
    return (
        <div className={'App-container'}>
            <div className='layout'>
                <Header {...props}/>
                <div className='content-main p-5'>
                    <ParkingLotsPage {...props}/>
                </div>
                <ParkingLotComposer {...props}/>
                <CarSlotComposer {...props}/>
                {props.store.selectedParkingLot &&
                    <QueryDataModal
                        isOpen={props.store.showQueryDataModal}
                        parkingLot={props.store.selectedParkingLot}
                        toggler={props.store.toggleQueryModal}
                        formData={props.store.formData}
                    />
                }
            </div>
        </div>
    );
})

export default App;
