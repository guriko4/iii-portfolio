import GlassSlider from "../GlassSlider";

const graphicItems = [
  {
    id: 1,
    title: "ROOMSサービスサイト",
    tools: "WordPress（テーマ:SWELL）/ SCSS /JS",
    url: "https://www.rooms-online.jp/",
    comment: "コンテンツ提案からデザイン・コーディングまで担当しました。",
  },
  { id: 2, title: "Graphic", body: "Posters / Editorial / Branding" },
  { id: 3, title: "About", body: "designer & Front-end" },
];

export default function GraphicSlider() {
  return <GlassSlider items={graphicItems} />;
}
