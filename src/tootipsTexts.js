import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export const helpText = (
  <>
    <div>
      Estos son las reservas activas para este mes. Cada circulo representa una
      reserva en la franja activa:
    </div>
    <div>Color1: Mañana (08 a 15)</div>
    <div>Color2: Tarde (15 a 19)</div>
    <div>Color3: Noche (21 a 06)</div>
  </>
);

export const configuration_helpText = (
  <>
    <div>
      Esta informacion no es obligatoria y solo se mostrara a los demas usuarios
      si lo habilitas
    </div>
    <div>
      <AiOutlineEye /> Puedes habilitar para que vean tu informacion con el
      icono del ojo
    </div>
    {/* <div>
        <FiBell /> Alertas vía mail: Puedes habilitarlas todas o personalizarlas
        y recibir solo la de los edificios que te interesan.
      </div>
      <div>
        <FiBell /> Si quieres que se te notificará cuando te inviten a un nuevo
        edificio
      </div> */}
  </>
);
