import { useEffect, useState } from "react";
import axios from "axios";

function Rooms() {

  const [rooms, setRooms] = useState([]);
  const [type, setType] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getRooms();
  }, [type]);

  const getRooms = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/rooms?type=${type}`
      );

      setRooms(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const filteredRooms = rooms.filter((room) =>
    room.room_no.toString().includes(search)
  );

  return (

    <div className="container">

      <h1>🏨 Hostel Rooms</h1>

      <div className="top-bar">

        <input
          type="text"
          placeholder="Search Room Number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>All</option>
          <option>Single</option>
          <option>Double</option>
          <option>Triple</option>
        </select>

      </div>

      <div className="room-grid">

        {

          filteredRooms.map((room) => (

            <div className="room-card" key={room.id}>

              <h2>Room {room.room_no}</h2>

              <p><b>Type :</b> {room.room_type}</p>

              <p><b>Floor :</b> {room.floor}</p>

              <p><b>Capacity :</b> {room.capacity}</p>

              <p><b>Price :</b> ₹{room.price}</p>

              <p>
                <b>Status :</b>

                <span
                  style={{
                    color:
                      room.status === "Available"
                        ? "green"
                        : "red",
                    fontWeight: "bold",
                    marginLeft: "8px"
                  }}
                >
                  {room.status}
                </span>

              </p>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default Rooms;