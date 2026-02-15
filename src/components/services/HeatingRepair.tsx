import ServiceDetails from "./ServiceDetails";
import { heating_repair } from "@/lib/data";

const HeatingRepair = () => {
  return (
    <ServiceDetails
      id="heating-repair"
      title="Heating Repair Company That You Can Trust!"
      imageSrc="/service4.avif"
      array={heating_repair}
    />
  );
};

export default HeatingRepair;
