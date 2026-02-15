import ServiceDetails from "./ServiceDetails";
import { air_conditioning_repair } from "@/lib/data";

const AirConditioningRepair = () => {
  return (
    <ServiceDetails
      id="air-conditioning-repair"
      title="Need Help with Fixing Your Air Conditioning Unit? Use Our HVAC Repair Services Now!"
      imageSrc="/service2.avif"
      array={air_conditioning_repair}
    />
  );
};

export default AirConditioningRepair;
