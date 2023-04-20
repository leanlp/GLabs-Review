import { Transition } from "@headlessui/react";
import { FC } from "react";

interface FadeProps {
  show: boolean;
  children: JSX.Element;
}

const Fade: FC<FadeProps> = ({ show, children }) => {
  return (
    <Transition
      show={show}
      enter="transition ease-in-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in-out duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
};

export default Fade;
