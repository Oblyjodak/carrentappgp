import { carInfo } from "./carInfo";
import Swal from "sweetalert2";

export const calculateRentPrice = (data) => {
  const { estimatedKmToDrive, acqiredDriverLicense, carCategory } = data;
  const rentDateFrom = new Date(data.rentDateFrom).getTime();
  const rentDateTo = new Date(data.rentDateTo).getTime();
  const carCategorySelected = carInfo[carCategory].Category;
  const carAvailability = carInfo[carCategory].Availability;
  const carId = carInfo[carCategory].id;

  const oneDayPrice = 100;
  const rentDays = parseInt(rentDateTo / 84000000 - rentDateFrom / 84000000);
  const rentDaysPrice = parseInt(oneDayPrice * rentDays);

  const carCategoryPricing = {
    Basic: rentDaysPrice,
    Standard: rentDaysPrice * 1.3,
    Medium: rentDaysPrice * 1.6,
    Premium: rentDaysPrice * 2,
  };
  let carCategoryPrice = carCategoryPricing[carCategorySelected];

  const currentYear = new Date().getFullYear();
  const yearsDriverLicense = currentYear - acqiredDriverLicense;
  if (yearsDriverLicense < 5) {
    carCategoryPrice *= 1.2;
  }

  const premiumCatAlert = () => {
    Swal.fire({
      title: "Błąd",
      text: "Nasza wypożyczalnia nie pozwala na wypożyczenie pojazdu kategorii premium osobom posiadającym prawo jazdy któcej niż 3 lata! Możesz zobaczyć koszty wynajmu ale twój wniosek zostanie utomatycznie odrzucony.",
      icon: "error",
      confirmButtonText: "Okej",
    });
  };

  if (yearsDriverLicense < 3 && carCategorySelected === "Premium") {
    premiumCatAlert();
  }
  if (carAvailability <= 3) {
    Math.trunc((carCategoryPrice *= 1.15));
  }

  const gasPricePerLiter = 6.71;
  const totalGasPrice =
    Math.trunc((carInfo[carId].Combustion * estimatedKmToDrive) / 100) *
    gasPricePerLiter;

  const bruttoPrice = Math.trunc(
    rentDaysPrice + carCategoryPrice + totalGasPrice
  );
  const nettoPrice = Math.trunc(bruttoPrice * 1.23);

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
    { id: "netto_price", title: "Netto price ", value: Math.trunc(nettoPrice) },
    {
      id: "brutto_price",
      title: "Total (brutto) price ",
      value: Math.trunc(bruttoPrice),
    },
  ];
};
