import { TEST_RECIPIENTS } from "@/lib/email/testRecipients";

const TestRecipientList = ({ className }: { className?: string }) => (
  <ul className={className ?? "mt-2 space-y-1 text-sm text-gray-200"}>
    {TEST_RECIPIENTS.map((email) => (
      <li key={email} className="break-all">
        {email}
      </li>
    ))}
  </ul>
);

export default TestRecipientList;
