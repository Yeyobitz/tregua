import { ReservationFormFields } from './ReservationFormFields';
import { useReservationForm } from '../../hooks/useReservationForm';

export function ReservationForm() {
  const { formData, handleChange, handleSubmit } = useReservationForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <ReservationFormFields 
        formData={formData}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="w-full bg-accent text-light px-8 py-3 rounded-full hover:bg-accent/90 transition-colors text-sm tracking-wide"
      >
        Confirmar reserva
      </button>
    </form>
  );
}