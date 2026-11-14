"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { createSubscriberAction } from "@/app/actions/subscriberAction";
import { PlusIcon } from "@heroicons/react/24/outline";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedEmail && !trimmedPhone) {
      toast.error("At least email or phone is required");
      return;
    }

    startTransition(async () => {
      const result = await createSubscriberAction({
        name: name.trim() || undefined,
        email: trimmedEmail || undefined,
        phone: trimmedPhone || undefined,
        address: address.trim() || undefined,
      });

      if (result.success) {
        toast.success(result.message);
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div>
          <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
            Name <span className="text-gray-500">(optional)</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            autoComplete="name"
            className="w-full rounded-lg bg-gray-900 border border-white/10 text-white px-3 sm:px-4 py-2 sm:py-2.5 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-gray-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
            Email <span className="text-gray-500">(optional*)</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            autoComplete="email"
            spellCheck="false"
            className="w-full rounded-lg bg-gray-900 border border-white/10 text-white px-3 sm:px-4 py-2 sm:py-2.5 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-gray-500"
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
            Phone <span className="text-gray-500">(optional*)</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(281) 555-0123"
            autoComplete="tel"
            className="w-full rounded-lg bg-gray-900 border border-white/10 text-white px-3 sm:px-4 py-2 sm:py-2.5 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-gray-500"
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <label htmlFor="address" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
            Address <span className="text-gray-500">(optional)</span>
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Main St, Cypress, TX 77433"
            autoComplete="street-address"
            className="w-full rounded-lg bg-gray-900 border border-white/10 text-white px-3 sm:px-4 py-2 sm:py-2.5 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-gray-500"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-xs text-gray-500 order-2 sm:order-1">* At least email or phone is required</p>
        <button
          type="submit"
          disabled={isPending}
          className="order-1 sm:order-2 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors disabled:bg-primary-400 disabled:cursor-not-allowed"
        >
          <PlusIcon className="h-5 w-5" />
          {isPending ? "Adding..." : "Add Contact"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
