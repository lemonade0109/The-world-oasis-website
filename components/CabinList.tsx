import React from "react";

import CabinCard from "./CabinCard";
import { getCabins } from "@/lib/data-service";

const CabinList = async ({ filter }: { filter: string }) => {
  const cabins = await getCabins();

  if (!cabins.length) return null;

  let displayCabins;

  if (filter === "all") {
    displayCabins = cabins;
  }
  if (filter === "small") {
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity! <= 3);
  }
  if (filter === "medium") {
    displayCabins = cabins.filter(
      (cabin) => cabin.maxCapacity! >= 4 && cabin.maxCapacity! <= 7
    );
  }
  if (filter === "large") {
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity! >= 8);
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayCabins?.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
};

export default CabinList;
