'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Zap, Heart, Target, Clock, MapPin, Phone } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Sticky Header Component with Infinite Horizontal Carousel
const StickyHeader = () => {
  const phrases = [
    '🔥 Elimina grasa localizada',
    '✨ Sin cirugía ni agujas',
    '💎 Resultados visibles desde la primera sesión',
    '⚡ Tecnología avanzada',
    '🎯 Moldea tu figura ideal',
    '💪 Sin dolor ni recuperación',
    '✅ Tratamiento personalizado',
    '🌟 Profesionales certificados',
    '$1,199',
    '$899 3 sesiones + 1 GRATIS'
  ];

  // Duplicate phrases for seamless infinite scroll
  const duplicatedPhrases = [...phrases, ...phrases, ...phrases, ...phrases, ...phrases];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-amber-500/20 text-white shadow-2xl shadow-amber-500/5 overflow-hidden"
    >
      <div className="relative h-14 flex items-center">
        <motion.div
          animate={{
            x: [0, -20 + '%']
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 60,
              ease: "linear"
            }
          }}
          className="flex gap-8 whitespace-nowrap"
        >
          {duplicatedPhrases.map((phrase, index) => {
            const gradients = [
              'from-amber-400 to-orange-500',
              'from-rose-400 to-pink-500',
              'from-purple-400 to-pink-500',
              'from-blue-400 to-cyan-500',
              'from-emerald-400 to-teal-500',
              'from-amber-300 to-amber-500',
              'from-violet-400 to-purple-500',
              'from-cyan-400 to-blue-500'
            ];
            const gradientClass = gradients[index % gradients.length];

            if (phrase === '$1,199') {
              return (
                <span
                  key={index}
                  className="text-sm md:text-base font-bold text-red-500 line-through px-4 ml-2"
                >
                  {phrase}
                </span>
              );
            }

            if (phrase.includes('$899')) {
              return (
                <span
                  key={index}
                  className="text-sm md:text-base font-bold text-white px-4 ml-2"
                >
                  <span className="text-emerald-500">$899</span> 3 sesiones + 1 GRATIS
                </span>
              );
            }

            return (
              <span
                key={index}
                className={`text-sm md:text-base font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent px-4 ml-2`}
              >
                {phrase}
              </span>
            );
          })}
        </motion.div>
      </div>
    </motion.header>
  );
};

// Confetti Component
const Confetti = () => {
  const confettiCount = 50;
  const confettiElements = Array.from({ length: confettiCount });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {confettiElements.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: '50%',
            y: '50%',
            opacity: 1,
            scale: 0
          }}
          animate={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: 0,
            scale: 1,
            rotate: Math.random() * 360
          }}
          transition={{
            duration: 1.5 + Math.random() * 1,
            ease: "easeOut",
            delay: Math.random() * 0.3
          }}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: ['#fbbf24', '#f59e0b', '#a855f7', '#ec4899', '#06b6d4'][Math.floor(Math.random() * 5)]
          }}
        />
      ))}
    </div>
  );
};

