"use client";

import { useState } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { SafeAdmin } from "@/lib/types";
import { AdminUser } from "@/app/actions/adminAction";
import ChangePasswordForm from "./ChangePasswordForm";
import AdminsList from "./AdminsList";

interface SettingsPageProps {
  currentUser: SafeAdmin;
  admins: AdminUser[];
}

const SettingsPage = ({ currentUser, admins: initialAdmins }: SettingsPageProps) => {
  const [admins, setAdmins] = useState<AdminUser[]>(initialAdmins);

  const handleAdminCreated = (newAdmin: AdminUser) => {
    setAdmins((prev) => [...prev, newAdmin].sort((a, b) => a.name.localeCompare(b.name)));
  };

  const handleAdminUpdated = (updatedAdmin: AdminUser) => {
    setAdmins((prev) =>
      prev.map((admin) => (admin.id === updatedAdmin.id ? updatedAdmin : admin))
    );
  };

  const handleAdminDeleted = (deletedId: string) => {
    setAdmins((prev) => prev.filter((admin) => admin.id !== deletedId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
          <Cog6ToothIcon className="h-7 w-7 sm:h-8 sm:w-8 text-primary-400" />
          Settings
        </h1>
        <p className="text-gray-400 text-sm sm:text-base mt-1">
          Manage your account and admin users
        </p>
      </div>

      {/* Change Password Section */}
      <div className="bg-gray-800/50 rounded-xl border border-white/10 p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Change Password</h2>
        <ChangePasswordForm />
      </div>

      {/* Admin Users Section */}
      <div className="bg-gray-800/50 rounded-xl border border-white/10 p-4 sm:p-6">
        <AdminsList
          admins={admins}
          currentUserId={currentUser.id}
          onAdminCreated={handleAdminCreated}
          onAdminUpdated={handleAdminUpdated}
          onAdminDeleted={handleAdminDeleted}
        />
      </div>
    </div>
  );
};

export default SettingsPage;
