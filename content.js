// content.js
// 4カテゴリのコンテンツデータ
// カテゴリ: history / philosophy / sky_fact / haiku

// =====================
// 今日のできごと（過去の歴史的出来事）
// =====================
window.HISTORY_EVENTS = [
  { text: '1969年、アポロ11号が月面着陸。アームストロング船長が人類初の月面歩行を行った。', en: null },
  { text: '1903年、ライト兄弟が人類初の動力飛行に成功。その飛行時間はわずか12秒だった。', en: null },
  { text: '1543年、コペルニクスが「天球の回転について」を出版。地球が太陽の周りを回ることを示した。', en: null },
  { text: '1990年、ハッブル宇宙望遠鏡が打ち上げられた。以来、宇宙の深淵を人類に届け続けている。', en: null },
  { text: '1957年、ソ連がスプートニク1号を打ち上げ。人類初の人工衛星が地球を周回し始めた。', en: null },
  { text: '1961年、ガガーリンが「地球は青かった」と言いながら宇宙から帰還。人類初の有人宇宙飛行。', en: null },
  { text: '1054年、超新星爆発が記録された。その残骸が現在の「かに星雲」として今も広がり続けている。', en: null },
  { text: '1687年、ニュートンが「プリンキピア」を出版。重力の法則が初めて数学的に記述された。', en: null },
  { text: '1889年、エッフェル塔が完成。当初は「醜い鉄の怪物」と批判されたが、今やパリの象徴となった。', en: null },
  { text: '2004年、探査機スピリットが火星に着陸。赤い惑星の土を初めてじかに調べた。', en: null },
  { text: '1912年、タイタニック号が沈没。満天の星空の下、北大西洋に消えた。', en: null },
  { text: '1522年、マゼランの船団が世界一周を完成。地球が丸いことを航海で証明した。', en: null },
  { text: '1865年、リンカーン大統領が暗殺された夜、ワシントンの空は曇っていたと記録されている。', en: null },
  { text: '1977年、ボイジャー1号が打ち上げられた。現在も太陽系の外を航行し続けている人類の使者。', en: null },
  { text: '2020年、ISSで「夜明けの地球」が撮影された。一枚の写真に大気の薄さと地球の美しさが写し出された。', en: null },
];

// =====================
// 哲学の言葉
// =====================
window.PHILOSOPHY_QUOTES = [
  {
    text: 'The sky is the daily bread of the eyes.',
    translation: '空は、目にとっての毎日の糧である。',
    author: 'Ralph Waldo Emerson',
  },
  {
    text: 'Look up at the stars and not down at your feet.',
    translation: '足元ではなく、星を見上げなさい。',
    author: 'Stephen Hawking',
  },
  {
    text: 'Be still. Stillness reveals the secrets of eternity.',
    translation: '静かにあれ。静けさが、永遠の秘密を明かす。',
    author: 'Lao Tzu',
  },
  {
    text: 'Wonder is the beginning of wisdom.',
    translation: '驚きは、知恵の始まりである。',
    author: 'Socrates',
  },
  {
    text: 'The most beautiful things in the world cannot be seen or touched — they are felt with the heart.',
    translation: '世界でもっとも美しいものは、目で見ることも手で触れることもできない——それは心で感じるものだ。',
    author: 'Antoine de Saint-Exupéry',
  },
  {
    text: 'Dwell on the beauty of life. Watch the stars, and see yourself running with them.',
    translation: '生の美しさに心を向けよ。星を見つめ、その星とともに走る自分を見よ。',
    author: 'Marcus Aurelius',
  },
  {
    text: 'There is no blue without yellow and without orange.',
    translation: '黄色もオレンジもなければ、青もない。',
    author: 'Vincent van Gogh',
  },
  {
    text: 'To see a world in a grain of sand, and a heaven in a wild flower.',
    translation: '一粒の砂に世界を見、一輪の野の花に天国を見る。',
    author: 'William Blake',
  },
  {
    text: 'In every walk with nature, one receives far more than he seeks.',
    translation: '自然の中を歩くとき、人は求める以上のものを受け取る。',
    author: 'John Muir',
  },
  {
    text: '空は境界を知らない。ただ、果てしなく広がるだけだ。',
    translation: null,
    author: '宮沢賢治',
  },
  {
    text: '夕焼けを見るとき、人は誰でも詩人になる。',
    translation: null,
    author: 'オクタビオ・パス',
  },
  {
    text: 'Every sunset is an opportunity to reset.',
    translation: 'すべての夕焼けは、リセットの機会だ。',
    author: 'Richie Norton',
  },
  {
    text: 'Those who contemplate the beauty of the earth find reserves of strength that will endure as long as life lasts.',
    translation: '地球の美しさを深く見つめる者は、生きる限り続く力の源泉を見つける。',
    author: 'Rachel Carson',
  },
];

