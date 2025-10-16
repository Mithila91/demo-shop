/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-require-imports */
'use client'

import dynamic from 'next/dynamic'

const StudioComponent = dynamic(() => import('../../../sanity.config').then(mod => {
  const { NextStudio } = require('next-sanity/studio')
  return () => <NextStudio config={mod.default} />
}), {
  ssr: false,
  loading: () => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div>Loading Sanity Studio...</div>
    </div>
  )
})

export default function StudioPage() {
  return <StudioComponent />
}
