import {Modal, ModalBody, ModalFooter, ModalHeader} from "react-bootstrap";
import {observer} from "mobx-react";
import {Button, Col, Input, Row, UncontrolledCollapse} from "reactstrap";
import React from "react";
import {ParkingLot} from "../resources";
import {ParkingFormData} from "../stores/rootStore";
import {Color} from "../enums";

interface IQueryDataProps {
    parkingLot: ParkingLot;
    isOpen: boolean;
    toggler: () => void;
    formData: ParkingFormData;
}


export const QueryDataModal = observer((props: IQueryDataProps) => {
    const {parkingLot, isOpen, toggler, formData} = props;

    const findCarFromRegistrationNumber = () => {
        const terminalNumber = parkingLot.carsWithTerminals[formData.carRegistrationNumber as string];
        const slot = parkingLot.reservedSlots.find(terminal => terminal.terminalNumber === terminalNumber)?.slots
            .find(slot => slot.carDetails?.registrationNumber === formData.carRegistrationNumber)?.ticketNumber;
        return terminalNumber && slot ? `T${terminalNumber}, ${slot}` : '-';
    }

    const findSlotsOfSelectedColor = () => {
        return Array.prototype.concat.apply([], parkingLot.reservedSlots.map(terminal => terminal.slots.filter(slot => slot.carDetails?.color === formData.carColor)));
    }

    return <Modal show={isOpen} size={'xl'}>
        <ModalHeader>
            Parking Lot Details
        </ModalHeader>
        <ModalBody>
            <Row className={'p-2'}>
                <Col md={6}>
                    <p>
                        1- Find Ticker Number of a car:
                    </p>
                </Col>
                <Col md={4}>
                    <Input
                        id="carRegistrationNumber"
                        name="carRegistrationNumber"
                        onChange={(e) => formData.updateValue('carRegistrationNumber', e.target.value)}
                        placeholder="KA-03-HA-1985"
                    />
                </Col>
                <Col md={2}>
                    <p className={'fw-bold'}>
                        {"Slot Number: " + findCarFromRegistrationNumber()}
                    </p>
                </Col>
            </Row>
            <Row className={'p-2'}>
                <Col md={6}>
                    <p>
                        2- Cars registration number for selected color:
                    </p>
                </Col>
                <Col md={4}>
                    <Input
                        id="carColor"
                        name="carColor"
                        onChange={(e) => formData.updateValue('carColor', e.target.value.toUpperCase())}
                        type="select"
                    >
                        {Object.values(Color).map(color => <option key={color}>{color.toLowerCase()}</option>)}
                    </Input>
                </Col>
                <Col md={2}>
                    <Button color={'primary'} id={'registration-results'}>
                        View Result
                    </Button>
                </Col>
            </Row>
            <UncontrolledCollapse toggler={'registration-results'}>
                <div className={'p-2'}>
                    {findSlotsOfSelectedColor().map(slot => slot.carDetails.registrationNumber).join(", ")}
                </div>
            </UncontrolledCollapse>
            <Row className={'p-2'}>
                <Col md={6}>
                    <p>
                        3- Cars Slot number for selected color:
                    </p>
                </Col>
                <Col md={4}>
                    <Input
                        id="carColor"
                        name="carColor"
                        onChange={(e) => formData.updateValue('carColor', e.target.value.toUpperCase())}
                        type="select"
                    >
                        {Object.values(Color).map(color => <option key={color}>{color.toLowerCase()}</option>)}
                    </Input>
                </Col>
                <Col md={2}>
                    <Button color={'primary'} id={'slot-results'}>
                        View Result
                    </Button>
                </Col>
            </Row>
            <UncontrolledCollapse toggler={'slot-results'}>
                <div className={'p-2'}>
                    {findSlotsOfSelectedColor().map(slot => slot.ticketNumber).join(", ")}
                </div>
            </UncontrolledCollapse>
        </ModalBody>
        <ModalFooter>
            <Button onClick={() => {
                toggler();
                formData.reset();
            }}>
                Close
            </Button>
        </ModalFooter>
    </Modal>
})
