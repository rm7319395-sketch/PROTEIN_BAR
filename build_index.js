const fs = require('fs');

const fontCss = fs.readFileSync('fonts.css', 'utf8');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Stride: Plant Protein Bars</title>
  <meta name="description" content="Five bold flavours of plant protein bar. Pressed, not baked.">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  
  <script type="importmap">
  {
    "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js",
      "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
    }
  }
  </script>

  <style>
${fontCss}

    :root {
      --sheet: url("https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261116_132032_30242d8c-5062-4d60-8a3d-238f0a2ff788.png&w=2200&q=85");
      --ink: #1c1a1f;
      --cream: #f0e8e0;
      --dark: #191a1e;
      --flav: #ab9ac4;
      --rv: transparent;
      --ease: cubic-bezier(.22,.8,.24,1);
      --glide: cubic-bezier(.25,.75,.2,1);
      --u: min(calc(100vw / 1440), calc(100vh / 900));
      --w: calc(100vw / 1440);
      --n: min(calc(100vw / 1440), 1px);
      --g: rgba(148, 189, 180, 0.72);
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    html {
      width: 100%;
      min-height: 100%;
    }

    body {
      width: 100%;
      min-height: 100%;
      background: var(--cream);
      color: var(--ink);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      overflow-x: hidden;
    }

    body.locked {
      overflow: hidden;
      height: 100vh;
    }

    body.dragging {
      cursor: grabbing !important;
      user-select: none !important;
    }

    .disp {
      font-family: 'Archivo Black', sans-serif;
      text-transform: uppercase;
      letter-spacing: -0.01em;
      line-height: 0.92;
      font-weight: 400;
    }

    .mono {
      font-family: 'DM Mono', monospace;
    }

    /* Common Sprite Class */
    .spr {
      background-image: var(--sheet);
      background-repeat: no-repeat;
      display: inline-block;
    }

    /* Wrapper Sprites (pad = 4) */
    .spr-wrap-0 {
      background-size: 654.0146% 177.3629%;
      background-position: 4.1282% 21.2670%;
    }
    .spr-wrap-1 {
      background-size: 655.6098% 177.3629%;
      background-position: 27.0413% 21.2670%;
    }
    .spr-wrap-2 {
      background-size: 655.6098% 177.3629%;
      background-position: 49.7366% 21.2670%;
    }
    .spr-wrap-3 {
      background-size: 655.6098% 177.3629%;
      background-position: 72.7392% 21.2670%;
    }
    .spr-wrap-4 {
      background-size: 654.0146% 177.3629%;
      background-position: 95.7400% 21.2670%;
    }

    /* Bit Sprites (pad = 0) */
    .spr-bit-0 {
      background-size: 790.5882% 498.3607%;
      background-position: 27.6831% 89.7119%;
    }
    .spr-bit-1 {
      background-size: 960.0000% 596.0784%;
      background-position: 4.5681% 88.9328%;
    }
    .spr-bit-2 {
      background-size: 840.0000% 533.3333%;
      background-position: 49.6199% 89.8785%;
    }
    .spr-bit-3 {
      background-size: 707.3684% 498.3607%;
      background-position: 72.7903% 89.3004%;
    }
    .spr-bit-4 {
      background-size: 1075.2000% 515.2542%;
      background-position: 93.5193% 89.3878%;
    }

    /* Canvas (Layering: z-index 2) */
    #gl {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      z-index: 2;
      pointer-events: none;
    }

    /* Intro Overlay (z-index 100) */
    #intro {
      position: fixed;
      inset: 0;
      z-index: 100;
      background: #ab9ac4;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.6s var(--ease), visibility 0.6s;
    }

    #intro.hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    #intro video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    #skipBtn {
      position: absolute;
      top: calc(28 * var(--u));
      right: calc(36 * var(--u));
      height: 38px;
      padding: 0 18px;
      border-radius: 99px;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.4);
      color: var(--ink);
      font-family: 'DM Mono', monospace;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      cursor: pointer;
      z-index: 10;
      transition: transform 0.2s var(--ease), background 0.2s;
    }

    #skipBtn:hover {
      transform: scale(1.05);
      background: rgba(255, 255, 255, 0.95);
    }

    #introStamp {
      position: absolute;
      inset: 0;
      background: var(--cream);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s var(--ease);
      z-index: 5;
    }

    #introStamp.show {
      opacity: 1;
      visibility: visible;
    }

    .stamp-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: calc(16 * var(--u));
      transform: scale(0.72);
      opacity: 0;
    }

    .stamp-inner.pop {
      animation: stampPop 0.38s ease-out forwards;
    }

    @keyframes stampPop {
      0% { transform: scale(0.72); opacity: 0; }
      70% { transform: scale(1.04); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }

    .stamp-circle {
      width: calc(120 * var(--u));
      height: calc(120 * var(--u));
      border-radius: 50%;
      background: var(--ink);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stamp-text {
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      font-size: calc(72 * var(--u));
      letter-spacing: 0.06em;
      color: var(--ink);
    }

    /* Navigation (z-index 50) */
    #nav {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: calc(94 * var(--n));
      padding: 0 calc(37 * var(--n)) 0 calc(42 * var(--n));
      z-index: 50;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--ink);
      pointer-events: none;
      transform: translateY(-110%);
      transition: transform 0.9s var(--ease), color 0.4s;
    }

    #nav.visible {
      transform: translateY(0);
    }

    #nav.dark {
      color: var(--cream);
    }

    #nav > * {
      pointer-events: auto;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: calc(12 * var(--n));
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }

    .brand-mark {
      width: calc(36 * var(--n));
      height: calc(36 * var(--n));
      border-radius: 50%;
      background: var(--ink);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.4s;
    }

    #nav.dark .brand-mark {
      background: var(--cream);
    }

    .brand-mark svg path {
      stroke: var(--cream);
      transition: stroke 0.4s;
    }

    #nav.dark .brand-mark svg path {
      stroke: var(--ink);
    }

    .brand-wordmark {
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      font-size: calc(15.5 * var(--n));
      letter-spacing: 0.06em;
    }

    .nav-center-pill {
      position: relative;
      background: rgba(255, 255, 255, 0.08);
      border: 1.5px solid rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      padding: calc(5 * var(--n));
      border-radius: 99px;
      display: flex;
      align-items: center;
      gap: calc(4 * var(--n));
      transition: border-color 0.4s, background 0.4s;
    }

    .nav-center-pill.light {
      border-color: rgba(28, 26, 31, 0.14);
      background: rgba(255, 255, 255, 0.35);
    }

    .pill-highlight {
      position: absolute;
      top: calc(5 * var(--n));
      bottom: calc(5 * var(--n));
      left: 0;
      width: 0;
      background: #ffffff;
      border-radius: 99px;
      transition: left 0.5s var(--ease), width 0.5s var(--ease);
      z-index: 1;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }

    .nav-link {
      position: relative;
      z-index: 2;
      padding: calc(8 * var(--n)) calc(16 * var(--n));
      font-family: 'Inter', sans-serif;
      font-size: calc(14.5 * var(--n));
      font-weight: 500;
      color: inherit;
      text-decoration: none;
      border-radius: 99px;
      transition: font-weight 0.2s, color 0.3s;
      white-space: nowrap;
    }

    .nav-link.active {
      font-weight: 600;
      color: var(--ink);
    }

    .nav-right {
      display: flex;
      align-items: center;
      gap: calc(10 * var(--n));
    }

    .nav-chip {
      height: calc(37 * var(--n));
      padding: 0 calc(14 * var(--n));
      border-radius: 99px;
      border: 1.5px solid currentColor;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'DM Mono', monospace;
      font-size: calc(12 * var(--n));
      font-weight: 500;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }

    .nav-basket {
      width: calc(44 * var(--n));
      height: calc(37 * var(--n));
      padding: 0;
      position: relative;
      border-radius: 99px;
      border: 1.5px solid currentColor;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: transparent;
      transition: transform 0.32s var(--ease);
    }

    .nav-basket.bump {
      animation: basketBump 0.32s var(--ease);
    }

    @keyframes basketBump {
      0% { transform: scale(1); }
      40% { transform: scale(1.18); }
      100% { transform: scale(1); }
    }

    .basket-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      height: 18px;
      min-width: 18px;
      padding: 0 4px;
      border-radius: 99px;
      background: var(--dark);
      color: #ffffff;
      font-family: 'DM Mono', monospace;
      font-size: 10.5px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: scale(0);
      transition: transform 0.35s var(--ease);
    }

    .basket-badge.show {
      transform: scale(1);
    }

    .basket-badge.bounce {
      animation: badgeBounce 0.35s var(--ease);
    }

    @keyframes badgeBounce {
      0% { transform: scale(0); }
      60% { transform: scale(1.5); }
      100% { transform: scale(1); }
    }

    .nav-cta {
      height: calc(37 * var(--n));
      padding: 0 calc(18 * var(--n));
      border-radius: 99px;
      background: var(--ink);
      color: var(--cream);
      font-family: 'Inter', sans-serif;
      font-size: calc(14.5 * var(--n));
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      cursor: pointer;
      transition: background 0.4s, color 0.4s;
    }

    #nav.dark .nav-cta {
      background: #8fa8a3;
      color: var(--ink);
    }

    /* Fixed Bottom Nav for phones */
    #mobilePillNav {
      display: none;
    }

    /* SECTION 1 — HERO CAROUSEL (#flavors) */
    /* Hero must not use isolation or create stacking context */
    #flavors {
      position: relative;
      width: 100vw;
      height: 100svh;
      min-height: 300px;
      overflow: hidden;
      background: var(--flav);
      transition: background 0.3s;
    }

    .reveal {
      position: absolute;
      inset: 0;
      background: var(--rv);
      pointer-events: none;
      z-index: 0;
    }

    .rings {
      position: absolute;
      left: 50%;
      top: 41%;
      transform: translate(-50%, -50%) scale(0.85);
      width: calc(2200 * var(--u));
      height: calc(2200 * var(--u));
      background: repeating-radial-gradient(circle, rgba(255,255,255,.13) 0, rgba(255,255,255,.02) calc(40 * var(--u)), rgba(255,255,255,.13) calc(80 * var(--u)));
      mask-image: radial-gradient(circle, #000 0 22%, rgba(0,0,0,.55) 34%, transparent 52%);
      -webkit-mask-image: radial-gradient(circle, #000 0 22%, rgba(0,0,0,.55) 34%, transparent 52%);
      pointer-events: none;
      opacity: 0;
      transition: opacity 1.1s ease-out, transform 1.1s ease-out;
      z-index: 0;
    }

    .rings.active {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }

    .bits {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
    }

    .floating-bit {
      position: absolute;
      filter: blur(1.5px);
      opacity: 0;
      transform-origin: center;
      transition: opacity 0.9s ease;
    }

    /* Touch / Swipe Arc Area */
    .arc {
      position: absolute;
      inset: 0;
      touch-action: pan-y;
      z-index: 10;
      cursor: grab;
    }

    /* Counter (z-index 1, under canvas) */
    #count {
      position: absolute;
      top: calc(50% + 215 * var(--u));
      right: calc(50% - 720 * var(--u) + 28 * var(--u));
      z-index: 1;
      font-family: 'Archivo Black', sans-serif;
      font-size: calc(200 * var(--u));
      line-height: 0.8;
      color: transparent;
      -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.9);
      user-select: none;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.6s var(--ease);
    }

    #count.active {
      opacity: 1;
    }

    /* Hero Title (z-index 60, above canvas) */
    #title {
      position: absolute;
      top: calc(50% + 265 * var(--u));
      left: 50%;
      transform: translateX(-50%);
      z-index: 60;
      color: var(--ink);
      font-family: 'Archivo Black', sans-serif;
      text-transform: uppercase;
      letter-spacing: -0.01em;
      line-height: 0.92;
      text-align: center;
      white-space: nowrap;
      pointer-events: none;
      user-select: none;
      font-size: calc(96 * var(--u));
    }

    #title .word {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      vertical-align: top;
      margin: 0 0.18em;
    }

    #title .char {
      display: inline-block;
      will-change: transform, opacity;
    }

    /* Next Button (z-index 60, above canvas) */
    #play {
      position: absolute;
      top: calc(50% + 200 * var(--u));
      left: 50%;
      transform: translate(-50%, -50%);
      width: calc(52 * var(--u));
      height: calc(52 * var(--u));
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 0 6px 20px rgba(40, 28, 60, 0.12);
      border: none;
      cursor: pointer;
      z-index: 60;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.6s var(--ease), transform 0.2s var(--ease);
    }

    #play.active {
      opacity: 1;
    }

    #play:hover {
      transform: translate(-50%, -50%) scale(1.08);
    }

    #play:active {
      transform: translate(-50%, -50%) scale(0.94);
    }

    #play svg {
      width: calc(18 * var(--u));
      height: calc(18 * var(--u));
      transition: transform 0.2s var(--ease);
    }

    #play:hover svg {
      transform: translateX(2px);
    }

    /* Autoplay Toggle (z-index 60, above canvas) */
    #auto {
      position: absolute;
      top: calc(50% + 170 * var(--u));
      right: calc(50% - 720 * var(--u) + 40 * var(--u));
      z-index: 60;
      display: flex;
      align-items: center;
      gap: 8px;
      background: transparent;
      border: none;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.6s var(--ease);
    }

    #auto.active {
      opacity: 1;
    }

    .auto-ring {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: 1.3px solid #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .auto-label {
      font-family: 'DM Mono', monospace;
      font-weight: 500;
      font-size: 11px;
      letter-spacing: 0.14em;
      color: #ffffff;
      text-transform: uppercase;
    }

    /* SECTION 2 — "INSIDE" (#inside) */
    #inside {
      position: relative;
      width: 100vw;
      height: 500vh;
      background: var(--flav);
      transition: background 0.3s;
    }

    .pin {
      position: sticky;
      top: 0;
      width: 100vw;
      height: 100svh;
      overflow: hidden;
    }

    .in-dark {
      position: absolute;
      inset: 0;
      background: #120d16;
      opacity: 0;
      pointer-events: none;
      z-index: 0;
    }

    .in-back-frame {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1440px;
      height: 900px;
      transform-origin: center center;
      pointer-events: none;
      z-index: 1;
    }

    .in-num {
      position: absolute;
      left: 510px;
      top: 240px;
      width: 640px;
      text-align: center;
      font-family: 'Archivo Black', sans-serif;
      font-size: 428px;
      line-height: 0.8;
      color: transparent;
      -webkit-text-stroke: 1.6px rgba(255, 255, 255, 0.9);
      user-select: none;
      transition: opacity 0.3s;
    }

    #inBar {
      position: absolute;
      left: 665px;
      top: 110px;
      width: 330px;
      height: 694px;
      pointer-events: none;
    }

    /* Section 2 Front Layer: #inFront (z-index 3, above canvas) */
    #inFront {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100svh;
      z-index: 3;
      pointer-events: none;
      visibility: hidden;
    }

    .in-front-frame {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1440px;
      height: 900px;
      transform-origin: center center;
      pointer-events: none;
    }

    .in-head {
      position: absolute;
      left: 40px;
      top: 300px;
      font-family: 'Archivo Black', sans-serif;
      font-size: 88px;
      line-height: 0.93;
      color: var(--cream);
      text-transform: uppercase;
      user-select: none;
      transition: opacity 0.24s var(--ease), translate 0.24s var(--ease);
    }

    .in-head.long-word {
      font-size: calc(88px * 0.72);
    }

    .in-icons {
      position: absolute;
      left: 1292px;
      top: 310px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      pointer-events: auto;
    }

    .in-icon-btn {
      width: 66px;
      height: 66px;
      border-radius: 50%;
      border: 1.5px solid #ffffff;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.3s, border-color 0.3s, transform 0.2s;
    }

    .in-icon-btn:hover {
      transform: scale(1.06);
    }

    .in-icon-btn svg {
      width: 26px;
      height: 26px;
      stroke: #ffffff;
      fill: none;
      stroke-width: 1.8;
      stroke-linecap: round;
      stroke-linejoin: round;
      transition: stroke 0.3s;
    }

    .in-icon-btn.active {
      background: var(--cream);
      border-color: var(--cream);
    }

    .in-icon-btn.active svg {
      stroke: var(--ink);
    }

    .in-cap {
      position: absolute;
      right: 42px;
      top: 596px;
      font-family: 'DM Mono', monospace;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.92);
      text-align: right;
      line-height: 1.45;
      user-select: none;
      transition: opacity 0.24s var(--ease), translate 0.24s var(--ease);
    }

    /* Storm container */
    .storm {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
    }

    .storm-piece {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      pointer-events: none;
      will-change: transform, opacity;
    }

    /* SECTION 3 — GRAB A BAG (#shop) */
    #shop {
      position: relative;
      background: var(--cream);
      padding: calc(96 * var(--w)) calc(39 * var(--w)) calc(80 * var(--w));
      z-index: 1;
      overflow: hidden;
    }

    .shop-head {
      font-family: 'Archivo Black', sans-serif;
      font-size: calc(94 * var(--w));
      line-height: 0.86;
      text-transform: uppercase;
      color: var(--ink);
    }

    .shop-head .line-wrap {
      overflow: hidden;
      display: block;
    }

    .shop-head .line-text {
      display: block;
      transform: translateY(105%);
      transition: transform 1s var(--ease);
    }

    .shop-head.revealed .line-text {
      transform: translateY(0);
    }

    .shop-head.revealed .line-wrap:nth-child(2) .line-text {
      transition-delay: 80ms;
    }

    .shop-cap {
      position: absolute;
      left: calc(1128 * var(--w));
      top: calc(132 * var(--w));
      font-family: 'DM Mono', monospace;
      font-size: calc(15.5 * var(--w));
      line-height: 1.42;
      color: var(--ink);
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 1s var(--ease), transform 1s var(--ease);
    }

    .shop-cap.revealed {
      opacity: 1;
      transform: translateY(0);
    }

    .shop-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: calc(18 * var(--w));
      margin-top: calc(24 * var(--w));
      perspective: 1200px;
    }

    .card {
      position: relative;
      height: calc(390 * var(--w));
      border-radius: calc(22 * var(--w));
      transform-style: preserve-3d;
      cursor: pointer;
      user-select: none;
      opacity: 0;
      transform: translateY(40px);
      transition: transform 0.15s ease-out, opacity 0.8s var(--ease), box-shadow 0.15s ease-out;
      box-shadow: 0 10px 24px rgba(0,0,0,0.06);
    }

    .card.revealed {
      opacity: 1;
      transform: translateY(0);
    }

    .card.hovered {
      box-shadow: 0 24px 40px -18px rgba(40, 30, 20, 0.35);
    }

    .card:active {
      transform: scale(0.97);
    }

    .card-name {
      position: absolute;
      top: calc(26 * var(--w));
      left: 0;
      right: 0;
      text-align: center;
      font-family: 'Archivo Black', sans-serif;
      font-size: calc(30.5 * var(--w));
      color: #fbf7f2;
      line-height: 0.95;
      text-transform: uppercase;
      pointer-events: none;
    }

    .card .pk {
      position: absolute;
      top: calc(104 * var(--w));
      left: 50%;
      transform: translateX(-50%) translateZ(30px);
      width: calc(121 * var(--w));
      height: calc(255 * var(--w));
      filter: drop-shadow(0 8px calc(12 * var(--w)) rgba(0,0,0,0.2));
      transition: transform 0.5s ease-out;
      transform-origin: center;
    }

    /* Live card hides its flat sprite because 3D bar sits there */
    body.gl .card.live .pk {
      visibility: hidden !important;
    }

    .card-add {
      position: absolute;
      bottom: calc(15 * var(--w));
      right: calc(16 * var(--w));
      width: calc(44 * var(--w));
      min-width: 34px;
      height: calc(44 * var(--w));
      min-height: 34px;
      border-radius: 50%;
      background: var(--dark);
      border: 2px solid #ffffff;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translateZ(40px);
      cursor: pointer;
      transition: transform 0.2s var(--ease);
    }

    .card-add:hover {
      transform: translateZ(40px) scale(1.1);
    }

    .card-add svg {
      width: 18px;
      height: 18px;
      stroke: #ffffff;
      stroke-width: 2.4;
      stroke-linecap: round;
    }

    /* SECTION 4 — BUILD YOUR 3 PACK (#range) */
    #range {
      position: relative;
      background: var(--dark);
      color: var(--cream);
      min-height: 100svh;
      overflow: hidden;
      padding: max(calc(92 * var(--w)), calc((100vh - 540 * var(--w)) / 2)) calc(50 * var(--w)) calc(100 * var(--w));
      z-index: 1;
    }

    .range-head {
      font-family: 'Archivo Black', sans-serif;
      font-size: calc(72.5 * var(--w));
      line-height: 0.93;
      text-transform: uppercase;
      color: var(--cream);
      max-width: calc(660 * var(--w));
    }

    .range-head .line-wrap {
      overflow: hidden;
      display: block;
    }

    .range-head .line-text {
      display: block;
      transform: translateY(105%);
      transition: transform 1s var(--ease);
    }

    .range-head.revealed .line-text {
      transform: translateY(0);
    }

    .pack-pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: calc(74 * var(--w));
      height: calc(72 * var(--w));
      border-radius: calc(14 * var(--w));
      background: var(--cream);
      color: var(--dark);
      font-size: 0.86em;
      line-height: 1;
      margin: 0 0.08em;
      vertical-align: middle;
    }

    /* Desktop Layout: Stage at left 740w */
    .range-stage {
      position: absolute;
      left: calc(740 * var(--w));
      top: max(calc(12 * var(--w)), calc((100vh - 540 * var(--w)) / 2 - 80 * var(--w)));
      width: calc(600 * var(--w));
      height: calc(600 * var(--w));
      pointer-events: none;
    }

    .range-stage > * {
      pointer-events: auto;
    }

    .range-glow {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: radial-gradient(circle, var(--g) 0, color-mix(in srgb, var(--g) 50%, transparent) 32%, transparent 68%);
      opacity: 0.72;
      pointer-events: none;
      transition: opacity 0.6s var(--ease);
    }

    .range-glow.pulse {
      animation: glowPulse 0.6s var(--ease);
    }

    @keyframes glowPulse {
      0% { opacity: 0.55; }
      50% { opacity: 1; }
      100% { opacity: 0.72; }
    }

    /* Slots inside glow: (50.2%, 37%), (34.8%, 59.3%), (64.8%, 59.3%) */
    .slot-wrap {
      position: absolute;
      width: calc(170 * var(--w));
      height: calc(240 * var(--w));
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .slot-wrap:nth-child(2) {
      left: 50.2%;
      top: 37.0%;
    }
    .slot-wrap:nth-child(3) {
      left: 34.8%;
      top: 59.3%;
    }
    .slot-wrap:nth-child(4) {
      left: 64.8%;
      top: 59.3%;
    }

    .slot-btn {
      width: calc(48 * var(--w));
      height: calc(48 * var(--w));
      border-radius: 50%;
      background: var(--dark);
      border: 2px solid var(--cream);
      color: var(--cream);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.55s var(--ease);
      z-index: 2;
    }

    .slot-btn svg {
      width: 16px;
      height: 16px;
      stroke: currentColor;
      stroke-width: 2.2;
      stroke-linecap: round;
    }

    .slot-bar {
      position: absolute;
      width: calc(92 * var(--w));
      height: calc(194 * var(--w));
      filter: drop-shadow(0 10px calc(14 * var(--w)) rgba(0,0,0,0.3));
      transform: translateY(-40px) scale(0.8);
      opacity: 0;
      transition: transform 0.55s var(--ease), opacity 0.55s var(--ease);
      z-index: 1;
    }

    .slot-wrap.filled .slot-bar {
      transform: translateY(0) scale(1);
      opacity: 1;
    }

    .slot-wrap.filled .slot-btn {
      transform: translateY(calc(-108 * var(--w))) scale(0.85);
    }

    /* Thumbnails Row */
    .range-thumbs {
      display: flex;
      gap: calc(24 * var(--w));
      margin-top: calc(36 * var(--w));
      align-items: center;
      max-width: calc(660 * var(--w));
    }

    .thumb-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      user-select: none;
    }

    .thumb-box {
      position: relative;
      width: calc(107 * var(--w));
      height: calc(107 * var(--w));
      border-radius: calc(14 * var(--w));
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s var(--ease);
    }

    .thumb-box:hover {
      transform: translateY(-4px);
    }

    .thumb-box .spr {
      width: calc(36 * var(--w));
      height: calc(76 * var(--w));
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.25));
    }

    .thumb-badge {
      position: absolute;
      top: 6px;
      right: 6px;
      width: calc(24 * var(--w));
      height: calc(24 * var(--w));
      border-radius: 50%;
      background: var(--dark);
      border: 1.5px solid var(--cream);
      color: var(--cream);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'DM Mono', monospace;
      font-size: calc(11 * var(--w));
      font-weight: 500;
      opacity: 0;
      transform: scale(0.7);
      transition: opacity 0.2s, transform 0.2s;
    }

    .thumb-badge.active {
      opacity: 1;
      transform: scale(1);
    }

    .thumb-name {
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      font-size: calc(11 * var(--w));
      text-transform: uppercase;
      color: var(--cream);
      text-align: center;
    }

    /* Buy Button (#buy) */
    #buy {
      margin-top: calc(32 * var(--w));
      height: calc(54 * var(--w));
      min-height: 44px;
      padding: 0 calc(32 * var(--w));
      border-radius: 99px;
      background: var(--cream);
      color: var(--dark);
      border: none;
      font-family: 'Inter', sans-serif;
      font-size: calc(16 * var(--w));
      min-font-size: 14px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      opacity: 0.38;
      transition: opacity 0.3s var(--ease), background 0.3s, transform 0.2s;
    }

    #buy.ready {
      opacity: 1;
    }

    #buy.ready:hover {
      transform: scale(1.03);
    }

    #buy.added {
      background: #8fa8a3 !important;
      color: var(--ink) !important;
      opacity: 1 !important;
    }

    .buy-price {
      font-family: 'DM Mono', monospace;
      font-weight: 500;
      opacity: 0.7;
    }

    /* Flying Bar Clones (z-index 70) */
    .flying-bar {
      position: fixed;
      z-index: 70;
      pointer-events: none;
      filter: drop-shadow(0 10px 14px rgba(0, 0, 0, 0.25));
    }

    /* RESPONSIVE DESIGN (< 820px) */
    @media (max-width: 819px) {
      #nav {
        height: 64px;
        padding: 0 20px;
      }
      .nav-chip {
        display: none;
      }
      .nav-center-pill {
        display: none;
      }

      /* Mobile Bottom Bar Nav */
      #mobilePillNav {
        display: flex;
        position: fixed;
        bottom: calc(14px + env(safe-area-inset-bottom, 0px));
        left: 50%;
        transform: translateX(-50%);
        z-index: 50;
        background: rgba(255, 255, 255, 0.55);
        border: 1.5px solid rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-radius: 99px;
        padding: 4px;
        gap: 4px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.1);
      }

      .mobile-link {
        height: 34px;
        padding: 0 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 99px;
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        font-weight: 500;
        color: var(--ink);
        text-decoration: none;
        transition: background 0.2s, font-weight 0.2s;
      }

      .mobile-link.active {
        background: #ffffff;
        font-weight: 600;
      }

      /* Hero Mobile */
      #title {
        top: auto;
        bottom: calc(120px + env(safe-area-inset-bottom, 0px));
        font-size: clamp(40px, 12.5vw, 64px);
        white-space: normal;
        width: calc(100vw - 36px);
      }

      #count {
        top: 76px;
        right: 14px;
        font-size: 56px;
      }

      #auto {
        top: 142px;
        right: 16px;
      }

      #play {
        top: auto;
        bottom: calc(230px + env(safe-area-inset-bottom, 0px));
        width: 48px;
        height: 48px;
      }

      .rings {
        width: 1500px;
        height: 1500px;
        background: repeating-radial-gradient(circle, rgba(255,255,255,.13) 0, rgba(255,255,255,.02) 30px, rgba(255,255,255,.13) 60px);
      }

      /* Floating bits on phone: bits 1, 3, 4 hidden; bits 0 and 2 1.3x */
      .floating-bit[data-idx="1"],
      .floating-bit[data-idx="3"],
      .floating-bit[data-idx="4"] {
        display: none !important;
      }

      .floating-bit[data-idx="0"],
      .floating-bit[data-idx="2"] {
        transform: scale(1.3) !important;
      }

      /* Section 2 Mobile: 390 x 780 frame */
      .in-back-frame, .in-front-frame {
        width: 390px;
        height: 780px;
      }

      .in-head {
        left: 16px;
        top: 84px;
        font-size: 40px;
      }

      .in-num {
        left: 0;
        top: 250px;
        width: 390px;
        font-size: 210px;
      }

      #inBar {
        left: 115px;
        top: 200px;
        width: 160px;
        height: 336px;
      }

      .in-icons {
        left: 50%;
        top: auto;
        bottom: 118px;
        transform: translateX(-50%);
        flex-direction: row;
        gap: 8px;
      }

      .in-icon-btn {
        width: 52px;
        height: 52px;
      }

      .in-cap {
        left: 0;
        right: 0;
        top: auto;
        bottom: 80px;
        text-align: center;
        font-size: 11.5px;
      }

      /* Section 3 Mobile: Horizontal Snap Strip */
      #shop {
        padding: 60px 20px 80px;
      }

      .shop-head {
        font-size: 62px;
      }

      .shop-cap {
        position: static;
        margin-top: 16px;
        font-size: 13.5px;
        transform: none;
        opacity: 1;
      }

      .shop-grid {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        padding-bottom: 20px;
        margin-top: 24px;
        gap: 16px;
        scrollbar-width: none;
      }
      .shop-grid::-webkit-scrollbar {
        display: none;
      }

      .card {
        flex: 0 0 68vw;
        max-width: 300px;
        height: min(108vw, 440px);
        scroll-snap-align: center;
        border-radius: 18px;
      }

      .card .pk {
        width: 31%;
        height: 60%;
        top: 28%;
      }

      .card-add {
        width: 44px;
        height: 44px;
        bottom: 16px;
        right: 16px;
      }

      /* Section 4 Mobile */
      #range {
        padding: 60px 20px 100px;
      }

      .range-head {
        font-size: 44px;
        max-width: 100%;
      }

      .pack-pill {
        width: 46px;
        height: 44px;
        border-radius: 10px;
      }

      .range-stage {
        position: relative;
        left: 0;
        top: 0;
        width: min(100%, 360px);
        height: min(100%, 360px);
        margin: 30px auto;
      }

      .slot-wrap {
        width: 90px;
        height: 130px;
      }

      .slot-bar {
        width: 52px;
        height: 110px;
      }

      .range-thumbs {
        width: 100%;
        max-width: 100%;
        justify-content: space-between;
        gap: 0;
      }

      .thumb-item {
        width: 18.4%;
      }

      .thumb-box {
        width: 100%;
        aspect-ratio: 1;
        height: auto;
      }

      .thumb-box .spr {
        width: 40%;
        height: 75%;
      }

      #buy {
        width: 100%;
        justify-content: center;
      }
    }

    /* Screens <= 359px */
    @media (max-width: 359px) {
      .brand-wordmark {
        display: none;
      }
      .mobile-link {
        padding: 0 11px;
        font-size: 13px;
      }
      .thumb-name {
        font-size: 8px;
      }
      .range-head {
        font-size: 40px;
      }
      .range-stage {
        width: 88vw;
        height: 88vw;
      }
    }

    /* Phone Landscape */
    @media (max-height: 480px) and (orientation: landscape) {
      #title {
        bottom: 12px;
        font-size: 36px;
      }
      #play {
        top: calc(50% + 80px);
      }
      #count {
        font-size: 40px;
      }
    }

    /* Desktop Short (>= 820px, <= 560px) */
    @media (min-width: 820px) and (max-height: 560px) {
      #count {
        top: 72px;
        right: 24px;
        font-size: 52px;
      }
      #auto {
        top: 136px;
        right: 26px;
      }
    }

    /* REDUCED MOTION */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001ms !important;
      }
      .floating-bit {
        opacity: 0.55 !important;
        transform: none !important;
      }
      .storm-piece {
        display: none !important;
      }
      #intro {
        display: none !important;
      }
    }
  </style>
