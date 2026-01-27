import React, { useState } from 'react';

export default function RechercheBinaire() {
    const [cards, setCards] = useState([1, 3, 5, 7, 9, 12, 15, 18, 21, 25]);
    const [searchValue, setSearchValue] = useState('');
    const [searching, setSearching] = useState(false);
    const [left, setLeft] = useState(null);
    const [right, setRight] = useState(null);
    const [mid, setMid] = useState(null);
    const [found, setFound] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [steps, setSteps] = useState([]);
    const [showPseudocode, setShowPseudocode] = useState(true);

    const reset = () => {
        setCards([1, 3, 5, 7, 9, 12, 15, 18, 21, 25]);
        setSearchValue('');
        setSearching(false);
        setLeft(null);
        setRight(null);
        setMid(null);
        setFound(null);
        setNotFound(false);
        setSteps([]);
    };

    const shuffle = () => {
        const newCards = Array.from({length: 10}, () => Math.floor(Math.random() * 30) + 1);
        newCards.sort((a, b) => a - b);
        setCards(newCards);
        setSearchValue('');
        setSearching(false);
        setLeft(null);
        setRight(null);
        setMid(null);
        setFound(null);
        setNotFound(false);
        setSteps([]);
    };

    const binarySearch = async (target) => {
        setSearching(true);
        setFound(null);
        setNotFound(false);
        setSteps([]);

        let l = 0;
        let r = cards.length - 1;
        let stepNum = 1;
        const searchSteps = [];

        while (l <= r) {
            const m = Math.floor((l + r) / 2);

            setLeft(l);
            setRight(r);
            setMid(m);

            const stepInfo = {
                step: stepNum,
                left: l,
                right: r,
                mid: m,
                midValue: cards[m],
                action: ''
            };

            await new Promise(resolve => setTimeout(resolve, 1500));

            if (cards[m] === target) {
                setFound(m);
                stepInfo.action = `Trouvé ! ${cards[m]} = ${target}`;
                searchSteps.push(stepInfo);
                setSteps([...searchSteps]);
                setSearching(false);
                return;
            } else if (cards[m] < target) {
                stepInfo.action = `${cards[m]} < ${target} → Chercher à droite`;
                searchSteps.push(stepInfo);
                setSteps([...searchSteps]);
                l = m + 1;
            } else {
                stepInfo.action = `${cards[m]} > ${target} → Chercher à gauche`;
                searchSteps.push(stepInfo);
                setSteps([...searchSteps]);
                r = m - 1;
            }

            stepNum++;
        }

        setNotFound(true);
        setLeft(null);
        setRight(null);
        setMid(null);
        setSearching(false);
    };

    const handleSearch = () => {
        const target = parseInt(searchValue);
        if (isNaN(target)) {
            alert('Veuillez entrer un nombre valide');
            return;
        }
        binarySearch(target);
    };

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
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
            color: '#dbeafe',
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
            border: '2px solid #3b82f6',
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
            background: 'rgba(59, 130, 246, 0.2)',
            padding: '0.75rem',
            borderRadius: '0.375rem',
            marginBottom: '0.5rem',
            color: 'white',
            fontSize: '0.9rem',
            borderLeft: '4px solid #3b82f6'
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
            fontSize: '0.9rem',
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
            <h1 style={styles.title}>Recherche Binaire Interactive</h1>
            <p style={styles.subtitle}>Trouvez un élément dans un tableau trié en divisant l'espace de recherche par deux</p>

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
                    <p style={{color: '#dbeafe', fontSize: '0.875rem', marginTop: '0.75rem', fontStyle: 'italic'}}>
                        💡 Le tableau est trié automatiquement pour la recherche binaire
                    </p>
                </div>

                {(left !== null || right !== null) && (
                    <div style={styles.rangeIndicator}>
                        <div style={{...styles.indicator, background: '#f59e0b', color: 'white'}}>
                            ← Gauche (L): {left !== null ? left : '-'}
                        </div>
                        <div style={{...styles.indicator, background: '#8b5cf6', color: 'white'}}>
                            Milieu (M): {mid !== null ? mid : '-'}
                        </div>
                        <div style={{...styles.indicator, background: '#f59e0b', color: 'white'}}>
                            Droite (R): {right !== null ? right : '-'} →
                        </div>
                    </div>
                )}

                <div style={styles.cardsContainer}>
                    {cards.map((value, index) => {
                        let bgColor = 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)';
                        let borderColor = '#2563eb';
                        let scale = 1;

                        if (found === index) {
                            bgColor = 'linear-gradient(135deg, #34d399 0%, #10b981 100%)';
                            borderColor = '#059669';
                            scale = 1.15;
                        } else if (mid === index) {
                            bgColor = 'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)';
                            borderColor = '#9333ea';
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
                                <strong>Étape {step.step}:</strong> L={step.left}, M={step.mid} (val={step.midValue}), R={step.right} → {step.action}
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
                        style={{...styles.button, background: '#3b82f6'}}
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
                        📝 Pseudocode de la Recherche Binaire
                    </h2>

                    <div style={styles.codeBlock}>
            <pre style={{margin: 0, color: '#93c5fd'}}>
{`ALGORITHME RechercheBinaire(tableau, cible)
    gauche ← 0
    droite ← longueur(tableau) - 1
    
    TANT QUE gauche <= droite FAIRE
        milieu ← (gauche + droite) / 2  // Division entière
        
        SI tableau[milieu] = cible ALORS
            RETOURNER milieu  // Élément trouvé
        SINON SI tableau[milieu] < cible ALORS
            gauche ← milieu + 1  // Chercher dans la moitié droite
        SINON
            droite ← milieu - 1  // Chercher dans la moitié gauche
        FIN SI
    FIN TANT QUE
    
    RETOURNER -1  // Élément non trouvé
FIN ALGORITHME`}
            </pre>
                    </div>

                    <div style={styles.grid}>
                        <div style={styles.infoCard}>
                            <h3 style={{fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.75rem', color: '#93c5fd'}}>
                                ⏱️ Complexité
                            </h3>
                            <ul style={{listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.6'}}>
                                <li>• Meilleur cas : <span style={{color: '#34d399'}}>O(1)</span> - élément au milieu</li>
                                <li>• Cas moyen : <span style={{color: '#fbbf24'}}>O(log n)</span></li>
                                <li>• Pire cas : <span style={{color: '#fbbf24'}}>O(log n)</span></li>
                                <li>• Espace : <span style={{color: '#34d399'}}>O(1)</span> - itératif</li>
                            </ul>
                        </div>

                        <div style={styles.infoCard}>
                            <h3 style={{fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.75rem', color: '#93c5fd'}}>
                                ✨ Caractéristiques
                            </h3>
                            <ul style={{listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.6'}}>
                                <li>✓ Très rapide : O(log n)</li>
                                <li>✓ Divise par 2 à chaque étape</li>
                                <li>⚠️ Tableau DOIT être trié</li>
                                <li>⚠️ Accès aléatoire nécessaire</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{marginTop: '1.5rem', background: '#1e3a8a', borderRadius: '0.5rem', padding: '1rem'}}>
                        <h3 style={{fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.75rem', color: '#dbeafe'}}>
                            📝 Exemple : Chercher 15 dans [1, 3, 5, 7, 9, 12, 15, 18, 21, 25]
                        </h3>
                        <div style={{fontSize: '0.875rem', color: '#dbeafe', fontFamily: 'monospace', lineHeight: '1.8'}}>
                            <p style={{margin: '0.25rem 0'}}><strong>Étape 1:</strong> L=0, M=4, R=9 → tableau[4]=9 &lt; 15 → Chercher à droite</p>
                            <p style={{margin: '0.25rem 0'}}><strong>Étape 2:</strong> L=5, M=7, R=9 → tableau[7]=18 &gt; 15 → Chercher à gauche</p>
                            <p style={{margin: '0.25rem 0'}}><strong>Étape 3:</strong> L=5, M=6, R=6 → tableau[6]=15 = 15 → ✓ TROUVÉ à l'index 6 !</p>
                        </div>
                    </div>

                    <div style={{marginTop: '1.5rem', background: '#064e3b', borderRadius: '0.5rem', padding: '1rem'}}>
                        <h3 style={{fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.75rem', color: '#6ee7b7'}}>
                            💡 Pourquoi O(log n) ?
                        </h3>
                        <p style={{fontSize: '0.9rem', color: '#a7f3d0', lineHeight: '1.6', margin: 0}}>
                            À chaque étape, on divise l'espace de recherche par 2. Pour un tableau de 1000 éléments,
                            il faut au maximum log₂(1000) ≈ 10 étapes. Pour 1 million d'éléments : seulement 20 étapes !
                            C'est beaucoup plus rapide qu'une recherche linéaire O(n).
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}