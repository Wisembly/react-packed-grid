import React, { useState, useCallback, useRef } from 'react'

import { PackedGrid } from 'react-packed-grid'

function GridItemPlaceholder({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundColor: 'whitesmoke',
        display: 'grid',
        placeContent: 'center',
        width: '100%',
        height: '100%',
        border: '2px solid black'
      }}
    >
      {children}
    </div>
  )
}

const App = () => {
  const updateLayoutRef = useRef<() => void>()
  const focusRef = useCallback((el) => {
    el.focus()
  }, [])
  const [numBoxes, setNumBoxes] = useState(1)
  const [aspectRatio, setAspectRatio] = useState(1)

  return (
    <>
      <div className='controls'>
        <label>
          Boxes
          <input
            ref={focusRef}
            type='number'
            min='1'
            value={numBoxes}
            onChange={(e) => setNumBoxes(Number.parseInt(e.target.value, 10))}
          />
        </label>
        <label>
          Aspect Ratio
          <input
            ref={focusRef}
            type='number'
            step='any'
            value={aspectRatio}
            onChange={(e) => setAspectRatio(Number.parseFloat(e.target.value))}
          />
        </label>
        <button
          onClick={() => {
            if (updateLayoutRef.current) {
              updateLayoutRef.current()
            }
          }}
        >
          Force Layout Update
        </button>
      </div>
      <PackedGrid
        boxAspectRatio={aspectRatio}
        className='fullscreen'
        updateLayoutRef={updateLayoutRef}
      >
        {Array.from({ length: numBoxes }).map((_, idx) => (
          <GridItemPlaceholder key={idx}>Box {idx + 1}</GridItemPlaceholder>
        ))}
      </PackedGrid>
    </>
  )
}

export default App
