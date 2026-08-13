function CVEducation({ education }) {
  const visible = education.filter((entry) =>
    [entry.school, entry.degree, entry.field, entry.from, entry.to].some(
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
        Education
      </div>

      {visible.map((entry) => (
        <div key={entry.id} style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px' }}>
            <span style={{ fontWeight: 600, fontSize: '14px', color: '#0a0a0a' }}>
              {entry.school}
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
          {(entry.degree || entry.field) && (
            <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#555555' }}>
              {entry.degree}{entry.degree && entry.field ? `, ${entry.field}` : entry.field}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default CVEducation;