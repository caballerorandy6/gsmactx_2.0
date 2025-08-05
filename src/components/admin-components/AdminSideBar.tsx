import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "@/libs/getCurrentUser";
import LogoutButton from "@/components/admin-components/LogoutButton";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin-dashboard",
    icon: "dashboard-icon",
    current: true,
  },
  {
    name: "Campaigns",
    href: "/admin-campaigns",
    icon: "campaigns-icon",
    current: false,
  },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const AdminSideBar = async () => {
  const admin = await getCurrentUser();

  return (
    <aside className="flex w-64 flex-col gap-y-5 overflow-y-auto bg-gray-900 px-4 py-6">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-gray-800">
        <Image
          width={32}
          height={32}
          alt="Logo"
          src="/logo.avif"
          className="h-20 w-auto my-20 object-contain"
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col justify-between">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white",
                  "flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200"
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <LogoutButton />
          </li>
        </ul>

        {/* Admin Info */}
        <div className="mt-6 border-t border-gray-800 pt-4">
          <Link
            href="/admin-dashboard"
            className="flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <Image
              width={32}
              height={32}
              alt=""
              src="/admin.avif"
              className="size-8 rounded-full object-cover"
            />
            <span>{admin?.name}</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSideBar;
