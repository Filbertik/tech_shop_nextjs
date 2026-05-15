"use client";

import Hero from "@/components/home/hero";
import Categories from "@/components/home/categories";
import Bestsellers from "@/components/home/bestsellers";
import Sale from "@/components/home/sale";
import Choice from "@/components/home/choice";
import FormSection from "@/components/home/form";
import Brands from "@/components/home/brands";

export default function Home() {
  return (
    <>
      {/* FULL WIDTH HERO */}
      <Hero />

      {/* КОНТЕНТ З ОБМЕЖЕННЯМ */}
      <main className="flex flex-col gap-16 p-6 max-w-[1440px] mx-auto">
        <Categories />
        <Bestsellers />
        <Sale />
        <Choice />
        <FormSection />
        <Brands />
      </main>
    </>
  );
}

// "use client";

// import Hero from "@/components/home/hero";
// import Categories from "@/components/home/categories";
// import Bestsellers from "@/components/home/bestsellers";
// import Sale from "@/components/home/sale";
// import Choice from "@/components/home/choice";
// import FormSection from "@/components/home/form";

// export default function Home() {
//   return (
//     <main className="flex flex-col gap-16 p-6">
//       <Hero />
//       <Categories />
//       <Bestsellers />
//       <Sale />
//       <Choice />
//       <FormSection />
//     </main>
//   );
// }
