'use client'

import { useState } from 'react'
import Link from 'next/link'

type CoatType = 'short' | 'medium' | 'long' | 'curly'
type ActivityLevel = 'low' | 'mid' | 'high'
type Skin = 'normal' | 'sensitive'

const COAT_OPTIONS: { value: CoatType; label: string; desc: string }[] = [
  { value: 'short',  label: 'Pelo corto',   desc: 'Labrador, Boxer, Dálmata, Beagle' },
  { value: 'medium', label: 'Pelo mediano', desc: 'Golden Retriever, Border Collie, Husky' },
  { value: 'long',   label: 'Pelo largo',   desc: 'Shih Tzu, Yorkshire, Maltés, Cocker' },
  { value: 'curly',  label: 'Pelo rizado',  desc: 'Caniche, Bichón, Cockapoo, Schnauzer' },
]

const ACTIVITY_OPTIONS: { value: ActivityLevel; label: string; desc: string }[] = [
  { value: 'low',  label: 'Mayormente en casa',  desc: 'Poco contacto con tierra o parques' },
  { value: 'mid',  label: 'Mixto',               desc: 'Paseos diarios, algo de parque' },
  { value: 'high', label: 'Muy activo',           desc: 'Muchas salidas, juega en el parque a diario' },
]

const SKIN_OPTIONS: { value: Skin; label: string; desc: string }[] = [
  { value: 'normal',    label: 'Piel normal',    desc: 'Sin problemas conocidos' },
  { value: 'sensitive', label: 'Piel sensible',  desc: 'Alergias, irritaciones o dermatitis' },
]

// Bath frequency in weeks [min, max]
const BATH_BASE: Record<CoatType, Record<ActivityLevel, [number, number]>> = {
  short:  { low: [6, 8], mid: [4, 6], high: [3, 4] },
  medium: { low: [4, 6], mid: [3, 4], high: [2, 3] },
  long:   { low: [3, 4], mid: [2, 3], high: [2, 3] },
  curly:  { low: [3, 4], mid: [3, 4], high: [2, 3] },
}

const GROOM_FREQ: Record<CoatType, string> = {
  short:  'cada 8–10 semanas',
  medium: 'cada 6–8 semanas',
  long:   'cada 4–6 semanas',
  curly:  'cada 4–6 semanas',
}

function getResult(coat: CoatType, activity: ActivityLevel, skin: Skin) {
  let [min, max] = BATH_BASE[coat][activity]
  if (skin === 'sensitive') { min += 1; max += 2 }
  return {
    bath: `cada ${min}–${max} semanas`,
    groom: GROOM_FREQ[coat],
    skinTip: skin === 'sensitive'
      ? 'Con piel sensible, usa siempre shampoo hipoalergénico sin sulfatos ni parabenos. En WashDog trabajamos exclusivamente con productos para piel sensible.'
      : null,
  }
}

