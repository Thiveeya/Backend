//Modules
const express = require('express');
const app = express();
const cors = require('cors');


//Middleware
app.use(cors());
app.use(express.json());

//Create room details
let Room = [{
    "room_id": 1,
    "room_name": "Meeting Room",
    "seats_available": 50,
    "amenities_available": ["Projector", "LED-Tv", "Sound-bar"],
    "price_per_hour": 50,
    "booked_status": true
}, {
    "room_id": 2,
    "room_name": "Small function Room",
    "seats_available": 100,
    "amenities_available": ["Projector", "LED-Tv", "Sound-bar"],
    "price_per_hour": 100,
    "booked_status": true
}, {
    "room_id": 3,
    "room_name": "Large function Room",
    "seats_available": 200,
    "amenities_available": ["Projector", "LED-Tv", "Sound-bar"],
    "price_per_hour": 200,
    "booked_status": false
}];

//Create roombookedcustomers
let RoomBookedCustomers = [{
    "customer_name": "Ramkumar",
    "date": "2023-07-12",
    "start_time": "14:00",
    "end_time": "16:00",
    "room_id": 1

    },

   {"customer_name": "Thiveeya",
    "date": "2023-07-17",
    "start_time": "15:00",
    "end_time": "20:00",
    "room_id": 2
   }
    ];

//create customers list
let Customers = [{
    "customer_name": "Ramkumar",
    "date": "2023-07-17",
    "start_time": "14:00",
    "end_time": "16:00",
    "room_id": 1,
    "room_name": "Meeting Room",
    "booking_status": "Booked"
   },

   {
    "customer_name": "Thiveeya",
    "date": "2023-07-17",
    "start_time": "15:00",
    "end_time": "20:00",
    "room_id": 2,
    "room_name": "Small function Room",
    "booking_status": "Booked"
   }
    

]



//endpoint to get all rooms
app.get('/room', (req, res) => {
    res.status(200).json(Room);
});


//endpoint to book Room
app.post('/bookroom/:id', (req, res) => {
    const id = Number(req.params.id);
    const room = Room.find(room => room.room_id === id && room.booked_status === false);
    if (room) {

        let Roomname = Room.find(room => room.room_id === id);
        Room = Room.map(room => room.room_id == id ? { ...room, "booked_status": true } : room);
        RoomBookedCustomers = RoomBookedCustomers.concat([{ ...req.body, "room_id": id }]);
        Customers = Customers.concat([{ ...req.body, "room_id": id, "room_name": Roomname.room_name, "booking_status": "Booked" }]);
        res.status(201).json({ message: "Room booked successfully" });

    } else {
        res.status(404).json({ message: "Room already booked" });
    }
});

//endpoint to check all booked rooms with customer data
app.get('/bookedroom', (req, res) => {
    let BookedRooms = Room.filter(room => room.booked_status === true);
    BookedRooms = BookedRooms.map(room => {
        let customerDetail = RoomBookedCustomers.find(bookedroom => room.room_id === bookedroom.room_id);
        return ({
            "booked_status": "Booked",
            "room_name": room.room_name,
            "customer_name": customerDetail.customer_name,
            "date": customerDetail.date,
            "start_time": customerDetail.start_time,
            "end_time": customerDetail.end_time,
            "room_id": customerDetail.room_id
        })
    });
    if (BookedRooms.length) {
        res.status(200).json(BookedRooms);
    } else {
        res.status(404).json({ message: "Rooms not booked" });
    }
});

//List all customers with booked data
app.get('/customers', (req, res) => {
    let Customer = Customers.map(customer => {
        let Customer_Room = Room.find(room => room.room_id === customer.room_id);
        return (customer)
    });
    if (Customer.length) {
        res.status(200).json(Customer);
    } else {
        res.status(404).json({ message: "Rooms booking service not started" });
    }
})

//List how many times customer booked the rooms with customer name
app.get('/customer/:name', (req, res) => {
    let CusName = req.params.name;
    let BookedCustomers = Customers.filter(customer => customer.customer_name.toLowerCase() === CusName.toLowerCase())
    if (BookedCustomers.length) {
        res.status(200).json(BookedCustomers);
    } else {
        res.status(404).json({ message: "Customer name  not available" });
    }
})

//Remove/delete room booking
app.post('/cancelbooking/:id', (req, res) => {
    const id = Number(req.params.id);
    const room = Room.find(room => room.room_id == id && room.booked_status === true);
    if (room) {

        Room = Room.map(room => room.room_id == id ? { ...room, "booked_status": false } : room);
        RoomBookedCustomers = RoomBookedCustomers.filter(customer => customer.room_id != id)
        res.status(201).json({ message: "Room booking status successfully changed " });

    } else {
        res.status(404).json({ message: "Room booking not available" });
    }
});


//server listen
const PORT = 3001;
app.listen(PORT, () => {
    console.log("Server Running");
})