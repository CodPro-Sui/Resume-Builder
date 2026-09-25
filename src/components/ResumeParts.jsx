// Renders text as separate <div> lines instead of relying on CSS
// white-space:pre-line, which html2canvas frequently mis-renders (lines
// stack on top of each other instead of flowing downward).
export function SafeText({ text, className, style }) {
  if (!text) return null;
  const lines = String(text).split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length <= 1) return <div className={className} style={style}>{lines[0] || ""}</div>;
  return (
    <div className={className} style={style}>
      {lines.map((line, i) => (
        <div className="desc-line" key={i}>{line}</div>
      ))}
    </div>
  );
}

export function Contact({ d }) {
  const items = [d.email, d.phone, d.location, d.website].filter(Boolean);
  return (
    <div className="contactline">
      {items.map((t, i) => (
        <span key={i}>{t}</span>
      ))}
    </div>
  );
}

export function SkillChips({ skills }) {
  return (
    <div className="sec">
      <h2 className="stitle">Skills</h2>
      <div>
        {skills.filter(Boolean).map((s, i) => (
          <span className="chip" key={i}>{s}</span>
        ))}
      </div>
    </div>
  );
}

export function ExperienceList({ items, heading = "Experience" }) {
  if (!items.some((it) => it.role || it.org)) return null;
  return (
    <div className="sec">
      <h2 className="stitle">{heading}</h2>
      {items.map(
        (it, i) =>
          (it.role || it.org) && (
            <div key={i} style={{ marginBottom: 12 }}>
              <div className="item-head">
                <div>
                  <span className="role">{it.role}</span>
                  {it.org && <span className="org"> · {it.org}</span>}
                </div>
                <span className="dates">{it.dates}</span>
              </div>
              {it.desc && (
                <div className="desc">
                  {it.desc
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean)
                    .map((line, li) => (
                      <div className="desc-line" key={li}>{line}</div>
                    ))}
                </div>
              )}
            </div>
          )
      )}
    </div>
  );
}
