import GlassSlider from "../GlassSlider";

const webItems = [
  {
    id: 1,
    title: "ROOMSサービスサイト",
    tools: {
      design: "Illustrator / Photoshop",
      frontend: "HTML / SCSS / JavaScript / GSAP",
      environment: "WordPress / Node.js / Git / Vite / VScode / Local",
    },
    url: "https://www.rooms-online.jp/",
    comment: "コンテンツ提案からデザイン・コーディングまで担当しました。",
  },
  { id: 2, title: "Graphic", body: "Posters / Editorial / Branding" },
  { id: 3, title: "About", body: "designer & Front-end" },
];

export default function WebSlider() {
  return <GlassSlider items={webItems} />;
}
