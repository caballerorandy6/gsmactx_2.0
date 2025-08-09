import UnsubscribeButtonAction from "@/components/admin-components/UnsubscribeButtonAction";
import Image from "next/image";

type SearchParams = { [key: string]: string | string[] | undefined };

const UnsubscribePage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { email } = searchParams;

  if (!email) {
    return (
      <div className="text-center text-red-500">
        Invalid or missing email parameter.
      </div>
    );
  }

  return (
    <section
      id="unsubscribe"
      className="min-h-screen flex items-center justify-center px-4 flex-col text-center"
    >
      <Image
        src="/logo.avif"
        alt="Unsubscribe"
        className="mb-4 w-40 h-40 rounded-full object-contain"
        width={500}
        height={500}
      />
      <h2 className="text-center text-xl font-mono tracking-tight text-white mb-8">
        If you no longer wish to receive our newsletter, you can unsubscribe at
        any time by clicking the button below.
      </h2>
      <UnsubscribeButtonAction
        email={Array.isArray(email) ? email[0] : email}
      />
    </section>
  );
};

export default UnsubscribePage;
