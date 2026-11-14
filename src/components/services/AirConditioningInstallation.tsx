import { air_conditioning_installation } from "@/lib/data";
import ServiceDetails from "@/components/services/ServiceDetails";

const AirConditioningInstallation = () => {
  return (
    <ServiceDetails
      id="air-conditioning-installation"
      imageSrc="/service1.avif"
      array={air_conditioning_installation}
    />
  );
};

export default AirConditioningInstallation;
