import { Link } from 'react-router-dom';
import { useDishStore } from '../stores/useDishStore';
import { useEffect } from 'react';

export function FeaturedDishes() {
  const { dishes, fetchDishes, loading } = useDishStore();
  
  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  const featuredDishes = dishes.filter(dish => dish.featured);

  if (loading) {
    return (
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-serif text-light mb-12 text-center">Platos Destacados</h3>
          <div className="text-center text-light">Cargando...</div>
        </div>
      </section>
    );
  }

  if (featuredDishes.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-serif text-light mb-12 text-center">Platos Destacados</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {featuredDishes.map((dish) => (
            <Link 
              key={dish.id}
              to={`/platos/${dish.id}`}
              className="group relative block aspect-[4/3] overflow-hidden rounded-lg"
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h4 className="text-2xl font-serif text-light text-center px-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {dish.name}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}