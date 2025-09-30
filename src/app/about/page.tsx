import Navigation from '@/components/Navigation';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Nosotros</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            En Sweet & Healthy creemos que no tienes que renunciar al sabor para mantener un estilo de vida saludable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Nuestra Historia</h2>
            <p className="text-gray-600 mb-4">
              Sweet & Healthy nació de la pasión por crear postres que nutran tanto el cuerpo como el alma. 
              Como amantes de los dulces que también valoramos la salud, nos propusimos revolucionar la repostería tradicional.
            </p>
            <p className="text-gray-600 mb-4">
              Cada receta está cuidadosamente elaborada con ingredientes orgánicos, endulzantes naturales y 
              técnicas artesanales que preservan tanto el sabor como los nutrientes.
            </p>
            <p className="text-gray-600">
              Hoy, somos orgullosos de ofrecer una alternativa deliciosa y consciente para quienes buscan 
              disfrutar sin culpa.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-pink-100 rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">🌿</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Misión</h3>
            <p className="text-gray-600">
              Crear postres saludables y deliciosos que demuestren que cuidar tu salud no significa renunciar al placer.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Nuestros Valores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Ingredientes Naturales</h3>
              <p className="text-gray-600">
                Solo utilizamos ingredientes orgánicos y naturales, libres de químicos y preservantes artificiales.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">👩‍🍳</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Elaboración Artesanal</h3>
              <p className="text-gray-600">
                Cada postre se prepara a mano con técnicas tradicionales y el cuidado de los maestros reposteros.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💚</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Compromiso con la Salud</h3>
              <p className="text-gray-600">
                Creemos que la alimentación consciente es un acto de amor propio y compromiso con el bienestar.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center bg-green-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">¿Listo para probar?</h2>
          <p className="text-gray-600 mb-6">
            Descubre por qué miles de clientes han elegido Sweet & Healthy como su opción favorita para postres saludables.
          </p>
          <a 
            href="/productos"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Explorar Productos
          </a>
        </div>
      </div>
    </div>
  );
}