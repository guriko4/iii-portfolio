import GlassSlider from "../GlassSlider";

const aboutItems = [
  {
    title: "ROOMSサービスサイト",
    tools: "WordPress（テーマ:SWELL）/ SCSS /JS",
    url: "https://www.rooms-online.jp/",
    comment: "コンテンツ提案からデザイン・コーディングまで担当しました。",
  },
];

export default function AboutSlider() {
  return <GlassSlider items={aboutItems} />;
}
