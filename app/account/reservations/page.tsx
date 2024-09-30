import Link from "next/link";

import ReservationLists from "@/components/ReservationLists";
import { auth } from "@/lib/auth";
import { getBookings } from "@/lib/data-service";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  const session: any = await auth();
  const bookings = (await getBookings(session?.user?.guestId)) as any;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationLists bookings={bookings} />
      )}
    </div>
  );
}
