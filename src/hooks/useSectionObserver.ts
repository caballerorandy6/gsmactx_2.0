import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useGSMStore } from "@/store/gsmactx-store";

interface UseSectionObserverProps {
  sectionName: string;
}

export default function useSectionObserver({
  sectionName,
}: UseSectionObserverProps) {
  const { setActiveSection } = useGSMStore();

  const { ref, inView } = useInView({
    threshold: 0.2
    ,
  });

  useEffect(() => {
    if (inView) {
      setActiveSection(sectionName);
    }
  }, [inView, sectionName, setActiveSection]);

  return ref;
}
