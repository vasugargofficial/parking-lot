import {CarDetails, ParkingLot, Slot, Terminal} from "../resources";
import {action, makeObservable, observable} from "mobx";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {Color} from "../enums";

export class ParkingFormData {
    parkingName: string | null = null;
    parkingSize: number | null = null;
    carRegistrationNumber: string | null = null;
    carColor: Color = Color.WHITE;
    terminalSize: number | null = null;
    terminalNumber: number | null = null;

    constructor() {
        makeObservable(this, {
            parkingName: observable,
            parkingSize: observable,
            carRegistrationNumber: observable,
            carColor: observable,
            updateValue: action,
            terminalSize: observable,
            terminalNumber: observable,
            reset: action
        });
    }

    updateValue = (field: string, value: any) => {
        const data: any = this;
        data[field] = value;
    }

    reset = () => {
        this.parkingSize = null;
        this.parkingName = null;
        this.carRegistrationNumber = null;
        this.carColor = Color.WHITE;
        this.terminalSize = null;
        this.terminalNumber = null;
    }
}

export class RootStore {
    parkingLots: ParkingLot[] = JSON.parse(localStorage.getItem('parkingLots') || '[]') || [];
    selectedParkingLot?: ParkingLot;
    showParkingLotComposerModal: boolean = false;
    showCarSlotComposerModal: boolean = false;
    showQueryDataModal: boolean = false;
    formData: ParkingFormData = new ParkingFormData();

    constructor() {
        makeObservable(this, {
            parkingLots: observable,
            selectedParkingLot: observable,
            addParkingLot: action,
            addCarInParkingLot: action,
            showParkingLotComposerModal: observable,
            toggleParkingLotComposer: action,
            showCarSlotComposerModal: observable,
            toggleCarSlotComposer: action,
            setSelectedParkingLot: action,
            showQueryDataModal: observable
        });
    }

    addParkingLot = (name: string, size: number, totalTerminals: number) => {
        this.parkingLots.push({
            id: generateUniqueID(),
            name: name,
            size: size,
            totalTerminals: totalTerminals,
            availableSlots: this.getSlotsByTerminal(totalTerminals, size),
            reservedSlots: this.generateTerminals(totalTerminals, Array(totalTerminals).fill(0)),
            carsWithTerminals: {}
        });
    }

    getSlotsByTerminal = (totalTerminals: number, totalSlots: number): Terminal[] => {
        const n = Math.ceil(totalSlots / totalTerminals);
        const slotsDistribution: number[] = Array(Math.floor(totalSlots / n)).fill(n);
        const remainder = totalSlots % n;

        if (remainder > 0) {
            slotsDistribution.push(remainder);
        }

        return this.generateTerminals(totalTerminals, slotsDistribution);
    }

    generateTerminals = (totalTerminals: number, slotsDistribution: number[]) => {
        const terminals: Terminal[] = [];

        for (let terminal = 1; terminal <= totalTerminals; terminal++) {
            terminals.push({
                terminalNumber: terminal,
                slots: this.generateSlots(slotsDistribution[terminal - 1])
            })
        }

        return terminals;
    }

    generateSlots = (size: number): Slot[] => {
        const slots: Slot[] = [];
        for (let i = 1; i<= size; i++) {
            slots.push({ticketNumber: i});
        }
        return slots;
    }

    addCarInParkingLot = (carDetails: CarDetails, terminalNumber: number) => {
        const parkingLot = this.parkingLots.find(lot => lot.id === this.selectedParkingLot?.id);
        if (parkingLot) {
            let slot = parkingLot.availableSlots.find(terminal => terminal.terminalNumber === terminalNumber)?.slots.shift();

            if (slot) {
                slot.carDetails = carDetails;
                parkingLot.reservedSlots.find(terminal => terminal.terminalNumber === terminalNumber)?.slots.push(slot);
                parkingLot.carsWithTerminals[carDetails.registrationNumber] = terminalNumber;
                
                return {
                    terminalNumber: terminalNumber,
                    slot: slot
                }
            } else {
                const nearestTerminal = this.findNearestSlotInTerminals(terminalNumber);
                slot = nearestTerminal?.slots.shift();
                 if (slot && nearestTerminal) {
                     slot.carDetails = carDetails;
                     parkingLot.reservedSlots.find(terminal => terminal.terminalNumber === nearestTerminal?.terminalNumber)?.slots.push(slot);
                     parkingLot.carsWithTerminals[carDetails.registrationNumber] = nearestTerminal.terminalNumber;
                 }

                return {
                    terminalNumber: nearestTerminal?.terminalNumber,
                    slot: slot
                }
            }
        }
    }

    toggleParkingLotComposer = () => {
        this.showParkingLotComposerModal = !this.showParkingLotComposerModal;
    }

    toggleCarSlotComposer = () => {
        this.showCarSlotComposerModal = !this.showCarSlotComposerModal;
    }

    setSelectedParkingLot = (parkingLot: ParkingLot) => {
        this.selectedParkingLot = parkingLot;
    }

    toggleQueryModal = () => {
        this.showQueryDataModal = !this.showQueryDataModal;
    }

    findNearestSlotInTerminals = (terminalNumber: number) => {
        return this.selectedParkingLot?.availableSlots
            .filter(terminal => !!terminal.slots.length)?.map(terminal => {
                return {
                    distance: Math.abs(terminalNumber - terminal.terminalNumber) + terminal.slots[0].ticketNumber,
                    terminal: terminal
                }
            })?.sort((a, b) => a.distance - b.distance)[0]?.terminal;
    }
}
