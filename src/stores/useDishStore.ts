import { create } from 'zustand';
import { Dish, CreateDishDTO } from '../types/dish';
import * as dishService from '../services/dishes';

interface DishStore {
  dishes: Dish[];
  loading: boolean;
  error: string | null;
  fetchDishes: () => Promise<void>;
  addDish: (data: CreateDishDTO) => Promise<void>;
  updateDish: (id: string, data: Partial<CreateDishDTO>) => Promise<void>;
  deleteDish: (id: string) => Promise<void>;
}

export const useDishStore = create<DishStore>((set) => ({
  dishes: [],
  loading: false,
  error: null,
  fetchDishes: async () => {
    set({ loading: true, error: null });
    try {
      const dishes = await dishService.getDishes();
      set({ dishes, loading: false });
    } catch (error) {
      set({ error: 'Error al cargar los platos', loading: false });
    }
  },
  addDish: async (data) => {
    set({ loading: true, error: null });
    try {
      await dishService.createDish(data);
      const dishes = await dishService.getDishes();
      set({ dishes, loading: false });
    } catch (error) {
      set({ error: 'Error al crear el plato', loading: false });
    }
  },
  updateDish: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await dishService.updateDish(id, data);
      const dishes = await dishService.getDishes();
      set({ dishes, loading: false });
    } catch (error) {
      set({ error: 'Error al actualizar el plato', loading: false });
    }
  },
  deleteDish: async (id) => {
    set({ loading: true, error: null });
    try {
      await dishService.deleteDish(id);
      const dishes = await dishService.getDishes();
      set({ dishes, loading: false });
    } catch (error) {
      set({ error: 'Error al eliminar el plato', loading: false });
    }
  }
}));