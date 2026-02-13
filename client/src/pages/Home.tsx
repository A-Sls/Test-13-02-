import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, Variants } from "framer-motion";
import { Shuffle, RotateCcw, BookOpen, X, ChevronRight, ChevronLeft } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { FallingWheat } from "@/components/FallingWheat";
import { WavingGrass } from "@/components/WavingGrass";
import { DriftingClouds } from "@/components/DriftingClouds";
import { OliveBranch } from "@/components/OliveBranch";
import { WheatBorder } from "@/components/WheatBorder";
import { TatreezMotif } from "@/components/TatreezMotif";
import { BackgroundAudio } from "@/components/BackgroundAudio";

const verses = [
  "علَى هَذِهِ الأَرْض مَا يَسْتَحِقُّ الحَياةْ: تَرَدُّدُ إبريلَ، رَائِحَةُ الخُبْزِ فِي",
  "الفجْرِ، آراءُ امْرأَةٍ فِي الرِّجالِ، كِتَابَاتُ أَسْخِيْلِيوس، أوَّلُ الحُبِّ، عشبٌ",
  "عَلَى حجرٍ، أُمَّهاتٌ تَقِفْنَ عَلَى خَيْطِ نايٍ، وخوفُ الغُزَاةِ مِنَ الذِّكْرياتْ.",
  "عَلَى هَذِهِ الأرْض ما يَسْتَحِقُّ الحَيَاةْ: نِهَايَةُ أَيلُولَ، سَيِّدَةٌ تترُكُ",
  "الأَرْبَعِينَ بِكَامِلِ مشْمِشِهَا، ساعَةُ الشَّمْسِ فِي السَّجْنِ، غَيْمٌ يُقَلِّدُ سِرْباً مِنَ",
  "الكَائِنَاتِ، هُتَافَاتُ شَعْبٍ لِمَنْ يَصْعَدُونَ إلى حَتْفِهِمْ بَاسِمينَ، وَخَوْفُ الطُّغَاةِ مِنَ الأُغْنِيَاتْ.",
  "عَلَى هَذِهِ الأرْضِ مَا يَسْتَحِقُّ الحَيَاةْ: عَلَى هَذِهِ الأرضِ سَيَّدَةُ",
  "الأُرْضِ، أُمُّ البِدَايَاتِ أُمَّ النِّهَايَاتِ. كَانَتْ تُسَمَّى فِلِسْطِين. صَارَتْ تُسَمَّى",
  "فلسْطِين. سَيِّدَتي: أَستحِقُّ، لأنَّكِ سيِّدَتِي، أَسْتَحِقُّ الحَيَاةْ."
];

