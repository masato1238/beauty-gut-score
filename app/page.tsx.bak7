// @ts-nocheck
"use client";
import { useState, useEffect } from "react";

// ── カラー ────────────────────────────────────────────────────────────────────
const C = {
  mint:"#10B981", mintL:"#ECFDF5", mintB:"#A7F3D0",
  blue:"#3B82F6", blueL:"#EFF6FF", blueB:"#BFDBFE",
  lav:"#8B5CF6",  lavL:"#F5F3FF",  lavB:"#DDD6FE",
  coral:"#F97316",coralL:"#FFF7ED",coralB:"#FED7AA",
  pink:"#EC4899", pinkL:"#FDF2F8", pinkB:"#FBCFE8",
  navy:"#1E3A5F", white:"#FFFFFF", offwhite:"#F8FAFC",
  muted:"#64748B",dark:"#0F172A",  border:"#E2E8F0",
  gold:"#FFD700", warn:"#EF4444",  amber:"#F59E0B",
};

// ── まごはやさしい キーワード ─────────────────────────────────────────────────
const MAGO_KEYWORDS = {
  ma:  { label:"ま", name:"豆類",       emoji:"🫘", keywords:["豆","納豆","豆腐","味噌","みそ","大豆","きなこ","豆乳","あずき","小豆","えだまめ","枝豆","レンズ豆","ひよこ豆","黒豆"], point:15 },
  go:  { label:"ご", name:"ごま・ナッツ",emoji:"🌰", keywords:["ごま","胡麻","くるみ","アーモンド","ナッツ","ピーナッツ","カシューナッツ","ピスタチオ","松の実","ごま油"], point:10 },
  ha:  { label:"は", name:"発酵食品",   emoji:"🧫", keywords:["ヨーグルト","キムチ","漬物","つけもの","味噌","みそ","納豆","ぬか","チーズ","甘酒","こうじ","麹","酢","ビネガー","ケフィア","テンペ","ザワークラウト"], point:20 },
  ya:  { label:"や", name:"野菜",       emoji:"🥦", keywords:["野菜","サラダ","ほうれん草","ブロッコリー","キャベツ","玉ねぎ","にんじん","トマト","きゅうり","レタス","ピーマン","なす","白菜","大根","ごぼう","れんこん","ネギ","葱","アボカド","小松菜","チンゲン菜","春菊","水菜"], point:15 },
  sa:  { label:"さ", name:"魚",         emoji:"🐟", keywords:["魚","サーモン","鮭","さば","サバ","まぐろ","マグロ","あじ","アジ","いわし","イワシ","たら","タラ","ぶり","ブリ","かつお","カツオ","さんま","サンマ","刺身","寿司","すし","魚介","シーフード","えび","いか"], point:15 },
  shi: { label:"し", name:"きのこ類",   emoji:"🍄", keywords:["きのこ","しいたけ","しめじ","えのき","まいたけ","なめこ","エリンギ","マッシュルーム","きくらげ","舞茸","椎茸"], point:10 },
  i:   { label:"い", name:"芋類",       emoji:"🍠", keywords:["芋","いも","さつまいも","じゃがいも","やまいも","山芋","長芋","ながいも","こんにゃく","里芋","さといも","タロイモ"], point:15 },
};

// ── 腸に悪いもの キーワード ───────────────────────────────────────────────────
const BAD_KEYWORDS = [
  { key:"convenience", keywords:["コンビニ","弁当","加工食品","インスタント","カップ麺","スナック","ポテチ","チップス","レトルト"], emoji:"🍱", label:"加工食品・コンビニ食", damage:-20 },
  { key:"fried",       keywords:["揚げ","フライ","唐揚げ","から揚げ","天ぷら","とんかつ","フライドポテト","コロッケ","ドーナツ"], emoji:"🍟", label:"揚げ物", damage:-15 },
  { key:"alcohol",     keywords:["ビール","酒","お酒","ワイン","日本酒","焼酎","ウイスキー","チューハイ","サワー","飲酒","アルコール"], emoji:"🍺", label:"お酒", damage:-25 },
  { key:"tobacco",     keywords:["タバコ","たばこ","煙草","喫煙"], emoji:"🚬", label:"タバコ", damage:-30 },
  { key:"sugar",       keywords:["ケーキ","チョコ","アイス","クッキー","ジュース","コーラ","菓子","お菓子","糖分","スイーツ","清涼飲料","甘いもの"], emoji:"🍭", label:"甘いもの・糖分", damage:-15 },
  { key:"fastfood",    keywords:["マクドナルド","マック","バーガー","ハンバーガー","ケンタ","吉野家","松屋","すき家","牛丼","ファストフード"], emoji:"🍔", label:"ファストフード", damage:-20 },
];

// ── Amwayサプリ（隠し） ───────────────────────────────────────────────────────
const AMWAY_SUPPS = [
  { key:"probio_plus", label:"プロバイオ プラス", emoji:"💊", boost:30 },
  { key:"probio",      label:"プロバイオ",        emoji:"💊", boost:20 },
  { key:"fiber",       label:"ファイバーパウダー", emoji:"🌿", boost:20 },
  { key:"blend_fiber", label:"ブレンドファイバー", emoji:"🌿", boost:15 },
];

// ── 進化段階 ──────────────────────────────────────────────────────────────────
const EVO = [
  { lv:1,  name:"たまごちょーちゃん",   minScore:0,   color:"#94A3B8" },
  { lv:2,  name:"めざめちょーちゃん",   minScore:10,  color:"#A7F3D0" },
  { lv:3,  name:"ぷにぷにちょーちゃん", minScore:25,  color:C.mint    },
  { lv:4,  name:"すこやかちょーちゃん", minScore:40,  color:"#34D399" },
  { lv:5,  name:"きらめきちょーちゃん", minScore:55,  color:C.blue    },
  { lv:6,  name:"まもりちょーちゃん",   minScore:65,  color:C.lav     },
  { lv:7,  name:"めぐりちょーちゃん",   minScore:75,  color:"#6366F1" },
  { lv:8,  name:"びようちょーちゃん",   minScore:82,  color:"#EC4899" },
  { lv:9,  name:"パワーちょーちゃん",   minScore:90,  color:C.coral   },
  { lv:10, name:"ミラクルちょーちゃん", minScore:100, color:C.gold    },
];

