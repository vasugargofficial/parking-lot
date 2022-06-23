import {Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader} from "react-bootstrap";
import {observer} from "mobx-react";
import {IStore} from "../App";
import {Button, Input, Label} from "reactstrap";
import {Color} from "../enums";


export const CarSlotComposer = observer((props: IStore) => {
    const {store} = props;
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
                        onChange={(e) => store.formData.updateValue('carColor', e.target.value)}
                        type="select"
                    >
                        {Object.values(Color).map(color => <option key={color}>{color.toLowerCase()}</option>)}
                    </Input>
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button
                color={'success'}
                onClick={() => {
                    if (store.formData.carRegistrationNumber && store.formData.carColor) {
                        store.addCarInParkingLot({
                            registrationNumber: store.formData.carRegistrationNumber,
                            color: store.formData.carColor
                        });
                    }
                }}
            >
                Book Slot
            </Button>
            {' '}
            <Button onClick={() => {
                store.toggleCarSlotComposer();
                store.formData.reset();
            }}>
                Close
            </Button>
        </ModalFooter>
    </Modal>
})
