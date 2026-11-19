export const LOGO_SRC = '/logo-yellow-1-1-a973bcb5.png'

// The logo has black lettering, so on dark backgrounds it sits on a white plate.
export default function Logo({ height = 34, plate = true, className = '' }) {
  const img = (
    <img
      src={LOGO_SRC}
      alt="Gravity Concepts"
      height={height}
      width={Math.round(height * (858 / 289))}
      style={{ height, width: 'auto', display: 'block' }}
    />
  )
  return plate ? <span className={`logo-plate ${className}`}>{img}</span> : img
}
