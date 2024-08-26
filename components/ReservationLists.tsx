"use client";

import React, { useOptimistic } from "react";

import ReservationCard from "./ReservationCard";
import { deleteBooking } from "@/lib/action";
import { BookingPropsArray } from "@/types/interfaces";

const ReservationLists = ({ bookings }: BookingPropsArray) => {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, booikingId) => {
      return curBookings.filter((booking) => booking.id !== booikingId);
    }
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default ReservationLists;
