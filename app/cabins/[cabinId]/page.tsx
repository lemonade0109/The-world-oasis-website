import Cabin from "@/components/Cabin";
import Reservations from "@/components/Reservations";
import Spinner from "@/components/Spinner";

import { Suspense } from "react";
import { getCabin, getCabins } from "@/lib/data-service";
import { CabinIdNumProp } from "@/types/types";

// export const metadata = {
//   title: 'Cabin',
// }
//! DYNAMIC METADATA
export async function generateMetadata({ params }: CabinIdNumProp) {
  const { name } = await getCabin(params.cabinId);

  return { title: `Cabin ${name}` };
}

//! FUNC TO MAKE A DYNAMIC ROUTE STATIC
export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }: CabinIdNumProp) {
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center text-accent-400 mb-10">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservations cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
