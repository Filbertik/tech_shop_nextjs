import { PrismaClient, Category, Unit } from "@prisma/client";

const prisma = new PrismaClient();

/* ======================
   HELPERS
====================== */
function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ======================
   MOCK DATA
====================== */

const brands = ["ASUS", "Lenovo", "HP", "Dell", "Acer", "MSI"];
const cpus = ["Intel i5", "Intel i7", "Ryzen 5", "Ryzen 7"];
const gpus = ["RTX 3050", "RTX 3060", "RTX 4060", "RTX 4070"];
const types = ["Gaming", "Work", "Ultrabook"];

const images = [
  "/images/Product-photo.png",
  "/images/Product-photo1.png",
  "/images/Product-photo2.png",
  "/images/Product-photo3.png",
  "/images/Product-photo4.png",
  "/images/Product-photo5.png",
  "/images/Product-photo6.png",
  "/images/Product-photo7.png",
  "/images/Product-photo8.png",
];

/* ======================
   MAIN
====================== */
async function main() {
  console.log("🌱 Seed started...");

  /* ======================
     CLEAN (НЕ ТРОГАЄМО AUTH STRUCTURE)
  ====================== */
  await prisma.recipeIngredient.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.ingredient.deleteMany();

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  await prisma.cart.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.viewedProduct.deleteMany();
  await prisma.review.deleteMany();

  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  /* ======================
     USER (ADMIN + TEST USER)
  ====================== */

  const user = await prisma.user.create({
    data: {
      email: "admin@test.com",
      password: "123456",
      firstName: "Admin",
      lastName: "User",
      phone: "+380000000000",
      age: 25,
      photo: "/images/user.png",
    },
  });

  console.log("✅ Users created");

  /* ======================
     INGREDIENTS (НЕ ТРОГАЄМО)
  ====================== */

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

  const ingredients = [];

  for (let name of ingredientNames) {
    const ingredient = await prisma.ingredient.create({
      data: {
        name,
        category: random(Object.values(Category)),
        unit: random(Object.values(Unit)),
        pricePerUnit: Math.random() * 100,
        description: `${name} ingredient`,
      },
    });

    ingredients.push(ingredient);
  }

  console.log("✅ Ingredients created");

  /* ======================
     RECIPES (НЕ ТРОГАЄМО)
  ====================== */

  const recipeNames = ["Borscht", "Chicken Soup", "Salad", "Pasta"];

  for (let name of recipeNames) {
    const recipe = await prisma.recipe.create({
      data: {
        name,
        description: `${name} delicious recipe`,
        imageUrl: "/images/recipe.jpg",
      },
    });

    const count = Math.floor(Math.random() * 4) + 3;

    for (let i = 0; i < count; i++) {
      await prisma.recipeIngredient.create({
        data: {
          recipeId: recipe.id,
          ingredientId: random(ingredients).id,
          quantity: Math.random() * 500,
        },
      });
    }
  }

  console.log("✅ Recipes created");

  /* ======================
     PRODUCTS (🔥 ГОЛОВНЕ ОНОВЛЕННЯ)
  ====================== */

  for (let i = 1; i <= 20; i++) {
    const price = Math.floor(Math.random() * 40000) + 20000;
    const hasDiscount = Math.random() > 0.5;

    const product = await prisma.product.create({
      data: {
        title: `Ноутбук ${random(brands)} ${i}`,
        brand: random(brands),
        model: `Model-${i}`,

        // ✅ ДОДАНО ТУТ
        description: `Ноутбук ${i} — це сучасний пристрій, який ідеально підходить для роботи, навчання та розваг. Оснащений потужним процесором ${random(cpus)}, він легко справляється з багатозадачністю. Якісний дисплей забезпечує чітке та яскраве зображення. Завдяки швидкому SSD накопичувачу система працює максимально швидко. Компактний дизайн робить його зручним для щоденного використання та подорожей. Це надійний вибір для користувачів, які цінують продуктивність і комфорт.`,

        price,
        oldPrice: hasDiscount ? price + 5000 : null,
        rating: Math.floor(Math.random() * 5) + 1,

        availability: true,
        discount: hasDiscount,

        images: [...images], // 🔥 9 images

        image: images[0], // legacy support

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
        vram: [4, 6, 8][Math.floor(Math.random() * 3)],

        ram: [8, 16, 32][Math.floor(Math.random() * 3)],
        ramType: "DDR4",

        ssd: [256, 512, 1024][Math.floor(Math.random() * 3)],
        os: "Windows 11",

        coating: "Matte",
        matrixType: "IPS",
        batteryType: "Li-Ion",

        features: "WiFi, Bluetooth, RGB keyboard",

        // 🔥 CHARACTERISTICS (22+ specs)
        characteristics: {
          cpu: random(cpus),
          gpu: random(gpus),
          ram: "16GB",
          storage: "512GB SSD",
          display: "IPS 144Hz",
          battery: "60Wh",
          weight: "2.1kg",
          color: "Black",
          ports: "USB-C, HDMI",
          warranty: "12 months",
        },
      },
    });

    /* ======================
       REVIEWS
    ====================== */

    await prisma.review.create({
      data: {
        userId: user.id,
        productId: product.id,
        rating: Math.floor(Math.random() * 5) + 1,
        comment: "Great laptop, fast and reliable!",
      },
    });

    /* ======================
       FAVORITES
    ====================== */

    await prisma.favorite.create({
      data: {
        userId: user.id,
        productId: product.id,
      },
    });

    /* ======================
       VIEWS
    ====================== */

    await prisma.viewedProduct.create({
      data: {
        userId: user.id,
        productId: product.id,
      },
    });

    /* ======================
       CART (1 item example)
    ====================== */

    const cart = await prisma.cart.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
      },
    });

    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: product.id,
        quantity: 1,
      },
    });
  }

  console.log("✅ Products + ecosystem created");

  console.log("🎉 SEED COMPLETED SUCCESSFULLY");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// import { PrismaClient, Category, Unit } from "@prisma/client";

