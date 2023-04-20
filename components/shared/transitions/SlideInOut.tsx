import { Transition } from "@headlessui/react";
import { FC } from "react";

interface SlideInOutProps {
  show: boolean;
  children: JSX.Element;
}

const SlideInOut: FC<SlideInOutProps> = ({ show, children }) => {
  return (
    <Transition
      show={show}
      enter="transition ease-out duration-300"
      enterFrom="transform translate-x-full"
      enterTo="transform translate-x-0"
      leave="transition ease-in duration-300"
      leaveFrom="transform translate-x-0"
      leaveTo="transform translate-x-full"
    >
      {children}
    </Transition>
  );
};

export default SlideInOut;
