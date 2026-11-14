import { logoutAction } from "@/app/actions/logoutAction";

const LogoutButton = () => {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="group flex gap-x-3 rounded-md px-3 py-1.5 text-sm/6 font-semibold text-gray-200 ring-1 ring-inset ring-white/20 hover:bg-white/10 hover:text-white transition-colors duration-200 cursor-pointer w-full justify-center items-center"
      >
        Logout
      </button>
    </form>
  );
};

export default LogoutButton;
