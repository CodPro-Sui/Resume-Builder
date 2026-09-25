export const initialData = {
  photo: null,
  name: "Kaynat",
  headline: "Senior Product Manager",
  email: "ananya.sharma@email.com",
  phone: "+91 98765 43210",
  location: "Bengaluru, India",
  website: "linkedin.com/in/ananyasharma",
  summary:
    "Product leader with 7+ years building 0→1 consumer products used by 40M+ users. Led cross-functional teams across growth, payments and platform at two unicorn startups. Known for translating ambiguous problems into shipped, measurable outcomes.",
  experience: [
    {
      role: "Senior Product Manager",
      org: "Flipkart",
      dates: "2022 — Present",
      desc:
        "Own the checkout & payments experience across 400M+ MAU.\nDrove a 12% lift in conversion via a redesigned one-click checkout.\nLed a team of 4 PMs and partnered with 30+ engineers across 3 squads."
    },
    {
      role: "Product Manager",
      org: "Swiggy",
      dates: "2019 — 2022",
      desc:
        "Launched Swiggy Genie from 0→1, reaching 2M orders/month within a year.\nRan 50+ experiments; built the growth experimentation playbook still used today."
    },
    {
      role: "Associate PM",
      org: "Zomato",
      dates: "2017 — 2019",
      desc: "Owned restaurant onboarding funnel, reducing time-to-live from 9 to 3 days."
    }
  ],
  education: [
    { role: "MBA, Business Administration", org: "IIM Ahmedabad", dates: "2015 — 2017", desc: "" },
    { role: "B.Tech, Computer Science", org: "IIT Delhi", dates: "2011 — 2015", desc: "" }
  ],
  skills: ["Product Strategy", "Roadmapping", "SQL", "A/B Testing", "Figma", "Stakeholder Mgmt", "User Research", "Payments"],
  projects: [
    { role: "Genie — Errand Delivery", org: "Personal case study", dates: "2021", desc: "0→1 launch, featured in Swiggy's annual product showcase." }
  ]
};

export const emptyEntry = () => ({ role: "", org: "", dates: "", desc: "" });

export const ACCENTS = [
  "#2f5d50", "#1d4ed8", "#b7263c", "#7c3aed", "#c2410c",
  "#0f766e", "#111827", "#be185d", "#0369a1", "#166534"
];

export const TEMPLATES = [
  { id: "t1", name: "Modern Sidebar", tag: "Dark rail • photo" },
  { id: "t2", name: "Minimal Clean", tag: "Centered • serif" },
  { id: "t3", name: "Executive Banner", tag: "Bold header" },
  { id: "t4", name: "Creative Edge", tag: "Gradient • sidebar" },
  { id: "t5", name: "Tech Mono", tag: "Developer style" },
  { id: "t6", name: "Elegant Serif", tag: "Editorial" },
  { id: "t7", name: "Corporate Rail", tag: "Classic • ATS" },
  { id: "t8", name: "Compact Grid", tag: "Dense • ATS" },
  { id: "t9", name: "Academic", tag: "Formal • CV" },
  { id: "t10", name: "Bold Block", tag: "Statement header" }
];
