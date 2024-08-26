import { getCountries } from "@/lib/data-service";
import { CountriesProp, SelectCountryProp } from "@/types/interfaces";

// Let's imagine your colleague already built this component 😃

const SelectCountry = async ({
  defaultCountry,
  name,
  id,
  className,
}: SelectCountryProp) => {
  const countries = await getCountries();

  const flag =
    countries.find((country: CountriesProp) => country.name === defaultCountry)
      ?.flag ?? "";

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c: CountriesProp) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
};

export default SelectCountry;
