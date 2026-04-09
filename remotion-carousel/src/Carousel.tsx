import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';
import { colors, gradients, fonts, fontWeights, SLIDE_DURATION_FRAMES } from './theme';

// ─── Shared Styles ───────────────────────────────────────────────

const microBars: React.CSSProperties = {
  display: 'flex',
  gap: 4,
  justifyContent: 'center',
  marginTop: 12,
};

const microBar = (color: string): React.CSSProperties => ({
  width: 24,
  height: 3,
  borderRadius: 2,
  backgroundColor: color,
});

// ─── Slide 1 — Cover ────────────────────────────────────────────

const SlideCover: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' });
  const barsWidth = interpolate(frame, [15, 35], [0, 24], { extrapolateRight: 'clamp' });
  const dotScale = spring({ frame: frame - 10, fps, config: { damping: 8, stiffness: 120 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.novaBlack,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Subtle gradient overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to top, rgba(255,64,42,0.06), transparent)',
        }}
      />

      <div style={{ transform: `scale(${logoScale})`, textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
          <span
            style={{
              fontFamily: fonts.light,
              fontWeight: fontWeights.light,
              fontSize: 72,
              color: colors.novaWhite,
              letterSpacing: -1,
            }}
          >
            nova
          </span>
          <span
            style={{
              fontFamily: fonts.bold,
              fontWeight: fontWeights.bold,
              fontSize: 72,
              color: colors.novaWhite,
              letterSpacing: -1,
            }}
          >
            hub
          </span>
          <span
            style={{
              fontFamily: fonts.bold,
              fontWeight: fontWeights.bold,
              fontSize: 72,
              color: colors.novaEmber,
              transform: `scale(${Math.max(0, dotScale)})`,
              display: 'inline-block',
            }}
          >
            .
          </span>
        </div>

        {/* Micro bars */}
        <div style={microBars}>
          <div style={{ ...microBar(colors.novaEmber), width: barsWidth }} />
          <div style={{ ...microBar(colors.novaTeal), width: barsWidth }} />
          <div style={{ ...microBar(colors.novaAsh), width: barsWidth }} />
        </div>

        <p
          style={{
            fontFamily: fonts.bold,
            fontWeight: fontWeights.bold,
            fontSize: 14,
            color: colors.novaEmber,
            letterSpacing: 4,
            marginTop: 16,
            opacity: subtitleOpacity,
          }}
        >
          DIREÇÃO CRIATIVA
        </p>
      </div>

      {/* Page indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          display: 'flex',
          gap: 8,
          opacity: subtitleOpacity,
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: i === 0 ? 24 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: i === 0 ? colors.novaEmber : colors.novaSlate,
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── Slide 2 — O que fazemos ────────────────────────────────────

const SlideServices: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 20], [40, 0], { extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  const services = ['Branding', 'Social Media', 'Motion Design', 'Web Design'];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.novaBlack, padding: 80 }}>
      {/* Section label */}
      <p
        style={{
          fontFamily: fonts.bold,
          fontWeight: fontWeights.bold,
          fontSize: 13,
          color: colors.novaEmber,
          letterSpacing: 3,
          opacity: titleOpacity,
          marginBottom: 8,
        }}
      >
        01 — SERVIÇOS
      </p>

      <h2
        style={{
          fontFamily: fonts.display,
          fontSize: 52,
          color: colors.novaWhite,
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          lineHeight: 1.2,
          marginBottom: 48,
        }}
      >
        O que fazemos
      </h2>

      {services.map((service, i) => {
        const delay = 15 + i * 10;
        const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: 'clamp' });
        const x = interpolate(frame, [delay, delay + 15], [30, 0], { extrapolateRight: 'clamp' });

        return (
          <div
            key={service}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 24,
              opacity,
              transform: `translateX(${x}px)`,
            }}
          >
            <div
              style={{
                width: 40,
                height: 3,
                background: gradients.emberFlow,
                borderRadius: 2,
              }}
            />
            <span
              style={{
                fontFamily: fonts.bold,
                fontWeight: fontWeights.bold,
                fontSize: 28,
                color: colors.novaWhite,
              }}
            >
              {service}
            </span>
          </div>
        );
      })}

      {/* Page indicator */}
      <div style={{ position: 'absolute', bottom: 60, left: 80, display: 'flex', gap: 8 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: i === 1 ? 24 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: i === 1 ? colors.novaEmber : colors.novaSlate,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── Slide 3 — Processo ─────────────────────────────────────────

const SlideProcess: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  const steps = [
    { num: '01', label: 'Descoberta' },
    { num: '02', label: 'Estratégia' },
    { num: '03', label: 'Criação' },
    { num: '04', label: 'Entrega' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.novaBlack, padding: 80 }}>
      <p
        style={{
          fontFamily: fonts.bold,
          fontWeight: fontWeights.bold,
          fontSize: 13,
          color: colors.novaEmber,
          letterSpacing: 3,
          opacity: titleOpacity,
          marginBottom: 8,
        }}
      >
        02 — PROCESSO
      </p>

      <h2
        style={{
          fontFamily: fonts.display,
          fontSize: 52,
          color: colors.novaWhite,
          opacity: titleOpacity,
          lineHeight: 1.2,
          marginBottom: 56,
        }}
      >
        Como trabalhamos
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {steps.map((step, i) => {
          const delay = 15 + i * 12;
          const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: 'clamp' });
          const scale = interpolate(frame, [delay, delay + 15], [0.9, 1], { extrapolateRight: 'clamp' });

          return (
            <div
              key={step.num}
              style={{
                backgroundColor: colors.novaSlate,
                borderRadius: 16,
                padding: 32,
                opacity,
                transform: `scale(${scale})`,
              }}
            >
              <span
                style={{
                  fontFamily: fonts.display,
                  fontSize: 36,
                  color: colors.novaEmber,
                  display: 'block',
                  marginBottom: 8,
                }}
              >
                {step.num}
              </span>
              <span
                style={{
                  fontFamily: fonts.bold,
                  fontWeight: fontWeights.bold,
                  fontSize: 22,
                  color: colors.novaWhite,
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Page indicator */}
      <div style={{ position: 'absolute', bottom: 60, left: 80, display: 'flex', gap: 8 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: i === 2 ? 24 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: i === 2 ? colors.novaEmber : colors.novaSlate,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── Slide 4 — Resultado / Quote ────────────────────────────────

const SlideQuote: React.FC = () => {
  const frame = useCurrentFrame();

  const quoteOpacity = interpolate(frame, [5, 25], [0, 1], { extrapolateRight: 'clamp' });
  const quoteY = interpolate(frame, [5, 25], [20, 0], { extrapolateRight: 'clamp' });
  const lineWidth = interpolate(frame, [0, 30], [0, 80], { extrapolateRight: 'clamp' });
  const authorOpacity = interpolate(frame, [30, 45], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.novaBlack,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 100,
      }}
    >
      {/* Gradient accent top-left */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 300,
          height: 300,
          background: 'radial-gradient(circle at top left, rgba(255,64,42,0.12), transparent 70%)',
        }}
      />

      <div style={{ textAlign: 'center' }}>
        {/* Decorative line */}
        <div
          style={{
            width: lineWidth,
            height: 3,
            background: gradients.emberFlow,
            borderRadius: 2,
            margin: '0 auto 40px',
          }}
        />

        <p
          style={{
            fontFamily: fonts.display,
            fontSize: 38,
            color: colors.novaWhite,
            lineHeight: 1.4,
            opacity: quoteOpacity,
            transform: `translateY(${quoteY}px)`,
          }}
        >
          "Marcas que comunicam{'\n'}com clareza, vendem{'\n'}com confiança."
        </p>

        <p
          style={{
            fontFamily: fonts.bold,
            fontWeight: fontWeights.bold,
            fontSize: 14,
            color: colors.novaAsh,
            letterSpacing: 2,
            marginTop: 32,
            opacity: authorOpacity,
          }}
        >
          — NOVAHUB DIREÇÃO CRIATIVA
        </p>
      </div>

      {/* Page indicator */}
      <div style={{ position: 'absolute', bottom: 60, display: 'flex', gap: 8 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: i === 3 ? 24 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: i === 3 ? colors.novaEmber : colors.novaSlate,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── Slide 5 — CTA ──────────────────────────────────────────────

const SlideCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ctaScale = spring({ frame: frame - 10, fps, config: { damping: 10, stiffness: 80 } });
  const textOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const buttonOpacity = interpolate(frame, [25, 40], [0, 1], { extrapolateRight: 'clamp' });
  const glowOpacity = interpolate(frame, [30, 60, 70, 90], [0, 0.3, 0.3, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.novaBlack,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      {/* Animated glow */}
      <div
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,64,42,0.2), transparent 70%)',
          opacity: glowOpacity,
        }}
      />

      <div style={{ textAlign: 'center', zIndex: 1 }}>
        <p
          style={{
            fontFamily: fonts.bold,
            fontWeight: fontWeights.bold,
            fontSize: 13,
            color: colors.novaEmber,
            letterSpacing: 3,
            marginBottom: 16,
            opacity: textOpacity,
          }}
        >
          VAMOS CONVERSAR?
        </p>

        <h2
          style={{
            fontFamily: fonts.display,
            fontSize: 48,
            color: colors.novaWhite,
            lineHeight: 1.2,
            marginBottom: 48,
            opacity: textOpacity,
          }}
        >
          Pronto para elevar{'\n'}sua marca?
        </h2>

        {/* CTA Button */}
        <div
          style={{
            display: 'inline-flex',
            padding: '20px 48px',
            background: gradients.emberFlow,
            borderRadius: 50,
            opacity: buttonOpacity,
            transform: `scale(${Math.max(0, ctaScale)})`,
          }}
        >
          <span
            style={{
              fontFamily: fonts.bold,
              fontWeight: fontWeights.bold,
              fontSize: 18,
              color: colors.novaWhite,
              letterSpacing: 1,
            }}
          >
            ENTRE EM CONTATO
          </span>
        </div>

        {/* Social handles */}
        <p
          style={{
            fontFamily: fonts.light,
            fontWeight: fontWeights.light,
            fontSize: 14,
            color: colors.novaAsh,
            marginTop: 32,
            opacity: buttonOpacity,
          }}
        >
          @novahub.criativa
        </p>
      </div>

      {/* Page indicator */}
      <div style={{ position: 'absolute', bottom: 60, display: 'flex', gap: 8 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: i === 4 ? 24 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: i === 4 ? colors.novaEmber : colors.novaSlate,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── Main Carousel Composition ──────────────────────────────────

export const Carousel: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={SLIDE_DURATION_FRAMES}>
        <SlideCover />
      </Sequence>
      <Sequence from={SLIDE_DURATION_FRAMES} durationInFrames={SLIDE_DURATION_FRAMES}>
        <SlideServices />
      </Sequence>
      <Sequence from={SLIDE_DURATION_FRAMES * 2} durationInFrames={SLIDE_DURATION_FRAMES}>
        <SlideProcess />
      </Sequence>
      <Sequence from={SLIDE_DURATION_FRAMES * 3} durationInFrames={SLIDE_DURATION_FRAMES}>
        <SlideQuote />
      </Sequence>
      <Sequence from={SLIDE_DURATION_FRAMES * 4} durationInFrames={SLIDE_DURATION_FRAMES}>
        <SlideCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
