import React, { useEffect, useRef, useState } from 'react';

import "./ChartSetup";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Space+Mono:wght@400;700&family=Playfair+Display:wght@600;900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
:root {
  --bg-dark: #0a0e27;
  --bg-medium: #151932;
  --bg-light: #1e2442;
  --accent-primary: #00ff87;
  --accent-secondary: #00d4ff;
  --accent-tertiary: #ff006e;
  --accent-warning: #ffa500;
  --text-primary: #e8eef2;
  --text-secondary: #a0aec0;
  --constant: #00ff87;
  --logarithmic: #00d4ff;
  --linear: #7c3aed;
  --linearithmic: #f59e0b;
  --quadratic: #ff006e;
  --cubic: #dc2626;
  --exponential: #991b1b;
}
body {
  font-family: 'JetBrains Mono', monospace;
  background: var(--bg-dark);
  color: var(--text-primary);
  line-height: 1.7;
  overflow-x: hidden;
}
/* Animated background */
.bigO-root:before {
  content: '';
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background:
    radial-gradient(circle at 20% 30%, rgba(0,255,135,0.08) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(0,212,255,0.08) 0%, transparent 40%),
    radial-gradient(circle at 50% 50%, rgba(255,0,110,0.05) 0%, transparent 50%);
  animation: pulse 15s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.6} }

.container {
  max-width: 1400px; margin: 0 auto; padding: 2rem; position: relative; z-index: 1;
}

header { text-align: center; padding: 4rem 2rem; margin-bottom: 4rem; position: relative; }
h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  margin-bottom: 1rem; animation: slideDown 1s ease-out; letter-spacing: -0.02em;
}
@keyframes slideDown { from{opacity:0; transform: translateY(-50px)} to{opacity:1; transform: translateY(0)} }
.subtitle { font-size: 1.3rem; color: var(--text-secondary); animation: fadeIn 1s ease-out .3s backwards; max-width: 800px; margin: 0 auto; }
@keyframes fadeIn { from{opacity:0; transform: translateY(20px)} to{opacity:1; transform: translateY(0)} }

nav {
  background: var(--bg-medium); border: 2px solid var(--accent-primary);
  border-radius: 20px; padding: 2rem; margin-bottom: 3rem; backdrop-filter: blur(10px);
  box-shadow: 0 20px 60px rgba(0,255,135,0.15);
}
nav h2 { font-family: 'Playfair Display', serif; color: var(--accent-primary); margin-bottom: 1.5rem; font-size: 2rem; }
nav ul { list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px,1fr)); gap: 1rem; }
nav a {
  display: block; color: var(--text-primary); text-decoration: none; padding: .8rem 1.2rem;
  background: var(--bg-light); border-radius: 10px; border: 1px solid transparent;
  transition: all .3s cubic-bezier(.4,0,.2,1); position: relative; overflow: hidden;
}
nav a:before {
  content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
  opacity: .2; transition: left .5s;
}
nav a:hover:before { left: 100%; }
nav a:hover { border-color: var(--accent-primary); transform: translateX(10px); box-shadow: -10px 0 30px rgba(0,255,135,.3); }

section {
  background: var(--bg-medium); border-radius: 24px; padding: 3rem; margin-bottom: 3rem;
  border: 1px solid rgba(255,255,255,.1); backdrop-filter: blur(10px);
  animation: fadeInUp .8s ease-out backwards; position: relative; overflow: hidden;
}
section:before {
  content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary));
}
@keyframes fadeInUp { from{opacity:0; transform: translateY(40px)} to{opacity:1; transform: translateY(0)} }

h2 { font-family: 'Playfair Display', serif; font-size: 2.5rem; color: var(--accent-primary); margin-bottom: 2rem; display: flex; align-items: center; gap: 1rem; }
h3 { font-size: 1.8rem; color: var(--accent-secondary); margin: 2rem 0 1rem; display: flex; align-items: center; gap: .8rem; }
h4 { font-size: 1.4rem; color: var(--accent-tertiary); margin: 1.5rem 0 1rem; }

.emoji { font-size: 2rem; display: inline-block; animation: bounce 2s ease-in-out infinite; }
@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

/* Chart */
.chart-container { background: var(--bg-light); border-radius: 16px; padding: 2rem; margin: 2rem 0; border: 2px solid var(--accent-primary); box-shadow: 0 10px 40px rgba(0,255,135,.2); position: relative; }
.chart-wrapper { position: relative; height: 500px; margin-bottom: 2rem; }
canvas { background: rgba(255,255,255,.02); border-radius: 12px; }

/* Cards */
.complexity-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px,1fr)); gap: 2rem; margin: 2rem 0; }
.complexity-card { background: linear-gradient(135deg, var(--bg-light), var(--bg-medium)); border-radius: 16px; padding: 2rem; border: 2px solid; transition: all .4s cubic-bezier(.4,0,.2,1); cursor: pointer; position: relative; overflow: hidden; }
.complexity-card:after { content: ''; position: absolute; top: -50%; right: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,.1) 0%, transparent 70%); opacity: 0; transition: opacity .4s; }
.complexity-card:hover:after { opacity: 1; }
.complexity-card:hover { transform: translateY(-10px) scale(1.02); box-shadow: 0 20px 60px rgba(0,0,0,.4); }
.complexity-card.constant { border-color: var(--constant); }
.complexity-card.logarithmic { border-color: var(--logarithmic); }
.complexity-card.linear { border-color: var(--linear); }
.complexity-card.linearithmic { border-color: var(--linearithmic); }
.complexity-card.quadratic { border-color: var(--quadratic); }
.complexity-card.cubic { border-color: var(--cubic); }
.complexity-card.exponential { border-color: var(--exponential); }
.complexity-card h4 { font-size: 1.8rem; margin-bottom: 1rem; }
.complexity-card .notation { font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; font-family: 'Space Mono', monospace; }
.complexity-card.constant .notation { color: var(--constant); }
.complexity-card.logarithmic .notation { color: var(--logarithmic); }
.complexity-card.linear .notation { color: var(--linear); }
.complexity-card.linearithmic .notation { color: var(--linearithmic); }
.complexity-card.quadratic .notation { color: var(--quadratic); }
.complexity-card.cubic .notation { color: var(--cubic); }
.complexity-card.exponential .notation { color: var(--exponential); }

