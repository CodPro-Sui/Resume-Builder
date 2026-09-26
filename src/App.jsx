import { useState, useRef, useCallback, useEffect } from "react";
import FormPanel from "./components/FormPanel.jsx";
import ResumeDoc from "./components/ResumeDoc.jsx";
import { useLocalState } from "./hooks/useLocalState.js";
import { initialData, emptyEntry, ACCENTS } from "./data/constants.js";
import { downloadPNG, downloadPDF } from "./utils/download.js";

export default function App() {
  const [data, setData] = useLocalState("rf_data_v1", initialData);
  const [template, setTemplate] = useLocalState("rf_template_v1", "t1");
  const [accent, setAccent] = useLocalState("rf_accent_v1", ACCENTS[0]);
  const [theme, setTheme] = useLocalState("rf_ui_theme_v1", "light");
  const [zoom, setZoom] = useState(0.82);
  const [mobileTab, setMobileTab] = useState("edit");
  const [busy, setBusy] = useState(null);

  // The visible preview (pageRef) sits inside a zoom transform and can be
  // hidden by the mobile Edit/Preview toggle — both of those confuse
  // html2canvas and were causing blank/overlapping exports. So exports never
  // touch that node. Instead we keep a second, always-mounted copy of the
  // resume, rendered at full natural size, parked off-screen (not
  // display:none — it must stay laid out for html2canvas to see it) and
  // capture THAT instead.
  const pageRef = useRef(null);
  const exportRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setField = (key, val) => setData({ ...data, [key]: val });

  const onPhoto = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (f.size > 4 * 1024 * 1024) {
      alert("Please choose an image under 4MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setField("photo", reader.result);
    reader.readAsDataURL(f);
  };

  const resetAll = () => {
    if (confirm("Clear all fields and start a blank resume?")) {
      setData({
        ...initialData,
        name: "", headline: "", email: "", phone: "", location: "", website: "", summary: "", photo: null,
        experience: [emptyEntry()], education: [emptyEntry()], projects: [emptyEntry()], skills: ["", "", ""]
      });
    }
  };
  const loadSample = () => setData(initialData);

  const handlePNG = useCallback(async () => {
    setBusy("png");
    try {
      await downloadPNG(exportRef.current, (data.name || "resume").replace(/\s+/g, "_") + "_" + template);
    } catch (e) {
      console.error(e);
      alert("Could not export image. Please try again.");
    }
    setBusy(null);
  }, [data, template]);

  const handlePDF = useCallback(async () => {
    setBusy("pdf");
    try {
      await downloadPDF(exportRef.current, (data.name || "resume").replace(/\s+/g, "_") + "_" + template);
    } catch (e) {
      console.error(e);
      alert("Could not export PDF. Please try again.");
    }
    setBusy(null);
  }, [data, template]);

  return (
    <div>
      <div className="topbar">
        <div className="brand"><span className="mark">KR</span> KaynatResume</div>
        <div className="mobile-tabs">
          <button className={"tabbtn " + (mobileTab === "edit" ? "active" : "")} onClick={() => setMobileTab("edit")}>Edit</button>
          <button className={"tabbtn " + (mobileTab === "preview" ? "active" : "")} onClick={() => setMobileTab("preview")}>Preview</button>
        </div>
        <div className="top-actions">
          <button className="btn btn-ghost" onClick={() => setTheme(theme === "light" ? "dark" : "light")} title="Toggle app theme">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button className="btn btn-ghost" onClick={loadSample}>Sample data</button>
          <button className="btn" onClick={handlePNG} disabled={busy}>{busy === "png" ? "Exporting…" : "⬇ PNG"}</button>
          <button className="btn btn-accent" style={{ background: accent, borderColor: accent }} onClick={handlePDF} disabled={busy}>
            {busy === "pdf" ? "Exporting…" : "⬇ Download PDF"}
          </button>
        </div>
      </div>

      <div className="layout">
        <FormPanel
          data={data}
          setField={setField}
          template={template}
          setTemplate={setTemplate}
          accent={accent}
          setAccent={setAccent}
          onPhoto={onPhoto}
          onRemovePhoto={() => setField("photo", null)}
          onReset={resetAll}
          mobileHidden={mobileTab === "preview"}
        />

        <div className={"pane-preview " + (mobileTab === "edit" ? "hide-mobile" : "")}>
          <div className="zoom-controls">
            <button onClick={() => setZoom((z) => Math.max(0.4, +(z - 0.1).toFixed(2)))}>−</button>
            {Math.round(zoom * 100)}%
            <button onClick={() => setZoom((z) => Math.min(1.2, +(z + 0.1).toFixed(2)))}>+</button>
          </div>
          <div className="page-wrap" style={{ transform: `scale(${zoom})`, marginBottom: 1123 * zoom - 1123 }}>
            <ResumeDoc data={data} accent={accent} template={template} ref={pageRef} />
          </div>
        </div>
      </div>

      {/* Export-only clone: always mounted, full size, no zoom/transform,
          never display:none. Parked off-screen with a plain left offset so
          html2canvas always sees a fully laid-out, visible-to-the-renderer
          element, regardless of which tab or zoom level the user is on. */}
      <div
        aria-hidden="true"
        className="export-wrap"
        style={{ position: "fixed", top: 0, left: "-9999px", zIndex: -1, pointerEvents: "none" }}
      >
        <ResumeDoc data={data} accent={accent} template={template} ref={exportRef} />
      </div>
    </div>
  );
}
