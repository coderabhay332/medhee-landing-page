'use client'

import { motion } from 'framer-motion'

const partners = [
  'Apollo Pharmacy',
  'Practo',
  'Fortis Hospital',
  'Max Healthcare',
  'Tata 1mg',
  'PharmEasy',
  'Manipal Hospitals',
  'Medanta',
]

// Duplicate the list to ensure seamless infinite looping
const duplicatedPartners = [...partners, ...partners, ...partners]

export function LogoBar() {
  return (
    <div className="relative z-10 border-y border-border bg-background py-8 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground/80">
          Trusted by patients & providers affiliated with India's leading networks
        </p>
        
        <div className="relative mt-8 flex w-full items-center justify-start overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
          <motion.div
            className="flex gap-16 whitespace-nowrap"
            animate={{ x: [0, -800] }}
            transition={{
              ease: 'linear',
              duration: 25,
              repeat: Infinity,
            }}
          >
            {duplicatedPartners.map((name, i) => (
              <span
                key={i}
                className="text-sm font-semibold tracking-wider uppercase text-muted-foreground/40 transition-colors duration-200 hover:text-muted-foreground/75"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
