import ServiceDetails from "./ServiceDetails";
import { air_conditioning_repair } from "@/lib/data";

const AirConditioningRepair = () => {
  return (
    <ServiceDetails
      id="air-conditioning-repair"
      imageSrc="/service2.avif"
      array={air_conditioning_repair}
    />
  );
};

export default AirConditioningRepair;
