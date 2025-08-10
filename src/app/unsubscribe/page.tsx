import Image from "next/image";
import UnsubscribeButtonAction from "@/components/admin-components/UnsubscribeButtonAction";
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const UnsubscribePage = async (props: { searchParams: SearchParams }) => {
  const { token } = await props.searchParams;

  if (!token) {
    return (
      <section
        id="error"
        className="min-h-screen flex items-center justify-center px-4 flex-col text-center"
      >
        <Image
          src="/logo.avif"
          alt="Error"
          className="mb-4 w-40 h-40 rounded-full object-contain"
          width={500}
          height={500}
        />
        <h2 className="text-center text-xl font-mono tracking-tight text-red-400 mb-8">
          No token provided for unsubscription.
        </h2>
        <p className="text-gray-400">
          Please ensure you have a valid unsubscribe link from our emails. If
          you believe this is an error, please contact our support team.
        </p>
      </section>
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
        token={Array.isArray(token) ? token[0] : token}
      />
    </section>
  );
};

export default UnsubscribePage;
