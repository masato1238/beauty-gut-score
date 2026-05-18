"use client";
import { useState } from "react";

const PMAS_URL = "https://example.com/pmas";

// ── 質問データ（各問に専用の選択肢 + スコア） ──────────────────────────────
// score: 良い状態ほど高い（0〜5点）
const QUESTIONS = [
  {
    id: 1, text: "朝起きた時、体の感じはどうですか？",
    options: [
      { label: "スッキリ！体が軽い 🌅",         score: 5 },
      { label: "まあまあ普通かな",               score: 3 },
      { label: "少し重だるい",                   score: 2 },
      { label: "毎朝しんどい…",                  score: 0 },
    ],
  },
  {
    id: 2, text: "日中（午後など）に眠気はきますか？",
    options: [
      { label: "ほとんどない、元気です ✨",       score: 5 },
      { label: "少し眠くなることがある",          score: 3 },
      { label: "よく眠くなる",                   score: 2 },
      { label: "毎日かなり眠い…",               score: 0 },
    ],
  },
  {
    id: 3, text: "甘いものや炭水化物を食べたい衝動はありますか？",
    options: [
      { label: "あまり気にならない 💪",           score: 5 },
      { label: "たまにある",                     score: 3 },
      { label: "けっこう欲しくなる",             score: 2 },
      { label: "毎日ものすごく欲しい！",          score: 0 },
    ],
  },
  {
    id: 4, text: "食後はどんな感じですか？",
    options: [
      { label: "スッキリして元気 😊",            score: 5 },
      { label: "少しだるくなることがある",        score: 3 },
      { label: "よく眠くなる・だるくなる",       score: 2 },
      { label: "毎回かなり眠い・しんどい",        score: 0 },
    ],
  },
  {
    id: 5, text: "お通じのリズムはどうですか？",
    options: [
      { label: "毎日スムーズ ✅",                score: 5 },
      { label: "だいたい規則正しい",             score: 3 },
      { label: "3〜4日に1回ほど",               score: 2 },
      { label: "週1回以下か、ほぼ毎日下痢気味",  score: 0 },
    ],
  },
  {
    id: 6, text: "お腹の張りやガスが気になることはありますか？",
    options: [
      { label: "ほとんどない 😌",               score: 5 },
      { label: "たまに気になる",                 score: 3 },
      { label: "よく気になる",                   score: 2 },
      { label: "毎日すごく気になる",             score: 0 },
    ],
  },
  {
    id: 7, text: "肌荒れやニキビはどうですか？",
    options: [
      { label: "ほとんどない 🌸",               score: 5 },
      { label: "たまに出る",                     score: 3 },
      { label: "よく出る",                       score: 2 },
      { label: "ずっと気になっている",            score: 0 },
    ],
  },
  {
    id: 8, text: "肌の乾燥やくすみは気になりますか？",
    options: [
      { label: "うるツヤで満足 💆",              score: 5 },
      { label: "少し気になる程度",               score: 3 },
      { label: "けっこう気になる",               score: 2 },
      { label: "かなり悩んでいる",               score: 0 },
    ],
  },
  {
    id: 9, text: "むくみやすさはどうですか？",
    options: [
      { label: "ほとんどむくまない 👍",          score: 5 },
      { label: "たまにむくむ",                   score: 3 },
      { label: "よくむくむ",                     score: 2 },
      { label: "毎日むくんでいる",               score: 0 },
    ],
  },
  {
    id: 10, text: "手足の冷えはどうですか？",
    options: [
      { label: "冷えをあまり感じない 🔥",        score: 5 },
      { label: "少し冷えることがある",           score: 3 },
      { label: "よく冷える",                     score: 2 },
      { label: "1年中かなり冷えている",          score: 0 },
    ],
  },
  {
    id: 11, text: "睡眠の質はどうですか？",
    options: [
      { label: "よく眠れて目覚めもいい 😴✨",    score: 5 },
      { label: "まあまあ眠れている",             score: 3 },
      { label: "途中で起きたり寝つきが悪い",     score: 2 },
      { label: "毎晩なかなか眠れない",           score: 0 },
    ],
  },
  {
    id: 12, text: "ストレスがあると食欲はどう変わりますか？",
    options: [
      { label: "あまり変わらない 😊",            score: 5 },
      { label: "少し乱れることがある",           score: 3 },
      { label: "食べすぎ or 食欲がなくなりやすい", score: 2 },
      { label: "かなり乱れる",                   score: 0 },
    ],
  },
  {
    id: 13, text: "生理前のコンディションはどうですか？",
    options: [
      { label: "あまり変化を感じない 💪",        score: 5 },
      { label: "少し不調を感じる",               score: 3 },
      { label: "むくみ・肌荒れ・イライラがある", score: 2 },
      { label: "毎月かなりつらい",               score: 0 },
    ],
  },
  {
    id: 14, text: "集中力はどうですか？",
    options: [
      { label: "長時間集中できる 🧠",            score: 5 },
      { label: "まあまあ続く",                   score: 3 },
      { label: "すぐ散漫になる",                 score: 2 },
      { label: "ほぼ集中できない",               score: 0 },
    ],
  },
  {
    id: 15, text: "運動した時、体の変化（汗・疲労感など）を感じますか？",
    options: [
      { label: "すぐ体が反応する感じがする ✨",   score: 5 },
      { label: "まあまあ感じる",                 score: 3 },
      { label: "あまり感じない",                 score: 2 },
      { label: "ほとんど変化がわからない",        score: 0 },
    ],
  },
  {
    id: 16, text: "食べすぎた翌日はどうですか？",
    options: [
      { label: "すぐ戻る感じがする 💨",          score: 5 },
      { label: "1〜2日で戻る",                  score: 3 },
      { label: "なかなか戻らない",               score: 2 },
      { label: "ずっと引きずる",                 score: 0 },
    ],
  },
  {
    id: 17, text: "お腹まわりの重さや張りはありますか？",
    options: [
      { label: "気にならない 😌",               score: 5 },
      { label: "たまに気になる",                 score: 3 },
      { label: "よく気になる",                   score: 2 },
      { label: "毎日ずっと気になる",             score: 0 },
    ],
  },
  {
    id: 18, text: "気分が落ちることはありますか？",
    options: [
      { label: "ほとんどない、安定している 🌈",  score: 5 },
      { label: "たまにある",                     score: 3 },
      { label: "よくある",                       score: 2 },
      { label: "ほぼ毎日落ちている",             score: 0 },
    ],
  },
  {
    id: 19, text: "外食や間食が続いた時、コンディションはどうなりますか？",
    options: [
      { label: "あまり崩れない 💪",             score: 5 },
      { label: "少し崩れる",                    score: 3 },
      { label: "けっこう崩れる",                score: 2 },
      { label: "すぐガタガタになる",             score: 0 },
    ],
  },
  {
    id: 20, text: "今の自分の体、どう感じていますか？",
    options: [
      { label: "満足！いい感じ 🌟",             score: 5 },
      { label: "まあまあかな",                   score: 3 },
      { label: "あまり満足できていない",         score: 2 },
      { label: "全然納得できていない…",          score: 0 },
    ],
  },
];

