// @ts-nocheck
"use client";
import { useState, useEffect, useRef } from "react";

// ── カラーパレット ────────────────────────────────────────────────────────────
const C = {
  mint:     "#10B981",
  mintL:    "#ECFDF5",
  mintB:    "#A7F3D0",
  blue:     "#3B82F6",
  blueL:    "#EFF6FF",
  blueB:    "#BFDBFE",
  lav:      "#8B5CF6",
  lavL:     "#F5F3FF",
  lavB:     "#DDD6FE",
  coral:    "#F97316",
  coralL:   "#FFF7ED",
  coralB:   "#FED7AA",
  navy:     "#1E3A5F",
  white:    "#FFFFFF",
  offwhite: "#F8FAFC",
  muted:    "#64748B",
  dark:     "#0F172A",
  border:   "#E2E8F0",
};

// ── 24問 質問データ ───────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 1, text: "朝起きた時、体は軽いと感じますか？",
    options: [
      { label: "すごく軽い！スッキリ 🌅", score: 5 },
      { label: "まあまあ普通", score: 3 },
      { label: "少し重だるい", score: 2 },
      { label: "毎朝かなりしんどい", score: 0 },
    ],
  },
  {
    id: 2, text: "日中の集中力は続きやすいですか？",
    options: [
      { label: "長時間集中できる 🧠", score: 5 },
      { label: "まあまあ続く", score: 3 },
      { label: "すぐ散漫になる", score: 2 },
      { label: "ほぼ集中できない", score: 0 },
    ],
  },
  {
    id: 3, text: "食後に眠気やだるさを感じますか？",
    options: [
      { label: "ほとんど感じない 😊", score: 5 },
      { label: "たまに感じる", score: 3 },
      { label: "よく感じる", score: 2 },
      { label: "毎回かなり感じる", score: 0 },
    ],
  },
  {
    id: 4, text: "甘いものや炭水化物を強く欲しくなることはありますか？",
    options: [
      { label: "あまりない 💪", score: 5 },
      { label: "たまにある", score: 3 },
      { label: "けっこうある", score: 2 },
      { label: "毎日強く欲しくなる", score: 0 },
    ],
  },
  {
    id: 5, text: "便通のリズムは安定していますか？",
    options: [
      { label: "毎日かなり安定 ✅", score: 5 },
      { label: "だいたい安定している", score: 3 },
      { label: "不規則になりやすい", score: 2 },
      { label: "かなり乱れている", score: 0 },
    ],
  },
  {
    id: 6, text: "お腹の張りやガスが気になることはありますか？",
    options: [
      { label: "ほとんどない 😌", score: 5 },
      { label: "たまに気になる", score: 3 },
      { label: "よく気になる", score: 2 },
      { label: "毎日すごく気になる", score: 0 },
    ],
  },
  {
    id: 7, text: "外食や脂っこい食事の後、体が重く感じることはありますか？",
    options: [
      { label: "あまり感じない 👍", score: 5 },
      { label: "たまに感じる", score: 3 },
      { label: "よく感じる", score: 2 },
      { label: "毎回かなり感じる", score: 0 },
    ],
  },
  {
    id: 8, text: "食べすぎた翌日、むくみ・だるさ・胃腸の重さを感じますか？",
    options: [
      { label: "ほとんど感じない 💨", score: 5 },
      { label: "少し感じる程度", score: 3 },
      { label: "けっこう感じる", score: 2 },
      { label: "毎回ひどく感じる", score: 0 },
    ],
  },
  {
    id: 9, text: "肌荒れ、ニキビ、赤みなどが気になることはありますか？",
    options: [
      { label: "ほとんどない 🌸", score: 5 },
      { label: "たまに出る", score: 3 },
      { label: "よく出る", score: 2 },
      { label: "ずっと気になっている", score: 0 },
    ],
  },
  {
    id: 10, text: "肌の乾燥、くすみ、ハリ不足が気になることはありますか？",
    options: [
      { label: "あまり気にならない ✨", score: 5 },
      { label: "少し気になる程度", score: 3 },
      { label: "けっこう気になる", score: 2 },
      { label: "かなり悩んでいる", score: 0 },
    ],
  },
  {
    id: 11, text: "髪や爪のコンディションが気になることはありますか？",
    options: [
      { label: "特に気にならない", score: 5 },
      { label: "少し気になる", score: 3 },
      { label: "よく気になる", score: 2 },
      { label: "かなり悩んでいる", score: 0 },
    ],
  },
  {
    id: 12, text: "むくみやすいと感じますか？",
    options: [
      { label: "ほとんどむくまない 👍", score: 5 },
      { label: "たまにむくむ", score: 3 },
      { label: "よくむくむ", score: 2 },
      { label: "毎日むくんでいる", score: 0 },
    ],
  },
  {
    id: 13, text: "手足の冷えや巡りの悪さを感じますか？",
    options: [
      { label: "あまり感じない 🔥", score: 5 },
      { label: "少し感じることがある", score: 3 },
      { label: "よく感じる", score: 2 },
      { label: "1年中かなり感じる", score: 0 },
    ],
  },
  {
    id: 14, text: "睡眠の質は良いと感じますか？",
    options: [
      { label: "よく眠れて目覚めもいい 😴", score: 5 },
      { label: "まあまあ眠れている", score: 3 },
      { label: "途中で起きたり寝つきが悪い", score: 2 },
      { label: "毎晩なかなか眠れない", score: 0 },
    ],
  },
  {
    id: 15, text: "ストレスで食欲やお腹の調子が乱れますか？",
    options: [
      { label: "あまり乱れない 😊", score: 5 },
      { label: "少し乱れることがある", score: 3 },
      { label: "よく乱れる", score: 2 },
      { label: "かなり乱れる", score: 0 },
    ],
  },
  {
    id: 16, text: "気分の落ち込みやイライラを感じることはありますか？",
    options: [
      { label: "ほとんどない 🌈", score: 5 },
      { label: "たまにある", score: 3 },
      { label: "よくある", score: 2 },
      { label: "ほぼ毎日ある", score: 0 },
    ],
  },
  {
    id: 17, text: "風邪をひきやすい、疲れが抜けにくいと感じることはありますか？",
    options: [
      { label: "あまりない 💪", score: 5 },
      { label: "たまにある", score: 3 },
      { label: "けっこうある", score: 2 },
      { label: "かなりある", score: 0 },
    ],
  },
  {
    id: 18, text: "運動や食事管理をしても体の変化を感じにくいですか？",
    options: [
      { label: "変化を感じやすい ✨", score: 5 },
      { label: "まあまあ感じる", score: 3 },
      { label: "あまり感じない", score: 2 },
      { label: "ほとんど変化がわからない", score: 0 },
    ],
  },
  {
    id: 19, text: "お腹まわりの張りや重さが気になることはありますか？",
    options: [
      { label: "気にならない 😌", score: 5 },
      { label: "たまに気になる", score: 3 },
      { label: "よく気になる", score: 2 },
      { label: "毎日ずっと気になる", score: 0 },
    ],
  },
  {
    id: 20, text: "体のラインや体型が気になることはありますか？",
    options: [
      { label: "あまり気にならない", score: 5 },
      { label: "少し気になる", score: 3 },
      { label: "けっこう気になる", score: 2 },
      { label: "かなり気になっている", score: 0 },
    ],
  },
  {
    id: 21, text: "食事内容によって体調や肌の調子が変わりやすいですか？",
    options: [
      { label: "あまり変わらない", score: 5 },
      { label: "少し変わる", score: 3 },
      { label: "けっこう変わる", score: 2 },
      { label: "かなり変わりやすい", score: 0 },
    ],
  },
  {
    id: 22, text: "生活リズムが乱れると体調に出やすいですか？",
    options: [
      { label: "あまり出ない 💪", score: 5 },
      { label: "少し出ることがある", score: 3 },
      { label: "けっこう出る", score: 2 },
      { label: "すぐ体調に出る", score: 0 },
    ],
  },
  {
    id: 23, text: "自分に合う食事・サプリ・腸活がわからないと感じますか？",
    options: [
      { label: "自分に合うものがわかっている", score: 5 },
      { label: "だいたいわかっている", score: 3 },
      { label: "あまりわからない", score: 2 },
      { label: "全然わからない", score: 0 },
    ],
  },
  {
    id: 24, text: "今の自分の体のコンディションに満足していますか？",
    options: [
      { label: "満足している 🌟", score: 5 },
      { label: "まあまあ満足", score: 3 },
      { label: "あまり満足できていない", score: 2 },
      { label: "全然満足できていない", score: 0 },
    ],
  },
];

