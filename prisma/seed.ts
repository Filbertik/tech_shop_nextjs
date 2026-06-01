import { PrismaClient, Category, Unit } from "@prisma/client";

const prisma = new PrismaClient();

/* ======================
   RANDOM HELPERS
====================== */
function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ======================
   MOCK DATA
====================== */

// PRODUCTS
const brands = ["ASUS", "Lenovo", "HP", "Dell", "Acer", "MSI"];
const cpus = ["Intel i5", "Intel i7", "Ryzen 5", "Ryzen 7"];
const gpus = ["RTX 3050", "RTX 3060", "RTX 4060", "Integrated"];
const types = ["Gaming", "Work", "Ultrabook"];

const images = [
  "/images/Product-photo.png",
  "/images/Product-photo1.png",
  "/images/Product-photo2.png",
  "/images/Product-photo3.png",
];

// INGREDIENTS
const ingredientNames = [
  "Tomato",
  "Potato",
  "Chicken",
  "Milk",
  "Salt",
  "Sugar",
  "Onion",
  "Garlic",
];

const recipeNames = ["Borscht", "Chicken Soup", "Mashed Potatoes", "Salad"];

/* ======================
   MAIN SEED
====================== */
async function main() {
  console.log("🌱 Start seeding...");

  /* ======================
     CLEAN DB
  ====================== */
  await prisma.recipeIngredient.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  /* ======================
     USERS
  ====================== */
  const user = await prisma.user.create({
    data: {
      email: "admin@test.com",
      password: "123456", // ⚠️ потім захешуєш
    },
  });

  console.log("✅ User created");

  /* ======================
     INGREDIENTS
  ====================== */
  const ingredients = [];

  for (let name of ingredientNames) {
    const ingredient = await prisma.ingredient.create({
      data: {
        name,
        category: random(Object.values(Category)),
        unit: random(Object.values(Unit)),
        pricePerUnit: Math.random() * 100,
        description: `${name} description`,
      },
    });

    ingredients.push(ingredient);
  }

  console.log("✅ Ingredients created");

  /* ======================
     RECIPES
  ====================== */
  for (let recipeName of recipeNames) {
    const recipe = await prisma.recipe.create({
      data: {
        name: recipeName,
        description: `${recipeName} tasty recipe`,
        imageUrl: "/images/recipe.jpg",
      },
    });

    // додаємо 3-5 інгредієнтів
    const count = Math.floor(Math.random() * 3) + 3;

    for (let i = 0; i < count; i++) {
      const ingredient = random(ingredients);

      await prisma.recipeIngredient.create({
        data: {
          recipeId: recipe.id,
          ingredientId: ingredient.id,
          quantity: Math.random() * 500,
        },
      });
    }
  }

  console.log("✅ Recipes created");

  /* ======================
     PRODUCTS
  ====================== */
  const products = [];

  for (let i = 1; i <= 40; i++) {
    const price = Math.floor(Math.random() * 40000) + 20000;
    const hasDiscount = Math.random() > 0.5;

    products.push({
      title: `Ноутбук ${random(brands)} ${i}`,
      brand: random(brands),
      model: `Model-${i}`,

      price,
      oldPrice: hasDiscount ? price + 5000 : null,
      rating: Math.floor(Math.random() * 5) + 1,

      image: random(images),

      availability: true,
      discount: hasDiscount,

      type: random(types),
      screenSize: ["14", "15.6", "16"][Math.floor(Math.random() * 3)],
      resolution: "1920x1080",
      screenType: "IPS",
      refreshRate: [60, 120, 144, 165][Math.floor(Math.random() * 4)],

      cpu: random(cpus),
      cores: [4, 6, 8, 12][Math.floor(Math.random() * 4)],

      gpuBrand: "NVIDIA",
      gpuType: "Discrete",
      gpuModel: random(gpus),
      vram: [2, 4, 6, 8][Math.floor(Math.random() * 4)],

      ram: [8, 16, 32][Math.floor(Math.random() * 3)],
      ramType: "DDR4",

      ssd: [256, 512, 1024][Math.floor(Math.random() * 3)],
      os: "Windows 11",

      coating: "Matte",
      matrixType: "IPS",
      batteryType: "Li-Ion",

      features: "WiFi, Bluetooth, Backlit keyboard",
    });
  }

  await prisma.product.createMany({ data: products });

  console.log("✅ Products created");

  console.log("🎉 SEED COMPLETED");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const brands = ["ASUS", "Lenovo", "HP", "Dell", "Acer", "MSI"];
// const cpus = ["Intel i5", "Intel i7", "Ryzen 5", "Ryzen 7"];
// const gpus = ["RTX 3050", "RTX 3060", "RTX 4060", "Integrated"];
// const types = ["Gaming", "Work", "Ultrabook"];

// // ✅ масив картинок
// const images = [
//   "/images/Product-photo.png",
//   "/images/Product-photo1.png",
//   "/images/Product-photo2.png",
//   "/images/Product-photo3.png",
// ];

// function random(arr: string[]) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// async function main() {
//   const products = [];

//   // ❗ (опціонально) очистка таблиці перед seed
//   await prisma.product.deleteMany();

//   for (let i = 1; i <= 40; i++) {
//     const price = Math.floor(Math.random() * 40000) + 20000;
//     const hasDiscount = Math.random() > 0.5;

//     products.push({
//       title: `Ноутбук ${random(brands)} ${i}`,
//       brand: random(brands),
//       model: `Model-${i}`,

//       price,
//       oldPrice: hasDiscount ? price + 5000 : null,
//       rating: Math.floor(Math.random() * 5) + 1,

//       // ✅ тут магія
//       image: random(images),

//       availability: true,
//       discount: hasDiscount,

//       type: random(types),
//       screenSize: ["14", "15.6", "16"][Math.floor(Math.random() * 3)],
//       resolution: "1920x1080",
//       screenType: "IPS",
//       refreshRate: [60, 120, 144, 165][Math.floor(Math.random() * 4)],

//       cpu: random(cpus),
//       cores: [4, 6, 8, 12][Math.floor(Math.random() * 4)],

//       gpuBrand: "NVIDIA",
//       gpuType: "Discrete",
//       gpuModel: random(gpus),
//       vram: [2, 4, 6, 8][Math.floor(Math.random() * 4)],

//       ram: [8, 16, 32][Math.floor(Math.random() * 3)],
//       ramType: "DDR4",

//       ssd: [256, 512, 1024][Math.floor(Math.random() * 3)],
//       os: "Windows 11",

//       coating: "Matte",
//       matrixType: "IPS",
//       batteryType: "Li-Ion",

//       features: "WiFi, Bluetooth, Backlit keyboard",
//     });
//   }

//   await prisma.product.createMany({ data: products });

//   console.log("✅ Seeded 40 products");
// }

// main()
//   .catch(console.error)
//   .finally(() => prisma.$disconnect());

// // // import { PrismaClient } from "../src/generated/prisma";
// // import { PrismaClient } from "@prisma/client";

// // const prisma = new PrismaClient();

// // const brands = ["ASUS", "Lenovo", "HP", "Dell", "Acer", "MSI"];
// // const cpus = ["Intel i5", "Intel i7", "Ryzen 5", "Ryzen 7"];
// // const gpus = ["RTX 3050", "RTX 3060", "RTX 4060", "Integrated"];
// // const types = ["Gaming", "Work", "Ultrabook"];

// // function random(arr: string[]) {
// //   return arr[Math.floor(Math.random() * arr.length)];
// // }

// // async function main() {
// //   const products = [];

// //   for (let i = 1; i <= 40; i++) {
// //     const price = Math.floor(Math.random() * 40000) + 20000;
// //     const hasDiscount = Math.random() > 0.5;

// //     products.push({
// //       title: `Ноутбук ${random(brands)} ${i}`,
// //       brand: random(brands),
// //       model: `Model-${i}`,

// //       price,
// //       oldPrice: hasDiscount ? price + 5000 : null,
// //       rating: Math.floor(Math.random() * 5) + 1,
// //       image: "/images/Product photo.png",

// //       availability: true,
// //       discount: hasDiscount,

// //       type: random(types),
// //       screenSize: ["14", "15.6", "16"][Math.floor(Math.random() * 3)],
// //       resolution: "1920x1080",
// //       screenType: "IPS",
// //       refreshRate: [60, 120, 144, 165][Math.floor(Math.random() * 4)],

// //       cpu: random(cpus),
// //       cores: [4, 6, 8, 12][Math.floor(Math.random() * 4)],

// //       gpuBrand: "NVIDIA",
// //       gpuType: "Discrete",
// //       gpuModel: random(gpus),
// //       vram: [2, 4, 6, 8][Math.floor(Math.random() * 4)],

// //       ram: [8, 16, 32][Math.floor(Math.random() * 3)],
// //       ramType: "DDR4",

// //       ssd: [256, 512, 1024][Math.floor(Math.random() * 3)],
// //       os: "Windows 11",

// //       coating: "Matte",
// //       matrixType: "IPS",
// //       batteryType: "Li-Ion",

// //       features: "WiFi, Bluetooth, Backlit keyboard",
// //     });
// //   }

// //   await prisma.product.createMany({ data: products });

// //   console.log("✅ Seeded 40 products");
// // }

// // main()
// //   .catch(console.error)
// //   .finally(() => prisma.$disconnect());