// const prisma = new PrismaClient();

// /* ======================
//    RANDOM HELPERS
// ====================== */
// function random<T>(arr: T[]): T {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// /* ======================
//    MOCK DATA
// ====================== */

// // PRODUCTS
// const brands = ["ASUS", "Lenovo", "HP", "Dell", "Acer", "MSI"];
// const cpus = ["Intel i5", "Intel i7", "Ryzen 5", "Ryzen 7"];
// const gpus = ["RTX 3050", "RTX 3060", "RTX 4060", "Integrated"];
// const types = ["Gaming", "Work", "Ultrabook"];

// const images = [
//   "/images/Product-photo.png",
//   "/images/Product-photo1.png",
//   "/images/Product-photo2.png",
//   "/images/Product-photo3.png",
// ];

// // INGREDIENTS
// const ingredientNames = [
//   "Tomato",
//   "Potato",
//   "Chicken",
//   "Milk",
//   "Salt",
//   "Sugar",
//   "Onion",
//   "Garlic",
// ];

// const recipeNames = ["Borscht", "Chicken Soup", "Mashed Potatoes", "Salad"];

// /* ======================
//    MAIN SEED
// ====================== */
// async function main() {
//   console.log("🌱 Start seeding...");

//   /* ======================
//      CLEAN DB
//   ====================== */
//   await prisma.recipeIngredient.deleteMany();
//   await prisma.recipe.deleteMany();
//   await prisma.ingredient.deleteMany();
//   await prisma.product.deleteMany();
//   await prisma.user.deleteMany();

//   /* ======================
//      USERS
//   ====================== */
//   const user = await prisma.user.create({
//     data: {
//       email: "admin@test.com",
//       password: "123456", // ⚠️ потім захешуєш
//     },
//   });

//   console.log("✅ User created");

//   /* ======================
//      INGREDIENTS
//   ====================== */
//   const ingredients = [];

//   for (let name of ingredientNames) {
//     const ingredient = await prisma.ingredient.create({
//       data: {
//         name,
//         category: random(Object.values(Category)),
//         unit: random(Object.values(Unit)),
//         pricePerUnit: Math.random() * 100,
//         description: `${name} description`,
//       },
//     });

//     ingredients.push(ingredient);
//   }

//   console.log("✅ Ingredients created");

//   /* ======================
//      RECIPES
//   ====================== */
//   for (let recipeName of recipeNames) {
//     const recipe = await prisma.recipe.create({
//       data: {
//         name: recipeName,
//         description: `${recipeName} tasty recipe`,
//         imageUrl: "/images/recipe.jpg",
//       },
//     });

