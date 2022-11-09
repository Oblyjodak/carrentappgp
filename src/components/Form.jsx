import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { carInfo } from "./carInfo";
import { calculateRentPrice } from "./Calculations";

import { GiRoad } from "react-icons/gi";
import { MdBadge } from "react-icons/md";
import { FaCarSide } from "react-icons/fa";
import "./Form.css";

function Form() {
  const { register, handleSubmit } = useForm();

  const [fullData, setFullData] = useState([
    {
      id: "all_days_price",
      title: "Price for all days",
      value: "-",
    },
    {
      id: "car_category_price",
      title: "Car category price",
      value: "-",
    },
    { id: "gas_price", title: "Gas price", value: "-" },
    { id: "netto_price", title: "Netto price", value: "-" },
    {
      id: "brutto_price",
      title: "Total (brutto) price",
      value: "-",
    },
  ]);

  const handleForm = (data) => {
    setFullData(calculateRentPrice(data));
  };

  return (
    <div className="container">
      <div className="app-container">
        <h1>
          Car <span style={{ color: "rgb(36, 145, 255)" }}>rent</span>{" "}
          calculator
        </h1>
        <h6 style={{ color: "rgb(36, 145, 255)" }}>
          <p>
            Calculator that helps you easly calculate the car rental costs based
            on,
          </p>{" "}
          kilometers that you want to travel, year of acqiring the driver
          license (if its lower than 5 years price will be incrised by 15% due
          to unexperienced driver),{" "}
          <p>
            {" "}
            category that you want to rent and the number of days (base price
            for day is 100 pln)
          </p>
        </h6>
        <form onSubmit={handleSubmit(handleForm)}>
          <div className="form-container">
            <div className="inputs">
              <label htmlFor="estKm" className="estKm">
                Kilometers to travel
              </label>
              <br />
              <div className="input-icons">
                <GiRoad className="theicon" size={24} stroke-width={8} />
                <input
                  {...register("estimatedKmToDrive", { required: true })}
                  type="number"
                  id="estKm"
                />
              </div>

              <br />
              <label htmlFor="acqirdDL">Year of driver license</label>
              <br />
              <div className="input-icons">
                <MdBadge className="theicon" size={24} />
                <input
                  {...register("acqiredDriverLicense", {
                    minLength: 4,
                    required: true,
                  })}
                  type="number"
                  id="acqirdDL"
                />
              </div>
              <br />

              <label htmlFor="carSelector">Choose your car</label>
              <br />
              <div className="input-icons">
                <FaCarSide className="theicon" size={24} />
                <select id="carSelector" {...register("carCategory")}>
                  {carInfo.map((car) => (
                    <option value={car.id} key={car.id}>
                      {car.name} ({car.Category})
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <label>Choose rent date</label>
              <br />
            </div>

            <div className="date-inputs">
              <input
                type="date"
                {...register("rentDateFrom", { required: true })}
              />
              {" - "}

              <input
                type="date"
                {...register("rentDateTo", { required: true })}
              />
            </div>

            <br />
            <input type="submit" value="Calculate" />
          </div>
        </form>

        <hr />
        <div className="result-container">
          <div className="result-items">
            {fullData.map((item) => (
              <>
                <span
                  key={item.id}
                  style={{ margin: "15px", backgroundColor: "" }}
                >
                  {item.title}{" "}
                  <p style={{ margin: "15px" }} key={item.id}>
                    {item.value}
                  </p>
                </span>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