// ── 8カテゴリ ─────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "gut", name: "腸内リズム", emoji: "🌀", color: C.mint,
    questionIds: [5, 6, 7, 8, 19],
    lowMessage: "便通やお腹の張り、食後の重さなどに乱れが出やすい傾向があります。腸内リズムが整うと、体の軽さや肌コンディションにも変化を感じやすくなる可能性があります。",
    whyImportant: "腸内リズムは体全体のコンディションに関わっている可能性があります。",
    stumble: "腸内が整っていないと、ダイエットや美容の効果を感じにくくなることがあります。",
    tips: "起床後に水を飲む・発酵食品を取り入れる・食物繊維を意識するなどが参考になるかもしれません。",
  },
  {
    id: "diet", name: "ダイエット・代謝", emoji: "🔥", color: C.coral,
    questionIds: [3, 4, 8, 18, 20],
    lowMessage: "食後の眠気や糖質欲求、体の変化を感じにくいなどの傾向があります。内側のコンディションが代謝に関係している可能性があります。",
    whyImportant: "代謝の土台が整っていると、努力が結果につながりやすい可能性があります。",
    stumble: "頑張っているのに変化を感じにくいのは、内側の状態が影響しているかもしれません。",
    tips: "タンパク質を意識する・無理な制限より食材の質を重視するなどが参考になるかもしれません。",
  },
  {
    id: "beauty", name: "肌・美容コンディション", emoji: "✨", color: C.lav,
    questionIds: [9, 10, 11, 21],
    lowMessage: "肌荒れ、乾燥、くすみ、髪や爪のコンディション乱れが出やすい傾向があります。外側のケアとともに、内側の状態を見直す余地があるかもしれません。",
    whyImportant: "肌や髪のコンディションは内側の状態を反映している可能性があります。",
    stumble: "スキンケアを頑張っても内側が整っていないと変化を感じにくいことがあります。",
    tips: "水分補給・腸活・十分な睡眠が美容コンディションに関わるかもしれません。",
  },
  {
    id: "circulation", name: "巡り・むくみ", emoji: "💧", color: C.blue,
    questionIds: [1, 12, 13, 20],
    lowMessage: "むくみや冷え、体の重さが出やすい傾向があります。体重は変わらなくても巡りの状態で体感が変わることがあるかもしれません。",
    whyImportant: "巡りは代謝や老廃物の排出にも関わっている可能性があります。",
    stumble: "冷えやむくみが続くと体全体のパフォーマンスに影響することがあります。",
    tips: "温かい飲み物・ストレッチ・入浴などが参考になるかもしれません。",
  },
  {
    id: "sleep", name: "睡眠・ストレス", emoji: "🌙", color: C.lav,
    questionIds: [14, 15, 16, 22],
    lowMessage: "睡眠の質やストレスが体調・食欲・気分に影響している可能性があります。回復できる体かどうかを見直すことが大切かもしれません。",
    whyImportant: "睡眠不足はホルモンバランスや食欲に関わる可能性があります。",
    stumble: "疲れているほど糖質を欲しやすくなり、生活習慣が乱れやすくなります。",
    tips: "就寝前のスクリーン時間を減らす・深呼吸・ぬるめのお風呂が参考になるかもしれません。",
  },
  {
    id: "health", name: "健康コンディション", emoji: "🛡️", color: C.mint,
    questionIds: [2, 17, 22],
    lowMessage: "集中力の低下や疲れやすさ、免疫コンディションのゆらぎ傾向があります。内側から整えることで変化を感じやすくなる可能性があります。",
    whyImportant: "健康コンディションの土台が整うと日々のパフォーマンスに影響する可能性があります。",
    stumble: "疲れが抜けにくいと、モチベーションが続きにくくなることがあります。",
    tips: "規則正しい生活リズム・栄養バランス・適度な運動が参考になるかもしれません。",
  },
  {
    id: "appetite", name: "食欲・糖質バランス", emoji: "🍬", color: C.coral,
    questionIds: [3, 4, 15, 23],
    lowMessage: "糖質欲求や食欲の乱れが出やすい傾向があります。意思の問題ではなく、内側のコンディションが関係している可能性があります。",
    whyImportant: "食欲の調節には腸内環境が深く関わっている可能性があります。",
    stumble: "食欲が乱れやすいと、食事管理の継続が難しくなりがちです。",
    tips: "食事の間隔を一定に保つ・食物繊維を先に食べる・食後に軽く歩くなどが参考になるかもしれません。",
  },
  {
    id: "personal", name: "パーソナル理解度", emoji: "🔍", color: C.blue,
    questionIds: [21, 23, 24],
    lowMessage: "自分に合う食事・サプリ・腸活がわからない、または体のコンディションに満足できていない傾向があります。感覚だけでなく、データをもとに自分を知るきっかけが必要かもしれません。",
    whyImportant: "自分の体を知ることで、より効果的な選択ができる可能性があります。",
    stumble: "自分に合わない方法を続けることで、結果が出ずに諦めやすくなることがあります。",
    tips: "腸内環境を確認することで、パーソナルな選択肢が広がるかもしれません。",
  },
];

