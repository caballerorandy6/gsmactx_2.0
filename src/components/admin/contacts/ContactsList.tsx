"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Subscriber } from "@/lib/interfaces";
import {
  updateSubscriberAction,
  deleteSubscriberAction,
} from "@/app/actions/subscriberAction";
import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  MapPinIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Tooltip from "@/components/ui/Tooltip";
import clsx from "clsx";

interface ContactsListProps {
  initialContacts: Subscriber[];
}

type StatusFilter = "all" | "active" | "inactive";

const ContactsList = ({ initialContacts }: ContactsListProps) => {
  const [contacts, setContacts] = useState(initialContacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editIsSubscribed, setEditIsSubscribed] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Filter contacts based on search query and status
  const filteredContacts = contacts.filter((contact) => {
    if (statusFilter === "active" && !contact.isSubscribed) return false;
    if (statusFilter === "inactive" && contact.isSubscribed) return false;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const nameMatch = contact.name?.toLowerCase().includes(query);
      const emailMatch = contact.email?.toLowerCase().includes(query);
      const phoneMatch = contact.phone?.includes(query);
      return nameMatch || emailMatch || phoneMatch;
    }

    return true;
  });

  const hasActiveFilters = searchQuery.trim() !== "" || statusFilter !== "all";

  const handleEdit = (contact: Subscriber) => {
    setEditingId(contact.id);
    setEditName(contact.name || "");
    setEditEmail(contact.email || "");
    setEditPhone(contact.phone || "");
    setEditAddress(contact.address || "");
    setEditIsSubscribed(contact.isSubscribed);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditEmail("");
    setEditPhone("");
    setEditAddress("");
    setEditIsSubscribed(true);
  };

  const handleSaveEdit = (id: string) => {
    const trimmedEmail = editEmail.trim();
    const trimmedPhone = editPhone.trim();

    if (!trimmedEmail && !trimmedPhone) {
      toast.error("At least email or phone is required");
      return;
    }

    startTransition(async () => {
      const result = await updateSubscriberAction(id, {
        name: editName.trim() || undefined,
        email: trimmedEmail || undefined,
        phone: trimmedPhone || undefined,
        address: editAddress.trim() || undefined,
        isSubscribed: editIsSubscribed,
      });

      if (result.success) {
        toast.success(result.message);
        setContacts((prev) =>
          prev.map((c) =>
            c.id === id
              ? {
                  ...c,
                  name: editName.trim() || null,
                  email: trimmedEmail || null,
                  phone: trimmedPhone || null,
                  address: editAddress.trim() || null,
                  isSubscribed: editIsSubscribed,
                }
              : c
          )
        );
        handleCancelEdit();
      } else {
        toast.error(result.message);
      }
    });
  };

  const confirmDelete = (id: string) => {
    startTransition(async () => {
      const result = await deleteSubscriberAction(id);

      if (result.success) {
        toast.success(result.message);
        setContacts((prev) => prev.filter((c) => c.id !== id));
      } else {
        toast.error(result.message);
      }
      setDeletingId(null);
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDisplayName = (contact: Subscriber) => {
    if (contact.name) return contact.name;
    if (contact.email) return contact.email;
    if (contact.phone) return contact.phone;
    return "Unknown";
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
  };

  if (contacts.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-white/5">
        <UserIcon className="h-12 w-12 text-gray-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-300 mb-2">
          No contacts yet
        </h3>
        <p className="text-gray-500">
          Add your first contact using the form above.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or phone..."
            className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-lg bg-gray-900 border border-white/10 text-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-gray-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <FunnelIcon className="h-5 w-5 text-gray-500 hidden sm:block" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="flex-1 sm:flex-none rounded-lg bg-gray-900 border border-white/10 text-white px-3 py-2 sm:py-2.5 text-sm focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 sm:py-2.5 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors text-sm whitespace-nowrap"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>
          Showing {filteredContacts.length} of {contacts.length} contacts
        </span>
      </div>

      {/* No Results */}
      {filteredContacts.length === 0 && hasActiveFilters ? (
        <div className="text-center py-8 bg-gray-800/30 rounded-xl border border-white/5">
          <MagnifyingGlassIcon className="h-10 w-10 text-gray-500 mx-auto mb-3" />
          <p className="text-gray-400 mb-3">No contacts match your search</p>
          <button
            onClick={clearFilters}
            className="text-primary-400 hover:text-primary-300 text-sm font-medium"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10 bg-gray-800/30">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-gray-900/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    {editingId === contact.id ? (
                      <>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            placeholder="Name"
                            className="w-full rounded-md bg-gray-900 border border-white/20 text-white px-3 py-1.5 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="email"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full rounded-md bg-gray-900 border border-white/20 text-white px-3 py-1.5 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="tel"
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)}
                            placeholder="Phone"
                            className="w-full rounded-md bg-gray-900 border border-white/20 text-white px-3 py-1.5 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={editAddress}
                            onChange={(e) => setEditAddress(e.target.value)}
                            placeholder="Address"
                            className="w-full rounded-md bg-gray-900 border border-white/20 text-white px-3 py-1.5 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={editIsSubscribed ? "active" : "inactive"}
                            onChange={(e) =>
                              setEditIsSubscribed(e.target.value === "active")
                            }
                            className="rounded-md bg-gray-900 border border-white/20 text-white px-3 py-1.5 text-sm focus:ring-2 focus:ring-primary-500"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">
                          {formatDate(contact.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleSaveEdit(contact.id)}
                              disabled={isPending}
                              className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors disabled:opacity-50"
                              title="Save"
                            >
                              <CheckIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                              title="Cancel"
                            >
                              <XMarkIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : deletingId === contact.id ? (
                      <>
                        <td colSpan={6} className="px-6 py-4">
                          <span className="text-gray-300">
                            Delete <strong>{getDisplayName(contact)}</strong>?
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => confirmDelete(contact.id)}
                              disabled={isPending}
                              className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors disabled:opacity-50"
                              title="Confirm delete"
                            >
                              <CheckIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setDeletingId(null)}
                              className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                              title="Cancel"
                            >
                              <XMarkIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4">
                          <span className="text-white font-medium">
                            {contact.name || <span className="text-gray-500">-</span>}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {contact.email ? (
                            <span className="text-white flex items-center gap-2">
                              <EnvelopeIcon className="h-4 w-4 text-gray-500" />
                              {contact.email}
                            </span>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {contact.phone ? (
                            <span className="text-white flex items-center gap-2">
                              <PhoneIcon className="h-4 w-4 text-gray-500" />
                              {contact.phone}
                            </span>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {contact.address ? (
                            <span className="text-white flex items-center gap-2">
                              <MapPinIcon className="h-4 w-4 text-gray-500" />
                              <span className="truncate max-w-[200px]" title={contact.address}>
                                {contact.address}
                              </span>
                            </span>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={clsx(
                              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                              contact.isSubscribed
                                ? "bg-green-500/10 text-green-400"
                                : "bg-red-500/10 text-red-400"
                            )}
                          >
                            {contact.isSubscribed ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">
                          {formatDate(contact.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Tooltip text="Schedule">
                              <Link
                                href={`/create-appointment?contactId=${contact.id}`}
                                className="inline-flex p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                              >
                                <CalendarDaysIcon className="h-4 w-4" />
                              </Link>
                            </Tooltip>
                            <Tooltip text="Edit">
                              <button
                                onClick={() => handleEdit(contact)}
                                className="p-2 rounded-lg bg-primary-500/20 text-primary-400 hover:bg-primary-500/30 transition-colors"
                              >
                                <PencilIcon className="h-4 w-4" />
                              </button>
                            </Tooltip>
                            <Tooltip text="Delete">
                              <button
                                onClick={() => setDeletingId(contact.id)}
                                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </Tooltip>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Cards */}
          <div className="lg:hidden divide-y divide-white/5">
            {filteredContacts.map((contact) => (
              <div key={contact.id} className="p-4">
                {editingId === contact.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full rounded-md bg-gray-900 border border-white/20 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500"
                      placeholder="Name"
                    />
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full rounded-md bg-gray-900 border border-white/20 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500"
                      placeholder="Email"
                    />
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full rounded-md bg-gray-900 border border-white/20 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500"
                      placeholder="Phone"
                    />
                    <input
                      type="text"
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      className="w-full rounded-md bg-gray-900 border border-white/20 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500"
                      placeholder="Address"
                    />
                    <select
                      value={editIsSubscribed ? "active" : "inactive"}
                      onChange={(e) =>
                        setEditIsSubscribed(e.target.value === "active")
                      }
                      className="w-full rounded-md bg-gray-900 border border-white/20 text-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveEdit(contact.id)}
                        disabled={isPending}
                        className="flex-1 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors disabled:opacity-50 text-sm font-medium"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex-1 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors text-sm font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : deletingId === contact.id ? (
                  <div className="space-y-3">
                    <p className="text-gray-300 text-sm">
                      Delete <strong>{getDisplayName(contact)}</strong>?
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => confirmDelete(contact.id)}
                        disabled={isPending}
                        className="flex-1 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors disabled:opacity-50 text-sm font-medium"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeletingId(null)}
                        className="flex-1 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors text-sm font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      {contact.name && (
                        <p className="text-white font-medium">{contact.name}</p>
                      )}
                      {contact.email && (
                        <p className="text-gray-300 text-sm flex items-center gap-2">
                          <EnvelopeIcon className="h-4 w-4 text-gray-500" />
                          {contact.email}
                        </p>
                      )}
                      {contact.phone && (
                        <p className="text-gray-300 text-sm flex items-center gap-2">
                          <PhoneIcon className="h-4 w-4 text-gray-500" />
                          {contact.phone}
                        </p>
                      )}
                      {contact.address && (
                        <p className="text-gray-300 text-sm flex items-center gap-2">
                          <MapPinIcon className="h-4 w-4 text-gray-500" />
                          <span className="truncate">{contact.address}</span>
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-2">
                        <span
                          className={clsx(
                            "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                            contact.isSubscribed
                              ? "bg-green-500/10 text-green-400"
                              : "bg-red-500/10 text-red-400"
                          )}
                        >
                          {contact.isSubscribed ? "Active" : "Inactive"}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {formatDate(contact.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tooltip text="Schedule" position="bottom">
                        <Link
                          href={`/create-appointment?contactId=${contact.id}`}
                          className="inline-flex p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                        >
                          <CalendarDaysIcon className="h-4 w-4" />
                        </Link>
                      </Tooltip>
                      <Tooltip text="Edit" position="bottom">
                        <button
                          onClick={() => handleEdit(contact)}
                          className="p-2 rounded-lg bg-primary-500/20 text-primary-400 hover:bg-primary-500/30 transition-colors"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                      </Tooltip>
                      <Tooltip text="Delete" position="bottom">
                        <button
                          onClick={() => setDeletingId(contact.id)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsList;
