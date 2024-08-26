export type SearchParamsProp = {
  searchParams: {
    capacity: string;
  };
};

export type CabinIdNumProp = {
  params: { cabinId: number };
};

export type ErrorProp = {
  error: Error;
  reset: () => void;
  onClick: () => void;
};
