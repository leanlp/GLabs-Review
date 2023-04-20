import { AccountCard } from "components/shared";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import FAQ from "./faq";
import FAQS_DATA from "data/FAQs.json";

const FAQsPage = () => {
  return (
    <div className="w-full py-24">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-3xl font-extrabold">
          Raffle<span className="font-light">master</span>
        </h1>
        <AccountCard />
      </div>
      <Link
        href="/participant"
        className="flex items-center space-x-4 text-lg mt-8"
      >
        <span>
          <FaArrowLeft />
        </span>
        <span>Back to Home</span>
      </Link>
      <h2 className="text-2xl font-bold my-8">Frequently Asked Questions</h2>
      <div className="max-h-[50vh] scrollable pr-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FAQS_DATA.map((faq) => (
            <FAQ key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQsPage;
