import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const brands = ["ASUS", "Lenovo", "HP", "Dell", "Acer", "MSI"];
const cpus = ["Intel i5", "Intel i7", "Ryzen 5", "Ryzen 7"];
const gpus = ["RTX 3050", "RTX 3060", "RTX 4060", "Integrated"];
const types = ["Gaming", "Work", "Ultrabook"];

// ✅ масив картинок
const images = [
  "/images/Product-photo.png",
  "/images/Product-photo1.png",
  "/images/Product-photo2.png",
  "/images/Product-photo3.png",
];

function random(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {
  const products = [];

  // ❗ (опціонально) очистка таблиці перед seed
  await prisma.product.deleteMany();

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

      // ✅ тут магія
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

  console.log("✅ Seeded 40 products");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

// // import { PrismaClient } from "../src/generated/prisma";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const brands = ["ASUS", "Lenovo", "HP", "Dell", "Acer", "MSI"];
// const cpus = ["Intel i5", "Intel i7", "Ryzen 5", "Ryzen 7"];
// const gpus = ["RTX 3050", "RTX 3060", "RTX 4060", "Integrated"];
// const types = ["Gaming", "Work", "Ultrabook"];

// function random(arr: string[]) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// async function main() {
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
//       image: "/images/Product photo.png",

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
