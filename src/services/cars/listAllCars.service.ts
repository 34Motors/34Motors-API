import { prismaClient } from "../../database";

const listAllCarService = async () => {
  const cars = await prismaClient.car.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  const filters = await avaliableFilters();

  return {
    filters,
    cars,
  };
};

async function avaliableFilters() {
  const prismaBrands = await prismaClient.car.groupBy({
    by: ["brand"],
    _count: {
      brand: true,
    },
  });

  const prismaColors = await prismaClient.car.groupBy({
    by: ["color"],
    _count: {
      color: true,
    },
  });

  const prismaYears = await prismaClient.car.groupBy({
    by: ["year"],
    _count: {
      year: true,
    },
  });

  const prismaFuelTypes = await prismaClient.car.groupBy({
    by: ["fuelType"],
    _count: {
      fuelType: true,
    },
  });

  const prices = await prismaClient.car.aggregate({
    _min: { price: true },
    _max: { price: true },
  });

  const quilometers = await prismaClient.car.aggregate({
    _min: { quilometers: true },
    _max: { quilometers: true },
  });

  const brands = prismaBrands.map((item) => item.brand);
  const colors = prismaColors.map((item) => item.color);
  const years = prismaYears.map((item) => item.year);
  const fuelTypes = prismaFuelTypes.map((item) => item.fuelType);
  const maxPrice = prices._max.price;
  const minPrice = prices._min.price;
  const maxQuilometers = quilometers._max.quilometers;
  const minQuilometers = quilometers._min.quilometers;

  return {
    maxPrice,
    minPrice,
    maxQuilometers,
    minQuilometers,
    brands,
    colors,
    years,
    fuelTypes,
  };
}

export { listAllCarService };
