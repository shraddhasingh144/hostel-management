require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


// ================= Dashboard =================

app.get("/dashboard", (req, res) => {

    const sql = `
SELECT
(SELECT COUNT(*) FROM rooms) AS totalRooms,
(SELECT COUNT(*) FROM rooms WHERE status='Available') AS availableRooms,
(SELECT COUNT(*) FROM rooms WHERE status='Booked') AS bookedRooms,
(SELECT COUNT(*) FROM bookings) AS totalBookings,
(SELECT COUNT(*) FROM payments) AS totalPayments,
(SELECT COUNT(*) FROM attendance) AS totalAttendance,
(SELECT COUNT(*) FROM food_requests) AS foodRequests,
(SELECT COUNT(*) FROM medical_emergency) AS medicalRequests,
(SELECT COUNT(*) FROM complaints) AS complaints
`;
db.query(sql,(err,result)=>{

        if(err)
        return res.status(500).json(err);

        res.json(result[0]);

    });

});



// ================= Get Rooms =================

app.get("/rooms",(req,res)=>{

    const type=req.query.type;

    let sql="SELECT * FROM rooms";

    let values=[];


    if(type && type!="All")
    {
        sql+=" WHERE room_type=?";
        values.push(type);
    }


    db.query(sql,values,(err,result)=>{

        if(err)
        return res.status(500).json(err);


        res.json(result);

    });

});



// ================= Available Rooms =================

app.get("/available-rooms",(req,res)=>{

    db.query(
        "SELECT * FROM rooms WHERE status='Available'",
        (err,result)=>{

            if(err)
            return res.status(500).json(err);


            res.json(result);

        }
    );

});



// ================= Booking List =================

app.get("/bookings",(req,res)=>{


    db.query(
        "SELECT * FROM bookings ORDER BY id DESC",
        (err,result)=>{

            if(err)
            return res.status(500).json(err);


            res.json(result);

        }
    );


});



// ================= Book Room =================

app.post("/book",(req,res)=>{


const {
student_name,
email,
phone,
course,
room_no
}=req.body;



db.query(
"SELECT * FROM rooms WHERE room_no=? AND status='Available'",
[room_no],
(err,result)=>{


if(err)
return res.status(500).json(err);


if(result.length===0)
{
return res.json({
success:false,
message:"Room not available"
});
}



const sql=`
INSERT INTO bookings
(student_name,email,phone,course,room_no)
VALUES(?,?,?,?,?)
`;



db.query(
sql,
[
student_name,
email,
phone,
course,
room_no
],
(err)=>{


if(err)
return res.status(500).json(err);



db.query(
"UPDATE rooms SET status='Booked' WHERE room_no=?",
[room_no]
);
db.query(
"INSERT INTO notifications(student_name,message) VALUES(?,?)",
[
student_name,
"Thank you for registering in our Hostel."
]
);


res.json({

success:true,
message:"Room Booked Successfully"

});


});


});


});



// ================= Cancel Booking =================


app.delete("/booking/:id",(req,res)=>{


const id=req.params.id;



db.query(
"SELECT room_no FROM bookings WHERE id=?",
[id],
(err,result)=>{


if(err)
return res.status(500).json(err);



if(result.length===0)
return res.json({
message:"Booking not found"
});



const room=result[0].room_no;



db.query(
"DELETE FROM bookings WHERE id=?",
[id],
(err)=>{


if(err)
return res.status(500).json(err);

db.query(
"INSERT INTO notifications(student_name,message) SELECT student_name,'Your hostel registration has been cancelled.' FROM bookings WHERE id=?",
[id]
);


db.query(
"UPDATE rooms SET status='Available' WHERE room_no=?",
[room]
);


res.json({

success:true,
message:"Booking Cancelled"

});



});


});


});
// ================= Payment =================

app.post("/payment", (req, res) => {

    const {
        student_name,
        room_no,
        amount,
        payment_method
    } = req.body;

    const transaction_id = "TXN" + Date.now();

    db.query(
        `INSERT INTO payments
        (student_name, room_no, amount, payment_method, transaction_id, payment_status)
        VALUES(?,?,?,?,?,?)`,
        [
            student_name,
            room_no,
            amount,
            payment_method,
            transaction_id,
            "Paid"
        ],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                message: "Payment Successful"
            });

        }
    );

});
// ================= Attendance =================