// ── 24問 ─────────────────────────────────────────────────────────────────────
const QUESTIONS = [
  { id:1,  text:"朝起きた時、体は軽いと感じますか？",
    options:[{label:"すごく軽い！スッキリ 🌅",score:5},{label:"まあまあ普通",score:3},{label:"少し重だるい",score:2},{label:"毎朝かなりしんどい",score:0}] },
  { id:2,  text:"日中の集中力は続きやすいですか？",
    options:[{label:"長時間集中できる 🧠",score:5},{label:"まあまあ続く",score:3},{label:"すぐ散漫になる",score:2},{label:"ほぼ集中できない",score:0}] },
  { id:3,  text:"食後に眠気やだるさを感じますか？",
    options:[{label:"ほとんど感じない 😊",score:5},{label:"たまに感じる",score:3},{label:"よく感じる",score:2},{label:"毎回かなり感じる",score:0}] },
  { id:4,  text:"甘いものや炭水化物を強く欲しくなることはありますか？",
    options:[{label:"あまりない 💪",score:5},{label:"たまにある",score:3},{label:"けっこうある",score:2},{label:"毎日強く欲しくなる",score:0}] },
  { id:5,  text:"便通のリズムは安定していますか？",
    options:[{label:"毎日かなり安定 ✅",score:5},{label:"だいたい安定している",score:3},{label:"不規則になりやすい",score:2},{label:"かなり乱れている",score:0}] },
  { id:6,  text:"お腹の張りやガスが気になることはありますか？",
    options:[{label:"ほとんどない 😌",score:5},{label:"たまに気になる",score:3},{label:"よく気になる",score:2},{label:"毎日すごく気になる",score:0}] },
  { id:7,  text:"外食や脂っこい食事の後、体が重く感じることはありますか？",
    options:[{label:"あまり感じない 👍",score:5},{label:"たまに感じる",score:3},{label:"よく感じる",score:2},{label:"毎回かなり感じる",score:0}] },
  { id:8,  text:"食べすぎた翌日、むくみ・だるさ・胃腸の重さを感じますか？",
    options:[{label:"ほとんど感じない 💨",score:5},{label:"少し感じる程度",score:3},{label:"けっこう感じる",score:2},{label:"毎回ひどく感じる",score:0}] },
  { id:9,  text:"肌荒れ、ニキビ、赤みなどが気になることはありますか？",
    options:[{label:"ほとんどない 🌸",score:5},{label:"たまに出る",score:3},{label:"よく出る",score:2},{label:"ずっと気になっている",score:0}] },
  { id:10, text:"肌の乾燥、くすみ、ハリ不足が気になることはありますか？",
    options:[{label:"あまり気にならない ✨",score:5},{label:"少し気になる程度",score:3},{label:"けっこう気になる",score:2},{label:"かなり悩んでいる",score:0}] },
  { id:11, text:"髪や爪のコンディションが気になることはありますか？",
    options:[{label:"特に気にならない",score:5},{label:"少し気になる",score:3},{label:"よく気になる",score:2},{label:"かなり悩んでいる",score:0}] },
  { id:12, text:"むくみやすいと感じますか？",
    options:[{label:"ほとんどむくまない 👍",score:5},{label:"たまにむくむ",score:3},{label:"よくむくむ",score:2},{label:"毎日むくんでいる",score:0}] },
  { id:13, text:"手足の冷えや巡りの悪さを感じますか？",
    options:[{label:"あまり感じない 🔥",score:5},{label:"少し感じることがある",score:3},{label:"よく感じる",score:2},{label:"1年中かなり感じる",score:0}] },
  { id:14, text:"睡眠の質は良いと感じますか？",
    options:[{label:"よく眠れて目覚めもいい 😴",score:5},{label:"まあまあ眠れている",score:3},{label:"途中で起きたり寝つきが悪い",score:2},{label:"毎晩なかなか眠れない",score:0}] },
  { id:15, text:"ストレスで食欲やお腹の調子が乱れますか？",
    options:[{label:"あまり乱れない 😊",score:5},{label:"少し乱れることがある",score:3},{label:"よく乱れる",score:2},{label:"かなり乱れる",score:0}] },
  { id:16, text:"気分の落ち込みやイライラを感じることはありますか？",
    options:[{label:"ほとんどない 🌈",score:5},{label:"たまにある",score:3},{label:"よくある",score:2},{label:"ほぼ毎日ある",score:0}] },
  { id:17, text:"風邪をひきやすい、疲れが抜けにくいと感じることはありますか？",
    options:[{label:"あまりない 💪",score:5},{label:"たまにある",score:3},{label:"けっこうある",score:2},{label:"かなりある",score:0}] },
  { id:18, text:"運動や食事管理をしても体の変化を感じにくいですか？",
    options:[{label:"変化を感じやすい ✨",score:5},{label:"まあまあ感じる",score:3},{label:"あまり感じない",score:2},{label:"ほとんど変化がわからない",score:0}] },
  { id:19, text:"食事内容によって翌日の体調が変わりやすいですか？",
    options:[{label:"あまり変わらない",score:5},{label:"少し変わる",score:3},{label:"けっこう変わる",score:2},{label:"かなり変わりやすい",score:0}] },
  { id:20, text:"体のラインや体型が気になることはありますか？",
    options:[{label:"あまり気にならない",score:5},{label:"少し気になる",score:3},{label:"けっこう気になる",score:2},{label:"かなり気になっている",score:0}] },
  { id:21, text:"腸活や食事に気をつけていると体調の変化を感じますか？",
    options:[{label:"はっきり感じる",score:5},{label:"少し感じる",score:3},{label:"あまり感じない",score:2},{label:"全然感じない",score:0}] },
  { id:22, text:"生活リズムが乱れると体調に出やすいですか？",
    options:[{label:"あまり出ない 💪",score:5},{label:"少し出ることがある",score:3},{label:"けっこう出る",score:2},{label:"すぐ体調に出る",score:0}] },
  { id:23, text:"自分に合う食事・腸活がわからないと感じますか？",
    options:[{label:"自分に合うものがわかっている",score:5},{label:"だいたいわかっている",score:3},{label:"あまりわからない",score:2},{label:"全然わからない",score:0}] },
  { id:24, text:"今の自分の体のコンディションに満足していますか？",
    options:[{label:"満足している 🌟",score:5},{label:"まあまあ満足",score:3},{label:"あまり満足できていない",score:2},{label:"全然満足できていない",score:0}] },
];

const CATEGORIES = [
  { id:"gut",         name:"腸内リズム",         emoji:"🌀", color:C.mint,  questionIds:[5,6,7,8,19], lowMessage:"便通やお腹の張りに乱れが出やすい傾向があります。",whyImportant:"腸内リズムは体全体の土台です。",stumble:"腸が乱れると他も崩れやすくなります。",tips:"発酵食品・食物繊維・水分補給を意識してみてください。"},
  { id:"diet",        name:"ダイエット・代謝",   emoji:"🔥", color:C.coral, questionIds:[3,4,8,18,20], lowMessage:"代謝や体の変化を感じにくい傾向があります。",whyImportant:"代謝の土台が整うと努力が結果につながりやすくなります。",stumble:"内側が整っていないと変化を感じにくいことがあります。",tips:"タンパク質・食物繊維を意識した食事が参考になるかもしれません。"},
  { id:"beauty",      name:"肌・美容",           emoji:"✨", color:C.lav,   questionIds:[9,10,11,21], lowMessage:"肌や髪のコンディションにゆらぎが出やすい傾向があります。",whyImportant:"肌のコンディションは内側の状態を反映しています。",stumble:"スキンケアだけでは改善しにくいことがあります。",tips:"発酵食品・水分補給・睡眠が美容コンディションに関わります。"},
  { id:"circulation", name:"巡り・むくみ",       emoji:"💧", color:C.blue,  questionIds:[1,12,13,20], lowMessage:"むくみや冷えが出やすい傾向があります。",whyImportant:"巡りは代謝や老廃物の排出に関わっています。",stumble:"巡りが悪いと見た目にも影響することがあります。",tips:"温かい飲み物・ストレッチ・入浴が参考になるかもしれません。"},
  { id:"sleep",       name:"睡眠・ストレス",     emoji:"🌙", color:C.lav,   questionIds:[14,15,16,22], lowMessage:"睡眠やストレスが体調に影響している可能性があります。",whyImportant:"睡眠はホルモンバランスや食欲にも関わっています。",stumble:"疲れているほど糖質を欲しやすくなる傾向があります。",tips:"就寝前のスクリーンを減らす・深呼吸が参考になるかもしれません。"},
  { id:"health",      name:"健康コンディション", emoji:"🛡️", color:C.mint,  questionIds:[2,17,22], lowMessage:"疲れやすさや免疫コンディションにゆらぎがある傾向があります。",whyImportant:"健康の土台が整うと日々のパフォーマンスが変わります。",stumble:"疲れが抜けにくいとモチベーションが続きにくくなります。",tips:"規則正しい生活リズム・栄養バランスが参考になるかもしれません。"},
  { id:"appetite",    name:"食欲・糖質バランス", emoji:"🍬", color:C.coral, questionIds:[3,4,15,23], lowMessage:"糖質欲求や食欲の乱れが出やすい傾向があります。",whyImportant:"食欲の調節には腸内環境が深く関わっています。",stumble:"食欲が乱れると食事管理の継続が難しくなりがちです。",tips:"食物繊維を先に食べる・食後に歩くなどが参考になるかもしれません。"},
  { id:"personal",    name:"パーソナル理解度",   emoji:"🔍", color:C.blue,  questionIds:[21,23,24], lowMessage:"自分に合う腸活や食事がわからない傾向があります。",whyImportant:"自分の体を知ることでより効果的な選択ができます。",stumble:"合わない方法を続けると結果が出にくく諦めやすくなります。",tips:"食事日記で自分のパターンを知ることが近道かもしれません。"},
];

