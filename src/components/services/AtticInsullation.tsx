import ServiceDetails from "./ServiceDetails";
import { attic_insulation } from "@/lib/data";

const AtticInsullation = () => {
  return (
    <ServiceDetails
      id="attic-insulation"
      title="Attic Insulation Services to Keep Your Home Comfortable!"
      imageSrc="/service6.avif"
      array={attic_insulation}
    />
  );
};

export default AtticInsullation;
