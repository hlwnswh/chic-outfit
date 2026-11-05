import React, { createContext, useState, useContext, useEffect } from 'react';

const FavoriteContext = createContext();

const FAV_KEY = 'chic_outfit_favorites';

const bacaFavorit = () => {
  try {
    const saved = localStorage.getItem(FAV_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(bacaFavorit);

  // Setiap favorit berubah, langsung disimpan
  useEffect(() => {
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
    } catch {
      // abaikan kalau penyimpanan penuh
    }
  }, [favorites]);

  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      const isExist = prevFavorites.some((item) => item.id === product.id);
      if (isExist) {
        return prevFavorites.filter((item) => item.id !== product.id);
      } else {
        return [...prevFavorites, product];
      }
    });
  };

  const isFavorite = (id) => {
    return favorites.some((item) => item.id === id);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);