import { DefaultSession, Session, User } from "next-auth";
import { DateRange } from "react-day-picker";

export interface BookingIdNumProp {
  params: {
    bookingId: number;
  };
}

export interface GuestProp {
  countryFlag: string;
  created_at: string;
  email: string;
  fullName: string;
  id: number;
  nationalID: string;
  nationality: string;
}

export interface ButtonFormProp {
  children: React.ReactNode;
  pendingLabel: string;
}

export interface CabinProp {
  cabin: {
    created_at?: string | null;
    id?: number | null;
    name?: string | null;
    maxCapacity?: number | null;
    regularPrice?: number | null;
    discount?: number | null;
    image?: string | null;
    description?: string | null;
  };
}

export interface isAlreadyBookedProp {
  range: DateRange | undefined;
  datesArr: Date[];
  bookedDates?: Date[];
}

export interface DateSelectorProp extends CabinProp {
  settings: {
    breakfastPrice: number | null;
    created_at: string | null;
    id: number;
    maxBookingLength: number;
    maxGuestPerBooking: number | null;
    minBookingLength: number | null;
  };

  bookedDates: Date[];
}

export interface ButtonProp {
  filter: string;
  handleFilter: (filter: string) => void;
  activeFilter: string;
  children?: React.ReactNode;
}

export interface BookingsProp {
  booking: {
    id: number;
    created_at: string;
    startDate: string | number;
    endDate: string | number;
    numNights: number;
    numGuests: number;
    totalPrice: number;
    guestId?: number;
    cabinId: number;
    status?: string;
    cabins: {
      name: string;
      image: string;
    };
  };
  onDelete: (bookingId: number) => void;
}

export interface InitialState {
  range: DateRange | undefined;
  setRange: (range: DateRange | undefined) => void;
  resetRange: () => void;
}

export interface ReservationFormProp extends CabinProp {
  session: Session;
}

export interface BookingPropsArray {
  bookings: {
    id: number;
    created_at: string;
    startDate: string | number;
    endDate: string | number;
    numNights: number;
    numGuests: number;
    totalPrice: number;
    guestId: number;
    cabinId: number;
    cabins: {
      name: string;
      image: string;
    };
  }[];
}

export interface SelectCountryProp {
  defaultCountry: string | null | undefined;
  name: string;
  id: string;
  className: string;
}

export interface CountriesProp {
  name: string;
  flag: string;
  independent: boolean;
}

export interface TextExpanderProp {
  children?: React.ReactNode;
}

export interface UpdateProfileFormProp {
  guest: {
    countryFlag: string;
    created_at: string;
    email: string;
    fullName: string;
    id: number;
    nationalID: string;
    nationality: string;
  };

  children: React.ReactNode;
}

export interface BookingdData {
  startDate: undefined;
  endDate: undefined;
  numNights: number;
  cabinPrice: number;
  cabinId: number;
}

export interface AuthenticationProp {
  user?: {} & DefaultSession["user"];
  session?: {
    user: {
      guestId?: number | undefined;
      email?: string;
    };
  };
}
// export interface AuthenticationProp {
//   user?: User;
//   session?: {
//     user: {
//       guestId: number | undefined;
//       email: string;
//     };
//   };
// }
