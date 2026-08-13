function CVHeader({ personal, scale = 1 }) {
  const px = (value) => `${Math.round(value * scale)}px`;
  const photoSrc = personal.photo || personal.image || "";
  // Email and phone are shown in the footer of the CV (CVPreview), not here.
  const contactRows = [
    personal.location && { label: 'Address',  value: personal.location },
    personal.linkedin && { label: 'LinkedIn',  value: personal.linkedin },
    personal.github   && { label: 'Website',   value: personal.github   },
  ].filter(Boolean);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `${Math.round(152 * scale)}px 1fr`,
      gap: px(24),
      alignItems: 'flex-start',
      marginBottom: px(24),
    }}>
      {/* Photo */}
      <div style={{
        width: px(152),
        height: px(152),
        background: '#d1d5db',
        borderRadius: '999px',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        {photoSrc ? (
          <img
            src={photoSrc}
            alt={personal.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '999px' }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'DM Mono', monospace", fontSize: px(11), color: '#9ca3af',
            letterSpacing: '0.04em',
          }}>
            photo
          </div>
        )}
      </div>

      {/* Name + contact */}
      <div style={{ paddingTop: px(4) }}>
        <h1 style={{
          margin: '0 0 10px',
          fontFamily: "'Inter', sans-serif",
          fontSize: px(28),
          fontWeight: 800,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: '#1a3658',
          lineHeight: 1.1,
        }}>
          {personal.name || 'Your Name'}
        </h1>

        <div style={{ display: 'grid', gap: px(3) }}>
          {contactRows.map((row) => (
            <div key={row.label} style={{ display: 'grid', gridTemplateColumns: `${px(78)} 1fr`, gap: px(8), fontSize: px(13), fontFamily: "'Inter', sans-serif", alignItems: 'start' }}>
              <span style={{ fontWeight: 700, color: '#1a3658' }}>{row.label}:</span>
              <span style={{ color: '#374151', minWidth: 0, overflowWrap: 'anywhere', wordBreak: 'break-word' }}>{row.value}</span>
            </div>
          ))}
        </div>

        {(personal.description || personal.summary) && (
          <p style={{
            margin: `${px(10)} 0 0`,
            fontSize: px(14),
            color: '#374151',
            lineHeight: '1.55',
            fontFamily: "'Inter', sans-serif",
          }}>
            {personal.description || personal.summary}
          </p>
        )}
      </div>
    </div>
  );
}

export default CVHeader;