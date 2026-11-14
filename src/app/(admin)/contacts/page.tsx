import { Metadata } from "next";
import { getSubscribersAction } from "@/app/actions/subscriberAction";
import ContactForm from "@/components/admin/contacts/ContactForm";
import ContactsList from "@/components/admin/contacts/ContactsList";
import { UsersIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Contacts",
  description: "Manage your email contacts and subscribers",
};

export default async function ContactsPage() {
  const contacts = await getSubscribersAction();

  const activeCount = contacts.filter((c) => c.isSubscribed).length;
  const inactiveCount = contacts.length - activeCount;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
            <UsersIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary-400" />
            Contacts
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-1">
            Manage your email subscribers and contacts
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div className="text-center px-2 sm:px-4 py-2 rounded-lg bg-gray-800/50 border border-white/10">
            <p className="text-lg sm:text-2xl font-bold text-white">{contacts.length}</p>
            <p className="text-xs text-gray-400">Total</p>
          </div>
          <div className="text-center px-2 sm:px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
            <p className="text-lg sm:text-2xl font-bold text-green-400">{activeCount}</p>
            <p className="text-xs text-green-400/70">Active</p>
          </div>
          <div className="text-center px-2 sm:px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-lg sm:text-2xl font-bold text-red-400">{inactiveCount}</p>
            <p className="text-xs text-red-400/70">Inactive</p>
          </div>
        </div>
      </div>

      {/* Add Contact Form */}
      <div className="bg-gray-800/50 rounded-xl border border-white/10 p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
          Add New Contact
        </h2>
        <ContactForm />
      </div>

      {/* Contacts List */}
      <div>
        <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
          All Contacts ({contacts.length})
        </h2>
        <ContactsList initialContacts={contacts} />
      </div>
    </div>
  );
}