// ── カテゴリ定義 ──────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "sugar", name: "糖質・食欲バランス", emoji: "🍬",
    questionIds: [3, 4, 12, 16],
    lowMessage: "甘いもの欲や食後の眠気、食欲の乱れが出やすい傾向があります。ダイエットで一番つまずきやすいのは、意思の弱さではなく、食欲が乱れやすい内側の状態かもしれません。",
    whyImportant: "食欲の調節には腸内環境が深く関わっている可能性があります。",
    stumble: "カロリーを意識しても食欲に引っ張られやすく、継続が難しくなりがちです。",
    tips: "食事の間隔を一定に保つ・食物繊維を先に食べる・食後すぐに歩くなどが参考になるかもしれません。",
  },
  {
    id: "rhythm", name: "腸内リズム", emoji: "🌀",
    questionIds: [5, 6, 17],
    lowMessage: "便通やお腹の張りが気になりやすい傾向があります。腸内リズムが乱れると、体の軽さや肌のコンディションにも影響を感じやすくなる可能性があります。",
    whyImportant: "腸のリズムは体全体のコンディションに関わる可能性があります。",
    stumble: "むくみや重さを感じやすく、体重の数字に一喜一憂しやすくなるかもしれません。",
    tips: "起床後に水を飲む・発酵食品を取り入れる・腸を動かす軽い運動が参考になるかもしれません。",
  },
  {
    id: "beauty", name: "美容コンディション", emoji: "✨",
    questionIds: [7, 8, 13],
    lowMessage: "肌荒れ、乾燥、くすみ、生理前の不調など、美容面にゆらぎが出やすい傾向があります。外側のケアだけでなく、内側の状態を見ることも大切かもしれません。",
    whyImportant: "肌のコンディションは内側の状態を映している可能性があります。",
    stumble: "スキンケアを頑張っても、内側が整っていないと変化を感じにくい場合があります。",
    tips: "水分補給・腸活・十分な睡眠が美容コンディションに関わるかもしれません。",
  },
  {
    id: "circulation", name: "巡り・むくみ", emoji: "💧",
    questionIds: [1, 9, 10, 15],
    lowMessage: "朝の体の重さ、むくみ、冷えが出やすい傾向があります。体重は変わっていなくても、巡りの悪さで見た目の重さを感じることがあるかもしれません。",
    whyImportant: "巡りは代謝や老廃物の排出にも関わっている可能性があります。",
    stumble: "体が冷えやすいと基礎代謝に影響する場合があり、運動しても変化を感じにくいことがあります。",
    tips: "温かい飲み物・ストレッチ・入浴などが参考になるかもしれません。",
  },
  {
    id: "sleep", name: "睡眠・ストレス", emoji: "🌙",
    questionIds: [2, 11, 12, 18],
    lowMessage: "睡眠の質やストレスが、食欲・集中力・体の重さに影響している可能性があります。頑張る量を増やす前に、回復できる体かを見直すことが大切かもしれません。",
    whyImportant: "睡眠不足はホルモンバランスや食欲に関わる可能性があります。",
    stumble: "疲れているほど糖質を欲しやすくなる傾向があり、ダイエットが続かない原因になりやすいです。",
    tips: "就寝前のスクリーン時間を減らす・深呼吸・ぬるめのお風呂が参考になるかもしれません。",
  },
  {
    id: "metabolism", name: "代謝・体感変化", emoji: "🔥",
    questionIds: [14, 15, 16, 19, 20],
    lowMessage: "運動や食事管理をしても変化を感じにくい傾向があります。努力の方向性が合っているか、自分の内側の状態を確認することがヒントになるかもしれません。",
    whyImportant: "代謝の土台が整っていると、努力が結果につながりやすい可能性があります。",
    stumble: "頑張っているのに結果が出ないと感じると、モチベーションが続きにくくなります。",
    tips: "タンパク質を意識する・筋肉量を保つ食事・無理な制限より食材の質が参考になるかもしれません。",
  },
];

