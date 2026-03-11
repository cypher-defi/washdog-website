/**
 * Service JSON-LD — injected per service page.
 * Tells Google the specific service type, area served, and price range
 * for each commune landing page.
 */

const SERVICE_MAP: Record<string, {
  name: string
  description: string
  priceRange: string
}> = {
  'peluqueria-canina': {
    name: 'Peluquería Canina',
    description: 'Corte profesional, baño completo, brushing y limpieza de orejas para tu perro.',
    priceRange: '$20.000 – $45.000 CLP',
  },
  'bano-perros': {
    name: 'Baño para Perros',
    description: 'Baño completo con shampoo suave, secado profesional y limpieza básica.',
    priceRange: '$10.000 – $16.000 CLP',
  },
  'peluqueria-gatos': {
    name: 'Peluquería para Gatos',
    description: 'Baño y corte profesional para gatos en ambiente tranquilo y sin estrés.',
    priceRange: '$40.000 CLP',
  },
  'auto-lavado': {
    name: 'Autolavado de Perros',
    description: 'Baña a tu perro tú mismo con equipos profesionales de hidroterapia.',
    priceRange: '$10.000 – $16.000 CLP',
  },
  'precio-peluqueria': {
    name: 'Precios Peluquería Canina',
    description: 'Precios transparentes y accesibles para peluquería y baño canino en Santiago.',
    priceRange: '$10.000 – $45.000 CLP',
  },
}

const COMMUNE_MAP: Record<string, string> = {
  'nunoa': 'Ñuñoa',
  'providencia': 'Providencia',
  'las-condes': 'Las Condes',
  'la-reina': 'La Reina',
  'macul': 'Macul',
  'vitacura': 'Vitacura',
  'san-miguel': 'San Miguel',
  'san-joaquin': 'San Joaquín',
  'penalolen': 'Peñalolén',
  'la-florida': 'La Florida',
  'la-cisterna': 'La Cisterna',
  'el-bosque': 'El Bosque',
  'san-ramon': 'San Ramón',
  'la-granja': 'La Granja',
  'pedro-aguirre-cerda': 'Pedro Aguirre Cerda',
  'lo-espejo': 'Lo Espejo',
  'san-bernardo': 'San Bernardo',
  'puente-alto': 'Puente Alto',
  'la-pintana': 'La Pintana',
  'santiago-centro': 'Santiago Centro',
  'recoleta': 'Recoleta',
  'independencia': 'Independencia',
  'conchali': 'Conchalí',
  'huechuraba': 'Huechuraba',
  'quilicura': 'Quilicura',
  'renca': 'Renca',
  'cerro-navia': 'Cerro Navia',
  'pudahuel': 'Pudahuel',
  'lo-prado': 'Lo Prado',
  'estacion-central': 'Estación Central',
  'quinta-normal': 'Quinta Normal',
  'lo-barnechea': 'Lo Barnechea',
  'maipu': 'Maipú',
  'cerrillos': 'Cerrillos',
}

function parseSlug(slug: string): {
  service: typeof SERVICE_MAP[string] | null
  commune: string | null
} {
  for (const [key, service] of Object.entries(SERVICE_MAP)) {
    if (slug.startsWith(key)) {
      const communeSlug = slug.slice(key.length + 1)
      return { service, commune: COMMUNE_MAP[communeSlug] ?? null }
    }
  }
  return { service: null, commune: null }
}

interface Props {
  slug: string
}

export function ServiceJsonLd({ slug }: Props) {
  const { service, commune } = parseSlug(slug)
  if (!service) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    name: commune ? `${service.name} en ${commune}` : service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      '@id': 'https://www.washdog.cl',
      name: 'Washdog',
    },
    areaServed: commune
      ? {
          '@type': 'City',
          name: commune,
          containedInPlace: {
            '@type': 'AdministrativeArea',
            name: 'Región Metropolitana',
            containedInPlace: { '@type': 'Country', name: 'Chile' },
          },
        }
      : { '@type': 'City', name: 'Santiago' },
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'CLP',
        description: service.priceRange,
      },
      availability: 'https://schema.org/InStock',
      url: `https://www.washdog.cl/servicios/${slug}`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
