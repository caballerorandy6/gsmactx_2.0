import { logoutAction } from "@/app/actions/logoutAction";

const LogoutButton = () => {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors duration-200 cursor-pointer w-full justify-center items-center"
      >
        Logout
      </button>
    </form>
  );
};

export default LogoutButton;
