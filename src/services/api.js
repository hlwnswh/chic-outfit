// src/services/api.js
 
// Kunci localStorage, dipakai juga oleh hooks/useProducts.js
export const STORAGE_KEY = 'chic_outfit_products';
 
// Naikkan angka ini setiap kali kamu mengganti customOutfitProducts,
// supaya browser membuang data lama dan memakai data terbaru.
export const DATA_VERSION = '2';
const VERSION_KEY = 'chic_outfit_products_version';
 
// Data produk awal (dipakai kalau localStorage kosong atau versinya beda)
export const customOutfitProducts = [
  {
    id: 1,
    title: "Jaket Parka Hoodie Pink Pastel",
    price: 185000,
    category: "Jaket",
    description: "Jaket ringan berbahan parasut dengan hoodie dalam berbahan jersey abu-abu. Dilengkapi tali serut di tudung dan pinggang, serta karet di pergelangan tangan. Cocok untuk aktivitas harian dan cuaca gerimis.",
    image: "https://yourimageshare.com/ib/3sWpwTl5pM.jpg",
    rating: {
      rate: 4.7,
      count: 38
    }
  },
  {
    id: 2,
    title: "Jaket Bomber Suede Coklat Tua",
    price: 325000,
    category: "Jaket",
    description: "Jaket bomber oversize bertekstur suede coklat tua dengan kerah klasik, kancing press, dan lapisan dalam quilted yang hangat. Tampilan elegan dan timeless.",
    image: "https://yourimageshare.com/ib/nKri5i6qbk.jpg",
    rating: {
      rate: 4.8,
      count: 52
    }
  },
  {
    id: 3,
    title: "Jaket Kulit Oversize Coklat dengan Sabuk",
    price: 350000,
    category: "Jaket",
    description: "Jaket kulit sintetis model cropped oversize dengan detail sabuk di bagian pinggang dan resleting depan. Gaya kasual yang modis dan mudah dipadukan.",
    image: "https://yourimageshare.com/ib/Ok2ZJs4ZJ5.jpg",
    rating: {
      rate: 4.6,
      count: 44
    }
  },
  {
    id: 4,
    title: "Rok Panjang A-Line Krem",
    price: 135000,
    category: "Rok",
    description: "Rok panjang model A-line berwarna krem dengan pinggang tinggi dan resleting belakang. Jatuh mengembang dan nyaman dipakai ke kantor maupun acara santai.",
    image: "https://yourimageshare.com/ib/iLL5qH4uRF.jpg",
    rating: {
      rate: 4.7,
      count: 61
    }
  },
  {
    id: 5,
    title: "Rok Panjang Denim Biru",
    price: 165000,
    category: "Rok",
    description: "Rok panjang denim dengan cuci medium blue, potongan lurus, dan saku samping. Tampilan kasual yang cocok dipadukan dengan atasan polos atau kemeja.",
    image: "https://yourimageshare.com/ib/iJgu2GIgIQ.jpg",
    rating: {
      rate: 4.5,
      count: 36
    }
  },
  {
    id: 6,
    title: "Rok Tiered Panjang Coklat",
    price: 145000,
    category: "Rok",
    description: "Rok maxi berlapis (tiered) berwarna coklat dengan pinggang karet yang nyaman. Bahan jatuh dan adem, cocok untuk gaya feminin sehari-hari.",
    image: "https://yourimageshare.com/ib/Ia652HovIm.jpg",
    rating: {
      rate: 4.8,
      count: 73
    }
  },
  {
    id: 7,
    title: "Sandal Slide Suede Dua Strap Taupe",
    price: 275000,
    category: "Sandal & Sepatu",
    description: "Sandal slide dua strap berbahan suede dengan footbed cork yang ergonomis dan buckle logam. Nyaman dipakai seharian.",
    image: "https://yourimageshare.com/ib/dVdEMZP6CZ.jpg",
    rating: {
      rate: 4.9,
      count: 88
    }
  },
  {
    id: 8,
    title: "Sneakers Retro Krem Strip Coklat",
    price: 399000,
    category: "Sandal & Sepatu",
    description: "Sneakers gaya retro berwarna krem dengan strip coklat dan sol gum. Kombinasi suede dan nilon yang ringan dan stylish.",
    image: "https://yourimageshare.com/ib/QEQTVlNJ0Q.jpg",
    rating: {
      rate: 4.8,
      count: 97
    }
  },
  {
    id: 9,
    title: "Sandal Mules Hak Pendek Krem",
    price: 120000,
    category: "Sandal & Sepatu",
    description: "Sandal mules ujung lancip dengan strap silang dan hak balok pendek. Elegan, nyaman, dan cocok untuk acara semi formal.",
    image: "https://yourimageshare.com/ib/jOVrceKKSq.jpg",
    rating: {
      rate: 4.6,
      count: 49
    }
  },
  {
    id: 10,
    title: "Sneakers Platform Hitam Putih",
    price: 225000,
    category: "Sandal & Sepatu",
    description: "Sneakers platform dengan kombinasi hitam putih dan detail petir di sisi. Sol tebal memberi tambahan tinggi dan tampilan streetwear.",
    image: "https://yourimageshare.com/ib/t2vfRhCA1J.jpg",
    rating: {
      rate: 4.5,
      count: 41
    }
  },
  {
    id: 11,
    title: "Celana Jeans Hitam Washed",
    price: 175000,
    category: "Celana",
    description: "Celana jeans hitam dengan efek washed dan cuff di bagian bawah. Bahan denim tebal, awet, dan nyaman dipakai untuk aktivitas harian.",
    image: "https://yourimageshare.com/ib/RHWtT3XIag.jpg",
    rating: {
      rate: 4.6,
      count: 57
    }
  },
  {
    id: 12,
    title: "Celana Kulot Pleated Krem",
    price: 155000,
    category: "Celana",
    description: "Celana kulot high waist dengan lipit depan berwarna krem. Potongan lebar yang jatuh rapi, cocok untuk gaya formal maupun kasual.",
    image: "https://yourimageshare.com/ib/vAJHIwFt1A.jpg",
    rating: {
      rate: 4.7,
      count: 64
    }
  },
  {
    id: 13,
    title: "Celana Cargo Hijau Army",
    price: 195000,
    category: "Celana",
    description: "Celana cargo longgar berwarna hijau army dengan saku samping besar. Bahan katun twill yang kuat dan nyaman untuk gaya streetwear.",
    image: "https://yourimageshare.com/ib/4ZHZF8Kx7V.jpg",
    rating: {
      rate: 4.8,
      count: 79
    }
  },
  {
    id: 14,
    title: "Celana Jeans Wide Leg Biru Muda",
    price: 210000,
    category: "Celana",
    description: "Jeans wide leg dengan warna biru muda dan potongan longgar dari pinggang hingga bawah. Tampilan clean dan trendy.",
    image: "https://yourimageshare.com/ib/ktfHLdTn6m.jpg",
    rating: {
      rate: 4.7,
      count: 68
    }
  },
  {
    id: 15,
    title: "Kemeja Pendek Hijau Sage",
    price: 130000,
    category: "Pakaian Pria",
    description: "Kemeja lengan pendek dengan kerah camp berwarna hijau sage, saku dada, dan kancing depan. Bahan adem dan nyaman untuk gaya santai.",
    image: "https://yourimageshare.com/ib/ggQXH1RsgI.jpg",
    rating: {
      rate: 4.6,
      count: 45
    }
  },
  {
    id: 16,
    title: "Polo Rajut Hitam Half Zip",
    price: 165000,
    category: "Pakaian Pria",
    description: "Polo rajut lengan pendek berwarna hitam dengan tekstur anyaman dan resleting setengah di bagian depan. Bahan lembut dan adem, tampilan rapi untuk kasual maupun semi formal.",
    image: "https://yourimageshare.com/ib/gEjiDeJdos.jpg",
    rating: {
      rate: 4.7,
      count: 58
    }
  },
  {
    id: 17,
    title: "Cardigan Rajut Krem Kancing Emas",
    price: 155000,
    category: "Pakaian Wanita",
    description: "Cardigan rajut kerah bulat berwarna krem dengan kancing depan bernuansa emas. Bahan halus dan hangat, mudah dipadukan dengan rok maupun celana.",
    image: "https://yourimageshare.com/ib/PyxaD3RutJ.jpg",
    rating: {
      rate: 4.8,
      count: 66
    }
  },
  {
    id: 18,
    title: "Blouse Peplum Bordir Hijau Sage Muda",
    price: 175000,
    category: "Pakaian Wanita",
    description: "Blouse lengan panjang dengan detail bordir bunga, lengan puff, dan potongan peplum di bagian bawah. Tampilan manis dan feminin untuk acara santai maupun kerja.",
    image: "https://yourimageshare.com/ib/ZMq5xfsXm1.jpg",
    rating: {
      rate: 4.7,
      count: 47
    }
  }
];
 
// ---------- Helper localStorage ----------
 
// Mengembalikan array produk tersimpan, atau null kalau belum ada / versi beda / rusak.
export const bacaProdukTersimpan = () => {
  try {
    if (localStorage.getItem(VERSION_KEY) !== DATA_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(VERSION_KEY, DATA_VERSION);
      return null;
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return null;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};
 
export const simpanProduk = (daftar) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(daftar));
    localStorage.setItem(VERSION_KEY, DATA_VERSION);
    return true;
  } catch {
    return false;
  }
};
 
export const ambilProduk = () => {
  const tersimpan = bacaProdukTersimpan();
  return tersimpan !== null ? tersimpan : customOutfitProducts;
};
 
// ---------- API ----------
 
export const fetchProducts = async () => {
  return ambilProduk();
};
 
export const fetchProductById = async (id) => {
  const product = ambilProduk().find((item) => item.id === Number(id));
  if (!product) {
    throw new Error('Produk tidak ditemukan.');
  }
  return product;
};
 