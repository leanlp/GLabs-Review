import { FC, useState } from "react";

interface Props {
  question: string;
  answer: string;
}

const FAQ: FC<Props> = ({ question, answer }) => {

  const [currentOpenFaq, setCurrentOpenFaq] = useState(0);
  
  return (
    <div className="bg-black/30 py-5 px-3 rounded-lg border-white/10 border-x-1 border-y-1">
      <h3 className=" text-base font-normal">{question}</h3>
      <p className=" text-xs font-normal mt-8">{answer}</p>
    </div>
  );
};

export default FAQ;
