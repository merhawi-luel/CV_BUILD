function CVExperience({ experience, scale = 1 }) {
  const px = (value) => `${Math.round(value * scale)}px`;
  const visible = experience.filter((e) =>
    [e.company, e.role, e.from, e.to, e.description].some(
      (v) => String(v || '').trim() !== ''
    )
  );

  if (visible.length === 0) return null;

  return (
    <div style={{ marginBottom: px(20) }}>
      {/* Section header */}
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: px(13),
        fontWeight: 800,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#1a3658',
        borderBottom: `${Math.max(1, Math.round(2 * scale))}px solid #1a3658`,
        paddingBottom: px(4),
        marginBottom: px(12),
      }}>
        Work Experience
      </div>

      {visible.map((entry) => (
        <div key={entry.id} style={{ marginBottom: px(14) }}>
          {/* Role + date row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: px(12),
          }}>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: px(13.5),
              color: '#111827',
            }}>
              {[entry.role, entry.company].filter(Boolean).join(', ')}
            </span>
            {(entry.from || entry.to) && (
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: px(13),
                fontWeight: 600,
                color: '#1a3658',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}>
                {[entry.from, entry.to].filter(Boolean).join(' - ')}
              </span>
            )}
          </div>

          {/* Description as bullet points */}
          {entry.description && (
            <ul style={{
              margin: `${Math.round(6 * scale)}px 0 0 ${Math.round(18 * scale)}px`,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: px(3),
            }}>
              {entry.description.split('\n').filter(Boolean).map((line, i) => (
                <li key={i} style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: px(14),
                  color: '#374151',
                  lineHeight: '1.6',
                }}>
                  {line}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default CVExperience;