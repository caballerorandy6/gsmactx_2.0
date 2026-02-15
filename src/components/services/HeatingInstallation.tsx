import ServiceDetails from "./ServiceDetails";
import { heating_installation } from "@/lib/data";

const HeatingInstallation = () => {
  return (
    <ServiceDetails
      id="heating-installation"
      title="Home Heating Repair and Installation Available to You!"
      imageSrc="/service3.avif"
      array={heating_installation}
    />
  );
};

export default HeatingInstallation;
