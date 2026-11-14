import { PRODUCTS } from '@/data/products';
import { ProductItem } from '@/types';

export const productService = {
  getAllProducts: (): ProductItem[] => {
    return PRODUCTS;
  },

  getProductById: (id: string): ProductItem | undefined => {
    return PRODUCTS.find((p) => p.id === id);
  },

  getProductsByCategory: (category: string): ProductItem[] => {
    if (category === 'All') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  },

  getProductsByAesthetic: (aesthetic: string): ProductItem[] => {
    return PRODUCTS.filter((p) => p.aesthetic === aesthetic);
  },

  filterProducts: (category: string, maxPrice: number, query: string): ProductItem[] => {
    return PRODUCTS.filter((p) => {
      const matchCat = category === 'All' || p.category.toLowerCase() === category.toLowerCase();
      const matchPrice = maxPrice > 0 ? p.price <= maxPrice : true;
      const matchQuery =
        !query.trim() ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.retailer.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchPrice && matchQuery;
    });
  },
};