const symboles: Record<string, { couleur: string; emoji: string; explication: string; tailwindColor: string }> = {
  "الأَرْض": {
    couleur: "#2c3e50",
    emoji: "🖤",
    tailwindColor: "text-slate-400",
    explication: "الأَرْض: رمز الوطن الفلسطيني، الأرض المقدسة والذاكرة الجماعية. عند درويش، هي الارتباط الوجودي في مواجهة المنفى."
  },
  "الحَياةْ": {
    couleur: "#27ae60",
    emoji: "🟢",
    tailwindColor: "text-emerald",
    explication: "الحَياةْ: ما يستحق أن يُعاش. فعل مقاومة شعري ضد النسيان والموت السياسي."
  },
  "تَرَدُّدُ إبريلَ": {
    couleur: "#f39c12",
    emoji: "🌸",
    tailwindColor: "text-amber-400",
    explication: "تَرَدُّدُ إبريلَ: إبريل يرمز إلى الربيع والولادة الجديدة، لكن أيضًا إلى التردد. صورة الطبيعة المتذبذبة."
  },
  "رَائِحَةُ الخُبْزِ": {
    couleur: "#e8b76b",
    emoji: "🍞",
    tailwindColor: "text-gold",
    explication: "رَائِحَةُ الخُبْزِ فِي الفجْرِ: حسية الحياة اليومية، فعل التغذية والتوريث. الخبز كرابط بين الأجيال."
  },
  "الفجْرِ": {
    couleur: "#e74c3c",
    emoji: "🌅",
    tailwindColor: "text-ruby",
    explication: "الفجْرِ: لحظة العبور، الأمل الذي يولد كل يوم. الحد الفاصل بين الليل (القمع) والنور (الحرية)."
  },
  "آراءُ امْرأَةٍ": {
    couleur: "#c0392b",
    emoji: "👩",
    tailwindColor: "text-rose-400",
    explication: "آراءُ امْرأَةٍ فِي الرِّجالِ: صوت المرأة الذي يحكم وينتقد ويفكر. الاستقلالية الفكرية والتحرر."
  },
  "كِتَابَاتُ أَسْخِيْلِيوس": {
    couleur: "#9b59b6",
    emoji: "📖",
    tailwindColor: "text-purple-400",
    explication: "كِتَابَاتُ أَسْخِيْلِيوس: إشارة إلى المأساة اليونانية. درويش يتحاور مع الإنسانيين العالميين الكبار."
  },
  "أوَّلُ الحُبِّ": {
    couleur: "#e91e63",
    emoji: "💕",
    tailwindColor: "text-pink-400",
    explication: "أوَّلُ الحُبِّ: البراءة، العاطفة الأولية. نقيض رقيق للعنف التاريخي. الحب كتأكيد للحياة."
  },
  "عشبٌ عَلَى حجرٍ": {
    couleur: "#16a085",
    emoji: "🌿",
    tailwindColor: "text-teal-400",
    explication: "عشبٌ عَلَى حجرٍ: استعارة الصمود. الحياة الهشة التي تنمو على الصلب والمستحيل. رمز المثابرة."
  },
  "أُمَّهاتٌ": {
    couleur: "#d35400",
    emoji: "👵",
    tailwindColor: "text-orange-400",
    explication: "أُمَّهاتٌ تَقِفْنَ عَلَى خَيْطِ نايٍ: صورة سريالية. هشاشة قصوى لكن كرامة راسخة."
  },
  "نايٍ": {
    couleur: "#3498db",
    emoji: "🪈",
    tailwindColor: "text-sapphire",
    explication: "نايٍ: آلة الشعر العربي، الصوت الرقيق. توازن مستحيل بين الموسيقى والصلابة. جمال هش."
  },
  "خوفُ الغُزَاةِ": {
    couleur: "#2c3e50",
    emoji: "😨",
    tailwindColor: "text-slate-300",
    explication: "خوفُ الغُزَاةِ: انقلاب المنظور. ليس المستعمَرون من يخافون، بل المستعمِرون."
  },
  "الذِّكْرياتْ": {
    couleur: "#34495e",
    emoji: "📜",
    tailwindColor: "text-indigo-300",
    explication: "الذِّكْرياتْ: الذاكرة كسلاح سياسي أعلى. التاريخ والهوية التي لا يستطيع المحتلون تدميرها."
  },
  "نِهَايَةُ أَيلُولَ": {
    couleur: "#d68910",
    emoji: "🍂",
    tailwindColor: "text-amber-600",
    explication: "نِهَايَةُ أَيلُولَ: نهاية سبتمبر، رمز الخريف والنضج. الانتقال من الصيف إلى الخريف، من الشباب إلى الحكمة."
  },
  "الأَرْبَعِينَ": {
    couleur: "#8e44ad",
    emoji: "⏳",
    tailwindColor: "text-purple-500",
    explication: "الأَرْبَعِينَ: سن الأربعين، رمز النضج والحكمة. المرأة التي تترك هذا السن 'بكامل مشمشها' - بكامل جمالها وحيويتها."
  },
  "مشْمِش": {
    couleur: "#f39c12",
    emoji: "🍑",
    tailwindColor: "text-orange-400",
    explication: "مشْمِش: المشمش كرمز للنضج والحلاوة. استعارة للجمال الناضج والحياة المكتملة."
  },
  "السَّجْنِ": {
    couleur: "#2c3e50",
    emoji: "⛓️",
    tailwindColor: "text-slate-600",
    explication: "السَّجْنِ: رمز القمع والحبس. لكن حتى في السجن، هناك 'ساعة الشمس' - لحظة من الحرية والأمل."
  },
  "هُتَافَاتُ شَعْبٍ": {
    couleur: "#e74c3c",
    emoji: "📢",
    tailwindColor: "text-red-500",
    explication: "هُتَافَاتُ شَعْبٍ: صوت الجماهير، الثورة، المقاومة. الشعب الذي يهتف لمن يصعدون إلى حتفهم باسمين - الشهداء."
  },
  "الطُّغَاةِ": {
    couleur: "#34495e",
    emoji: "👑",
    tailwindColor: "text-slate-700",
    explication: "الطُّغَاةِ: الحكام الظالمون. خوفهم من الأغنيات - من الفن والثقافة والذاكرة الجماعية."
  },
  "الأَغْنِيَاتْ": {
    couleur: "#3498db",
    emoji: "🎵",
    tailwindColor: "text-blue-500",
    explication: "الأَغْنِيَاتْ: الأغاني كسلاح ثقافي. الفن الذي يخيف الطغاة لأنه يحفظ الذاكرة ويوحد الشعب."
  },
  "سَيَّدَةُ الأُرْضِ": {
    couleur: "#27ae60",
    emoji: "🌍",
    tailwindColor: "text-emerald-500",
    explication: "سَيَّدَةُ الأُرْضِ: فلسطين كأم الأرض، الأصل والمنبع. المكان المقدس الذي يحتوي كل البدايات والنهايات."
  },
  "أُمُّ البِدَايَاتِ": {
    couleur: "#f39c12",
    emoji: "🌅",
    tailwindColor: "text-amber-500",
    explication: "أُمُّ البِدَايَاتِ: فلسطين كمهد الحضارات والأديان. الأرض التي شهدت ولادة التاريخ والثقافة."
  },
  "أُمَّ النِّهَايَاتِ": {
    couleur: "#8e44ad",
    emoji: "🌙",
    tailwindColor: "text-purple-600",
    explication: "أُمَّ النِّهَايَاتِ: الأرض التي تحتضن كل شيء، من الميلاد إلى الموت. الدورة الأبدية للحياة."
  },
  "فِلِسْطِين": {
    couleur: "#e74c3c",
    emoji: "🇵🇸",
    tailwindColor: "text-red-600",
    explication: "فِلِسْطِين: الاسم الذي كان وسيبقى. رغم كل المحاولات لمحوه، يبقى الاسم شاهداً على الهوية والوجود."
  },
  "سيِّدَتِي": {
    couleur: "#c0392b",
    emoji: "👸",
    tailwindColor: "text-rose-600",
    explication: "سيِّدَتِي: مخاطبة فلسطين كسيدة. العلاقة الحميمة بين الشاعر والأرض، بين الإنسان والوطن."
  }
};



