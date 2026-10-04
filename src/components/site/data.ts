export const WA_NUMBER = "905493400053";
export const waLink = (text?: string) =>
  `https://wa.me/${WA_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
export const INSTAGRAM = "https://www.instagram.com/gorillabstudio/";

export const NAV = [
  { href: "#dersler", label: "Dersler" },
  { href: "#nasil-calisir", label: "Nasıl Çalışır" },
  { href: "#egitmenler", label: "Eğitmenler" },
  { href: "#sss", label: "SSS" },
  { href: "#iletisim", label: "İletişim" },
];

export const QUIZ = [
  { key: "blocker", q: "Şu an seni en çok ne durduruyor?", opts: ["Motivasyonum yok", "Nereden başlayacağımı bilmiyorum", "Büyük salonlarda kayboluyorum", "Bedenimle barışık değilim"] },
  { key: "discipline", q: "Hangi branş ilgini çekiyor?", opts: ["Boks", "Kickboks", "Muay Thai", "Reformer Pilates", "Henüz bilmiyorum"] },
  { key: "days", q: "Haftada kaç gün ayırabilirsin?", opts: ["1–2 gün", "3 gün", "4+ gün"] },
] as const;

export const DERSLER = [
  { t: "Boks", d: "Önce bandaj, sonra teknik. Doğru korunma doğru vuruştan önce gelir.", img: "eğitmen bandaj sarıyor, yakın plan" },
  { t: "Kickboks", d: "Ringde öğrendiğin şey sadece tekme değil, zor anda kontrolü ele almak.", img: "ring iplerinin arasından tekme anı" },
  { t: "Muay Thai", d: "Sekiz uzuvlu bilim. Yumruk, tekme, dirsek ve diz, her biri doğru açıyla.", img: "pao'ya diz vuruşu, ter ve doğal ışık" },
  { t: "Reformer Pilates", d: "Yayın direnci hareketin her anında değişir. Derin kaslar bunu hisseder.", img: "reformer yayları, yakın plan" },
];

export const ADIMLAR = [
  { n: "01", t: "Ücretsiz deneme dersi", d: "Gel, eğitmeninle tanış, ringe çık. Kıyafet krizi yaşama, üstündekiyle gel." },
  { n: "02", t: "Sana özel plan", d: "Hedefini, geçmiş sakatlıklarını ve programını konuşuruz. Plan buna göre kurulur." },
  { n: "03", t: "Birebir ders", d: "Her ders sadece seninle. Grup yok, sıra yok, bekleyen makine yok." },
];

export const EGITMENLER = ["Yiğit", "Anıl", "Doğukan"];

export const SSS = [
  { q: "Hiç spor geçmişim yok, başlayabilir miyim?", a: "Evet. Dersler birebir olduğu için tempo tamamen sana göre ayarlanır." },
  { q: "Kadınlar için uygun mu?", a: "Üyelerimizin önemli bir kısmı kadın. Stüdyo temiz, eğitmenler saygılı ve ders birebir." },
  { q: "Deneme dersi gerçekten ücretsiz mi?", a: "Evet. Hiçbir ödeme veya taahhüt istemiyoruz." },
  { q: "Ekipman getirmem gerekiyor mu?", a: "Hayır. Eldiven ve bandaj stüdyoda var. Rahat bir kıyafet yeterli." },
  { q: "Ödeme nasıl yapılıyor?", a: "Aylık üyelik yok. Ders paketi alırsın, kullandıkça düşer." },
  { q: "Sakatlığım var, yine de gelebilir miyim?", a: "Eğitmenine anlat, programı buna göre kurarız. Gerekirse önce doktorunla konuşmanı isteriz." },
];

export const GALERI = [
  "ring ipleri, sabah ışığı",
  "ağır torbalar sırada",
  "terli eldivenler bankta",
  "eğitmen ve üye, pao çalışması",
  "reformer stüdyosu, geniş açı",
  "bandajlı eller, siyah beyaz",
  "ring köşesi, havlu ve su",
];
