// Data produk lokal dengan gambar produk fashion yang stabil dan relevan
const customOutfitProducts = [
  // --- 1. BAJU (5 Item) ---
  {
    id: 1,
    title: "Blouse Pastel Silk Elegan",
    price: 135000,
    category: "Pakaian Wanita",
    description: "Blouse berbahan silk halus dengan nuansa pastel yang nyaman dan anggun untuk dikenakan sehari-hari maupun ke kantor.",
    image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.8, count: 120 }
  },
  {
    id: 2,
    title: "Kemeja Linen Casual Pria",
    price: 155000,
    category: "Pakaian Pria",
    description: "Kemeja bahan linen premium yang adem dan menyerap keringat, cocok untuk gaya santai maupun semi-formal.",
    image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.6, count: 95 }
  },
  {
    id: 3,
    title: "Kaos Oversize Cotton Combed",
    price: 95000,
    category: "Pakaian Pria",
    description: "Kaos polos gaya streetwear dengan potongan oversize yang trendi dan sangat nyaman dipakai bersantai.",
    image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.7, count: 150 }
  },
  {
    id: 4,
    title: "Knitted Crop Top Estetik",
    price: 115000,
    category: "Pakaian Wanita",
    description: "Atasan rajut model crop top dengan rajutan lembut dan motif garis minimalis ala gaya Korea.",
    image: "https://images.pexels.com/photos/1485031/pexels-photo-1485031.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.5, count: 80 }
  },
  {
    id: 5,
    title: "Turtleneck Sweater Hangat",
    price: 165000,
    category: "Pakaian Wanita",
    description: "Sweater rajut dengan kerah tinggi yang memberikan kehangatan ekstra dan kesan chic saat cuaca dingin.",
    image: "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.9, count: 110 }
  },

  // --- 2. CELANA (5 Item) ---
  {
    id: 6,
    title: "High Waist Wide Leg Jeans",
    price: 185000,
    category: "Celana",
    description: "Celana jeans model wide leg dengan potongan high waist yang membuat kaki terlihat lebih jenjang dan modis.",
    image: "https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.9, count: 230 }
  },
  {
    id: 7,
    title: "Culottes Pants Cream Pastel",
    price: 125000,
    category: "Celana",
    description: "Celana kulot longgar berbahan katun twill yang lembut, sangat pas dipadukan dengan berbagai blouse.",
    image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.6, count: 75 }
  },
  {
    id: 8,
    title: "Chino Pants Slim Fit Pria",
    price: 175000,
    category: "Celana",
    description: "Celana chino panjang dengan potongan slim fit yang rapi untuk acara formal maupun kasual.",
    image: "https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.7, count: 140 }
  },
  {
    id: 9,
    title: "Cargo Jogger Pants Streetwear",
    price: 145000,
    category: "Celana",
    description: "Celana jogger dengan banyak kantong samping khas gaya urban streetwear yang kekinian.",
    image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.4, count: 65 }
  },
  {
    id: 10,
    title: "Linen Pleated Pants Casual",
    price: 135000,
    category: "Celana",
    description: "Celana bahan linen ringan dengan aksen lipit di bagian depan untuk tampilan rapi tapi tetap santai.",
    image: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.8, count: 90 }
  },

  // --- 3. SANDAL & SEPATU (5 Item) ---
  {
    id: 11,
    title: "Sneakers Putih Minimalis Casual",
    price: 245000,
    category: "Sandal & Sepatu",
    description: "Sepatu sneakers putih bersih dengan desain simpel yang cocok dipadukan dengan outfit apa saja.",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.9, count: 310 }
  },
  {
    id: 12,
    title: "Loafers Kulit Sintetis Klasik",
    price: 195000,
    category: "Sandal & Sepatu",
    description: "Sepatu loafers elegan untuk memberikan sentuhan formal yang manis pada penampilan harianmu.",
    image: "https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.6, count: 85 }
  },
  {
    id: 13,
    title: "Platform Sandals Strappy Sage",
    price: 115000,
    category: "Sandal & Sepatu",
    description: "Sandal platform bertali empuk dengan warna hijau sage lembut yang nyaman dipakai jalan-jalan santai.",
    image: "https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.7, count: 105 }
  },
  {
    id: 14,
    title: "Slip-On Canvas Shoes Casual",
    price: 135000,
    category: "Sandal & Sepatu",
    description: "Sepatu kanvas tanpa tali yang praktis, ringan, dan sangat nyaman untuk penggunaan harian.",
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.5, count: 60 }
  },
  {
    id: 15,
    title: "Mules Sandals Elegan Cream",
    price: 125000,
    category: "Sandal & Sepatu",
    description: "Sandal mules tertutup di depan dengan hak tipis yang memberikan kesan anggun dan feminin.",
    image: "https://images.pexels.com/photos/1478477/pexels-photo-1478477.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.8, count: 130 }
  },

  // --- 4. ROK (5 Item) ---
  {
    id: 16,
    title: "Midi Skirt Plisket Pastel",
    price: 115000,
    category: "Rok",
    description: "Rok berlipit (plisket) panjang medium dengan bahan jatuh yang anggun dan bebas gerak.",
    image: "https://images.pexels.com/photos/1007018/pexels-photo-1007018.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.8, count: 170 }
  },
  {
    id: 17,
    title: "A-Line Denim Skirt Vintage",
    price: 145000,
    category: "Rok",
    description: "Rok jeans model A-line dengan kancing depan bergaya retro vintage era 90-an.",
    image: "https://images.pexels.com/photos/601316/pexels-photo-601316.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.7, count: 145 }
  },
  {
    id: 18,
    title: "Korean High Waist Tennis Skirt",
    price: 98000,
    category: "Rok",
    description: "Rok pendek lipit model tenis ala Korea yang memberikan kesan ceria dan awet muda.",
    image: "https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.6, count: 115 }
  },
  {
    id: 19,
    title: "Long Linen Skirt Cream",
    price: 155000,
    category: "Rok",
    description: "Rok panjang bahan linen polos dengan potongan lurus yang anggun dan adem dipakai.",
    image: "https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.9, count: 95 }
  },
  {
    id: 20,
    title: "Button-Up Midi Skirt Katun",
    price: 125000,
    category: "Rok",
    description: "Rok midi berbahan katun lembut dilengkapi aksen kancing mati di bagian depan.",
    image: "https://images.pexels.com/photos/794064/pexels-photo-794064.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.5, count: 70 }
  },

  // --- 5. JAKET (5 Item) ---
  {
    id: 21,
    title: "Oversize Denim Jacket Vintage",
    price: 245000,
    category: "Jaket",
    description: "Jaket jeans model oversize klasik yang kokoh dan tak pernah lekang oleh waktu.",
    image: "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.9, count: 280 }
  },
  {
    id: 22,
    title: "Puffer Jacket Hangat Pastel",
    price: 275000,
    category: "Jaket",
    description: "Jaket tebal berbulu sintetis dengan model puffer yang super empuk dan trendi di musim dingin.",
    image: "https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.8, count: 190 }
  },
  {
    id: 23,
    title: "Bomber Jacket Casual Pria/Wanita",
    price: 215000,
    category: "Jaket",
    description: "Jaket bomber ringan dengan resleting kuat dan kantong fungsional di bagian lengan.",
    image: "https://images.pexels.com/photos/16170/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.7, count: 160 }
  },
  {
    id: 24,
    title: "Knitted Cardigan Oversize Sage",
    price: 165000,
    category: "Jaket",
    description: "Outerwear rajut tebal dengan warna hijau sage yang lembut dan hangat untuk pelengkap OOTD.",
    image: "https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.8, count: 210 }
  },
  {
    id: 25,
    title: "Parka Jacket Casual Outdoor",
    price: 265000,
    category: "Jaket",
    description: "Jaket parka tahan angin dengan tudung kepala berbulu, cocok untuk aktivitas luar ruangan.",
    image: "https://images.pexels.com/photos/6764040/pexels-photo-6764040.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: { rate: 4.6, count: 125 }
  }
];

export const fetchProducts = async () => {
  return customOutfitProducts;
};

export const fetchProductById = async (id) => {
  const product = customOutfitProducts.find((item) => item.id === Number(id));
  if (!product) {
    throw new Error('Produk tidak ditemukan.');
  }
  return product;
};