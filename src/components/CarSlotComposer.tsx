import {Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader} from "react-bootstrap";
import {observer} from "mobx-react";
import {IStore} from "../App";
import {Button, Input, Label} from "reactstrap";
import {Color} from "../enums";
import React, {useState} from "react";


export const CarSlotComposer = observer((props: IStore) => {
    const {store} = props;
    const initialButtonLabel = 'Get parking slot';
    const [buttonLabel, setButtonLabel] = useState(initialButtonLabel);
    const isInvalidTerminal = (store.selectedParkingLot?.totalTerminals || 1) < (store.formData.terminalNumber || 1);

    return <Modal show={store.showCarSlotComposerModal}>
        <ModalHeader>
            Add Car Details
        </ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                    <Label
                        className="me-sm-2"
                        for="carRegistrationNumber"
                    >
                        Registration Number
                    </Label>
                    <Input
                        id="carRegistrationNumber"
                        name="carRegistrationNumber"
                        onChange={(e) => store.formData.updateValue('carRegistrationNumber', e.target.value)}
                        placeholder="KA-03-HA-1985"
                    />
                </FormGroup>
                <FormGroup className="mt-2 mb-2 me-sm-2 mb-sm-0">
                    <Label
                        className="me-sm-2"
                        for="carColor"
                    >
                        Select Color
                    </Label>
                    <Input
                        id="carColor"
                        name="carColor"
                        onChange={(e) => store.formData.updateValue('carColor', e.target.value.toUpperCase())}
                        type="select"
                    >
                        {Object.values(Color).map(color => <option key={color}>{color.toLowerCase()}</option>)}
                    </Input>
                </FormGroup>
                <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                    <Label
                        className="me-sm-2"
                        for="terminalNumber"
                    >
                        Current Terminal Number
                    </Label>
                    <Input
                        id="terminalNumber"
                        name="terminalNumber"
                        onChange={(e) => store.formData.updateValue('terminalNumber', Number(e.target.value))}
                        type={"number"}
                        invalid={isInvalidTerminal}
                    />
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button
                color={buttonLabel === initialButtonLabel ? 'success' : 'primary'}
                disabled={buttonLabel !== initialButtonLabel}
                onClick={() => {
                    if (store.formData.carRegistrationNumber && store.formData.carColor && store.formData.terminalNumber && !isInvalidTerminal) {
                        store.addCarInParkingLot({
                            registrationNumber: store.formData.carRegistrationNumber,
                            color: store.formData.carColor
                        }, store.formData.terminalNumber);
                        console.log(store.selectedParkingLot?.reservedSlots);
                        // setButtonLabel(`Slot Number: ${store.selectedParkingLot?.reservedSlots[store.selectedParkingLot?.reservedSlots.length - 1].ticketNumber}`);
                    }
                }}
            >
                {buttonLabel}
            </Button>
            {' '}
            <Button onClick={() => {
                store.toggleCarSlotComposer();
                setButtonLabel(initialButtonLabel);
                store.formData.reset();
            }}>
                Close
            </Button>
        </ModalFooter>
    </Modal>
})