// Hero Section
const HeroSection = () => {
  const painPoint1Ref = useRef(null);
  const painPoint2Ref = useRef(null);
  const painPoint3Ref = useRef(null);
  const solutionCardRef = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Pain point 1 animation
    gsap.fromTo(
      painPoint1Ref.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: painPoint1Ref.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        }
      }
    );

    // Pain point 2 animation
    gsap.fromTo(
      painPoint2Ref.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: painPoint2Ref.current,
          start: 'top 75%',
          end: 'top 45%',
          scrub: 1,
        }
      }
    );

    // Pain point 3 animation
    gsap.fromTo(
      painPoint3Ref.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: painPoint3Ref.current,
          start: 'top 70%',
          end: 'top 40%',
          scrub: 1,
        }
      }
    );

    // Solution card animation with confetti
    gsap.fromTo(
      solutionCardRef.current,
      { opacity: 0, y: 100, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: solutionCardRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
          onEnter: () => setShowConfetti(true),
          onLeaveBack: () => setShowConfetti(false),
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-neutral-950 to-neutral-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-rose-500/10 to-transparent rounded-full blur-3xl"
        />
        {/* Grid overlay for modern tech look */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Modern Tagline */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border border-amber-500/30 backdrop-blur-xl">
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-2xl"
              >
                ⚡
              </motion.span>
              <span className="text-sm md:text-base font-bold bg-gradient-to-r from-amber-300 via-amber-200 to-rose-300 bg-clip-text text-transparent tracking-wide uppercase">
                Tecnología de vanguardia para eliminar grasa rebelde
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="text-6xl md:text-8xl mb-4">✨</div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-rose-400 bg-clip-text text-transparent">
              El cuerpo que siempre quisiste
            </span>
            <br />
            <span className="text-white text-4xl md:text-6xl lg:text-7xl">
              está a una sesión de distancia
            </span>
          </h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-3xl md:text-5xl font-bold text-neutral-200 mb-8"
          >
            La grasa que no se va…<br />
            <span className="text-amber-400">sí se puede quitar</span>
          </motion.h2>

          {/* GSAP Scroll-Triggered Pain Points */}
          <div className="mb-32 space-y-12 max-w-3xl mx-auto">
            <div
              ref={painPoint1Ref}
              className="bg-neutral-900/40 backdrop-blur-sm border border-neutral-700/50 rounded-2xl px-8 py-8 text-center opacity-0"
            >
              <p className="text-2xl md:text-3xl font-light italic text-neutral-300">Haces dieta.</p>
            </div>

            <div
              ref={painPoint2Ref}
              className="bg-neutral-900/40 backdrop-blur-sm border border-neutral-700/50 rounded-2xl px-8 py-8 text-center opacity-0"
            >
              <p className="text-2xl md:text-3xl font-light italic text-neutral-300">Haces ejercicio.</p>
            </div>

            <div
              ref={painPoint3Ref}
              className="bg-rose-500/10 backdrop-blur-sm border border-rose-500/30 rounded-2xl px-8 py-10 text-center opacity-0"
            >
              <p className="text-3xl md:text-4xl font-bold text-white">Y esa grasa sigue ahí.</p>
            </div>
          </div>

          {/* Solution Card with Confetti */}
          <div
            ref={solutionCardRef}
            className="max-w-4xl mx-auto relative mb-12 opacity-0"
          >
            {/* Confetti Effect */}
            {showConfetti && <Confetti />}

            {/* Animated traveling light border */}
            <div className="absolute -inset-[1px] rounded-3xl overflow-hidden">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0%, transparent 70%, rgba(168, 85, 247, 0.9) 85%, rgba(251, 191, 36, 0.9) 90%, rgba(168, 85, 247, 0.9) 95%, transparent 100%)',
                  filter: 'blur(8px)'
                }}
              />
            </div>

            {/* Dopamine-inducing gradient background */}
            <div className="relative bg-gradient-to-br from-purple-900/40 via-neutral-900/90 to-amber-900/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl">
              {/* Celebration emoji */}
              <div className="text-center mb-6">
                <span className="text-6xl">🎉</span>
              </div>

              <p className="text-xl md:text-2xl text-neutral-100 leading-relaxed mb-8 text-center">
                En <strong className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">Daryel Balance</strong> el reductivo liposensible{' '}
                <strong className="bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">rompe grasa localizada</strong>, desinflama y moldea tu cuerpo{' '}
                <strong className="text-white">sin cirugía, sin agujas y sin castigos.</strong>
              </p>

              <div className="grid md:grid-cols-2 gap-6 text-left">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-start gap-4 bg-gradient-to-br from-purple-500/20 to-amber-500/20 p-6 rounded-2xl border border-purple-400/30 shadow-lg shadow-purple-500/20"
                >
                  <Sparkles className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg font-semibold bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent">Resultados que sí se notan</p>
                    <p className="text-neutral-300">desde las primeras sesiones</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-start gap-4 bg-gradient-to-br from-amber-500/20 to-purple-500/20 p-6 rounded-2xl border border-amber-400/30 shadow-lg shadow-amber-500/20"
                >
                  <Target className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg font-semibold bg-gradient-to-r from-purple-300 to-purple-100 bg-clip-text text-transparent">Ideal si ya intentaste</p>
                    <p className="text-neutral-300">"de todo"</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Premium CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, type: "spring" }}
          >
            <a
              href="https://wa.me/+525637534115"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).fbq) {
                  (window as any).fbq('trackCustom', 'ClickReductivoWhatsapp');
                }
              }}
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full text-xl md:text-2xl font-bold overflow-hidden transition-all hover:scale-105"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transition-all" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Button content */}
              <span className="relative z-10 text-white flex items-center gap-3">
                <MapPin className="w-6 h-6" />
                Valoración corporal GRATIS
              </span>

              {/* Shine effect */}
              <motion.div
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Before/After Carousel
const BeforeAfterCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="py-20 bg-gradient-to-b from-neutral-900 to-black border-y border-amber-500/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="text-white">Resultados </span>
            <span className="bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">Reales</span>
          </h2>
          <p className="text-xl text-neutral-400">Transformaciones que hablan por sí mismas</p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-amber-500/10 border border-amber-500/20">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Before and after ${currentIndex + 1}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-xl border border-amber-500/30 hover:bg-black p-4 rounded-full shadow-xl transition-all hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-amber-400" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-xl border border-amber-500/30 hover:bg-black p-4 rounded-full shadow-xl transition-all hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-amber-400" />
          </button>

          <div className="flex justify-center gap-3 mt-8">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1 rounded-full transition-all ${index === currentIndex
                  ? 'bg-amber-400 w-10'
                  : 'bg-neutral-700 w-6 hover:bg-neutral-600'
                  }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Solution Section with GSAP Horizontal Scroll
const SolutionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const detailsCardRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Zap,
      title: 'Cavitación',
      description: 'para romper grasa',
      emoji: '⚡',
      gradient: 'from-amber-400 via-orange-500 to-amber-600'
    },
    {
      icon: Heart,
      title: 'Maderoterapia',
      description: 'para moldear',
      emoji: '💆',
      gradient: 'from-rose-400 via-pink-500 to-rose-600'
    },
    {
      icon: Sparkles,
      title: 'Electroestimulación',
      description: 'para reafirmar',
      emoji: '✨',
      gradient: 'from-purple-400 via-violet-500 to-purple-600'
    },
    {
      icon: Target,
      title: 'Carboxiterapia',
      description: 'para mejorar piel y circulación',
      emoji: '💎',
      gradient: 'from-cyan-400 via-blue-500 to-cyan-600'
    }
  ];

  const details = [
    { icon: Clock, label: 'Sesión', value: '60 min', gradient: 'from-amber-400 to-orange-500' },
    { icon: MapPin, label: 'Zonas', value: 'abdomen, cintura, piernas, glúteos, brazos', gradient: 'from-rose-400 to-pink-500' },
    { icon: Heart, label: 'Sensación', value: 'calor y presión tolerable', gradient: 'from-purple-400 to-violet-500' },
    { icon: Target, label: 'Sesiones', value: 'se definen en tu valoración', gradient: 'from-cyan-400 to-blue-500' }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cardsContainer = cardsContainerRef.current;
    const detailsCard = detailsCardRef.current;

    if (!section || !header || !cardsContainer || !detailsCard) return;

    // Create a timeline for coordinated animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${cardsContainer.scrollWidth + (window.innerWidth < 768 ? 400 : 800)}`,
        anticipatePin: 1,
      }
    });

    // 1. Fade out header as scroll starts
    tl.to(header, {
      opacity: 0,
      y: -50,
      duration: 0.3,
    }, 0);

    // 2. Fade in cards as header fades out
    tl.fromTo(cardsContainer,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.5 },
      0.1
    );

    // 3. Horizontal scroll animation - cards slide from right to left
    tl.to(cardsContainer, {
      x: () => -(cardsContainer.scrollWidth - window.innerWidth),
      ease: 'none',
      duration: 2,
    }, 0.5);

    // 4. Fade out cards after scroll (wait for finish at 2.5 + extra time)
    tl.to(cardsContainer, {
      autoAlpha: 0,
      duration: 0.4
    }, 2.8);

    // 5. Fade in details card centered
    tl.fromTo(detailsCard,
      { autoAlpha: 0, y: 50, scale: 0.9 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
      },
      3.2
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-b from-black via-neutral-950 to-neutral-900 overflow-hidden h-screen">
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-20"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="text-7xl md:text-8xl mb-8"
          >
            🔥
          </motion.div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
            ¿Qué hace diferente a<br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">Daryel Balance</span>?
          </h2>

          {/* Horizontal Scroll Text */}
          <div className="mb-16 overflow-hidden">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center max-w-5xl mx-auto">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-light text-neutral-300 text-center"
              >
                No es un aparato.
              </motion.div>

              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-3xl font-light text-neutral-300 text-center"
              >
                No es un masaje.
              </motion.div>
            </div>

            <motion.p
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: "spring" }}
              className="text-3xl md:text-5xl font-black text-white mt-8"
            >
              Es un <span className="bg-gradient-to-r from-purple-400 via-amber-400 to-rose-400 bg-clip-text text-transparent">protocolo inteligente</span><br className="hidden md:block" /> adaptado a tu cuerpo.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Cards Container */}
      {/* Horizontal Scroll Cards Container - Absolutely Centered */}
      <div className="absolute inset-0 flex items-center overflow-hidden z-0 pl-10 md:pl-0">
        <div
          ref={cardsContainerRef}
          className="flex gap-8 md:gap-16 pr-[20vw] md:pr-[40vw]"
          style={{
            width: 'max-content',
            transform: 'translateX(0)'
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card flex-shrink-0 flex items-center justify-center"
              style={{ width: '100vw' }}
            >
              <div className="relative w-[85vw] md:w-[600px] h-[450px] md:h-[600px]">
                {/* Glowing background */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-30`} />

                <div className="relative bg-neutral-900/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-neutral-700/50 shadow-2xl h-full flex flex-col justify-center hover:scale-105 transition-transform duration-300">
                  <div className="text-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                        delay: index * 0.2
                      }}
                      className="text-7xl md:text-8xl mb-8"
                    >
                      {feature.emoji}
                    </motion.div>
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-8 shadow-2xl`}>
                      <feature.icon className="w-12 h-12 text-white" />
                    </div>
                    <h3 className={`text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                      {feature.title}
                    </h3>
                    <p className="text-2xl md:text-3xl text-neutral-300 font-light">{feature.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details Card - Absolutely Centered & Hidden Initially */}
      <div className="absolute inset-0 flex items-center justify-center p-4 z-20 pointer-events-none">
        <div
          ref={detailsCardRef}
          className="max-w-5xl w-full relative opacity-0 pointer-events-auto"
        >
          {/* Animated traveling light border */}
          <div className="absolute -inset-[1px] rounded-3xl overflow-hidden">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0%, transparent 70%, rgba(251, 191, 36, 0.9) 85%, rgba(244, 63, 94, 0.9) 90%, rgba(251, 191, 36, 0.9) 95%, transparent 100%)',
                filter: 'blur(8px)'
              }}
            />
          </div>

          {/* Card content */}
          <div className="relative bg-gradient-to-br from-neutral-900/95 via-neutral-900/90 to-neutral-800/95 backdrop-blur-xl rounded-3xl p-6 md:p-12 shadow-2xl">
            <div className="text-center mb-4 md:mb-10">
              <img src="/images/logo.png" alt="Daryel Balance Logo" className="w-20 md:w-32 mx-auto mb-3 md:mb-6" />
              <h3 className="text-xl md:text-4xl font-black bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent mb-1 md:mb-3">
                Detalles de tu sesión
              </h3>
              <p className="text-white text-sm md:text-lg">Todo lo que necesitas saber</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 md:gap-8">
              {details.map((detail, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`flex items-start gap-2 md:gap-4 bg-gradient-to-br ${detail.gradient}/10 p-3 md:p-6 rounded-2xl border border-neutral-700/50 shadow-lg hover:shadow-xl transition-all`}
                >
                  <div className={`p-2 md:p-3 rounded-xl bg-gradient-to-br ${detail.gradient} shadow-lg flex-shrink-0`}>
                    <detail.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm md:text-lg font-bold mb-0.5 md:mb-1 text-white">
                      {detail.label}
                    </p>
                    <p className="text-white text-xs md:text-lg leading-tight md:leading-relaxed">{detail.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Moved Inside for Mobile Readiness */}
            <div className="mt-6 md:mt-12 text-center pb-2 md:pb-8">
              <p className="text-base md:text-3xl font-black text-white mb-3 md:mb-6">
                Todo personalizado. <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Nada genérico.</span>
              </p>
              <a
                href="https://wa.me/+525637534115"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).fbq) {
                    (window as any).fbq('trackCustom', 'ClickReductivoWhatsapp');
                  }
                }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-6 rounded-full text-lg md:text-2xl font-bold overflow-hidden transition-all hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transition-all" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 text-white flex items-center gap-3">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                  Valoración corporal GRATIS
                </span>
                <motion.div
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                />
              </a>
            </div>
          </div>
        </div>
      </div>







    </section >
  );
};

// Promo Section with Urgency
const PromoSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-neutral-900 via-black to-neutral-950 overflow-hidden border-t border-amber-500/10">
      {/* Animated background pulse */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-radial from-amber-500/10 to-transparent"
      />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="inline-block text-7xl mb-6"
            >
              🚨
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-4">
              <span className="bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">PROMO</span> ACTIVA
            </h2>
          </div>

          <div className="bg-neutral-950/80 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-8 md:p-12 shadow-2xl shadow-emerald-500/20 mb-8">
            <div className="text-center mb-8">
              <p className="text-3xl md:text-5xl font-black text-white mb-4">
                3 sesiones + 1 GRATIS
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <span className="text-3xl text-red-500 line-through font-bold">$1,199</span>
                <div className="flex items-center gap-2">
                  <span className="text-4xl">💸</span>
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-5xl md:text-7xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
                  >
                    $899
                  </motion.span>
                  <span className="text-4xl">💰</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">✓</span>
                </div>
                <p className="text-xl font-semibold text-white">Valoración corporal SIN COSTO</p>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">✓</span>
                </div>
                <p className="text-xl font-semibold text-white">Aparta con $99 (se descuenta del total)</p>
              </motion.div>
            </div>

            <div className="space-y-4 mb-8 p-6 bg-rose-500/10 rounded-2xl border-2 border-rose-500/30">
              <div className="flex items-center gap-3 text-rose-400">
                <span className="text-2xl">⚠</span>
                <p className="text-lg font-bold">Cupos limitados por agenda</p>
              </div>
              <div className="flex items-center gap-3 text-rose-400">
                <span className="text-2xl">⚠</span>
                <p className="text-lg font-bold">Resultados reales (antes y después)</p>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href="https://wa.me/+525637534115"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).fbq) {
                    (window as any).fbq('trackCustom', 'ClickReductivoWhatsapp');
                  }
                }}
                className="group relative block w-full bg-transparent text-center px-10 py-6 rounded-full text-2xl font-bold overflow-hidden transition-all hover:scale-105 shadow-2xl shadow-emerald-500/30"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transition-all" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Button content */}
                <span className="relative z-10 text-white flex items-center justify-center gap-3">
                  <Phone className="w-8 h-8" />
                  Agenda ahorita tu valoración GRATIS
                </span>

                {/* Shine effect */}
                <motion.div
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                />
              </a>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-2xl md:text-3xl font-bold text-white"
          >
            Si lo estás pensando,{' '}
            <span className="text-amber-400">alguien más ya está apartando tu lugar.</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

// Location Section
const LocationSection = () => {
  return (
    <section className="py-20 bg-black border-t border-neutral-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Ubicación
          </h2>
          <p className="text-xl text-neutral-400">Visítanos en nuestra sucursal</p>
        </div>

        <div className="max-w-4xl mx-auto bg-neutral-900/50 rounded-3xl p-6 md:p-8 border border-neutral-800">
          <div className="text-center mb-8">
            <a
              href="https://maps.app.goo.gl/U1EizAevcUzcvAHUA"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 text-neutral-300 hover:text-white transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center group-hover:bg-rose-500/20 transition-colors">
                <MapPin className="w-5 h-5 text-rose-400 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-lg md:text-xl underline decoration-rose-400/30 hover:decoration-rose-400 underline-offset-4">
                Canal de Miramontes 2733, Coapa, Jardines de Coyoacán, Coyoacán, CDMX
              </span>
            </a>
          </div>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-neutral-700/50 shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.2118711235644!2d-99.1316815203619!3d19.316610442019876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce01002b0f0f5b%3A0x89cf7190af4d7bb2!2sDaryels%20Balance%20fisioterapia%20y%20spa!5e0!3m2!1ses-419!2smx!4v1770488878381!5m2!1ses-419!2smx"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Landing Page Component
export default function DaryelBalanceLanding() {
  const images = [
    '/images/Efectos_de_la_radiofrecuencia_corporal_para_tonificar_el_cuerpo.jpg',
    '/images/Essa_cliente_me_falou_hoje_que_esta__amando_seu_corpo__principalmente_nesta_e_poca_do_ano__E__ta_o_gratificante_ouvir_isso_e_ajudar_tantas_mulheres_lindas_____A_massagem_inteligente_e__perfeitaaa_.jpg',
    '/images/lpg.jpg',
    '/images/resultado_na_u_ltima_foto___.jpg',
    '/images/Sculpiflex.jpg',
    '/images/Transformaciones_este_ticas__cambios_sorprendentes.jpg'
  ];

  return (
    <div className="min-h-screen bg-black font-sans antialiased">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>

      <StickyHeader />
      <HeroSection />
      <BeforeAfterCarousel images={images} />
      <SolutionSection />
      <PromoSection />
      <LocationSection />
    </div>
  );
}
