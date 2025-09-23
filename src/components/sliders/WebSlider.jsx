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
    comment:
      "企画提案からデザイン・フロント実装まで一貫して担当。BtoB向けに品を重視したデザインを心がけつつ、SEOを意識したコンテンツ設計やUI改善を行いました。結果、半年でアクセス数を2倍に伸ばし、営業活動の成果にも貢献しました。試行錯誤を重ね改善し、デザインから実装まで幅広く対応できるようになりました。",
  },
  {
    id: 2,
    title: "SPOKES（LP）",
    url: "https://www.spokes-online.jp/sales-partner/",
    tools: {
      design: "Illustrator / Photoshop /  PremierPro",
      frontend: "HTML / SCSS / JavaScript",
      environment: "WordPress / Node.js / Git / Vite / VScode / Local",
    },
    preview: {
      pc: "/img/id2_pc.webp",
      sp: "/img/id2_sp.webp",
    },
    comment:
      "営業パートナー募集を目的としたランディングページを、企画段階からデザイン・フロント実装まで担当。信頼感を重視した配色とシンプルで分かりやすい情報設計により、ユーザーが迷わずCTAへ到達できる導線を意識しました。SEO対策も行い、問い合わせ数の向上に貢献。短納期ながら成果を出せる制作フローを経験しました。",
  },
  { id: 3, title: "About", body: "designer & Front-end" },
];

export default function WebSlider() {
  return <GlassSlider items={webItems} />;
}
