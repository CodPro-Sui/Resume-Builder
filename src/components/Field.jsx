export default function Field({ label, value, onChange, textarea, placeholder }) {
  return (
    <div className="field">
      {label && <label>{label}</label>}
      {textarea ? (
        <textarea rows={3} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}
