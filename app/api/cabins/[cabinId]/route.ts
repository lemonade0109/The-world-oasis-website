import { getBookedDatesByCabinId, getCabin } from "@/lib/data-service";
import { NextApiRequest, NextApiResponse } from "next";

type ParamsProp = {
  params: {
    cabinId: number;
  };
};

export async function GET(req: NextApiRequest, { params }: ParamsProp) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}
