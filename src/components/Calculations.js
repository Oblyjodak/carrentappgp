import { carInfo } from "./carInfo";

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
  if (yearsDriverLicense < 3 && carCategorySelected === "Premium") {
    return alert(
      "Nasza wypożyczalnia nie pozwala na wypożyczenie pojazdu kategorii premium osobom posiadającym prawo jazdy któcej niż 3 lata!"
    );
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
    { name: "Price for all days ", value: Math.trunc(rentDaysPrice) },
    { name: "Car category price ", value: Math.trunc(carCategoryPrice) },
    { name: "Gas price ", value: Math.trunc(totalGasPrice) },
    { name: "Netto price ", value: Math.trunc(nettoPrice) },
    { name: "Total (brutto) price ", value: Math.trunc(bruttoPrice) },
  ];
};
