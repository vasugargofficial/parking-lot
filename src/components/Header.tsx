import {Button} from "react-bootstrap";
import {observer} from "mobx-react";
import {IStore} from "../App";

const Header = observer((props: IStore) => {
    return <header className='header'>
        <div className='d-flex justify-content-between'>
            <h4>
                Parking Lot Management
            </h4>
            <Button className={'btn btn-light'} onClick={props.store.toggleParkingLotComposer}>
                + Add new Parking Lot
            </Button>
        </div>
    </header>
})

export default Header;