// =====================
// 空の豆知識
// =====================
window.SKY_FACTS = [
  {
    text: 'Blue hour occurs twice a day — just before sunrise and just after sunset, when the sun sits just below the horizon.',
    translation: 'ブルーアワーは1日に2回訪れる——日の出直前と日没直後、太陽が地平線のすぐ下にある時間帯だ。',
  },
  {
    text: 'The word "twilight" comes from Old English meaning "between" — the time suspended between day and night.',
    translation: 'トワイライトは「あいだ」を意味する古英語に由来する——昼と夜のあいだに宙吊りになった時間だ。',
  },
  {
    text: 'Sky blue has its own name in Japanese: sorairo. It is lighter and softer than the color of the ocean.',
    translation: '日本語では空の青さを「空色（そらいろ）」と呼ぶ。海の色より明るく、やわらかい。',
  },
  {
    text: 'During blue hour, sunlight travels through a longer path of atmosphere, filtering out warm tones and leaving only blue.',
    translation: 'ブルーアワーでは太陽光が大気の中を長い距離移動し、暖色が取り除かれて青だけが残る。',
  },
  {
    text: 'Ancient Egyptians called the sky "Nut" — the goddess who swallowed the sun each evening and gave birth to it each morning.',
    translation: '古代エジプト人は空を「ヌット」と呼んだ——毎晩太陽を飲み込み、毎朝産み直す女神の名だ。',
  },
  {
    text: 'The green flash is a rare optical phenomenon — a brief green light visible just as the sun dips below the horizon.',
    translation: 'グリーンフラッシュは稀な大気光学現象——太陽が地平線に沈む瞬間、一瞬だけ緑色の光が見える。',
  },
  {
    text: 'Photographers call the 20 minutes after sunset "magic hour." The light is soft, diffuse, and impossible to replicate artificially.',
    translation: '写真家たちは日没後の20分をマジックアワーと呼ぶ。光はやわらかく拡散し、人工的に再現できない。',
  },
  {
    text: 'The ISS passes through 16 sunrises and 16 sunsets every single day — once every 90 minutes.',
    translation: 'ISSは毎日16回の日の出と16回の日没を体験する——90分ごとに1周する軌道のためだ。',
  },
  {
    text: 'Alpenglow is the reddish glow seen on mountains at dusk — caused by light reflecting back from the atmosphere, not the sun directly.',
    translation: 'アルペングローは夕暮れに山が赤く染まる現象——大気からの反射によって生まれる。',
  },
  {
    text: '朝焼けの赤みは、太陽光が大気中の長い距離を通過する際、青い光が散乱されてしまうために生まれる。',
    translation: null,
  },
  {
    text: 'ブルーアワーはフランス語のlheure bleueが語源。パリの香水や詩に影響を与えてきた時間帯の名前。',
    translation: null,
  },
  {
    text: 'A single cubic meter of air contains around 25 billion billion molecules — each one scattering light to paint the sky.',
    translation: '空気1立方メートルの中には約250京個の分子が含まれている——それぞれが光を散乱させ、空の色を描いている。',
  },
  {
    text: 'The sky appears darker blue at the zenith (directly overhead) and lighter near the horizon — an effect called the sky gradient.',
    translation: '空は真上が最も深い青で、地平線に近づくにつれて薄くなる——これを「スカイグラデーション」と呼ぶ。',
  },
];

// =====================
// 俳句
// =====================
window.HAIKU_LIST = [
  { text: '春の夜や\nぼんやりとした月と\n霞む空', author: '松尾芭蕉' },
  { text: '菜の花や\n月は東に\n日は西に', author: '与謝蕪村' },
  { text: '夕焼けや\n雲のかたちも\n旅をゆく', author: 'anonymous' },
  { text: '秋の空\n高く澄みたる\n旅の果て', author: 'anonymous' },
  { text: '夏の朝\n光の粒が\n海を染む', author: 'anonymous' },
  { text: '初日の出\n空の彼方に\n橙色', author: 'anonymous' },
  { text: '冬の月\n雲間に消えて\nまた現れ', author: 'anonymous' },
  { text: '朝焼けに\n鳥の影ひとつ\n空を切る', author: 'anonymous' },
  { text: '夕暮れに\n誰かと見上げた\n同じ空', author: 'anonymous' },
  { text: '青き空\n終わりなき旅の\nはじまりに', author: 'anonymous' },
];

// =====================
// 日付シード付き選択
// 同じ日は同じ言葉が出る
// =====================
window.getTodayContent = function () {
  var now = new Date();
  // YYYYMMDD の数値をシードにする
  var seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();

  // シード付き疑似乱数（LCG）
  function seededRand(s) {
    var x = Math.sin(s + 1) * 10000;
    return x - Math.floor(x);
  }

  var categories = ['history', 'philosophy', 'sky_fact', 'haiku'];
  // 4カテゴリを日付で順番に回す（4日周期で全カテゴリ網羅）
  var catIndex = (seed % 4);
  var category = categories[catIndex];

  var pool, item, result;

  if (category === 'history') {
    pool = window.HISTORY_EVENTS;
    item = pool[Math.floor(seededRand(seed) * pool.length)];
    result = {
      category: 'history',
      label: '今日のできごと',
      mainText: item.text,
      subText: null,
      author: null,
    };
  } else if (category === 'philosophy') {
    pool = window.PHILOSOPHY_QUOTES;
    item = pool[Math.floor(seededRand(seed) * pool.length)];
    result = {
      category: 'philosophy',
      label: '哲学の言葉',
      mainText: item.text,
      subText: item.translation || null,
      author: item.author || null,
    };
  } else if (category === 'sky_fact') {
    pool = window.SKY_FACTS;
    item = pool[Math.floor(seededRand(seed) * pool.length)];
    result = {
      category: 'sky_fact',
      label: '空の豆知識',
      mainText: item.text,
      subText: item.translation || null,
      author: null,
    };
  } else {
    pool = window.HAIKU_LIST;
    item = pool[Math.floor(seededRand(seed) * pool.length)];
    result = {
      category: 'haiku',
      label: '空の俳句',
      mainText: item.text,
      subText: null,
      author: item.author || null,
    };
  }

  return result;
};