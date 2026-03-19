"use client";

import Hero from "@/components/home/hero";
import Categories from "@/components/home/categories";
import Bestsellers from "@/components/home/bestsellers";
import Sale from "@/components/home/sale";
import Choice from "@/components/home/choice";
import FormSection from "@/components/home/form";

export default function Home() {
  return (
    <main className="flex flex-col gap-16 p-6">
      <Hero />
      <Categories />
      <Bestsellers />
      <Sale />
      <Choice />
      <FormSection />
    </main>
  );
}
