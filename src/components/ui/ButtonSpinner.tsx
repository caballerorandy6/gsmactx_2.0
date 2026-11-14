const ButtonSpinner = ({ label = "Loading" }: { label?: string }) => {
  return (
    <>
      <span
        aria-hidden="true"
        className="block size-5 border-2 border-t-transparent border-white/80 rounded-full motion-safe:animate-spin"
      />
      <span className="sr-only">{label}</span>
    </>
  );
};

export default ButtonSpinner;
