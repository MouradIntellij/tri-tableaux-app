import React, { useEffect, useRef, useState } from 'react';
import {
    Chart,
    LineController,  // 🔹 AJOUT CRITIQUE : Enregistrement du contrôleur de ligne
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js";

// 🔹 Enregistrement de tous les composants nécessaires
Chart.register(
    LineController,  // 🔹 CRITIQUE : Sans ceci, l'erreur "line is not a registered controller" apparaît
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
    Filler
);

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
.complexity-card .desc { color: var(--text-secondary); font-size: 1rem; margin-bottom: 1rem; line-height: 1.5; }
.complexity-card .examples { background: rgba(0,0,0,.3); padding: 1rem; border-radius: 8px; margin-top: 1rem; }
.complexity-card .examples strong { display: block; margin-bottom: .5rem; color: var(--accent-primary); }
.complexity-card .examples li { margin: .4rem 0; font-size: .95rem; color: var(--text-secondary); }

/* Code blocks */
.code-block { background: #0d1117; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid rgba(0,255,135,.2); position: relative; overflow-x: auto; }
.code-block:before { content: '💻 Code'; position: absolute; top: .8rem; right: 1rem; font-size: .75rem; color: var(--accent-primary); font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
.code-block pre { margin: 0; font-family: 'JetBrains Mono', monospace; font-size: .95rem; line-height: 1.6; color: #c9d1d9; }
.code-block .keyword { color: #ff7b72; font-weight: 700; }
.code-block .function { color: #d2a8ff; font-weight: 700; }
.code-block .number { color: #79c0ff; }
.code-block .string { color: #a5d6ff; }
.code-block .comment { color: #8b949e; font-style: italic; }

/* Comparison table */
.comparison-table { width: 100%; border-collapse: collapse; margin: 2rem 0; background: var(--bg-light); border-radius: 12px; overflow: hidden; }
.comparison-table th { background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); color: var(--bg-dark); padding: 1rem; text-align: left; font-weight: 700; font-size: 1.1rem; }
.comparison-table td { padding: 1rem; border-bottom: 1px solid rgba(255,255,255,.1); }
.comparison-table tr:last-child td { border-bottom: none; }
.comparison-table tr:hover { background: rgba(0,255,135,.05); }
.complexity-badge { display: inline-block; padding: .3rem .8rem; border-radius: 20px; font-weight: 700; font-size: .85rem; text-transform: uppercase; letter-spacing: .5px; }
.complexity-badge.excellent { background: rgba(0,255,135,.2); color: var(--constant); border: 1px solid var(--constant); }
.complexity-badge.good { background: rgba(0,212,255,.2); color: var(--logarithmic); border: 1px solid var(--logarithmic); }
.complexity-badge.fair { background: rgba(124,58,237,.2); color: var(--linear); border: 1px solid var(--linear); }
.complexity-badge.acceptable { background: rgba(245,158,11,.2); color: var(--linearithmic); border: 1px solid var(--linearithmic); }
.complexity-badge.poor { background: rgba(255,0,110,.2); color: var(--quadratic); border: 1px solid var(--quadratic); }
.complexity-badge.bad { background: rgba(220,38,38,.2); color: var(--cubic); border: 1px solid var(--cubic); }
.complexity-badge.terrible { background: rgba(153,27,27,.2); color: var(--exponential); border: 1px solid var(--exponential); }

/* Example boxes */
.example-box { background: var(--bg-light); border-left: 4px solid var(--accent-primary); padding: 1.5rem; margin: 1.5rem 0; border-radius: 0 12px 12px 0; }
.example-box h4 { color: var(--accent-primary); margin-top: 0; }

/* Rule cards */
.rules-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px,1fr)); gap: 1.5rem; margin: 2rem 0; }
.rule-card { background: linear-gradient(135deg, rgba(0,255,135,.1), rgba(0,212,255,.1)); border-radius: 12px; padding: 1.5rem; border: 1px solid rgba(0,255,135,.3); transition: all .3s; }
.rule-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,255,135,.2); }
.rule-card h4 { color: var(--accent-primary); margin-top: 0; font-size: 1.2rem; }
.rule-card code { background: rgba(0,0,0,.4); padding: .2rem .5rem; border-radius: 4px; color: var(--accent-secondary); font-family: 'Space Mono', monospace; }

/* Footer */
footer { text-align: center; padding: 3rem 2rem; margin-top: 4rem; border-top: 2px solid rgba(0,255,135,.2); }

/* Responsive */
@media (max-width: 768px) {
  h1 { font-size: 3rem; }
  .complexity-grid, .rules-grid { grid-template-columns: 1fr; }
  nav ul { grid-template-columns: 1fr; }
  .comparison-table { font-size: .85rem; }
  .comparison-table th, .comparison-table td { padding: .7rem; }
}
`;

export default function BigOComplexity() {
    const [selectedComplexity, setSelectedComplexity] = useState(null);
    const chartRef = useRef(null);      // 🔹 Référence du canvas
    const chartInstance = useRef(null); // 🔹 Référence de l'instance du chart

    useEffect(() => {
        // 🔹 Détruire l'ancien chart si existant (évite "Canvas is already in use")
        if (chartInstance.current) {
            chartInstance.current.destroy();
            chartInstance.current = null;
        }

        if (!chartRef.current) return;

        const ctx = chartRef.current.getContext('2d');

        // 🔹 Générer des données pour les courbes de complexité
        const n = Array.from({ length: 20 }, (_, i) => i + 1);

        // 🔹 Création du chart
        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: n,
                datasets: [
                    {
                        label: 'O(1) - Constant',
                        data: n.map(() => 1),
                        borderColor: 'rgb(0, 255, 135)',
                        backgroundColor: 'rgba(0, 255, 135, 0.1)',
                        borderWidth: 3,
                        tension: 0,
                        pointRadius: 0,
                        fill: true
                    },
                    {
                        label: 'O(log n) - Logarithmique',
                        data: n.map(x => Math.log2(x)),
                        borderColor: 'rgb(0, 212, 255)',
                        backgroundColor: 'rgba(0, 212, 255, 0.1)',
                        borderWidth: 3,
                        tension: 0.3,
                        pointRadius: 0,
                        fill: true
                    },
                    {
                        label: 'O(n) - Linéaire',
                        data: n,
                        borderColor: 'rgb(124, 58, 237)',
                        backgroundColor: 'rgba(124, 58, 237, 0.1)',
                        borderWidth: 3,
                        tension: 0,
                        pointRadius: 0,
                        fill: true
                    },
                    {
                        label: 'O(n log n) - Linéarithmique',
                        data: n.map(x => x * Math.log2(x)),
                        borderColor: 'rgb(245, 158, 11)',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        borderWidth: 3,
                        tension: 0.3,
                        pointRadius: 0,
                        fill: true
                    },
                    {
                        label: 'O(n²) - Quadratique',
                        data: n.map(x => x * x),
                        borderColor: 'rgb(255, 0, 110)',
                        backgroundColor: 'rgba(255, 0, 110, 0.1)',
                        borderWidth: 3,
                        tension: 0.3,
                        pointRadius: 0,
                        fill: true
                    },
                    {
                        label: 'O(2ⁿ) - Exponentielle',
                        data: n.slice(0, 10).map(x => Math.pow(2, x)),
                        borderColor: 'rgb(153, 27, 27)',
                        backgroundColor: 'rgba(153, 27, 27, 0.1)',
                        borderWidth: 3,
                        tension: 0.3,
                        pointRadius: 0,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#e8eef2',
                            font: {
                                size: 12,
                                family: "'JetBrains Mono', monospace"
                            },
                            padding: 15,
                            usePointStyle: true,
                            pointStyle: 'line'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Comparaison des Complexités Algorithmiques',
                        color: '#00ff87',
                        font: {
                            size: 20,
                            weight: 'bold',
                            family: "'Playfair Display', serif"
                        },
                        padding: {
                            top: 10,
                            bottom: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 14, 39, 0.95)',
                        titleColor: '#00ff87',
                        bodyColor: '#e8eef2',
                        borderColor: '#00ff87',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += context.parsed.y.toFixed(2);
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Taille de l\'entrée (n)',
                            color: '#00d4ff',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#a0aec0',
                            font: {
                                family: "'JetBrains Mono', monospace"
                            }
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Nombre d\'opérations',
                            color: '#00d4ff',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#a0aec0',
                            font: {
                                family: "'JetBrains Mono', monospace"
                            }
                        }
                    }
                }
            }
        });

        // 🔹 Cleanup lors du démontage du composant
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, []); // 🔹 Dépendances vides = exécution une seule fois au montage

    const complexities = [
        {
            id: 'constant',
            name: 'O(1)',
            title: 'Constant',
            color: 'var(--constant)',
            desc: 'Le temps d\'exécution ne dépend pas de la taille des données. C\'est le meilleur cas possible.',
            examples: [
                'Accès à un élément dans un tableau par index',
                'Ajout/suppression au début d\'une liste chaînée',
                'Opérations sur une pile (push/pop)',
                'Recherche dans une table de hachage (moyenne)'
            ]
        },
        {
            id: 'logarithmic',
            name: 'O(log n)',
            title: 'Logarithmique',
            color: 'var(--logarithmic)',
            desc: 'Le temps augmente lentement même pour de grandes données. Excellent pour la recherche.',
            examples: [
                'Recherche binaire dans un tableau trié',
                'Opérations sur un arbre binaire équilibré',
                'Certains algorithmes de division (merge sort)',
                'Recherche dans un arbre B (bases de données)'
            ]
        },
        {
            id: 'linear',
            name: 'O(n)',
            title: 'Linéaire',
            color: 'var(--linear)',
            desc: 'Le temps augmente proportionnellement à la taille des données. Efficacité raisonnable.',
            examples: [
                'Parcourir tous les éléments d\'un tableau',
                'Recherche linéaire',
                'Trouver le minimum/maximum',
                'Copier un tableau'
            ]
        },
        {
            id: 'linearithmic',
            name: 'O(n log n)',
            title: 'Linéarithmique',
            color: 'var(--linearithmic)',
            desc: 'Complexité typique des meilleurs algorithmes de tri. Bon compromis efficacité/performance.',
            examples: [
                'Tri fusion (Merge Sort)',
                'Tri rapide (Quick Sort) - cas moyen',
                'Tri par tas (Heap Sort)',
                'Construction d\'un arbre binaire de recherche équilibré'
            ]
        },
        {
            id: 'quadratic',
            name: 'O(n²)',
            title: 'Quadratique',
            color: 'var(--quadratic)',
            desc: 'Le temps augmente rapidement. Acceptable pour de petites données uniquement.',
            examples: [
                'Tri à bulles (Bubble Sort)',
                'Tri par insertion (Insertion Sort)',
                'Tri par sélection (Selection Sort)',
                'Parcours de toutes les paires d\'éléments'
            ]
        },
        {
            id: 'cubic',
            name: 'O(n³)',
            title: 'Cubique',
            color: 'var(--cubic)',
            desc: 'Très lent pour des données moyennes. Souvent inefficace en pratique.',
            examples: [
                'Multiplication de matrices naïve',
                'Trois boucles imbriquées',
                'Certains algorithmes de graphes non optimisés',
                'Problèmes combinatoires complexes'
            ]
        },
        {
            id: 'exponential',
            name: 'O(2ⁿ)',
            title: 'Exponentielle',
            color: 'var(--exponential)',
            desc: 'Impraticable pour n > 20. Souvent besoin d\'algorithmes alternatifs.',
            examples: [
                'Suite de Fibonacci récursive naïve',
                'Problème du voyageur de commerce (brute force)',
                'Génération de tous les sous-ensembles',
                'Tours de Hanoï'
            ]
        }
    ];

    return (
        <div className="bigO-root">
            <style>{styles}</style>
            <div className="container">
                <header>
                    <h1>Big O Notation</h1>
                    <p className="subtitle">
                        Maîtrisez la complexité algorithmique pour optimiser vos programmes et devenir un développeur d'élite
                    </p>
                </header>

                <nav>
                    <h2>Table des matières</h2>
                    <ul>
                        <li><a href="#introduction">📖 Introduction</a></li>
                        <li><a href="#visualization">📊 Visualisation</a></li>
                        <li><a href="#complexities">🎯 Les complexités</a></li>
                        <li><a href="#comparison">⚖️ Tableau comparatif</a></li>
                        <li><a href="#rules">📏 Règles de calcul</a></li>
                        <li><a href="#examples">💡 Exemples pratiques</a></li>
                        <li><a href="#exercises">🏋️ Exercices</a></li>
                    </ul>
                </nav>

                <section id="introduction">
                    <h2><span className="emoji">📖</span> Introduction à Big O</h2>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                        La <strong style={{ color: 'var(--accent-primary)' }}>notation Big O</strong> est un langage mathématique
                        utilisé pour décrire la <strong>performance</strong> et l'<strong>efficacité</strong> d'un algorithme.
                        Elle permet de répondre à une question cruciale :
                    </p>
                    <div className="example-box" style={{ marginTop: '2rem' }}>
                        <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                            <span className="emoji" style={{ marginRight: '1rem' }}>🤔</span>
                            Comment mon algorithme se comportera-t-il quand les données augmentent ?
                        </h4>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                            Big O mesure le <strong style={{ color: 'var(--accent-secondary)' }}>pire cas</strong> (worst case)
                            du nombre d'opérations nécessaires en fonction de la taille des données <code style={{
                            background: 'rgba(0,0,0,0.3)',
                            padding: '.3rem .6rem',
                            borderRadius: '4px',
                            color: 'var(--accent-primary)',
                            fontFamily: "'Space Mono', monospace"
                        }}>n</code>.
                        </p>
                    </div>

                    <h3 style={{ marginTop: '3rem' }}>Pourquoi c'est important ?</h3>
                    <div className="rules-grid">
                        <div className="rule-card">
                            <h4>⚡ Performance</h4>
                            <p>Anticiper le comportement de votre code avec de grandes quantités de données</p>
                        </div>
                        <div className="rule-card">
                            <h4>🎯 Optimisation</h4>
                            <p>Choisir le meilleur algorithme pour résoudre un problème donné</p>
                        </div>
                        <div className="rule-card">
                            <h4>💼 Entretiens</h4>
                            <p>Question incontournable lors des entretiens techniques chez les GAFAM</p>
                        </div>
                        <div className="rule-card">
                            <h4>🏗️ Architecture</h4>
                            <p>Concevoir des systèmes scalables et efficaces</p>
                        </div>
                    </div>
                </section>

                <section id="visualization">
                    <h2><span className="emoji">📊</span> Visualisation des complexités</h2>
                    <div className="chart-container">
                        <div className="chart-wrapper">
                            <canvas ref={chartRef}></canvas>
                        </div>
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            <strong style={{ color: 'var(--accent-primary)' }}>💡 Interprétation :</strong> Plus la courbe monte rapidement,
                            moins l'algorithme est efficace pour de grandes données.
                        </p>
                    </div>
                </section>

                <section id="complexities">
                    <h2><span className="emoji">🎯</span> Les différentes complexités</h2>
                    <div className="complexity-grid">
                        {complexities.map(complexity => (
                            <div
                                key={complexity.id}
                                className={`complexity-card ${complexity.id}`}
                                onClick={() => setSelectedComplexity(complexity.id === selectedComplexity ? null : complexity.id)}
                            >
                                <h4>{complexity.title}</h4>
                                <div className="notation">{complexity.name}</div>
                                <p className="desc">{complexity.desc}</p>
                                {selectedComplexity === complexity.id && (
                                    <div className="examples">
                                        <strong>Exemples d'algorithmes :</strong>
                                        <ul>
                                            {complexity.examples.map((ex, i) => (
                                                <li key={i}>{ex}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '2rem', fontSize: '1.1rem' }}>
                        <span className="emoji">👆</span> Cliquez sur une carte pour voir des exemples concrets !
                    </p>
                </section>

                <section id="comparison">
                    <h2><span className="emoji">⚖️</span> Tableau comparatif</h2>
                    <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
                        Comparaison du nombre d'opérations pour différentes tailles de données :
                    </p>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="comparison-table">
                            <thead>
                            <tr>
                                <th>Complexité</th>
                                <th>n = 10</th>
                                <th>n = 100</th>
                                <th>n = 1 000</th>
                                <th>n = 10 000</th>
                                <th>Qualité</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><strong style={{ color: 'var(--constant)' }}>O(1)</strong></td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td><span className="complexity-badge excellent">Excellent</span></td>
                            </tr>
                            <tr>
                                <td><strong style={{ color: 'var(--logarithmic)' }}>O(log n)</strong></td>
                                <td>3</td>
                                <td>7</td>
                                <td>10</td>
                                <td>13</td>
                                <td><span className="complexity-badge good">Très bon</span></td>
                            </tr>
                            <tr>
                                <td><strong style={{ color: 'var(--linear)' }}>O(n)</strong></td>
                                <td>10</td>
                                <td>100</td>
                                <td>1 000</td>
                                <td>10 000</td>
                                <td><span className="complexity-badge fair">Bon</span></td>
                            </tr>
                            <tr>
                                <td><strong style={{ color: 'var(--linearithmic)' }}>O(n log n)</strong></td>
                                <td>30</td>
                                <td>700</td>
                                <td>10 000</td>
                                <td>130 000</td>
                                <td><span className="complexity-badge acceptable">Acceptable</span></td>
                            </tr>
                            <tr>
                                <td><strong style={{ color: 'var(--quadratic)' }}>O(n²)</strong></td>
                                <td>100</td>
                                <td>10 000</td>
                                <td>1 000 000</td>
                                <td>100 000 000</td>
                                <td><span className="complexity-badge poor">Moyen</span></td>
                            </tr>
                            <tr>
                                <td><strong style={{ color: 'var(--cubic)' }}>O(n³)</strong></td>
                                <td>1 000</td>
                                <td>1 000 000</td>
                                <td>1 000 000 000</td>
                                <td>1 000 000 000 000</td>
                                <td><span className="complexity-badge bad">Mauvais</span></td>
                            </tr>
                            <tr>
                                <td><strong style={{ color: 'var(--exponential)' }}>O(2ⁿ)</strong></td>
                                <td>1 024</td>
                                <td>1.27 × 10³⁰</td>
                                <td>∞</td>
                                <td>∞</td>
                                <td><span className="complexity-badge terrible">Terrible</span></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <p style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255, 165, 0, 0.1)', borderRadius: '12px', borderLeft: '4px solid var(--accent-warning)' }}>
                        <strong style={{ color: 'var(--accent-warning)' }}>⚠️ Attention :</strong> Avec n = 100,
                        un algorithme O(2ⁿ) nécessiterait plus d'opérations qu'il n'y a d'atomes dans l'univers !
                    </p>
                </section>

                <section id="rules">
                    <h2><span className="emoji">📏</span> Règles de calcul Big O</h2>

                    <h3>Règle 1 : Ignorer les constantes</h3>
                    <div className="example-box">
                        <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                            Big O ne s'intéresse qu'à la <strong style={{ color: 'var(--accent-primary)' }}>croissance asymptotique</strong>,
                            pas aux valeurs exactes.
                        </p>
                        <div className="rules-grid" style={{ marginTop: '1.5rem' }}>
                            <div className="rule-card">
                                <p><code>O(2n)</code> → <strong style={{ color: 'var(--accent-primary)' }}>O(n)</strong></p>
                                <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', marginTop: '.5rem' }}>La constante 2 est ignorée</p>
                            </div>
                            <div className="rule-card">
                                <p><code>O(500)</code> → <strong style={{ color: 'var(--accent-primary)' }}>O(1)</strong></p>
                                <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', marginTop: '.5rem' }}>Toute constante = O(1)</p>
                            </div>
                            <div className="rule-card">
                                <p><code>O(13n²)</code> → <strong style={{ color: 'var(--accent-primary)' }}>O(n²)</strong></p>
                                <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', marginTop: '.5rem' }}>Le coefficient est ignoré</p>
                            </div>
                        </div>
                    </div>

                    <h3>Règle 2 : Garder le terme dominant</h3>
                    <div className="example-box">
                        <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                            Quand plusieurs termes existent, on garde uniquement celui qui <strong style={{ color: 'var(--accent-primary)' }}>croît le plus vite</strong>.
                        </p>
                        <div className="rules-grid" style={{ marginTop: '1.5rem' }}>
                            <div className="rule-card">
                                <p><code>O(n² + n)</code> → <strong style={{ color: 'var(--accent-primary)' }}>O(n²)</strong></p>
                                <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', marginTop: '.5rem' }}>n² domine n</p>
                            </div>
                            <div className="rule-card">
                                <p><code>O(n + log n)</code> → <strong style={{ color: 'var(--accent-primary)' }}>O(n)</strong></p>
                                <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', marginTop: '.5rem' }}>n domine log n</p>
                            </div>
                            <div className="rule-card">
                                <p><code>O(2ⁿ + n³ + n)</code> → <strong style={{ color: 'var(--accent-primary)' }}>O(2ⁿ)</strong></p>
                                <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', marginTop: '.5rem' }}>Exponentielle domine tout</p>
                            </div>
                        </div>
                    </div>

                    <h3>Règle 3 : Addition pour séquences, multiplication pour imbrications</h3>
                    <div className="example-box">
                        <h4>Opérations séquentielles : Addition</h4>
                        <div className="code-block">
              <pre>
<span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">0</span>; i &lt; n; i++)   {/* O(n) */}
                  {'{'}
                  Console.WriteLine(i);
                  {'}'}
                  <span className="keyword">for</span> (<span className="keyword">int</span> j = <span className="number">0</span>; j &lt; n; j++)   {/* O(n) */}
                  {'{'}
                  Console.WriteLine(j);
                  {'}'}
                  {/* Total: O(n) + O(n) = O(2n) = O(n) */}
</pre>
                        </div>

                        <h4 style={{ marginTop: '2rem' }}>Opérations imbriquées : Multiplication</h4>
                        <div className="code-block">
              <pre>
<span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">0</span>; i &lt; n; i++)           {/* O(n) */}
                  {'{'}
                  <span className="keyword">for</span> (<span className="keyword">int</span> j = <span className="number">0</span>; j &lt; n; j++)       {/* O(n) */}
                  {'{'}
                  Console.WriteLine(i, j);
                  {'}'}
                  {'}'}
                  {/* Total: O(n) × O(n) = O(n²) */}
</pre>
                        </div>
                    </div>

                    <h3>Règle 4 : Différentes entrées = différentes variables</h3>
                    <div className="example-box">
                        <div className="code-block">
              <pre>
<span className="keyword">void</span> <span className="function">Process</span>(<span className="keyword">int</span>[] arrayA, <span className="keyword">int</span>[] arrayB)
                  {'{'}
                  <span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">0</span>; i &lt; arrayA.Length; i++)    {/* O(a) */}
                  {'{'}
                  Console.WriteLine(arrayA[i]);
                  {'}'}

                  <span className="keyword">for</span> (<span className="keyword">int</span> j = <span className="number">0</span>; j &lt; arrayB.Length; j++)    {/* O(b) */}
                  {'{'}
                  Console.WriteLine(arrayB[j]);
                  {'}'}
                  {'}'}
                  {/* Total: O(a + b), PAS O(n) */}
</pre>
                        </div>
                        <p style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0, 212, 255, 0.1)', borderRadius: '8px', borderLeft: '4px solid var(--accent-secondary)' }}>
                            <strong style={{ color: 'var(--accent-secondary)' }}>💡 Important :</strong> Si les deux tableaux
                            ont des tailles différentes, on utilise des variables différentes (a et b).
                        </p>
                    </div>
                </section>

                <section id="examples">
                    <h2><span className="emoji">💡</span> Exemples pratiques</h2>

                    <h3>Exemple 1 : Recherche linéaire - O(n)</h3>
                    <div className="code-block">
            <pre>
<span className="keyword">int</span> <span className="function">SearchLinear</span>(<span className="keyword">int</span>[] array, <span className="keyword">int</span> target)
                {'{'}
                <span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">0</span>; i &lt; array.Length; i++)   {/* Boucle exécutée n fois */}
                {'{'}
                <span className="keyword">if</span> (array[i] == target)                   {/* Comparaison O(1) */}
                <span className="keyword">return</span> i;
                {'}'}
                <span className="keyword">return</span> -<span className="number">1</span>;
                {'}'}
                {/* Complexité: O(n) - Dans le pire cas, on parcourt tout le tableau */}
</pre>
                    </div>

                    <h3>Exemple 2 : Recherche binaire - O(log n)</h3>
                    <div className="code-block">
            <pre>
<span className="keyword">int</span> <span className="function">SearchBinary</span>(<span className="keyword">int</span>[] sortedArray, <span className="keyword">int</span> target)
                {'{'}
                <span className="keyword">int</span> left = <span className="number">0</span>, right = sortedArray.Length - <span className="number">1</span>;

    <span className="keyword">while</span> (left &lt;= right)                        {/* log n itérations */}
                {'{'}
                <span className="keyword">int</span> mid = left + (right - left) / <span className="number">2</span>;

        <span className="keyword">if</span> (sortedArray[mid] == target)
            <span className="keyword">return</span> mid;
        <span className="keyword">else if</span> (sortedArray[mid] &lt; target)
            left = mid + <span className="number">1</span>;                       {/* On élimine la moitié gauche */}
                <span className="keyword">else</span>
            right = mid - <span className="number">1</span>;                      {/* On élimine la moitié droite */}
                {'}'}

                <span className="keyword">return</span> -<span className="number">1</span>;
                {'}'}
                {/* Complexité: O(log n) - On divise l'espace de recherche par 2 à chaque étape */}
</pre>
                    </div>

                    <h3>Exemple 3 : Tri à bulles - O(n²)</h3>
                    <div className="code-block">
            <pre>
<span className="keyword">void</span> <span className="function">BubbleSort</span>(<span className="keyword">int</span>[] array)
                {'{'}
                <span className="keyword">int</span> n = array.Length;

    <span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">0</span>; i &lt; n - <span className="number">1</span>; i++)              {/* Boucle externe: n fois */}
                {'{'}
                <span className="keyword">for</span> (<span className="keyword">int</span> j = <span className="number">0</span>; j &lt; n - i - <span className="number">1</span>; j++)      {/* Boucle interne: n fois */}
                {'{'}
                <span className="keyword">if</span> (array[j] &gt; array[j + <span className="number">1</span>])
                {'{'}
                {/* Échanger */}
                <span className="keyword">int</span> temp = array[j];
                array[j] = array[j + <span className="number">1</span>];
                array[j + <span className="number">1</span>] = temp;
                {'}'}
                {'}'}
                {'}'}
                {'}'}
                {/* Complexité: O(n²) - Deux boucles imbriquées */}
</pre>
                    </div>

                    <h3>Exemple 4 : Fibonacci récursif - O(2ⁿ)</h3>
                    <div className="code-block">
            <pre>
<span className="keyword">int</span> <span className="function">Fibonacci</span>(<span className="keyword">int</span> n)
                {'{'}
                <span className="keyword">if</span> (n &lt;= <span className="number">1</span>)
        <span className="keyword">return</span> n;

    <span className="keyword">return</span> Fibonacci(n - <span className="number">1</span>) + Fibonacci(n - <span className="number">2</span>);  {/* Deux appels récursifs */}
                {'}'}
                {/* Complexité: O(2ⁿ) - Chaque appel génère 2 nouveaux appels */}
                {/* Pour n=10, environ 1024 appels de fonction ! */}
</pre>
                    </div>
                    <p style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(255, 0, 110, 0.1)', borderRadius: '12px', borderLeft: '4px solid var(--accent-tertiary)' }}>
                        <strong style={{ color: 'var(--accent-tertiary)' }}>⚠️ Mauvaise pratique :</strong> Cet algorithme
                        récursif est très inefficace car il recalcule les mêmes valeurs plusieurs fois.
                        Une version avec mémoïsation (programmation dynamique) serait O(n).
                    </p>
                </section>

                <section id="exercises">
                    <h2><span className="emoji">🏋️</span> Exercices pratiques</h2>
                    <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
                        Testez vos connaissances avec ces exercices. Cliquez sur "Voir la réponse" pour vérifier !
                    </p>

                    <h3>Exercice 1 : Analyse de code</h3>
                    <div className="example-box">
                        <h4>Quelle est la complexité de cet algorithme ?</h4>
                        <div className="code-block">
              <pre>
<span className="keyword">void</span> <span className="function">PrintPairs</span>(<span className="keyword">int</span>[] array)
                  {'{'}
                  <span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">0</span>; i &lt; array.Length; i++)
                  {'{'}
                  <span className="keyword">for</span> (<span className="keyword">int</span> j = i + <span className="number">1</span>; j &lt; array.Length; j++)
                  {'{'}
                  Console.WriteLine(array[i] + <span className="string">", "</span> + array[j]);
                  {'}'}
                  {'}'}
                  {'}'}
</pre>
                        </div>
                        <details>
                            <summary style={{ cursor: 'pointer', color: 'var(--accent-primary)', padding: '1rem', background: 'var(--bg-light)', borderRadius: '8px', marginTop: '1rem' }}>
                                <strong>💡 Cliquez pour voir la réponse détaillée</strong>
                            </summary>
                            <div style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(0, 255, 135, 0.1)', borderRadius: '8px', borderLeft: '4px solid var(--accent-primary)' }}>
                                <p style={{ fontSize: '1.3rem', marginBottom: '1rem' }}><strong style={{ color: 'var(--accent-primary)' }}>Réponse : O(n²)</strong></p>
                                <p><strong>Explication :</strong></p>
                                <ul style={{ marginLeft: '1.5rem', marginTop: '.5rem' }}>
                                    <li>Boucle externe : n itérations</li>
                                    <li>Boucle interne : commence à i+1, donc en moyenne n/2 itérations</li>
                                    <li>Total : n × (n/2) = n²/2</li>
                                    <li>Selon la règle d'ignorer les constantes : <strong style={{ color: 'var(--accent-primary)' }}>O(n²)</strong></li>
                                </ul>
                                <p style={{ marginTop: '1rem', padding: '1rem', background: 'var(--bg-dark)', borderRadius: '8px' }}>
                                    Même si la boucle interne ne parcourt pas tous les éléments,
                                    la croissance reste quadratique !
                                </p>
                            </div>
                        </details>
                    </div>

                    <h3>Exercice 2 : Simplification</h3>
                    <div className="example-box">
                        <h4>Simplifiez ces expressions Big O :</h4>
                        <div className="rules-grid" style={{ marginTop: '1.5rem' }}>
                            <div className="rule-card">
                                <p><code>O(n + n²)</code> → ?</p>
                            </div>
                            <div className="rule-card">
                                <p><code>O(log n + n)</code> → ?</p>
                            </div>
                            <div className="rule-card">
                                <p><code>O(2ⁿ + n³)</code> → ?</p>
                            </div>
                            <div className="rule-card">
                                <p><code>O(n log n + n)</code> → ?</p>
                            </div>
                        </div>
                        <details>
                            <summary style={{ cursor: 'pointer', color: 'var(--accent-primary)', padding: '1rem', background: 'var(--bg-light)', borderRadius: '8px', marginTop: '1rem' }}>
                                <strong>💡 Cliquez pour voir les réponses</strong>
                            </summary>
                            <div className="rules-grid" style={{ marginTop: '1rem' }}>
                                <div className="rule-card">
                                    <p><code>O(n + n²)</code> → <strong style={{ color: 'var(--accent-primary)' }}>O(n²)</strong></p>
                                    <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', marginTop: '.5rem' }}>n² croît plus vite que n</p>
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
                        </details>
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

                  {/* Partie 1 */}
                  <span className="keyword">for</span> (<span className="keyword">int</span> i = <span className="number">0</span>; i &lt; n; i++)
                  {'{'}
                  <span className="keyword">if</span> (tableau[i] % <span className="number">2</span> == <span className="number">0</span>)
            compteur++;
                  {'}'}

                  {/* Partie 2 */}
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