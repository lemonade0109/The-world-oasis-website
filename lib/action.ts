"use server";
//BACKEND

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";

import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";
import { BookingdData } from "@/types/interfaces";

//! MAKES YOUR WEB INTERACTIVE (CLIENT SIDE SENDING DATA TO THE SERVER SIDE)
export async function updateGuestProfile(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID") as string;
  const [nationality, countryFlag] = formData
    .get("nationality")
    ?.toString()
    .split("%") as string[];

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user?.guestId!)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
}

export async function createBooking(
  bookingData: BookingdData,
  formData: FormData
) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user?.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: String(formData.get("observations")?.slice(0, 1000)),
    extraPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId: number) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  //EXTRA SAFETY TO ENSURE ONLY AUTH GUEST CAN DELETE IT'S RESERVATION
  const guestBookings = await getBookings(session.user?.guestId!);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData: FormData) {
  // 1) AUTHENTICATION
  const session = await auth();
  if (!session) throw new Error("You must be logged in ");

  // 2) GETTING & BUILDING UPDATE DATA
  const bookingId = Number(formData.get("bookingId")) as number;
  const numGuests = Number(formData.get("numGuests")) as number;
  const observations = formData.get("observations")?.slice(0, 1000) as string;
  const updatedFields = { numGuests, observations };

  // 3) AUTHORIZATION
  // EXTRA SAFETY TO ENSURE GUEST CAN EDIT OTHER GUESTS DETAILS
  const guestBookings = await getBookings(session.user?.guestId!);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to edit this booking");

  // 4) MUTATION
  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId)
    .select()
    .single();

  // 5) ERROR HANDLING
  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  // 6) REVALIDATION
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  // 7) REDIRECTING
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
