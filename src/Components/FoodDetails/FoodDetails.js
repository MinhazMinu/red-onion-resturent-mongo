import React, { useState, useEffect } from "react";
import "./FoodDetails.css";
// import allFoods from "../../Data/foods.json";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

const FoodDetails = (props) => {
  const { id } = useParams();

  const [currentFood, setCurrentFood] = useState([]);
  useEffect(() => {
    fetch(`https://red-onion-mongp.herokuapp.com/food/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setCurrentFood(data);
      });
  }, []);

  // let currentFood = allFoods.find((food) => food.id == id);

  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (currentFood.quantity) {
      setQuantity(currentFood.quantity);
    }
  }, [currentFood.quantity]);
  const finalCartHandler = (currentFood) => {
    currentFood.quantity = quantity;
    props.cartHandler(currentFood);
  };

  return (
    <div className="food-details my-5 container">
      <div className="row">
        <div className="col-md-6 pr-md-4">
          <div>
            <h1>{currentFood.name}</h1>
            <p className="my-5">{currentFood.fullDescription}</p>
            <div className="d-flex  my-4">
              <h2 className="price">${currentFood.price}</h2>

              <div className="cart-controller ml-3 btn">
                <button
                  className="btn"
                  onClick={() => setQuantity(quantity <= 1 ? 1 : quantity - 1)}
                >
                  -
                </button>{" "}
                {quantity}{" "}
                <button
                  className="btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <button
              className="btn btn-danger btn-rounded mb-2"
              onClick={() => finalCartHandler(currentFood)}
            >
              <FontAwesomeIcon icon={faCartArrowDown} /> Add
            </button>

            <div className="more-images mt-5 ">
              {
                <img
                  className="mr-4"
                  height="150px"
                  src={currentFood.images}
                  alt=""
                />
              }
              {/* {currentFood.images.map((img) => (
                  <img className="mr-4" height="150px" src={img} alt="" />
                ))} */}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <img className="img-fluid" src={currentFood.images} alt="" />
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
