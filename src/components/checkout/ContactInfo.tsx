import { Input } from "@heroui/react";

export default function ContactInfo() {
  return (
    <div className="w-full h-[395px] rounded-[4px] p-[40px_24px] shadow-[0_9px_22px_rgba(21,53,90,0.1)] bg-white">
      {/* ГОЛОВНИЙ КОНТЕЙНЕР З ВІДСТУПАМИ */}
      <div className="flex flex-col gap-[8px]">
        <h2 className="text-[18px] font-semibold">Контактна інформація</h2>

        {/* BLOCK */}
        <div className="w-[595px]">
          <div className="flex flex-col gap-[16px]">
            <Input name="firstName" placeholder="Ім’я" />
            <Input name="lastName" placeholder="Прізвище" />
            <Input name="phone" placeholder="Номер телефону" />
            <Input name="email" placeholder="Email" />
          </div>
        </div>
      </div>
    </div>
  );
}

// import { Input } from "@heroui/react";

// export default function ContactInfo() {
//   return (
//     <div className="w-full h-[395px] rounded-[4px] p-[40px_24px] shadow-[0_9px_22px_rgba(21,53,90,0.1)] bg-white">
//       <h2 className="text-[18px] font-semibold mb-4">Контактна інформація</h2>

//       {/* тут буде форма */}
//       {/* BLOCK 1 */}
//       <div className="w-[595px]">
//         {/* <h2 className="font-semibold text-[18px] mb-[24px]">Дані акаунта</h2> */}

//         <div className="flex flex-col gap-[16px]">
//           <Input
//             name="firstName"
//             placeholder="Ім’я"
//             // value={form.firstName}
//             // onChange={handleChange}
//             // error={errors.firstName}
//           />

//           <Input
//             name="lastName"
//             placeholder="Прізвище"
//             // value={form.lastName}
//             // onChange={handleChange}
//             // error={errors.lastName}
//           />

//           <Input
//             name="phone"
//             placeholder="Номер телефону"
//             // value={form.phone}
//             // onChange={handleChange}
//             // error={errors.phone}
//           />

//           <Input
//             name="email"
//             placeholder="Email"
//             // value={form.email}
//             // onChange={handleChange}
//             // error={errors.email}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
