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

export const EGITMENLER = [
  {
    name: "Yiğit BİLİR",
    mainDiscipline: "Vücut geliştirme",
    disciplines: "Boks · Kickboks · Muay-thai",
    quote: "Benimle birlikte kendinin en iyi versiyonuna adımını at",
  },
  {
    name: "Anıl BİLİR",
    mainDiscipline: "Kickboks",
    disciplines: "Muay Thai · Boks · Fitness",
    quote: "Tecrübeyle güçlen, doğru antrenmanla dönüş",
  },
  {
    name: "Nazlıcan BELTAN",
    mainDiscipline: "Reformer Pilates",
    disciplines: "",
    quote: "Bir saatini kendine ayır, bedenin ve ruhun teşekkür etsin!",
  },
  {
    name: "İremnur ŞENSOY",
    mainDiscipline: "Fitness",
    disciplines: "",
    quote: "Sağlıklı bir vücut, kendine verdiğin en değerli yatırımdır.",
  },
];

export const SSS = [
  { q: "Hiç spor geçmişim yok, başlayabilir miyim?", a: "Evet. Dersler birebir olduğu için tempo tamamen sana göre ayarlanır." },
  { q: "Kadınlar için uygun mu?", a: "Üyelerimizin önemli bir kısmı kadın. Stüdyo temiz, eğitmenler saygılı ve ders birebir." },
  { q: "Deneme dersi gerçekten ücretsiz mi?", a: "Evet. Hiçbir ödeme veya taahhüt istemiyoruz." },
  { q: "Ekipman getirmem gerekiyor mu?", a: "Hayır. Eldiven ve bandaj stüdyoda var. Rahat bir kıyafet yeterli." },
  { q: "Ödeme nasıl yapılıyor?", a: "Aylık üyelik yok. Ders paketi alırsın, kullandıkça düşer." },
  { q: "Sakatlığım var, yine de gelebilir miyim?", a: "Eğitmenine anlat, programı buna göre kurarız. Gerekirse önce doktorunla konuşmanı isteriz." },
];

export const GOOGLE_RATING = "5.0";
export const GOOGLE_REVIEW_COUNT = 35;

export const YORUMLAR = [
  {
    name: "Funda Karabacak",
    text: "Yaklaşık 2 aydır Yiğit Hoca'dan kickbox dersi alıyorum ve çok memnunum. Hem fitness çalışıyoruz hem ringde pratik yapıyoruz; bu da kondisyonumu geliştirmeme çok fayda sağlıyor. Hoca kadrosu çok profesyonel ve ilgili, size kendinizi rahat hissettirmek için ellerinden geleni yapıyorlar. Ekipmanlar çok iyi durumda. Alan çok temiz ve düzenli. Bir kadın olarak kendinizi güvende ve iyi hissedebileceğiniz bir spor salonu.",
  },
  {
    name: "Serkan",
    text: "Doğukan hocayla 6 ay boyunca ders aldım ve aldığım dersler sonucunda ciddi bir zayıflama formu geçirdim. Anıl hoca ve Yiğit hocanın da motivasyonu sayesinde istediğim kiloya fit bir şekilde girdim. Kesinlikle tavsiye edeceğim bir salon.",
  },
  {
    name: "Rahşan",
    text: "Güler yüzlü hocalar, ferah çalışma alanı. Ders ücretlerinde de makul. Tavsiye ederim.",
  },
  {
    name: "Cemal",
    text: "Profesyonel bir ekip, gelişiminize büyük katkıları olacak.",
  },
  {
    name: "Ece",
    text: "Konumu iyi ve donanımlı bir salon.",
  },
  {
    name: "Gülcan",
    text: "Hocalar ilgili, çok rahat spor yapabileceğiniz bir yer.",
  },
] as const;

export const GALLERY_VIEWER = {
  open: "Fotoğrafı büyüt",
  close: "Kapat",
  previous: "Önceki fotoğraf",
  next: "Sonraki fotoğraf",
};

export const GALERI = [
  "ring ipleri, Gorillab Fight Academy",
  "gorilla duvar resmi, ring ve makinalar",
  "dumbbell rafı",
  "koşu bandları",
  "reformer stüdyosu",
  "reformer makinaları",
  "giriş holü",
  "reformer stüdyosu, pencere ışığı",
  "terli eldivenler bankta",
  "boks dersi",
  "barfiks",
  "eğitmen ve üye, pao çalışması",
] as const;