export default function Home() {

  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [showAllSymbols, setShowAllSymbols] = useState(false);

  // Parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
      mouseX.set(moveX);
      mouseY.set(moveY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const shellX = useTransform(mouseX, [-window.innerWidth / 2, window.innerWidth / 2], [-20, 20]);
  const shellY = useTransform(mouseY, [-window.innerHeight / 2, window.innerHeight / 2], [-20, 20]);
  const contentX = useTransform(mouseX, [-window.innerWidth / 2, window.innerWidth / 2], [10, -10]);
  const contentY = useTransform(mouseY, [-window.innerHeight / 2, window.innerHeight / 2], [10, -10]);

  // Generate falling elements
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const shellsCount = isMobile ? 8 : 20;

  const shells = Array.from({ length: shellsCount }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: `${2 + Math.random() * 3}s`,
    delay: `${Math.random() * 5}s`,
    opacity: 0.1 + Math.random() * 0.3
  }));

  const versesCount = isMobile ? 5 : 15;
  const fallingVerses = Array.from({ length: versesCount }).map((_, i) => {
    const verse = verses[Math.floor(Math.random() * verses.length)];
    const words = verse.split(' ');
    const fragment = words.slice(0, 2 + Math.floor(Math.random() * 3)).join(' ');
    const styles = ['fragment-1', 'fragment-2', 'fragment-3'];

    return {
      id: i,
      text: fragment,
      style: styles[Math.floor(Math.random() * styles.length)],
      left: `${Math.random() * 90}%`,
      duration: `${8 + Math.random() * 20}s`,
      delay: `${Math.random() * 15}s`
    };
  });

  const currentSymbol = selectedSymbol ? symboles[selectedSymbol] : null;
  const currentVerse = verses[currentVerseIndex];

  const nextVerse = () => {

    setCurrentVerseIndex((prev) => (prev + 1) % verses.length);
    setSelectedSymbol(null);
  };

  const prevVerse = () => {

    setCurrentVerseIndex((prev) => (prev - 1 + verses.length) % verses.length);
    setSelectedSymbol(null);
  };

  const randomVerse = () => {

    setCurrentVerseIndex(Math.floor(Math.random() * verses.length));
    setSelectedSymbol(null);
  };

  const handleSymbolClick = (symbol: string) => {
    if (symboles[symbol]) {

      setSelectedSymbol(symbol);
    }
  };

  const randomSymbol = () => {

    const keys = Object.keys(symboles);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    setSelectedSymbol(randomKey);
  };

  const reset = () => {

    setCurrentVerseIndex(0);
    setSelectedSymbol(null);
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 10,
      filter: "blur(8px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: "circOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      }
    }
  };

  const renderVerse = () => {
    const elements: React.ReactNode[] = [];
    let remaining = currentVerse;
    let keyIndex = 0;

    const processText = (text: string) => {
      return text.split(' ').map((word, i) => (
        <motion.span
          key={`word-${keyIndex++}`}
          variants={wordVariants}
          className="inline-block mx-1 text-foreground/90 transition-all duration-300 hover:text-shadow-glow"
        >
          {word}
        </motion.span>
      ));
    };

    while (remaining.length > 0) {
      let foundSymbol: string | null = null;
      let foundIndex = remaining.length;

      for (const symbol of Object.keys(symboles)) {
        const idx = remaining.indexOf(symbol);
        if (idx !== -1 && idx < foundIndex) {
          foundIndex = idx;
          foundSymbol = symbol;
        }
      }

      if (foundSymbol && foundIndex < remaining.length) {
        if (foundIndex > 0) {
          elements.push(...processText(remaining.slice(0, foundIndex)));
        }
        elements.push(
          <motion.span
            key={`symbol-${foundSymbol}-${keyIndex++}`}
            variants={wordVariants}
            whileHover={{
              scale: 1.1,
              textShadow: "0 0 20px rgba(212, 168, 71, 0.8)"
            }}
            animate={selectedSymbol === foundSymbol ? {
              scale: [1, 1.05, 1],
              textShadow: [
                "0 0 10px rgba(212, 168, 71, 0.4)",
                "0 0 20px rgba(212, 168, 71, 0.6)",
                "0 0 10px rgba(212, 168, 71, 0.4)"
              ]
            } : {}}
            transition={{
              duration: 2,
              repeat: selectedSymbol === foundSymbol ? Infinity : 0,
              ease: "easeInOut"
            }}
            className={`${symboles[foundSymbol].tailwindColor} inline-block mx-1 cursor-pointer hover:bg-white/10 px-1 rounded transition-all duration-300 ${selectedSymbol === foundSymbol ? 'bg-white/20 ring-2 ring-gold/50' : ''}`}
            onClick={() => handleSymbolClick(foundSymbol!)}
            data-testid={`symbol-${foundSymbol}`}
          >
            {foundSymbol}
          </motion.span>
        );
        remaining = remaining.slice(foundIndex + foundSymbol.length);
      } else {
        elements.push(...processText(remaining));
        break;
      }
    }

    return elements;
  };

  return (
    <div
      className="min-h-screen ornament-pattern transition-colors duration-700 relative overflow-hidden"
      dir="rtl"
    >
      <AnimatedBackground />
      <BackgroundAudio />
      <FallingWheat />
      <WavingGrass />
      <DriftingClouds />
      {/* Falling shells background */}
      <motion.div
        style={{ x: shellX, y: shellY, willChange: 'transform' }}
        className="absolute inset-0 pointer-events-none"
      >
        {shells.map(shell => (
          <div
            key={`shell-${shell.id}`}
            className="falling-shell"
            style={{
              left: shell.left,
              animationDuration: shell.duration,
              animationDelay: shell.delay,
              opacity: shell.opacity
            }}
          />
        ))}

        {fallingVerses.map(v => (
          <div
            key={`v-${v.id}`}
            className={`falling-verse ${v.style}`}
            style={{
              left: v.left,
              animationDuration: v.duration,
              animationDelay: v.delay
            }}
          >
            {v.text}
          </div>
        ))}
      </motion.div>

      <motion.div
        className="container mx-auto px-4 py-8 max-w-6xl relative z-10"
        style={{ x: contentX, y: contentY }}
      >
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h1 className="font-arabic text-4xl md:text-5xl text-gradient-gold mb-2 animate-pulse-gold" data-testid="title-poet">
            مَحْمُودْ دَرْوِيشْ
          </h1>
          <h2 className="font-arabic text-xl md:text-2xl text-muted-foreground" data-testid="title-poem">
            على هذه الأرض ما يستحق الحياة
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
        </motion.header>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-gold" />
              <h3 className="font-arabic-ui text-lg text-gold">📖 المقطع</h3>
            </div>
            <div className="oriental-border rounded-2xl bg-card/60 backdrop-blur-sm p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentVerseIndex}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-center min-h-[120px] flex items-center justify-center"
                >
                  <div
                    className="font-arabic text-3xl md:text-5xl leading-relaxed md:leading-loose text-shadow-glow text-hover-halo flex flex-wrap justify-center"
                    data-testid="verse-display"
                  >
                    {renderVerse()}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-2 mt-8">
                {verses.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.5 }}

                    onClick={() => setCurrentVerseIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentVerseIndex
                      ? "bg-gold w-6"
                      : "bg-muted hover:bg-muted-foreground"
                      }`}
                    data-testid={`verse-indicator-${index}`}
                  />
                ))}
              </div>

              <div className="flex justify-center gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(235, 235, 235, 0.1)" }}
                  whileTap={{ scale: 0.95 }}

                  onClick={prevVerse}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground font-arabic-ui text-sm transition-all duration-300"
                  data-testid="button-prev"
                >
                  البيت السابق
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(52, 152, 219, 0.4)" }}
                  whileTap={{ scale: 0.95 }}

                  onClick={nextVerse}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sapphire/80 hover:bg-sapphire text-white font-arabic-ui text-sm transition-all duration-300"
                  data-testid="button-next"
                >
                  <ChevronLeft className="w-4 h-4" />
                  البيت التالي
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🎨</span>
              <h3 className="font-arabic-ui text-lg text-gold">الرموز</h3>
            </div>
            <div
              className="oriental-border rounded-2xl backdrop-blur-sm p-6 transition-colors duration-500 min-h-[300px]"
              style={{ backgroundColor: currentSymbol ? `${currentSymbol.couleur}dd` : 'hsl(235 30% 12% / 0.6)' }}
            >
              <AnimatePresence mode="wait">
                {currentSymbol ? (
                  <motion.div
                    key={selectedSymbol}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <span className="text-5xl block mb-4" data-testid="symbol-emoji">{currentSymbol.emoji}</span>
                    <p className="font-arabic text-xl text-white mb-4" data-testid="symbol-word">{selectedSymbol}</p>
                    <p className="font-arabic text-sm text-white/90 leading-relaxed text-right" data-testid="symbol-explanation">
                      {currentSymbol.explication}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <span className="text-4xl block mb-4">✨</span>
                    <p className="font-arabic-ui text-muted-foreground">
                      اضغط على كلمة لاكتشاف معناها
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)" }}
            whileTap={{ scale: 0.95 }}

            onClick={randomVerse}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-accent hover:bg-accent/80 text-accent-foreground font-arabic-ui transition-all duration-300"
            data-testid="button-random-verse"
          >
            <Shuffle className="w-5 h-5" />
            🎲 بيت عشوائي
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(52, 152, 219, 0.4)" }}
            whileTap={{ scale: 0.95 }}

            onClick={randomSymbol}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-sapphire/80 hover:bg-sapphire text-white font-arabic-ui transition-all duration-300"
            data-testid="button-random-symbol"
          >
            <Shuffle className="w-5 h-5" />
            🎲 رمز عشوائي
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(220, 38, 38, 0.4)" }}
            whileTap={{ scale: 0.95 }}

            onClick={reset}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-ruby/80 hover:bg-ruby text-white font-arabic-ui transition-all duration-300"
            data-testid="button-reset"
          >
            <RotateCcw className="w-5 h-5" />
            🔄 البداية
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(147, 51, 234, 0.4)" }}
            whileTap={{ scale: 0.95 }}

            onClick={() => setShowAllSymbols(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-arabic-ui transition-all duration-300"
            data-testid="button-all-symbols"
          >
            <BookOpen className="w-5 h-5" />
            📚 كل الرموز
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {showAllSymbols && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowAllSymbols(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card oriental-border rounded-2xl max-w-4xl max-h-[80vh] overflow-y-auto p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-arabic text-2xl text-gold">📚 كل الرموز</h3>
                  <button
                    onClick={() => setShowAllSymbols(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    data-testid="button-close-modal"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(symboles).map(([symbol, info]) => (
                    <motion.div
                      key={symbol}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-xl cursor-pointer transition-all duration-300"
                      style={{ backgroundColor: `${info.couleur}40` }}
                      onClick={() => {
                        handleSymbolClick(symbol);
                        setShowAllSymbols(false);
                      }}
                      data-testid={`modal-symbol-${symbol}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{info.emoji}</span>
                        <div>
                          <p className="font-arabic text-lg" style={{ color: info.couleur }}>
                            {symbol}
                          </p>
                          <p className="font-arabic text-xs text-muted-foreground mt-1 line-clamp-2">
                            {info.explication.split(':')[1]?.trim() || info.explication}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <TatreezMotif />

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mb-4" />
          <p className="font-arabic text-muted-foreground text-sm">
            الأدب الرقمي - الشعر التفاعلي
          </p>
          <p className="font-arabic text-white text-sm mt-4" data-testid="credit">
            انجاز: علاء الدين سلاسي
          </p>
        </motion.footer>
      </motion.div >
    </div >
  );
}