const SCORE_TYPES = [
  {
    min: 80, max: 100, charState: "kirara",
    title: "キラキラ内側美人タイプ",
    description: "内側のコンディションはかなり良い傾向です。痩せやすさや美容コンディションを支える土台が整っている可能性があります。ただし、感覚だけでは腸内環境の詳細まではわかりません。PMASで確認することで、今の良い状態をさらに理解するきっかけになります。",
  },
  {
    min: 60, max: 79, charState: "yuragi",
    title: "あと一歩で整うゆらぎタイプ",
    description: "大きく崩れてはいないものの、睡眠・食欲・むくみ・肌などにゆらぎが出やすい傾向があります。少し整えるだけで、ダイエットや美容の体感が変わる可能性があります。PMASで内側を確認することで、自分に合った整え方を考えるヒントになります。",
  },
  {
    min: 40, max: 59, charState: "otsukare",
    title: "がんばってるのに結果が出にくいタイプ",
    description: "食事や運動を頑張っていても、内側のコンディションが整っていないことで結果を感じにくい可能性があります。むくみ、食欲の乱れ、睡眠、腸内バランスなどを見直す余地があります。感覚だけで頑張り続けるより、PMASで自分の内側を確認することが近道になるかもしれません。",
  },
  {
    min: 0, max: 39, charState: "guttari",
    title: "内側から見直したいお疲れタイプ",
    description: "体の重さ、食欲の乱れ、睡眠、肌、むくみなど複数の項目に不調のサインが出ている可能性があります。今の状態で無理な食事制限や運動を続けるより、まず自分の内側を知ることが大切かもしれません。PMASで腸内環境やマイクロバイオームを確認することで、今まで見えなかったヒントに気づける可能性があります。",
  },
];

// ── スコア計算 ────────────────────────────────────────────────────────────────
function calcTotalScore(answers) {
  // 各問の最大スコアは5点、20問で100点満点
  return answers.reduce((sum, s) => sum + (s ?? 0), 0);
}

function calcCategoryScores(answers) {
  return CATEGORIES.map((cat) => {
    const scores = cat.questionIds.map((qid) => answers[qid - 1] ?? 0);
    const max = cat.questionIds.length * 5;
    const raw = scores.reduce((a, b) => a + b, 0);
    return { ...cat, score: Math.round((raw / max) * 100) };
  });
}

function getLowestCategory(catScores) {
  return catScores.reduce((min, c) => (c.score < min.score ? c : min), catScores[0]);
}

function getScoreType(total) {
  return SCORE_TYPES.find((t) => total >= t.min && total <= t.max) ?? SCORE_TYPES[3];
}