const SCORE_TYPES = [
  {min:85,max:100,charState:"great",    title:"内側コンディション良好タイプ",   desc:"内側のコンディションはかなり整っている傾向です。この状態を維持しながら深く知っていきましょう。"},
  {min:70,max:84, charState:"good",     title:"整いかけタイプ",               desc:"大きく崩れてはいないものの、いくつかのカテゴリにゆらぎが見られます。食事を意識するだけで変化を感じやすくなる可能性があります。"},
  {min:50,max:69, charState:"normal",   title:"ゆらぎ注意タイプ",             desc:"複数のカテゴリにゆらぎが出ています。まず食事から意識してみましょう。"},
  {min:30,max:49, charState:"tired",    title:"内側見直しタイプ",             desc:"複数の項目に不調のサインが出ている可能性があります。食事の質を見直すことから始めてみましょう。"},
  {min:0, max:29, charState:"exhausted",title:"おつかれ内側ケアタイプ",        desc:"多くの項目にゆらぎが出ています。まず食事の内容を少しずつ整えることから始めましょう。"},
];

const TOTAL_TYPES = [
  {id:"gut",   name:"腸内リズムゆらぎ型",       category:"gut",         emoji:"🌀"},
  {id:"diet",  name:"代謝ブレーキ型",           category:"diet",        emoji:"🔥"},
  {id:"beauty",name:"美容コンディション乱れ型",  category:"beauty",      emoji:"✨"},
  {id:"sleep", name:"睡眠ストレス影響型",        category:"sleep",       emoji:"🌙"},
  {id:"circ",  name:"巡り・むくみ型",           category:"circulation", emoji:"💧"},
  {id:"app",   name:"食欲コントロールゆらぎ型",  category:"appetite",    emoji:"🍬"},
  {id:"health",name:"健康コンディション見直し型", category:"health",      emoji:"🛡️"},
  {id:"pers",  name:"パーソナル最適化型",        category:"personal",    emoji:"🔍"},
];

// ── スコア計算 ────────────────────────────────────────────────────────────────
function calcTotal(ans){return Math.round((ans.reduce((s,a)=>s+(a??0),0)/120)*100);}
function calcCats(ans){return CATEGORIES.map(cat=>{const sc=cat.questionIds.map(qid=>ans[qid-1]??0);const max=cat.questionIds.length*5;return{...cat,score:Math.round((sc.reduce((a,b)=>a+b,0)/max)*100)};});}
function getLowest(cats){return [...cats].sort((a,b)=>a.score-b.score)[0];}
function getTotalType(cats){const lowestId=getLowest(cats).id;return TOTAL_TYPES.find(t=>t.category===lowestId)??TOTAL_TYPES[0];}
function getScoreType(total){return SCORE_TYPES.find(t=>total>=t.min&&total<=t.max)??SCORE_TYPES[4];}
function getEvoLv(foodScore,hasPmas){
  if(hasPmas&&foodScore>=90)return EVO[9];
  return EVO.slice(0,9).reverse().find(s=>foodScore>=s.minScore)??EVO[0];
}

// 食材テキストを解析してスコア計算
function analyzeFoodText(text) {
  if(!text.trim()) return { magoHits:[], badHits:[], point:50 };
  const lowerText = text.toLowerCase();
  const magoHits = [];
  const badHits  = [];
  let point = 50;

  Object.entries(MAGO_KEYWORDS).forEach(([key, data]) => {
    const hit = data.keywords.some(kw => lowerText.includes(kw.toLowerCase()));
    if(hit) { magoHits.push(data); point += data.point; }
  });
  BAD_KEYWORDS.forEach(bad => {
    const hit = bad.keywords.some(kw => lowerText.includes(kw.toLowerCase()));
    if(hit) { badHits.push(bad); point += bad.damage; }
  });
  return { magoHits, badHits, point: Math.max(0, Math.min(100, point)) };
}

