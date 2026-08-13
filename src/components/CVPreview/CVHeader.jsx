function CVHeader({ personal }) {
  const contactParts = [personal.email, personal.phone, personal.location].filter(Boolean);
  const profileLinks = [
    personal.linkedin && { label: "LinkedIn", value: personal.linkedin },
    personal.github  && { label: "GitHub",   value: personal.github  },
  ].filter(Boolean);

  return (
    <div style={{ paddingBottom: '18px', marginBottom: '18px', borderBottom: '1px solid #e0e0e8' }}>
      <h1 style={{
        margin: 0,
        fontFamily: "'Inter', sans-serif",
        fontSize: '32px',
        fontWeight: 700,
        letterSpacing: '-0.03em',
        color: '#0a0a0a',
        lineHeight: 1.1,
        textTransform: 'none',
      }}>
        {personal.name || 'Your Name'}
      </h1>

      {contactParts.length > 0 && (
        <div style={{
          marginTop: '8px',
          fontFamily: "'DM Mono', monospace",
          fontSize: '12px',
          color: '#555555',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px 16px',
        }}>
          {contactParts.map((part, i) => <span key={i}>{part}</span>)}
        </div>
      )}

      {profileLinks.length > 0 && (
        <div style={{ display: 'flex', gap: '16px', marginTop: '6px', flexWrap: 'wrap' }}>
          {profileLinks.map((link) => (
            <a
              key={link.label}
              href={link.value.startsWith('http') ? link.value : `https://${link.value}`}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '12px',
                color: '#6b21a8',
                textDecoration: 'none',
                borderBottom: '1px solid #e9d5ff',
              }}
            >
              {link.value.replace(/^https?:\/\//, '')}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default CVHeader;