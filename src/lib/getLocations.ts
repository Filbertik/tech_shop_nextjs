import { localLocations } from "@/data/locations";

export async function getLocations() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    // ❗ ми НЕ використовуємо OSM як source міст
    await fetch(
      "https://nominatim.openstreetmap.org/search?country=Ukraine&format=json&limit=1",
      {
        signal: controller.signal,
        headers: {
          "User-Agent": "nextjs-app",
        },
      },
    );

    clearTimeout(timeout);

    // 👉 просто повертаємо локальні дані
    // (OSM тут тільки як "health check")
    return localLocations;
  } catch (e) {
    console.warn("OSM failed → fallback to local data", e);
    return localLocations;
  }
}

// import { localLocations } from "@/data/locations";

// export async function getLocations() {
//   try {
//     const controller = new AbortController();

//     const timeout = setTimeout(() => controller.abort(), 3000); // 3 сек timeout

//     const res = await fetch(
//       "https://nominatim.openstreetmap.org/search?country=Ukraine&format=json&limit=50",
//       {
//         signal: controller.signal,
//         headers: {
//           "User-Agent": "nextjs-app",
//         },
//       },
//     );

//     clearTimeout(timeout);

//     if (!res.ok) throw new Error("API error");

//     const data = await res.json();

//     // 👉 мінімальна нормалізація (OSM не дає області структуровано)
//     const cities = data.map((item: any) => item.display_name.split(",")[0]);

//     // прибираємо дублікати
//     const uniqueCities = Array.from(new Set(cities));

//     return [
//       {
//         region: "OpenStreetMap",
//         cities: uniqueCities.slice(0, 30),
//       },
//     ];
//   } catch (error) {
//     console.warn("⚠️ OSM failed, using local fallback", error);

//     return localLocations;
//   }
// }
