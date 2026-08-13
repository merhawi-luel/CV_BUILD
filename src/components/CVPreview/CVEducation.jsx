


function CVEducation({ education, scale = 1 }) {
  const px = (value) => `${Math.round(value * scale)}px`;
  const visible = education.filter((e) =>
    [e.school, e.degree, e.field, e.from, e.to].some(
      (v) => String(v || '').trim() !== ''
    )
  );

  if (visible.length === 0) return null;

  return (
    <div style={{ marginBottom: px(20) }}>
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
        Education
      </div>

      {visible.map((entry) => (
        <div key={entry.id} style={{ marginBottom: px(14) }}>
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
              {[entry.degree, entry.field].filter(Boolean).join(' in ')}
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

          {entry.school && (
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: px(13),
              color: '#374151',
              marginTop: px(2),
            }}>
              {entry.school}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CVEducation;