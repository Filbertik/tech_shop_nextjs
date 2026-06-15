"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type AddressType = {
  city: string;
  street: string;
  house: string;
};

type ProfileType = {
  firstName: string;
  lastName: string;
  phone: string;
};

export default function Address() {
  const [address, setAddress] = useState<AddressType>({
    city: "",
    street: "",
    house: "",
  });

  const [profile, setProfile] = useState<ProfileType>({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // 📥 LOAD DATA
  useEffect(() => {
    const fetchData = async () => {
      const [addressRes, profileRes] = await Promise.all([
        fetch("/api/address"),
        fetch("/api/profile"),
      ]);

      const addressJson = await addressRes.json();
      const profileJson = await profileRes.json();

      setAddress({
        city: addressJson.city || "",
        street: addressJson.street || "",
        house: addressJson.house || "",
      });

      setProfile({
        firstName: profileJson.firstName || "",
        lastName: profileJson.lastName || "",
        phone: profileJson.phone || "",
      });

      setLoading(false);
    };

    fetchData();
  }, []);

  // 📤 SAVE
  const handleSave = async () => {
    await fetch("/api/address", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(address),
    });

    setEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  if (loading) return <div>Loading...</div>;

  const fullName = `${profile.firstName} ${profile.lastName}`.trim();

  return (
    <div className="px-[60px] w-[518px] flex flex-col">
      <h2 className="font-semibold text-[18px]">Адреса</h2>

      <div className="mt-[19px] w-[398px] bg-white rounded-[4px] p-[16px] shadow">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <span className="font-semibold text-[16px]">
            Адреса за замовчуванням
          </span>

          <div
            className="flex items-center gap-[6px] cursor-pointer"
            onClick={() => {
              if (editing) handleSave();
              else setEditing(true);
            }}
          >
            <Image
              src="/images/Account/edit.svg"
              alt="edit"
              width={16}
              height={16}
            />
            <span className="font-semibold text-[16px] text-gray-500">
              {editing ? "Зберегти" : "Редагувати"}
            </span>
          </div>
        </div>

        {/* BODY */}
        <div className="mt-[8px] flex flex-col gap-[6px]">
          {/* PROFILE */}
          <span>{fullName || "—"}</span>
          <span>{profile.phone || "—"}</span>

          {/* ADDRESS */}
          {editing ? (
            <>
              <input
                name="street"
                value={address.street}
                onChange={handleChange}
                placeholder="Вулиця"
                className="border p-1"
              />
              <input
                name="house"
                value={address.house}
                onChange={handleChange}
                placeholder="Будинок"
                className="border p-1"
              />
              <input
                name="city"
                value={address.city}
                onChange={handleChange}
                placeholder="Місто"
                className="border p-1"
              />
            </>
          ) : (
            <span>
              {address.street || "—"} {address.house || ""},{" "}
              {address.city || "—"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";

// type AddressType = {
//   region: string;
//   city: string;
//   street: string;
//   house: string;
// };

// type ProfileType = {
//   firstName: string;
//   lastName: string;
//   phone: string;
// };

// export default function Address() {
//   const [address, setAddress] = useState<AddressType>({
//     region: "",
//     city: "",
//     street: "",
//     house: "",
//   });

//   const [profile, setProfile] = useState<ProfileType>({
//     firstName: "",
//     lastName: "",
//     phone: "",
//   });

//   const [editing, setEditing] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // 📥 GET
//   useEffect(() => {
//     const fetchData = async () => {
//       const [addressRes, profileRes] = await Promise.all([
//         fetch("/api/address"),
//         fetch("/api/profile"),
//       ]);

//       const addressJson = await addressRes.json();
//       const profileJson = await profileRes.json();

//       setAddress({
//         region: addressJson.region || "",
//         city: addressJson.city || "",
//         street: addressJson.street || "",
//         house: addressJson.house || "",
//       });

//       setProfile({
//         firstName: profileJson.firstName || "",
//         lastName: profileJson.lastName || "",
//         phone: profileJson.phone || "",
//       });

//       setLoading(false);
//     };

//     fetchData();
//   }, []);

//   // 📤 SAVE
//   const handleSave = async () => {
//     await fetch("/api/address", {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(address),
//     });

//     setEditing(false);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setAddress((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   if (loading) return <div>Loading...</div>;

//   const fullName = `${profile.firstName} ${profile.lastName}`.trim();

//   return (
//     <div className="px-[60px] w-[518px] flex flex-col">
//       <h2 className="font-semibold text-[18px]">Адреса</h2>

//       <div className="mt-[19px] w-[398px] bg-white rounded-[4px] p-[16px] shadow">
//         {/* HEADER */}
//         <div className="flex justify-between items-center">
//           <span className="font-semibold text-[16px]">
//             Адреса за замовчуванням
//           </span>

//           <div
//             className="flex items-center gap-[6px] cursor-pointer"
//             onClick={() => {
//               if (editing) handleSave();
//               else setEditing(true);
//             }}
//           >
//             <Image
//               src="/images/Account/edit.svg"
//               alt="edit"
//               width={16}
//               height={16}
//             />
//             <span className="font-semibold text-[16px] text-gray-500">
//               {editing ? "Зберегти" : "Редагувати"}
//             </span>
//           </div>
//         </div>

//         {/* BODY */}
//         <div className="mt-[8px] flex flex-col gap-[6px]">
//           {/* PROFILE */}
//           <span>{fullName || "—"}</span>
//           <span>{profile.phone || "—"}</span>

//           {/* ADDRESS */}
//           {editing ? (
//             <>
//               <input
//                 name="region"
//                 value={address.region}
//                 onChange={handleChange}
//                 placeholder="Область"
//                 className="border p-1"
//               />
//               <input
//                 name="city"
//                 value={address.city}
//                 onChange={handleChange}
//                 placeholder="Місто"
//                 className="border p-1"
//               />
//               <input
//                 name="street"
//                 value={address.street}
//                 onChange={handleChange}
//                 placeholder="Вулиця"
//                 className="border p-1"
//               />
//               <input
//                 name="house"
//                 value={address.house}
//                 onChange={handleChange}
//                 placeholder="Будинок"
//                 className="border p-1"
//               />
//             </>
//           ) : (
//             <span>
//               {address.region || "—"}, {address.city || "—"},{" "}
//               {address.street || "—"} {address.house || ""}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // "use client";

// // import { useEffect, useState } from "react";
// // import Image from "next/image";

// // type AddressType = {
// //   city: string;
// //   street: string;
// //   zip: string;
// // };

// // type ProfileType = {
// //   firstName: string;
// //   lastName: string;
// //   phone: string;
// // };

// // export default function Address() {
// //   const [address, setAddress] = useState<AddressType>({
// //     city: "",
// //     street: "",
// //     zip: "",
// //   });

// //   const [profile, setProfile] = useState<ProfileType>({
// //     firstName: "",
// //     lastName: "",
// //     phone: "",
// //   });

// //   const [editing, setEditing] = useState(false);
// //   const [loading, setLoading] = useState(true);

// //   // 📥 GET DATA
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const [addressRes, profileRes] = await Promise.all([
// //         fetch("/api/address"),
// //         fetch("/api/profile"),
// //       ]);

// //       const addressJson = await addressRes.json();
// //       const profileJson = await profileRes.json();

// //       setAddress({
// //         city: addressJson.city || "",
// //         street: addressJson.street || "",
// //         zip: addressJson.zip || "",
// //       });

// //       setProfile({
// //         firstName: profileJson.firstName || "",
// //         lastName: profileJson.lastName || "",
// //         phone: profileJson.phone || "",
// //       });

// //       setLoading(false);
// //     };

// //     fetchData();
// //   }, []);

// //   // 📤 SAVE ADDRESS
// //   const handleSave = async () => {
// //     await fetch("/api/address", {
// //       method: "PATCH",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(address),
// //     });

// //     setEditing(false);
// //   };

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setAddress({ ...address, [e.target.name]: e.target.value });
// //   };

// //   if (loading) return <div>Loading...</div>;

// //   const fullName = `${profile.firstName} ${profile.lastName}`.trim();

// //   return (
// //     <div className="px-[60px] w-[518px] flex flex-col">
// //       <h2 className="font-semibold text-[18px]">Адреса</h2>

// //       <div className="mt-[19px] w-[398px] bg-white rounded-[4px] p-[16px] shadow">
// //         {/* HEADER */}
// //         <div className="flex justify-between items-center">
// //           <span className="font-semibold text-[16px]">
// //             Адреса за замовчуванням
// //           </span>

// //           <div
// //             className="flex items-center gap-[6px] cursor-pointer"
// //             onClick={() => {
// //               if (editing) handleSave();
// //               else setEditing(true);
// //             }}
// //           >
// //             <Image
// //               src="/images/Account/edit.svg"
// //               alt="edit"
// //               width={16}
// //               height={16}
// //             />
// //             <span className="font-semibold text-[16px] text-gray-500">
// //               {editing ? "Зберегти" : "Редагувати"}
// //             </span>
// //           </div>
// //         </div>

// //         {/* BODY */}
// //         <div className="mt-[8px] flex flex-col gap-[6px]">
// //           {/* 👇 ІМ'Я + ТЕЛЕФОН З PROFILE */}
// //           <span>{fullName || "—"}</span>
// //           <span>{profile.phone || "—"}</span>

// //           {/* 👇 ADDRESS */}
// //           {editing ? (
// //             <>
// //               <input
// //                 name="street"
// //                 value={address.street}
// //                 onChange={handleChange}
// //                 placeholder="Вулиця"
// //                 className="border p-1"
// //               />
// //               <input
// //                 name="city"
// //                 value={address.city}
// //                 onChange={handleChange}
// //                 placeholder="Місто"
// //                 className="border p-1"
// //               />
// //               <input
// //                 name="zip"
// //                 value={address.zip}
// //                 onChange={handleChange}
// //                 placeholder="Індекс"
// //                 className="border p-1"
// //               />
// //             </>
// //           ) : (
// //             <span>
// //               {address.street || "—"}, {address.city || "—"},{" "}
// //               {address.zip || "—"}
// //             </span>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import Image from "next/image";

// // // export default function Address() {
// // //   const [data, setData] = useState({
// // //     fullName: "",
// // //     phone: "",
// // //     city: "",
// // //     street: "",
// // //     zip: "",
// // //   });

// // //   const [editing, setEditing] = useState(false);
// // //   const [loading, setLoading] = useState(true);

// // //   // 📥 GET
// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       const res = await fetch("/api/address");
// // //       const json = await res.json();

// // //       setData({
// // //         fullName: json.fullName || "",
// // //         phone: json.phone || "",
// // //         city: json.city || "",
// // //         street: json.street || "",
// // //         zip: json.zip || "",
// // //       });

// // //       setLoading(false);
// // //     };

// // //     fetchData();
// // //   }, []);

// // //   // 📤 PATCH
// // //   const handleSave = async () => {
// // //     await fetch("/api/address", {
// // //       method: "PATCH",
// // //       headers: { "Content-Type": "application/json" },
// // //       body: JSON.stringify(data),
// // //     });

// // //     setEditing(false);
// // //   };

// // //   const handleChange = (e: any) => {
// // //     setData({ ...data, [e.target.name]: e.target.value });
// // //   };

// // //   if (loading) return <div>Loading...</div>;

// // //   return (
// // //     <div className="px-[60px] w-[518px] flex flex-col">
// // //       <h2 className="font-semibold text-[18px]">Адреса</h2>

// // //       <div className="mt-[19px] w-[398px] bg-white rounded-[4px] p-[16px] shadow">
// // //         {/* HEADER */}
// // //         <div className="flex justify-between items-center">
// // //           <span className="font-semibold text-[16px]">
// // //             Адреса за замовчуванням
// // //           </span>

// // //           <div
// // //             className="flex items-center gap-[6px] cursor-pointer"
// // //             onClick={() => {
// // //               if (editing) handleSave();
// // //               else setEditing(true);
// // //             }}
// // //           >
// // //             <Image
// // //               src="/images/Account/edit.svg"
// // //               alt="edit"
// // //               width={16}
// // //               height={16}
// // //             />
// // //             <span className="font-semibold text-[16px] text-gray-500">
// // //               {editing ? "Зберегти" : "Редагувати"}
// // //             </span>
// // //           </div>
// // //         </div>

// // //         {/* BODY */}
// // //         <div className="mt-[8px] flex flex-col gap-[6px]">
// // //           {editing ? (
// // //             <>
// // //               <input
// // //                 name="fullName"
// // //                 value={data.fullName}
// // //                 onChange={handleChange}
// // //                 placeholder="ПІБ"
// // //                 className="border p-1"
// // //               />
// // //               <input
// // //                 name="phone"
// // //                 value={data.phone}
// // //                 onChange={handleChange}
// // //                 placeholder="Телефон"
// // //                 className="border p-1"
// // //               />
// // //               <input
// // //                 name="city"
// // //                 value={data.city}
// // //                 onChange={handleChange}
// // //                 placeholder="Місто"
// // //                 className="border p-1"
// // //               />
// // //               <input
// // //                 name="street"
// // //                 value={data.street}
// // //                 onChange={handleChange}
// // //                 placeholder="Вулиця"
// // //                 className="border p-1"
// // //               />
// // //               <input
// // //                 name="zip"
// // //                 value={data.zip}
// // //                 onChange={handleChange}
// // //                 placeholder="Індекс"
// // //                 className="border p-1"
// // //               />
// // //             </>
// // //           ) : (
// // //             <>
// // //               <span>{data.fullName || "—"}</span>
// // //               <span>{data.phone || "—"}</span>
// // //               <span>
// // //                 {data.street}, {data.city}, {data.zip}
// // //               </span>
// // //             </>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // "use client";

// // // // import Image from "next/image";

// // // // export default function Address() {
// // // //   return (
// // // //     <div className="px-[60px] w-[518px] h-[214px] flex flex-col">
// // // //       {/* ===== Заголовок ===== */}
// // // //       <h2 className="font-semibold text-[18px] text-black">Адреса</h2>

// // // //       {/* ===== Карточка ===== */}
// // // //       <div className="mt-[19px] w-[398px] h-[168px] bg-white rounded-[4px] p-[16px] shadow-[0_10px_16px_4px_rgba(12,31,52,0.04)]">
// // // //         {/* ===== Верхній блок ===== */}
// // // //         <div className="w-[366px] h-[24px] flex items-center justify-between">
// // // //           <span className="font-semibold text-[16px] text-[var(--black)]">
// // // //             Адреса за замовчуванням
// // // //           </span>

// // // //           <div className="flex items-center gap-[6px] cursor-pointer">
// // // //             <Image
// // // //               src="/images/Account/edit.svg"
// // // //               alt="edit"
// // // //               width={16}
// // // //               height={16}
// // // //             />
// // // //             <span className="font-semibold text-[16px] text-[var(--gray)]">
// // // //               Редагувати
// // // //             </span>
// // // //           </div>
// // // //         </div>

// // // //         {/* ===== Нижній блок ===== */}
// // // //         <div className="mt-[8px] w-[293px] h-[104px] flex flex-col gap-[4px]">
// // // //           <span>Софія Шевченко</span>
// // // //           <span>+380 (97) 658 95 59</span>
// // // //           <span>вулиця Левка Лук&#39;яненка, 12, Київ, Україна, 04207</span>
// // // //           {/* <span>вулиця Левка Лук'яненка, 12, Київ, Україна, 04207</span> */}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // export default function Address() {
// // // // //   return <div>Контент: Адреса</div>;
// // // // // }