// ── ちょーちゃん SVG ──────────────────────────────────────────────────────────
function ChoChan({ foodScore=50, diagScore=50, evoLv, size=140, shimmer=false }) {
  const [blink, setBlink]       = useState(false);
  const [wave, setWave]         = useState(0);
  const [waveDir, setWaveDir]   = useState(1);
  const [sparkF, setSparkF]     = useState(0);

  useEffect(()=>{
    let t; const doBlink=()=>{setBlink(true);setTimeout(()=>setBlink(false),140);t=setTimeout(doBlink,3000+Math.random()*2500);};
    t=setTimeout(doBlink,800+Math.random()*1500); return()=>clearTimeout(t);
  },[]);
  useEffect(()=>{
    const iv=setInterval(()=>setWave(p=>{const n=p+waveDir*10;if(n>38||n<-38)setWaveDir(d=>-d);return n;}),70);
    return()=>clearInterval(iv);
  },[waveDir]);
  useEffect(()=>{
    if(foodScore>=70||shimmer){const iv=setInterval(()=>setSparkF(f=>(f+1)%8),250);return()=>clearInterval(iv);}
  },[foodScore,shimmer]);

  const state = foodScore>=80?"great":foodScore>=55?"good":foodScore>=30?"normal":foodScore>=10?"tired":"exhausted";
  const color = evoLv?.color ?? C.mint;
  const bodyAnim = state==="great"?"cc-bounce":state==="good"?"cc-float":state==="normal"?"cc-sway":state==="tired"?"cc-tired":"cc-exhausted";
  const sparkPos = [[22,50],[172,46],[20,128],[176,122],[100,18],[152,138],[55,30],[145,30]];
  const showSpark = foodScore>=70||shimmer;
  const grayscale = state==="exhausted"?" grayscale(0.35)":"";

  const eyeType  = {great:"sparkle",good:"happy",normal:"wink",tired:"sleepy",exhausted:"dizzy"}[state];
  const mouthType= {great:"grin",good:"smile",normal:"neutral",tired:"frown",exhausted:"wavy"}[state];
  const accessory= {great:"crown",good:"star",normal:"leaf",tired:"none",exhausted:"none"}[state];

  return(
    <div style={{position:"relative",display:"inline-block"}}>
      {shimmer&&<div style={{position:"absolute",inset:-18,borderRadius:"50%",background:"rgba(255,215,0,0.2)",filter:"blur(18px)",animation:"aura-pulse 1s ease-in-out infinite"}}/>}
      {foodScore>=70&&!shimmer&&<div style={{position:"absolute",inset:-12,borderRadius:"50%",background:color+"22",filter:"blur(14px)",animation:"aura-pulse 2s ease-in-out infinite"}}/>}

      <svg viewBox="0 0 200 230" width={size} height={size*1.15}
        style={{position:"relative",zIndex:1,filter:`drop-shadow(0 8px 18px rgba(0,0,0,0.13))${grayscale}`,overflow:"visible"}}>

        {showSpark&&sparkPos.map((p,i)=>(sparkF===i||sparkF===(i+4)%8)&&<text key={i} x={p[0]} y={p[1]} fontSize="13" textAnchor="middle" opacity="0.85">✨</text>)}

        {/* 右手（振る） */}
        <g transform={`rotate(${wave},162,138)`}>
          <ellipse cx="162" cy="138" rx="17" ry="10" fill={color}/>
          <text x="162" y="132" fontSize="14" textAnchor="middle">👋</text>
        </g>
        <ellipse cx="38" cy="138" rx="17" ry="10" fill={color} transform="rotate(-25,38,138)"/>

        <g className={bodyAnim}>
          <ellipse cx="78" cy="193" rx="15" ry="9" fill={color} transform="rotate(-8,78,193)"/>
          <ellipse cx="122" cy="193" rx="15" ry="9" fill={color} transform="rotate(8,122,193)"/>
          <ellipse cx="100" cy="208" rx="55" ry="8" fill={color} opacity="0.2"/>
          <ellipse cx="100" cy="148" rx="58" ry="52" fill={color}/>
          <circle cx="100" cy="105" r="48" fill={color}/>
          <ellipse cx="82" cy="88" rx="12" ry="8" fill="white" opacity="0.2" transform="rotate(-20,82,88)"/>
          <ellipse cx="70" cy="118" rx="13" ry="9" fill="white" opacity={state==="exhausted"?"0.1":"0.28"}/>
          <ellipse cx="130" cy="118" rx="13" ry="9" fill="white" opacity={state==="exhausted"?"0.1":"0.28"}/>
          {(state==="tired"||state==="exhausted")&&<><text x="150" y="80" fontSize="16" opacity="0.7">💧</text><text x="54" y="88" fontSize="13" opacity="0.6">💧</text></>}

          {/* 目 */}
          {blink?(<><line x1="78" y1="101" x2="92" y2="101" stroke="white" strokeWidth="3.5" strokeLinecap="round"/><line x1="108" y1="101" x2="122" y2="101" stroke="white" strokeWidth="3.5" strokeLinecap="round"/></>):(
            <>
              {eyeType==="sparkle"&&<><circle cx="86" cy="101" r="8" fill="white"/><circle cx="114" cy="101" r="8" fill="white"/><text x="83" y="105" fontSize="10" textAnchor="middle" fill={color}>★</text><text x="111" y="105" fontSize="10" textAnchor="middle" fill={color}>★</text></>}
              {eyeType==="happy"&&<><path d="M79 101 Q86 93 93 101" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round"/><path d="M107 101 Q114 93 121 101" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round"/></>}
              {eyeType==="wink"&&<><path d="M79 101 Q86 93 93 101" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round"/><line x1="108" y1="99" x2="121" y2="99" stroke="white" strokeWidth="3.5" strokeLinecap="round"/></>}
              {eyeType==="sleepy"&&<><ellipse cx="86" cy="101" rx="8" ry="5.5" fill="white"/><line x1="78" y1="99" x2="94" y2="99" stroke={color} strokeWidth="3"/><ellipse cx="114" cy="101" rx="8" ry="5.5" fill="white"/><line x1="106" y1="99" x2="122" y2="99" stroke={color} strokeWidth="3"/></>}
              {eyeType==="dizzy"&&<><text x="80" y="107" fontSize="16" textAnchor="middle" fill="white">×</text><text x="120" y="107" fontSize="16" textAnchor="middle" fill="white">×</text></>}
            </>
          )}

          {/* 口 */}
          {mouthType==="grin"   &&<path d="M82 116 Q100 131 118 116" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>}
          {mouthType==="smile"  &&<path d="M85 118 Q100 129 115 118" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>}
          {mouthType==="neutral"&&<line x1="88" y1="120" x2="112" y2="120" stroke="white" strokeWidth="3" strokeLinecap="round"/>}
          {mouthType==="frown"  &&<path d="M88 122 Q100 115 112 122" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>}
          {mouthType==="wavy"   &&<path d="M83 120 Q90 114 97 120 Q104 126 111 120 Q118 114 117 120" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>}

          {accessory==="crown"&&<><polygon points="72,67 80,49 90,61 100,43 110,61 120,49 128,67" fill="#FFD700"/><rect x="72" y="64" width="56" height="8" rx="3" fill="#FFB700"/></>}
          {accessory==="star" &&<text x="100" y="56" fontSize="22" textAnchor="middle">⭐</text>}
          {accessory==="leaf" &&<text x="100" y="56" fontSize="22" textAnchor="middle">🌿</text>}
        </g>
      </svg>
      <style>{`
        .cc-bounce  {animation:cc-bounce 1s ease-in-out infinite;transform-origin:center bottom}
        .cc-float   {animation:cc-float 2.2s ease-in-out infinite}
        .cc-sway    {animation:cc-sway 2.8s ease-in-out infinite;transform-origin:center bottom}
        .cc-tired   {animation:cc-tired 2.5s ease-in-out infinite;transform-origin:center bottom}
        .cc-exhausted{animation:cc-exhausted 3s ease-in-out infinite;transform-origin:center bottom}
        @keyframes cc-bounce   {0%,100%{transform:translateY(0) scaleY(1)}45%{transform:translateY(-16px) scaleY(1.05)}90%{transform:translateY(2px) scaleY(0.96)}}
        @keyframes cc-float    {0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes cc-sway     {0%,100%{transform:rotate(0deg)}30%{transform:rotate(4deg)}70%{transform:rotate(-4deg)}}
        @keyframes cc-tired    {0%,100%{transform:rotate(0deg) translateY(0)}40%{transform:rotate(-7deg) translateY(4px)}80%{transform:rotate(3deg) translateY(2px)}}
        @keyframes cc-exhausted{0%,100%{transform:rotate(0deg) translateY(0)}50%{transform:rotate(-10deg) translateY(6px)}}
        @keyframes aura-pulse  {0%,100%{opacity:0.5;transform:scale(1)}50%{opacity:1;transform:scale(1.12)}}
      `}</style>
    </div>
  );
}

function Disclaimer(){return(<p style={{fontSize:11,color:C.muted,textAlign:"center",lineHeight:1.65,marginTop:20,padding:"12px 8px 0",borderTop:`1px solid ${C.border}`}}>このアプリは医療行為・医学的診断ではありません。結果は生活習慣や体感をもとにした参考情報です。気になる症状が続く場合は医療機関にご相談ください。</p>);}
function GaugeBar({score,color}){return(<div style={{background:C.border,borderRadius:99,height:10,overflow:"hidden",flex:1}}><div style={{width:`${score}%`,height:"100%",borderRadius:99,background:color,transition:"width 1.2s cubic-bezier(.34,1.2,.64,1)"}}/></div>);}

// ── メインアプリ ──────────────────────────────────────────────────────────────
export default function BeautyGutQuest() {
  // 画面管理
  const [screen, setScreen]   = useState("intro"); // intro|quiz|home|detail
  const [homeTab, setHomeTab] = useState(0);     // 0=ちょーちゃん 1=食事記録 2=図鑑

  // クイズ
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers]   = useState(Array(24).fill(null));
  const [selected, setSelected] = useState(null);
  const [animIn, setAnimIn]     = useState(true);

  // 食事記録（手入力）
  const [mealInput, setMealInput]     = useState("");
  const [mealLogs, setMealLogs]       = useState([]);   // [{time, text, analysis}]
  const [mealResult, setMealResult]   = useState(null);
  const [foodScore, setFoodScore]     = useState(50);

  // Amwayサプリ（隠し）
  const [showSupp, setShowSupp]     = useState(false);
  const [todaySupp, setTodaySupp]   = useState({});
  const [suppTap, setSuppTap]       = useState(0);

  // PMAS（裏ルート）
  const [hasPmas, setHasPmas]             = useState(false);
  const [pmasScore, setPmasScore]         = useState("");
  const [showPmasHidden, setShowPmasHidden] = useState(false);
  const [pmasTap, setPmasTap]             = useState(0);

  const [copied, setCopied] = useState(false);

  // 計算
  const totalScore = answers.every(a=>a!==null) ? calcTotal(answers) : 0;
  const catScores  = calcCats(answers.map(a=>a??0));
  const lowestCat  = getLowest(catScores);
  const totalType  = getTotalType(catScores);
  const scoreType  = getScoreType(totalScore);
  const evoLv      = getEvoLv(foodScore, hasPmas);
  const isNearEvo  = EVO.some(s=>foodScore>=s.minScore-8&&foodScore<s.minScore);

  // 食事スコア更新
  useEffect(()=>{
    let base=50;
    mealLogs.forEach(log=>{ base+=log.analysis.point-50; });
    AMWAY_SUPPS.forEach(s=>{ if(todaySupp[s.key]) base+=s.boost; });
    setFoodScore(Math.max(0,Math.min(100,base)));
  },[mealLogs,todaySupp]);

  const go=(to)=>{setAnimIn(false);setTimeout(()=>{setScreen(to);setAnimIn(true);window.scrollTo(0,0);},200);};

  // クイズ操作
  const handleNext=()=>{
    if(selected===null)return;
    const next=[...answers]; next[currentQ]=selected;
    setAnswers(next); setSelected(null);
    if(currentQ<QUESTIONS.length-1) setCurrentQ(currentQ+1);
    else go("home");
  };
  const handleBack=()=>{
    if(currentQ===0){return;} // 初回診断はQ1から戻れない
    setSelected(answers[currentQ-1]); setCurrentQ(currentQ-1);
  };

  // 食事追加
  const handleAddMeal=()=>{
    if(!mealInput.trim())return;
    const analysis=analyzeFoodText(mealInput);
    const now=new Date();
    const time=`${now.getHours()}:${String(now.getMinutes()).padStart(2,"0")}`;
    const newLog={time, text:mealInput, analysis};
    setMealLogs(prev=>[...prev,newLog]);
    setMealResult(analysis);
    setMealInput("");
  };

  // 隠しタップ（ちょーちゃん7回でPMAS出現）
  const handleCCTap=()=>{
    const next=pmasTap+1; setPmasTap(next);
    if(next>=7){setShowPmasHidden(true);setPmasTap(0);}
  };
  // サプリ隠しタップ
  const handleSuppTap=()=>{
    const next=suppTap+1; setSuppTap(next);
    if(next>=3){setShowSupp(true);setSuppTap(0);}
  };

  const handleCopy=()=>{
    const text=`Beauty Gut Quest\n診断スコア：${totalScore}点\nタイプ：${totalType.name}\nちょーちゃん：${evoLv.name}\n食事スコア：${foodScore}点\n#BeautyGutQuest #腸活 #ちょーちゃん`;
    navigator.clipboard.writeText(text).catch(()=>{}); setCopied(true); setTimeout(()=>setCopied(false),2000);
  };

  // スタイル
  const wrap={fontFamily:"'Hiragino Maru Gothic ProN','Noto Sans JP',sans-serif",minHeight:"100vh",background:`linear-gradient(160deg,${C.offwhite},${C.blueL} 50%,${C.lavL})`,display:"flex",flexDirection:"column",alignItems:"center",padding:"0 0 80px",overflowX:"hidden"};
  const cnt={width:"100%",maxWidth:440,padding:"0 16px",opacity:animIn?1:0,transform:animIn?"translateY(0)":"translateY(14px)",transition:"opacity 0.2s ease,transform 0.2s ease"};
  const card={background:C.white,borderRadius:20,padding:"16px 15px",boxShadow:"0 2px 16px rgba(59,130,246,0.08)",border:`1.5px solid ${C.border}`,width:"100%"};
  const btnP={width:"100%",padding:"14px 0",borderRadius:99,border:"none",background:`linear-gradient(135deg,${C.mint},${C.blue})`,color:C.white,fontSize:15,fontWeight:900,cursor:"pointer",boxShadow:"0 4px 16px rgba(59,130,246,0.25)",fontFamily:"inherit"};
  const btnS={width:"100%",padding:"12px 0",borderRadius:99,border:`1.5px solid ${C.border}`,background:C.white,color:C.navy,fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"inherit"};
  const btnBk={background:C.offwhite,border:"none",borderRadius:12,padding:"8px 14px",fontSize:13,color:C.blue,fontWeight:800,cursor:"pointer",fontFamily:"inherit"};

  // ── INTRO（初回のみ表示される診断前画面） ───────────────────────────────────
  if(screen==="intro") return(
    <div style={wrap}>
      <div style={cnt}>
        <div style={{textAlign:"center",paddingTop:40}}>
          {/* ロゴバッジ */}
          <div style={{display:"inline-block",background:`linear-gradient(135deg,${C.mint},${C.blue})`,borderRadius:99,padding:"5px 20px",fontSize:11,fontWeight:800,color:C.white,letterSpacing:"0.12em",marginBottom:24}}>
            Beauty Gut Quest
          </div>

          {/* ちょーちゃん */}
          <div style={{marginBottom:16}}>
            <ChoChan foodScore={75} evoLv={EVO[4]} size={140}/>
          </div>

          <h1 style={{fontSize:21,fontWeight:900,color:C.dark,lineHeight:1.5,marginBottom:8}}>
            腸内コンディション診断へ<br/>ようこそ！
          </h1>
          <p style={{fontSize:13,color:C.muted,lineHeight:1.8,marginBottom:24}}>
            食事でちょーちゃんを育てる<br/>腸活習慣化アプリです🌿
          </p>

          {/* 注意喚起カード */}
          <div style={{...card,background:`linear-gradient(135deg,${C.blueL},${C.lavL})`,border:`2px solid ${C.blueB}`,marginBottom:20,textAlign:"left"}}>
            <div style={{fontSize:13,fontWeight:900,color:C.blue,marginBottom:12,textAlign:"center"}}>
              ⚠️ 診断を始める前にご確認ください
            </div>
            {[
              {icon:"📋", text:"この診断は1回のみです。途中でやめると最初からになります。"},
              {icon:"⏱️", text:"24問・約3分かかります。時間に余裕があるときに始めてください。"},
              {icon:"💬", text:"今の自分の体の状態に正直に答えてください。素直な回答が正確な結果につながります。"},
              {icon:"🚫", text:"医療行為・医学的診断ではありません。あくまで生活習慣のセルフチェックです。"},
            ].map((item,i)=>(
              <div key={i} style={{display:"flex",gap:10,marginBottom:i<3?10:0,alignItems:"flex-start"}}>
                <span style={{fontSize:16,flexShrink:0}}>{item.icon}</span>
                <span style={{fontSize:12.5,color:C.navy,lineHeight:1.65}}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* スタートボタン */}
          <button onClick={()=>go("quiz")} style={{...btnP,fontSize:16,marginBottom:10}}>
            診断をスタートする ✨
          </button>

          <p style={{fontSize:11,color:C.muted,lineHeight:1.6}}>
            診断後はホーム画面から毎日の食事を記録できます。<br/>
            ちょーちゃんを育てながら腸活を楽しみましょう！
          </p>
        </div>
      </div>
    </div>
  );

  // ── QUIZ ─────────────────────────────────────────────────────────────────────
  if(screen==="quiz"){
    const q=QUESTIONS[currentQ];
    const progress=(currentQ/QUESTIONS.length)*100;
    const oc=[C.mint,C.blue,C.lav,C.coral];
    return(
      <div style={wrap}>
        <div style={cnt}>
          <div style={{paddingTop:20}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
              {currentQ===0
                ? <div style={{fontSize:13,fontWeight:800,color:C.blue,letterSpacing:"0.1em"}}>Beauty Gut Quest 🌿</div>
                : <button onClick={handleBack} style={btnBk}>← もどる</button>
              }
              <span style={{fontSize:13,fontWeight:700,color:C.muted}}>{currentQ+1} / {QUESTIONS.length}</span>
            </div>
            <div style={{background:C.border,borderRadius:99,height:6,marginBottom:20,overflow:"hidden"}}>
              <div style={{width:`${progress}%`,height:"100%",background:`linear-gradient(90deg,${C.mint},${C.blue})`,borderRadius:99,transition:"width 0.4s ease"}}/>
            </div>
            <div style={{...card,marginBottom:16,background:C.blueL,border:`1.5px solid ${C.blueB}`}}>
              <div style={{fontSize:10,color:C.blue,fontWeight:800,letterSpacing:"0.14em",marginBottom:8}}>Q{currentQ+1}</div>
              <p style={{fontSize:17,fontWeight:800,color:C.dark,lineHeight:1.55,margin:0}}>{q.text}</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
              {q.options.map((opt,i)=>{
                const isSel=selected===opt.score; const ac=oc[i];
                return(<button key={i} onClick={()=>setSelected(opt.score)} style={{padding:"14px 16px",borderRadius:16,border:"none",cursor:"pointer",background:isSel?ac:C.white,color:isSel?C.white:C.dark,fontSize:14,fontWeight:isSel?800:600,boxShadow:isSel?`0 4px 16px ${ac}55`:"0 1px 6px rgba(0,0,0,0.06)",border:isSel?"none":`1.5px solid ${C.border}`,textAlign:"left",transition:"all 0.15s",transform:isSel?"scale(1.02)":"scale(1)",display:"flex",alignItems:"center",gap:10,fontFamily:"inherit"}}>
                  <span style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:isSel?"rgba(255,255,255,0.25)":`${ac}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:isSel?C.white:ac}}>{isSel?"✓":["A","B","C","D"][i]}</span>
                  <span style={{lineHeight:1.5}}>{opt.label}</span>
                </button>);
              })}
            </div>
            <button onClick={handleNext} disabled={selected===null} style={{...btnP,background:selected!==null?`linear-gradient(135deg,${C.mint},${C.blue})`:C.border,color:selected!==null?C.white:C.muted,cursor:selected!==null?"pointer":"not-allowed",boxShadow:selected!==null?"0 4px 18px rgba(59,130,246,0.28)":"none"}}>
              {currentQ<QUESTIONS.length-1?"つぎへ →":"結果を見てホームへ ✨"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── HOME ─────────────────────────────────────────────────────────────────────
  if(screen==="home") return(
    <div style={wrap}>
      <div style={cnt}>
        <div style={{paddingTop:20}}>

          {/* ヘッダー */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <div>
              <div style={{fontSize:11,fontWeight:800,color:C.blue,letterSpacing:"0.1em"}}>Beauty Gut Quest</div>
              <div style={{fontSize:18,fontWeight:900,color:C.dark}}>{evoLv.name}</div>
            </div>
            {totalScore>0&&(
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:10,color:C.muted}}>診断スコア</div>
                <div style={{fontSize:26,fontWeight:900,color:C.dark,lineHeight:1}}>{totalScore}<span style={{fontSize:12,color:C.muted}}>点</span></div>
              </div>
            )}
          </div>

          {/* ちょーちゃんカード */}
          <div style={{...card,marginBottom:14,textAlign:"center",background:`linear-gradient(135deg,${C.mintL},${C.blueL})`}}>
            {isNearEvo&&<div style={{background:`linear-gradient(135deg,${C.gold}33,${C.amber}22)`,border:`1.5px solid ${C.gold}88`,borderRadius:10,padding:"7px 10px",marginBottom:10,fontSize:12,fontWeight:800,color:C.amber}}>✨ もうすぐ進化！もう少し！ ✨</div>}
            <div onClick={handleCCTap} style={{cursor:"pointer"}}>
              <ChoChan foodScore={foodScore} diagScore={totalScore} evoLv={evoLv} size={130} shimmer={isNearEvo||evoLv.lv===10}/>
            </div>
            <div style={{fontSize:12,color:C.muted,marginTop:6}}>
              {foodScore>=80?"🌟 絶好調！腸内環境バッチリ！":foodScore>=60?"😊 いい感じ！この調子で！":foodScore>=40?"😐 まご食材を取り入れてみよう":foodScore>=20?"😓 ちょーちゃんが元気をなくしてるかも…":"😰 腸に良い食事を心がけよう"}
            </div>

            {/* 食事スコアバー */}
            <div style={{marginTop:12}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:11,fontWeight:700,color:C.muted}}>今日の食事スコア</span>
                <span style={{fontSize:13,fontWeight:900,color:foodScore>=70?C.mint:foodScore>=40?C.amber:C.warn}}>{foodScore}点</span>
              </div>
              <GaugeBar score={foodScore} color={foodScore>=70?C.mint:foodScore>=40?C.amber:C.warn}/>
            </div>

            {/* 隠しPMAS */}
            {showPmasHidden&&(
              <div style={{marginTop:14,padding:"14px",background:C.lavL,borderRadius:14,border:`1.5px dashed ${C.lavB}`,textAlign:"left"}}>
                <div style={{fontSize:11,fontWeight:800,color:C.lav,marginBottom:8}}>🔬 最終進化コード入力</div>
                <input type="number" min="0" max="100" value={pmasScore} onChange={e=>setPmasScore(e.target.value)} placeholder="PMASスコアを入力"
                  style={{width:"100%",padding:"10px 12px",borderRadius:10,border:`1.5px solid ${C.lavB}`,fontSize:14,fontFamily:"inherit",outline:"none",background:C.white,marginBottom:8}}/>
                <button onClick={()=>{if(pmasScore!==""){setHasPmas(true);setShowPmasHidden(false);}}} style={{...btnP,background:`linear-gradient(135deg,${C.lav},${C.blue})`}}>
                  最終進化を解放する ✨
                </button>
              </div>
            )}
          </div>


          {/* タブ */}
          <div style={{display:"flex",background:C.offwhite,borderRadius:16,padding:4,gap:3,marginBottom:14,border:`1px solid ${C.border}`}}>
            {[
              {label:"🏠 ちょーちゃん",idx:0},
              {label:"🍱 食事記録",    idx:1},
              {label:"📖 図鑑",        idx:2},
            ].map(tab=>(
              <button key={tab.idx} onClick={()=>setHomeTab(tab.idx)} style={{flex:1,padding:"10px 4px",borderRadius:12,border:"none",cursor:"pointer",background:homeTab===tab.idx?C.white:"transparent",color:homeTab===tab.idx?C.blue:C.muted,fontSize:11.5,fontWeight:homeTab===tab.idx?800:600,boxShadow:homeTab===tab.idx?"0 1px 8px rgba(59,130,246,0.15)":"none",transition:"all 0.2s",fontFamily:"inherit"}}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── タブ0: ちょーちゃんの様子 ─────────────────────────────────── */}
          {homeTab===0&&(
            <>
              {/* タイプ・スコア */}
              {totalScore>0&&(
                <div style={{...card,marginBottom:12,background:C.lavL,border:`1.5px solid ${C.lavB}`}}>
                  <div style={{fontSize:10,fontWeight:800,color:C.lav,marginBottom:6}}>あなたのタイプ</div>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontSize:26}}>{totalType.emoji}</span>
                    <div>
                      <div style={{fontSize:15,fontWeight:900,color:C.dark}}>{totalType.name}</div>
                      <div style={{fontSize:11,color:C.muted}}>{scoreType.title}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* カテゴリスコア */}
              {totalScore>0&&(
                <div style={{...card,marginBottom:12}}>
                  <div style={{fontSize:13,fontWeight:800,color:C.dark,marginBottom:12}}>カテゴリ別スコア</div>
                  {catScores.map(cat=>(
                    <div key={cat.id} style={{marginBottom:10}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                        <span style={{fontSize:12,color:C.dark,fontWeight:600}}>{cat.emoji} {cat.name}</span>
                        <span style={{fontSize:12,fontWeight:800,color:cat.score>=70?C.mint:cat.score>=50?C.coral:C.warn}}>{cat.score}%</span>
                      </div>
                      <GaugeBar score={cat.score} color={cat.score>=70?C.mint:cat.score>=50?C.coral:C.warn}/>
                    </div>
                  ))}
                  <button onClick={()=>go("detail")} style={{...btnS,marginTop:8,fontSize:13}}>改善ポイントを詳しく見る →</button>
                </div>
              )}

              {/* 進化ロードマップ */}
              <div style={{...card,marginBottom:12}}>
                <div style={{fontSize:13,fontWeight:800,color:C.dark,marginBottom:12}}>🗺️ 進化ロードマップ</div>
                {EVO.map(stage=>{
                  const done=foodScore>=stage.minScore||(stage.lv===10&&hasPmas&&foodScore>=90);
                  const isCur=evoLv.lv===stage.lv;
                  return(
                    <div key={stage.lv} style={{display:"flex",alignItems:"center",gap:10,marginBottom:9,opacity:done?1:0.38}}>
                      <div style={{width:26,height:26,borderRadius:"50%",background:done?stage.color:C.border,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:900,color:C.white,flexShrink:0,boxShadow:isCur?`0 0 10px ${stage.color}`:"none"}}>
                        {done?"✓":stage.lv}
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:12,fontWeight:800,color:isCur?stage.color:C.dark}}>{stage.name}{isCur?" 👈 今ここ":""}</div>
                        <div style={{fontSize:10,color:C.muted}}>食事スコア {stage.minScore}点{stage.lv===10?" ＋特別条件":""}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{display:"flex",gap:8,marginBottom:12}}>
                <button onClick={()=>setHomeTab(1)} style={{...btnP,flex:1,fontSize:13}}>食事を記録する 🍱</button>
              </div>
              <button onClick={handleCopy} style={{...btnS,marginBottom:4,fontSize:13}}>{copied?"コピーしました ✅":"結果をコピーする 📋"}</button>
            </>
          )}

          {/* ── タブ1: 食事記録 ───────────────────────────────────────────── */}
          {homeTab===1&&(
            <>
              <div style={{...card,marginBottom:14}}>
                <div style={{fontSize:14,fontWeight:800,color:C.dark,marginBottom:8}}>🍱 今日の食事を入力</div>
                <p style={{fontSize:11,color:C.muted,marginBottom:12,lineHeight:1.65}}>
                  食べたものを自由に入力してください。<br/>
                  「まごはやさしい」の食材は自動で判定されます！
                </p>

                {/* 参考 */}
                <div style={{background:C.mintL,borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.mintB}`}}>
                  <div style={{fontSize:11,fontWeight:800,color:C.mint,marginBottom:6}}>🌿 まごはやさしい早見表</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {Object.values(MAGO_KEYWORDS).map(m=>(
                      <span key={m.label} style={{background:C.white,borderRadius:8,padding:"3px 8px",fontSize:11,fontWeight:700,color:C.mint,border:`1px solid ${C.mintB}`}}>
                        「{m.label}」{m.name}{m.emoji}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 入力フォーム */}
                <textarea value={mealInput} onChange={e=>setMealInput(e.target.value)}
                  placeholder="例：納豆ご飯、豆腐の味噌汁、サラダ、焼き魚、ヨーグルト"
                  rows={3}
                  style={{width:"100%",padding:"12px 14px",borderRadius:14,border:`1.5px solid ${C.border}`,fontSize:14,fontFamily:"inherit",outline:"none",background:C.offwhite,resize:"vertical",marginBottom:10}}
                  onKeyDown={e=>{ if(e.key==="Enter"&&e.metaKey) handleAddMeal(); }}
                />
                <button onClick={handleAddMeal} style={btnP}>
                  記録する 📝
                </button>

                {/* 判定結果表示 */}
                {mealResult&&(
                  <div style={{marginTop:12,padding:"12px 14px",background:mealResult.magoHits.length>0?C.mintL:"#FFF7ED",borderRadius:14,border:`1.5px solid ${mealResult.magoHits.length>0?C.mintB:C.coralB}`}}>
                    {mealResult.magoHits.length>0&&(
                      <div style={{marginBottom:8}}>
                        <div style={{fontSize:11,fontWeight:800,color:C.mint,marginBottom:5}}>✅ まごはやさしい検出！</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                          {mealResult.magoHits.map(h=>(
                            <span key={h.label} style={{background:C.white,borderRadius:8,padding:"3px 8px",fontSize:11,fontWeight:700,color:C.mint,border:`1px solid ${C.mintB}`}}>
                              「{h.label}」{h.name} {h.emoji} +{h.point}pt
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {mealResult.badHits.length>0&&(
                      <div style={{marginBottom:6}}>
                        <div style={{fontSize:11,fontWeight:800,color:C.warn,marginBottom:5}}>⚠️ 腸に注意な食材</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                          {mealResult.badHits.map(h=>(
                            <span key={h.key} style={{background:C.white,borderRadius:8,padding:"3px 8px",fontSize:11,fontWeight:700,color:C.warn,border:"1px solid #FECACA"}}>
                              {h.emoji} {h.label} {h.damage}pt
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {mealResult.magoHits.length===0&&mealResult.badHits.length===0&&(
                      <div style={{fontSize:12,color:C.muted}}>食材が判定されませんでした。もう少し具体的に書いてみてください。</div>
                    )}
                  </div>
                )}
              </div>

              {/* 今日の記録一覧 */}
              {mealLogs.length>0&&(
                <div style={{...card,marginBottom:14}}>
                  <div style={{fontSize:13,fontWeight:800,color:C.dark,marginBottom:10}}>📋 今日の記録</div>
                  {mealLogs.map((log,i)=>(
                    <div key={i} style={{marginBottom:10,paddingBottom:10,borderBottom:i<mealLogs.length-1?`1px solid ${C.border}`:"none"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                        <span style={{fontSize:11,color:C.muted}}>{log.time}</span>
                        <span style={{fontSize:11,fontWeight:800,color:log.analysis.magoHits.length>0?C.mint:C.muted}}>
                          {log.analysis.magoHits.length>0?`+${log.analysis.magoHits.reduce((s,h)=>s+h.point,0)}pt`:""}
                          {log.analysis.badHits.length>0?` ${log.analysis.badHits.reduce((s,h)=>s+h.damage,0)}pt`:""}
                        </span>
                      </div>
                      <div style={{fontSize:13,color:C.dark,fontWeight:600,marginBottom:4}}>{log.text}</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                        {log.analysis.magoHits.map(h=><span key={h.label} style={{fontSize:10,color:C.mint,background:C.mintL,borderRadius:6,padding:"2px 6px",fontWeight:700}}>{h.emoji}{h.name}</span>)}
                        {log.analysis.badHits.map(h=><span key={h.key} style={{fontSize:10,color:C.warn,background:"#FEF2F2",borderRadius:6,padding:"2px 6px",fontWeight:700}}>{h.emoji}{h.label}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 隠しサプリ（「…」3回タップ） */}
              <div style={{textAlign:"center",marginBottom:8}}>
                <button onClick={handleSuppTap} style={{background:"transparent",border:"none",cursor:"pointer",fontSize:10,color:"rgba(100,116,139,0.3)",fontFamily:"inherit"}}>…</button>
              </div>
              {showSupp&&(
                <div style={{...card,marginBottom:14,background:C.mintL,border:`1.5px dashed ${C.mintB}`}}>
                  <div style={{fontSize:12,fontWeight:800,color:C.mint,marginBottom:10}}>💊 今日のサプリ</div>
                  <div style={{display:"flex",flexDirection:"column",gap:8}}>
                    {AMWAY_SUPPS.map(s=>{
                      const checked=!!todaySupp[s.key];
                      return(
                        <button key={s.key} onClick={()=>setTodaySupp(prev=>({...prev,[s.key]:!prev[s.key]}))}
                          style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:12,border:"none",cursor:"pointer",background:checked?C.white:"#F0FDF4",border:checked?`1.5px solid ${C.mintB}`:`1px solid ${C.mintB}`,fontFamily:"inherit"}}>
                          <span style={{fontSize:18}}>{s.emoji}</span>
                          <span style={{fontSize:13,fontWeight:checked?800:600,color:checked?C.mint:C.dark,flex:1,textAlign:"left"}}>{s.label}</span>
                          <span style={{fontSize:11,color:checked?C.mint:C.muted,fontWeight:800}}>{checked?"✓ 記録済み":`+${s.boost}pt`}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── タブ2: 図鑑 ───────────────────────────────────────────────── */}
          {homeTab===2&&(
            <>
              <div style={{...card,marginBottom:14}}>
                <div style={{fontSize:13,fontWeight:800,color:C.dark,marginBottom:12}}>📖 ちょーちゃん図鑑</div>
                <p style={{fontSize:12,color:C.muted,marginBottom:14,lineHeight:1.65}}>食事スコアを上げてちょーちゃんを進化させると解放されます！</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  {EVO.map(stage=>{
                    const unlocked=foodScore>=stage.minScore||(stage.lv===10&&hasPmas&&foodScore>=90);
                    const isCur=evoLv.lv===stage.lv;
                    return(
                      <div key={stage.lv} style={{background:unlocked?stage.color+"18":"#F1F5F9",borderRadius:16,padding:"14px 10px",textAlign:"center",border:isCur?`2px solid ${stage.color}`:`1.5px solid ${unlocked?stage.color+"44":C.border}`}}>
                        {unlocked?(
                          <>
                            <ChoChan foodScore={stage.minScore+5} diagScore={70} evoLv={stage} size={70}/>
                            <div style={{fontSize:11,fontWeight:800,color:stage.color,marginTop:4}}>Lv.{stage.lv}</div>
                            <div style={{fontSize:10.5,fontWeight:700,color:C.dark,marginTop:2}}>{stage.name}</div>
                            {isCur&&<div style={{fontSize:9,color:stage.color,fontWeight:800,marginTop:3}}>← 今ここ</div>}
                          </>
                        ):(
                          <>
                            <div style={{width:70,height:70,borderRadius:"50%",background:"#E2E8F0",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>❓</div>
                            <div style={{fontSize:10,color:C.muted,marginTop:6}}>Lv.{stage.lv}</div>
                            <div style={{fontSize:9,color:C.muted,marginTop:2}}>食事{stage.minScore}pt～</div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* 底部ナビ */}
          <div style={{position:"fixed",bottom:0,left:0,right:0,background:C.white,borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"space-around",padding:"10px 0 20px",zIndex:100}}>
            <button onClick={()=>setHomeTab(0)} style={{background:"none",border:"none",cursor:"pointer",fontSize:11,color:homeTab===0?C.mint:C.muted,fontFamily:"inherit",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
              <span style={{fontSize:24}}>🐣</span>ちょーちゃん
            </button>
            <button onClick={()=>setHomeTab(1)} style={{background:"none",border:"none",cursor:"pointer",fontSize:11,color:homeTab===1?C.blue:C.muted,fontFamily:"inherit",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
              <span style={{fontSize:24}}>🍱</span>食事記録
            </button>
            <button onClick={()=>setHomeTab(2)} style={{background:"none",border:"none",cursor:"pointer",fontSize:11,color:homeTab===2?C.lav:C.muted,fontFamily:"inherit",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
              <span style={{fontSize:24}}>📖</span>図鑑
            </button>
          </div>

          <div style={{height:16}}/>
          <Disclaimer/>
        </div>
      </div>
    </div>
  );

  // ── DETAIL ───────────────────────────────────────────────────────────────────
  if(screen==="detail") return(
    <div style={wrap}>
      <div style={cnt}>
        <div style={{paddingTop:20}}>
          <button onClick={()=>go("home")} style={{...btnBk,marginBottom:18}}>← ホームに戻る</button>
          <div style={{...card,background:C.blueL,border:`2px solid ${C.blueB}`,marginBottom:14}}>
            <div style={{fontSize:10,fontWeight:800,color:C.blue,letterSpacing:"0.14em",marginBottom:6}}>最優先見直しポイント</div>
            <div style={{fontSize:28,marginBottom:4}}>{lowestCat.emoji}</div>
            <div style={{fontSize:18,fontWeight:900,color:C.dark,marginBottom:10}}>{lowestCat.name}</div>
            <p style={{fontSize:13,color:C.navy,lineHeight:1.8,margin:0}}>{lowestCat.lowMessage}</p>
          </div>
          {[
            {icon:"💡",title:"なぜそこが大事なの？",text:lowestCat.whyImportant},
            {icon:"😓",title:"つまずきやすい理由",  text:lowestCat.stumble},
            {icon:"🌿",title:"日常で意識できること（参考）",text:lowestCat.tips},
          ].map(item=>(
            <div key={item.title} style={{...card,marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span style={{fontSize:20}}>{item.icon}</span>
                <span style={{fontSize:13,fontWeight:800,color:C.dark}}>{item.title}</span>
              </div>
              <p style={{fontSize:13,color:C.muted,lineHeight:1.8,margin:0}}>{item.text}</p>
            </div>
          ))}
          <button onClick={()=>go("home")} style={{...btnP,marginBottom:10}}>ホームに戻る 🏠</button>
          <Disclaimer/>
        </div>
      </div>
    </div>
  );

  return null;
}
