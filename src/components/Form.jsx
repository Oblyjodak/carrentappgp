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
  console.log(fullData);
  return (
    <div className="container">
      <div>
        <h1>Car rent calculator</h1>
      </div>
      <br />
      <form onSubmit={handleSubmit(handleForm)}>
        <div className="formContainer">
          <label htmlFor="estKm">
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
          <br />{" "}
          <input
            type="date"
            {...register("rentDateFrom", { required: true })}
          />
          <br />
          <br />
          <input type="date" {...register("rentDateTo", { required: true })} />
          <br />
          <br />
          <br />
          <input type="submit" value="Calculate" />
        </div>
      </form>
      <div>
        {isSubmited
          ? fullData.map((item) => (
              <>
                <span key={item.name}>
                  {item.name} {item.value}pln
                </span>
                <br />
              </>
            ))
          : null}
      </div>
    </div>
  );
}

export default Form;
