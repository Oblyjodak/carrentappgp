import { carInfo } from "./carInfo";
import Swal from "sweetalert2";

const premiumCatAlert = () => {
  Swal.fire({
    title: "Error",
    text: "Our rental service doesnt let drivers which have driver license under 3 years to rent Premium car. You can still see the costs but your application will automatically be rejected",
    icon: "error",
    confirmButtonText: "Okej",
  });
};

const incorrentYear = () => {
  Swal.fire({
    title: "Error",
    text: "Incorrect year of acqireing driver license.",
    icon: "error",
    confirmButtonText: "Okej",
  });
};

const incorrentRentDate = () => {
  Swal.fire({
    title: "Error",
    text: "Incorrect rent date.",
    icon: "error",
    confirmButtonText: "Okej",
  });
};

export const calculateRentPrice = (data) => {
  const { estimatedKmToDrive, acqiredDriverLicense, carCategory } = data;
  const rentDateFrom = new Date(data.rentDateFrom).getTime();
  const rentDateTo = new Date(data.rentDateTo).getTime();
  const carCategorySelected = carInfo[carCategory].Category;
  const carAvailability = carInfo[carCategory].Availability;
  const carId = carInfo[carCategory].id;

  const oneDayPrice = 100;
  const milisecondsInDays = 84000000;
  const rentDays = parseInt(
    rentDateTo / milisecondsInDays - rentDateFrom / milisecondsInDays
  );
  const rentDaysPrice = parseInt(oneDayPrice * rentDays);

  if (rentDays < 1) {
    incorrentRentDate();
  }

  const standardMultiplier = 1.3;
  const mediumMultiplier = 1.6;
  const premiumMultiplier = 2;
  const carCategoryPricing = {
    Basic: rentDaysPrice,
    Standard: rentDaysPrice * standardMultiplier,
    Medium: rentDaysPrice * mediumMultiplier,
    Premium: rentDaysPrice * premiumMultiplier,
  };
  let carCategoryPrice = carCategoryPricing[carCategorySelected];

  const currentYear = new Date().getFullYear();
  const yearsDriverLicense = currentYear - acqiredDriverLicense;
  const lowDLYearsCharge = 1.2;
  if (yearsDriverLicense < 5) {
    carCategoryPrice *= lowDLYearsCharge;
  }

  if (yearsDriverLicense < 3 && carCategorySelected === "Premium") {
    premiumCatAlert();
  }

  if (acqiredDriverLicense < 1922 || acqiredDriverLicense > 2022) {
    incorrentYear();
  }
  const lowCarAvailability = 1.15;
  if (carAvailability <= 3) {
    Math.trunc((carCategoryPrice *= lowCarAvailability));
  }

  const gasPricePerLiter = 6.71;
  const totalGasPrice =
    Math.trunc((carInfo[carId].Combustion * estimatedKmToDrive) / 100) *
    gasPricePerLiter;

  const bruttoPrice = Math.trunc(
    rentDaysPrice + carCategoryPrice + totalGasPrice
  );
  const vatValue = 1.23;
  const nettoPrice = Math.trunc(bruttoPrice * vatValue);

  return [
    {
      id: "all_days_price",
      title: "Price for all days ",
      value: Math.trunc(rentDaysPrice),
    },
    {
      id: "car_category_price",
      title: "Car category price ",
      value: Math.trunc(carCategoryPrice),
    },
    { id: "gas_price", title: "Gas price ", value: Math.trunc(totalGasPrice) },
    {
      id: "netto_price",
      title: "Netto price ",
      value: Math.trunc(nettoPrice),
    },
    {
      id: "brutto_price",
      title: "Total (brutto) price ",
      value: Math.trunc(bruttoPrice),
    },
  ];
};