// ── ちょーちゃん SVG ──────────────────────────────────────────────────────────
function ChoChan({ state }) {
  const cfg = {
    kirara:  { body: "#FFB7D5", face: "#FF8EB5", eye: "#FF5C98", cheek: "#FFD6E8", sparkles: true,  tilt: 0,   eyes: "happy",  mouth: "big-smile" },
    yuragi:  { body: "#C9B8F0", face: "#B09EE8", eye: "#8A74D6", cheek: "#DDD4F8", sparkles: false, tilt: -5,  eyes: "sleepy", mouth: "small-smile" },
    otsukare:{ body: "#F0C4A8", face: "#E8A882", eye: "#C47A52", cheek: "#F5D8C4", sparkles: false, tilt: -10, eyes: "sad",    mouth: "frown" },
    guttari: { body: "#B8D4C0", face: "#94BEA0", eye: "#6A9E78", cheek: "#CBE8D4", sparkles: false, tilt: -20, eyes: "dizzy",  mouth: "wavy" },
  }[state] ?? { body:"#FFB7D5", face:"#FF8EB5", eye:"#FF5C98", cheek:"#FFD6E8", sparkles:true, tilt:0, eyes:"happy", mouth:"big-smile" };

  return (
    <svg viewBox="0 0 200 220" width="150" height="165" style={{ filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.10))" }}>
      <ellipse cx="100" cy="204" rx="65" ry="11" fill={cfg.body} opacity="0.3" />
      {cfg.sparkles && <>
        <text x="24" y="58" fontSize="16" textAnchor="middle">⭐</text>
        <text x="176" y="52" fontSize="14" textAnchor="middle">✨</text>
        <text x="158" y="108" fontSize="12" textAnchor="middle">💫</text>
        <text x="40" y="112" fontSize="12" textAnchor="middle">✨</text>
      </>}
      <g transform={`rotate(${cfg.tilt}, 100, 110)`}>
        <ellipse cx="100" cy="148" rx="56" ry="50" fill={cfg.body} />
        <ellipse cx="46" cy="138" rx="15" ry="9" fill={cfg.body} transform="rotate(-30,46,138)" />
        <ellipse cx="154" cy="138" rx="15" ry="9" fill={cfg.body} transform="rotate(30,154,138)" />
        <ellipse cx="78" cy="190" rx="13" ry="9" fill={cfg.body} transform="rotate(-10,78,190)" />
        <ellipse cx="122" cy="190" rx="13" ry="9" fill={cfg.body} transform="rotate(10,122,190)" />
        <circle cx="100" cy="105" r="46" fill={cfg.face} />
        <ellipse cx="74" cy="115" rx="11" ry="7" fill={cfg.cheek} opacity="0.7" />
        <ellipse cx="126" cy="115" rx="11" ry="7" fill={cfg.cheek} opacity="0.7" />
        {cfg.eyes === "happy" && <>
          <path d="M82 100 Q86 93 90 100" stroke={cfg.eye} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M110 100 Q114 93 118 100" stroke={cfg.eye} strokeWidth="3" fill="none" strokeLinecap="round" />
        </>}
        {cfg.eyes === "sleepy" && <>
          <ellipse cx="86" cy="100" rx="7" ry="5" fill={cfg.eye} />
          <ellipse cx="114" cy="100" rx="7" ry="5" fill={cfg.eye} />
          <line x1="79" y1="98" x2="93" y2="98" stroke={cfg.face} strokeWidth="3" />
          <line x1="107" y1="98" x2="121" y2="98" stroke={cfg.face} strokeWidth="3" />
        </>}
        {cfg.eyes === "sad" && <>
          <ellipse cx="86" cy="102" rx="6" ry="7" fill={cfg.eye} />
          <ellipse cx="114" cy="102" rx="6" ry="7" fill={cfg.eye} />
          <path d="M82 96 Q86 92 90 96" stroke={cfg.face} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M110 96 Q114 92 118 96" stroke={cfg.face} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <ellipse cx="82" cy="112" rx="3" ry="4" fill="#74C0FC" opacity="0.7" />
        </>}
        {cfg.eyes === "dizzy" && <>
          <text x="80" y="107" fontSize="16" textAnchor="middle" fill={cfg.eye}>×</text>
          <text x="120" y="107" fontSize="16" textAnchor="middle" fill={cfg.eye}>×</text>
        </>}
        {cfg.mouth === "big-smile"   && <path d="M82 118 Q100 132 118 118" stroke={cfg.eye} strokeWidth="3" fill="none" strokeLinecap="round" />}
        {cfg.mouth === "small-smile" && <path d="M88 118 Q100 125 112 118" stroke={cfg.eye} strokeWidth="2.5" fill="none" strokeLinecap="round" />}
        {cfg.mouth === "frown"       && <path d="M85 122 Q100 115 115 122" stroke={cfg.eye} strokeWidth="2.5" fill="none" strokeLinecap="round" />}
        {cfg.mouth === "wavy"        && <path d="M82 120 Q88 115 95 120 Q102 126 109 120 Q116 115 122 120" stroke={cfg.eye} strokeWidth="2.5" fill="none" strokeLinecap="round" />}
        <ellipse cx="118" cy="88" rx="7" ry="5" fill="white" opacity="0.35" transform="rotate(-30,118,88)" />
      </g>
    </svg>
  );
}

// ── 汎用パーツ ────────────────────────────────────────────────────────────────
function Disclaimer() {
  return (
    <p style={{ fontSize: 11, color: "#A08090", textAlign: "center", lineHeight: 1.65, marginTop: 28, padding: "0 8px" }}>
      このセルフチェックは医療行為・医学的診断ではありません。<br />
      結果は生活習慣や体感をもとにした参考情報です。
    </p>
  );
}

