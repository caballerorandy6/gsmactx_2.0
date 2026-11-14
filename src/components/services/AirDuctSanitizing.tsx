import ServiceDetails from "./ServiceDetails";
import { air_duct_sanitizing } from "@/lib/data";

const AirDuctSanitizing = () => {
  return (
    <ServiceDetails
      id="air-duct-sanitizing"
      imageSrc="/service5.avif"
      array={air_duct_sanitizing}
    />
  );
};

export default AirDuctSanitizing;
