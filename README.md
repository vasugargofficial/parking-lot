**Problem Statement:**

Design a parking lot which can hold n cars of different color and different registration numbers.

Every car has been issued a ticket for a spot and the spot has been assigned based on the nearest to the entry point.

The system should also return some queries such as:

* Registration numbers of all cars of a particular Color.
* Ticket number in which a car with a given registration number is placed.
* Ticket numbers of all ticket where a car of a particular color is placed.

**Solution Approch:**

To enable the user to create mutltiple parking lots, I have created a list of parking lots where every parking lot have 

* Size => Max number of slots available
* Reserved slots (Array of object of terminals)
* Available slots (Array of object of terminals)
* Name of parking lot
* Number of entry points

Terminal will have

* Terminal number
* Slots

Every slot will have 

* Slot number (Number also denotes the distance from the entry point)
* Car Details

Car details will include

* Car registration number
* Car color (Enum of common color names)


**How Parking slot is getting assigned based on distance from entry point?**

1- Take the number of entry points from the user and also ask division of slots by entry points.

2- Create the list of slots for every terminal where car details will be undefined and slot numbers will be initialized by consecutive numners till size of that entry point.

3- On Car park, shift the list of that terminal where car is waiting so we will have the slot number of that car because shift will always return the first element.

4- Add this slot in reserved slot for that entry point.

5- While parking car, make a map of car and their entry points so that on exit or searching the car we will not need to search in whole parking lot.








 
