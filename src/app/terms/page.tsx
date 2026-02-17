import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Términos y condiciones de uso del sitio web Washdog",
  alternates: {
    canonical: "https://www.washdog.cl/terms"
  }
}

export default function TermsPage() {
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
          Términos y Condiciones de Uso
        </h1>

        <div className="prose prose-sm text-primary/80 space-y-6">
          <p>
            Bienvenido a{" "}
            <a href="https://www.washdog.cl" className="text-accent-blue">
              https://www.washdog.cl
            </a>{" "}
            (en adelante, el &quot;Sitio Web&quot;).
          </p>
          <p>
            Al acceder y utilizar este Sitio Web, aceptas quedar obligado por los
            presentes Términos y Condiciones. Si no estás de acuerdo con ellos,
            debes abstenerte de utilizar el Sitio Web.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-8">
            1. Identificación del titular
          </h2>
          <p>
            El Sitio Web es operado por Los Pelusos SpA (en adelante,
            &quot;WashDog&quot;), con domicilio en Chile.
          </p>
          <p>
            Correo electrónico de contacto:{" "}
            <a href="mailto:contacto@washdog.cl" className="text-accent-blue">
              contacto@washdog.cl
            </a>
          </p>

          <h2 className="text-xl font-semibold text-primary mt-8">2. Objeto</h2>
          <p>
            El Sitio Web tiene como finalidad proporcionar información sobre los
            servicios, productos y soluciones ofrecidas por WashDog, así como
            permitir el contacto con clientes y potenciales usuarios.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-8">
            3. Uso del Sitio Web
          </h2>
          <p>El usuario se compromete a:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Utilizar el Sitio Web de conformidad con la ley, la moral, el orden
              público y estos Términos y Condiciones.
            </li>
            <li>
              No utilizar el Sitio Web para fines ilícitos o que puedan afectar a
              WashDog o a terceros.
            </li>
            <li>
              No introducir virus, malware u otros elementos que puedan dañar o
              interferir en el funcionamiento del Sitio Web.
            </li>
          </ul>
          <p>
            WashDog se reserva el derecho de suspender o restringir el acceso al
            Sitio Web en caso de uso indebido.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-8">
            4. Propiedad intelectual
          </h2>
          <p>
            Todos los contenidos del Sitio Web, incluyendo textos, imágenes,
            logotipos, marcas, diseños, fotografías y código, son propiedad de
            WashDog o de terceros que han autorizado su uso, y están protegidos
            por la legislación chilena vigente.
          </p>
          <p>
            Queda prohibida su reproducción, distribución o modificación sin
            autorización expresa.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-8">
            5. Responsabilidad
          </h2>
          <p>
            El Sitio Web se ofrece &quot;tal como está&quot;. WashDog no garantiza:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>La disponibilidad permanente del Sitio Web.</li>
            <li>La ausencia de errores técnicos.</li>
            <li>
              Que los contenidos sean completamente exactos o actualizados en todo
              momento.
            </li>
          </ul>
          <p>
            WashDog no será responsable por daños derivados del uso o imposibilidad
            de uso del Sitio Web.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-8">
            6. Enlaces a terceros
          </h2>
          <p>
            El Sitio Web puede contener enlaces a sitios de terceros. WashDog no se
            responsabiliza por los contenidos, servicios o políticas de privacidad
            de dichos sitios.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-8">
            7. Modificaciones
          </h2>
          <p>
            WashDog se reserva el derecho de modificar estos Términos y Condiciones
            en cualquier momento. Las modificaciones entrarán en vigor desde su
            publicación en el Sitio Web.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-8">
            8. Legislación aplicable y jurisdicción
          </h2>
          <p>
            Estos Términos y Condiciones se rigen por las leyes de la República de
            Chile, y cualquier controversia será sometida a los tribunales
            ordinarios de justicia de Chile.
          </p>
        </div>
      </div>
    </main>
  )
}
