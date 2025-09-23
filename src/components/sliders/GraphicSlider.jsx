import GlassSlider from "../GlassSlider";

//表紙＋見開きセット「cover」「spread」
//両面チラシ「front」「back」
//片面チラシ「single」

const graphicItems = [
  {
    id: 1,
    title: "「こがも」表紙・巻頭記事",
    preview: {
      cover: "/img/graphic1−1.webp",
      spread: "/img/graphic1−2.webp",
    },
    graphic_tools: {
      software: "Illustrator / Photoshop",
      role: "企画・取材・誌面デザイン",
    },
    comment:
      "地域情報誌の巻頭特集を企画から担当（発行部数52,000部）。取材先の選定やライター・カメラマンとのスケジュール調整、現地での撮影演出までをディレクション。そのうえで誌面構成を設計し、最終的なデザインまで一貫して制作しました。宣伝色を抑えつつ夕暮れの照明を活かして温かみを演出し、読者から好評を得ています。",
  },
  {
    id: 2,
    title: "「おりっぷ」表紙・巻頭記事",
    preview: {
      cover: "/img/graphic2−1.webp",
      spread: "/img/graphic2−2.webp",
    },
    graphic_tools: {
      software: "Illustrator / Photoshop",
      role: "企画・取材・誌面デザイン",
    },
    comment:
      "地域情報誌の表紙特集を担当（発行部数52,000部）。子どもの日特集として「キッズランドおやま」を取材・誌面化。取材先の調整や現地での撮影立ち会いを行い、子どもの笑顔を引き出す構図を工夫しました。誌面全体はPOPで親しみやすいデザインとし、読者アンケートでも「参考になった」と好評を得ました。",
  },
  {
    id: 3,
    title: "「Couta」表紙",
    preview: {
      single: "/img/graphic3.webp",
    },
    graphic_tools: {
      software: "Illustrator / Photoshop",
      role: "企画・取材・誌面デザイン",
    },
    comment:
      "地域情報誌の表紙デザインを担当（発行部数130,000部）。つくば市で行われる「まつりつくば」特集号として、祭りの熱気と迫力を誌面で伝えることを重視。読者の目を引くビジュアル構成を心がけ、表紙だけでイベントの魅力が伝わるよう工夫しました。",
  },
  {
    id: 4,
    title: "「Couta」表紙",
    preview: {
      single: "/img/graphic4.webp",
    },
    graphic_tools: {
      software: "Illustrator / Photoshop",
      role: "誌面デザイン",
    },
    comment:
      "地域情報誌の表紙デザインを担当（発行部数130,000部）。コロナ禍で取材ができず、提供写真のみで誌面を構成。写真の配置だけでは単調になるため、観光客や梅の花を効果的にレイアウトし、題字は古風な雰囲気と梅をあしらったタイポグラフィで祭りらしさを演出しました。限られた素材を活かして誌面を成立させた事例です。",
  },
  {
    id: 5,
    title: "新聞掲載デザイン",
    preview: {
      single: "/img/graphic5.webp",
    },
    graphic_tools: {
      software: "Illustrator / Photoshop",
      role: "誌面デザイン",
    },
    comment:
      "高級時計ブランドの新聞一面広告をデザイン担当。都内宝飾店のプロモーションとして、高級感と信頼性を訴求するレイアウトを意識しました。写真の質感を際立たせる黒基調のデザインを採用し、ブランドの世界観を表現。大規模媒体での広告掲載により、多くの潜在顧客への認知拡大に貢献しました。",
  },
  {
    id: 6,
    title: "チラシデザイン",
    preview: {
      single: "/img/graphic6.webp",
    },
    graphic_tools: {
      software: "Illustrator / Photoshop",
      role: "誌面デザイン",
    },
    comment:
      "ジュエリーイベントの告知チラシをデザイン担当。希少性を強調するため、重厚な建築写真を背景に採用し、中央にダイヤを大きく配置。高級感と非日常感を両立させ、キャッチコピーと日付を視認性高くデザインしました。短期間での集客告知を目的とした販促ツールとして活用されました。",
  },
];

export default function GraphicSlider() {
  return <GlassSlider items={graphicItems} variant="graphic" />;
}
