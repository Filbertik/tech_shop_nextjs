"use client";

import Image from "next/image";
import { signOutFunc } from "@/actions/sign-out";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  active: string;
  setActive: (value: string) => void;
}

type ProfileType = {
  firstName: string;
  lastName: string;
  photo: string | null;
};

export default function AccountSidebar({ active, setActive }: Props) {
  const router = useRouter();
  const { setAuthState } = useAuthStore();

  const [profile, setProfile] = useState<ProfileType>({
    firstName: "",
    lastName: "",
    photo: null,
  });

  const [loading, setLoading] = useState(true);

  const menu = [
    { key: "account", label: "Акаунт" },
    { key: "address", label: "Адреса" },
    { key: "orders", label: "Мої замовлення" },
    { key: "wishlist", label: "Список бажань" },
  ];

  // 📥 LOAD PROFILE
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/profile");
      const data = await res.json();

      setProfile({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        photo: data.photo || null,
      });

      setLoading(false);
    };

    fetchProfile();
  }, []);

  // 📤 UPLOAD AVATAR
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result as string;

      // 1. upload
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ file: base64 }),
      });

      const uploadData = await uploadRes.json();

      // 2. save to user
      await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photo: uploadData.url }),
      });

      // 3. update UI
      setProfile((prev) => ({ ...prev, photo: uploadData.url }));
    };

    reader.readAsDataURL(file);
  };

  const handleLogout = async () => {
    try {
      await signOutFunc();
    } catch (error) {
      console.error("Logout error:", error);
    }

    setAuthState("unauthenticated", null);
    router.push("/");
  };

  if (loading) return <div>Loading...</div>;

  const fullName = `${profile.firstName} ${profile.lastName}`.trim();

  return (
    <div className="bg-[#F5F5F7] rounded-[4px] p-[40px_30px] w-[256px] h-[443px] flex flex-col justify-between">
      {/* USER */}
      <div className="flex flex-col items-center gap-[12px]">
        <label className="cursor-pointer relative">
          <Image
            src={profile.photo || "/images/avatar.png"}
            alt="avatar"
            width={82}
            height={82}
            className="rounded-full object-cover"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>

        <div className="text-[18px] font-bold text-black text-center">
          {fullName || "—"}
        </div>
      </div>

      {/* MENU */}
      <div className="flex flex-col gap-[16px] w-full">
        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => setActive(item.key)}
            className={`text-left text-[16px] ${
              active === item.key
                ? "font-bold border-b border-black pb-1"
                : "text-gray-600"
            }`}
          >
            {item.label}
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="text-left text-[16px] text-red-500 mt-[10px]"
        >
          Вийти
        </button>
      </div>
    </div>
  );
}

// "use client";

// import Image from "next/image";
// import { signOutFunc } from "@/actions/sign-out";
// import { useAuthStore } from "@/store/auth.store";
// import { useRouter } from "next/navigation";

// interface Props {
//   active: string;
//   setActive: (value: string) => void;
// }

// export default function AccountSidebar({ active, setActive }: Props) {
//   const router = useRouter();
//   const { setAuthState } = useAuthStore();

//   const menu = [
//     { key: "account", label: "Акаунт" },
//     { key: "address", label: "Адреса" },
//     { key: "orders", label: "Мої замовлення" },
//     { key: "wishlist", label: "Список бажань" },
//   ];

//   const handleLogout = async () => {
//     try {
//       await signOutFunc();
//     } catch (error) {
//       console.error("Logout error:", error);
//     }

//     // очищаємо стан
//     setAuthState("unauthenticated", null);

//     // редірект на головну
//     router.push("/");
//   };

//   return (
//     <div className="bg-[#F5F5F7] rounded-[4px] p-[40px_30px] w-[256px] h-[443px] flex flex-col justify-between">
//       {/* USER */}
//       <div className="flex flex-col items-center gap-[12px]">
//         <Image
//           src="/images/avatar.png"
//           alt="avatar"
//           width={82}
//           height={82}
//           className="rounded-full"
//         />

//         <div className="text-[18px] font-bold text-black text-center">
//           Іван Петренко
//         </div>
//       </div>

//       {/* MENU */}
//       <div className="flex flex-col gap-[16px] w-full">
//         {menu.map((item) => (
//           <button
//             key={item.key}
//             onClick={() => setActive(item.key)}
//             className={`text-left text-[16px] ${
//               active === item.key
//                 ? "font-bold border-b border-black pb-1"
//                 : "text-gray-600"
//             }`}
//           >
//             {item.label}
//           </button>
//         ))}

//         {/* LOGOUT */}
//         <button
//           onClick={handleLogout}
//           className="text-left text-[16px] text-red-500 mt-[10px]"
//         >
//           Вийти
//         </button>
//       </div>
//     </div>
//   );
// }

// // "use client";

// // import Image from "next/image";

// // interface Props {
// //   active: string;
// //   setActive: (value: string) => void;
// // }

// // export default function AccountSidebar({ active, setActive }: Props) {
// //   const menu = [
// //     { key: "account", label: "Акаунт" },
// //     { key: "address", label: "Адреса" },
// //     { key: "orders", label: "Мої замовлення" },
// //     { key: "wishlist", label: "Список бажань" },
// //   ];

// //   return (
// //     <div className="bg-[#F5F5F7] rounded-[4px] p-[40px_30px] w-[256px] h-[443px] flex flex-col justify-between">
// //       {/* USER */}
// //       <div className="flex flex-col items-center gap-[12px]">
// //         <Image
// //           src="/images/avatar.png"
// //           alt="avatar"
// //           width={82}
// //           height={82}
// //           className="rounded-full"
// //         />

// //         <div className="text-[18px] font-bold text-black text-center">
// //           Іван Петренко
// //         </div>
// //       </div>

// //       {/* MENU */}
// //       <div className="flex flex-col gap-[16px] w-full">
// //         {menu.map((item) => (
// //           <button
// //             key={item.key}
// //             onClick={() => setActive(item.key)}
// //             className={`text-left text-[16px] ${
// //               active === item.key
// //                 ? "font-bold border-b border-black pb-1"
// //                 : "text-gray-600"
// //             }`}
// //           >
// //             {item.label}
// //           </button>
// //         ))}

// //         {/* LOGOUT */}
// //         <button className="text-left text-[16px] text-red-500 mt-[10px]">
// //           Вийти
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }
