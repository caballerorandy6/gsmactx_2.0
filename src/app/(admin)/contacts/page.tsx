import { Metadata } from "next";
import { getSubscribersAction } from "@/app/actions/subscriberAction";
import ContactForm from "@/components/admin/contacts/ContactForm";
import ContactsList from "@/components/admin/contacts/ContactsList";
import AdminPageHeader from "@/components/admin/common/AdminPageHeader";

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
        <AdminPageHeader
          title="Contacts"
          className=""
          description="Email subscribers and their subscription status."
        />

        {/* Stats */}
        <dl className="grid grid-cols-3 gap-2 sm:gap-4">
          {[
            { label: "Total", value: contacts.length },
            { label: "Subscribed", value: activeCount },
            { label: "Unsubscribed", value: inactiveCount },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-white/10 bg-gray-800/50 px-3 py-2.5 sm:px-4"
            >
              <dt className="text-xs text-gray-400">{stat.label}</dt>
              <dd className="mt-0.5 text-lg font-semibold tabular-nums text-white sm:text-2xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
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