app.post("/attendance", (req, res) => {

    const {
        student_name,
        room_no,
        attendance_date,
        status
    } = req.body;

    db.query(
        `INSERT INTO attendance
        (student_name,room_no,attendance_date,status)
        VALUES(?,?,?,?)`,
        [
            student_name,
            room_no,
            attendance_date,
            status
        ],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                message: "Attendance Saved"
            });

        }
    );

});
// ================= Food Menu =================

app.post("/food-menu", (req, res) => {

    const {
        day,
        breakfast,
        lunch,
        dinner
    } = req.body;

    db.query(
        `INSERT INTO food_menu
        (day,breakfast,lunch,dinner)
        VALUES(?,?,?,?)`,
        [
            day,
            breakfast,
            lunch,
            dinner
        ],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                message: "Menu Added"
            });

        }
    );

});
// ================= Food Request =================

app.post("/food-request", (req, res) => {

    const {
        student_name,
        room_no,
        request_menu
    } = req.body;

    db.query(
        `INSERT INTO food_requests
        (student_name,room_no,request_menu)
        VALUES(?,?,?)`,
        [
            student_name,
            room_no,
            request_menu
        ],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                message: "Request Sent"
            });

        }
    );

});
// ================= Medical =================

app.post("/medical", (req, res) => {

    const {
        student_name,
        room_no,
        emergency_type,
        description,
        contact_number
    } = req.body;

    db.query(
        `INSERT INTO medical_emergency
        (student_name,room_no,emergency_type,description,contact_number)
        VALUES(?,?,?,?,?)`,
        [
            student_name,
            room_no,
            emergency_type,
            description,
            contact_number
        ],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                message: "Emergency Submitted"
            });

        }
    );

});
// ================= Complaint =================

app.post("/complaint", (req, res) => {

    const {
        student_name,
        room_no,
        complaint
    } = req.body;

    db.query(
        `INSERT INTO complaints
        (student_name,room_no,complaint)
        VALUES(?,?,?)`,
        [
            student_name,
            room_no,
            complaint
        ],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                message: "Complaint Submitted"
            });

        }
    );

});
// ================= Notification =================

app.post("/notification", (req, res) => {

    const { student_name, message } = req.body;

    db.query(

        "INSERT INTO notifications(student_name,message) VALUES(?,?)",

        [student_name, message],

        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true
            });

        }

    );

});
// ================= Notification =================

app.post("/notification", (req, res) => {

    const { student_name, message } = req.body;

    db.query(

        "INSERT INTO notifications(student_name,message) VALUES(?,?)",

        [student_name, message],

        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                message: "Notification Saved"
            });

        }

    );

});
// ================= Register =================

app.post("/register", (req, res) => {

    const { name, email, password } = req.body;

    db.query(

        "INSERT INTO users(name,email,password) VALUES(?,?,?)",

        [name, email, password],

        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                message: "Registration Successful"
            });

        }

    );

});
// ================= Login =================

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    db.query(

        "SELECT * FROM users WHERE email=? AND password=?",

        [email, password],

        (err, result) => {

            if (err)
                return res.status(500).json(err);

            if (result.length === 0) {

                return res.json({
                    success: false,
                    message: "Invalid Login"
                });

            }

            res.json({
                success: true,
                user: result[0]
            });

        }

    );

});
// ================= Get Attendance =================

app.get("/attendance",(req,res)=>{

    db.query(
        "SELECT * FROM attendance ORDER BY id DESC",
        (err,result)=>{

            if(err)
                return res.status(500).json(err);

            res.json(result);

        }
    );

});
app.get("/food-request",(req,res)=>{

    db.query(
        "SELECT * FROM food_requests ORDER BY id DESC",
        (err,result)=>{

            if(err)
                return res.status(500).json(err);

            res.json(result);

        }
    );

});
app.get("/complaint",(req,res)=>{

    db.query(
        "SELECT * FROM complaints ORDER BY id DESC",
        (err,result)=>{

            if(err)
                return res.status(500).json(err);

            res.json(result);

        }
    );

});
app.get("/medical",(req,res)=>{

    db.query(
        "SELECT * FROM medical_emergency ORDER BY id DESC",
        (err,result)=>{

            if(err)
                return res.status(500).json(err);

            res.json(result);

        }
    );

});
// ================= Get Food Menu =================

app.get("/food-menu",(req,res)=>{

    db.query(
        "SELECT * FROM food_menu",
        (err,result)=>{

            if(err)
                return res.status(500).json(err);

            res.json(result);

        }
    );

});

app.listen(
process.env.PORT,
()=>{

console.log(
`Server Running on Port ${process.env.PORT}`
);

}
);