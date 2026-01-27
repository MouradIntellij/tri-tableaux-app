import React, { useState } from 'react';

export default function RechercheInterpolation() {
    const [cards, setCards] = useState([2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78]);
    const [searchValue, setSearchValue] = useState('');
    const [searching, setSearching] = useState(false);
    const [left, setLeft] = useState(null);
    const [right, setRight] = useState(null);
    const [pos, setPos] = useState(null);
    const [found, setFound] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [steps, setSteps] = useState([]);
    const [showPseudocode, setShowPseudocode] = useState(true);

    const reset = () => {
        setCards([2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78]);
        setSearchValue('');
        setSearching(false);
        setLeft(null);
        setRight(null);
        setPos(null);
        setFound(null);
        setNotFound(false);
        setSteps([]);
    };

    const shuffle = () => {
        const newCards = Array.from({length: 11}, (_, i) => (i + 1) * Math.floor(Math.random() * 8 + 2));
        newCards.sort((a, b) => a - b);
        setCards(newCards);
        setSearchValue('');
        setSearching(false);
        setLeft(null);
        setRight(null);
        setPos(null);
        setFound(null);
        setNotFound(false);
        setSteps([]);
    };

    const interpolationSearch = async (target) => {
        setSearching(true);
        setFound(null);
        setNotFound(false);
        setSteps([]);

        let l = 0;
        let r = cards.length - 1;
        let stepNum = 1;
        const searchSteps = [];

        while (l <= r && target >= cards[l] && target <= cards[r]) {
            if (l === r) {
                setLeft(l);
                setRight(r);
                setPos(l);
                await new Promise(resolve => setTimeout(resolve, 1500));

                if (cards[l] === target) {
                    setFound(l);
                    const stepInfo = {
                        step: stepNum,
                        left: l,
                        right: r,
                        pos: l,
                        posValue: cards[l],
                        action: `Trouvé ! ${cards[l]} = ${target}`
                    };
                    searchSteps.push(stepInfo);
                    setSteps([...searchSteps]);
                } else {
                    setNotFound(true);
                }
                setSearching(false);
                return;
            }

            // Formule d'interpolation
            const p = l + Math.floor(
                ((target - cards[l]) * (r - l)) / (cards[r] - cards[l])
            );

            setLeft(l);
            setRight(r);
            setPos(p);

            const stepInfo = {
                step: stepNum,
                left: l,
                right: r,
                pos: p,
                posValue: cards[p],
                formula: `pos = ${l} + ((${target} - ${cards[l]}) × (${r} - ${l})) / (${cards[r]} - ${cards[l]}) = ${p}`,
                action: ''
            };

            await new Promise(resolve => setTimeout(resolve, 1500));

            if (cards[p] === target) {
                setFound(p);
                stepInfo.action = `Trouvé ! ${cards[p]} = ${target}`;
                searchSteps.push(stepInfo);
                setSteps([...searchSteps]);
                setSearching(false);
                return;
            } else if (cards[p] < target) {
                stepInfo.action = `${cards[p]} < ${target} → Chercher à droite`;
                searchSteps.push(stepInfo);
                setSteps([...searchSteps]);
                l = p + 1;
            } else {
                stepInfo.action = `${cards[p]} > ${target} → Chercher à gauche`;
                searchSteps.push(stepInfo);
                setSteps([...searchSteps]);
                r = p - 1;
            }

            stepNum++;
        }

        setNotFound(true);
        setLeft(null);
        setRight(null);
        setPos(null);
        setSearching(false);
    };

    const handleSearch = () => {
        const target = parseInt(searchValue);
        if (isNaN(target)) {
            alert('Veuillez entrer un nombre valide');
            return;
        }
        interpolationSearch(target);
    };

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
            padding: '2rem',
            fontFamily: 'Arial, sans-serif'
        },
        title: {
            fontSize: '3rem',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: '1rem'
        },
        subtitle: {
            fontSize: '1.2rem',
            color: '#f3e8ff',
            textAlign: 'center',
            marginBottom: '2rem'
        },
        mainCard: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            maxWidth: '1400px',
            margin: '0 auto 2rem'
        },
        searchSection: {
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            marginBottom: '2rem'
        },
        searchTitle: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            marginBottom: '1rem'
        },
        searchInputGroup: {
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap'
        },
        input: {
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: '2px solid #a855f7',
            fontSize: '1.1rem',
            width: '200px',
            fontWeight: 'bold'
        },
        searchButton: {
            padding: '0.75rem 2rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: 'white',
            background: '#10b981',
            transition: 'background 0.2s'
        },
        cardsContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: '0.5rem',
            minHeight: '200px',
            marginBottom: '2rem',
            flexWrap: 'wrap'
        },
        card: {
            borderRadius: '0.5rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            padding: '1rem 0.75rem',
            border: '3px solid',
            transition: 'all 0.3s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '60px'
        },
        cardNumber: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        },
        cardIndex: {
            fontSize: '0.7rem',
            color: 'white',
            fontWeight: '500',
            opacity: 0.8,
            marginTop: '0.25rem'
        },
        rangeIndicator: {
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
        },
        indicator: {
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            fontWeight: 'bold',
            fontSize: '1rem'
        },
        stepsSection: {
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            minHeight: '150px'
        },
        stepsTitle: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            marginBottom: '1rem'
        },
        stepItem: {
            background: 'rgba(168, 85, 247, 0.2)',
            padding: '0.75rem',
            borderRadius: '0.375rem',
            marginBottom: '0.5rem',
            color: 'white',
            fontSize: '0.85rem',
            borderLeft: '4px solid #a855f7'
        },
        buttonsContainer: {
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
        },
        button: {
            padding: '1rem 2rem',
            borderRadius: '0.75rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: 'white',
            transition: 'transform 0.2s',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        },
        pseudocodeSection: {
            background: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '2rem',
            color: 'white',
            marginTop: '2rem',
            maxWidth: '1400px',
            margin: '2rem auto'
        },
        codeBlock: {
            background: '#1e293b',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            overflow: 'auto',
            marginBottom: '1rem'
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
            marginTop: '1.5rem'
        },
        infoCard: {
            background: '#1e293b',
            borderRadius: '0.5rem',
            padding: '1rem'
        },
        successBanner: {
            background: '#10b981',
            color: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontSize: '1.2rem',
            fontWeight: 'bold'
        },
        errorBanner: {
            background: '#ef4444',
            color: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontSize: '1.2rem',
            fontWeight: 'bold'
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Recherche par Interpolation</h1>
            <p style={styles.subtitle}>Estime la position en fonction de la valeur recherchée - idéal pour données uniformément distribuées</p>

            <div style={styles.mainCard}>
                {found !== null && (
                    <div style={styles.successBanner}>
                        ✓ Élément trouvé à l'index {found} en {steps.length} étape{steps.length > 1 ? 's' : ''} !
                    </div>
                )}

                {notFound && (
                    <div style={styles.errorBanner}>
                        ✗ Élément {searchValue} non trouvé dans le tableau
                    </div>
                )}

                <div style={styles.searchSection}>
                    <h3 style={styles.searchTitle}>🔍 Rechercher un élément :</h3>
                    <div style={styles.searchInputGroup}>
                        <input
                            type="number"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Nombre à chercher"
                            style={styles.input}
                            disabled={searching}
                        />
                        <button
                            onClick={handleSearch}
                            disabled={searching || !searchValue}
                            style={{
                                ...styles.searchButton,
                                opacity: searching || !searchValue ? 0.5 : 1,
                                cursor: searching || !searchValue ? 'not-allowed' : 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                if (!searching && searchValue) e.target.style.background = '#059669';
                            }}
                            onMouseLeave={(e) => e.target.style.background = '#10b981'}
                        >
                            {searching ? '⏳ Recherche...' : '🔍 Rechercher'}
                        </button>
                    </div>
                    <p style={{color: '#f3e8ff', fontSize: '0.875rem', marginTop: '0.75rem', fontStyle: 'italic'}}>
                        💡 La position est calculée par interpolation linéaire selon la valeur
                    </p>
                </div>

                {(left !== null || right !== null) && (
                    <div style={styles.rangeIndicator}>
                        <div style={{...styles.indicator, background: '#f59e0b', color: 'white'}}>
                            ← Gauche (L): {left !== null ? left : '-'}
                        </div>
                        <div style={{...styles.indicator, background: '#a855f7', color: 'white'}}>
                            Position estimée (P): {pos !== null ? pos : '-'}
                        </div>
                        <div style={{...styles.indicator, background: '#f59e0b', color: 'white'}}>
                            Droite (R): {right !== null ? right : '-'} →
                        </div>
                    </div>
                )}

                <div style={styles.cardsContainer}>
                    {cards.map((value, index) => {
                        let bgColor = 'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)';
                        let borderColor = '#9333ea';
                        let scale = 1;

                        if (found === index) {
                            bgColor = 'linear-gradient(135deg, #34d399 0%, #10b981 100%)';
                            borderColor = '#059669';
                            scale = 1.15;
                        } else if (pos === index) {
                            bgColor = 'linear-gradient(135deg, #e879f9 0%, #d946ef 100%)';
                            borderColor = '#c026d3';
                            scale = 1.1;
                        } else if (index >= left && index <= right && left !== null) {
                            bgColor = 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)';
                            borderColor = '#d97706';
                        } else if ((left !== null && index < left) || (right !== null && index > right)) {
                            bgColor = 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
                            borderColor = '#374151';
                            scale = 0.9;
                        }

                        return (
                            <div
                                key={index}
                                style={{
                                    ...styles.card,
                                    background: bgColor,
                                    borderColor: borderColor,
                                    transform: `scale(${scale})`,
                                    height: '80px'
                                }}
                            >
                                <div style={styles.cardNumber}>{value}</div>
                                <div style={styles.cardIndex}>idx: {index}</div>
                            </div>
                        );
                    })}
                </div>

                {steps.length > 0 && (
                    <div style={styles.stepsSection}>
                        <h3 style={styles.stepsTitle}>📊 Étapes de recherche :</h3>
                        {steps.map((step, idx) => (
                            <div key={idx} style={styles.stepItem}>
                                <strong>Étape {step.step}:</strong> L={step.left}, R={step.right}<br/>
                                <em style={{fontSize: '0.8rem'}}>{step.formula}</em><br/>
                                P={step.pos} (val={step.posValue}) → {step.action}
                            </div>
                        ))}
                    </div>
                )}

                <div style={styles.buttonsContainer}>
                    <button
                        onClick={reset}
                        style={{...styles.button, background: '#475569'}}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        🔄 Réinitialiser
                    </button>
                    <button
                        onClick={shuffle}
                        style={{...styles.button, background: '#ea580c'}}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        🔀 Nouveau tableau
                    </button>
                    <button
                        onClick={() => setShowPseudocode(!showPseudocode)}
                        style={{...styles.button, background: '#a855f7'}}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        {showPseudocode ? '📖 Masquer' : '📖 Afficher'} code
                    </button>
                </div>
            </div>

            {showPseudocode && (
                <div style={styles.pseudocodeSection}>
                    <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem'}}>
                        📝 Pseudocode de la Recherche par Interpolation
                    </h2>

                    <div style={styles.codeBlock}>
            <pre style={{margin: 0, color: '#e9d5ff'}}>
{`ALGORITHME RechercheInterpolation(tableau, cible)
    gauche ← 0
    droite ← longueur(tableau) - 1
    
    TANT QUE gauche <= droite ET cible >= tableau[gauche] ET cible <= tableau[droite] FAIRE
        SI gauche = droite ALORS
            SI tableau[gauche] = cible ALORS
                RETOURNER gauche
            FIN SI
            RETOURNER -1
        FIN SI
        
        // Formule d'interpolation linéaire
        pos ← gauche + ⌊((cible - tableau[gauche]) × (droite - gauche)) / 
                        (tableau[droite] - tableau[gauche])⌋
        
        SI tableau[pos] = cible ALORS
            RETOURNER pos  // Élément trouvé
        SINON SI tableau[pos] < cible ALORS
            gauche ← pos + 1  // Chercher dans la partie droite
        SINON
            droite ← pos - 1  // Chercher dans la partie gauche
        FIN SI
    FIN TANT QUE
    
    RETOURNER -1  // Élément non trouvé
FIN ALGORITHME`}
            </pre>
                    </div>

                    <div style={styles.grid}>
                        <div style={styles.infoCard}>
                            <h3 style={{fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.75rem', color: '#e9d5ff'}}>
                                ⏱️ Complexité
                            </h3>
                            <ul style={{listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.6'}}>
                                <li>• Meilleur cas : <span style={{color: '#34d399'}}>O(1)</span></li>
                                <li>• Cas moyen (données uniformes) : <span style={{color: '#34d399'}}>O(log log n)</span></li>
                                <li>• Pire cas (données non uniformes) : <span style={{color: '#ef4444'}}>O(n)</span></li>
                                <li>• Espace : <span style={{color: '#34d399'}}>O(1)</span></li>
                            </ul>
                        </div>

                        <div style={styles.infoCard}>
                            <h3 style={{fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.75rem', color: '#e9d5ff'}}>
                                ✨ Caractéristiques
                            </h3>
                            <ul style={{listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.6'}}>
                                <li>✓ Plus rapide que binaire (si uniforme)</li>
                                <li>✓ Tableau DOIT être trié</li>
                                <li>✓ Estime intelligemment la position</li>
                                <li>⚠️ Mauvais si données non uniformes</li>
                                <li>⚠️ Division requise (plus coûteuse)</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{marginTop: '1.5rem', background: '#581c87', borderRadius: '0.5rem', padding: '1rem'}}>
                        <h3 style={{fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.75rem', color: '#f3e8ff'}}>
                            🧮 Comment fonctionne la formule ?
                        </h3>
                        <p style={{fontSize: '0.9rem', color: '#f3e8ff', lineHeight: '1.6', margin: 0}}>
                            La formule d'interpolation estime où se trouve la valeur en supposant une distribution uniforme :<br/><br/>
                            <code style={{background: '#7c3aed', padding: '0.5rem', borderRadius: '0.25rem', display: 'block'}}>
                                pos = L + ((cible - arr[L]) × (R - L)) / (arr[R] - arr[L])
                            </code>
                            <br/>
                            C'est comme chercher "Martin" dans un annuaire : on va vers le milieu, pas au début !
                        </p>
                    </div>

                    <div style={{marginTop: '1.5rem', background: '#064e3b', borderRadius: '0.5rem', padding: '1rem'}}>
                        <h3 style={{fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.75rem', color: '#6ee7b7'}}>
                            💡 Quand utiliser l'interpolation ?
                        </h3>
                        <ul style={{fontSize: '0.9rem', color: '#a7f3d0', lineHeight: '1.6', margin: 0, paddingLeft: '1.5rem'}}>
                            <li><strong>✅ Utiliser si :</strong> Données uniformément distribuées (ex: 1, 2, 3, 4... ou années 2000, 2001, 2002...)</li>
                            <li><strong>✅ Utiliser si :</strong> Très grand tableau trié avec distribution régulière</li>
                            <li><strong>❌ Éviter si :</strong> Données irrégulières (ex: 1, 2, 5, 100, 101, 500...)</li>
                            <li><strong>❌ Éviter si :</strong> Petit tableau (binaire suffit)</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}