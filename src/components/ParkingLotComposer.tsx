import {Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader} from "react-bootstrap";
import {observer} from "mobx-react";
import {IStore} from "../App";
import {Button, Input, Label} from "reactstrap";


export const ParkingLotComposer = observer((props: IStore) => {
    const {store} = props;
    const isTerminalSizeInValid = (store.formData.terminalSize || 1) > (store.formData.parkingSize || 1);
    return <Modal show={store.showParkingLotComposerModal}>
        <ModalHeader>
            Add Details
        </ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                    <Label
                        className="me-sm-2"
                        for="parkingName"
                    >
                        Name
                    </Label>
                    <Input
                        id="parkingName"
                        name="parkingName"
                        onChange={(e) => store.formData.updateValue('parkingName', e.target.value)}
                        placeholder="Block A"
                    />
                </FormGroup>
                <FormGroup className="mt-2 mb-2 me-sm-2 mb-sm-0">
                    <Label
                        className="me-sm-2"
                        for="parkingSize"
                    >
                        Size of Lot
                    </Label>
                    <Input
                        id="parkingSize"
                        name="parkingSize"
                        placeholder="Total slots available"
                        onChange={(e) => store.formData.updateValue('parkingSize', Number(e.target.value))}
                        type="number"
                    />
                </FormGroup>
                <FormGroup className="mt-2 mb-2 me-sm-2 mb-sm-0">
                    <Label
                        className="me-sm-2"
                        for="terminalSize"
                    >
                        Total Terminals
                    </Label>
                    <Input
                        id="terminalSize"
                        name="terminalSize"
                        placeholder="Total Terminals"
                        onChange={(e) => store.formData.updateValue('terminalSize', Number(e.target.value))}
                        type="number"
                        invalid={isTerminalSizeInValid}
                    />
                </FormGroup>

            </Form>
        </ModalBody>
        <ModalFooter>
            <Button
                color={'success'}
                onClick={() => {
                    if (store.formData.parkingName && store.formData.parkingSize && store.formData.terminalSize && !isTerminalSizeInValid) {
                        store.addParkingLot(store.formData.parkingName, store.formData.parkingSize, store.formData.terminalSize);
                        store.toggleParkingLotComposer();
                        store.formData.reset();
                    }
                }}
            >
                Save
            </Button>
            {' '}
            <Button onClick={() => {
                store.toggleParkingLotComposer();
                store.formData.reset();
            }}>
                Cancel
            </Button>
        </ModalFooter>
    </Modal>
})
