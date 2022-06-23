import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import {RootStore} from "./stores/rootStore";
import {autorun} from "mobx";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = new RootStore();

root.render(
    <BrowserRouter>
        <App  store={store}/>
    </BrowserRouter>
);

autorun(() => {
    localStorage.setItem('parkingLots', JSON.stringify(store.parkingLots));
})