function GaugeBar({ score, color }) {
  return (
    <div style={{ background: "#F5E6EE", borderRadius: 99, height: 10, overflow: "hidden", flex: 1 }}>
      <div style={{ width: `${score}%`, height: "100%", borderRadius: 99, background: color, transition: "width 1s cubic-bezier(.34,1.2,.64,1)" }} />
    </div>
  );
}

function PmasReportCard() {
  const items = [
    { label: "腸内バランス",      color: "#FF6B9D", val: 72 },
    { label: "美容コンディション", color: "#C084FC", val: 65 },
    { label: "食欲バランス",      color: "#FF9F43", val: 58 },
    { label: "巡り・むくみ",      color: "#74C0FC", val: 80 },
    { label: "睡眠ストレス",      color: "#34D399", val: 70 },
    { label: "代謝サポート",      color: "#FFD166", val: 62 },
  ];
  return (
    <div style={{ background: "white", borderRadius: 20, padding: "18px 20px", border: "2px dashed #FFCCE0", margin: "16px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 20 }}>📋</span>
        <span style={{ fontSize: 13, fontWeight: 800, color: "#2D2235" }}>PMASレポートイメージ</span>
        <span style={{ fontSize: 10, background: "#FFF0F6", color: "#FF6B9D", borderRadius: 99, padding: "2px 8px", fontWeight: 700, marginLeft: "auto" }}>サンプル</span>
      </div>
      {items.map((item) => (
        <div key={item.label} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 12, color: "#5A4060", fontWeight: 600 }}>{item.label}</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: item.color }}>{item.val}</span>
          </div>
          <GaugeBar score={item.val} color={item.color} />
        </div>
      ))}
      <p style={{ fontSize: 10.5, color: "#A08090", textAlign: "center", marginTop: 12 }}>
        実際のPMASでは、より詳しい情報を確認できます
      </p>
    </div>
  );
}

