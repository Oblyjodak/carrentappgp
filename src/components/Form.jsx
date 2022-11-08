import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { carInfo } from "./carInfo";
import { calculateRentPrice } from "./Calculations";
import "./Form.css";

function Form() {
  const { register, handleSubmit } = useForm();

  const [fullData, setFullData] = useState([
    {
      id: "all_days_price",
      title: "",
      value: "-",
    },
    {
      id: "car_category_price",
      title: "",
      value: "-",
    },
    { id: "gas_price", title: "", value: "-" },
    { id: "netto_price", title: "", value: "-" },
    {
      id: "brutto_price",
      title: "",
      value: "-",
    },
  ]);

  const handleForm = (data) => {
    setFullData(calculateRentPrice(data));
  };

  return (
    <div className="container">
      <div className="app-container">
        <h1>Car rent calculator</h1>
        <h6 style={{ fontWeight: "100" }}>
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

              <input
                {...register("estimatedKmToDrive", { required: true })}
                type="number"
                id="estKm"
              />

              <br />
              <br />
              <label htmlFor="acqirdDL">Year of driver license</label>
              <br />

              <input
                {...register("acqiredDriverLicense", { minLength: 4 })}
                type="number"
                id="acqirdDL"
              />

              <br />
              <br />

              <label htmlFor="carSelector">Choose your car</label>
              <br />

              <select id="carSelector" {...register("carCategory")}>
                {carInfo.map((car) => (
                  <option value={car.id} key={car.id}>
                    {car.name} ({car.Category})
                  </option>
                ))}
              </select>

              <br />
              <br />
              <label>Choose rent date</label>
              <br />
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
            </div>
            <br />
            <br />
            <input type="submit" value="Calculate" />
          </div>
        </form>

        <hr />
        <div className="result-container">
          <div class="result-items">
            {fullData.map((item) => (
              <>
                <span key={item.id} style={{ margin: "15px" }}>
                  {item.title} <p style={{ margin: "15px" }}>{item.value}</p>
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
