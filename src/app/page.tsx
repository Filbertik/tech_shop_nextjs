"use client";

// import RecipeCard from "@/components/common/recipe-card";
// import { useRecipeStore } from "@/store/recipe.store";
// import { Button } from "@heroui/react";
// import Link from "next/link";

// export default function Home() {
//   const { recipes, isLoading, error } = useRecipeStore();

//   return (
//     <>
//       <div className="flex w-full justify-center items-center mb-4">
//         <Link href="/recipes/new">
//           <Button color="primary">Додати новий</Button>
//         </Link>
//       </div>

//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       {isLoading && <p>Загрузка...</p>}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {recipes.map((recipe) => (
//           <RecipeCard key={recipe.id} recipe={recipe} />
//         ))}
//       </div>
//     </>
//   );
// }

export default function Home() {
  return (
    <main className="flex flex-col gap-16 p-6">
      {/* HERO */}
      <section className="h-[60vh] flex items-center justify-center bg-gray-100 rounded-2xl">
        <div className="text-center max-w-xl">
          <h1 className="text-4xl font-bold mb-4">Tech Shop</h1>
          <p>
            Це hero banner. Тут буде акція, банер або ключова пропозиція
            магазину.
          </p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <p>
          Тут будуть категорії товарів (наприклад: телефони, ноутбуки,
          аксесуари).
        </p>
      </section>

      {/* BESTSELLERS */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Bestsellers</h2>
        <p>Тут будуть найпопулярніші товари.</p>
      </section>

      {/* SALE */}
      <section className="bg-red-50 p-6 rounded-2xl">
        <h2 className="text-2xl font-semibold mb-4">Sale</h2>
        <p>Тут будуть товари зі знижками.</p>
      </section>

      {/* CHOICE */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Choice</h2>
        <p>Тут буде підбірка рекомендованих товарів.</p>
      </section>

      {/* FORM */}
      <section className="bg-gray-100 p-6 rounded-2xl">
        <h2 className="text-2xl font-semibold mb-4">Stay in touch</h2>
        <p>Тут буде форма підписки або зворотнього зв’язку.</p>
      </section>
    </main>
  );
}
