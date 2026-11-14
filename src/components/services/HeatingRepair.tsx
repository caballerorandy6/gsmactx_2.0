import ServiceDetails from "./ServiceDetails";
import { heating_repair } from "@/lib/data";

const HeatingRepair = () => {
  return (
    <ServiceDetails
      id="heating-repair"
      imageSrc="/service4.avif"
      array={heating_repair}
    />
  );
};

export default HeatingRepair;
