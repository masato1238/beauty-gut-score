const { createCanvas } = require('canvas');
const fs = require('fs');

const size = 512;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext('2d');

// 背景（ピンクグラデーション）
const grad = ctx.createLinearGradient(0, 0, size, size);
grad.addColorStop(0, '#FF6B9D');
grad.addColorStop(1, '#FF9F43');
ctx.fillStyle = grad;
ctx.roundRect(0, 0, size, size, 80);
ctx.fill();

// ちょーちゃんの体
ctx.fillStyle = '#FFB7D5';
ctx.beginPath();
ctx.ellipse(256, 300, 120, 110, 0, 0, Math.PI * 2);
ctx.fill();

// 顔
ctx.fillStyle = '#FF8EB5';
ctx.beginPath();
ctx.ellipse(256, 220, 95, 95, 0, 0, Math.PI * 2);
ctx.fill();

// 目（ハッピー）
ctx.strokeStyle = '#FF5C98';
ctx.lineWidth = 7;
ctx.lineCap = 'round';
ctx.beginPath();
ctx.arc(226, 210, 16, Math.PI * 0.1, Math.PI * 0.9);
ctx.stroke();
ctx.beginPath();
ctx.arc(286, 210, 16, Math.PI * 0.1, Math.PI * 0.9);
ctx.stroke();

// 口
ctx.beginPath();
ctx.arc(256, 240, 22, 0, Math.PI);
ctx.stroke();

// ほっぺ
ctx.fillStyle = '#FFD6E8';
ctx.globalAlpha = 0.7;
ctx.beginPath();
ctx.ellipse(200, 235, 22, 15, 0, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.ellipse(312, 235, 22, 15, 0, 0, Math.PI * 2);
ctx.fill();
ctx.globalAlpha = 1;

// スパークル
ctx.fillStyle = '#FFD700';
ctx.font = 'bold 48px serif';
ctx.fillText('✨', 60, 120);
ctx.font = 'bold 36px serif';
ctx.fillText('⭐', 380, 90);

// テキスト「Beauty Gut Score」
ctx.fillStyle = 'white';
ctx.font = 'bold 38px sans-serif';
ctx.textAlign = 'center';
ctx.fillText('Beauty Gut', 256, 400);
ctx.font = 'bold 38px sans-serif';
ctx.fillText('Score', 256, 448);

fs.writeFileSync('./public/icon.png', canvas.toBuffer('image/png'));
fs.writeFileSync('./public/apple-icon.png', canvas.toBuffer('image/png'));
console.log('アイコン生成完了！');
