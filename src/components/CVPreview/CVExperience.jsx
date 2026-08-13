function CVExperience({ experience }) {
  const visible = experience.filter((entry) =>
    [entry.company, entry.role, entry.from, entry.to, entry.description].some(
      (v) => String(v || "").trim() !== ""
    )
  );

  if (visible.length === 0) return null;

  return (
    <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e0e0e8' }}>
      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: '10px',
        fontWeight: 500,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: '#6b21a8',
        marginBottom: '12px',
      }}>
        Experience
      </div>

      {visible.map((entry) => (
        <div key={entry.id} style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px' }}>
            <span style={{ fontWeight: 600, fontSize: '14px', color: '#0a0a0a' }}>
              {entry.role}
            </span>
            {(entry.from || entry.to) && (
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '11px',
                color: '#888888',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}>
                {[entry.from, entry.to].filter(Boolean).join(' – ')}
              </span>
            )}
          </div>
          {entry.company && (
            <div style={{
              fontSize: '13px',
              color: '#6b21a8',
              fontWeight: 500,
              marginTop: '2px',
            }}>
              {entry.company}
            </div>
          )}
          {entry.description && (
            <p style={{ margin: '6px 0 0', fontSize: '13px', color: '#444444', lineHeight: '1.6' }}>
              {entry.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default CVExperience;