// ── スコアタイプ ──────────────────────────────────────────────────────────────
const SCORE_TYPES = [
  { min: 85, max: 100, charState: "great",    title: "内側コンディション良好タイプ",   description: "内側のコンディションはかなり整っている傾向です。今の状態をさらに深く知ることで、より自分に合ったケアができる可能性があります。" },
  { min: 70, max: 84,  charState: "good",     title: "整いかけタイプ",               description: "大きく崩れてはいないものの、いくつかのカテゴリにゆらぎが見られます。少し整えるだけで、日々のコンディションが変わる可能性があります。" },
  { min: 50, max: 69,  charState: "normal",   title: "ゆらぎ注意タイプ",             description: "複数のカテゴリにゆらぎが出ている傾向があります。頑張っているのに変化を感じにくい場合、内側のコンディションが関係しているかもしれません。" },
  { min: 30, max: 49,  charState: "tired",    title: "内側見直しタイプ",             description: "体の重さ、食欲の乱れ、睡眠、肌など複数の項目に不調のサインが出ている可能性があります。まず自分の内側を知ることが大切かもしれません。" },
  { min: 0,  max: 29,  charState: "exhausted",title: "おつかれ内側ケアタイプ",        description: "かなり多くの項目にゆらぎが出ている傾向があります。無理な制限や運動を続ける前に、内側のコンディションを確認することをおすすめします。" },
];

// ── トータルタイプ ────────────────────────────────────────────────────────────
const TOTAL_TYPES = [
  { id: "gut_rhythm",   name: "腸内リズムゆらぎ型",       category: "gut",         emoji: "🌀" },
  { id: "metabolism",   name: "代謝ブレーキ型",           category: "diet",        emoji: "🔥" },
  { id: "beauty_cond",  name: "美容コンディション乱れ型",  category: "beauty",      emoji: "✨" },
  { id: "sleep_stress", name: "睡眠ストレス影響型",        category: "sleep",       emoji: "🌙" },
  { id: "circulation",  name: "巡り・むくみ型",           category: "circulation", emoji: "💧" },
  { id: "appetite",     name: "食欲コントロールゆらぎ型",  category: "appetite",    emoji: "🍬" },
  { id: "health_cond",  name: "健康コンディション見直し型", category: "health",      emoji: "🛡️" },
  { id: "personal_opt", name: "パーソナル最適化型",        category: "personal",    emoji: "🔍" },
];

// ── PMASタイプ (4種類) ────────────────────────────────────────────────────────
const PMAS_TYPES = ["バランス型", "アクティブ型", "ポテンシャル型", "スリープ型"];

// ── ちょーちゃんパーツ ────────────────────────────────────────────────────────
const CHOCHAN_PARTS = {
  bodyColor: [C.mint, C.blue, C.lav, C.coral, "#FFD166", "#94A3B8", "#F472B6", "#34D399", "#60A5FA", "#A78BFA"],
  eyeType:   ["happy", "cool", "sleepy", "sparkle", "wink", "determined"],
  mouthType: ["smile", "grin", "neutral", "pout", "open"],
  accessory: ["none", "crown", "glasses", "bow", "star", "leaf", "drop", "flame", "moon", "heart"],
  aura:      ["none", "mint", "blue", "gold", "pink", "rainbow"],
};

const RARITY = [
  { id: "N",   name: "ノーマル",     color: "#94A3B8", threshold: 0  },
  { id: "R",   name: "レア",         color: C.blue,    threshold: 50 },
  { id: "SR",  name: "スーパーレア", color: C.lav,     threshold: 65 },
  { id: "SSR", name: "ミラクル",     color: C.coral,   threshold: 78 },
  { id: "UR",  name: "レジェンド",   color: "#FFD700", threshold: 90 },
];

