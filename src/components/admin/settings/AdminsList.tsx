"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  createAdminAction,
  updateAdminAction,
  deleteAdminAction,
  AdminUser,
} from "@/app/actions/adminAction";
import {
  UserPlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CheckIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

interface AdminsListProps {
  admins: AdminUser[];
  currentUserId: string;
  onAdminCreated: (admin: AdminUser) => void;
  onAdminUpdated: (admin: AdminUser) => void;
  onAdminDeleted: (id: string) => void;
}

const AdminsList = ({
  admins,
  currentUserId,
  onAdminCreated,
  onAdminUpdated,
  onAdminDeleted,
}: AdminsListProps) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Create form state
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Edit form state
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [isPending, startTransition] = useTransition();

  const handleCreate = () => {
    if (!newName.trim() || !newEmail.trim() || !newPassword.trim()) {
      toast.error("All fields are required");
      return;
    }

    startTransition(async () => {
      const result = await createAdminAction({
        name: newName.trim(),
        email: newEmail.trim(),
        password: newPassword,
      });

      if (result.success) {
        toast.success(result.message);
        onAdminCreated({
          id: crypto.randomUUID(), // Temporary ID, will be replaced on next fetch
          name: newName.trim(),
          email: newEmail.trim(),
        });
        setNewName("");
        setNewEmail("");
        setNewPassword("");
        setShowCreateForm(false);
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleEdit = (admin: AdminUser) => {
    setEditingId(admin.id);
    setEditName(admin.name);
    setEditEmail(admin.email);
  };

  const handleUpdate = (id: string) => {
    if (!editName.trim() || !editEmail.trim()) {
      toast.error("Name and email are required");
      return;
    }

    startTransition(async () => {
      const result = await updateAdminAction(id, {
        name: editName.trim(),
        email: editEmail.trim(),
      });

      if (result.success) {
        toast.success(result.message);
        onAdminUpdated({
          id,
          name: editName.trim(),
          email: editEmail.trim(),
        });
        setEditingId(null);
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const result = await deleteAdminAction(id);

      if (result.success) {
        toast.success(result.message);
        onAdminDeleted(id);
        setDeleteConfirmId(null);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Admin Users</h2>
        {!showCreateForm && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
          >
            <UserPlusIcon className="h-5 w-5" />
            Add Admin
          </button>
        )}
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="bg-gray-900/50 rounded-lg border border-indigo-500/30 p-4 mb-4">
          <h3 className="text-sm font-medium text-white mb-3">New Admin</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <input
              type="text"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="rounded-lg bg-gray-800 border border-white/10 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <input
              type="email"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="rounded-lg bg-gray-800 border border-white/10 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <input
              type="password"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="rounded-lg bg-gray-800 border border-white/10 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <p className="text-xs text-gray-500 mb-3">
            Password: min 8 chars, 1 uppercase, 1 number, 1 special character
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-500 transition-colors disabled:opacity-50"
            >
              <CheckIcon className="h-4 w-4" />
              Create
            </button>
            <button
              onClick={() => {
                setShowCreateForm(false);
                setNewName("");
                setNewEmail("");
                setNewPassword("");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <XMarkIcon className="h-4 w-4" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Admins List */}
      <div className="space-y-3">
        {admins.map((admin) => (
          <div
            key={admin.id}
            className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-white/5"
          >
            {editingId === admin.id ? (
              // Edit mode
              <div className="flex-1 flex flex-col sm:flex-row gap-3 mr-4">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 rounded-lg bg-gray-800 border border-white/10 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="flex-1 rounded-lg bg-gray-800 border border-white/10 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            ) : (
              // View mode
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-indigo-500/20 p-2">
                  <UserCircleIcon className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {admin.name}
                    {admin.id === currentUserId && (
                      <span className="ml-2 text-xs text-indigo-400">(You)</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-400">{admin.email}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2">
              {editingId === admin.id ? (
                // Edit mode actions
                <>
                  <button
                    onClick={() => handleUpdate(admin.id)}
                    disabled={isPending}
                    className="p-2 rounded-lg text-green-400 hover:bg-green-500/20 transition-colors disabled:opacity-50"
                    title="Save"
                  >
                    <CheckIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="p-2 rounded-lg text-gray-400 hover:bg-gray-500/20 transition-colors"
                    title="Cancel"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </>
              ) : deleteConfirmId === admin.id ? (
                // Delete confirmation
                <>
                  <span className="text-xs text-red-400 mr-2">Delete?</span>
                  <button
                    onClick={() => handleDelete(admin.id)}
                    disabled={isPending}
                    className="p-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                    title="Confirm delete"
                  >
                    <CheckIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="p-2 rounded-lg text-gray-400 hover:bg-gray-500/20 transition-colors"
                    title="Cancel"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </>
              ) : (
                // Normal actions
                <>
                  <button
                    onClick={() => handleEdit(admin)}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Edit"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  {admin.id !== currentUserId && (
                    <button
                      onClick={() => setDeleteConfirmId(admin.id)}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}

        {admins.length === 0 && (
          <p className="text-center text-gray-400 py-8">No admin users found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminsList;
