import {CarDetails, ParkingLot, Slot} from "../resources";
import {action, makeObservable, observable} from "mobx";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

export class RootStore {
    parkingLots: ParkingLot[] = [];
    selectedParkingLotId?: string;

    constructor() {
        makeObservable(this, {
            parkingLots: observable,
            selectedParkingLotId: observable,
            addParkingLot: action,
            addCarInParkingLot: action
        });
    }

    addParkingLot = (name: string, size: number) => {
        this.parkingLots.push({
            id: generateUniqueID(),
            name: name,
            size: size,
            availableSlots: this.generateSlots(size)
        })
    }

    generateSlots = (size: number): Slot[] => {
        const slots: Slot[] = [];
        for (let i = 1; i<= size; i++) {
            slots.push({ticketNumber: i});
        }
        return slots;
    }

    addCarInParkingLot = (carDetails: CarDetails) => {
        const parkingLot = this.parkingLots.find(lot => lot.id === this.selectedParkingLotId);

        if (parkingLot) {
            const slot = parkingLot.availableSlots.shift();
            if (slot) {
                slot.carDetails = carDetails;
                parkingLot.reservedSlots?.push(slot);
            }
        }
    }
}
