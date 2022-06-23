import {IStore} from "../App";
import {observer} from "mobx-react";
import React from "react";
import {Button, Table} from "reactstrap";

export const ParkingLotsPage = observer((props: IStore) => {
    const {store} = props;
    return <Table hover>
        <thead>
        <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Available Slots</th>
            <th>Reserved Slots</th>
            <th/>
            <th/>
        </tr>
        </thead>
        <tbody>
        {store.parkingLots.map(lot => {
            return <tr>
                <th scope={'row'}>
                    {lot.name}
                </th>
                <td>
                    {lot.size}
                </td>
                <td className={'text-success'}>
                    {lot.availableSlots.length}
                </td>
                <td className={'text-danger'}>
                    {lot.reservedSlots.length}
                </td>
                <td>
                    <Button className={'border-dark'} color={'white'} onClick={() => {
                        store.setSelectedParkingLot(lot);
                        store.toggleCarSlotComposer();
                    }}
                    >
                        + Park Car
                    </Button>
                </td>
                <td>
                    <Button className={'border-dark'} color={'white'} onClick={() => {
                        store.setSelectedParkingLot(lot);
                        store.toggleQueryModal();
                    }}>
                        View Data
                    </Button>
                </td>
            </tr>
        })}
        </tbody>
    </Table>
})
