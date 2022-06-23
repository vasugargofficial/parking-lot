import {Color} from "react-bootstrap/types";

export interface ParkingLot {
    id: string;
    name: string;
    size: number;
    availableSlots: Slot[];
    reservedSlots: Slot[];
}

export interface Slot {
    ticketNumber: number;
    carDetails?: CarDetails;
}

export interface CarDetails {
    registrationNumber: string;
    color: Color;
}
