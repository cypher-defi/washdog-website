import Link from "next/link"

export const metadata = {
  title: "Política de Privacidad | Washdog",
  description: "Política de privacidad del sitio web Washdog"
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-accent-blue hover:underline text-sm mb-8 inline-block"
        >
          &larr; Volver al inicio
        </Link>

        <h1 className="text-3xl font-bold text-primary mb-8">
          Política de Privacidad
        </h1>

        <div className="prose prose-sm text-primary/80 space-y-6">
          <p>
            En WashDog, operado por Los Pelusos SpA, respetamos la privacidad de
            los usuarios y tratamos los datos personales conforme a la Ley Nº
            19.628 sobre Protección de la Vida Privada.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-8">
            1. Responsable del tratamiento
          </h2>
          <ul className="list-none space-y-1">
            <li>
              <strong>Responsable:</strong> Los Pelusos SpA
            </li>
            <li>
              <strong>Sitio web:</strong>{" "}
              <a href="https://www.washdog.cl" className="text-accent-blue">
                https://www.washdog.cl
              </a>
            </li>
            <li>
              <strong>Correo de contacto:</strong>{" "}
              <a href="mailto:contacto@washdog.cl" className="text-accent-blue">
                contacto@washdog.cl
              </a>
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-primary mt-8">
            2. Datos personales recopilados
          </h2>
          <p>Podemos recopilar los siguientes datos personales:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Nombre y apellido.</li>
            <li>Correo electrónico y datos de contacto.</li>
            <li>Información entregada voluntariamente a través de formularios.</li>
            <li>
              Datos técnicos de navegación (dirección IP, navegador, sistema
              operativo).
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-primary mt-8">
            3. Finalidad del tratamiento
          </h2>
          <p>Los datos personales se utilizarán para:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Responder consultas y solicitudes.</li>
            <li>Gestionar comunicaciones con clientes o interesados.</li>
            <li>Proporcionar información sobre servicios de WashDog.</li>
            <li>Mejorar el funcionamiento y experiencia del Sitio Web.</li>
            <li>Cumplir obligaciones legales.</li>
          </ul>

          <h2 className="text-xl font-semibold text-primary mt-8">
            4. Consentimiento
          </h2>
          <p>
            El envío de datos personales mediante el Sitio Web implica el
            consentimiento del titular para su tratamiento conforme a esta Política
            de Privacidad.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-8">
            5. Conservación de los datos
          </h2>
          <p>
            Los datos se conservarán solo durante el tiempo necesario para cumplir
            la finalidad para la cual fueron recopilados o según lo exija la ley.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-8">
            6. Comunicación de datos
          </h2>
          <p>WashDog no cederá datos personales a terceros, salvo:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Cuando sea necesario para la prestación de servicios.</li>
            <li>
              Cuando exista obligación legal o requerimiento de autoridad
              competente.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-primary mt-8">
            7. Derechos del titular
          </h2>
          <p>El titular de los datos puede ejercer los derechos de:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Acceso</li>
            <li>Rectificación</li>
            <li>Cancelación</li>
            <li>Oposición</li>
          </ul>
          <p>
            Para ejercer estos derechos, puede contactar a{" "}
            <a href="mailto:contacto@washdog.cl" className="text-accent-blue">
              contacto@washdog.cl
            </a>
            .
          </p>

          <h2 className="text-xl font-semibold text-primary mt-8">8. Seguridad</h2>
          <p>
            WashDog adopta medidas razonables de seguridad para proteger los datos
            personales frente a accesos no autorizados, pérdida o uso indebido.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-8">9. Cookies</h2>
          <p>
            El Sitio Web puede utilizar cookies propias o de terceros con fines
            funcionales y analíticos. El usuario puede configurar su navegador para
            rechazar o eliminar cookies.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-8">
            10. Cambios en la Política de Privacidad
          </h2>
          <p>
            WashDog se reserva el derecho de modificar esta Política de Privacidad.
            Cualquier cambio será publicado en el Sitio Web.
          </p>
        </div>
      </div>
    </main>
  )
}
