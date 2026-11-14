import ServiceDetails from "./ServiceDetails";
import { attic_insulation } from "@/lib/data";

const AtticInsullation = () => {
  return (
    <ServiceDetails
      id="attic-insulation"
      imageSrc="/service6.avif"
      array={attic_insulation}
    />
  );
};

export default AtticInsullation;
