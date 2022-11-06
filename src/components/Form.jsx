import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { carInfo } from "./carInfo";
import { calculateRentPrice } from "./Calculations";
import "./Form.css";

function Form() {
  const { register, handleSubmit } = useForm();

  const [isSubmited, setIsSubmited] = useState(false);

  const [fullData, setFullData] = useState([]);

  const handleForm = (data) => {
    setFullData(calculateRentPrice(data));
    setIsSubmited(true);
  };

  return (
    <div className="container">
      <div className="app-container">
        <h1>Car rent calculator</h1>

        <form onSubmit={handleSubmit(handleForm)}>
          <div className="form-container">
            <label htmlFor="estKm" className="estKm">
              How much kilometers do you want to travel?
            </label>
            <br />
            <input
              {...register("estimatedKmToDrive", { required: true })}
              type="number"
              id="estKm"
            />
            <br />
            <br />
            <label htmlFor="acqirdDL">Year of acqiring driver license</label>
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
            <br />
            <br />
            <input type="submit" value="Calculate" />
          </div>
        </form>
      </div>
      <div
        className="result-container"
        style={isSubmited ? { backgroundColor: "#0c0c0c" } : null}
      >
        {isSubmited
          ? fullData.map((item) => (
              <>
                <p key={item.id}>
                  {item.title} {item.value}pln
                </p>
                <br />
              </>
            ))
          : null}
      </div>
    </div>
  );
}

export default Form;