// ── メインアプリ ──────────────────────────────────────────────────────────────
export default function BeautyGutScore() {
  const [screen, setScreen] = useState("top");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState(Array(20).fill(null));
  const [selected, setSelected] = useState(null);
  const [copied, setCopied] = useState(false);
  const [animIn, setAnimIn] = useState(true);

  const totalScore   = answers.every(a => a !== null) ? calcTotalScore(answers) : 0;
  const catScores    = calcCategoryScores(answers.map(a => a ?? 0));
  const lowestCat    = getLowestCategory(catScores);
  const scoreType    = getScoreType(totalScore);

  const go = (to) => {
    setAnimIn(false);
    setTimeout(() => { setScreen(to); setAnimIn(true); }, 220);
  };

  const handleSelect = (score) => setSelected(score);

  const handleNext = () => {
    if (selected === null) return;
    const next = [...answers];
    next[currentQ] = selected;
    setAnswers(next);
    setSelected(null);
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      go("result");
    }
  };

  const handleBack = () => {
    if (currentQ === 0) { go("top"); return; }
    const prev = currentQ - 1;
    setSelected(answers[prev]);
    setCurrentQ(prev);
  };

  const handleReset = () => {
    setAnswers(Array(20).fill(null));
    setCurrentQ(0);
    setSelected(null);
    go("top");
  };

  const handleCopy = () => {
    const text = `Beauty Gut Score\n総合スコア: ${totalScore}/100点\nタイプ: ${scoreType.title}\n#BeautyGutScore #腸活 #美腸`;
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── 共通スタイル ──────────────────────────────────────────────────────────
  const wrap = {
    fontFamily: "'Hiragino Maru Gothic ProN','Noto Sans JP',sans-serif",
    minHeight: "100vh",
    background: "linear-gradient(160deg,#FFF5F9 0%,#FFF9F5 50%,#F5F0FF 100%)",
    display: "flex", flexDirection: "column", alignItems: "center",
    padding: "0 0 48px", position: "relative", overflowX: "hidden",
  };
  const content = {
    width: "100%", maxWidth: 440, padding: "0 16px",
    opacity: animIn ? 1 : 0,
    transform: animIn ? "translateY(0)" : "translateY(14px)",
    transition: "opacity 0.22s ease, transform 0.22s ease",
  };
  const card = {
    background: "white", borderRadius: 24, padding: "20px 18px",
    boxShadow: "0 4px 28px rgba(255,107,157,0.09)",
    border: "1.5px solid #FFE0EE", width: "100%",
  };
  const btnPrimary = {
    width: "100%", padding: "15px 0", borderRadius: 99, border: "none",
    background: "linear-gradient(135deg,#FF6B9D 0%,#FF9F43 100%)",
    color: "white", fontSize: 15, fontWeight: 900, cursor: "pointer",
    boxShadow: "0 5px 20px rgba(255,107,157,0.38)", letterSpacing: "0.02em",
  };

  // ── TOP ────────────────────────────────────────────────────────────────────
  if (screen === "top") return (
    <div style={wrap}>
      <div style={{ position:"fixed", top:-60, right:-60, width:220, height:220, borderRadius:"50%", background:"rgba(255,107,157,0.07)", pointerEvents:"none" }} />
      <div style={{ position:"fixed", bottom:-40, left:-40, width:180, height:180, borderRadius:"50%", background:"rgba(192,132,252,0.07)", pointerEvents:"none" }} />
      <div style={content}>
        <div style={{ textAlign:"center", paddingTop:36 }}>
          <div style={{ display:"inline-block", background:"linear-gradient(135deg,#FF6B9D,#FF9F43)", borderRadius:99, padding:"5px 18px", fontSize:11, fontWeight:800, color:"white", letterSpacing:"0.1em", marginBottom:18 }}>
            Beauty Gut Score
          </div>
          <div style={{ margin:"0 auto 14px" }}><ChoChan state="kirara" /></div>
          <h1 style={{ fontSize:20, fontWeight:900, color:"#2D2235", lineHeight:1.45, marginBottom:14 }}>
            あなたの"痩せやすさ"と<br />"綺麗になりやすさ"は、<br />
            <span style={{ color:"#FF6B9D" }}>内側で決まっている</span>かも。
          </h1>
          <div style={{ background:"#FFF0F6", borderRadius:16, padding:"14px 16px", marginBottom:22, border:"1.5px solid #FFE0EE" }}>
            <p style={{ fontSize:13, color:"#5A4060", lineHeight:1.8, margin:0 }}>
              食事制限しても、運動しても、なぜか変わらない。<br />
              それ、意思の弱さではなく<br />
              <strong style={{ color:"#FF6B9D" }}>"腸内コンディション"</strong>のサインかもしれません。
            </p>
          </div>
          <button
            onClick={() => { setCurrentQ(0); setAnswers(Array(20).fill(null)); setSelected(null); go("quiz"); }}
            style={{ ...btnPrimary, marginBottom:10, fontSize:16 }}
          >
            ビューティー腸内スコアを測る ✨
          </button>
          <p style={{ fontSize:11, color:"#A08090" }}>3分でできるセルフチェック。医学的診断ではありません。</p>
        </div>
      </div>
    </div>
  );

  // ── QUIZ ──────────────────────────────────────────────────────────────────
  if (screen === "quiz") {
    const q = QUESTIONS[currentQ];
    const progress = (currentQ / QUESTIONS.length) * 100;

    // 選択肢ごとにアクセントカラーを変える（上から良い順）
    const optionColors = ["#FF6B9D", "#C084FC", "#FF9F43", "#94A3B8"];

    return (
      <div style={wrap}>
        <div style={content}>
          <div style={{ paddingTop:20 }}>
            {/* ヘッダー */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
              <button onClick={handleBack} style={{ background:"rgba(255,107,157,0.1)", border:"none", borderRadius:12, padding:"8px 14px", fontSize:13, color:"#FF6B9D", fontWeight:800, cursor:"pointer" }}>
                ← もどる
              </button>
              <span style={{ fontSize:13, fontWeight:700, color:"#A08090" }}>{currentQ + 1} / {QUESTIONS.length}</span>
            </div>

            {/* プログレスバー */}
            <div style={{ background:"#F5E6EE", borderRadius:99, height:8, marginBottom:22, overflow:"hidden" }}>
              <div style={{ width:`${progress}%`, height:"100%", background:"linear-gradient(90deg,#FF6B9D,#FF9F43)", borderRadius:99, transition:"width 0.4s ease" }} />
            </div>

            {/* 質問カード */}
            <div style={{ ...card, marginBottom:16, background:"linear-gradient(135deg,#FFF5F9,#FFF9F5)" }}>
              <div style={{ fontSize:11, color:"#FF6B9D", fontWeight:800, letterSpacing:"0.12em", marginBottom:10 }}>Q{currentQ + 1}</div>
              <p style={{ fontSize:17, fontWeight:800, color:"#2D2235", lineHeight:1.55, margin:0 }}>{q.text}</p>
            </div>

            {/* 選択肢 — 各質問専用ラベル */}
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:22 }}>
              {q.options.map((opt, i) => {
                const isSelected = selected === opt.score;
                const accentColor = optionColors[i];
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(opt.score)}
                    style={{
                      padding:"15px 18px", borderRadius:18, border:"none", cursor:"pointer",
                      background: isSelected ? accentColor : "white",
                      color: isSelected ? "white" : "#2D2235",
                      fontSize:14, fontWeight: isSelected ? 800 : 600,
                      boxShadow: isSelected
                        ? `0 5px 18px ${accentColor}55`
                        : "0 2px 8px rgba(0,0,0,0.06)",
                      border: isSelected ? "none" : "1.5px solid #FFE0EE",
                      textAlign:"left",
                      transition:"all 0.18s",
                      transform: isSelected ? "scale(1.025)" : "scale(1)",
                      display:"flex", alignItems:"center", gap:10,
                    }}
                  >
                    <span style={{
                      width:26, height:26, borderRadius:"50%", flexShrink:0,
                      background: isSelected ? "rgba(255,255,255,0.25)" : `${accentColor}18`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:13, fontWeight:900,
                      color: isSelected ? "white" : accentColor,
                    }}>
                      {isSelected ? "✓" : ["A","B","C","D"][i]}
                    </span>
                    <span style={{ lineHeight:1.5 }}>{opt.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleNext}
              disabled={selected === null}
              style={{
                ...btnPrimary,
                background: selected !== null ? "linear-gradient(135deg,#FF6B9D,#FF9F43)" : "#F5E6EE",
                color: selected !== null ? "white" : "#C0A0B0",
                cursor: selected !== null ? "pointer" : "not-allowed",
                boxShadow: selected !== null ? "0 5px 20px rgba(255,107,157,0.38)" : "none",
              }}
            >
              {currentQ < QUESTIONS.length - 1 ? "つぎへ →" : "結果を見る ✨"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── RESULT ────────────────────────────────────────────────────────────────
  if (screen === "result") return (
    <div style={wrap}>
      <div style={content}>
        <div style={{ paddingTop:24 }}>
          <div style={{ textAlign:"center", marginBottom:18 }}>
            <div style={{ fontSize:11, fontWeight:800, color:"#FF6B9D", letterSpacing:"0.14em", marginBottom:6 }}>あなたのスコア</div>
            <div style={{ fontSize:68, fontWeight:900, color:"#2D2235", lineHeight:1 }}>{totalScore}</div>
            <div style={{ fontSize:14, color:"#A08090", marginBottom:14 }}>/ 100点</div>
            <ChoChan state={scoreType.charState} />
            <div style={{ fontSize:13, fontWeight:800, color:
              scoreType.charState==="kirara" ? "#FF6B9D" :
              scoreType.charState==="yuragi" ? "#C084FC" :
              scoreType.charState==="otsukare" ? "#FF9F43" : "#94A3B8"
            , marginTop:6 }}>
              {scoreType.charState==="kirara"  ? "キラキラちょーちゃん ✨" :
               scoreType.charState==="yuragi"  ? "ゆらぎちょーちゃん 💤" :
               scoreType.charState==="otsukare"? "おつかれちょーちゃん 😓" :
                                                  "ぐったりちょーちゃん 💦"}
            </div>
          </div>

          <div style={{ ...card, marginBottom:14, background:"linear-gradient(135deg,#FFF0F6,#FFF6EC)", border:"2px solid #FFCCE0" }}>
            <div style={{ fontSize:17, fontWeight:900, color:"#FF6B9D", marginBottom:10 }}>{scoreType.title}</div>
            <p style={{ fontSize:13, color:"#5A4060", lineHeight:1.8, margin:0 }}>{scoreType.description}</p>
          </div>

          <div style={{ ...card, marginBottom:14 }}>
            <div style={{ fontSize:13, fontWeight:800, color:"#2D2235", marginBottom:14 }}>カテゴリ別スコア</div>
            {catScores.map((cat) => (
              <div key={cat.id} style={{ marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
                  <span style={{ fontSize:12.5, color:"#5A4060", fontWeight:600 }}>{cat.emoji} {cat.name}</span>
                  <span style={{ fontSize:13, fontWeight:800, color: cat.score>=70?"#34D399":cat.score>=50?"#FF9F43":"#FF6B9D" }}>{cat.score}%</span>
                </div>
                <GaugeBar score={cat.score} color={cat.score>=70?"#34D399":cat.score>=50?"#FF9F43":"#FF6B9D"} />
              </div>
            ))}
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:16 }}>
            <button onClick={() => go("detail")} style={{ ...btnPrimary, background:"linear-gradient(135deg,#FF6B9D,#C084FC)" }}>改善ポイントを見る 🔍</button>
            <button onClick={() => go("pmas")} style={{ ...btnPrimary, background:"linear-gradient(135deg,#FF9F43,#FFD166)" }}>PMASで詳しく確認する ✨</button>
            <button onClick={handleCopy} style={{ padding:"13px 0", borderRadius:99, border:"1.5px solid #FFCCE0", background:"white", color:"#FF6B9D", fontSize:14, fontWeight:800, cursor:"pointer", width:"100%" }}>
              {copied ? "コピーしました ✅" : "結果をコピーする 📋"}
            </button>
            <button onClick={handleReset} style={{ padding:"12px 0", borderRadius:99, border:"none", background:"transparent", color:"#A08090", fontSize:13, fontWeight:700, cursor:"pointer", width:"100%" }}>
              もう一度チェックする
            </button>
          </div>
          <Disclaimer />
        </div>
      </div>
    </div>
  );

  // ── DETAIL ────────────────────────────────────────────────────────────────
  if (screen === "detail") return (
    <div style={wrap}>
      <div style={content}>
        <div style={{ paddingTop:20 }}>
          <button onClick={() => go("result")} style={{ background:"rgba(255,107,157,0.1)", border:"none", borderRadius:12, padding:"8px 14px", fontSize:13, color:"#FF6B9D", fontWeight:800, cursor:"pointer", marginBottom:18 }}>
            ← 結果に戻る
          </button>

          <div style={{ ...card, background:"linear-gradient(135deg,#FFF0F6,#F5F0FF)", border:"2px solid #FFCCE0", marginBottom:14 }}>
            <div style={{ fontSize:10, fontWeight:800, color:"#FF6B9D", letterSpacing:"0.14em", marginBottom:6 }}>最優先改善ポイント</div>
            <div style={{ fontSize:28, marginBottom:4 }}>{lowestCat.emoji}</div>
            <div style={{ fontSize:18, fontWeight:900, color:"#2D2235", marginBottom:10 }}>{lowestCat.name}</div>
            <p style={{ fontSize:13, color:"#5A4060", lineHeight:1.8, margin:0 }}>{lowestCat.lowMessage}</p>
          </div>

          {[
            { icon:"💡", title:"なぜそこが大事なの？",             text:lowestCat.whyImportant },
            { icon:"😓", title:"今のダイエットでつまずきやすい理由", text:lowestCat.stumble },
            { icon:"🌿", title:"日常で意識できること（参考）",       text:lowestCat.tips },
          ].map((item) => (
            <div key={item.title} style={{ ...card, marginBottom:12 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <span style={{ fontSize:20 }}>{item.icon}</span>
                <span style={{ fontSize:13, fontWeight:800, color:"#2D2235" }}>{item.title}</span>
              </div>
              <p style={{ fontSize:13, color:"#5A4060", lineHeight:1.8, margin:0 }}>{item.text}</p>
            </div>
          ))}

          <div style={{ ...card, background:"#FFF0F6", border:"2px solid #FFCCE0", marginBottom:16, textAlign:"center" }}>
            <div style={{ fontSize:22, marginBottom:8 }}>🔬</div>
            <p style={{ fontSize:13, color:"#5A4060", lineHeight:1.8, margin:"0 0 14px" }}>
              本当の腸内環境の状態は、感覚だけではわかりません。<br />
              PMASで内側を確認することで、自分に合ったアプローチが見えてくるかもしれません。
            </p>
            <button onClick={() => go("pmas")} style={{ ...btnPrimary }}>PMASで確認する ✨</button>
          </div>
          <Disclaimer />
        </div>
      </div>
    </div>
  );

  // ── PMAS ──────────────────────────────────────────────────────────────────
  if (screen === "pmas") return (
    <div style={wrap}>
      <div style={content}>
        <div style={{ paddingTop:20 }}>
          <button onClick={() => go("result")} style={{ background:"rgba(255,107,157,0.1)", border:"none", borderRadius:12, padding:"8px 14px", fontSize:13, color:"#FF6B9D", fontWeight:800, cursor:"pointer", marginBottom:18 }}>
            ← 結果に戻る
          </button>

          <div style={{ textAlign:"center", marginBottom:20 }}>
            <div style={{ fontSize:11, fontWeight:800, color:"#FF6B9D", letterSpacing:"0.14em", marginBottom:12 }}>PMAS</div>
            <h2 style={{ fontSize:22, fontWeight:900, color:"#2D2235", lineHeight:1.4, marginBottom:14 }}>
              本当の状態は、<br />感覚だけでは<br /><span style={{ color:"#FF6B9D" }}>わからない。</span>
            </h2>
          </div>

          <div style={{ ...card, marginBottom:14 }}>
            <p style={{ fontSize:13, color:"#5A4060", lineHeight:1.85, margin:0 }}>
              このセルフチェックでは、生活習慣や体感をもとに、あなたの内側のコンディションをスコア化しました。<br /><br />
              ただし、実際の腸内環境やマイクロバイオームの状態は、感覚だけでは正確にはわかりません。<br /><br />
              PMASでは、腸内環境やマイクロバイオームの状態を確認することで、自分の体をより深く知るきっかけになります。<br /><br />
              体重計の数字だけを見るのではなく、まずは自分の内側を見てみませんか？
            </p>
          </div>

          <PmasReportCard />

          <a href={PMAS_URL} target="_blank" rel="noopener noreferrer"
            style={{ display:"block", padding:"16px 0", borderRadius:99,
              background:"linear-gradient(135deg,#FF6B9D 0%,#FF9F43 100%)",
              color:"white", fontSize:16, fontWeight:900,
              boxShadow:"0 6px 24px rgba(255,107,157,0.4)",
              marginBottom:12, textAlign:"center", textDecoration:"none",
            }}
          >
            PMASを購入して確認する ✨
          </a>

          <button onClick={handleReset} style={{ padding:"12px 0", borderRadius:99, border:"none", background:"transparent", color:"#A08090", fontSize:13, fontWeight:700, cursor:"pointer", width:"100%" }}>
            もう一度チェックする
          </button>
          <Disclaimer />
        </div>
      </div>
    </div>
  );

  return null;
}
