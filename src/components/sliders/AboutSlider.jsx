import GlassSlider from "../GlassSlider";

const aboutItems = [
  {
    id: 1,
    title: "飯貝 典子",
    about_tools: {
      // デザイン = 得意領域/役割として使う
      design:
        "Webデザイン・グラフィックデザイン、各ディレクション（tool:Illustrator・Photoshop・Figma・PremierPro）",
      // フロントエンド = 技術スタック
      frontend:
        "React / JavaScript(ES6+) / SCSS / GSAP /  WordPress / Vite / Git & GitHub / Vercel / VS Code / local",
      seo: "GA4 / Looker Studio / SEO改善 / ページスピード改善 / UTM管理",
    },
    // プレビュー画像（任意）
    preview: {
      pc: "/img/me.webp",
    },
    // キャッチ＋自己紹介（英語の件も反映）
    comment:
      "課題の言語化から実装・分析までを一気通貫で担当。FAQ/デバイスチェックのJS実装、SEO改善（半年でアクセス数2倍）、ページスピード改善など、成果に直結するデザインとフロントエンド実装、GA4/Looker Studioを用いた分析・レポートまで対応可能。",
  },
];

export default function AboutSlider() {
  return <GlassSlider items={aboutItems} variant="about" />;
}
