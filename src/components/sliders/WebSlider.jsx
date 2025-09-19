import GlassSlider from "../GlassSlider";

const webItems = [
  {
    id: 1,
    title: "ROOMSサービスサイト",
    url: "https://www.rooms-online.jp/",
    tools: {
      design: "Illustrator / Photoshop",
      frontend: "HTML / SCSS / JavaScript / GSAP",
      environment: "WordPress / Node.js / Git / Vite / VScode / Local",
    },
    preview: {
      pc: "/img/id1_pc.webp",
      sp: "/img/id1_sp.webp",
    },
    comment: "コンテンツ提案からデザイン・コーディングまで担当しました。",
  },
  {
    id: 2,
    title: "SPOKES（LP）",
    body: "Posters / Editorial / Branding",
  },
  { id: 3, title: "About", body: "designer & Front-end" },
];

export default function WebSlider() {
  return <GlassSlider items={webItems} />;
}
