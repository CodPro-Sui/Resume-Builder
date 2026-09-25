import Field from "./Field.jsx";
import EntryEditor from "./EntryEditor.jsx";
import { ACCENTS, TEMPLATES } from "../data/constants.js";

export default function FormPanel({
  data, setField, template, setTemplate, accent, setAccent, onPhoto, onRemovePhoto, onReset, mobileHidden
}) {
  return (
    <div className={"pane-form " + (mobileHidden ? "hide-mobile" : "")}>
      <div className="section-title">Template</div>
      <div className="tpl-grid">
        {TEMPLATES.map((t) => (
          <div key={t.id} className={"tpl-card " + (template === t.id ? "active" : "")} onClick={() => setTemplate(t.id)}>
            <div className="tpl-swatch" style={{ background: t.id === "t5" ? "#12151a" : t.id === "t6" ? "#fbf8f2" : "#f1efe9" }}>
              <div style={{ width: "32%", background: t.id === "t1" || t.id === "t7" ? "#1b2320" : "transparent" }}></div>
            </div>
            <div className="tpl-name">{t.name}</div>
            <div className="tpl-tag">{t.tag}</div>
          </div>
        ))}
      </div>

      <div className="section-title">Accent color</div>
      <div className="swatch-list">
        {ACCENTS.map((c) => (
          <div key={c} className={"color-dot " + (accent === c ? "active" : "")} style={{ background: c }} onClick={() => setAccent(c)} />
        ))}
      </div>

      <div className="section-title">Photo</div>
      <div className="photo-row">
        {data.photo ? <img className="photo-thumb" src={data.photo} alt="" /> : <div className="photo-thumb-empty">No photo</div>}
        <label className="file-label">Upload<input type="file" accept="image/*" onChange={onPhoto} /></label>
        {data.photo && <button className="iconbtn" onClick={onRemovePhoto} title="Remove photo">✕</button>}
      </div>

      <div className="section-title">Basics</div>
      <Field label="Full name" value={data.name} onChange={(v) => setField("name", v)} />
      <Field label="Headline / target role" value={data.headline} onChange={(v) => setField("headline", v)} />
      <div className="row2">
        <Field label="Email" value={data.email} onChange={(v) => setField("email", v)} />
        <Field label="Phone" value={data.phone} onChange={(v) => setField("phone", v)} />
      </div>
      <div className="row2">
        <Field label="Location" value={data.location} onChange={(v) => setField("location", v)} />
        <Field label="Website / LinkedIn" value={data.website} onChange={(v) => setField("website", v)} />
      </div>
      <Field label="Summary" textarea value={data.summary} onChange={(v) => setField("summary", v)} />

      <div className="section-title">Experience</div>
      <EntryEditor title="Role" items={data.experience} setItems={(v) => setField("experience", v)} />

      <div className="section-title">Education</div>
      <EntryEditor title="Education" items={data.education} setItems={(v) => setField("education", v)} withDesc={false} />

      <div className="section-title">Projects</div>
      <EntryEditor title="Project" items={data.projects} setItems={(v) => setField("projects", v)} />

      <div className="section-title">Skills <span style={{ fontWeight: 400 }}>(comma separated)</span></div>
      <Field
        value={data.skills.join(", ")}
        onChange={(v) => setField("skills", v.split(",").map((s) => s.trim()))}
        placeholder="Product Strategy, SQL, Figma…"
      />

      <button className="add-btn" style={{ marginTop: 18, borderColor: "#c94b4b", color: "#c94b4b" }} onClick={onReset}>
        Clear everything & start blank
      </button>
    </div>
  );
}
