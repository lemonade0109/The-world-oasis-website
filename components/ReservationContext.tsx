"use client";

import { createContext, useContext, useState } from "react";

import { InitialState } from "@/types/interfaces";

const ReservationContext = createContext<InitialState>({} as InitialState);

const initialState = { from: undefined, to: undefined };

const ReservationProvider = ({ children }: { children: React.ReactNode }) => {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider
      value={{
        range,
        setRange,
        resetRange,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

function useReservation() {
  const context = useContext(ReservationContext);

  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { ReservationProvider, useReservation };
