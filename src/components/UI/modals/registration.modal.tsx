"use client";

import CustomModal from "@/components/common/modal";
import RegistrationForm from "@/forms/registration.form";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  openLogin: () => void; // 👈 новий пропс
}

const RegistrationModal = ({ isOpen, onClose, openLogin }: IProps) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Створити акаунт"
      className="bg-[#F5F5F7] rounded-[4px] w-[530px] h-[653px] px-[90px] py-[80px]"
    >
      {/* 🔁 Перемикач */}
      <div className="flex justify-center mb-6">
        <div className="flex border border-[var(--border-light)] rounded-[20px] p-[2px] w-[350px] h-[47px]">
          {/* Вхід */}
          <button
            onClick={openLogin}
            className="rounded-[20px] px-[66px] h-[43px]"
          >
            Вхід
          </button>

          {/* Реєстрація (активна) */}
          <button className="rounded-[20px] px-[38px] h-[43px] bg-[#83A0F9] text-white">
            Реєстрація
          </button>
        </div>
      </div>

      <RegistrationForm onClose={onClose} />
    </CustomModal>
  );
};

export default RegistrationModal;

// "use client";

// import CustomModal from "@/components/common/modal";
// import RegistrationForm from "@/forms/registration.form";

// interface IProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const RegistrationModal = ({ isOpen, onClose }: IProps) => {
//   return (
//     <CustomModal isOpen={isOpen} onClose={onClose} title="Створити акаунт">
//       <RegistrationForm onClose={onClose} />
//     </CustomModal>
//   );
// };

// export default RegistrationModal;
