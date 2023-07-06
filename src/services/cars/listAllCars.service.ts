import { Car } from "@prisma/client";
import { prismaClient } from "../../database";
import { Request } from "express";

interface iFilter {
  brand: string;
  model: string;
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
interface iFilterOptions {
  brand: string[];
  model: string[];
  color: string[];
  year: string[];
  fuelType: string[];
  price: {
    max: number;
    min: number;
  };
  quilometers: {
    max: number;
    min: number;
  };
}

const listAllCarService = async (queryParams: Request["query"]) => {
  const {
    brand,
    model,
    color,
    year,
    fuelType,
    maxPrice,
    minPrice,
    minQuilometers,
    maxQuilometers,
  } = queryParams;

  let refine = false;

  if (
    brand ||
    model ||
    color ||
    year ||
    fuelType ||
    maxPrice ||
    minPrice ||
    minQuilometers ||
    maxQuilometers
  ) {
    refine = true;
  }

  let filterOptions = await avaliableFilters();

  const filters = {} as iFilter;

  if (brand) {
    filters.brand = brand as iFilter["brand"];
    filterOptions.brand = [brand as string];
  }

  if (model) {
    filters.model = model as iFilter["model"];
    filterOptions.model = [model as string];
  }

  if (color) {
    filters.color = color as iFilter["color"];
    filterOptions.color = [color as string];
  }

  if (year) {
    filters.year = year as iFilter["year"];
    filterOptions.year = [year as string];
  }

  if (fuelType) {
    filters.fuelType = fuelType as iFilter["fuelType"];
    filterOptions.fuelType = [fuelType as string];
  }

  filters.price = {
    lte: +(maxPrice || filterOptions.price.max),
    gte: +(minPrice || filterOptions.price.min),
  };

  filters.quilometers = {
    lte: +(maxQuilometers || filterOptions.quilometers.max),
    gte: +(minQuilometers || filterOptions.quilometers.min),
  };

  const cars = await prismaClient.car.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          userColor: true,
        },
      },
    },
    where: filters,
  });

  if (refine) {
    filterOptions = refineFilterOptions(cars as Car[]);
  }

  const filteredOptions = [
    { brand: filterOptions.brand },
    { model: filterOptions.model },
    { color: filterOptions.color },
    { year: filterOptions.year },
    { fuelType: filterOptions.fuelType },
    { price: { max: filterOptions.price.max, min: filterOptions.price.min } },
    {
      quilometers: {
        max: filterOptions.quilometers.max,
        min: filterOptions.quilometers.min,
      },
    },
  ];

  return {
    filterOptions: filteredOptions,
    cars,
  };
};

async function avaliableFilters(): Promise<iFilterOptions> {
  const prismaBrands = await prismaClient.car.groupBy({
    by: ["brand"],
    _count: {
      brand: true,
    },
  });

  const prismaModels = await prismaClient.car.groupBy({
    by: ["model"],
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

  const brand = prismaBrands.map((item) => item.brand).sort();
  const model = prismaModels.map((item) => item.model).sort();
  const color = prismaColors.map((item) => item.color).sort();
  const year = prismaYears.map((item) => item.year).sort();
  const fuelType = prismaFuelTypes.map((item) => item.fuelType).sort();
  const maxPrice = prices._max.price || 0;
  const minPrice = prices._min.price || 0;
  const maxQuilometers = quilometers._max.quilometers || 0;
  const minQuilometers = quilometers._min.quilometers || 0;

  return {
    brand,
    model,
    color,
    year,
    fuelType,
    price: { max: maxPrice, min: minPrice },
    quilometers: { max: maxQuilometers, min: minQuilometers },
  };
}

function refineFilterOptions(carros: Car[]) {
  const opcoesFiltragem: iFilterOptions = {
    brand: [],
    model: [],
    color: [],
    year: [],
    fuelType: [],
    price: {
      max: 0,
      min: Number.MAX_SAFE_INTEGER,
    },
    quilometers: {
      max: 0,
      min: Number.MAX_SAFE_INTEGER,
    },
  };

  for (let carro of carros) {
    if (carro.brand) {
      opcoesFiltragem.brand = opcoesFiltragem.brand || [];
      if (!opcoesFiltragem.brand.includes(carro.brand)) {
        opcoesFiltragem.brand.push(carro.brand);
      }
    }

    if (carro.model) {
      opcoesFiltragem.model = opcoesFiltragem.model || [];
      if (!opcoesFiltragem.model.includes(carro.model)) {
        opcoesFiltragem.model.push(carro.model);
      }
    }

    if (carro.color) {
      opcoesFiltragem.color = opcoesFiltragem.color || [];
      if (!opcoesFiltragem.color.includes(carro.color)) {
        opcoesFiltragem.color.push(carro.color);
      }
    }

    if (carro.year) {
      opcoesFiltragem.year = opcoesFiltragem.year || [];
      if (!opcoesFiltragem.year.includes(carro.year)) {
        opcoesFiltragem.year.push(carro.year);
      }
    }

    if (carro.fuelType) {
      opcoesFiltragem.fuelType = opcoesFiltragem.fuelType || [];
      if (!opcoesFiltragem.fuelType.includes(carro.fuelType)) {
        opcoesFiltragem.fuelType.push(carro.fuelType);
      }
    }

    if (carro.price) {
      opcoesFiltragem.price.max = Math.max(
        opcoesFiltragem.price.max || 0,
        carro.price
      );
    }

    if (carro.price) {
      opcoesFiltragem.price.min = Math.min(
        opcoesFiltragem.price.min || Number.MAX_SAFE_INTEGER,
        carro.price
      );
    }

    if (carro.quilometers) {
      opcoesFiltragem.quilometers.min = Math.min(
        opcoesFiltragem.quilometers.min || Number.MAX_SAFE_INTEGER,
        carro.quilometers
      );
    }

    if (carro.quilometers) {
      opcoesFiltragem.quilometers.max = Math.max(
        opcoesFiltragem.quilometers.max || 0,
        carro.quilometers
      );
    }
  }

  return opcoesFiltragem;
}

export { listAllCarService };
