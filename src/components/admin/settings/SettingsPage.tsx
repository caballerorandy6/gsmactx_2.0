"use client";

import { useState } from "react";
import AdminPageHeader from "@/components/admin/common/AdminPageHeader";
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
      <AdminPageHeader
        title="Settings"
        description="Your password and the admins who can sign in."
      />

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
