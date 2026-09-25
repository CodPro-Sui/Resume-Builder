import Field from "./Field.jsx";
import { emptyEntry } from "../data/constants.js";

export default function EntryEditor({ title, items, setItems, withDesc = true }) {
  const update = (i, key, val) => {
    const next = items.slice();
    next[i] = { ...next[i], [key]: val };
    setItems(next);
  };
  const remove = (i) => {
    const next = items.slice();
    next.splice(i, 1);
    setItems(next);
  };
  const add = () => setItems([...items, emptyEntry()]);

  return (
    <div>
      {items.map((it, i) => (
        <div className="entry-card" key={i}>
          <div className="entry-top">
            <span>{title} {i + 1}</span>
            <button className="iconbtn" onClick={() => remove(i)} title="Remove" aria-label="Remove">✕</button>
          </div>
          <div className="row2">
            <Field label="Title / Role" value={it.role} onChange={(v) => update(i, "role", v)} placeholder="Product Manager" />
            <Field label="Organization" value={it.org} onChange={(v) => update(i, "org", v)} placeholder="Company" />
          </div>
          <Field label="Dates" value={it.dates} onChange={(v) => update(i, "dates", v)} placeholder="2022 — Present" />
          {withDesc && (
            <Field label="Description" textarea value={it.desc} onChange={(v) => update(i, "desc", v)} placeholder="One line per bullet" />
          )}
        </div>
      ))}
      <button className="add-btn" onClick={add}>+ Add {title.toLowerCase()}</button>
    </div>
  );
}
