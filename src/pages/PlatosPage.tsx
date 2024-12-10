import { Link } from 'react-router-dom';
import { useDishStore } from '../stores/useDishStore';
import { useEffect } from 'react';

export function PlatosPage() {
  const { dishes, fetchDishes, loading } = useDishStore();
  
  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  return (
    <div className="min-h-screen">
      <div className="relative h-[70vh]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551326844-4df70f78d0e9?auto=format&fit=crop&q=80"
            alt="Nuestros Platos"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-light mb-8">
            Nuestros Platos
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-light/90 leading-relaxed">
            Descubra nuestra selección de platos, donde la tradición se encuentra con la innovación.
          </p>
        </div>
      </div>

      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-r-transparent" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {dishes.map((dish) => (
                <Link 
                  key={dish.id}
                  to={`/platos/${dish.id}`}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-[1.02]">
                    <div className="relative h-80">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-light">
                      <h4 className="text-2xl font-serif mb-3">{dish.name}</h4>
                      <p className="text-sm leading-relaxed text-neutral opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {dish.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}