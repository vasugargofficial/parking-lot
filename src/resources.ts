import {Color} from "./enums";

export interface ParkingLot {
    id: string;
    name: string;
    size: number;
    totalTerminals: number;
    availableSlots: Terminal[];
    reservedSlots: Terminal[];
    carsWithTerminals: {[key: string]: number};
}

export interface Terminal {
    terminalNumber: number;
    slots: Slot[];
}

export interface Slot {
    ticketNumber: number;
    carDetails?: CarDetails;
}

export interface CarDetails {
    registrationNumber: string;
    color: Color;
}