</head>
<body class="locked gl">

  <!-- Fixed WebGL Canvas -->
  <canvas id="gl"></canvas>

  <!-- Intro Layer (z-index 100) -->
  <div id="intro">
    <video id="introVid" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261116_131908_b6239896-c077-450c-ad91-575153973fcf.mp4" playsinline muted preload="auto"></video>
    <button id="skipBtn" type="button">Skip intro</button>
    <div id="introStamp">
      <div class="stamp-inner" id="stampInner">
        <div class="stamp-circle">
          <svg width="60" height="60" viewBox="0 0 36 36">
            <path d="M7 25 L15 13 L20 19 L25 10 L29 25 Z" fill="none" stroke="#f0e8e0" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13 25 L17 19 L21 25" fill="none" stroke="#f0e8e0" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="stamp-text">STRIDE</div>
      </div>
    </div>
  </div>

  <!-- Navigation (z-index 50) -->
  <header id="nav">
    <a href="#flavors" class="nav-brand">
      <div class="brand-mark">
        <svg width="22" height="22" viewBox="0 0 36 36">
          <path d="M7 25 L15 13 L20 19 L25 10 L29 25 Z" fill="none" stroke="#f0e8e0" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13 25 L17 19 L21 25" fill="none" stroke="#f0e8e0" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </div>
      <span class="brand-wordmark">STRIDE</span>
    </a>

    <nav class="nav-center-pill" id="navCenterPill">
      <div class="pill-highlight" id="pillHighlight"></div>
      <a href="#flavors" class="nav-link active" data-index="0">Flavors</a>
      <a href="#inside" class="nav-link" data-index="1">Inside</a>
      <a href="#shop" class="nav-link" data-index="2">Shop</a>
      <a href="#range" class="nav-link" data-index="3">Range</a>
    </nav>

    <div class="nav-right">
      <div class="nav-chip">% OFF</div>
      <div class="nav-basket" id="navBasket" aria-label="Cart">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        <span class="basket-badge" id="basketBadge">0</span>
      </div>
      <a href="#range" class="nav-cta">First dibs</a>
    </div>
  </header>

  <!-- Mobile Bottom Nav -->
  <nav id="mobilePillNav">
    <a href="#flavors" class="mobile-link active" data-index="0">Flavors</a>
    <a href="#inside" class="mobile-link" data-index="1">Inside</a>
    <a href="#shop" class="mobile-link" data-index="2">Shop</a>
    <a href="#range" class="mobile-link" data-index="3">Range</a>
  </nav>

  <main>
    <!-- SECTION 1 — HERO CAROUSEL (#flavors) -->
    <section id="flavors">
      <div class="reveal" id="reveal"></div>
      <div class="rings" id="rings"></div>
      <div class="bits" id="floatingBits">
        <!-- 5 floating ingredient sprites -->
        <div class="floating-bit spr spr-bit-0" data-idx="0" style="left:12%; top:20%; width:calc(120 * var(--u)); height:calc(120 * var(--u) * 305 / 340); transform:rotate(-18deg);"></div>
        <div class="floating-bit spr spr-bit-2" data-idx="1" style="left:86%; top:18%; width:calc(96 * var(--u)); height:calc(96 * var(--u) * 285 / 320); transform:rotate(22deg);"></div>
        <div class="floating-bit spr spr-bit-3" data-idx="2" style="left:7%; top:74%; width:calc(84 * var(--u)); height:calc(84 * var(--u) * 305 / 380); transform:rotate(12deg);"></div>
        <div class="floating-bit spr spr-bit-4" data-idx="3" style="left:65.5%; top:15%; width:calc(78 * var(--u)); height:calc(78 * var(--u) * 295 / 250); transform:rotate(-10deg);"></div>
        <div class="floating-bit spr spr-bit-1" data-idx="4" style="left:20.5%; top:88.5%; width:calc(70 * var(--u)); height:calc(70 * var(--u) * 255 / 280); transform:rotate(30deg);"></div>
      </div>

      <!-- Touch Swipe Arc Hit Area -->
      <div class="arc" id="arc"></div>

      <!-- Hero controls & text -->
      <button id="play" type="button" aria-label="Next flavour">
        <svg viewBox="0 0 24 24" fill="none">
          <line x1="4" y1="12" x2="18" y2="12" stroke="#1c1a1f" stroke-width="1.9" stroke-linecap="round"/>
          <polyline points="13 7 18 12 13 17" stroke="#1c1a1f" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <h1 id="title" class="disp" aria-live="polite"></h1>

      <div id="count" class="disp">02</div>

      <button id="auto" type="button" aria-pressed="true">
        <div class="auto-ring">
          <svg id="autoIcon" width="12" height="12" viewBox="0 0 24 24" fill="none">
            <rect x="7" y="6" width="3" height="12" rx="1.5" fill="#ffffff"/>
            <rect x="14" y="6" width="3" height="12" rx="1.5" fill="#ffffff"/>
          </svg>
        </div>
        <span class="auto-label">AUTOPLAY</span>
      </button>
    </section>

    <!-- SECTION 2 — "INSIDE" (#inside) -->
    <section id="inside">
      <div class="pin" id="insidePin">
        <div class="in-dark" id="inDark"></div>
        <div class="in-back-frame" id="inBackFrame">
          <div class="in-num" id="inNum">01</div>
          <div id="inBar"></div>
        </div>
      </div>
    </section>

    <!-- Section 2 Front Layer (Fixed, z-index 3) -->
    <div id="inFront">
      <div class="in-front-frame" id="inFrontFrame">
        <h2 class="in-head" id="inHead">REAL FOOD,<br>FIRST</h2>
        <div class="in-icons">
          <!-- 4 Step Icons: leaf, four grains, heart, bolt -->
          <button class="in-icon-btn active" data-step="0" aria-label="Step 1: Real Food First">
            <svg viewBox="0 0 24 24">
              <!-- Leaf -->
              <path d="M12 2C6.5 2 2 6.5 2 12c0 5 3.5 9 8 9.8V13a2 2 0 0 1 2-2h4a5.8 5.8 0 0 0 5-5c0-2-1.5-4-9-4z"/>
              <path d="M2 22l10-10"/>
            </svg>
          </button>
          <button class="in-icon-btn" data-step="1" aria-label="Step 2: Pressed Not Baked">
            <svg viewBox="0 0 24 24">
              <!-- Four grains / wheat -->
              <path d="M12 3v18"/>
              <path d="M12 7c-2-1.5-4 0-4 2 2 1.5 4 0 4-2z"/>
              <path d="M12 7c2-1.5 4 0 4 2-2 1.5-4 0-4-2z"/>
              <path d="M12 12c-2-1.5-4 0-4 2 2 1.5 4 0 4-2z"/>
              <path d="M12 12c2-1.5 4 0 4 2-2 1.5-4 0-4-2z"/>
            </svg>
          </button>
          <button class="in-icon-btn" data-step="2" aria-label="Step 3: Wrapped Same Day">
            <svg viewBox="0 0 24 24">
              <!-- Heart -->
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button class="in-icon-btn" data-step="3" aria-label="Step 4: Plant Protein">
            <svg viewBox="0 0 24 24">
              <!-- Bolt -->
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
          </button>
        </div>
        <p class="in-cap" id="inCap">OATS, NUTS, FRUIT.<br>NOTHING YOU CAN'T SAY.</p>
      </div>

      <!-- Storm 20 pieces -->
      <div class="storm" id="storm"></div>
    </div>

    <!-- SECTION 3 — GRAB A BAG (#shop) -->
    <section id="shop">
      <h2 class="shop-head" id="shopHead">
        <span class="line-wrap"><span class="line-text">GRAB</span></span>
        <span class="line-wrap"><span class="line-text">A BAG</span></span>
      </h2>
      <p class="shop-cap" id="shopCap">Five bold flavours. Same<br>real ingredients. Pick your<br>favourite (or try them all).</p>
      <div class="shop-grid" id="shopGrid">
        <!-- 5 cards rendered dynamically -->
      </div>
    </section>

    <!-- SECTION 4 — BUILD YOUR 3 PACK (#range) -->
    <section id="range">
      <h2 class="range-head" id="rangeHead">
        <span class="line-wrap"><span class="line-text">BUILD YOUR</span></span>
        <span class="line-wrap"><span class="line-text"><span class="pack-pill">3</span> PACK &amp;</span></span>
        <span class="line-wrap"><span class="line-text">SAVE $1.49</span></span>
      </h2>

      <div class="range-stage">
        <div class="range-glow" id="rangeGlow"></div>
        <!-- 3 Slots -->
        <div class="slot-wrap" data-slot="0">
          <div class="slot-bar spr"></div>
          <button class="slot-btn" type="button" aria-label="Remove bar 1">
            <svg viewBox="0 0 24 24"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
          </button>
        </div>
        <div class="slot-wrap" data-slot="1">
          <div class="slot-bar spr"></div>
          <button class="slot-btn" type="button" aria-label="Remove bar 2">
            <svg viewBox="0 0 24 24"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
          </button>
        </div>
        <div class="slot-wrap" data-slot="2">
          <div class="slot-bar spr"></div>
          <button class="slot-btn" type="button" aria-label="Remove bar 3">
            <svg viewBox="0 0 24 24"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
          </button>
        </div>
      </div>

      <div class="range-thumbs" id="rangeThumbs">
        <!-- 5 Thumbnails rendered dynamically -->
      </div>

      <button id="buy" type="button" disabled>
        <span id="buyLabel">Pick 3 more</span>
        <span class="buy-price">$7.48</span>
      </button>
    </section>
  </main>

  <!-- Application Logic & Three.js WebGL Engine -->
  <script type="module">
    import * as THREE from 'three';
    import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

    /* --- DATA CONSTANTS --- */
    const FLAVOURS = [
      {
        id: 0,
        name: "Peanut Cocoa",
        line1: "PEANUT",
        line2: "COCOA",
        box: [98, 145, 403, 849],
        color: "#b79474",
        bit: 1,
        counter: "01",
        ingredients: "Peanuts, oats, dates, cocoa, pea protein, sea salt."
      },
      {
        id: 1,
        name: "Berry Oat",
        line1: "BERRY",
        line2: "OAT",
        box: [620, 145, 402, 849],
        color: "#ab9ac4",
        bit: 0,
        counter: "02",
        ingredients: "Oats, blueberries, raspberries, dates, pea protein, almonds."
      },
      {
        id: 2,
        name: "Salted Caramel",
        line1: "SALTED",
        line2: "CARAMEL",
        box: [1137, 145, 402, 849],
        color: "#d1ad6c",
        bit: 2,
        counter: "03",
        ingredients: "Dates, cashews, oats, pea protein, sea salt, vanilla."
      },
      {
        id: 3,
        name: "Mint Chip",
        line1: "MINT",
        line2: "CHIP",
        box: [1661, 145, 402, 849],
        color: "#94bdb4",
        bit: 3,
        counter: "04",
        ingredients: "Oats, dark chocolate, almonds, pea protein, peppermint oil."
      },
      {
        id: 4,
        name: "Strawberry",
        line1: "STRAWBERRY",
        line2: "",
        box: [2184, 145, 403, 849],
        color: "#d396a7",
        bit: 4,
        counter: "05",
        ingredients: "Oats, strawberries, dates, cashews, pea protein, lemon."
      }
    ];

    const BITS = [
      { id: 0, box: [650, 1090, 340, 305], name: "blueberries and raspberry" },
      { id: 1, box: [110, 1125, 280, 255], name: "chocolate chunks and peanuts" },
      { id: 2, box: [1175, 1110, 320, 285], name: "salted caramel cube" },
      { id: 3, box: [1680, 1085, 380, 305], name: "mint leaves and dark chocolate" },
      { id: 4, box: [2280, 1095, 250, 295], name: "half strawberry" }
    ];

    const IN_STEPS = [
      { num: '01', head: 'REAL FOOD,<br>FIRST', cap: "OATS, NUTS, FRUIT.<br>NOTHING YOU CAN'T SAY.", ry: 0 },
      { num: '02', head: 'PRESSED,<br>NOT BAKED', cap: 'REAL INGREDIENTS.<br>CLEAN ENERGY.', ry: 180 },
      { num: '03', head: 'WRAPPED<br>SAME DAY', cap: 'COLD-PRESSED AT DAWN.<br>SEALED BY NOON.', ry: 360 },
      { num: '04', head: '', cap: '12G PLANT PROTEIN.<br>NO CRASH.', ry: 720 }
    ];

    /* --- UTILITIES --- */
    const clamp = (val, min = 0, max = 1) => Math.max(min, Math.min(max, val));
    const lerp = (a, b, t) => a + (b - a) * t;

    function hexToRgb(hex) {
      const bigint = parseInt(hex.replace('#', ''), 16);
      return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
    }

    function mixRgb(hex1, hex2, t) {
      const c1 = hexToRgb(hex1);
      const c2 = hexToRgb(hex2);
      const r = Math.round(c1.r * (1 - t) + c2.r * t);
      const g = Math.round(c1.g * (1 - t) + c2.g * t);
      const b = Math.round(c1.b * (1 - t) + c2.b * t);
      return \`rgb(\${r},\${g},\${b})\`;
    }

    function solveCubicBezier(p1x, p1y, p2x, p2y) {
      const cx = 3 * p1x;
      const bx = 3 * (p2x - p1x) - cx;
      const ax = 1 - cx - bx;
      const cy = 3 * p1y;
      const by = 3 * (p2y - p1y) - cy;
      const ay = 1 - cy - by;

      function sampleX(t) { return ((ax * t + bx) * t + cx) * t; }
      function sampleY(t) { return ((ay * t + by) * t + cy) * t; }
      function sampleDerivX(t) { return (3 * ax * t + 2 * bx) * t + cx; }

      return function(x) {
        let t = x;
        for (let i = 0; i < 8; i++) {
          const currentX = sampleX(t) - x;
          if (Math.abs(currentX) < 1e-5) return sampleY(t);
          const d = sampleDerivX(t);
          if (Math.abs(d) < 1e-6) break;
          t -= currentX / d;
        }
        let t0 = 0, t1 = 1;
        t = x;
        while (t0 < t1) {
          const currentX = sampleX(t);
          if (Math.abs(currentX - x) < 1e-5) return sampleY(t);
          if (x > currentX) t0 = t;
          else t1 = t;
          t = (t1 + t0) * 0.5;
        }
        return sampleY(t);
      };
    }

    const easeGlide = solveCubicBezier(0.25, 0.75, 0.2, 1.0);
    const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

    /* Reduced Motion & Touch Detection */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

    /* --- DOM ELEMENTS --- */
    const introEl = document.getElementById('intro');
    const introVid = document.getElementById('introVid');
    const skipBtn = document.getElementById('skipBtn');
    const introStamp = document.getElementById('introStamp');
    const stampInner = document.getElementById('stampInner');

    const navEl = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const pillHighlight = document.getElementById('pillHighlight');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navBasket = document.getElementById('navBasket');
    const basketBadge = document.getElementById('basketBadge');

    const heroSection = document.getElementById('flavors');
    const revealEl = document.getElementById('reveal');
    const ringsEl = document.getElementById('rings');
    const arcEl = document.getElementById('arc');
    const titleEl = document.getElementById('title');
    const countEl = document.getElementById('count');
    const playBtn = document.getElementById('play');
    const autoBtn = document.getElementById('auto');
    const autoIcon = document.getElementById('autoIcon');

    const insideSection = document.getElementById('inside');
    const insidePin = document.getElementById('insidePin');
    const inDarkEl = document.getElementById('inDark');
    const inBackFrame = document.getElementById('inBackFrame');
    const inFrontEl = document.getElementById('inFront');
    const inFrontFrame = document.getElementById('inFrontFrame');
    const inNumEl = document.getElementById('inNum');
    const inBarEl = document.getElementById('inBar');
    const inHeadEl = document.getElementById('inHead');
    const inCapEl = document.getElementById('inCap');
    const inIconBtns = document.querySelectorAll('.in-icon-btn');
    const stormContainer = document.getElementById('storm');

    const shopSection = document.getElementById('shop');
    const shopHead = document.getElementById('shopHead');
    const shopCap = document.getElementById('shopCap');
    const shopGrid = document.getElementById('shopGrid');

    const rangeSection = document.getElementById('range');
    const rangeHead = document.getElementById('rangeHead');
    const rangeGlow = document.getElementById('rangeGlow');
    const slotWraps = document.querySelectorAll('.slot-wrap');
    const rangeThumbs = document.getElementById('rangeThumbs');
    const buyBtn = document.getElementById('buy');
    const buyLabel = document.getElementById('buyLabel');

    /* --- STATE --- */
    let target = 1; // Starting at Berry Oat (index 1)
    let pos = -2.6; // Will tween to 1 on hero entrance
    let activeFlavIndex = 1;
    let autoplayActive = !prefersReducedMotion;
    let lastInteraction = performance.now();
    let hasEnteredHero = false;

    // Glide slide tween
    let slideTween = null;
    let colorReveal = null;

    // Dragging
    let isDragging = false;
    let dragStartX = 0;
    let dragStartPos = 0;
    let dragVelocity = 0;
    let lastPointerX = 0;
    let lastPointerTime = 0;

    // Smooth Scrolling
    let smoothScrollTarget = window.scrollY;
    let isSmoothScrolling = false;

    // Section 2 flip tween
    let currentInStep = 0;
    let currentFlipAngle = 0;
    let flipTween = null;
    let stormSpinAngle = 0;

    // Shop Card State
    let cardTilts = [ {x:0, y:0}, {x:0, y:0}, {x:0, y:0}, {x:0, y:0}, {x:0, y:0} ];
    let cardSquashes = [ {sx:1, sy:1}, {sx:1, sy:1}, {sx:1, sy:1}, {sx:1, sy:1}, {sx:1, sy:1} ];
    let hasCenteredShopCard = false;

    // Section 4 3-Pack State
    let packSlots = [null, null, null];
    let hasInitializedPack = false;
    let cartCount = 0;

    /* Measure title width helper */
    const measureCanvas = document.createElement('canvas');
    const measureCtx = measureCanvas.getContext('2d');

    function updateTitleSize(name) {
      measureCtx.font = '100px "Archivo Black"';
      const w = measureCtx.measureText(name).width || 400;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const u = Math.min(vw / 1440, vh / 900);
      
      if (vw < 820) {
        const words = name.split(' ');
        let maxW = 0;
        words.forEach(wd => {
          const wdW = measureCtx.measureText(wd).width;
          if (wdW > maxW) maxW = wdW;
        });
        const sz = Math.min(Math.max(40, Math.min(vw * 0.125, 64)), ((vw - 36) * 100) / (maxW || 300));
        titleEl.style.fontSize = \`\${sz}px\`;
      } else {
        const sz = Math.min(96 * u, (760 * u * 100) / w);
        titleEl.style.fontSize = \`\${sz}px\`;
      }
    }

    function renderTitle(name, animate = false, dir = 1) {
      updateTitleSize(name);
      const words = name.split(' ');
      
      if (!animate || prefersReducedMotion) {
        titleEl.innerHTML = words.map(w => 
          \`<span class="word">\${w.split('').map(c => \`<span class="char">\${c}</span>\`).join('')}</span>\`
        ).join('');
        return;
      }

      // Staggered letter-rise with fade transition
      const oldChars = titleEl.querySelectorAll('.char');
      oldChars.forEach((ch, idx) => {
        ch.animate([
          { transform: 'translateY(0)', opacity: 1 },
          { transform: \`translateY(\${dir > 0 ? -110 : 110}%)\`, opacity: 0 }
        ], {
          duration: 300,
          delay: idx * 11,
          easing: 'cubic-bezier(.45,0,.75,.3)',
          fill: 'forwards'
        });
      });

      setTimeout(() => {
        titleEl.innerHTML = words.map(w => 
          \`<span class="word">\${w.split('').map(c => \`<span class="char" style="opacity:0; transform:translateY(\${dir > 0 ? 110 : -110}%)">\${c}</span>\`).join('')}</span>\`
        ).join('');

        const newChars = titleEl.querySelectorAll('.char');
        newChars.forEach((ch, idx) => {
          ch.animate([
            { transform: \`translateY(\${dir > 0 ? 110 : -110}%)\`, opacity: 0 },
            { transform: 'translateY(0)', opacity: 1 }
          ], {
            duration: 620,
            delay: 120 + idx * 22,
            easing: 'cubic-bezier(.22,1,.36,1)',
            fill: 'forwards'
          });
        });
      }, 200);
    }

    function crossfadeCounter(newNum) {
      if (prefersReducedMotion) {
        countEl.textContent = newNum;
        return;
      }
      countEl.animate([
        { transform: 'translateY(0)', opacity: 1 },
        { transform: 'translateY(-10px)', opacity: 0 }
      ], {
        duration: 220,
        easing: 'cubic-bezier(.5,0,.75,0)',
        fill: 'forwards'
      });

      setTimeout(() => {
        countEl.textContent = newNum;
        countEl.animate([
          { transform: 'translateY(14px)', opacity: 0 },
          { transform: 'translateY(0)', opacity: 1 }
        ], {
          duration: 380,
          easing: 'cubic-bezier(.22,1,.36,1)',
          fill: 'forwards'
        });
      }, 280);
    }

    /* --- THREE.JS ENGINE SETUP --- */
    const canvas = document.getElementById('gl');
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;

    function updatePixelRatio() {
      const dpr = window.innerWidth < 820 ? 1.75 : Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
    }
    updatePixelRatio();

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.1);
    keyLight.position.set(-0.6, 0.9, 1.4);
    scene.add(keyLight);

    let camera;
    function updateCamera() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      renderer.setSize(vw, vh);

      const D = clamp(1500 * Math.min(vw / 1440, vh / 900), 1000, 2200);
      const fov = 2 * Math.atan((vh / 2) / D) * (180 / Math.PI);
      
      if (!camera) {
        camera = new THREE.PerspectiveCamera(fov, vw / vh, 10, 4 * D);
        camera.position.set(0, 0, D);
        camera.lookAt(0, 0, 0);
      } else {
        camera.fov = fov;
        camera.aspect = vw / vh;
        camera.near = 10;
        camera.far = 4 * D;
        camera.position.set(0, 0, D);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
      }
    }
    updateCamera();

    /* Geometry generation */
    const BH = (849 + 8) / (403 + 8); // ≈ 2.085158
    const CR = 0.062;

    function createBarGeometries() {
      const frontGeom = new THREE.PlaneGeometry(1, BH, 30, 64);
      const backGeom = new THREE.PlaneGeometry(1, BH, 30, 64);

      function deform(geom, isBack) {
        const posAttr = geom.attributes.position;
        const uvAttr = geom.attributes.uv;

        for (let i = 0; i < posAttr.count; i++) {
          let u = uvAttr.getX(i);
          let v = uvAttr.getY(i);
          if (isBack) {
            u = 1 - u;
            uvAttr.setX(i, u);
          }

          const ex = Math.abs(2 * u - 1);
          const ev = Math.min(v, 1 - v);
          let z = 0;

          if (ev < CR) {
            z = 0.006 + 0.006 * Math.abs(Math.sin(u * Math.PI * 34));
          } else {
            const across = Math.pow(Math.max(0, 1 - Math.pow(ex, 2.6)), 0.62);
            const along = Math.pow(clamp((ev - CR) / 0.11, 0, 1), 0.7);
            z = 0.012 + 0.118 * across * along + 0.004 * Math.sin(23 * u + 31 * v) * across;
          }

          posAttr.setZ(i, isBack ? -z : z);
        }
        posAttr.needsUpdate = true;
        uvAttr.needsUpdate = true;

        if (isBack && geom.index) {
          const idx = geom.index.array;
          for (let j = 0; j < idx.length; j += 3) {
            const tmp = idx[j + 1];
            idx[j + 1] = idx[j + 2];
            idx[j + 2] = tmp;
          }
          geom.index.needsUpdate = true;
        }

        geom.computeVertexNormals();
      }

      deform(frontGeom, false);
      deform(backGeom, true);

      return { frontGeom, backGeom };
    }

    const { frontGeom, backGeom } = createBarGeometries();

    /* Contact Shadow Plane */
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    const sGrad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    sGrad.addColorStop(0, 'rgba(30,18,40,0.55)');
    sGrad.addColorStop(0.5, 'rgba(30,18,40,0.35)');
    sGrad.addColorStop(1, 'rgba(30,18,40,0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;
    const shadowGeom = new THREE.PlaneGeometry(1.25, 1.04 * BH);

    /* Textures per flavour */
    const frontTextures = [];
    const backTextures = [];

    async function buildTextures(sheetImg) {
      const scale = sheetImg.naturalWidth ? (sheetImg.naturalWidth / 2688) : (2200 / 2688);

      for (let i = 0; i < FLAVOURS.length; i++) {
        const flav = FLAVOURS[i];
        const [bx, by, bw, bh] = flav.box;
        const W = Math.round((bw + 8) * 1.5 * 0.75);
        const H = Math.round(W * BH);

        // 1. FRONT TEXTURE
        const fCanvas = document.createElement('canvas');
        fCanvas.width = W;
        fCanvas.height = H;
        const fCtx = fCanvas.getContext('2d');

        const sx = (bx - 4) * scale;
        const sy = (by - 4) * scale;
        const sw = (bw + 8) * scale;
        const sh = (bh + 8) * scale;
        fCtx.drawImage(sheetImg, sx, sy, sw, sh, 0, 0, W, H);

        const fTex = new THREE.CanvasTexture(fCanvas);
        fTex.colorSpace = THREE.SRGBColorSpace;
        fTex.anisotropy = 8;
        frontTextures.push(fTex);

        // 2. BACK TEXTURE
        const bCanvas = document.createElement('canvas');
        bCanvas.width = W;
        bCanvas.height = H;
        const bCtx = bCanvas.getContext('2d');

        // Draw crop mirrored horizontally
        bCtx.save();
        bCtx.translate(W, 0);
        bCtx.scale(-1, 1);
        bCtx.drawImage(sheetImg, sx, sy, sw, sh, 0, 0, W, H);
        bCtx.restore();

        // Fill body and seals with source-atop
        bCtx.globalCompositeOperation = 'source-atop';
        bCtx.fillStyle = flav.color;
        bCtx.globalAlpha = 0.9;
        bCtx.fillRect(0, 0.075 * H, W, (1 - 0.15) * H);

        bCtx.globalAlpha = 0.35;
        bCtx.fillRect(0, 0, W, 0.075 * H);
        bCtx.fillRect(0, 0.925 * H, W, 0.075 * H);

        // Horizontal sheen gradient
        const sheen = bCtx.createLinearGradient(0, 0, W, 0);
        sheen.addColorStop(0, 'rgba(0,0,0,0.10)');
        sheen.addColorStop(0.28, 'rgba(255,255,255,0.14)');
        sheen.addColorStop(0.5, 'transparent');
        sheen.addColorStop(0.8, 'rgba(0,0,0,0.04)');
        sheen.addColorStop(1, 'rgba(0,0,0,0.14)');
        bCtx.fillStyle = sheen;
        bCtx.globalAlpha = 1.0;
        bCtx.fillRect(0, 0.075 * H, W, (1 - 0.15) * H);

        // Draw text and panels with source-over
        bCtx.globalCompositeOperation = 'source-over';
        const ink = mixRgb(flav.color, '#1c1a1f', 0.78);

        // "STRIDE" in Archivo Black at 0.085W, centred at 15% H
        bCtx.font = \`400 \${Math.round(0.085 * W)}px "Archivo Black"\`;
        bCtx.fillStyle = ink;
        bCtx.textAlign = 'center';
        bCtx.textBaseline = 'middle';
        bCtx.fillText('STRIDE', W / 2, 0.15 * H);

        // "<FLAVOUR> · 50 G" in DM Mono 500 at 0.042W, at 18.5% H
        bCtx.font = \`500 \${Math.round(0.042 * W)}px "DM Mono"\`;
        bCtx.fillText(\`\${flav.name.toUpperCase()} · 50 G\`, W / 2, 0.185 * H);

        // Nutrition panel: white rounded rectangle at 92% opacity
        const npx = 0.15 * W;
        const npy = 0.215 * H;
        const npw = 0.70 * W;
        const nph = 0.360 * H;
        const npr = 0.03 * W;

        bCtx.fillStyle = 'rgba(255, 255, 255, 0.92)';
        bCtx.beginPath();
        bCtx.roundRect(npx, npy, npw, nph, npr);
        bCtx.fill();

        // Nutrition Panel Contents
        bCtx.fillStyle = ink;
        bCtx.textAlign = 'left';
        bCtx.font = \`400 \${Math.round(0.058 * W)}px "Archivo Black"\`;
        bCtx.fillText('NUTRITION', npx + 0.06 * npw, npy + 0.09 * nph);

        bCtx.font = \`400 \${Math.round(0.032 * W)}px "DM Mono"\`;
        bCtx.fillText('Serving size 1 bar (50 g)', npx + 0.06 * npw, npy + 0.16 * nph);

        // Solid rule
        bCtx.beginPath();
        bCtx.moveTo(npx + 0.06 * npw, npy + 0.21 * nph);
        bCtx.lineTo(npx + 0.94 * npw, npy + 0.21 * nph);
        bCtx.strokeStyle = ink;
        bCtx.lineWidth = 1.2;
        bCtx.stroke();

        // 7 Rows
        const rows = [
          { l: 'Calories', v: '210', wt: '500' },
          { l: 'Protein', v: '12 g', wt: '500' },
          { l: 'Total fat', v: '9 g', wt: '400' },
          { l: 'Carbohydrate', v: '22 g', wt: '400' },
          { l: 'Fibre', v: '6 g', wt: '400' },
          { l: 'Sugars', v: '8 g', wt: '400' },
          { l: 'Salt', v: '0.2 g', wt: '400' }
        ];

        let curRowY = npy + 0.28 * nph;
        rows.forEach(r => {
          bCtx.font = \`\${r.wt} \${Math.round(0.031 * W)}px "DM Mono"\`;
          bCtx.textAlign = 'left';
          bCtx.fillText(r.l, npx + 0.06 * npw, curRowY);
          bCtx.textAlign = 'right';
          bCtx.fillText(r.v, npx + 0.94 * npw, curRowY);

          // Hairline
          bCtx.beginPath();
          bCtx.moveTo(npx + 0.06 * npw, curRowY + 0.015 * H);
          bCtx.lineTo(npx + 0.94 * npw, curRowY + 0.015 * H);
          bCtx.strokeStyle = 'rgba(28,26,31,0.18)';
          bCtx.lineWidth = 0.8;
          bCtx.stroke();

          curRowY += 0.034 * H;
        });

        // "INGREDIENTS" in DM Mono 500 at 62% H
        bCtx.font = \`500 \${Math.round(0.034 * W)}px "DM Mono"\`;
        bCtx.textAlign = 'left';
        bCtx.fillText('INGREDIENTS', npx, 0.62 * H);

        // Ingredient list wrapped to 70% width
        bCtx.font = \`400 \${Math.round(0.034 * W)}px "DM Mono"\`;
        const ingWords = flav.ingredients.split(' ');
        let ingLine = '';
        let ingY = 0.655 * H;
        const maxIngW = 0.70 * W;

        for (let n = 0; n < ingWords.length; n++) {
          const testLine = ingLine + ingWords[n] + ' ';
          const testW = bCtx.measureText(testLine).width;
          if (testW > maxIngW && n > 0) {
            bCtx.fillText(ingLine.trim(), npx, ingY);
            ingLine = ingWords[n] + ' ';
            ingY += 0.022 * H;
          } else {
            ingLine = testLine;
          }
        }
        bCtx.fillText(ingLine.trim(), npx, ingY);

        // Barcode on white card at 73.5% H
        const bcY = 0.735 * H;
        const bcW = 0.56 * W;
        const bcH = 0.09 * H;
        const bcX = (W - bcW) / 2;

        bCtx.fillStyle = '#ffffff';
        bCtx.beginPath();
        bCtx.roundRect(bcX, bcY, bcW, bcH, 0.02 * W);
        bCtx.fill();

        // Seeded random vertical bars
        bCtx.fillStyle = '#1c1a1f';
        let barX = bcX + 0.05 * bcW;
        const barEndX = bcX + 0.95 * bcW;
        let seed = (i + 1) * 98765;
        function rnd() {
          seed = (seed * 9301 + 49297) % 233280;
          return seed / 233280;
        }

        while (barX < barEndX) {
          const bw = 1.5 + rnd() * 3.5;
          const space = 1.5 + rnd() * 3.5;
          bCtx.fillRect(barX, bcY + 0.08 * bcH, bw, 0.58 * bcH);
          barX += bw + space;
        }

        bCtx.font = \`400 \${Math.round(0.024 * W)}px "DM Mono"\`;
        bCtx.textAlign = 'center';
        bCtx.fillText('5  060123  456789', W / 2, bcY + 0.88 * bcH);

        // "PRESSED, NOT BAKED" in DM Mono 500 at 88.5% H
        bCtx.font = \`500 \${Math.round(0.038 * W)}px "DM Mono"\`;
        bCtx.textAlign = 'center';
        bCtx.fillText('PRESSED, NOT BAKED', W / 2, 0.885 * H);

        const bTex = new THREE.CanvasTexture(bCanvas);
        bTex.colorSpace = THREE.SRGBColorSpace;
        bTex.anisotropy = 8;
        backTextures.push(bTex);
      }
    }

    /* Bar Mesh Factory */
    function createBarItem() {
      const group = new THREE.Group();
      group.rotation.order = 'ZYX';

      const frontMat = new THREE.MeshPhysicalMaterial({
        map: frontTextures[1],
        transparent: true,
        alphaTest: 0.5,
        roughness: 0.45,
        metalness: 0,
        clearcoat: 0.5,
        clearcoatRoughness: 0.32,
        envMapIntensity: 0.42
      });

      const backMat = new THREE.MeshPhysicalMaterial({
        map: backTextures[1],
        transparent: true,
        alphaTest: 0.5,
        roughness: 0.45,
        metalness: 0,
        clearcoat: 0.5,
        clearcoatRoughness: 0.32,
        envMapIntensity: 0.42
      });

      const frontMesh = new THREE.Mesh(frontGeom, frontMat);
      const backMesh = new THREE.Mesh(backGeom, backMat);
      group.add(frontMesh);
      group.add(backMesh);

      const shadowMat = new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        depthWrite: false
      });
      const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
      shadowMesh.renderOrder = -1;
      scene.add(shadowMesh);

      scene.add(group);

      return {
        group,
        frontMesh,
        backMesh,
        shadowMesh,
        frontMat,
        backMat,
        shadowMat,
        flavIndex: -1
      };
    }

    let travellerBar;
    const poolBars = [];

    function setBarFlavour(bar, fIdx) {
      if (bar.flavIndex === fIdx) return;
      bar.flavIndex = fIdx;
      bar.frontMat.map = frontTextures[fIdx];
      bar.backMat.map = backTextures[fIdx];
      bar.frontMat.needsUpdate = true;
      bar.backMat.needsUpdate = true;
    }

    function placeBar(bar, state) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const { x, y, h, rz, ry, rx, z, op, sx, sy, shadow } = state;

      if (op <= 0.01 || h <= 0) {
        bar.group.visible = false;
        bar.shadowMesh.visible = false;
        return;
      }

      bar.group.visible = true;
      bar.shadowMesh.visible = (shadow > 0.01);

      // World units = CSS px at z=0
      bar.group.position.set(x - vw / 2, vh / 2 - y, z || 0);
      const s = h / BH;
      bar.group.scale.set(s * (sx ?? 1), s * (sy ?? 1), s);

      const radX = (rx || 0) * Math.PI / 180;
      const radY = (ry || 0) * Math.PI / 180;
      const radZ = -(rz || 0) * Math.PI / 180;
      bar.group.rotation.set(radX, radY, radZ);

      bar.frontMat.opacity = op;
      bar.backMat.opacity = op;

      // Shadow placement
      if (bar.shadowMesh.visible) {
        bar.shadowMesh.position.set(
          x - vw / 2,
          vh / 2 - y - 0.05 * h,
          (z || 0) - 0.32 * h
        );
        bar.shadowMesh.rotation.set(0, 0, radZ);
        bar.shadowMesh.scale.set(
          s * Math.max(0.3, Math.abs(Math.cos(radY))),
          s,
          1
        );
        bar.shadowMat.opacity = 0.5 * op * (shadow ?? 1);
      }
    }

    /* Arc Slot Calculations */
    function getArcSlot(k, u, cx, cy, xSpread = 1.0) {
      const sign = k < 0 ? -1 : 1;
      const ak = Math.min(Math.abs(k), 4);
      const slots = [
        { dx: 0, dy: 0, h: 430, rz: 0, ry: 0 },
        { dx: 245, dy: 24, h: 330, rz: 4, ry: 16 },
        { dx: 452, dy: 44, h: 312, rz: 8, ry: 26 },
        { dx: 660, dy: 80, h: 296, rz: 12, ry: 34 },
        { dx: 860, dy: 118, h: 280, rz: 15, ry: 40 }
      ];

      const i0 = Math.floor(ak);
      const i1 = Math.min(i0 + 1, 4);
      const frac = ak - i0;

      const dx = (slots[i0].dx + (slots[i1].dx - slots[i0].dx) * frac) * sign * xSpread * u;
      const dy = (slots[i0].dy + (slots[i1].dy - slots[i0].dy) * frac) * u;
      const h = (slots[i0].h + (slots[i1].h - slots[i0].h) * frac) * u;
      const rz = (slots[i0].rz + (slots[i1].rz - slots[i0].rz) * frac) * sign;
      const ry = (slots[i0].ry + (slots[i1].ry - slots[i0].ry) * frac) * sign;
      const z = -ak * 34 * u;

      let op = 1;
      if (ak > 3.3) {
        op = clamp((3.9 - ak) / (3.9 - 3.3), 0, 1);
      }

      return {
        x: cx + dx,
        y: cy + dy,
        h,
        rz,
        ry,
        rx: 0,
        z,
        op,
        sx: 1,
        sy: 1,
        shadow: 1
      };
    }

    function lerpState(s1, s2, t) {
      return {
        x: lerp(s1.x, s2.x, t),
        y: lerp(s1.y, s2.y, t),
        h: lerp(s1.h, s2.h, t),
        rz: lerp(s1.rz, s2.rz, t),
        ry: lerp(s1.ry, s2.ry, t),
        rx: lerp(s1.rx || 0, s2.rx || 0, t),
        z: lerp(s1.z, s2.z, t),
        op: lerp(s1.op, s2.op, t),
        sx: lerp(s1.sx ?? 1, s2.sx ?? 1, t),
        sy: lerp(s1.sy ?? 1, s2.sy ?? 1, t),
        shadow: lerp(s1.shadow ?? 1, s2.shadow ?? 1, t)
      };
    }

    /* --- GO TO TARGET & TRANSITIONS --- */
    function goTo(newTarget, customDuration = null) {
      if (prefersReducedMotion) {
        target = newTarget;
        pos = newTarget;
        onFlavourChanged();
        return;
      }

      const fromPos = pos;
      const toPos = newTarget;
      target = newTarget;

      const extraSlots = Math.max(0, Math.abs(toPos - fromPos) - 1);
      const duration = customDuration ?? (650 + 160 * extraSlots);
      const startTime = performance.now();
      let revealTriggered = false;

      slideTween = {
        update(now) {
          const elapsed = now - startTime;
          const t = clamp(elapsed / duration, 0, 1);
          const easeT = easeGlide(t);
          pos = fromPos + (toPos - fromPos) * easeT;

          // At 12% of the slide: trigger colour reveal circle, title and counter
          if (!revealTriggered && t >= 0.12) {
            revealTriggered = true;
            onFlavourChanged();
          }

          if (t >= 1) {
            pos = toPos;
            slideTween = null;
            if (!revealTriggered) onFlavourChanged();
          }
        }
      };
    }

    function onFlavourChanged() {
      const jT = Math.round(target);
      const newFlavIdx = ((jT % 5) + 5) % 5;
      activeFlavIndex = newFlavIdx;

      const flav = FLAVOURS[newFlavIdx];
      const dir = target >= pos ? 1 : -1;

      // Update counter
      crossfadeCounter(flav.counter);

      // Update title
      renderTitle(flav.name, true, dir);

      // Update shop active card
      document.querySelectorAll('.card').forEach((card, idx) => {
        card.classList.toggle('live', idx === newFlavIdx);
      });

      // Update Section 2 step 04 headline if currently on step 04
      if (currentInStep === 3) {
        updateInStep(3, true);
      }

      // Trigger colour circle reveal
      triggerColorReveal(flav.color);
    }

    function triggerColorReveal(newColor) {
      // If a reveal is already running, finish it immediately
      if (colorReveal) {
        document.documentElement.style.setProperty('--flav', colorReveal.targetColor);
        revealEl.style.setProperty('--rv', 'transparent');
        revealEl.style.webkitMaskImage = '';
        revealEl.style.maskImage = '';
        colorReveal = null;
      }

      if (prefersReducedMotion) {
        document.documentElement.style.setProperty('--flav', newColor);
        return;
      }

      const vw = window.innerWidth;
      const heroH = heroSection.offsetHeight || window.innerHeight;
      const cx = vw / 2;
      const cy = vw < 820 ? 0.40 * heroH : (heroH / 2 - 78 * Math.min(vw / 1440, heroH / 900));

      const corners = [
        Math.hypot(cx, cy),
        Math.hypot(vw - cx, cy),
        Math.hypot(cx, heroH - cy),
        Math.hypot(vw - cx, heroH - cy)
      ];
      const maxDist = Math.max(...corners);
      const R = 1.45 * maxDist;

      revealEl.style.setProperty('--rv', newColor);
      const startTime = performance.now();
      const duration = 420;

      colorReveal = {
        targetColor: newColor,
        update(now) {
          const elapsed = now - startTime;
          const t = clamp(elapsed / duration, 0, 1);
          const easeT = easeGlide(t);

          const r = R * easeT;
          const f = Math.max(60, 0.35 * r);
          const mask = \`radial-gradient(circle at \${cx}px \${cy}px, #000 \${Math.max(0, r - f)}px, transparent \${r}px)\`;
          revealEl.style.webkitMaskImage = mask;
          revealEl.style.maskImage = mask;

          if (t >= 1) {
            document.documentElement.style.setProperty('--flav', newColor);
            revealEl.style.setProperty('--rv', 'transparent');
            revealEl.style.webkitMaskImage = '';
            revealEl.style.maskImage = '';
            colorReveal = null;
          }
        }
      };
    }

    /* --- SECTION 2 STEP FLIP TWEEN --- */
    function setInStep(stepIdx) {
      if (stepIdx === currentInStep) return;
      currentInStep = stepIdx;

      // Update step icons
      inIconBtns.forEach((btn, idx) => {
        btn.classList.toggle('active', idx === stepIdx);
      });

      const targetAngle = IN_STEPS[stepIdx].ry;
      const startAngle = currentFlipAngle;
      const diffTurns = Math.abs(targetAngle - startAngle) / 180;
      const clampedTurns = clamp(diffTurns, 0.4, 2);
      const duration = prefersReducedMotion ? 0 : 720 * clampedTurns;

      if (duration === 0) {
        currentFlipAngle = targetAngle;
        updateInStep(stepIdx, false);
        return;
      }

      const startTime = performance.now();
      let textCrossfaded = false;

      flipTween = {
        update(now) {
          const elapsed = now - startTime;
          const t = clamp(elapsed / duration, 0, 1);
          const easeT = easeInOutSine(t);
          currentFlipAngle = startAngle + (targetAngle - startAngle) * easeT;

          if (!textCrossfaded && elapsed >= 0.38 * Math.min(duration, 720)) {
            textCrossfaded = true;
            updateInStep(stepIdx, true);
          }

          if (t >= 1) {
            currentFlipAngle = targetAngle;
            flipTween = null;
            if (!textCrossfaded) updateInStep(stepIdx, true);
          }
        }
      };
    }

    function updateInStep(stepIdx, animate) {
      const stepData = IN_STEPS[stepIdx];
      let headline = stepData.head;
      let isLongWord = false;

      if (stepIdx === 3) {
        const flav = FLAVOURS[activeFlavIndex];
        const words = flav.name.toUpperCase().split(' ');
        headline = words.join('<br>');
        isLongWord = words.some(w => w.length > 9);
      }

      if (!animate || prefersReducedMotion) {
        inNumEl.textContent = stepData.num;
        inHeadEl.innerHTML = headline;
        inHeadEl.classList.toggle('long-word', isLongWord);
        inCapEl.innerHTML = stepData.cap;
        return;
      }

      // Soft crossfade: drift up 10px and fade over 240ms, swap 40ms later, rise from 14px below over 460ms
      [inHeadEl, inNumEl, inCapEl].forEach(el => {
        el.style.opacity = '0';
        el.style.translate = '0 -10px';
      });

      setTimeout(() => {
        inNumEl.textContent = stepData.num;
        inHeadEl.innerHTML = headline;
        inHeadEl.classList.toggle('long-word', isLongWord);
        inCapEl.innerHTML = stepData.cap;

        [inHeadEl, inNumEl, inCapEl].forEach(el => {
          el.style.translate = '0 14px';
          el.style.opacity = '0';
        });

        requestAnimationFrame(() => {
          [inHeadEl, inNumEl, inCapEl].forEach(el => {
            el.style.transition = 'opacity 0.46s var(--ease), translate 0.46s var(--ease)';
            el.style.translate = '0 0';
            el.style.opacity = '1';
          });
        });
      }, 280);
    }

    /* --- STORM 20 INGREDIENT PIECES --- */
    const stormPieces = [];
    function initStorm() {
      stormContainer.innerHTML = '';
      for (let i = 0; i < 20; i++) {
        const div = document.createElement('div');
        div.className = 'storm-piece spr';
        stormContainer.appendChild(div);

        // Seeded random params
        let seed = (i + 1) * 314159;
        function rnd() {
          seed = (seed * 9301 + 49297) % 233280;
          return seed / 233280;
        }

        const angle = rnd() * Math.PI * 2;
        const phase = i / 20 + rnd() * 0.03;
        const spin = (rnd() > 0.5 ? 1 : -1) * 360;
        const sizeFactor = 0.7 + rnd() * 0.7;

        stormPieces.push({ el: div, angle, phase, spin, sizeFactor });
      }
    }
    initStorm();

    function updateStorm(q) {
      if (prefersReducedMotion || q <= 0 || q >= 1) {
        stormPieces.forEach(p => { p.el.style.opacity = '0'; });
        return;
      }

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cx = vw / 2;
      const cy = vh / 2;
      const R = 0.55 * Math.hypot(vw, vh);
      const baseSize = 0.085 * Math.min(vw, vh);

      const activeBit = FLAVOURS[activeFlavIndex].bit;

      stormPieces.forEach((p, idx) => {
        // 70% use active flavor's bit, rest random
        const bitId = (idx % 10 < 7) ? activeBit : (idx % 5);
        p.el.className = \`storm-piece spr spr-bit-\${bitId}\`;

        const s = clamp((q - 0.45 * p.phase) / 0.55, 0, 1);
        if (s <= 0 || s >= 1) {
          p.el.style.opacity = '0';
          return;
        }

        const radius = (0.06 + Math.pow(s, 1.5) * 0.95) * R;
        const posX = cx + Math.cos(p.angle) * radius;
        const posY = cy + Math.sin(p.angle) * radius * 0.8;
        const scale = (0.2 + 1.7 * s) * p.sizeFactor;
        const rot = p.spin * s;
        const op = Math.sin(Math.PI * s) * clamp(5 * q, 0, 1) * clamp(6 * (1 - q), 0, 1);

        const bitInfo = BITS[bitId];
        const bitAspect = bitInfo.box[2] / bitInfo.box[3];
        const h = baseSize * scale;
        const w = h * bitAspect;

        p.el.style.width = \`\${w}px\`;
        p.el.style.height = \`\${h}px\`;
        p.el.style.transform = \`translate(\${posX - w/2}px, \${posY - h/2}px) rotate(\${rot}deg)\`;
        p.el.style.opacity = op;
      });
    }

    /* --- FLY TO CART ANIMATION --- */
    function flyToCart(sourceEl, delayMs = 0, onComplete = null) {
      if (prefersReducedMotion) {
        cartCount++;
        updateCartBadge();
        if (onComplete) onComplete();
        return;
      }

      setTimeout(() => {
        const rect = sourceEl.getBoundingClientRect();
        const basketRect = navBasket.getBoundingClientRect();

        const clone = document.createElement('div');
        clone.className = sourceEl.className + ' flying-bar';
        clone.style.width = \`\${rect.width}px\`;
        clone.style.height = \`\${rect.height}px\`;
        clone.style.left = \`\${rect.left}px\`;
        clone.style.top = \`\${rect.top}px\`;
        clone.style.backgroundSize = window.getComputedStyle(sourceEl).backgroundSize;
        clone.style.backgroundPosition = window.getComputedStyle(sourceEl).backgroundPosition;
        document.body.appendChild(clone);

        const sx = rect.left + rect.width / 2;
        const sy = rect.top + rect.height / 2;
        const bx = basketRect.left + basketRect.width / 2;
        const by = basketRect.top + basketRect.height / 2;

        const dx = bx - sx;
        const dy = by - sy;
        const liftY = Math.min(160, 0.35 * Math.abs(dy) + 60);
        const k = Math.min(0.2, 30 / rect.height);

        const keyframes = [
          { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
          { transform: \`translate(\${0.4 * dx}px, \${0.4 * dy - liftY}px) scale(\${0.45 + k}) rotate(-10deg)\`, opacity: 1, offset: 0.45 },
          { transform: \`translate(\${dx}px, \${dy}px) scale(\${k}) rotate(-18deg)\`, opacity: 0.15 }
        ];

        const anim = clone.animate(keyframes, {
          duration: 900,
          easing: 'cubic-bezier(.5,0,.2,1)',
          fill: 'forwards'
        });

        anim.onfinish = () => {
          clone.remove();
          // Bump basket
          navBasket.classList.remove('bump');
          void navBasket.offsetWidth;
          navBasket.classList.add('bump');

          cartCount++;
          updateCartBadge();

          if (onComplete) onComplete();
        };
      }, delayMs);
    }

    function updateCartBadge() {
      basketBadge.textContent = cartCount;
      basketBadge.classList.add('show', 'bounce');
      setTimeout(() => {
        basketBadge.classList.remove('bounce');
      }, 350);
    }

    /* --- SHOP CARDS GENERATION & INTERACTION --- */
    const cardElements = [];
    const cardPkElements = [];

    function renderShop() {
      shopGrid.innerHTML = '';
      FLAVOURS.forEach((flav, idx) => {
        const card = document.createElement('div');
        card.className = \`card \${idx === activeFlavIndex ? 'live' : ''}\`;
        card.style.background = flav.color;

        card.innerHTML = \`
          <div class="card-name">\${flav.line1}<br>\${flav.line2}</div>
          <div class="pk spr spr-wrap-\${flav.id}"></div>
          <button class="card-add" type="button" aria-label="Add a bag of \${flav.name} to the cart">
            <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        \`;

        const pk = card.querySelector('.pk');
        const addBtn = card.querySelector('.card-add');

        // Card Tilt on Desktop
        card.addEventListener('pointermove', (e) => {
          if (e.pointerType === 'touch' || prefersReducedMotion) return;
          const rect = card.getBoundingClientRect();
          const x = clamp((e.clientX - rect.left) / rect.width - 0.5, -0.5, 0.5);
          const y = clamp((e.clientY - rect.top) / rect.height - 0.5, -0.5, 0.5);
          cardTilts[idx] = { x, y };

          card.classList.add('hovered');
          card.style.transform = \`translateY(-8px) rotateX(\${-y * 12}deg) rotateY(\${x * 12}deg)\`;
        });

        card.addEventListener('pointerleave', () => {
          cardTilts[idx] = { x: 0, y: 0 };
          card.classList.remove('hovered');
          card.style.transform = '';
        });

        // Click card's bar: squash poke over 500ms
        pk.addEventListener('click', (e) => {
          e.stopPropagation();
          triggerSquashPoke(idx);
        });

        card.addEventListener('click', () => {
          triggerSquashPoke(idx);
        });

        // Click '+': fly to cart
        addBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          flyToCart(pk, 0);
        });

        shopGrid.appendChild(card);
        cardElements.push(card);
        cardPkElements.push(pk);
      });
    }

    function triggerSquashPoke(idx) {
      if (prefersReducedMotion) return;
      const startTime = performance.now();
      const duration = 500;

      function updateSquash() {
        const elapsed = performance.now() - startTime;
        const t = clamp(elapsed / duration, 0, 1);

        let sx = 1, sy = 1;
        if (t <= 0.3) {
          const st = t / 0.3;
          sx = lerp(1, 1.06, st);
          sy = lerp(1, 0.93, st);
        } else if (t <= 0.6) {
          const st = (t - 0.3) / 0.3;
          sx = lerp(1.06, 0.97, st);
          sy = lerp(0.93, 1.04, st);
        } else {
          const st = (t - 0.6) / 0.4;
          sx = lerp(0.97, 1, st);
          sy = lerp(1.04, 1, st);
        }

        cardSquashes[idx] = { sx, sy };
        if (idx !== activeFlavIndex) {
          cardPkElements[idx].style.transform = \`translateX(-50%) translateZ(30px) scale(\${sx}, \${sy})\`;
        }

        if (t < 1) {
          requestAnimationFrame(updateSquash);
        } else {
          cardSquashes[idx] = { sx: 1, sy: 1 };
          if (idx !== activeFlavIndex) {
            cardPkElements[idx].style.transform = 'translateX(-50%) translateZ(30px)';
          }
        }
      }
      requestAnimationFrame(updateSquash);
    }

    /* --- SECTION 4 BUILDER (3 PACK) --- */
    function renderBuilderThumbs() {
      rangeThumbs.innerHTML = '';
      FLAVOURS.forEach((flav, idx) => {
        const item = document.createElement('div');
        item.className = 'thumb-item';
        item.innerHTML = \`
          <div class="thumb-box" style="background:\${flav.color}">
            <div class="spr spr-wrap-\${flav.id}"></div>
            <div class="thumb-badge" id="thumbBadge\${idx}"></div>
          </div>
          <span class="thumb-name">\${flav.name}</span>
        \`;

        item.addEventListener('click', () => {
          hasInitializedPack = true;
          addFlavourToPack(idx);
        });

        rangeThumbs.appendChild(item);
      });
    }

    function addFlavourToPack(flavIdx) {
      const emptySlot = packSlots.findIndex(s => s === null);
      if (emptySlot === -1) return;

      packSlots[emptySlot] = flavIdx;
      updateBuilderUI(flavIdx);
    }

    function removeFlavourFromSlot(slotIdx) {
      hasInitializedPack = true;
      packSlots[slotIdx] = null;
      updateBuilderUI();
    }

    function updateBuilderUI(lastPickedIdx = null) {
      // Update slots
      slotWraps.forEach((slot, idx) => {
        const fIdx = packSlots[idx];
        const barEl = slot.querySelector('.slot-bar');
        const removeBtn = slot.querySelector('.slot-btn');

        if (fIdx !== null) {
          slot.classList.add('filled');
          barEl.className = \`slot-bar spr spr-wrap-\${FLAVOURS[fIdx].id}\`;
          removeBtn.onclick = (e) => {
            e.stopPropagation();
            removeFlavourFromSlot(idx);
          };
        } else {
          slot.classList.remove('filled');
          removeBtn.onclick = null;
        }
      });

      // Update thumbnail badges
      const counts = [0, 0, 0, 0, 0];
      packSlots.forEach(s => { if (s !== null) counts[s]++; });

      counts.forEach((c, idx) => {
        const badge = document.getElementById(\`thumbBadge\${idx}\`);
        if (c > 0) {
          badge.classList.add('active');
          badge.textContent = c === 1 ? '✓' : c.toString();
        } else {
          badge.classList.remove('active');
          badge.textContent = '';
        }
      });

      // Update buy button
      const filledCount = packSlots.filter(s => s !== null).length;
      if (filledCount === 3) {
        buyBtn.classList.add('ready');
        buyBtn.disabled = false;
        buyLabel.textContent = 'Add to cart';
      } else {
        buyBtn.classList.remove('ready');
        buyBtn.disabled = true;
        buyLabel.textContent = \`Pick \${3 - filledCount} more\`;
      }

      // Update Glow color
      if (lastPickedIdx !== null) {
        const flavColor = FLAVOURS[lastPickedIdx].color;
        const rgb = hexToRgb(flavColor);
        rangeGlow.style.setProperty('--g', \`rgba(\${rgb.r},\${rgb.g},\${rgb.b},0.72)\`);
        rangeGlow.classList.remove('pulse');
        void rangeGlow.offsetWidth;
        rangeGlow.classList.add('pulse');
      }
    }

    buyBtn.addEventListener('click', () => {
      const filledCount = packSlots.filter(s => s !== null).length;
      if (filledCount !== 3) return;

      // Fly each slot bar into basket (stagger 120ms)
      slotWraps.forEach((slot, idx) => {
        const bar = slot.querySelector('.slot-bar');
        flyToCart(bar, idx * 120);
      });

      // 60ms after last bar starts: empty pack, show "Added to cart"
      setTimeout(() => {
        packSlots = [null, null, null];
        updateBuilderUI();

        buyBtn.classList.add('added');
        buyLabel.textContent = 'Added to cart';

        setTimeout(() => {
          buyBtn.classList.remove('added');
          updateBuilderUI();
        }, 1600);
      }, 300);
    });

    /* Builder Auto-fill when 30% in view */
    const rangeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3 && !hasInitializedPack) {
          hasInitializedPack = true;
          // Auto-fill selected flavour, then next two, at 250, 410, 570ms
          const f0 = activeFlavIndex;
          const f1 = (activeFlavIndex + 1) % 5;
          const f2 = (activeFlavIndex + 2) % 5;

          setTimeout(() => { if (packSlots[0] === null) addFlavourToPack(f0); }, 250);
          setTimeout(() => { if (packSlots[1] === null) addFlavourToPack(f1); }, 410);
          setTimeout(() => { if (packSlots[2] === null) addFlavourToPack(f2); }, 570);
        }
      });
    }, { threshold: [0.3] });
    rangeObserver.observe(rangeSection);

    /* Headline line reveals */
    const shopObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          shopHead.classList.add('revealed');
          shopCap.classList.add('revealed');
          cardElements.forEach((card, idx) => {
            setTimeout(() => card.classList.add('revealed'), idx * 80);
          });
        }
      });
    }, { threshold: 0.18 });
    shopObserver.observe(shopSection);

    const rangeHeadObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          rangeHead.classList.add('revealed');
        }
      });
    }, { threshold: 0.18 });
    rangeHeadObserver.observe(rangeSection);

    /* --- HERO CONTROLS & INTERACTIONS --- */
    playBtn.addEventListener('click', () => {
      lastInteraction = performance.now();
      goTo(target + 1);
    });

    autoBtn.addEventListener('click', () => {
      lastInteraction = performance.now();
      autoplayActive = !autoplayActive;
      autoBtn.setAttribute('aria-pressed', autoplayActive.toString());
      if (autoplayActive) {
        autoIcon.innerHTML = \`
          <rect x="7" y="6" width="3" height="12" rx="1.5" fill="#ffffff"/>
          <rect x="14" y="6" width="3" height="12" rx="1.5" fill="#ffffff"/>
        \`;
      } else {
        autoIcon.innerHTML = \`
          <polygon points="8 6 18 12 8 18" fill="#ffffff"/>
        \`;
      }
    });

    window.addEventListener('keydown', (e) => {
      isSmoothScrolling = false;
      const heroRect = heroSection.getBoundingClientRect();
      const inHero = heroRect.bottom >= window.innerHeight * 0.5 && heroRect.top <= 0;
      if (!inHero) return;

      if (e.key === 'ArrowRight') {
        lastInteraction = performance.now();
        goTo(target + 1);
      } else if (e.key === 'ArrowLeft') {
        lastInteraction = performance.now();
        goTo(target - 1);
      }
    });

    // Pointer Drag & Tap Raycasting on Arc
    const raycaster = new THREE.Raycaster();
    const mouseNdc = new THREE.Vector2();

    arcEl.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      isSmoothScrolling = false;
      lastInteraction = performance.now();
      dragStartX = e.clientX;
      dragStartPos = pos;
      lastPointerX = e.clientX;
      lastPointerTime = performance.now();
      dragVelocity = 0;
      isDragging = false;
    });

    window.addEventListener('pointermove', (e) => {
      // Raycasting for cursor over visible 3D bars
      if (!isDragging && arcEl.contains(e.target)) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        mouseNdc.x = (e.clientX / vw) * 2 - 1;
        mouseNdc.y = -(e.clientY / vh) * 2 + 1;
        raycaster.setFromCamera(mouseNdc, camera);

        const visibleMeshes = [];
        if (travellerBar?.group.visible) visibleMeshes.push(travellerBar.frontMesh, travellerBar.backMesh);
        poolBars.forEach(b => {
          if (b.group.visible) visibleMeshes.push(b.frontMesh, b.backMesh);
        });

        const hits = raycaster.intersectObjects(visibleMeshes);
        arcEl.style.cursor = hits.length > 0 ? 'pointer' : 'grab';
      }

      if (dragStartX === 0) return;
      const dx = e.clientX - dragStartX;

      if (!isDragging && Math.abs(dx) > 6) {
        isDragging = true;
        slideTween = null;
        arcEl.setPointerCapture(e.pointerId);
        document.body.classList.add('dragging');
      }

      if (isDragging) {
        lastInteraction = performance.now();
        const vw = window.innerWidth;
        const heroH = heroSection.offsetHeight || window.innerHeight;
        const u = vw < 820 ? Math.min(vw / 560, heroH / 980) : Math.min(vw / 1440, heroH / 900);
        const xSpread = vw < 820 ? 1.02 : 1.0;
        const slotPx = 245 * u * xSpread;

        pos = dragStartPos - dx / slotPx;

        // Smooth velocity
        const now = performance.now();
        const dt = now - lastPointerTime;
        if (dt > 8) {
          const v = -(e.clientX - lastPointerX) / slotPx / dt;
          dragVelocity = lerp(dragVelocity, v, 0.4);
          lastPointerX = e.clientX;
          lastPointerTime = now;
        }
      }
    });

    function finishDrag(e) {
      if (dragStartX === 0) return;
      const moved = Math.abs(e.clientX - dragStartX);
      const wasDragging = isDragging;

      dragStartX = 0;
      isDragging = false;
      document.body.classList.remove('dragging');

      try {
        if (arcEl.hasPointerCapture(e.pointerId)) arcEl.releasePointerCapture(e.pointerId);
      } catch (err) {}

      if (wasDragging) {
        // Flick release
        const snap = Math.round(pos + clamp(dragVelocity * 220, -2, 2));
        const diff = Math.abs(snap - pos);
        const snapDur = Math.max(380, 650 * Math.min(1, diff + 0.35));
        goTo(snap, snapDur);
      } else if (moved <= 6) {
        // Tap / Click raycasting
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        mouseNdc.x = (e.clientX / vw) * 2 - 1;
        mouseNdc.y = -(e.clientY / vh) * 2 + 1;
        raycaster.setFromCamera(mouseNdc, camera);

        const candidates = [];
        if (travellerBar?.group.visible) {
          candidates.push({ mesh: travellerBar.frontMesh, bar: travellerBar, j: Math.round(target) });
          candidates.push({ mesh: travellerBar.backMesh, bar: travellerBar, j: Math.round(target) });
        }
        poolBars.forEach(b => {
          if (b.group.visible && b._j !== undefined) {
            candidates.push({ mesh: b.frontMesh, bar: b, j: b._j });
            candidates.push({ mesh: b.backMesh, bar: b, j: b._j });
          }
        });

        const hits = raycaster.intersectObjects(candidates.map(c => c.mesh));
        if (hits.length > 0) {
          const hitItem = candidates.find(c => c.mesh === hits[0].object);
          if (hitItem) {
            goTo(hitItem.j);
          }
        }
      }
    }

    arcEl.addEventListener('pointerup', finishDrag);
    arcEl.addEventListener('pointercancel', (e) => {
      if (isDragging) finishDrag(e);
      dragStartX = 0;
      isDragging = false;
      document.body.classList.remove('dragging');
    });

    /* Section 2 Step Icon Clicks */
    inIconBtns.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        lastInteraction = performance.now();
        const secTop = insideSection.offsetTop;
        const secH = insideSection.offsetHeight;
        const vh = window.innerHeight;
        // Midpoint of step p range (step 0..3): 0.095, 0.285, 0.475, 0.665
        const targetP = (idx + 0.5) * 0.19;
        const scrollY = secTop + targetP * (secH - vh);
        window.scrollTo({ top: scrollY, behavior: 'smooth' });
      });
    });

    /* --- INTRO / HERO ENTRANCE SEQUENCE --- */
    function enterHero() {
      if (hasEnteredHero) return;
      hasEnteredHero = true;
      lastInteraction = performance.now();

      introVid.pause();
      introEl.classList.add('hidden');
      document.body.classList.remove('locked');

      if (prefersReducedMotion) {
        navEl.classList.add('visible');
        ringsEl.classList.add('active');
        playBtn.classList.add('active');
        countEl.classList.add('active');
        autoBtn.classList.add('active');
        pos = 1;
        target = 1;
        onFlavourChanged();
        return;
      }

      // Nav slide down
      setTimeout(() => navEl.classList.add('visible'), 50);

      // Rings fade/scale in
      setTimeout(() => ringsEl.classList.add('active'), 100);

      // Hero controls fade in
      setTimeout(() => playBtn.classList.add('active'), 500);
      setTimeout(() => countEl.classList.add('active'), 620);
      setTimeout(() => autoBtn.classList.add('active'), 740);

      // Floating bits fade in
      document.querySelectorAll('.floating-bit').forEach((b, idx) => {
        setTimeout(() => { b.style.opacity = '0.6'; }, 300 + 90 * idx);
      });

      // Arc bars sweep in from pos -2.6 to 1 over 1700ms with cubic-bezier(.16,1,.3,1)
      const sweepEase = solveCubicBezier(0.16, 1.0, 0.3, 1.0);
      const sweepStart = performance.now();
      const sweepFrom = -2.6;
      const sweepTo = 1;
      target = 1;

      slideTween = {
        update(now) {
          const t = clamp((now - sweepStart) / 1700, 0, 1);
          pos = sweepFrom + (sweepTo - sweepFrom) * sweepEase(t);
          if (t >= 1) {
            pos = sweepTo;
            slideTween = null;
          }
        }
      };
    }

    skipBtn.addEventListener('click', enterHero);

    function startIntroLogoStamp() {
      introVid.pause();
      introStamp.classList.add('show');
      stampInner.classList.add('pop');
      setTimeout(() => {
        enterHero();
      }, 380 + 650);
    }

    // Video playback management
    if (!prefersReducedMotion) {
      function tryPlayVideo() {
        introVid.currentTime = 0.55;
        const p = introVid.play();
        if (p) p.catch(() => {});
      }

      if (introVid.readyState >= 3) {
        tryPlayVideo();
      } else {
        introVid.addEventListener('canplay', tryPlayVideo, { once: true });
      }

      introVid.addEventListener('timeupdate', () => {
        if (introVid.currentTime >= 4.6) {
          startIntroLogoStamp();
        }
      });
      introVid.addEventListener('ended', startIntroLogoStamp);
      introVid.addEventListener('error', startIntroLogoStamp);

      setTimeout(() => {
        if (introVid.currentTime < 0.6) startIntroLogoStamp();
      }, 3500);
      setTimeout(enterHero, 9000);
    } else {
      enterHero();
    }

    /* --- SMOOTH SCROLLING (Desktop Mouse / Trackpad) --- */
    window.addEventListener('wheel', (e) => {
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY) || isTouchDevice || prefersReducedMotion || document.body.classList.contains('locked')) {
        return;
      }
      e.preventDefault();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (!isSmoothScrolling) {
        smoothScrollTarget = window.scrollY;
        isSmoothScrolling = true;
      }
      smoothScrollTarget = clamp(smoothScrollTarget + e.deltaY, 0, maxScroll);
    }, { passive: false });

    window.addEventListener('pointerdown', () => { isSmoothScrolling = false; });
    window.addEventListener('keydown', () => { isSmoothScrolling = false; });

    /* --- RESIZE HANDLING --- */
    function onResize() {
      updatePixelRatio();
      updateCamera();
      updateTitleSize(FLAVOURS[activeFlavIndex].name);

      // Section 2 Frame Scaling
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const k = vw < 820 ? Math.min(vw / 390, vh / 780) : Math.min(vw / 1440, vh / 900);
      inBackFrame.style.transform = \`translate(-50%, -50%) scale(\${k})\`;
      inFrontFrame.style.transform = \`translate(-50%, -50%) scale(\${k})\`;

      updateNavLinks();
    }
    window.addEventListener('resize', onResize);

    /* --- NAV PILL HIGHLIGHT & SCROLL STATE --- */
    function updateNavLinks() {
      const vh = window.innerHeight;
      const sections = [
        { el: heroSection, idx: 0 },
        { el: insideSection, idx: 1 },
        { el: shopSection, idx: 2 },
        { el: rangeSection, idx: 3 }
      ];

      let activeSectionIdx = 0;
      sections.forEach(s => {
        const top = s.el.getBoundingClientRect().top;
        if (top <= vh * 0.35) {
          activeSectionIdx = s.idx;
        }
      });

      // Update highlight pill
      navLinks.forEach((link, idx) => {
        link.classList.toggle('active', idx === activeSectionIdx);
        if (idx === activeSectionIdx) {
          pillHighlight.style.left = \`\${link.offsetLeft}px\`;
          pillHighlight.style.width = \`\${link.offsetWidth}px\`;
        }
      });

      mobileLinks.forEach((link, idx) => {
        link.classList.toggle('active', idx === activeSectionIdx);
      });

      // Nav Themes
      const shopTop = shopSection.getBoundingClientRect().top;
      const rangeTop = rangeSection.getBoundingClientRect().top;

      const navCenterPill = document.getElementById('navCenterPill');
      if (rangeTop <= vh * 0.35) {
        navEl.classList.add('dark');
        navCenterPill.classList.remove('light');
      } else if (shopTop <= vh * 0.35) {
        navEl.classList.remove('dark');
        navCenterPill.classList.add('light');
      } else {
        navEl.classList.remove('dark');
        navCenterPill.classList.remove('light');
      }
    }

    window.addEventListener('scroll', updateNavLinks, { passive: true });

    /* --- INITIALIZATION & ASSETS LOADING --- */
    async function init() {
      renderTitle(FLAVOURS[1].name, false);
      renderShop();
      renderBuilderThumbs();
      updateBuilderUI();
      onResize();

      // Load fonts
      try {
        await Promise.all([
          document.fonts.load('400 16px "Archivo Black"'),
          document.fonts.load('400 16px "DM Mono"'),
          document.fonts.load('500 16px "DM Mono"'),
          document.fonts.load('700 16px "Inter"')
        ]);
      } catch (err) {
        console.warn('Font loading note:', err);
      }

      // Load Wrapper Sheet Image
      const sheetImg = new Image();
      sheetImg.crossOrigin = 'anonymous';
      sheetImg.src = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261116_132032_30242d8c-5062-4d60-8a3d-238f0a2ff788.png&w=2200&q=85';
      
      await new Promise((resolve) => {
        sheetImg.onload = resolve;
        sheetImg.onerror = resolve; // Failsafe
      });

      await buildTextures(sheetImg);

      // Create Traveller Bar & Pool of 11 bars
      travellerBar = createBarItem();
      for (let i = 0; i < 11; i++) {
        poolBars.push(createBarItem());
      }

      // Start animation loop
      requestAnimationFrame(mainLoop);
    }

    /* --- MAIN ANIMATION & RENDER LOOP --- */
    let lastFrameTime = performance.now();

    function mainLoop(now) {
      requestAnimationFrame(mainLoop);
      const dt = Math.min(now - lastFrameTime, 100);
      lastFrameTime = now;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const heroH = heroSection.offsetHeight || vh;
      const isPhone = vw < 820;

      // Smooth scroll lerp
      if (isSmoothScrolling && !prefersReducedMotion) {
        const curY = window.scrollY;
        const diff = smoothScrollTarget - curY;
        if (Math.abs(diff) < 0.5) {
          window.scrollTo(0, smoothScrollTarget);
          isSmoothScrolling = false;
        } else {
          const factor = 1 - Math.exp(-dt / 120);
          window.scrollTo(0, curY + diff * factor);
        }
      }

      // Update slide tween
      if (slideTween) slideTween.update(now);

      // Update color circle reveal
      if (colorReveal) colorReveal.update(now);

      // Update Section 2 flip tween
      if (flipTween) flipTween.update(now);

      // Autoplay logic
      if (autoplayActive && hasEnteredHero && !document.body.classList.contains('locked') && !isDragging && !prefersReducedMotion && document.visibilityState === 'visible') {
        const heroRect = heroSection.getBoundingClientRect();
        const heroVisibleRatio = clamp((heroRect.bottom - Math.max(0, heroRect.top)) / vh, 0, 1);
        if (heroVisibleRatio >= 0.6 && now - lastInteraction >= 3200) {
          lastInteraction = now;
          goTo(target + 1);
        }
      }

      /* Floating bits continuous composite animation */
      if (!prefersReducedMotion && hasEnteredHero) {
        document.querySelectorAll('.floating-bit').forEach((bit, i) => {
          const tPeriod = 7000 + 900 * i;
          const cycle = (now % tPeriod) / tPeriod;
          const sinCycle = Math.sin(cycle * Math.PI * 2);
          const tx = (i % 2 === 0 ? 1 : -1) * 13 * sinCycle;
          const ty = -(22 + 3 * i) * (0.5 * sinCycle + 0.5);
          const rotDelta = (i % 2 === 0 ? 1 : -1) * 11 * sinCycle;
          const baseRot = parseFloat(bit.getAttribute('data-base-rot') || (bit.style.transform.match(/rotate\(([^)]+)deg\)/) || [0, 0])[1]);
          if (!bit.hasAttribute('data-base-rot')) bit.setAttribute('data-base-rot', baseRot);

          bit.style.transform = \`translate(\${tx}px, \${ty}px) rotate(\${baseRot + rotDelta}deg)\`;
        });
      }

      /* Section 2 Scroll Mapping */
      const secRect = insideSection.getBoundingClientRect();
      const secH = insideSection.offsetHeight;
      const p = clamp(-secRect.top / (secH - vh), 0, 1);
      const stepIdx = Math.floor(Math.min(p, 0.759) / 0.19);
      const q = clamp((p - 0.76) / 0.24, 0, 1);

      // Section 2 Front Layer Sticky Simulation
      let pinY = 0;
      if (secRect.top > 0) {
        pinY = secRect.top;
      } else if (secRect.bottom < vh) {
        pinY = secRect.bottom - vh;
      } else {
        pinY = 0;
      }
      inFrontEl.style.transform = \`translateY(\${pinY}px)\`;
      inFrontEl.style.visibility = (secRect.bottom > 0 && secRect.top < vh) ? 'visible' : 'hidden';

      // Update Section 2 Step
      if (secRect.bottom > 0 && secRect.top < vh) {
        setInStep(stepIdx);
      }

      // Storm effect
      inDarkEl.style.opacity = (clamp(3.5 * q, 0, 1) * 0.42).toString();
      const frontFade = 1 - clamp(4 * q, 0, 1);
      inFrontFrame.style.opacity = frontFade.toString();
      inNumEl.style.opacity = frontFade.toString();
      stormSpinAngle = 720 * q;
      updateStorm(q);

      /* Traveller Anchors A, B, C Blending */
      const jT = Math.round(target);
      const u = isPhone ? Math.min(vw / 560, heroH / 980) : Math.min(vw / 1440, heroH / 900);
      const xSpread = isPhone ? 1.02 : 1.0;
      const cx = vw / 2;
      const cy = isPhone ? 0.40 * heroH : (heroH / 2 - 78 * u);

      // Anchor A (Hero Arc)
      const kHero = jT - pos;
      const stateA = getArcSlot(kHero, u, cx, cy, xSpread);
      const idleB = Math.sin(now / 4600 * 2 * Math.PI + 1.37 * jT);
      if (!prefersReducedMotion) {
        stateA.y -= (0.5 * idleB + 0.5) * 9 * u;
        stateA.rz += 0.4 * idleB;
      }

      // Anchor B (Section 2 #inBar)
      const inBarRect = inBarEl.getBoundingClientRect();
      const bob = prefersReducedMotion ? 0 : Math.sin(now / 2600 * 2 * Math.PI) * 6;
      const stateB = {
        x: inBarRect.left + inBarRect.width / 2,
        y: inBarRect.top + inBarRect.height / 2 + bob,
        h: inBarRect.height,
        rz: 14,
        ry: currentFlipAngle + (prefersReducedMotion ? 0 : stormSpinAngle),
        rx: 0,
        z: 0,
        op: 1,
        sx: 1,
        sy: 1,
        shadow: 1
      };

      // Anchor C (Shop Card)
      const curFlav = ((jT % 5) + 5) % 5;
      const activeCardPk = cardPkElements[curFlav];
      const pkRect = activeCardPk ? activeCardPk.getBoundingClientRect() : { left: 0, top: 0, width: 100, height: 200 };

      const bAngle = stateB.ry;
      const nearestWholeTurn = Math.round(bAngle / 360) * 360;
      const cardTilt = cardTilts[curFlav] || { x: 0, y: 0 };
      const cardSquash = cardSquashes[curFlav] || { sx: 1, sy: 1 };

      const stateC = {
        x: pkRect.left + pkRect.width / 2,
        y: pkRect.top + pkRect.height / 2,
        h: pkRect.height,
        rz: 0,
        ry: nearestWholeTurn + cardTilt.x * 14,
        rx: -cardTilt.y * 14,
        z: 30,
        op: 1,
        sx: cardSquash.sx,
        sy: cardSquash.sy,
        shadow: 0.7
      };

      // Blending factors
      const p1 = clamp(1 - secRect.top / vh, 0, 1);
      const shopRect = shopSection.getBoundingClientRect();
      const p3 = clamp((vh - shopRect.top) / (0.7 * vh), 0, 1);

      // On phones, first time p3 > 0, scroll snap strip to centre card
      if (isPhone && p3 > 0 && !hasCenteredShopCard) {
        hasCenteredShopCard = true;
        const card = cardElements[curFlav];
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }

      let stateT = { ...stateA };
      if (p1 > 0) {
        stateT = lerpState(stateA, stateB, easeInOutSine(p1));
      }
      if (p3 > 0) {
        stateT = lerpState(stateB, stateC, easeInOutSine(p3));
      }

      // Place traveller bar
      if (travellerBar) {
        setBarFlavour(travellerBar, curFlav);
        placeBar(travellerBar, stateT);
      }

      /* Hero Arc Pool of 11 Bars */
      const baseJ = Math.floor(pos);
      const fadeHeroOther = 1 - clamp(1.6 * p1, 0, 1);
      let poolIdx = 0;

      for (let offset = -5; offset <= 5; offset++) {
        const j = baseJ + offset;
        const poolBar = poolBars[poolIdx++];

        if (j === jT) {
          // Selected bar is traveller
          poolBar.group.visible = false;
          poolBar.shadowMesh.visible = false;
          continue;
        }

        const k = j - pos;
        if (Math.abs(k) > 4 || fadeHeroOther <= 0.01) {
          poolBar.group.visible = false;
          poolBar.shadowMesh.visible = false;
          continue;
        }

        const slotState = getArcSlot(k, u, cx, cy, xSpread);
        const b = Math.sin(now / 4600 * 2 * Math.PI + 1.37 * j);
        if (!prefersReducedMotion) {
          slotState.y -= (0.5 * b + 0.5) * 9 * u;
          slotState.rz += 0.4 * b;
        }
        slotState.op *= fadeHeroOther;

        const fIdx = ((j % 5) + 5) % 5;
        setBarFlavour(poolBar, fIdx);
        poolBar._j = j;
        placeBar(poolBar, slotState);
      }

      // Render WebGL
      renderer.render(scene, camera);
    }

    // Launch Application
    init();
  </script>
</body>
</html>
`;

fs.writeFileSync('index.html', htmlContent, 'utf8');
console.log('index.html updated successfully! Size:', fs.statSync('index.html').size);