function OptionCard({
  label, desc, selected, onClick,
}: { label: string; desc: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
        selected
          ? 'border-accent-blue bg-accent-blue/10 text-primary'
          : 'border-primary/10 bg-white hover:border-primary/30 text-primary/70'
      }`}
    >
      <span className='block font-semibold text-sm mb-0.5'>{label}</span>
      <span className='block text-xs font-light text-primary/50'>{desc}</span>
    </button>
  )
}

const STEPS = ['Tipo de pelo', 'Actividad', 'Piel']

export function GroomingCalculator() {
  const [step, setStep] = useState(0)
  const [coat, setCoat] = useState<CoatType | null>(null)
  const [activity, setActivity] = useState<ActivityLevel | null>(null)
  const [skin, setSkin] = useState<Skin | null>(null)

  const canAdvance = [coat !== null, activity !== null, skin !== null][step]
  const showResult = coat && activity && skin && step === 3

  const result = showResult ? getResult(coat, activity, skin) : null

  function reset() {
    setStep(0); setCoat(null); setActivity(null); setSkin(null)
  }

  return (
    <div className='my-10 rounded-2xl border border-primary/10 bg-background overflow-hidden'>
      {/* Header */}
      <div className='bg-primary px-6 py-5'>
        <p className='text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-1'>Herramienta gratuita</p>
        <h3 className='text-white font-semibold text-lg leading-snug'>
          ¿Cada cuánto deberías bañar a tu perro?
        </h3>
        <p className='text-white/60 text-sm font-light mt-1'>
          3 preguntas · resultado personalizado
        </p>
      </div>

      <div className='p-6'>
        {!showResult ? (
          <>
            {/* Progress */}
            <div className='flex items-center gap-2 mb-6'>
              {STEPS.map((s, i) => (
                <div key={s} className='flex items-center gap-2'>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                    i < step ? 'bg-accent-blue text-white' :
                    i === step ? 'bg-primary text-white' :
                    'bg-primary/10 text-primary/40'
                  }`}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span className={`text-xs ${i === step ? 'text-primary font-medium' : 'text-primary/40'}`}>{s}</span>
                  {i < STEPS.length - 1 && <div className='w-6 h-px bg-primary/15 mx-1' />}
                </div>
              ))}
            </div>

            {/* Step 0: Coat */}
            {step === 0 && (
              <div className='space-y-2'>
                <p className='text-sm font-medium text-primary mb-3'>¿Qué tipo de pelo tiene tu perro?</p>
                {COAT_OPTIONS.map(o => (
                  <OptionCard key={o.value} {...o} selected={coat === o.value} onClick={() => setCoat(o.value)} />
                ))}
              </div>
            )}

            {/* Step 1: Activity */}
            {step === 1 && (
              <div className='space-y-2'>
                <p className='text-sm font-medium text-primary mb-3'>¿Qué tan activo es tu perro?</p>
                {ACTIVITY_OPTIONS.map(o => (
                  <OptionCard key={o.value} {...o} selected={activity === o.value} onClick={() => setActivity(o.value)} />
                ))}
              </div>
            )}

            {/* Step 2: Skin */}
            {step === 2 && (
              <div className='space-y-2'>
                <p className='text-sm font-medium text-primary mb-3'>¿Cómo es la piel de tu perro?</p>
                {SKIN_OPTIONS.map(o => (
                  <OptionCard key={o.value} {...o} selected={skin === o.value} onClick={() => setSkin(o.value)} />
                ))}
              </div>
            )}

            {/* Nav */}
            <div className='flex items-center justify-between mt-6'>
              {step > 0 ? (
                <button onClick={() => setStep(s => s - 1)} className='text-sm text-primary/50 hover:text-primary transition-colors'>
                  ← Volver
                </button>
              ) : <span />}
              <button
                disabled={!canAdvance}
                onClick={() => setStep(s => s + 1)}
                className='px-6 py-2.5 rounded-full bg-primary text-white text-xs font-semibold tracking-[0.15em] uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent-blue transition-all'
              >
                {step < 2 ? 'Siguiente →' : 'Ver resultado →'}
              </button>
            </div>
          </>
        ) : (
          /* Result */
          <div>
            <div className='grid grid-cols-2 gap-3 mb-5'>
              <div className='bg-accent-blue/10 rounded-xl p-4'>
                <p className='text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-1'>Baño</p>
                <p className='text-primary font-semibold text-base leading-snug'>{result!.bath}</p>
              </div>
              <div className='bg-accent-green/30 rounded-xl p-4'>
                <p className='text-[10px] font-bold uppercase tracking-widest text-accent-green-dark mb-1'>Peluquería</p>
                <p className='text-primary font-semibold text-base leading-snug'>{result!.groom}</p>
              </div>
            </div>

            {result!.skinTip && (
              <div className='bg-accent-peach/20 rounded-xl p-4 mb-5'>
                <p className='text-xs text-primary/70 font-light leading-relaxed'>{result!.skinTip}</p>
              </div>
            )}

            <p className='text-xs text-primary/50 font-light mb-5'>
              Estos son rangos orientativos. La frecuencia ideal puede variar según la raza exacta, la época del año y la dieta de tu perro.
            </p>

            <div className='flex items-center gap-3 flex-wrap'>
              <Link
                href='https://share.google/8t1bo1xyYIfTKyDAw'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-accent-blue transition-all tracking-[0.15em] uppercase shadow-lg shadow-primary/20'
              >
                Reservar en WashDog
              </Link>
              <button onClick={reset} className='text-sm text-primary/40 hover:text-primary transition-colors'>
                Recalcular
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
