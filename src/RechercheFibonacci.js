import React, { useState } from 'react';

export default function RechercheFibonacci() {
    const [cards, setCards] = useState([1, 3, 5, 8, 10, 13, 17, 21, 25, 30, 34]);
    const [searchValue, setSearchValue] = useState('');
    const [searching, setSearching] = useState(false);
    const [fibM2, setFibM2] = useState(null);
    const [fibM1, setFibM1] = useState(null);
    const [fibM, setFibM] = useState(null);
    const [offset, setOffset] = useState(null);
    const [checkIndex, setCheckIndex] = useState(null);
    const [found, setFound] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [steps, setSteps] = useState([]);
    const [showPseudocode, setShowPseudocode] = useState(true);

    const reset = () => {
        setCards([1, 3, 5, 8, 10, 13, 17, 21, 25, 30, 34]);
        setSearchValue('');
        setSearching(false);
        setFibM2(null);
        setFibM1(null);
        setFibM(null);
        setOffset(null);
        setCheckIndex(null);
        setFound(null);
        setNotFound(false);
        setSteps([]);
    };

    const shuffle = () => {
        const newCards = Array.from({length: 11}, (_, i) => (i + 1) * Math.floor(Math.random() * 4 + 1));
        newCards.sort((a, b) => a - b);
        setCards(newCards);
        setSearchValue('');
        setSearching(false);
        setFibM2(null);
        setFibM1(null);
        setFibM(null);
        setOffset(null);
        setCheckIndex(null);
        setFound(null);
        setNotFound(false);
        setSteps([]);
    };

    const fibonacciSearch = async (target) => {
        setSearching(true);
        setFound(null);
        setNotFound(false);
        setSteps([]);

        const n = cards.length;
        let stepNum = 1;
        const searchSteps = [];

        // Initialiser les nombres de Fibonacci
        let fM2 = 0;
        let fM1 = 1;
        let fM = fM2 + fM1;

        // Trouver le plus petit nombre de Fibonacci >= n
        while (fM < n) {
            fM2 = fM1;
            fM1 = fM;
            fM = fM2 + fM1;
        }

        let off = -1;

        searchSteps.push({
            step: 0,
            type: 'init',
            fibM: fM,
            fibM1: fM1,
            fibM2: fM2,
            action: `Initialisation: Fibonacci trouvé: F(m)=${fM}, F(m-1)=${fM1}, F(m-2)=${fM2}`
        });
        setSteps([...searchSteps]);

        setFibM(fM);
        setFibM1(fM1);
        setFibM2(fM2);
        setOffset(off);

        await new Promise(resolve => setTimeout(resolve, 2000));

        while (fM > 1) {
            const i = Math.min(off + fM2, n - 1);

            setCheckIndex(i);
            setOffset(off);
            setFibM(fM);
            setFibM1(fM1);
            setFibM2(fM2);

            const stepInfo = {
                step: stepNum,
                type: 'compare',
                index: i,
                value: cards[i],
                fibM: fM,
                fibM1: fM1,
                fibM2: fM2,
                offset: off,
                action: ''
            };

            await new Promise(resolve => setTimeout(resolve, 1500));

            if (cards[i] < target) {
                stepInfo.action = `arr[${i}]=${cards[i]} < ${target} → Éliminer portion gauche`;
                searchSteps.push(stepInfo);
                setSteps([...searchSteps]);

                fM = fM1;
                fM1 = fM2;
                fM2 = fM - fM1;
                off = i;

                setFibM(fM);
                setFibM1(fM1);
                setFibM2(fM2);
                setOffset(off);
            } else if (cards[i] > target) {
                stepInfo.action = `arr[${i}]=${cards[i]} > ${target} → Éliminer portion droite`;
                searchSteps.push(stepInfo);
                setSteps([...searchSteps]);

                fM = fM2;
                fM1 = fM1 - fM2;
                fM2 = fM - fM1;

                setFibM(fM);
                setFibM1(fM1);
                setFibM2(fM2);
            } else {
                setFound(i);
                stepInfo.action = `Trouvé ! arr[${i}]=${cards[i]} = ${target}`;
                searchSteps.push(stepInfo);
                setSteps([...searchSteps]);
                setCheckIndex(null);
                setSearching(false);
                return;
            }

            stepNum++;
        }

        // Vérifier le dernier élément
        if (fM1 === 1 && off + 1 < n && cards[off + 1] === target) {
            setFound(off + 1);
            searchSteps.push({
                step: stepNum,
                type: 'final',
                action: `Vérification finale: Trouvé à l'index ${off + 1}`
            });
            setSteps([...searchSteps]);
        } else {
            setNotFound(true);
        }

        setCheckIndex(null);
        setSearching(false);
    };

    const handleSearch = () => {
        const target = parseInt(searchValue);
        if (isNaN(target)) {
            alert('Veuillez entrer un nombre valide');
            return;
        }
        fibonacciSearch(target);
    };

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)',
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
            color: '#fed7aa',
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
            border: '2px solid #f97316',
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
        fibIndicator: {
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
        },
        fibBox: {
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            fontWeight: 'bold',
            fontSize: '0.95rem',
            background: 'rgba(251, 191, 36, 0.3)',
            color: 'white',
            border: '2px solid #fbbf24'
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
        stepsSection: {
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            minHeight: '150px',
            maxHeight: '400px',
            overflowY: 'auto'
        },
        stepsTitle: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            marginBottom: '1rem'
        },
        stepItem: {
            background: 'rgba(249, 115, 22, 0.2)',
            padding: '0.75rem',
            borderRadius: '0.375rem',
            marginBottom: '0.5rem',
            color: 'white',
            fontSize: '0.85rem',
            borderLeft: '4px solid #f97316'
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
            fontSize: '0.8rem',
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
            <h1 style={styles.title}>Recherche de Fibonacci</h1>
            <p style={styles.subtitle}>Utilise les nombres de Fibonacci pour diviser le tableau - évite la division coûteuse</p>

            <div style={styles.mainCard}>
                {found !== null && (
                    <div style={styles.successBanner}>
                        ✓ Élément trouvé à l'index {found} en {steps.filter(s => s.type === 'compare').length} étape{steps.filter(s => s.type === 'compare').length > 1 ? 's' : ''} !
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
                    <p style={{color: '#fed7aa', fontSize: '0.875rem', marginTop: '0.75rem', fontStyle: 'italic'}}>
                        💡 Utilise les nombres de Fibonacci au lieu de diviser par 2
                    </p>
                </div>

                {(fibM !== null || fibM1 !== null || fibM2 !== null) && (
                    <div style={styles.fibIndicator}>
                        <div style={styles.fibBox}>
                            F(m-2) = {fibM2}
                        </div>
                        <div style={styles.fibBox}>
                            F(m-1) = {fibM1}
                        </div>
                        <div style={styles.fibBox}>
                            F(m) = {fibM}
                        </div>
                        {offset !== null && offset >= 0 && (
                            <div style={{...styles.fibBox, background: 'rgba(168, 85, 247, 0.3)', borderColor: '#a855f7'}}>
                                Offset = {offset}
                            </div>
                        )}
                    </div>
                )}

                <div style={styles.cardsContainer}>
                    {cards.map((value, index) => {
                        let bgColor = 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)';
                        let borderColor = '#ea580c';
                        let scale = 1;

                        if (found === index) {
                            bgColor = 'linear-gradient(135deg, #34d399 0%, #10b981 100%)';
                            borderColor = '#059669';
                            scale = 1.15;
                        } else if (checkIndex === index) {
                            bgColor = 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)';
                            borderColor = '#d97706';
                            scale = 1.1;
                        } else if (offset !== null && index <= offset) {
                            bgColor = 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
                            borderColor = '#374151';
                            scale = 0.95;
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
                                {step.type === 'init' ? (
                                    <div><strong>Initialisation:</strong> {step.action}</div>
                                ) : step.type === 'compare' ? (
                                    <div>
                                        <strong>Étape {step.step}:</strong> Vérif index {step.index} (val={step.value})<br/>
                                        <em style={{fontSize: '0.8rem'}}>
                                            F(m)={step.fibM}, F(m-1)={step.fibM1}, F(m-2)={step.fibM2}, offset={step.offset}
                                        </em><br/>
                                        → {step.action}
                                    </div>
                                ) : (
                                    <div>{step.action}</div>
                                )}
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
                        style={{...styles.button, background: '#0891b2'}}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        🔀 Nouveau tableau
                    </button>
                    <button
                        onClick={() => setShowPseudocode(!showPseudocode)}
                        style={{...styles.button, background: '#f97316'}}
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
                        📝 Pseudocode de la Recherche de Fibonacci
                    </h2>

                    <div style={styles.codeBlock}>
            <pre style={{margin: 0, color: '#fdba74'}}>
{`ALGORITHME RechercheFibonacci(tableau, cible)
    n ← longueur(tableau)
    
    // Initialiser les nombres de Fibonacci
    fibM2 ← 0
    fibM1 ← 1
    fibM ← fibM2 + fibM1
    
    // Trouver le plus petit Fibonacci >= n
    TANT QUE fibM < n FAIRE
        fibM2 ← fibM1
        fibM1 ← fibM
        fibM ← fibM2 + fibM1
    FIN TANT QUE
    
    offset ← -1
    
    // Recherche principale
    TANT QUE fibM > 1 FAIRE
        i ← min(offset + fibM2, n - 1)
        
        SI tableau[i] < cible ALORS
            // Éliminer portion gauche
            fibM ← fibM1
            fibM1 ← fibM2
            fibM2 ← fibM - fibM1
            offset ← i
        SINON SI tableau[i] > cible ALORS
            // Éliminer portion droite
            fibM ← fibM2
            fibM1 ← fibM1 - fibM2
            fibM2 ← fibM - fibM1
        SINON
            RETOURNER i  // Trouvé
        FIN SI
    FIN TANT QUE
    
    // Vérifier dernier élément
    SI fibM1 = 1 ET tableau[offset + 1] = cible ALORS
        RETOURNER offset + 1
    FIN SI
    
    RETOURNER -1  // Non trouvé
FIN ALGORITHME`}
            </pre>
                    </div>

                    <div style={styles.grid}>
                        <div style={styles.infoCard}>
                            <h3 style={{fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.75rem', color: '#fdba74'}}>
                                ⏱️ Complexité
                            </h3>
                            <ul style={{listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.6'}}>
                                <li>• Meilleur cas : <span style={{color: '#34d399'}}>O(1)</span></li>
                                <li>• Cas moyen : <span style={{color: '#fbbf24'}}>O(log n)</span></li>
                                <li>• Pire cas : <span style={{color: '#fbbf24'}}>O(log n)</span></li>
                                <li>• Espace : <span style={{color: '#34d399'}}>O(1)</span></li>
                            </ul>
                        </div>

                        <div style={styles.infoCard}>
                            <h3 style={{fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.75rem', color: '#fdba74'}}>
                                ✨ Caractéristiques
                            </h3>
                            <ul style={{listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.6'}}>
                                <li>✓ Pas de division (additions/soustractions)</li>
                                <li>✓ Tableau DOIT être trié</li>
                                <li>✓ Utile si division coûteuse</li>
                                <li>⚠️ Plus complexe que binaire</li>
                                <li>⚠️ Légèrement plus lent en pratique</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{marginTop: '1.5rem', background: '#7c2d12', borderRadius: '0.5rem', padding: '1rem'}}>
                        <h3 style={{fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.75rem', color: '#fed7aa'}}>
                            🔢 Séquence de Fibonacci
                        </h3>
                        <p style={{fontSize: '0.9rem', color: '#fed7aa', lineHeight: '1.6', margin: 0}}>
                            La suite de Fibonacci : 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89...<br/>
                            Chaque nombre est la somme des deux précédents : F(n) = F(n-1) + F(n-2)<br/><br/>
                            L'algorithme utilise ces nombres pour diviser le tableau au lieu de diviser par 2.
                            Pour un tableau de taille 11, on utilise F(6)=13 car c'est le plus petit Fibonacci ≥ 11.
                        </p>
                    </div>

                    <div style={{marginTop: '1.5rem', background: '#064e3b', borderRadius: '0.5rem', padding: '1rem'}}>
                        <h3 style={{fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.75rem', color: '#6ee7b7'}}>
                            💡 Quand utiliser Fibonacci ?
                        </h3>
                        <ul style={{fontSize: '0.9rem', color: '#a7f3d0', lineHeight: '1.6', margin: 0, paddingLeft: '1.5rem'}}>
                            <li><strong>✅ Utiliser si :</strong> La division est une opération coûteuse (anciens processeurs)</li>
                            <li><strong>✅ Utiliser si :</strong> Systèmes embarqués sans FPU (unité calcul à virgule flottante)</li>
                            <li><strong>❌ Éviter si :</strong> Processeurs modernes (binaire est plus rapide)</li>
                            <li><strong>❌ Éviter si :</strong> Simplicité importante (binaire est plus simple)</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}