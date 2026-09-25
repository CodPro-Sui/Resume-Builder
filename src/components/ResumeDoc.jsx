import { forwardRef } from "react";
import { Contact, SkillChips, ExperienceList, SafeText } from "./ResumeParts.jsx";

const ResumeDoc = forwardRef(function ResumeDoc({ data: d, accent, template }, ref) {
  const style = { "--a": accent, "--a-soft": accent + "1a" };
  const photoEl = d.photo ? <img className="photo" src={d.photo} alt="" /> : null;
  const photoSq = d.photo ? <img className="photo-square" src={d.photo} alt="" /> : null;

  const Header = ({ className = "head" }) => (
    <div className={className}>
      <div className="name namefont">{d.name || "Your Name"}</div>
      <div className="headline">{d.headline}</div>
      <Contact d={d} />
    </div>
  );

  let body = null;

  if (template === "t1") {
    body = (
      <div className="grid">
        <div className="side">
          {photoEl}
          <div className="name">{d.name || "Your Name"}</div>
          <div className="headline">{d.headline}</div>
          <h2 className="stitle" style={{ marginTop: 22 }}>Contact</h2>
          <Contact d={d} />
          <h2 className="stitle" style={{ marginTop: 22 }}>Skills</h2>
          <div>{d.skills.filter(Boolean).map((s, i) => <span className="chip" key={i}>{s}</span>)}</div>
          <h2 className="stitle" style={{ marginTop: 22 }}>Education</h2>
          {d.education.map((it, i) => (it.role || it.org) && (
            <div key={i} style={{ marginBottom: 10 }}>
              <div className="role" style={{ color: "#eef1ef" }}>{it.role}</div>
              <div className="org" style={{ color: "#a9c2b8" }}>{it.org}</div>
              <div className="dates" style={{ color: "#7f9a90" }}>{it.dates}</div>
            </div>
          ))}
        </div>
        <div className="main">
          <div className="sec"><h2 className="stitle">Profile</h2><SafeText className="desc" text={d.summary} /></div>
          <ExperienceList items={d.experience} />
          <ExperienceList items={d.projects} heading="Projects" />
        </div>
      </div>
    );
  } else if (template === "t2") {
    body = (
      <div className="main">
        <Header />
        <div className="sec"><h2 className="stitle">Summary</h2><SafeText className="desc" text={d.summary} /></div>
        <ExperienceList items={d.experience} />
        <ExperienceList items={d.education} heading="Education" />
        <SkillChips skills={d.skills} />
        <ExperienceList items={d.projects} heading="Projects" />
      </div>
    );
  } else if (template === "t3") {
    body = (
      <>
        <div className="banner">
          <div>
            <div className="name">{d.name || "Your Name"}</div>
            <div className="headline">{d.headline}</div>
          </div>
          <div className="contactline">{[d.email, d.phone, d.location, d.website].filter(Boolean).map((t, i) => <span key={i}>{t}</span>)}</div>
        </div>
        <div className="grid">
          <div className="main">
            <div className="sec"><h2 className="stitle">Summary</h2><SafeText className="desc" text={d.summary} /></div>
            <ExperienceList items={d.experience} />
            <ExperienceList items={d.projects} heading="Projects" />
          </div>
          <div className="side">
            {photoSq}
            <h2 className="stitle">Skills</h2>
            <div>{d.skills.filter(Boolean).map((s, i) => <span className="chip" key={i}>{s}</span>)}</div>
            <h2 className="stitle" style={{ marginTop: 20 }}>Education</h2>
            {d.education.map((it, i) => (it.role || it.org) && (
              <div key={i} style={{ marginBottom: 10 }}>
                <div className="role">{it.role}</div><div className="org">{it.org}</div><div className="dates">{it.dates}</div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else if (template === "t4") {
    body = (
      <div className="grid">
        <div className="main">
          <div className="name">{d.name || "Your Name"}</div>
          <div className="headline">{d.headline}</div>
          <div className="sec"><h2 className="stitle">About</h2><SafeText className="desc" text={d.summary} /></div>
          <ExperienceList items={d.experience} />
          <ExperienceList items={d.projects} heading="Projects" />
        </div>
        <div className="side">
          {photoEl}
          <h2 className="stitle">Contact</h2>
          <Contact d={d} />
          <h2 className="stitle" style={{ marginTop: 20 }}>Skills</h2>
          <div>{d.skills.filter(Boolean).map((s, i) => <span className="chip" key={i}>{s}</span>)}</div>
          <h2 className="stitle" style={{ marginTop: 20 }}>Education</h2>
          {d.education.map((it, i) => (it.role || it.org) && (
            <div key={i} style={{ marginBottom: 10 }}>
              <div className="role" style={{ color: "#fff" }}>{it.role}</div>
              <div className="org" style={{ color: "#dcece5" }}>{it.org}</div>
              <div className="dates" style={{ color: "#bcd6ca" }}>{it.dates}</div>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (template === "t5") {
    body = (
      <>
        <div className="devbar"><span style={{ background: "#ff5f57" }}></span><span style={{ background: "#febc2e" }}></span><span style={{ background: "#28c840" }}></span></div>
        <div className="head">
          <div className="name">{d.name || "your_name"}</div>
          <div className="headline">{d.headline}</div>
          <div className="contactline">{[d.email, d.phone, d.location, d.website].filter(Boolean).map((t, i) => <span key={i}>{t}</span>)}</div>
        </div>
        <div className="body">
          <div className="sec"><h2 className="stitle">about</h2><SafeText className="desc" text={d.summary} /></div>
          <ExperienceList items={d.experience} heading="experience" />
          <SkillChips skills={d.skills} />
          <ExperienceList items={d.projects} heading="projects" />
          <ExperienceList items={d.education} heading="education" />
        </div>
      </>
    );
  } else if (template === "t6") {
    body = (
      <div className="main">
        <div className="head">
          {photoEl}
          <div className="name serifname">{d.name || "Your Name"}</div>
          <div className="headline">{d.headline}</div>
          <div className="rule"></div>
          <Contact d={d} />
        </div>
        <div className="sec"><SafeText className="desc" style={{ textAlign: "center" }} text={d.summary} /></div>
        <ExperienceList items={d.experience} />
        <ExperienceList items={d.education} heading="Education" />
        <SkillChips skills={d.skills} />
      </div>
    );
  } else if (template === "t7") {
    body = (
      <div className="grid">
        <div className="side">
          {photoSq}
          <h2 className="stitle">Contact</h2>
          <Contact d={d} />
          <h2 className="stitle" style={{ marginTop: 20 }}>Skills</h2>
          <div>{d.skills.filter(Boolean).map((s, i) => <span className="chip" key={i}>{s}</span>)}</div>
          <h2 className="stitle" style={{ marginTop: 20 }}>Education</h2>
          {d.education.map((it, i) => (it.role || it.org) && (
            <div key={i} style={{ marginBottom: 10 }}>
              <div className="role">{it.role}</div><div className="org">{it.org}</div><div className="dates">{it.dates}</div>
            </div>
          ))}
        </div>
        <div className="main">
          <div className="name">{d.name || "Your Name"}</div>
          <div className="headline">{d.headline}</div>
          <div className="sec"><h2 className="stitle">Summary</h2><SafeText className="desc" text={d.summary} /></div>
          <ExperienceList items={d.experience} />
          <ExperienceList items={d.projects} heading="Projects" />
        </div>
      </div>
    );
  } else if (template === "t8") {
    body = (
      <div className="main">
        <div className="head">
          <div>
            <div className="name">{d.name || "Your Name"}</div>
            <div className="headline">{d.headline}</div>
          </div>
          <div className="contactline">{[d.email, d.phone, d.location, d.website].filter(Boolean).map((t, i) => <span key={i}>{t}</span>)}</div>
        </div>
        <div className="sec fullwidth"><h2 className="stitle">Summary</h2><SafeText className="desc" text={d.summary} /></div>
        <div className="twocol">
          <div>
            <ExperienceList items={d.experience} />
          </div>
          <div>
            <ExperienceList items={d.education} heading="Education" />
            <SkillChips skills={d.skills} />
            <ExperienceList items={d.projects} heading="Projects" />
          </div>
        </div>
      </div>
    );
  } else if (template === "t9") {
    body = (
      <div className="main">
        <div className="head">
          <div className="name">{d.name || "Your Name"}</div>
          <div className="headline">{d.headline}</div>
          <Contact d={d} />
        </div>
        <div className="sec"><h2 className="stitle">Summary</h2><SafeText className="desc" text={d.summary} /></div>
        <ExperienceList items={d.education} heading="Education" />
        <ExperienceList items={d.experience} heading="Experience" />
        <ExperienceList items={d.projects} heading="Publications / Projects" />
        <div className="sec"><h2 className="stitle">Skills</h2><div style={{ textAlign: "center" }}>{d.skills.filter(Boolean).map((s, i) => <span className="chip" key={i}>{s}</span>)}</div></div>
      </div>
    );
  } else if (template === "t10") {
    body = (
      <>
        <div className="banner">
          {photoEl}
          <div className="name">{d.name || "Your Name"}</div>
          <div className="headline">{d.headline}</div>
          <div className="contactline">{[d.email, d.phone, d.location, d.website].filter(Boolean).map((t, i) => <span key={i}>{t}</span>)}</div>
        </div>
        <div className="main">
          <div className="sec"><h2 className="stitle">Summary</h2><SafeText className="desc" text={d.summary} /></div>
          <ExperienceList items={d.experience} />
          <ExperienceList items={d.education} heading="Education" />
          <SkillChips skills={d.skills} />
          <ExperienceList items={d.projects} heading="Projects" />
        </div>
      </>
    );
  }

  return (
    <div className={"resume-page tpl-" + template} style={style} ref={ref}>
      {body}
    </div>
  );
});

export default ResumeDoc;