//     // додаємо 3-5 інгредієнтів
//     const count = Math.floor(Math.random() * 3) + 3;

//     for (let i = 0; i < count; i++) {
//       const ingredient = random(ingredients);

//       await prisma.recipeIngredient.create({
//         data: {
//           recipeId: recipe.id,
//           ingredientId: ingredient.id,
//           quantity: Math.random() * 500,
//         },
//       });
//     }
//   }

//   console.log("✅ Recipes created");

//   /* ======================
//      PRODUCTS
//   ====================== */
//   const products = [];

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

//   console.log("✅ Products created");

//   console.log("🎉 SEED COMPLETED");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// // import { PrismaClient } from "@prisma/client";

// // const prisma = new PrismaClient();

// // const brands = ["ASUS", "Lenovo", "HP", "Dell", "Acer", "MSI"];
// // const cpus = ["Intel i5", "Intel i7", "Ryzen 5", "Ryzen 7"];
// // const gpus = ["RTX 3050", "RTX 3060", "RTX 4060", "Integrated"];
// // const types = ["Gaming", "Work", "Ultrabook"];

// // // ✅ масив картинок
// // const images = [
// //   "/images/Product-photo.png",
// //   "/images/Product-photo1.png",
// //   "/images/Product-photo2.png",
// //   "/images/Product-photo3.png",
// // ];

// // function random(arr: string[]) {
// //   return arr[Math.floor(Math.random() * arr.length)];
// // }

// // async function main() {
// //   const products = [];

// //   // ❗ (опціонально) очистка таблиці перед seed
// //   await prisma.product.deleteMany();

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

// //       // ✅ тут магія
// //       image: random(images),

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

// // // // import { PrismaClient } from "../src/generated/prisma";
// // // import { PrismaClient } from "@prisma/client";

// // // const prisma = new PrismaClient();

// // // const brands = ["ASUS", "Lenovo", "HP", "Dell", "Acer", "MSI"];
// // // const cpus = ["Intel i5", "Intel i7", "Ryzen 5", "Ryzen 7"];
// // // const gpus = ["RTX 3050", "RTX 3060", "RTX 4060", "Integrated"];
// // // const types = ["Gaming", "Work", "Ultrabook"];

// // // function random(arr: string[]) {
// // //   return arr[Math.floor(Math.random() * arr.length)];
// // // }

// // // async function main() {
// // //   const products = [];

// // //   for (let i = 1; i <= 40; i++) {
// // //     const price = Math.floor(Math.random() * 40000) + 20000;
// // //     const hasDiscount = Math.random() > 0.5;

// // //     products.push({
// // //       title: `Ноутбук ${random(brands)} ${i}`,
// // //       brand: random(brands),
// // //       model: `Model-${i}`,

// // //       price,
// // //       oldPrice: hasDiscount ? price + 5000 : null,
// // //       rating: Math.floor(Math.random() * 5) + 1,
// // //       image: "/images/Product photo.png",

// // //       availability: true,
// // //       discount: hasDiscount,

// // //       type: random(types),
// // //       screenSize: ["14", "15.6", "16"][Math.floor(Math.random() * 3)],
// // //       resolution: "1920x1080",
// // //       screenType: "IPS",
// // //       refreshRate: [60, 120, 144, 165][Math.floor(Math.random() * 4)],

// // //       cpu: random(cpus),
// // //       cores: [4, 6, 8, 12][Math.floor(Math.random() * 4)],

// // //       gpuBrand: "NVIDIA",
// // //       gpuType: "Discrete",
// // //       gpuModel: random(gpus),
// // //       vram: [2, 4, 6, 8][Math.floor(Math.random() * 4)],

// // //       ram: [8, 16, 32][Math.floor(Math.random() * 3)],
// // //       ramType: "DDR4",

// // //       ssd: [256, 512, 1024][Math.floor(Math.random() * 3)],
// // //       os: "Windows 11",

// // //       coating: "Matte",
// // //       matrixType: "IPS",
// // //       batteryType: "Li-Ion",

// // //       features: "WiFi, Bluetooth, Backlit keyboard",
// // //     });
// // //   }

// // //   await prisma.product.createMany({ data: products });

// // //   console.log("✅ Seeded 40 products");
// // // }

// // // main()
// // //   .catch(console.error)
// // //   .finally(() => prisma.$disconnect());