/* Code blocks */
.code-block { background: #000; border: 2px solid var(--accent-primary); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; overflow-x: auto; position: relative; box-shadow: 0 10px 30px rgba(0,255,135,.2); }
.code-block:before { content: 'C#'; position: absolute; top: .5rem; right: 1rem; background: var(--accent-primary); color: var(--bg-dark); padding: .2rem .8rem; border-radius: 6px; font-size: .8rem; font-weight: 700; }
.code-block pre { margin: 0; font-family: 'JetBrains Mono', monospace; font-size: .95rem; color: var(--accent-primary); line-height: 1.6; }
.code-block .keyword { color: #ff79c6; }
.code-block .function { color: #50fa7b; }
.code-block .string { color: #f1fa8c; }
.code-block .comment { color: #6272a4; }

/* Table */
.comparison-table { width: 100%; border-collapse: separate; border-spacing: 0; margin: 2rem 0; overflow: hidden; border-radius: 12px; border: 2px solid var(--accent-primary); }
.comparison-table th { background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); color: var(--bg-dark); padding: 1.2rem; text-align: left; font-weight: 700; font-size: 1.1rem; }
.comparison-table td { background: var(--bg-light); padding: 1rem 1.2rem; border-bottom: 1px solid rgba(255,255,255,.1); }
.comparison-table tr:hover td { background: rgba(0,255,135,.1); }
.comparison-table .notation-cell { font-family: 'Space Mono', monospace; font-weight: 700; font-size: 1.2rem; }

/* Examples / visuals */
.example-box { background: var(--bg-light); border-left: 4px solid var(--accent-secondary); padding: 1.5rem; margin: 1.5rem 0; border-radius: 0 12px 12px 0; position: relative; }
.example-box:before { content: '💡'; position: absolute; left: -2rem; top: 1.5rem; font-size: 2rem; }

.visual-comparison { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px,1fr)); gap: 2rem; margin: 2rem 0; }
.visual-item { text-align: center; padding: 2rem; background: var(--bg-light); border-radius: 12px; border: 2px solid var(--accent-primary); }
.visual-bars { display: flex; align-items: flex-end; justify-content: space-around; height: 200px; margin: 1rem 0; }
.bar { width: 40px; background: linear-gradient(to top, var(--accent-primary), var(--accent-secondary)); border-radius: 8px 8px 0 0; transition: height 1s cubic-bezier(.4,0,.2,1); position: relative; }
.bar:hover { filter: brightness(1.2); }

/* Rules */
.rules-grid { display: grid; gap: 1.5rem; margin: 2rem 0; }
.rule-card { background: linear-gradient(135deg, rgba(0,255,135,.1), rgba(0,212,255,.1)); border: 2px solid var(--accent-primary); border-radius: 12px; padding: 1.5rem; transition: transform .3s; }
.rule-card:hover { transform: translateX(10px); }
.rule-card h4 { color: var(--accent-primary); margin-bottom: .5rem; }

/* Scroll anim */
.fade-in { opacity: 0; transform: translateY(30px); animation: fadeInScroll .8s ease-out forwards; }
@keyframes fadeInScroll { to{opacity:1; transform: translateY(0)} }

/* Toggles */
.toggle-container { display: flex; gap: 1rem; flex-wrap: wrap; margin: 1.5rem 0; }
.toggle-btn { background: var(--bg-light); border: 2px solid var(--accent-primary); color: var(--text-primary); padding: .8rem 1.5rem; border-radius: 10px; cursor: pointer; font-family: 'JetBrains Mono', monospace; font-size: .95rem; transition: all .3s; position: relative; overflow: hidden; }
.toggle-btn:before { content: ''; position: absolute; top: 50%; left: 50%; width: 0; height: 0; border-radius: 50%; background: var(--accent-primary); transform: translate(-50%,-50%); transition: width .5s, height .5s; z-index: -1; }
.toggle-btn:hover:before { width: 300px; height: 300px; }
.toggle-btn:hover { color: var(--bg-dark); border-color: var(--accent-primary); box-shadow: 0 0 20px var(--accent-primary); }
.toggle-btn.active { background: var(--accent-primary); color: var(--bg-dark); border-color: var(--accent-primary); }

/* Footer */
footer { text-align: center; padding: 3rem 2rem; margin-top: 4rem; border-top: 2px solid var(--accent-primary); color: var(--text-secondary); }

/* Perf badges */
.perf-indicator { display: inline-block; padding: .3rem .8rem; border-radius: 20px; font-size: .85rem; font-weight: 700; margin: 0 .3rem; }
.perf-excellent { background: var(--constant); color: var(--bg-dark); }
.perf-good { background: var(--logarithmic); color: var(--bg-dark); }
.perf-acceptable { background: var(--linearithmic); color: var(--bg-dark); }
.perf-poor { background: var(--quadratic); color: #fff; }
.perf-terrible { background: var(--exponential); color: #fff; }

/* Tooltip */
.tooltip { position: relative; cursor: help; border-bottom: 2px dotted var(--accent-primary); }
.tooltip:after { content: attr(data-tooltip); position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); background: var(--bg-dark); color: var(--accent-primary); padding: .5rem 1rem; border-radius: 8px; border: 2px solid var(--accent-primary); white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity .3s; z-index: 1000; }
.tooltip:hover:after { opacity: 1; }

/* Responsive */
@media (max-width: 768px) {
  h1 { font-size: 3rem; }
  .complexity-grid { grid-template-columns: 1fr; }
  nav ul { grid-template-columns: 1fr; }
  section { padding: 2rem; }
}
`;

const DATASETS_META = [
    { key: 'constant',      label: 'O(1)',        color: '#00ff87' },
    { key: 'logarithmic',   label: 'O(log n)',    color: '#00d4ff' },
    { key: 'linear',        label: 'O(n)',        color: '#7c3aed' },
    { key: 'linearithmic',  label: 'O(n log n)',  color: '#f59e0b' },
    { key: 'quadratic',     label: 'O(n²)',       color: '#ff006e' },
    { key: 'cubic',         label: 'O(n³)',       color: '#dc2626' },
    { key: 'exponential',   label: 'O(2ⁿ)',       color: '#991b1b' },
];

export default function BigOComplexity() {
    const rootRef = useRef(null);
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    const [active, setActive] = useState(() => new Set(DATASETS_META.map(d => d.key)));

    // Build datasets (same logic as HTML)
    const buildDatasets = () => {
        const maxN = 100;
        const step = 2;
        const dataByKey = {};
        for (const meta of DATASETS_META) dataByKey[meta.key] = [];

        for (let n = 1; n <= maxN; n += step) {
            dataByKey.constant.push({ x: n, y: 1 });
            dataByKey.logarithmic.push({ x: n, y: Math.log2(n) });
            dataByKey.linear.push({ x: n, y: n });
            dataByKey.linearithmic.push({ x: n, y: n * Math.log2(n) });
            dataByKey.quadratic.push({ x: n, y: n * n });
            dataByKey.cubic.push({ x: n, y: n * n * n });
            dataByKey.exponential.push({ x: n, y: Math.min(2 ** n, 1_000_000) }); // cap visibility
        }

        return DATASETS_META.map((meta) => ({
            label: meta.label,
            data: dataByKey[meta.key],
            borderColor: meta.color,
            backgroundColor: `${meta.color}20`,
            borderWidth: 3,
            pointRadius: 0,
            tension: 0.4,
            hidden: !active.has(meta.key),
        }));
    };

    // Create chart
    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        const chart = new Chart(ctx, {
            type: 'line',
            data: { datasets: buildDatasets() },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#e8eef2',
                            font: { family: 'JetBrains Mono', size: 14 },
                            padding: 20
                        }
                    },
                    title: {
                        display: true,
                        text: 'Croissance des Différentes Complexités',
                        color: '#00ff87',
                        font: { family: 'Playfair Display', size: 24, weight: 'bold' },
                        padding: 20
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 14, 39, 0.95)',
                        titleColor: '#00ff87',
                        bodyColor: '#e8eef2',
                        borderColor: '#00ff87',
                        borderWidth: 2,
                        padding: 12,
                        displayColors: true,
                        titleFont: { family: 'JetBrains Mono', size: 14 },
                        bodyFont: { family: 'JetBrains Mono', size: 12 }
                    }
                },
                scales: {
                    x: {
                        type: 'linear',
                        title: {
                            display: true,
                            text: 'Taille des données (n)',
                            color: '#00ff87',
                            font: { family: 'JetBrains Mono', size: 14, weight: 'bold' }
                        },
                        ticks: { color: '#a0aec0', font: { family: 'JetBrains Mono' } },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    },
                    y: {
                        type: 'logarithmic',
                        title: {
                            display: true,
                            text: "Nombre d'opérations (échelle log)",
                            color: '#00ff87',
                            font: { family: 'JetBrains Mono', size: 14, weight: 'bold' }
                        },
                        ticks: {
                            color: '#a0aec0',
                            font: { family: 'JetBrains Mono' },
                            callback: function (value) {
                                if (
                                    value === 1 ||
                                    value === 10 ||
                                    value === 100 ||
                                    value === 1000 ||
                                    value === 10000 ||
                                    value === 100000 ||
                                    value === 1000000
                                ) {
                                    return Number(value).toLocaleString();
                                }
                                return null;
                            }
                        },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    }
                },
                animation: { duration: 2000, easing: 'easeInOutQuart' }
            }
        });

        chartRef.current = chart;
        return () => chart.destroy();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // create once

    // Update visibility when toggles change
    useEffect(() => {
        const chart = chartRef.current;
        if (!chart) return;
        DATASETS_META.forEach((meta, idx) => {
            const metaCtrl = chart.getDatasetMeta(idx);
            metaCtrl.hidden = !active.has(meta.key);
        });
        chart.update();
    }, [active]);

    // Scroll animations + smooth scroll scoped to this component
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        // Intersection observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('fade-in'); });
            },
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
        );

        const sections = root.querySelectorAll('section');
        sections.forEach((s) => observer.observe(s));

        // Smooth anchors inside this component
        const anchors = root.querySelectorAll('a[href^="#"]');
        const onClick = (e) => {
            e.preventDefault();
            const id = e.currentTarget.getAttribute('href');
            const target = root.querySelector(id);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
        anchors.forEach((a) => a.addEventListener('click', onClick));

        return () => {
            observer.disconnect();
            anchors.forEach((a) => a.removeEventListener('click', onClick));
        };
    }, []);

    const toggle = (key) => {
        setActive(prev => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
        });
    };

    return (
        <div className="bigO-root" ref={rootRef}>
            <style>{styles}</style>

            <div className="container">
                <header>
                    <h1>Big O</h1>
                    <p className="subtitle">
                        <span className="emoji">📊</span>
                        Maîtrisez l'analyse de complexité algorithmique pour écrire du code performant et scalable
                        <span className="emoji">🚀</span>
                    </p>
                </header>


                <nav>
                    <h2><span className="emoji">📚</span> Table des Matières</h2>
                    <ul>
                        <li><a href="#introduction">Introduction à la Complexité</a></li>
                        <li><a href="#notation">La Notation Big‑O</a></li>
                        <li><a href="#classes">Classes de Complexité</a></li>
                        <li><a href="#graphique">Visualisation Interactive</a></li>
                        <li><a href="#temporelle">Complexité Temporelle</a></li>
                        <li><a href="#spatiale">Complexité Spatiale</a></li>
                        <li><a href="#regles">Règles de Calcul</a></li>
                        <li><a href="#tris">Algorithmes de Tri</a></li>
                        <li><a href="#exercices">Exercices Pratiques</a></li>
                    </ul>
                </nav>


                {/* Introduction */}
                <section id="introduction">
                    <h2><span className="emoji">🎯</span> Introduction à la Complexité Algorithmique</h2>

                    <h3><span className="emoji">🤔</span> Pourquoi s'intéresser à la complexité ?</h3>
                    <p>Imaginez deux développeurs qui résolvent le même problème :</p>

                    <div className="visual-comparison">
                        <div className="visual-item">
                            <h4>Développeur A</h4>
                            <p>⏱️ <strong>2 secondes</strong> pour 1 000 éléments</p>
                            <div className="visual-bars">
                                <div className="bar" style={{ height: '80px' }} />
                                <div className="bar" style={{ height: '160px' }} />
                                <div className="bar" style={{ height: '200px' }} />
                            </div>
                        </div>
                        <div className="visual-item">
                            <h4>Développeur B</h4>
                            <p>⚡ <strong>0.01 seconde</strong> pour 1 000 éléments</p>
                            <div className="visual-bars">
                                <div className="bar" style={{ height: '20px' }} />
                                <div className="bar" style={{ height: '25px' }} />
                                <div className="bar" style={{ height: '30px' }} />
                            </div>
                        </div>
                    </div>

                    <div className="example-box">
                        <h4>💡 Conclusion</h4>
                        <p>
                            Les deux codes fonctionnent, mais l'un est <strong style={{ color: 'var(--accent-primary)' }}>200 fois plus rapide !</strong>
                            {' '}Le choix de l'algorithme devient critique avec de grandes données.
                        </p>
                    </div>

                    <h3>📈 L'importance de l'échelle</h3>
                    <table className="comparison-table">
                        <thead>
                        <tr>
                            <th>Taille des données</th>
                            <th>Algorithme lent (O(n²))</th>
                            <th>Algorithme rapide (O(n))</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr><td>100 éléments</td><td>10 000 opérations</td><td>100 opérations</td></tr>
                        <tr><td>1 000 éléments</td><td>1 000 000 opérations</td><td>1 000 opérations</td></tr>
                        <tr><td>10 000 éléments</td><td>100 000 000 opérations</td><td>10 000 opérations</td></tr>
                        <tr><td>100 000 éléments</td><td>10 000 000 000 opérations</td><td>100 000 opérations</td></tr>
                        </tbody>
                    </table>
                </section>

                {/* Notation Big-O */}
                <section id="notation">
                    <h2><span className="emoji">🔍</span> La Notation Big‑O (O)</h2>

                    <h3>Définition</h3>
                    <p>
                        La notation Big‑O décrit le <strong>comportement asymptotique</strong> d'un algorithme, c'est‑à‑dire
                        comment le temps d'exécution (ou l'espace mémoire) croît quand la taille des données augmente.
                    </p>

                    <div className="example-box">
                        <h4>En termes simples :</h4>
                        <p>Big‑O répond à la question : <em>"Comment mon algorithme ralentit‑il quand les données doublent ?"</em></p>
                    </div>

                    <h3>📐 Notation Mathématique</h3>
                    <p>
                        On écrit : <span style={{ color: 'var(--accent-primary)', fontSize: '1.3rem', fontWeight: 700 }}>f(n) = O(g(n))</span>
                    </p>
                    <p>
                        Cela signifie que la fonction <span className="tooltip" data-tooltip="Le nombre d'opérations de votre algorithme">f(n)</span> croît
                        au maximum aussi vite que <span className="tooltip" data-tooltip="La fonction de référence">g(n)</span> pour de grandes valeurs de n.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', margin: '2rem 0' }}>
                        <div style={{ background: 'rgba(0, 255, 135, 0.1)', padding: '2rem', borderRadius: '12px', border: '2px solid var(--accent-primary)' }}>
                            <h4 style={{ color: 'var(--accent-primary)' }}>✅ ON GARDE :</h4>
                            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                                <li>✅ Le terme qui croît le plus vite</li>
                                <li>✅ La tendance générale</li>
                            </ul>
                        </div>
                        <div style={{ background: 'rgba(255, 0, 110, 0.1)', padding: '2rem', borderRadius: '12px', border: '2px solid var(--accent-tertiary)' }}>
                            <h4 style={{ color: 'var(--accent-tertiary)' }}>❌ ON IGNORE :</h4>
                            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                                <li>❌ Les constantes multiplicatives (3n → n)</li>
                                <li>❌ Les termes mineurs (n² + n → n²)</li>
                                <li>❌ Les constantes additives (n + 100 → n)</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Graphique */}
                <section id="graphique">
                    <h2><span className="emoji">📈</span> Visualisation Interactive des Complexités</h2>

                    <div className="toggle-container">
                        {DATASETS_META.map(({ key, label }) => (
                            <button
                                key={key}
                                className={`toggle-btn ${active.has(key) ? 'active' : ''}`}
                                onClick={() => toggle(key)}
                                type="button"
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="chart-container">
                        <div className="chart-wrapper">
                            <canvas ref={canvasRef} />
                        </div>
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                            💡 Cliquez sur les boutons ci‑dessus pour afficher/masquer les courbes
                        </p>
                    </div>
                </section>

                {/* Classes de complexité */}
                <section id="classes">
                    <h2><span className="emoji">📊</span> Les Classes de Complexité</h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Du meilleur au pire :</p>

                    <div className="complexity-grid">
                        <div className="complexity-card constant">
                            <h4>🏆 Constant</h4>
                            <div className="notation">O(1)</div>
                            <p><strong>Le meilleur !</strong> Le temps ne dépend pas de la taille des données.</p>
                            <p style={{ marginTop: '1rem' }}>Exemples : Accès à un tableau, opérations mathématiques simples</p>
                            <span className="perf-indicator perf-excellent">EXCELLENT</span>
                        </div>

                        <div className="complexity-card logarithmic">
                            <h4>🚀 Logarithmique</h4>
                            <div className="notation">O(log n)</div>
                            <p><strong>Très efficace !</strong> Croissance très lente même pour de grandes données.</p>
                            <p style={{ marginTop: '1rem' }}>Exemples : Recherche binaire, arbres équilibrés</p>
                            <span className="perf-indicator perf-good">TRÈS BON</span>
                        </div>

                        <div className="complexity-card linear">
                            <h4>✅ Linéaire</h4>
                            <div className="notation">O(n)</div>
                            <p><strong>Bon !</strong> Proportionnel à la taille des données.</p>
                            <p style={{ marginTop: '1rem' }}>Exemples : Parcours de tableau, recherche simple</p>
                            <span className="perf-indicator perf-good">BON</span>
                        </div>

                        <div className="complexity-card linearithmic">
                            <h4>👍 Quasi‑linéaire</h4>
                            <div className="notation">O(n log n)</div>
                            <p><strong>Efficace !</strong> Les meilleurs algorithmes de tri.</p>
                            <p style={{ marginTop: '1rem' }}>Exemples : MergeSort, QuickSort, HeapSort</p>
                            <span className="perf-indicator perf-acceptable">ACCEPTABLE</span>
                        </div>

                        <div className="complexity-card quadratic">
                            <h4>⚠️ Quadratique</h4>
                            <div className="notation">O(n²)</div>
                            <p><strong>Attention !</strong> Croissance rapide, éviter pour grandes données.</p>
                            <p style={{ marginTop: '1rem' }}>Exemples : Tri à bulles, tri par sélection</p>
                            <span className="perf-indicator perf-poor">MOYEN</span>
                        </div>

                        <div className="complexity-card cubic">
                            <h4>🐌 Cubique</h4>
                            <div className="notation">O(n³)</div>
                            <p><strong>Lent !</strong> Trois boucles imbriquées.</p>
                            <p style={{ marginTop: '1rem' }}>Exemples : Multiplication naïve de matrices</p>
                            <span className="perf-indicator perf-poor">LENT</span>
                        </div>

                        <div className="complexity-card exponential">
                            <h4>💀 Exponentielle</h4>
                            <div className="notation">O(2ⁿ)</div>
                            <p><strong>Catastrophique !</strong> Double à chaque élément ajouté.</p>
                            <p style={{ marginTop: '1rem' }}>Exemples : Fibonacci récursif naïf, problèmes NP</p>
                            <span className="perf-indicator perf-terrible">CATASTROPHIQUE</span>
                        </div>
                    </div>
                </section>

                {/* Complexité temporelle - code examples */}
                <section id="temporelle">
                    <h2><span className="emoji">🔢</span> Analyse de la Complexité Temporelle</h2>

                    <h3>Exemple 1 : O(1) - Constant</h3>
                    <div className="code-block">
            <pre>
<span className="keyword">int</span> <span className="function">PremierElement</span>(<span className="keyword">int</span>[] tableau)
                {'{'}
                <span className="keyword">return</span> tableau[<span className="number">0</span>]; <span className="comment">// Toujours 1 opération</span>
                {'}'}{"\n"}

                <span className="keyword">bool</span> <span className="function">EstPair</span>(<span className="keyword">int</span> nombre)
                {'{'}
                <span className="keyword">return</span> nombre % <span className="number">2</span> == <span className="number">0</span>; <span className="comment">// Toujours 1 opération</span>
                 {'}'}{"\n"}
</pre>
                    </div>
                    <p>⚡ Peu importe la taille du tableau, accéder au premier élément prend toujours le même temps.</p>

                    <h3>Exemple 2 : O(log n) - Logarithmique</h3>
                    <div className="code-block">
            <pre>
<span className="keyword">int</span> <span className="function">RechercheBinaire</span>(<span className="keyword">int</span>[] tableauTrie, <span className="keyword">int</span> cible)
                {'{'}
                <span className="keyword">int</span> gauche = <span className="number">0</span>;
    <span className="keyword">int</span> droite = tableauTrie.Length - <span className="number">1</span>;

    <span className="keyword">while</span> (gauche &lt;= droite)
                {'{'}
                <span className="keyword">int</span> milieu = (gauche + droite) / <span className="number">2</span>;

        <span className="keyword">if</span> (tableauTrie[milieu] == cible)
            <span className="keyword">return</span> milieu;
        <span className="keyword">else if</span> (tableauTrie[milieu] &lt; cible)
            gauche = milieu + <span className="number">1</span>;
        <span className="keyword">else</span>
            droite = milieu - <span className="number">1</span>;
                {'}'}

                <span className="keyword">return</span> -<span className="number">1</span>; <span className="comment">// Non trouvé</span>
                {'}'}
</pre>
                    </div>
                    <div className="example-box">
                        <h4>💡 Intuition :</h4>
                        <p>1 000 éléments → ~10 étapes (2¹⁰ = 1 024)</p>
                        <p>1 000 000 éléments → ~20 étapes (2²⁰ = 1 048 576)</p>
                    </div>

                    <h3>Exemple 3 : O(n) - Linéaire</h3>
                    <div className="code-block">
            <pre>
<span className="keyword">int</span> <span className="function">Somme</span>(<span className="keyword">int</span>[] tableau)
                {'{'}
                <span className="keyword">int</span> total = <span className="number">0</span>;

    <span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">0</span>; i &lt; tableau.Length; i++) <span className="comment">// n itérations</span>
                {'{'}
                total += tableau[i];
                {'}'}

                <span className="keyword">return</span> total;
                {'}'}

                <span className="keyword">bool</span> <span className="function">Contient</span>(<span className="keyword">int</span>[] tableau, <span className="keyword">int</span> valeur)
                {'{'}
                <span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">0</span>; i &lt; tableau.Length; i++) <span className="comment">// n itérations max</span>
                {'{'}
                <span className="keyword">if</span> (tableau[i] == valeur)
            <span className="keyword">return true</span>;
                {'}'}

                <span className="keyword">return false</span>;
                {'}'}
</pre>
                    </div>

                    <h3>Exemple 4 : O(n²) - Quadratique</h3>
                    <div className="code-block">
            <pre>
<span className="keyword">void</span> <span className="function">TriBulles</span>(<span className="keyword">int</span>[] tableau)
                {'{'}
                <span className="keyword">int</span> n = tableau.Length;

    <span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">0</span>; i &lt; n - <span className="number">1</span>; i++) <span className="comment">// n itérations</span>
                {'{'}
                <span className="keyword">for</span> (<span className="keyword">int</span> j = <span className="number">0</span>; j &lt; n - i - <span className="number">1</span>; j++) <span className="comment">// n itérations</span>
                {'{'}
                <span className="keyword">if</span> (tableau[j] &gt; tableau[j + <span className="number">1</span>])
                {'{'}
                <span className="comment">// Échange</span>
                <span className="keyword">int</span> temp = tableau[j];
                tableau[j] = tableau[j + <span className="number">1</span>];
                tableau[j + <span className="number">1</span>] = temp;
                {'}'}
                {'}'}
                {'}'}
                {'}'}
</pre>
                    </div>
                    <div className="example-box" style={{ borderColor: 'var(--accent-tertiary)' }}>
                        <h4>💡 Intuition :</h4>
                        <p>1 000 éléments → ~1 000 000 opérations</p>
                        <p>2 000 éléments → ~4 000 000 opérations (4× plus !)</p>
                    </div>

                    <h3>Exemple 5 : O(2ⁿ) - Exponentielle</h3>
                    <div className="code-block">
            <pre>
<span className="keyword">int</span> <span className="function">FibonacciNaif</span>(<span className="keyword">int</span> n)
                {'{'}
                <span className="keyword">if</span> (n &lt;= <span className="number">1</span>)
        <span className="keyword">return</span> n;

    <span className="keyword">return</span> <span className="function">FibonacciNaif</span>(n - <span className="number">1</span>) + <span className="function">FibonacciNaif</span>(n - <span className="number">2</span>); <span className="comment">// 2 appels récursifs</span>
                {'}'}
</pre>
                    </div>
                    <div className="example-box" style={{ borderColor: 'var(--accent-tertiary)' }}>
                        <h4>⚠️ Attention :</h4>
                        <p>n = 10 → 1 024 opérations</p>
                        <p>n = 20 → 1 048 576 opérations</p>
                        <p>n = 30 → 1 073 741 824 opérations (plus d'1 milliard !)</p>
                    </div>
                </section>

                {/* Méthode de calcul */}
                <section id="methode-calcul">
                    <h2><span className="emoji">🔢</span> Méthode de Calcul de la Complexité</h2>

                    <h3>Étape 1 : Identifier les opérations élémentaires</h3>
                    <p>Une opération élémentaire = 1 unité de temps :</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>
                        <div style={{ background: 'var(--bg-light)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--accent-primary)' }}>
                            <strong>Affectation</strong>
                            <code style={{ display: 'block', marginTop: '.5rem' }}>x = 5;</code>
                        </div>
                        <div style={{ background: 'var(--bg-light)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--accent-secondary)' }}>
                            <strong>Comparaison</strong>
                            <code style={{ display: 'block', marginTop: '.5rem' }}>if (x &gt; y)</code>
                        </div>
                        <div style={{ background: 'var(--bg-light)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--accent-tertiary)' }}>
                            <strong>Arithmétique</strong>
                            <code style={{ display: 'block', marginTop: '.5rem' }}>a + b</code>
                        </div>
                        <div style={{ background: 'var(--bg-light)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--linearithmic)' }}>
                            <strong>Accès tableau</strong>
                            <code style={{ display: 'block', marginTop: '.5rem' }}>tab[i]</code>
                        </div>
                    </div>

                    <h3>Étape 2 : Compter les répétitions</h3>
                    <div className="example-box">
                        <div className="code-block">
              <pre>
<span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">0</span>; i &lt; n; i++) <span className="comment">// Répété n fois</span>
                  {'{'}
                  Console.WriteLine(i); <span className="comment">// 1 opération</span>
                  {'}'}
                  <span className="comment">// Total : n opérations → O(n)</span>
</pre>
                        </div>
                    </div>

                    <h3>Étape 3 : Multiplier pour les boucles imbriquées</h3>
                    <div className="example-box">
                        <div className="code-block">
              <pre>
<span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">0</span>; i &lt; n; i++) <span className="comment">// n fois</span>
                  {'{'}
                  <span className="keyword">for</span> (<span className="keyword">int</span> j = <span className="number">0</span>; j &lt; n; j++) <span className="comment">// n fois</span>
                  {'{'}
                  Console.WriteLine(i + j); <span className="comment">// 1 opération</span>
                  {'}'}
                  {'}'}
                  <span className="comment">// Total : n × n = n² opérations → O(n²)</span>
</pre>
                        </div>
                    </div>

                    <h3>Étape 4 : Additionner pour les blocs séquentiels</h3>
                    <div className="example-box">
                        <div className="code-block">
              <pre>
<span className="comment">// Bloc 1</span>
<span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">0</span>; i &lt; n; i++) <span className="comment">// n opérations</span>
                  {'{'}
                  Console.WriteLine(i);
                  {'}'}

                  <span className="comment">// Bloc 2</span>
<span className="keyword">for</span> (<span className="keyword">int</span> j = <span className="number">0</span>; j &lt; n; j++) <span className="comment">// n opérations</span>
                  {'{'}
                  Console.WriteLine(j);
                  {'}'}

                  <span className="comment">// Total : n + n = 2n → O(n) (on ignore la constante)</span>
</pre>
                        </div>
                    </div>

                    <h3>📝 Exemples Détaillés avec Calculs</h3>
                    <div className="example-box">
                        <h4>Exemple 1 : Une boucle simple</h4>
                        <div className="code-block">
              <pre>
<span className="keyword">int</span> <span className="function">Somme</span>(<span className="keyword">int</span>[] tableau)
                  {'{'}
                  <span className="keyword">int</span> total = <span className="number">0</span>; <span className="comment">// 1 opération</span>

    <span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">0</span>; i &lt; tableau.Length; i++) <span className="comment">// n itérations</span>
                  {'{'}
                  total += tableau[i]; <span className="comment">// 2 opérations (lecture + addition)</span>
                  {'}'}

                  <span className="keyword">return</span> total; <span className="comment">// 1 opération</span>
                  {'}'}
</pre>
                        </div>
                        <div style={{ background: 'var(--bg-light)', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem' }}>
                            <p><strong>Calcul :</strong></p>
                            <p style={{ margin: '.5rem 0' }}>1 (init) + n × 2 (boucle) + 1 (return) = <strong>2n + 2</strong></p>
                            <p style={{ margin: '.5rem 0' }}>Simplification : On garde le terme dominant et on ignore les constantes</p>
                            <p style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0, 255, 135, 0.1)', borderRadius: '8px' }}>
                                <strong style={{ color: 'var(--accent-primary)', fontSize: '1.2rem' }}>Complexité : O(n)</strong>
                            </p>
                        </div>
                    </div>

                    <div className="example-box">
                        <h4>Exemple 2 : Deux boucles imbriquées</h4>
                        <div className="code-block">
              <pre>
<span className="keyword">void</span> <span className="function">AfficherPaires</span>(<span className="keyword">int</span>[] tableau)
                  {'{'}
                  <span className="keyword">int</span> n = tableau.Length;

    <span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">0</span>; i &lt; n; i++) <span className="comment">// n itérations</span>
                  {'{'}
                  <span className="keyword">for</span> (<span className="keyword">int</span> j = <span className="number">0</span>; j &lt; n; j++) <span className="comment">// n itérations</span>
                  {'{'}
                  Console.WriteLine(<span className="string">tableau[i], tableau[j]"</span>); <span className="comment">// 1 opération</span>
                  {'}'}
                  {'}'}
                  {'}'}
</pre>
                        </div>
                        <div style={{ background: 'var(--bg-light)', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem' }}>
                            <p><strong>Calcul :</strong></p>
                            <p style={{ margin: '.5rem 0' }}>Boucle externe : n itérations</p>
                            <p style={{ margin: '.5rem 0' }}>Boucle interne : n itérations pour chaque itération externe</p>
                            <p style={{ margin: '.5rem 0' }}>Total : n × n × 1 = <strong>n²</strong></p>
                            <p style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255, 0, 110, 0.1)', borderRadius: '8px' }}>
                                <strong style={{ color: 'var(--quadratic)', fontSize: '1.2rem' }}>Complexité : O(n²)</strong>
                            </p>
                        </div>
                    </div>

                    <div className="example-box">
                        <h4>Exemple 3 : Boucle avec pas variable</h4>
                        <div className="code-block">
              <pre>
<span className="keyword">void</span> <span className="function">Algo</span>(<span className="keyword">int</span> n)
                  {'{'}
                  <span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">1</span>; i &lt; n; i = i * <span className="number">2</span>) <span className="comment">// Combien d'itérations ?</span>
                  {'{'}
                  Console.WriteLine(i);
                  {'}'}
                  {'}'}
</pre>
                        </div>
                        <div style={{ background: 'var(--bg-light)', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem' }}>
                            <p><strong>Analyse :</strong></p>
                            <p style={{ margin: '.5rem 0' }}>i prend les valeurs : 1, 2, 4, 8, 16, ..., jusqu'à n</p>
                            <p style={{ margin: '.5rem 0' }}>Séquence : 2⁰, 2¹, 2², 2³, ..., 2ᵏ où 2ᵏ ≈ n</p>
                            <p style={{ margin: '.5rem 0' }}>Donc : k ≈ log₂(n)</p>
                            <p style={{ margin: '.5rem 0' }}>Nombre d'itérations : <strong>log₂(n)</strong></p>
                            <p style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0, 212, 255, 0.1)', borderRadius: '8px' }}>
                                <strong style={{ color: 'var(--logarithmic)', fontSize: '1.2rem' }}>Complexité : O(log n)</strong>
                            </p>
                        </div>
                    </div>

                    <div className="example-box">
                        <h4>Exemple 4 : Algorithme complexe avec plusieurs parties</h4>
                        <div className="code-block">
              <pre><span className="keyword">void</span> <span className="function">AlgoMixte</span>(<span className="keyword">int</span>[] tableau)
                  {'{'}
                      <span className="keyword">int</span> n = tableau.Length;
                      <span className="comment">// Partie 1 : O(n)</span>
                      <span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">0</span>; i &lt; n; i++)
                  {'}'}
                      Console.WriteLine(tableau[i]);
                  {'}'}
                      <span className="comment">// Partie 2 : O(n²)</span>
                      <span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">0</span>; i &lt; n; i++)
                  {'}'}
                      <span className="keyword">for</span> (<span className="keyword">int</span> j = <span className="number">0</span>; j &lt; n; j++)
                  {'}'}
                      Console.WriteLine(tableau[i] + tableau[j]);
                  {'{'}
                  {'{'}
                  {'{'}</pre>
                        </div>
                        <div style={{ background: 'var(--bg-light)', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem' }}>
                            <p><strong>Calcul :</strong></p>
                            <p style={{ margin: '.5rem 0' }}><strong>Partie 1 :</strong> n opérations → O(n)</p>
                            <p style={{ margin: '.5rem 0' }}><strong>Partie 2 :</strong> n² opérations → O(n²)</p>
                            <p style={{ margin: '.5rem 0' }}><strong>Total :</strong> n + n²</p>
                            <p style={{ margin: '.5rem 0', padding: '1rem', background: 'var(--bg-dark)', borderRadius: '8px' }}>
                                On garde le terme dominant : n² croît beaucoup plus vite que n<br />
                                Quand n = 1000 : n = 1000, mais n² = 1 000 000
                            </p>
                            <p style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255, 0, 110, 0.1)', borderRadius: '8px' }}>
                                <strong style={{ color: 'var(--quadratic)', fontSize: '1.2rem' }}>Complexité finale : O(n²)</strong>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Complexité spatiale */}
                <section id="spatiale">
                    <h2><span className="emoji">💾</span> Analyse de la Complexité Spatiale</h2>
                    <p>La complexité spatiale mesure la <strong>mémoire supplémentaire</strong> utilisée par l'algorithme.</p>

                    <h3>O(1) - Espace constant</h3>
                    <div className="code-block">
            <pre>
<span className="keyword">int</span> <span className="function">Maximum</span>(<span className="keyword">int</span>[] tableau)
                {'{'}
                <span className="keyword">int</span> max = tableau[<span className="number">0</span>]; <span className="comment">// 1 variable → O(1)</span>

    <span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">1</span>; i &lt; tableau.Length; i++)
                {'{'}
                <span className="keyword">if</span> (tableau[i] &gt; max)
            max = tableau[i];
                {'}'}

                <span className="keyword">return</span> max;
                {'}'}
</pre>
                    </div>
                    <p>✅ Mémoire utilisée : Seulement <code>max</code> et <code>i</code> → O(1)</p>

                    <h3>O(n) - Espace linéaire</h3>
                    <div className="code-block">
            <pre>
<span className="keyword">int</span>[] <span className="function">DoublerTableau</span>(<span className="keyword">int</span>[] tableau)
                {'{'}
                <span className="keyword">int</span>[] nouveau = <span className="keyword">new int</span>[tableau.Length]; <span className="comment">// Nouveau tableau de taille n</span>

    <span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">0</span>; i &lt; tableau.Length; i++)
                {'{'}
                nouveau[i] = tableau[i] * <span className="number">2</span>;
                {'}'}

                <span className="keyword">return</span> nouveau;
                {'}'}
</pre>
                    </div>
                    <p>💾 Mémoire utilisée : Un nouveau tableau de taille n → O(n)</p>

                    <h3>⚖️ Compromis Temps vs Espace</h3>
                    <p>Parfois, on peut échanger du temps contre de l'espace (et vice‑versa).</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', margin: '2rem 0' }}>
                        <div className="example-box">
                            <h4>Version 1 : Rapide mais gourmande</h4>
                            <p><strong>O(n)</strong> temps, <strong>O(n)</strong> espace</p>
                            <p>Utilise un tableau pour stocker tous les résultats</p>
                        </div>
                        <div className="example-box">
                            <h4>Version 2 : Économe en mémoire</h4>
                            <p><strong>O(n)</strong> temps, <strong>O(1)</strong> espace</p>
                            <p>Utilise seulement 2 variables</p>
                        </div>
                    </div>
                </section>

                {/* Règles de calcul */}
                <section id="regles">
                    <h2><span className="emoji">📏</span> Règles de Calcul et Simplification</h2>
                    <div className="rules-grid">
                        <div className="rule-card">
                            <h4>Règle 1 : Garder le terme dominant</h4>
                            <p><code>3n² + 5n + 10</code> → <strong style={{ color: 'var(--accent-primary)' }}>O(n²)</strong></p>
                            <p><code>n³ + 100n²</code> → <strong style={{ color: 'var(--accent-primary)' }}>O(n³)</strong></p>
                            <p><code>2n + log n</code> → <strong style={{ color: 'var(--accent-primary)' }}>O(n)</strong></p>
                        </div>
                        <div className="rule-card">
                            <h4>Règle 2 : Ignorer les constantes multiplicatives</h4>
                            <p><code>5n</code> → <strong style={{ color: 'var(--accent-primary)' }}>O(n)</strong></p>
                            <p><code>100n</code> → <strong style={{ color: 'var(--accent-primary)' }}>O(n)</strong></p>
                            <p><code>0.001n</code> → <strong style={{ color: 'var(--accent-primary)' }}>O(n)</strong></p>
                        </div>
                        <div className="rule-card">
                            <h4>Règle 3 : Ignorer les constantes additives</h4>
                            <p><code>n + 1000</code> → <strong style={{ color: 'var(--accent-primary)' }}>O(n)</strong></p>
                            <p><code>n² + 50</code> → <strong style={{ color: 'var(--accent-primary)' }}>O(n²)</strong></p>
                            <p><code>log n + 100</code> → <strong style={{ color: 'var(--accent-primary)' }}>O(log n)</strong></p>
                        </div>
                        <div className="rule-card">
                            <h4>Règle 4 : Additionner pour les séquences</h4>
                            <p><code>O(n) + O(n²)</code> = <strong style={{ color: 'var(--accent-primary)' }}>O(n²)</strong></p>
                            <p>Deux boucles l'une après l'autre</p>
                        </div>
                        <div className="rule-card">
                            <h4>Règle 5 : Multiplier pour les imbrications</h4>
                            <p><code>O(n) × O(n)</code> = <strong style={{ color: 'var(--accent-primary)' }}>O(n²)</strong></p>
                            <p>Deux boucles imbriquées</p>
                        </div>
                    </div>
                </section>

                {/* Tris */}
                <section id="tris">
                    <h2><span className="emoji">🔄</span> Analyse des Algorithmes de Tri</h2>
                    <table className="comparison-table">
                        <thead>
                        <tr>
                            <th>Algorithme</th>
                            <th>Meilleur cas</th>
                            <th>Cas moyen</th>
                            <th>Pire cas</th>
                            <th>Espace</th>
                            <th>Stable</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><strong>Tri à Bulles</strong></td>
                            <td className="notation-cell" style={{ color: 'var(--linear)' }}>O(n)</td>
                            <td className="notation-cell" style={{ color: 'var(--quadratic)' }}>O(n²)</td>
                            <td className="notation-cell" style={{ color: 'var(--quadratic)' }}>O(n²)</td>
                            <td className="notation-cell" style={{ color: 'var(--constant)' }}>O(1)</td>
                            <td>✅ Oui</td>
                        </tr>
                        <tr>
                            <td><strong>Tri par Insertion</strong></td>
                            <td className="notation-cell" style={{ color: 'var(--linear)' }}>O(n)</td>
                            <td className="notation-cell" style={{ color: 'var(--quadratic)' }}>O(n²)</td>
                            <td className="notation-cell" style={{ color: 'var(--quadratic)' }}>O(n²)</td>
                            <td className="notation-cell" style={{ color: 'var(--constant)' }}>O(1)</td>
                            <td>✅ Oui</td>
                        </tr>
                        <tr>
                            <td><strong>Tri par Sélection</strong></td>
                            <td className="notation-cell" style={{ color: 'var(--quadratic)' }}>O(n²)</td>
                            <td className="notation-cell" style={{ color: 'var(--quadratic)' }}>O(n²)</td>
                            <td className="notation-cell" style={{ color: 'var(--quadratic)' }}>O(n²)</td>
                            <td className="notation-cell" style={{ color: 'var(--constant)' }}>O(1)</td>
                            <td>❌ Non</td>
                        </tr>
                        <tr style={{ background: 'rgba(0, 255, 135, 0.1)' }}>
                            <td><strong>MergeSort</strong></td>
                            <td className="notation-cell" style={{ color: 'var(--linearithmic)' }}>O(n log n)</td>
                            <td className="notation-cell" style={{ color: 'var(--linearithmic)' }}>O(n log n)</td>
                            <td className="notation-cell" style={{ color: 'var(--linearithmic)' }}>O(n log n)</td>
                            <td className="notation-cell" style={{ color: 'var(--linear)' }}>O(n)</td>
                            <td>✅ Oui</td>
                        </tr>
                        <tr style={{ background: 'rgba(0, 255, 135, 0.1)' }}>
                            <td><strong>QuickSort</strong></td>
                            <td className="notation-cell" style={{ color: 'var(--linearithmic)' }}>O(n log n)</td>
                            <td className="notation-cell" style={{ color: 'var(--linearithmic)' }}>O(n log n)</td>
                            <td className="notation-cell" style={{ color: 'var(--quadratic)' }}>O(n²)</td>
                            <td className="notation-cell" style={{ color: 'var(--logarithmic)' }}>O(log n)</td>
                            <td>❌ Non</td>
                        </tr>
                        <tr style={{ background: 'rgba(0, 255, 135, 0.1)' }}>
                            <td><strong>HeapSort</strong></td>
                            <td className="notation-cell" style={{ color: 'var(--linearithmic)' }}>O(n log n)</td>
                            <td className="notation-cell" style={{ color: 'var(--linearithmic)' }}>O(n log n)</td>
                            <td className="notation-cell" style={{ color: 'var(--linearithmic)' }}>O(n log n)</td>
                            <td className="notation-cell" style={{ color: 'var(--constant)' }}>O(1)</td>
                            <td>❌ Non</td>
                        </tr>
                        </tbody>
                    </table>

                    <div className="example-box">
                        <h4>💡 Quel algorithme choisir ?</h4>
                        <p>Pour <strong>1 000 000 d'éléments</strong> :</p>
                        <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: '1rem' }}>
                            <li>❌ Tri à bulles : ~1 000 000 000 000 opérations (1 trillion !)</li>
                            <li>✅ QuickSort : ~20 000 000 opérations</li>
                            <li>🚀 QuickSort est <strong style={{ color: 'var(--accent-primary)' }}>50 000 fois plus rapide !</strong></li>
                        </ul>
                    </div>
                </section>

                {/* Exercices */}
                <section id="exercices">
                    <h2><span className="emoji">🎯</span> Exercices Pratiques</h2>

                    {/* A */}
                    <h3>Exercice 1 : Identifier la complexité</h3>
                    <p>Pour chaque code, déterminez la complexité temporelle :</p>
                    <div className="example-box">
                        <h4>Code A :</h4>
                        <div className="code-block">
              <pre>
<span className="keyword">int</span> <span className="function">Somme</span>(<span className="keyword">int</span> n)
                  {'{'}
                  <span className="keyword">int</span> total = <span className="number">0</span>;

    <span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">1</span>; i &lt;= n; i++)
                  {'{'}
                  total += i;
                  {'}'}

                  <span className="keyword">return</span> total;
                  {'}'}
</pre>
                        </div>
                        <details>
                            <summary style={{ cursor: 'pointer', color: 'var(--accent-primary)', padding: '1rem', background: 'var(--bg-light)', borderRadius: '8px', marginTop: '1rem' }}>
                                <strong>💡 Cliquez pour voir la réponse et l'analyse</strong>
                            </summary>
                            <div style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(0, 255, 135, 0.1)', borderRadius: '8px', borderLeft: '4px solid var(--accent-primary)' }}>
                                <p style={{ fontSize: '1.3rem', marginBottom: '1rem' }}><strong style={{ color: 'var(--accent-primary)' }}>Réponse : O(n)</strong></p>
                                <p><strong>Analyse :</strong></p>
                                <ul style={{ marginLeft: '1.5rem', marginTop: '.5rem' }}>
                                    <li>Une seule boucle de n itérations</li>
                                    <li>Chaque itération fait 2 opérations (addition et affectation)</li>
                                    <li>Total : 2n opérations → O(n)</li>
                                </ul>
                            </div>
                        </details>
                    </div>

                    {/* B */}
                    <div className="example-box">
                        <h4>Code B :</h4>
                        <div className="code-block">
              <pre>
<span className="keyword">void</span> <span className="function">Mystere1</span>(<span className="keyword">int</span> n)
                  {'{'}
                  <span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">0</span>; i &lt; n; i++)
                  {'{'}
                  <span className="keyword">for</span> (<span className="keyword">int</span> j = <span className="number">0</span>; j &lt; n; j++)
                  {'{'}
                  Console.WriteLine(i + j);
                  {'}'}
                  {'}'}
                  {'}'}
</pre>
                        </div>
                        <details>
                            <summary style={{ cursor: 'pointer', color: 'var(--accent-primary)', padding: '1rem', background: 'var(--bg-light)', borderRadius: '8px', marginTop: '1rem' }}>
                                <strong>💡 Cliquez pour voir la réponse et l'analyse</strong>
                            </summary>
                            <div style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(0, 255, 135, 0.1)', borderRadius: '8px', borderLeft: '4px solid var(--accent-primary)' }}>
                                <p style={{ fontSize: '1.3rem', marginBottom: '1rem' }}><strong style={{ color: 'var(--accent-primary)' }}>Réponse : O(n²)</strong></p>
                                <p><strong>Analyse :</strong></p>
                                <ul style={{ marginLeft: '1.5rem', marginTop: '.5rem' }}>
                                    <li>Deux boucles imbriquées</li>
                                    <li>Boucle externe : n itérations</li>
                                    <li>Boucle interne : n itérations pour chaque itération externe</li>
                                    <li>Total : n × n = n² opérations → O(n²)</li>
                                </ul>
                            </div>
                        </details>
                    </div>

                    {/* C */}
                    <div className="example-box">
                        <h4>Code C :</h4>
                        <div className="code-block">
              <pre>
<span className="keyword">void</span> <span className="function">Mystere2</span>(<span className="keyword">int</span> n)
                  {'{'}
                  <span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">1</span>; i &lt; n; i = i * <span className="number">2</span>)
                  {'{'}
                  Console.WriteLine(i);
                  {'}'}
                  {'}'}
</pre>
                        </div>
                        <details>
                            <summary style={{ cursor: 'pointer', color: 'var(--accent-primary)', padding: '1rem', background: 'var(--bg-light)', borderRadius: '8px', marginTop: '1rem' }}>
                                <strong>💡 Cliquez pour voir la réponse et l'analyse</strong>
                            </summary>
                            <div style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(0, 255, 135, 0.1)', borderRadius: '8px', borderLeft: '4px solid var(--accent-primary)' }}>
                                <p style={{ fontSize: '1.3rem', marginBottom: '1rem' }}><strong style={{ color: 'var(--accent-primary)' }}>Réponse : O(log n)</strong></p>
                                <p><strong>Analyse :</strong></p>
                                <ul style={{ marginLeft: '1.5rem', marginTop: '.5rem' }}>
                                    <li>i double à chaque itération : 1, 2, 4, 8, 16, ...</li>
                                    <li>La boucle s'arrête quand i ≥ n</li>
                                    <li>Nombre d'itérations : log₂(n)</li>
                                    <li>Exemple : n = 1000 → ~10 itérations (2¹⁰ = 1024)</li>
                                </ul>
                            </div>
                        </details>
                    </div>

                    {/* D */}
                    <div className="example-box">
                        <h4>Code D :</h4>
                        <div className="code-block">
              <pre><span className="keyword">void</span> <span className="function">Mystere3</span>(<span className="keyword">int</span> n)
                  {'{'}
                      <span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">0</span>; i &lt; n; i++)
                  {'{'}
                      Console.WriteLine(i);
                  {'}'}
                      <span className="keyword">for</span> (<span className="keyword">int</span> j = <span className="number">0</span>; j &lt; n; j++)
                  {'{'}
                      <span className="keyword">for</span> (<span className="keyword">int</span> k = <span className="number">0</span>; k &lt; n; k++)
                  {'{'}
                      Console.WriteLine(j + k);
                  {'}'}
                  {'}'}
                  {'}'}</pre>
                        </div>
                        <details>
                            <summary style={{ cursor: 'pointer', color: 'var(--accent-primary)', padding: '1rem', background: 'var(--bg-light)', borderRadius: '8px', marginTop: '1rem' }}>
                                <strong>💡 Cliquez pour voir la réponse et l'analyse</strong>
                            </summary>
                            <div style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(0, 255, 135, 0.1)', borderRadius: '8px', borderLeft: '4px solid var(--accent-primary)' }}>
                                <p style={{ fontSize: '1.3rem', marginBottom: '1rem' }}><strong style={{ color: 'var(--accent-primary)' }}>Réponse : O(n²)</strong></p>
                                <p><strong>Analyse :</strong></p>
                                <ul style={{ marginLeft: '1.5rem', marginTop: '.5rem' }}>
                                    <li>Première boucle : O(n)</li>
                                    <li>Deuxième partie : O(n²) (deux boucles imbriquées)</li>
                                    <li>Total : O(n) + O(n²)</li>
                                    <li>On garde le terme dominant : <strong>O(n²)</strong></li>
                                </ul>
                            </div>
                        </details>
                    </div>

                    {/* E */}
                    <div className="example-box">
                        <h4>Code E :</h4>
                        <div className="code-block">
              <pre><span className="keyword">void</span> <span className="function">Mystere4</span>(<span className="keyword">int</span>[] tableau)
                  {'{'}
                      <span className="keyword">int</span> n = tableau.Length;
                      <span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">0</span>; i &lt; n; i++)
                  {'{'}
                      <span className="keyword">for</span> (<span className="keyword">int</span> j = i; j &lt; n; j++)
                  {'{'}
                      Console.WriteLine(tableau[i] + tableau[j]);
                  {'}'}
                  {'}'}
                  {'}'}</pre>
                        </div>
                        <details>
                            <summary style={{ cursor: 'pointer', color: 'var(--accent-primary)', padding: '1rem', background: 'var(--bg-light)', borderRadius: '8px', marginTop: '1rem' }}>
                                <strong>💡 Cliquez pour voir la réponse et l'analyse</strong>
                            </summary>
                            <div style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(0, 255, 135, 0.1)', borderRadius: '8px', borderLeft: '4px solid var(--accent-primary)' }}>
                                <p style={{ fontSize: '1.3rem', marginBottom: '1rem' }}><strong style={{ color: 'var(--accent-primary)' }}>Réponse : O(n²)</strong></p>
                                <p><strong>Analyse :</strong></p>
                                <ul style={{ marginLeft: '1.5rem', marginTop: '.5rem' }}>
                                    <li>Même si la boucle interne commence à i (pas à 0)</li>
                                    <li>Nombre d'itérations : n + (n-1) + (n-2) + ... + 1 = n(n+1)/2</li>
                                    <li>n(n+1)/2 ≈ n²/2 opérations</li>
                                    <li>On ignore la constante 1/2 : <strong>O(n²)</strong></li>
                                </ul>
                            </div>
                        </details>
                    </div>

                    <h3>Exercice 2 : Simplifier les expressions</h3>
                    <p>Simplifiez ces expressions en notation Big‑O :</p>
                    <div className="rules-grid">
                        <div className="rule-card">
                            <p><code>5n + 100</code> → <strong style={{ color: 'var(--accent-primary)' }}>O(n)</strong></p>
                            <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', marginTop: '.5rem' }}>On ignore les constantes 5 et 100</p>
                        </div>
                        <div className="rule-card">
                            <p><code>3n² + 2n + 1</code> → <strong style={{ color: 'var(--accent-primary)' }}>O(n²)</strong></p>
                            <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', marginTop: '.5rem' }}>Le terme n² domine</p>
                        </div>
                        <div className="rule-card">
                            <p><code>n³ + 50n² + 100n</code> → <strong style={{ color: 'var(--accent-primary)' }}>O(n³)</strong></p>
                            <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', marginTop: '.5rem' }}>Le terme n³ domine</p>
                        </div>
                        <div className="rule-card">
                            <p><code>log n + n</code> → <strong style={{ color: 'var(--accent-primary)' }}>O(n)</strong></p>
                            <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', marginTop: '.5rem' }}>n croît plus vite que log n</p>
                        </div>
                        <div className="rule-card">
                            <p><code>2ⁿ + n³</code> → <strong style={{ color: 'var(--accent-primary)' }}>O(2ⁿ)</strong></p>
                            <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', marginTop: '.5rem' }}>2ⁿ croît exponentiellement</p>
                        </div>
                        <div className="rule-card">
                            <p><code>n log n + n</code> → <strong style={{ color: 'var(--accent-primary)' }}>O(n log n)</strong></p>
                            <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', marginTop: '.5rem' }}>n log n domine n</p>
                        </div>
                    </div>

                    <h3>Exercice 3 : Comparaison d'algorithmes</h3>
                    <div className="example-box">
                        <h4>Question :</h4>
                        <p>Vous devez trier 1 000 000 d'éléments. Quel algorithme choisissez‑vous et pourquoi ?</p>
                        <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: '1rem' }}>
                            <li><strong>A)</strong> Tri à bulles - O(n²)</li>
                            <li><strong>B)</strong> Tri par insertion - O(n²)</li>
                            <li><strong>C)</strong> QuickSort - O(n log n)</li>
                        </ul>
                        <details>
                            <summary style={{ cursor: 'pointer', color: 'var(--accent-primary)', padding: '1rem', background: 'var(--bg-light)', borderRadius: '8px', marginTop: '1rem' }}>
                                <strong>💡 Cliquez pour voir la réponse détaillée</strong>
                            </summary>
                            <div style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(0, 255, 135, 0.1)', borderRadius: '8px', borderLeft: '4px solid var(--accent-primary)' }}>
                                <p style={{ fontSize: '1.3rem', marginBottom: '1rem' }}><strong style={{ color: 'var(--accent-primary)' }}>Réponse : C) QuickSort - O(n log n)</strong></p>
                                <p><strong>Calcul approximatif :</strong></p>
                                <ul style={{ marginLeft: '1.5rem', marginTop: '.5rem' }}>
                                    <li><strong style={{ color: 'var(--accent-tertiary)' }}>Tri à bulles :</strong> 1 000 000² = 1 000 000 000 000 opérations (1 trillion !)</li>
                                    <li><strong style={{ color: 'var(--accent-primary)' }}>QuickSort :</strong> 1 000 000 × log₂(1 000 000) ≈ 1 000 000 × 20 = 20 000 000 opérations</li>
                                </ul>
                                <p style={{ marginTop: '1rem', padding: '1rem', background: 'var(--bg-dark)', borderRadius: '8px' }}>
                                    🚀 <strong>QuickSort est 50 000 fois plus rapide !</strong>
                                </p>
                            </div>
                        </details>
                    </div>

                    <h3>Exercice 4 : Analyse complète d'un algorithme</h3>
                    <div className="example-box">
                        <h4>Analysez cet algorithme en détail :</h4>
                        <div className="code-block">
              <pre>
<span className="keyword">int</span> <span className="function">Mystere</span>(<span className="keyword">int</span>[] tableau)
                  {'{'}
                  <span className="keyword">int</span> n = tableau.Length;
    <span className="keyword">int</span> compteur = <span className="number">0</span>;

    <span className="comment">// Partie 1</span>
    <span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">0</span>; i &lt; n; i++)
                  {'{'}
                  <span className="keyword">if</span> (tableau[i] % <span className="number">2</span> == <span className="number">0</span>)
            compteur++;
                  {'}'}

                  <span className="comment">// Partie 2</span>
    <span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">0</span>; i &lt; n; i++)
                  {'{'}
                  <span className="keyword">for</span> (<span className="keyword">int</span> j = <span className="number">0</span>; j &lt; n; j++)
                  {'{'}
                  <span className="keyword">if</span> (tableau[i] &gt; tableau[j])
                compteur++;
                  {'}'}
                  {'}'}

                  <span className="keyword">return</span> compteur;
                  {'}'}
</pre>
                        </div>
                        <details>
                            <summary style={{ cursor: 'pointer', color: 'var(--accent-primary)', padding: '1rem', background: 'var(--bg-light)', borderRadius: '8px', marginTop: '1rem' }}>
                                <strong>💡 Cliquez pour voir l'analyse complète</strong>
                            </summary>
                            <div style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(0, 255, 135, 0.1)', borderRadius: '8px', borderLeft: '4px solid var(--accent-primary)' }}>
                                <p style={{ fontSize: '1.3rem', marginBottom: '1rem' }}><strong style={{ color: 'var(--accent-primary)' }}>Complexité finale : O(n²)</strong></p>

                                <h4 style={{ color: 'var(--accent-secondary)', marginTop: '1.5rem' }}>Analyse détaillée :</h4>
                                <div style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: '8px', margin: '1rem 0' }}>
                                    <p><strong>Partie 1 :</strong></p>
                                    <ul style={{ marginLeft: '1.5rem', marginTop: '.5rem' }}>
                                        <li>Une boucle de n itérations</li>
                                        <li>Chaque itération : 1 comparaison + 1 incrémentation potentielle</li>
                                        <li>Complexité : <strong style={{ color: 'var(--linear)' }}>O(n)</strong></li>
                                    </ul>
                                </div>

                                <div style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: '8px', margin: '1rem 0' }}>
                                    <p><strong>Partie 2 :</strong></p>
                                    <ul style={{ marginLeft: '1.5rem', marginTop: '.5rem' }}>
                                        <li>Deux boucles imbriquées (n × n)</li>
                                        <li>Chaque paire d'éléments est comparée</li>
                                        <li>Total : n² comparaisons</li>
                                        <li>Complexité : <strong style={{ color: 'var(--quadratic)' }}>O(n²)</strong></li>
                                    </ul>
                                </div>

                                <div style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: '8px', margin: '1rem 0' }}>
                                    <p><strong>Complexité totale :</strong></p>
                                    <ul style={{ marginLeft: '1.5rem', marginTop: '.5rem' }}>
                                        <li>Partie 1 + Partie 2 = O(n) + O(n²)</li>
                                        <li>On garde le terme dominant</li>
                                        <li>Résultat final : <strong style={{ color: 'var(--accent-primary)' }}>O(n²)</strong></li>
                                    </ul>
                                </div>

                                <div style={{ background: 'rgba(0, 212, 255, 0.1)', padding: '1rem', borderRadius: '8px', margin: '1rem 0', borderLeft: '4px solid var(--accent-secondary)' }}>
                                    <p><strong>💡 Conseil d'optimisation :</strong></p>
                                    <p style={{ marginTop: '.5rem' }}>
                                        La Partie 2 compte le nombre de paires où tableau[i] &gt; tableau[j].
                                        Cet algorithme pourrait être optimisé selon le besoin réel !
                                    </p>
                                </div>
                            </div>
                        </details>
                    </div>
                </section>

                <footer>
                    <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                        <span className="emoji">🚀</span> Continuez à pratiquer et à analyser vos algorithmes !
                    </p>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        La maîtrise de la complexité algorithmique est essentielle pour devenir un excellent développeur.
                    </p>
                </footer>
            </div>
        </div>
    );
}