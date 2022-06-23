import {CarDetails, ParkingLot, Slot} from "../resources";
import {action, makeObservable, observable} from "mobx";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {Color} from "../enums";

export class ParkingFormData {
    parkingName: string | null = null;
    parkingSize: number | null = null;
    carRegistrationNumber: string | null = null;
    carColor: Color = Color.WHITE;

    constructor() {
        makeObservable(this, {
            parkingName: observable,
            parkingSize: observable,
            carRegistrationNumber: observable,
            carColor: observable,
            updateValue: action,
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
            showQueryDataModal: observable,

        });
    }

    addParkingLot = (name: string, size: number) => {
        this.parkingLots.push({
            id: generateUniqueID(),
            name: name,
            size: size,
            availableSlots: this.generateSlots(size),
            reservedSlots: []
        });
    }

    generateSlots = (size: number): Slot[] => {
        const slots: Slot[] = [];
        for (let i = 1; i<= size; i++) {
            slots.push({ticketNumber: i});
        }
        return slots;
    }

    addCarInParkingLot = (carDetails: CarDetails) => {
        const parkingLot = this.parkingLots.find(lot => lot.id === this.selectedParkingLot?.id);
        if (parkingLot) {
            const slot = parkingLot.availableSlots.shift();
            if (slot) {
                slot.carDetails = carDetails;
                parkingLot.reservedSlots?.push(slot);
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
}
