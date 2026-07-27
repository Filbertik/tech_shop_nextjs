"use client";

import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

const CustomModal = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
}: IProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      classNames={{
        base: "items-center justify-center", // центрування
      }}
    >
      <ModalContent
        className={`
          w-full 
          max-w-none 
          rounded-[4px] 
          bg-[#F5F5F7]
          ${className}
        `}
      >
        {/* <ModalHeader className="p-0 border-none"> */}
        {/* можна прибрати якщо заголовок не потрібен */}
        {/* </ModalHeader> */}

        <ModalHeader className="p-0 mb-6">
          <h3 className="text-[24px] font-semibold text-black">{title}</h3>
        </ModalHeader>

        <ModalBody className="p-0">{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;

// "use client";

// import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
// import { ReactNode } from "react";

// interface IProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   children: ReactNode;
//   className?: string;
//   size?: "xs" | "sm" | "md" | "lg" | "xl";
// }

// const CustomModal = ({
//   isOpen,
//   onClose,
//   title,
//   children,
//   size = "lg",
// }: IProps) => {
//   return (
//     <Modal isOpen={isOpen} onClose={onClose} size={size}>
//       <ModalContent>
//         <ModalHeader className="border-b">
//           <h3 className="text-xl text-background font-semibold">{title}</h3>
//         </ModalHeader>
//         <ModalBody className="space-y-4 py-6">{children}</ModalBody>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default CustomModal;
