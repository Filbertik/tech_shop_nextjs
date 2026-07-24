"use client";

import CustomModal from "@/components/common/modal";
import LoginForm from "@/forms/login.form";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  openRegister: () => void; // 👈 новий пропс
}

const LoginModal = ({ isOpen, onClose, openRegister }: IProps) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Авторизація"
      className="bg-[#F5F5F7] rounded-[4px] w-[530px] h-[575px] px-[90px] py-[80px]"
    >
      {/* 🔁 Перемикач */}
      <div className="flex justify-center mb-6">
        <div className="flex border border-[var(--border-light)] rounded-[20px] p-[2px] w-[350px] h-[47px]">
          {/* Вхід (активний) */}
          <button className="rounded-[20px] px-[66px] h-[43px] bg-[#83A0F9] text-white">
            Вхід
          </button>

          {/* Реєстрація */}
          <button
            onClick={openRegister}
            className="rounded-[20px] px-[66px] h-[43px]"
          >
            Реєстрація
          </button>
        </div>
      </div>

      <LoginForm onClose={onClose} />
    </CustomModal>
  );
};

export default LoginModal;

// "use client";

// import CustomModal from "@/components/common/modal";
// import LoginForm from "@/forms/login.form";

// interface IProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const LoginModal = ({ isOpen, onClose }: IProps) => {
//   return (
//     <CustomModal isOpen={isOpen} onClose={onClose} title="Авторизація">
//       <LoginForm onClose={onClose} />
//     </CustomModal>
//   );
// };

// export default LoginModal;
