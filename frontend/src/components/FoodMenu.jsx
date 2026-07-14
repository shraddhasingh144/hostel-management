import React, { useState, useEffect } from "react";
import axios from "axios";

function FoodMenu() {

  const [menuList, setMenuList] = useState([]);


  useEffect(() => {
    getMenu();
  }, []);



  const getMenu = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/food-menu"
      );

      setMenuList(res.data);

    } catch(err) {

      console.log(err);

    }

  };



  return (

    <div className="container">

      <h2>🍽 Hostel Weekly Food Menu</h2>


      {
        menuList.length === 0 ?

        <p>No Menu Available</p>

        :

        menuList.map((item)=>(

          <div className="card" key={item.id}>

            <h3>📅 {item.day}</h3>

            <p>
              🌅 Breakfast : {item.breakfast}
            </p>

            <p>
              🍛 Lunch : {item.lunch}
            </p>

            <p>
              🌙 Dinner : {item.dinner}
            </p>

          </div>

        ))

      }


    </div>

  );

}

export default FoodMenu;