// ── スコア計算 ────────────────────────────────────────────────────────────────
function calcTotalScore(answers) {
  const raw = answers.reduce((sum, s) => sum + (s ?? 0), 0);
  return Math.round((raw / 120) * 100);
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
function getTotalType(catScores) {
  const lowestId = [...catScores].sort((a, b) => a.score - b.score)[0].id;
  return TOTAL_TYPES.find(t => t.category === lowestId) ?? TOTAL_TYPES[0];
}
function getScoreType(total) {
  return SCORE_TYPES.find(t => total >= t.min && total <= t.max) ?? SCORE_TYPES[4];
}
function getRarity(score) {
  return [...RARITY].reverse().find(r => score >= r.threshold) ?? RARITY[0];
}
function generateChochan(totalScore, totalType, lowestCat) {
  const seed = totalScore * 31 + TOTAL_TYPES.indexOf(totalType) * 17 + CATEGORIES.indexOf(lowestCat) * 7;
  const pick = (arr, n) => arr[Math.abs(n) % arr.length];
  const s = (x) => Math.abs(Math.floor(Math.sin(seed * x + x) * 9999));
  const parts = {
    bodyColor: pick(CHOCHAN_PARTS.bodyColor,  s(2)),
    eyeType:   pick(CHOCHAN_PARTS.eyeType,    s(3)),
    mouthType: pick(CHOCHAN_PARTS.mouthType,  s(4)),
    accessory: pick(CHOCHAN_PARTS.accessory,  s(5)),
    aura:      pick(CHOCHAN_PARTS.aura,       s(6)),
  };
  const names = ["ぷにお", "もちこ", "ふわり", "きらら", "まろん", "ぽんた", "にこる", "そらお", "みるく", "ほのか"];
  const name = pick(names, s(8)) + "ちゃん";
  const attrs = { gut:"水", diet:"火", beauty:"光", circulation:"風", sleep:"月", health:"星", appetite:"土", personal:"宇宙" };
  const personalities = ["のんびりや", "がんばりや", "ふしぎちゃん", "つよがり", "やさしい子", "おちゃめ", "まじめ", "のびのび"];
  const comments = ["いっしょに内側から元気になろうね！", "ぼくのこと、もっと知って！", "腸内環境が気になるなら、一緒に確認しよう。", "内側を整えたら、もっとハッピーになれるかも！", "データをもとに、自分だけの答えを見つけよう！"];
  return {
    parts, name,
    rarity: getRarity(totalScore),
    attr: attrs[lowestCat.id] ?? "水",
    personality: pick(personalities, s(9)),
    comment: pick(comments, s(10)),
  };
}

// ── ちょーちゃん SVG（瞬き・手振り付き） ─────────────────────────────────────
function ChoChanSVG({ parts, state, size = 160 }) {
  const [blinkOn, setBlinkOn] = useState(false);
  const [waveAngle, setWaveAngle] = useState(0);
  const [waveDir, setWaveDir] = useState(1);
  const [sparkFrame, setSparkFrame] = useState(0);

  // 瞬き: 3〜5秒ごとにランダムで瞬く
  useEffect(() => {
    let timeout;
    const doBlink = () => {
      setBlinkOn(true);
      setTimeout(() => setBlinkOn(false), 150);
      timeout = setTimeout(doBlink, 3000 + Math.random() * 2000);
    };
    timeout = setTimeout(doBlink, 1500 + Math.random() * 2000);
    return () => clearTimeout(timeout);
  }, []);

  // 手を振る: 揺れアニメ
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveAngle(prev => {
        const next = prev + waveDir * 12;
        if (next > 36 || next < -36) setWaveDir(d => -d);
        return next;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [waveDir]);

  // キラキラフレーム
  useEffect(() => {
    if (state === "great" || state === "good") {
      const interval = setInterval(() => setSparkFrame(f => (f + 1) % 6), 300);
      return () => clearInterval(interval);
    }
  }, [state]);

  const { bodyColor, eyeType, mouthType, accessory, aura } = parts;
  const auraColors = { none: "transparent", mint: "#10B98133", blue: "#3B82F633", gold: "#FFD16633", pink: "#F472B633", rainbow: "#A78BFA33" };
  const auraColor = auraColors[aura] ?? "transparent";

  // ボディアニメのクラス
  const bodyAnim = state === "great" ? "cc-bounce" : state === "good" ? "cc-float" : state === "normal" ? "cc-sway" : "cc-tired";

  // キラキラの位置
  const sparkPositions = [[20,55],[170,50],[25,130],[175,125],[100,20],[150,140]];
  const showSparks = state === "great" || state === "good";

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {aura !== "none" && (
        <div style={{
          position: "absolute", inset: -14, borderRadius: "50%",
          background: auraColor, filter: "blur(14px)",
          animation: "aura-pulse 2s ease-in-out infinite",
        }} />
      )}

      <svg viewBox="0 0 200 230" width={size} height={size * 1.15}
        style={{ position: "relative", zIndex: 1, filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.13))", overflow: "visible" }}>

        {/* キラキラ */}
        {showSparks && sparkPositions.map((pos, i) => (
          (sparkFrame === i || sparkFrame === (i + 3) % 6) && (
            <text key={i} x={pos[0]} y={pos[1]} fontSize="12" textAnchor="middle" opacity="0.8">✨</text>
          )
        ))}

        {/* 右手（振る） */}
        <g transform={`rotate(${waveAngle}, 162, 138)`}>
          <ellipse cx="162" cy="138" rx="17" ry="10" fill={bodyColor} />
          <text x="162" y="132" fontSize="13" textAnchor="middle">👋</text>
        </g>

        {/* 左手（静止） */}
        <ellipse cx="38" cy="138" rx="17" ry="10" fill={bodyColor} transform="rotate(-25,38,138)" />

        {/* ボディ（全体が揺れる） */}
        <g className={bodyAnim}>
          {/* 足 */}
          <ellipse cx="78" cy="193" rx="15" ry="9" fill={bodyColor} transform="rotate(-8,78,193)" />
          <ellipse cx="122" cy="193" rx="15" ry="9" fill={bodyColor} transform="rotate(8,122,193)" />
          {/* 影 */}
          <ellipse cx="100" cy="208" rx="55" ry="8" fill={bodyColor} opacity="0.2" />
          {/* 体 */}
          <ellipse cx="100" cy="148" rx="58" ry="52" fill={bodyColor} />
          {/* 顔 */}
          <circle cx="100" cy="105" r="48" fill={bodyColor} />
          {/* 顔ハイライト */}
          <ellipse cx="82" cy="88" rx="12" ry="8" fill="white" opacity="0.22" transform="rotate(-20,82,88)" />
          {/* ほっぺ */}
          <ellipse cx="70" cy="118" rx="13" ry="9" fill="white" opacity="0.28" />
          <ellipse cx="130" cy="118" rx="13" ry="9" fill="white" opacity="0.28" />

          {/* 目（瞬き考慮） */}
          {blinkOn ? (
            <>
              <line x1="78" y1="101" x2="92" y2="101" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="108" y1="101" x2="122" y2="101" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              {eyeType === "happy" && <>
                <path d="M79 101 Q86 93 93 101" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <path d="M107 101 Q114 93 121 101" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              </>}
              {eyeType === "cool" && <>
                <rect x="77" y="97" width="16" height="6" rx="3" fill="white" />
                <rect x="107" y="97" width="16" height="6" rx="3" fill="white" />
              </>}
              {eyeType === "sleepy" && <>
                <ellipse cx="86" cy="101" rx="8" ry="5.5" fill="white" />
                <line x1="78" y1="99" x2="94" y2="99" stroke={bodyColor} strokeWidth="3" />
                <ellipse cx="114" cy="101" rx="8" ry="5.5" fill="white" />
                <line x1="106" y1="99" x2="122" y2="99" stroke={bodyColor} strokeWidth="3" />
              </>}
              {eyeType === "sparkle" && <>
                <circle cx="86" cy="101" r="8" fill="white" />
                <circle cx="114" cy="101" r="8" fill="white" />
                <text x="83" y="105" fontSize="10" textAnchor="middle" fill={bodyColor}>★</text>
                <text x="111" y="105" fontSize="10" textAnchor="middle" fill={bodyColor}>★</text>
              </>}
              {eyeType === "wink" && <>
                <path d="M79 101 Q86 93 93 101" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <line x1="108" y1="99" x2="121" y2="99" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
              </>}
              {eyeType === "determined" && <>
                <ellipse cx="86" cy="101" rx="8" ry="7" fill="white" />
                <ellipse cx="114" cy="101" rx="8" ry="7" fill="white" />
                <line x1="80" y1="95" x2="92" y2="98" stroke="white" strokeWidth="2.5" />
                <line x1="108" y1="98" x2="120" y2="95" stroke="white" strokeWidth="2.5" />
              </>}
            </>
          )}

          {/* 口 */}
          {mouthType === "smile"   && <path d="M85 118 Q100 129 115 118" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />}
          {mouthType === "grin"    && <path d="M82 116 Q100 131 118 116" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />}
          {mouthType === "neutral" && <line x1="88" y1="120" x2="112" y2="120" stroke="white" strokeWidth="3" strokeLinecap="round" />}
          {mouthType === "pout"    && <path d="M88 122 Q100 115 112 122" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />}
          {mouthType === "open"    && <ellipse cx="100" cy="120" rx="10" ry="7" fill="white" opacity="0.8" />}

          {/* アクセサリー */}
          {accessory === "crown"   && <><polygon points="72,67 80,49 90,61 100,43 110,61 120,49 128,67" fill="#FFD700" /><rect x="72" y="64" width="56" height="8" rx="3" fill="#FFB700" /></>}
          {accessory === "glasses" && <><rect x="72" y="95" width="22" height="14" rx="7" fill="none" stroke="white" strokeWidth="2.5" /><rect x="106" y="95" width="22" height="14" rx="7" fill="none" stroke="white" strokeWidth="2.5" /><line x1="94" y1="102" x2="106" y2="102" stroke="white" strokeWidth="2" /></>}
          {accessory === "bow"     && <><path d="M75,59 Q85,49 95,59 Q85,69 75,59Z" fill="#F472B6" /><path d="M105,59 Q115,49 125,59 Q115,69 105,59Z" fill="#F472B6" /><circle cx="100" cy="59" r="5" fill="#EC4899" /></>}
          {accessory === "star"    && <text x="100" y="56" fontSize="22" textAnchor="middle">⭐</text>}
          {accessory === "leaf"    && <text x="100" y="56" fontSize="22" textAnchor="middle">🌿</text>}
          {accessory === "drop"    && <text x="100" y="56" fontSize="22" textAnchor="middle">💧</text>}
          {accessory === "flame"   && <text x="100" y="56" fontSize="22" textAnchor="middle">🔥</text>}
          {accessory === "moon"    && <text x="100" y="56" fontSize="22" textAnchor="middle">🌙</text>}
          {accessory === "heart"   && <text x="100" y="56" fontSize="22" textAnchor="middle">💚</text>}
        </g>
      </svg>

      <style>{`
        .cc-bounce { animation: cc-bounce 1s ease-in-out infinite; transform-origin: center bottom; }
        .cc-float  { animation: cc-float 2.2s ease-in-out infinite; transform-origin: center; }
        .cc-sway   { animation: cc-sway 2.8s ease-in-out infinite; transform-origin: center bottom; }
        .cc-tired  { animation: cc-tired 2.2s ease-in-out infinite; transform-origin: center bottom; }
        @keyframes cc-bounce { 0%,100%{transform:translateY(0) scaleY(1)} 45%{transform:translateY(-16px) scaleY(1.05)} 55%{transform:translateY(-16px) scaleY(1.05)} 90%{transform:translateY(2px) scaleY(0.96)} }
        @keyframes cc-float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes cc-sway   { 0%,100%{transform:rotate(0deg)} 30%{transform:rotate(4deg)} 70%{transform:rotate(-4deg)} }
        @keyframes cc-tired  { 0%,100%{transform:rotate(0deg) translateY(0)} 40%{transform:rotate(-7deg) translateY(4px)} 80%{transform:rotate(3deg) translateY(2px)} }
        @keyframes aura-pulse { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.12)} }
      `}</style>
    </div>
  );
}

// ── 共通パーツ ────────────────────────────────────────────────────────────────
function Disclaimer() {
  return (
    <p style={{ fontSize: 11, color: C.muted, textAlign: "center", lineHeight: 1.65, marginTop: 24, padding: "14px 8px 0", borderTop: `1px solid ${C.border}` }}>
      このアプリは医療行為・医学的診断ではありません。結果は生活習慣や体感をもとにした参考情報です。気になる症状が続く場合は医療機関にご相談ください。
    </p>
  );
}
function GaugeBar({ score, color }) {
  return (
    <div style={{ background: C.border, borderRadius: 99, height: 10, overflow: "hidden", flex: 1 }}>
      <div style={{ width: `${score}%`, height: "100%", borderRadius: 99, background: color, transition: "width 1.2s cubic-bezier(.34,1.2,.64,1)" }} />
    </div>
  );
}

// ── メインアプリ ──────────────────────────────────────────────────────────────
export default function BeautyGutQuest() {
  const [screen, setScreen]   = useState("top");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState(Array(24).fill(null));
  const [selected, setSelected] = useState(null);
  const [copied, setCopied]   = useState(false);
  const [animIn, setAnimIn]   = useState(true);
  const [showPmasMsg, setShowPmasMsg] = useState(false);
  const [pmasTab, setPmasTab] = useState(0);
  const [pmasInput, setPmasInput] = useState({ score: "", type: "", bacteria: "", memo: "" });
  const [pmasSaved, setPmasSaved] = useState(false);

  const totalScore = answers.every(a => a !== null) ? calcTotalScore(answers) : 0;
  const catScores  = calcCategoryScores(answers.map(a => a ?? 0));
  const lowestCat  = getLowestCategory(catScores);
  const totalType  = getTotalType(catScores);
  const scoreType  = getScoreType(totalScore);
  const chochan    = generateChochan(totalScore, totalType, lowestCat);

  const go = (to) => {
    setAnimIn(false);
    setTimeout(() => { setScreen(to); setAnimIn(true); window.scrollTo(0,0); }, 200);
  };

  const handleNext = () => {
    if (selected === null) return;
    const next = [...answers];
    next[currentQ] = selected;
    setAnswers(next);
    setSelected(null);
    if (currentQ < QUESTIONS.length - 1) setCurrentQ(currentQ + 1);
    else go("result");
  };

  const handleBack = () => {
    if (currentQ === 0) { go("top"); return; }
    setSelected(answers[currentQ - 1]);
    setCurrentQ(currentQ - 1);
  };

  const handleReset = () => {
    setAnswers(Array(24).fill(null));
    setCurrentQ(0);
    setSelected(null);
    setPmasSaved(false);
    setPmasInput({ score: "", type: "", bacteria: "", memo: "" });
    go("top");
  };

  const handleCopy = () => {
    const text = `Beauty Gut Quest\n総合スコア：${totalScore}点\nタイプ：${totalType.name}\nちょーちゃん：${chochan.name}\nレア度：${chochan.rarity.name}\n最優先見直しポイント：${lowestCat.name}\n#BeautyGutQuest #腸活 #PMAS #ちょーちゃん`;
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 共通スタイル
  const wrap = {
    fontFamily: "'Hiragino Maru Gothic ProN','Noto Sans JP',sans-serif",
    minHeight: "100vh",
    background: `linear-gradient(160deg,${C.offwhite} 0%,${C.blueL} 50%,${C.lavL} 100%)`,
    display: "flex", flexDirection: "column", alignItems: "center",
    padding: "0 0 56px", overflowX: "hidden",
  };
  const content = {
    width: "100%", maxWidth: 440, padding: "0 16px",
    opacity: animIn ? 1 : 0,
    transform: animIn ? "translateY(0)" : "translateY(14px)",
    transition: "opacity 0.2s ease, transform 0.2s ease",
  };
  const card = {
    background: C.white, borderRadius: 20, padding: "18px 16px",
    boxShadow: "0 2px 20px rgba(59,130,246,0.08)",
    border: `1.5px solid ${C.border}`, width: "100%",
  };
  const btnPrimary = {
    width: "100%", padding: "14px 0", borderRadius: 99, border: "none",
    background: `linear-gradient(135deg,${C.mint},${C.blue})`,
    color: C.white, fontSize: 15, fontWeight: 900, cursor: "pointer",
    boxShadow: "0 4px 18px rgba(59,130,246,0.28)", letterSpacing: "0.02em", fontFamily: "inherit",
  };
  const btnSec = {
    width: "100%", padding: "12px 0", borderRadius: 99,
    border: `1.5px solid ${C.border}`, background: C.white,
    color: C.navy, fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "inherit",
  };
  const btnBack = {
    background: C.offwhite, border: "none", borderRadius: 12,
    padding: "8px 14px", fontSize: 13, color: C.blue,
    fontWeight: 800, cursor: "pointer", fontFamily: "inherit",
  };

  const charState = scoreType.charState === "great" ? "great" : scoreType.charState === "good" ? "good" : scoreType.charState === "normal" ? "normal" : "tired";

  // ── TOP ────────────────────────────────────────────────────────────────────
  if (screen === "top") return (
    <div style={wrap}>
      <div style={content}>
        <div style={{ textAlign: "center", paddingTop: 36 }}>
          <div style={{ display: "inline-block", background: `linear-gradient(135deg,${C.mint},${C.blue})`, borderRadius: 99, padding: "5px 18px", fontSize: 11, fontWeight: 800, color: C.white, letterSpacing: "0.12em", marginBottom: 20 }}>
            Beauty Gut Quest
          </div>
          <div style={{ margin: "0 auto 16px" }}>
            <ChoChanSVG parts={{ bodyColor: C.mint, eyeType: "sparkle", mouthType: "grin", accessory: "crown", aura: "mint" }} state="great" size={150} />
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 900, color: C.dark, lineHeight: 1.5, marginBottom: 14 }}>
            自分の内側を知って、<br />
            <span style={{ color: C.mint }}>あなただけの</span><br />
            "ちょーちゃん"を育てよう。
          </h1>
          <div style={{ background: C.blueL, borderRadius: 16, padding: "14px 16px", marginBottom: 22, border: `1.5px solid ${C.blueB}` }}>
            <p style={{ fontSize: 13, color: C.navy, lineHeight: 1.8, margin: 0 }}>
              腸内環境は、肌・睡眠・代謝・気分・免疫など<br />
              体全体のコンディションに関わっている可能性があります。<br />
              まず、自分の今の状態を知ることから始めましょう。
            </p>
          </div>
          <button onClick={() => { setCurrentQ(0); setAnswers(Array(24).fill(null)); setSelected(null); go("quiz"); }}
            style={{ ...btnPrimary, fontSize: 16, marginBottom: 10 }}>
            腸内コンディションをチェック ✨
          </button>
          <p style={{ fontSize: 11, color: C.muted }}>24問・約3分。医学的診断ではありません。</p>
        </div>
      </div>
    </div>
  );

  // ── QUIZ ──────────────────────────────────────────────────────────────────
  if (screen === "quiz") {
    const q = QUESTIONS[currentQ];
    const progress = (currentQ / QUESTIONS.length) * 100;
    const optColors = [C.mint, C.blue, C.lav, C.coral];
    return (
      <div style={wrap}>
        <div style={content}>
          <div style={{ paddingTop: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <button onClick={handleBack} style={btnBack}>← もどる</button>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.muted }}>{currentQ + 1} / {QUESTIONS.length}</span>
            </div>
            <div style={{ background: C.border, borderRadius: 99, height: 6, marginBottom: 20, overflow: "hidden" }}>
              <div style={{ width: `${progress}%`, height: "100%", background: `linear-gradient(90deg,${C.mint},${C.blue})`, borderRadius: 99, transition: "width 0.4s ease" }} />
            </div>
            <div style={{ ...card, marginBottom: 16, background: C.blueL, border: `1.5px solid ${C.blueB}` }}>
              <div style={{ fontSize: 10, color: C.blue, fontWeight: 800, letterSpacing: "0.14em", marginBottom: 8 }}>Q{currentQ + 1}</div>
              <p style={{ fontSize: 17, fontWeight: 800, color: C.dark, lineHeight: 1.55, margin: 0 }}>{q.text}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {q.options.map((opt, i) => {
                const isSel = selected === opt.score;
                const ac = optColors[i];
                return (
                  <button key={i} onClick={() => setSelected(opt.score)} style={{
                    padding: "14px 16px", borderRadius: 16, border: "none", cursor: "pointer",
                    background: isSel ? ac : C.white, color: isSel ? C.white : C.dark,
                    fontSize: 14, fontWeight: isSel ? 800 : 600,
                    boxShadow: isSel ? `0 4px 16px ${ac}55` : "0 1px 6px rgba(0,0,0,0.06)",
                    border: isSel ? "none" : `1.5px solid ${C.border}`,
                    textAlign: "left", transition: "all 0.15s",
                    transform: isSel ? "scale(1.02)" : "scale(1)",
                    display: "flex", alignItems: "center", gap: 10, fontFamily: "inherit",
                  }}>
                    <span style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, background: isSel ? "rgba(255,255,255,0.25)" : `${ac}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: isSel ? C.white : ac }}>
                      {isSel ? "✓" : ["A","B","C","D"][i]}
                    </span>
                    <span style={{ lineHeight: 1.5 }}>{opt.label}</span>
                  </button>
                );
              })}
            </div>
            <button onClick={handleNext} disabled={selected === null} style={{
              ...btnPrimary,
              background: selected !== null ? `linear-gradient(135deg,${C.mint},${C.blue})` : C.border,
              color: selected !== null ? C.white : C.muted,
              cursor: selected !== null ? "pointer" : "not-allowed",
              boxShadow: selected !== null ? "0 4px 18px rgba(59,130,246,0.28)" : "none",
            }}>
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
        <div style={{ paddingTop: 24 }}>
          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: C.blue, letterSpacing: "0.14em", marginBottom: 6 }}>総合スコア</div>
            <div style={{ fontSize: 72, fontWeight: 900, color: C.dark, lineHeight: 1 }}>{totalScore}</div>
            <div style={{ fontSize: 14, color: C.muted, marginBottom: 10 }}>/ 100点</div>
            <span style={{ display: "inline-block", background: C.blueL, color: C.blue, borderRadius: 99, padding: "4px 14px", fontSize: 12, fontWeight: 800 }}>{scoreType.title}</span>
          </div>

          <div style={{ ...card, marginBottom: 14, background: C.lavL, border: `1.5px solid ${C.lavB}`, textAlign: "center" }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: C.lav, letterSpacing: "0.12em", marginBottom: 6 }}>あなたのタイプ</div>
            <div style={{ fontSize: 28, marginBottom: 4 }}>{totalType.emoji}</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: C.dark }}>{totalType.name}</div>
          </div>

          <div style={{ ...card, marginBottom: 14, textAlign: "center" }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: C.mint, letterSpacing: "0.12em", marginBottom: 12 }}>あなた専用ちょーちゃん</div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
              <ChoChanSVG parts={chochan.parts} state={charState} size={130} />
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: C.dark, marginBottom: 8 }}>{chochan.name}</div>
            <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
              <span style={{ background: chochan.rarity.color + "22", color: chochan.rarity.color, borderRadius: 99, padding: "3px 10px", fontSize: 11, fontWeight: 800 }}>
                {chochan.rarity.id} {chochan.rarity.name}
              </span>
              <span style={{ background: C.mintL, color: C.mint, borderRadius: 99, padding: "3px 10px", fontSize: 11, fontWeight: 800 }}>
                属性：{chochan.attr}
              </span>
              <span style={{ background: C.lavL, color: C.lav, borderRadius: 99, padding: "3px 10px", fontSize: 11, fontWeight: 800 }}>
                {chochan.personality}
              </span>
            </div>
            <p style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>「{chochan.comment}」</p>
          </div>

          <div style={{ ...card, marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.dark, marginBottom: 14 }}>カテゴリ別スコア</div>
            {catScores.map((cat) => (
              <div key={cat.id} style={{ marginBottom: 11 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: C.dark, fontWeight: 600 }}>{cat.emoji} {cat.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 800, color: cat.score >= 70 ? C.mint : cat.score >= 50 ? C.coral : "#EF4444" }}>{cat.score}%</span>
                </div>
                <GaugeBar score={cat.score} color={cat.score >= 70 ? C.mint : cat.score >= 50 ? C.coral : "#EF4444"} />
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
            <button onClick={() => go("detail")} style={btnPrimary}>改善ポイントを見る 🔍</button>
            <button onClick={() => go("pmas")} style={{ ...btnPrimary, background: `linear-gradient(135deg,${C.lav},${C.blue})` }}>PMASで確認する 🔬</button>
            <button onClick={handleCopy} style={btnSec}>{copied ? "コピーしました ✅" : "結果をコピーする 📋"}</button>
            <button onClick={handleReset} style={{ ...btnSec, border: "none", color: C.muted, fontSize: 13 }}>もう一度チェックする</button>
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
        <div style={{ paddingTop: 20 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
            <button onClick={() => go("result")} style={btnBack}>← 結果に戻る</button>
            <button onClick={() => go("pmas")} style={{ ...btnBack, color: C.lav }}>PMASで確認する →</button>
          </div>
          <div style={{ ...card, background: C.blueL, border: `2px solid ${C.blueB}`, marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: C.blue, letterSpacing: "0.14em", marginBottom: 6 }}>最優先見直しポイント</div>
            <div style={{ fontSize: 28, marginBottom: 4 }}>{lowestCat.emoji}</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: C.dark, marginBottom: 10 }}>{lowestCat.name}</div>
            <p style={{ fontSize: 13, color: C.navy, lineHeight: 1.8, margin: 0 }}>{lowestCat.lowMessage}</p>
          </div>
          {[
            { icon: "💡", title: "なぜそこが大事なの？", text: lowestCat.whyImportant },
            { icon: "😓", title: "つまずきやすい理由",   text: lowestCat.stumble },
            { icon: "🌿", title: "日常で意識できること（参考）", text: lowestCat.tips },
          ].map((item) => (
            <div key={item.title} style={{ ...card, marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: C.dark }}>{item.title}</span>
              </div>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.8, margin: 0 }}>{item.text}</p>
            </div>
          ))}
          <div style={{ ...card, background: C.lavL, border: `1.5px solid ${C.lavB}`, marginBottom: 16, textAlign: "center" }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>🔬</div>
            <p style={{ fontSize: 13, color: C.navy, lineHeight: 1.8, margin: "0 0 14px" }}>
              本当の内側の状態は、感覚だけではわかりません。PMASで腸内環境を確認することで、自分に合ったアプローチが見えてくるかもしれません。
            </p>
            <button onClick={() => go("pmas")} style={btnPrimary}>PMASをやる準備を見る 🔬</button>
          </div>
          <button onClick={() => go("result")} style={{ ...btnSec, border: "none", color: C.muted, fontSize: 13 }}>結果に戻る</button>
          <Disclaimer />
        </div>
      </div>
    </div>
  );

  // ── PMAS ─────────────────────────────────────────────────────────────────
  if (screen === "pmas") return (
    <div style={wrap}>
      <div style={content}>
        <div style={{ paddingTop: 20 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
            <button onClick={() => go("result")} style={btnBack}>← 結果に戻る</button>
            <button onClick={() => go("detail")} style={{ ...btnBack, color: C.lav }}>改善ポイント →</button>
          </div>

          {/* タブ */}
          <div style={{ display: "flex", background: C.offwhite, borderRadius: 14, padding: 4, gap: 4, marginBottom: 18, border: `1px solid ${C.border}` }}>
            {["PMASとは？", "PMAS結果入力", "体感ログ"].map((tab, i) => (
              <button key={i} onClick={() => setPmasTab(i)} style={{
                flex: 1, padding: "9px 4px", borderRadius: 11, border: "none", cursor: "pointer",
                background: pmasTab === i ? C.white : "transparent",
                color: pmasTab === i ? C.blue : C.muted,
                fontSize: 11, fontWeight: pmasTab === i ? 800 : 600,
                boxShadow: pmasTab === i ? "0 1px 8px rgba(59,130,246,0.15)" : "none",
                transition: "all 0.2s", fontFamily: "inherit",
              }}>{tab}</button>
            ))}
          </div>

          {/* タブ1: PMASとは */}
          {pmasTab === 0 && <>
            <div style={{ textAlign: "center", marginBottom: 18 }}>
              <h2 style={{ fontSize: 20, fontWeight: 900, color: C.dark, lineHeight: 1.45, marginBottom: 8 }}>
                本当の状態は、<br />感覚だけでは<span style={{ color: C.blue }}>わからない。</span>
              </h2>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.75 }}>PMASは、腸内環境やマイクロバイオームの状態を確認し、自分に合う可能性のある成分や生活習慣を考えるきっかけになるサービスです。</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              <div style={{ ...card, background: "#F8FAFC", border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: C.muted, marginBottom: 10 }}>これまで</div>
                {["なんとなく良さそうなサプリを試す", "流行りのダイエットを真似する", "効果があるかは飲んでみないとわからない", "自分に合っているか判断しづらい"].map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                    <span style={{ color: "#EF4444", fontWeight: 800, flexShrink: 0 }}>✗</span>
                    <span style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>
              <div style={{ ...card, background: C.mintL, border: `1.5px solid ${C.mintB}` }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: C.mint, marginBottom: 10 }}>PMAS後</div>
                {["自分の腸内環境を確認できる", "マイクロバイオームの状態を知るきっかけになる", "自分に合う可能性のある整え方を考えられる", "感覚だけでなくデータをもとに選べる"].map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                    <span style={{ color: C.mint, fontWeight: 800, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 11, color: C.navy, lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {[
              { emoji: "🔬", title: "PMASで確認できること", body: "腸内環境やマイクロバイオームの状態を数値で確認できます。自分の腸内にどんな菌がいて、どんなバランスかを知るきっかけになります。" },
              { emoji: "📋", title: "PMASをやる前に知っておきたいこと", body: "PMASは医療行為ではなく、腸内環境を知るための参考情報です。疾患の診断はできません。生活習慣の見直しや自分に合ったサポートを考える材料になります。" },
              { emoji: "🛒", title: "アムウェイのネットでPMASを確認する", body: "PMASはアムウェイの公式ネットから確認できます。詳しくは紹介者・担当者にご確認ください。" },
            ].map((item, i) => (
              <div key={i} style={{ ...card, marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 20 }}>{item.emoji}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: C.dark }}>{item.title}</span>
                </div>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.8, margin: 0 }}>{item.body}</p>
              </div>
            ))}

            <button onClick={() => setShowPmasMsg(!showPmasMsg)} style={{ ...btnPrimary, marginBottom: 10 }}>
              PMASをアムウェイのネットで確認する
            </button>
            {showPmasMsg && (
              <div style={{ ...card, background: C.blueL, border: `1.5px solid ${C.blueB}`, marginBottom: 14, textAlign: "center" }}>
                <div style={{ fontSize: 20, marginBottom: 8 }}>📢</div>
                <p style={{ fontSize: 13, color: C.navy, lineHeight: 1.8, margin: 0 }}>
                  PMASはアムウェイのネットから確認できます。<br />商品名や購入方法は、紹介者・担当者に確認してください。
                </p>
              </div>
            )}
            <button onClick={() => setPmasTab(1)} style={{ ...btnSec, marginBottom: 10 }}>PMAS結果を入力する →</button>
          </>}

          {/* タブ2: PMAS結果入力 */}
          {pmasTab === 1 && <>
            <div style={{ ...card, marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.dark, marginBottom: 14 }}>🔬 PMAS結果を入力</div>

              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>PMASスコア（0〜100）</div>
                <input type="number" min="0" max="100" value={pmasInput.score}
                  onChange={e => setPmasInput({...pmasInput, score: e.target.value})}
                  placeholder="例：78"
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${C.border}`, fontSize: 15, fontFamily: "inherit", outline: "none", background: C.offwhite }} />
              </div>

              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>PMASタイプ</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {PMAS_TYPES.map(t => (
                    <button key={t} onClick={() => setPmasInput({...pmasInput, type: t})}
                      style={{
                        padding: "12px 8px", borderRadius: 14, border: "none", cursor: "pointer",
                        background: pmasInput.type === t ? C.blue : C.offwhite,
                        color: pmasInput.type === t ? C.white : C.dark,
                        fontSize: 13, fontWeight: pmasInput.type === t ? 800 : 600,
                        boxShadow: pmasInput.type === t ? `0 3px 12px ${C.blue}44` : "none",
                        border: pmasInput.type === t ? "none" : `1.5px solid ${C.border}`,
                        transition: "all 0.15s", fontFamily: "inherit",
                      }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>主要の菌（複数OK）</div>
                <input type="text" value={pmasInput.bacteria}
                  onChange={e => setPmasInput({...pmasInput, bacteria: e.target.value})}
                  placeholder="例：ビフィズス菌、乳酸菌"
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${C.border}`, fontSize: 14, fontFamily: "inherit", outline: "none", background: C.offwhite }} />
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>メモ（任意）</div>
                <textarea value={pmasInput.memo}
                  onChange={e => setPmasInput({...pmasInput, memo: e.target.value})}
                  placeholder="結果を見て気づいたことなど..."
                  rows={3}
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${C.border}`, fontSize: 14, fontFamily: "inherit", outline: "none", background: C.offwhite, resize: "vertical" }} />
              </div>

              <button onClick={() => setPmasSaved(true)} style={btnPrimary}>
                PMAS結果を保存して、ちょーちゃんを進化させる 🌟
              </button>
            </div>

            {pmasSaved && (
              <div style={{ ...card, background: C.mintL, border: `2px solid ${C.mintB}`, marginBottom: 14, textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>🎉</div>
                <div style={{ fontSize: 16, fontWeight: 900, color: C.dark, marginBottom: 10 }}>ちょーちゃんが進化しました！</div>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                  <ChoChanSVG parts={chochan.parts} state="great" size={110} />
                </div>
                {pmasInput.score && <div style={{ fontSize: 13, color: C.navy, marginBottom: 4 }}>PMASスコア：<strong>{pmasInput.score}点</strong></div>}
                {pmasInput.type  && <div style={{ fontSize: 13, color: C.navy, marginBottom: 4 }}>タイプ：<strong>{pmasInput.type}</strong></div>}
                {pmasInput.bacteria && <div style={{ fontSize: 13, color: C.navy, marginBottom: 12 }}>主要の菌：<strong>{pmasInput.bacteria}</strong></div>}
                <p style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.75, margin: 0 }}>
                  PMASで自分の内側を確認したことで、ちょーちゃんが"あなた専用データ"を覚えました。体感ログを記録しながら一緒に育てていきましょう。
                </p>
              </div>
            )}
          </>}

          {/* タブ3: 体感ログ */}
          {pmasTab === 2 && <>
            <div style={{ ...card, marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.dark, marginBottom: 8 }}>📝 体感ログを記録する</div>
              <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.65, marginBottom: 14 }}>パーソナルプロバイオ摂取後の体感を1ヶ月ごとに記録しましょう。記録するほどちょーちゃんが進化します！</p>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>経過月数</div>
                <select style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${C.border}`, fontSize: 14, fontFamily: "inherit", outline: "none", background: C.offwhite }}>
                  {[...Array(10)].map((_, i) => <option key={i} value={i+1}>{i+1}ヶ月目</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>体感スコア（1〜10）</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {[...Array(10)].map((_, i) => (
                    <button key={i} style={{ width: 36, height: 36, borderRadius: 10, border: `1.5px solid ${C.border}`, background: C.offwhite, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>{i+1}</button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>体感カテゴリ（複数選択OK）</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["お腹","睡眠","肌","食欲","むくみ","気分","集中力","体の軽さ"].map(t => (
                    <button key={t} style={{ padding: "6px 12px", borderRadius: 99, border: `1.5px solid ${C.border}`, background: C.offwhite, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{t}</button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>メモ（任意）</div>
                <textarea placeholder="今月の体感を記録..." rows={3}
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${C.border}`, fontSize: 14, fontFamily: "inherit", outline: "none", background: C.offwhite, resize: "vertical" }} />
              </div>
              <button style={btnPrimary}>体感ログを保存して進化を見る 🌟</button>
            </div>

            <div style={{ ...card, marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.dark, marginBottom: 14 }}>🗺️ 進化ロードマップ</div>
              {[
                { lv:1,  name:"たまごちょーちゃん",   cond:"診断完了",      done: true },
                { lv:2,  name:"めざめちょーちゃん",   cond:"PMAS結果入力",  done: pmasSaved },
                { lv:3,  name:"ぷにぷにちょーちゃん", cond:"1ヶ月目ログ",  done: false },
                { lv:4,  name:"すこやかちょーちゃん", cond:"2ヶ月目ログ",  done: false },
                { lv:5,  name:"きらめきちょーちゃん", cond:"3ヶ月目ログ",  done: false },
                { lv:6,  name:"まもりちょーちゃん",   cond:"4ヶ月目ログ",  done: false },
                { lv:7,  name:"めぐりちょーちゃん",   cond:"5ヶ月目ログ",  done: false },
                { lv:8,  name:"びようちょーちゃん",   cond:"6ヶ月目ログ",  done: false },
                { lv:9,  name:"パワーちょーちゃん",   cond:"8ヶ月目ログ",  done: false },
                { lv:10, name:"ミラクルちょーちゃん", cond:"10ヶ月目ログ", done: false },
              ].map((ev) => (
                <div key={ev.lv} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, opacity: ev.done ? 1 : 0.45 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: ev.done ? C.mint : C.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: C.white, flexShrink: 0 }}>
                    {ev.done ? "✓" : ev.lv}
                  </div>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 800, color: C.dark }}>{ev.name}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{ev.cond}</div>
                  </div>
                </div>
              ))}
            </div>
          </>}

          <button onClick={handleReset} style={{ ...btnSec, border: "none", color: C.muted, fontSize: 13, marginTop: 4 }}>もう一度チェックする</button>
          <Disclaimer />
        </div>
      </div>
    </div>
  );

  return null;
}
