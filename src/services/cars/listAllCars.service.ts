import { prismaClient } from "../../database";
import { Request } from "express";

interface filter {
  brand: string;
  color: string;
  year: string;
  fuelType: "Flex" | "Hibrido" | "Eletrico";
  price: {
    lte: number;
    gte: number;
  };
  quilometers: {
    lte: number;
    gte: number;
  };
}

const listAllCarService = async (queryParams: Request["query"]) => {
  const filterOptions = await avaliableFilters();

  const {
    brand,
    color,
    year,
    fuelType,
    maxPrice,
    minPrice,
    minQuilometers,
    maxQuilometers,
  } = queryParams;

  const filters = {} as filter;

  if (brand) {
    filters.brand = brand as filter["brand"];
  }

  if (color) {
    filters.color = color as filter["color"];
  }

  if (year) {
    filters.year = year as filter["year"];
  }

  if (fuelType) {
    filters.fuelType = fuelType as filter["fuelType"];
  }

  filters.price = {
    lte: +(maxPrice || filterOptions.maxPrice),
    gte: +(minPrice || filterOptions.minPrice),
  };

  filters.quilometers = {
    lte: +(maxQuilometers || filterOptions.maxQuilometers),
    gte: +(minQuilometers || filterOptions.minQuilometers),
  };

  const cars = await prismaClient.car.findMany({
    include: {
      user: {
        select: {
          name: true,
          id:true
        },
      },
    },
    where: filters,
  });

  return {
    filterOptions,
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
  const maxPrice = prices._max.price || 0;
  const minPrice = prices._min.price || 0;
  const maxQuilometers = quilometers._max.quilometers || 0;
  const minQuilometers = quilometers._min.quilometers || 0;

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
