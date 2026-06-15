"use client";

import { useEffect, useState } from "react";

type FormErrors = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
  repeatPassword?: string;
};

type InputProps = {
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
};

export default function Account() {
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // ✅ 1. ТЯГНЕМО ДАНІ З БД
  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();

      setForm((prev) => ({
        ...prev,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        phone: data.phone || "",
        email: data.email || "",
      }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ 2. ВАЛІДАЦІЯ (виправлена)
  const validate = () => {
    const newErrors: FormErrors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = "Введіть ім’я";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Введіть прізвище";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Введіть номер телефону";
    } else if (!/^\+?[0-9]{10,15}$/.test(form.phone)) {
      newErrors.phone = "Некоректний номер";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email відсутній";
    }

    // ✅ пароль тільки якщо вводиться
    const isChangingPassword =
      form.oldPassword || form.newPassword || form.repeatPassword;

    if (isChangingPassword) {
      if (!form.oldPassword) {
        newErrors.oldPassword = "Введіть старий пароль";
      }

      if (form.newPassword && form.newPassword.length < 6) {
        newErrors.newPassword = "Мінімум 6 символів";
      }

      if (form.newPassword !== form.repeatPassword) {
        newErrors.repeatPassword = "Паролі не співпадають";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ 3. SUBMIT (з фіксом оновлення)
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Помилка");
        return;
      }

      alert("Збережено ✅");

      // ✅ ОНОВЛЮЄМО ДАНІ З БД
      await fetchProfile();

      // очищаємо тільки паролі
      setForm((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
        repeatPassword: "",
      }));
    } catch (e) {
      console.error(e);
      alert("Помилка сервера");
    }
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div className="px-[60px] w-[827px] flex flex-col gap-[40px]">
      {/* BLOCK 1 */}
      <div className="w-[707px]">
        <h2 className="font-semibold text-[18px] mb-[24px]">Дані акаунта</h2>

        <div className="flex flex-col gap-[16px]">
          <Input
            name="firstName"
            placeholder="Ім’я"
            value={form.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />

          <Input
            name="lastName"
            placeholder="Прізвище"
            value={form.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />

          <Input
            name="phone"
            placeholder="Номер телефону"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
          />

          <Input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>
      </div>

      {/* BLOCK 2 */}
      <div className="w-[707px]">
        <h2 className="font-semibold text-[18px] mb-[24px]">Оновити пароль</h2>

        <div className="flex flex-col gap-[16px]">
          <Input
            name="oldPassword"
            type="password"
            placeholder="Старий пароль"
            value={form.oldPassword}
            onChange={handleChange}
            error={errors.oldPassword}
          />

          <Input
            name="newPassword"
            type="password"
            placeholder="Новий пароль"
            value={form.newPassword}
            onChange={handleChange}
            error={errors.newPassword}
          />

          <Input
            name="repeatPassword"
            type="password"
            placeholder="Повторіть пароль"
            value={form.repeatPassword}
            onChange={handleChange}
            error={errors.repeatPassword}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-[24px] w-[196px] h-[50px] bg-[#355EC0] text-white rounded-[4px]"
        >
          Зберегти зміни
        </button>
      </div>
    </div>
  );
}

/* INPUT */
function Input({
  name,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
}: InputProps) {
  return (
    <div className="flex flex-col">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border rounded-[10px] px-[10px] h-[48px] ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && (
        <span className="text-red-500 text-[12px] mt-[4px]">{error}</span>
      )}
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";

// type FormErrors = {
//   firstName?: string;
//   lastName?: string;
//   phone?: string;
//   email?: string;
//   oldPassword?: string;
//   newPassword?: string;
//   repeatPassword?: string;
// };

// export default function Account() {
//   const [loading, setLoading] = useState(true);

//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     oldPassword: "",
//     newPassword: "",
//     repeatPassword: "",
//   });

//   const [errors, setErrors] = useState<FormErrors>({});

//   // ✅ 1. ТЯГНЕМО ДАНІ З БД
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await fetch("/api/profile");
//         const data = await res.json();

//         setForm((prev) => ({
//           ...prev,
//           firstName: data.firstName || "",
//           lastName: data.lastName || "",
//           phone: data.phone || "",
//           email: data.email || "",
//         }));
//       } catch (e) {
//         console.error(e);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // ✅ 2. ВАЛІДАЦІЯ
//   const validate = () => {
//     const newErrors: FormErrors = {};

//     if (!form.firstName.trim()) {
//       newErrors.firstName = "Введіть ім’я";
//     }

//     if (!form.lastName.trim()) {
//       newErrors.lastName = "Введіть прізвище";
//     }

//     if (!form.phone.trim()) {
//       newErrors.phone = "Введіть номер телефону";
//     } else if (!/^\+?[0-9]{10,15}$/.test(form.phone)) {
//       newErrors.phone = "Некоректний номер";
//     }

//     // 👉 EMAIL НЕ ДАЄМО МІНЯТИ (беремо з БД)
//     if (!form.email.trim()) {
//       newErrors.email = "Email відсутній";
//     }

//     // ✅ ПАРОЛЬ (ОПЦІЙНО)
//     const validate = () => {
//       const newErrors: FormErrors = {};

//       if (!form.firstName.trim()) {
//         newErrors.firstName = "Введіть ім’я";
//       }

//       if (!form.lastName.trim()) {
//         newErrors.lastName = "Введіть прізвище";
//       }

//       if (!form.phone.trim()) {
//         newErrors.phone = "Введіть номер телефону";
//       } else if (!/^\+?[0-9]{10,15}$/.test(form.phone)) {
//         newErrors.phone = "Некоректний номер";
//       }

//       if (!form.email.trim()) {
//         newErrors.email = "Email відсутній";
//       }

//       // ✅ ПАРОЛЬ ТІЛЬКИ ЯКЩО КОРИСТУВАЧ ХОЧЕ МІНЯТИ
//       const isChangingPassword =
//         form.oldPassword || form.newPassword || form.repeatPassword;

//       if (isChangingPassword) {
//         if (!form.oldPassword) {
//           newErrors.oldPassword = "Введіть старий пароль";
//         }

//         if (form.newPassword && form.newPassword.length < 6) {
//           newErrors.newPassword = "Мінімум 6 символів";
//         }

//         if (form.newPassword !== form.repeatPassword) {
//           newErrors.repeatPassword = "Паролі не співпадають";
//         }
//       }

//       setErrors(newErrors);
//       return Object.keys(newErrors).length === 0;
//     };
//     // if (form.newPassword || form.repeatPassword || form.oldPassword) {
//     //   if (!form.oldPassword) {
//     //     newErrors.oldPassword = "Введіть старий пароль";
//     //   }

//     //   if (form.newPassword.length < 6) {
//     //     newErrors.newPassword = "Мінімум 6 символів";
//     //   }

//     //   if (form.newPassword !== form.repeatPassword) {
//     //     newErrors.repeatPassword = "Паролі не співпадають";
//     //   }
//     // }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ✅ 3. SUBMIT
//   const handleSubmit = async () => {
//     if (!validate()) return;

//     try {
//       const res = await fetch("/api/profile", {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.error || "Помилка");
//         return;
//       }

//       alert("Збережено ✅");

//       // очищаємо поля паролю
//       setForm((prev) => ({
//         ...prev,
//         oldPassword: "",
//         newPassword: "",
//         repeatPassword: "",
//       }));
//     } catch (e) {
//       console.error(e);
//       alert("Помилка сервера");
//     }
//   };

//   if (loading) return <p>Загрузка...</p>;

//   return (
//     <div className="px-[60px] w-[827px] flex flex-col gap-[40px]">
//       {/* BLOCK 1 */}
//       <div className="w-[707px]">
//         <h2 className="font-semibold text-[18px] mb-[24px]">Дані акаунта</h2>

//         <div className="flex flex-col gap-[16px]">
//           <Input
//             name="firstName"
//             placeholder="Ім’я"
//             value={form.firstName}
//             onChange={handleChange}
//             error={errors.firstName}
//           />

//           <Input
//             name="lastName"
//             placeholder="Прізвище"
//             value={form.lastName}
//             onChange={handleChange}
//             error={errors.lastName}
//           />

//           <Input
//             name="phone"
//             placeholder="Номер телефону"
//             value={form.phone}
//             onChange={handleChange}
//             error={errors.phone}
//           />

//           <Input
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             error={errors.email}
//           />
//         </div>
//       </div>

//       {/* BLOCK 2 */}
//       <div className="w-[707px]">
//         <h2 className="font-semibold text-[18px] mb-[24px]">Оновити пароль</h2>

//         <div className="flex flex-col gap-[16px]">
//           <Input
//             name="oldPassword"
//             type="password"
//             placeholder="Старий пароль"
//             value={form.oldPassword}
//             onChange={handleChange}
//             error={errors.oldPassword}
//           />

//           <Input
//             name="newPassword"
//             type="password"
//             placeholder="Новий пароль"
//             value={form.newPassword}
//             onChange={handleChange}
//             error={errors.newPassword}
//           />

//           <Input
//             name="repeatPassword"
//             type="password"
//             placeholder="Повторіть пароль"
//             value={form.repeatPassword}
//             onChange={handleChange}
//             error={errors.repeatPassword}
//           />
//         </div>

//         <button
//           onClick={handleSubmit}
//           className="mt-[24px] w-[196px] h-[50px] bg-[#355EC0] text-white rounded-[4px]"
//         >
//           Зберегти зміни
//         </button>
//       </div>
//     </div>
//   );
// }

// /* INPUT */
// function Input({
//   name,
//   placeholder,
//   value,
//   onChange,
//   error,
//   type = "text",
// }: any) {
//   return (
//     <div className="flex flex-col">
//       <input
//         name={name}
//         type={type}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         className={`border rounded-[10px] px-[10px] h-[48px] ${error ? "border-red-500" : "border-gray-300"}`}
//       />
//       {error && (
//         <span className="text-red-500 text-[12px] mt-[4px]">{error}</span>
//       )}
//     </div>
//   );
// }

// // "use client";

// // import { useEffect, useState } from "react";

// // type FormErrors = {
// //   firstName?: string;
// //   lastName?: string;
// //   phone?: string;
// //   email?: string;
// //   oldPassword?: string;
// //   newPassword?: string;
// //   repeatPassword?: string;
// // };

// // export default function Account() {
// //   const [form, setForm] = useState({
// //     firstName: "",
// //     lastName: "",
// //     phone: "",
// //     email: "",
// //     oldPassword: "",
// //     newPassword: "",
// //     repeatPassword: "",
// //   });

// //   const [errors, setErrors] = useState<FormErrors>({});
// //   const [loading, setLoading] = useState(false);

// //   // ✅ 1. ПІДТЯГУЄМО ДАНІ КОРИСТУВАЧА
// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       const res = await fetch("/api/account");
// //       const data = await res.json();

// //       setForm((prev) => ({
// //         ...prev,
// //         firstName: data.firstName || "",
// //         lastName: data.lastName || "",
// //         phone: data.phone || "",
// //         email: data.email || "",
// //       }));
// //     };

// //     fetchUser();
// //   }, []);

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   // ✅ ВАЛІДАЦІЯ
// //   const validate = () => {
// //     const newErrors: FormErrors = {};

// //     if (!form.firstName.trim()) {
// //       newErrors.firstName = "Введіть ім’я";
// //     }

// //     if (!form.lastName.trim()) {
// //       newErrors.lastName = "Введіть прізвище";
// //     }

// //     if (!form.phone.trim()) {
// //       newErrors.phone = "Введіть номер телефону";
// //     }

// //     // пароль НЕ обовʼязковий
// //     if (form.newPassword || form.repeatPassword || form.oldPassword) {
// //       if (!form.oldPassword) {
// //         newErrors.oldPassword = "Введіть старий пароль";
// //       }

// //       if (form.newPassword.length < 6) {
// //         newErrors.newPassword = "Мінімум 6 символів";
// //       }

// //       if (form.newPassword !== form.repeatPassword) {
// //         newErrors.repeatPassword = "Паролі не співпадають";
// //       }
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   // ✅ SUBMIT
// //   const handleSubmit = async () => {
// //     if (!validate()) return;

// //     setLoading(true);

// //     try {
// //       const res = await fetch("/api/account", {
// //         method: "PUT",
// //         body: JSON.stringify(form),
// //       });

// //       if (!res.ok) {
// //         throw new Error("Помилка оновлення");
// //       }

// //       alert("Дані оновлено ✅");
// //     } catch (error) {
// //       console.error(error);
// //       alert("Помилка ❌");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="px-[60px] w-[827px] flex flex-col gap-[40px]">
// //       {/* BLOCK 1 */}
// //       <div className="w-[707px]">
// //         <h2 className="font-semibold text-[18px] mb-[24px]">Дані акаунта</h2>

// //         <div className="flex flex-col gap-[16px]">
// //           <Input
// //             name="firstName"
// //             placeholder="Ім’я"
// //             value={form.firstName}
// //             onChange={handleChange}
// //             error={errors.firstName}
// //           />
// //           <Input
// //             name="lastName"
// //             placeholder="Прізвище"
// //             value={form.lastName}
// //             onChange={handleChange}
// //             error={errors.lastName}
// //           />
// //           <Input
// //             name="phone"
// //             placeholder="Номер телефону"
// //             value={form.phone}
// //             onChange={handleChange}
// //             error={errors.phone}
// //           />
// //           <Input
// //             name="email"
// //             placeholder="Email"
// //             value={form.email}
// //             onChange={handleChange}
// //             error={errors.email}
// //           />
// //         </div>
// //       </div>

// //       {/* BLOCK 2 */}
// //       <div className="w-[707px]">
// //         <h2 className="font-semibold text-[18px] mb-[24px]">Оновити пароль</h2>

// //         <div className="flex flex-col gap-[16px]">
// //           <Input
// //             name="oldPassword"
// //             type="password"
// //             placeholder="Старий пароль"
// //             value={form.oldPassword}
// //             onChange={handleChange}
// //             error={errors.oldPassword}
// //           />
// //           <Input
// //             name="newPassword"
// //             type="password"
// //             placeholder="Новий пароль"
// //             value={form.newPassword}
// //             onChange={handleChange}
// //             error={errors.newPassword}
// //           />
// //           <Input
// //             name="repeatPassword"
// //             type="password"
// //             placeholder="Повторіть пароль"
// //             value={form.repeatPassword}
// //             onChange={handleChange}
// //             error={errors.repeatPassword}
// //           />
// //         </div>

// //         <button
// //           onClick={handleSubmit}
// //           disabled={loading}
// //           className="mt-[24px] w-[196px] h-[50px] bg-[#355EC0] text-white rounded-[4px]"
// //         >
// //           {loading ? "Збереження..." : "Зберегти зміни"}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // /* INPUT */

// // function Input({
// //   name,
// //   placeholder,
// //   value,
// //   onChange,
// //   error,
// //   type = "text",
// // }: any) {
// //   return (
// //     <div className="flex flex-col">
// //       <input
// //         name={name}
// //         type={type}
// //         placeholder={placeholder}
// //         value={value}
// //         onChange={onChange}
// //         className={`border rounded-[10px] px-[10px] h-[48px]
// //         ${error ? "border-red-500" : "border-gray-300"}`}
// //       />
// //       {error && <span className="text-red-500 text-[12px]">{error}</span>}
// //     </div>
// //   );
// // }

// // // "use client";

// // // import { useState } from "react";

// // // type FormErrors = {
// // //   firstName?: string;
// // //   lastName?: string;
// // //   phone?: string;
// // //   email?: string;
// // //   oldPassword?: string;
// // //   newPassword?: string;
// // //   repeatPassword?: string;
// // // };

// // // export default function Account() {
// // //   const [form, setForm] = useState({
// // //     firstName: "",
// // //     lastName: "",
// // //     phone: "",
// // //     email: "",
// // //     oldPassword: "",
// // //     newPassword: "",
// // //     repeatPassword: "",
// // //   });

// // //   const [errors, setErrors] = useState<FormErrors>({});

// // //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     setForm({ ...form, [e.target.name]: e.target.value });
// // //   };

// // //   // ✅ Валідація
// // //   const validate = () => {
// // //     const newErrors: FormErrors = {};

// // //     if (!form.firstName.trim()) {
// // //       newErrors.firstName = "Введіть ім’я";
// // //     }

// // //     if (!form.lastName.trim()) {
// // //       newErrors.lastName = "Введіть прізвище";
// // //     }

// // //     if (!form.phone.trim()) {
// // //       newErrors.phone = "Введіть номер телефону";
// // //     } else if (!/^\+?[0-9]{10,15}$/.test(form.phone)) {
// // //       newErrors.phone = "Некоректний номер";
// // //     }

// // //     if (!form.email.trim()) {
// // //       newErrors.email = "Введіть email";
// // //     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
// // //       newErrors.email = "Некоректний email";
// // //     }

// // //     if (form.newPassword || form.repeatPassword || form.oldPassword) {
// // //       if (!form.oldPassword) {
// // //         newErrors.oldPassword = "Введіть старий пароль";
// // //       }

// // //       if (form.newPassword.length < 6) {
// // //         newErrors.newPassword = "Мінімум 6 символів";
// // //       }

// // //       if (form.newPassword !== form.repeatPassword) {
// // //         newErrors.repeatPassword = "Паролі не співпадають";
// // //       }
// // //     }

// // //     setErrors(newErrors);
// // //     return Object.keys(newErrors).length === 0;
// // //   };

// // //   const handleSubmit = () => {
// // //     if (!validate()) return;

// // //     console.log("FORM DATA:", form);

// // //     // 👉 тут пізніше підключимо API
// // //   };

// // //   return (
// // //     <div className="px-[60px] w-[827px] h-[680px] flex flex-col gap-[40px]">
// // //       {/* ================= BLOCK 1 ================= */}
// // //       <div className="w-[707px]">
// // //         <h2 className="font-semibold text-[18px] mb-[24px]">Дані акаунта</h2>

// // //         <div className="flex flex-col gap-[16px]">
// // //           <Input
// // //             name="firstName"
// // //             placeholder="Ім’я"
// // //             value={form.firstName}
// // //             onChange={handleChange}
// // //             error={errors.firstName}
// // //           />

// // //           <Input
// // //             name="lastName"
// // //             placeholder="Прізвище"
// // //             value={form.lastName}
// // //             onChange={handleChange}
// // //             error={errors.lastName}
// // //           />

// // //           <Input
// // //             name="phone"
// // //             placeholder="Номер телефону"
// // //             value={form.phone}
// // //             onChange={handleChange}
// // //             error={errors.phone}
// // //           />

// // //           <Input
// // //             name="email"
// // //             placeholder="Email"
// // //             value={form.email}
// // //             onChange={handleChange}
// // //             error={errors.email}
// // //           />
// // //         </div>
// // //       </div>

// // //       {/* ================= BLOCK 2 ================= */}
// // //       <div className="w-[707px]">
// // //         <h2 className="font-semibold text-[18px] mb-[24px]">Оновити пароль</h2>

// // //         <div className="flex flex-col gap-[16px]">
// // //           <Input
// // //             name="oldPassword"
// // //             type="password"
// // //             placeholder="Старий пароль"
// // //             value={form.oldPassword}
// // //             onChange={handleChange}
// // //             error={errors.oldPassword}
// // //           />

// // //           <Input
// // //             name="newPassword"
// // //             type="password"
// // //             placeholder="Новий пароль"
// // //             value={form.newPassword}
// // //             onChange={handleChange}
// // //             error={errors.newPassword}
// // //           />

// // //           <Input
// // //             name="repeatPassword"
// // //             type="password"
// // //             placeholder="Повторіть пароль"
// // //             value={form.repeatPassword}
// // //             onChange={handleChange}
// // //             error={errors.repeatPassword}
// // //           />
// // //         </div>

// // //         <button
// // //           onClick={handleSubmit}
// // //           className="mt-[24px] w-[196px] h-[50px] bg-[#355EC0] text-white rounded-[4px]"
// // //         >
// // //           Зберегти зміни
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* ================= UI INPUT ================= */

// // // type InputProps = {
// // //   name: string;
// // //   placeholder: string;
// // //   value: string;
// // //   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// // //   error?: string;
// // //   type?: string;
// // // };

// // // function Input({
// // //   name,
// // //   placeholder,
// // //   value,
// // //   onChange,
// // //   error,
// // //   type = "text",
// // // }: InputProps) {
// // //   return (
// // //     <div className="flex flex-col">
// // //       <input
// // //         name={name}
// // //         type={type}
// // //         placeholder={placeholder}
// // //         value={value}
// // //         onChange={onChange}
// // //         className={`border rounded-[10px] px-[10px] h-[48px] outline-none
// // //         ${error ? "border-red-500" : "border-[var(--gray2)]"}`}
// // //       />

// // //       {error && (
// // //         <span className="text-red-500 text-[12px] mt-[4px]">{error}</span>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // // export default function Account() {
// // // //   return <div>Контент: Акаунт</div>;
// // // // }
