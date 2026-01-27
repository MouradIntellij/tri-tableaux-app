import React, { useState } from 'react';

export default function TrisBulle() {
    const [cards, setCards] = useState([5, 3, 8, 4, 2, 7, 1, 6]);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);
    const [showPseudocode, setShowPseudocode] = useState(true);

    const isSorted = () => {
        for (let i = 0; i < cards.length - 1; i++) {
            if (cards[i] > cards[i + 1]) return false;
        }
        return true;
    };

    const reset = () => setCards([5, 3, 8, 4, 2, 7, 1, 6]);
    const shuffle = () => setCards([...cards].sort(() => Math.random() - 0.5));

    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        setDragOverIndex(index);
    };

    const handleDragLeave = () => setDragOverIndex(null);

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === dropIndex) {
            setDraggedIndex(null);
            setDragOverIndex(null);
            return;
        }
        const newCards = [...cards];
        const draggedCard = newCards[draggedIndex];
        newCards.splice(draggedIndex, 1);
        newCards.splice(dropIndex, 0, draggedCard);
        setCards(newCards);
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const swapAdjacent = (index) => {
        if (index >= cards.length - 1) return;
        const newCards = [...cards];
        [newCards[index], newCards[index + 1]] = [newCards[index + 1], newCards[index]];
        setCards(newCards);
    };

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
            color: '#e9d5ff',
            textAlign: 'center',
            marginBottom: '2rem'
        },
        mainCard: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
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
        cardsContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: '1rem',
            minHeight: '320px',
            marginBottom: '2rem',
            flexWrap: 'wrap'
        },
        card: {
            background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
            borderRadius: '0.75rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            padding: '1rem',
            border: '4px solid #1d4ed8',
            cursor: 'move',
            transition: 'all 0.2s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90px'
        },
        cardNumber: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        },
        cardPosition: {
            fontSize: '0.875rem',
            color: '#dbeafe',
            fontWeight: '500'
        },
        swapSection: {
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            marginBottom: '1.5rem'
        },
        swapTitle: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            marginBottom: '1rem'
        },
        swapButtons: {
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
        },
        swapButton: {
            background: '#9333ea',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'background 0.2s'
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
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        },
        resetButton: {
            background: '#475569'
        },
        shuffleButton: {
            background: '#ea580c'
        },
        codeButton: {
            background: '#ec4899'
        },
        pseudocodeSection: {
            background: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '2rem',
            color: 'white',
            marginTop: '2rem'
        },
        codeTitle: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem'
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
            gap: '1.5rem',
            marginTop: '1.5rem'
        },
        infoCard: {
            background: '#1e293b',
            borderRadius: '0.5rem',
            padding: '1rem'
        },
        infoTitle: {
            fontWeight: 'bold',
            fontSize: '1.1rem',
            marginBottom: '0.75rem',
            color: '#fbbf24'
        }
    };

    return (
        <div style={styles.container}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <h1 style={styles.title}>Tri à Bulles Interactif</h1>
                <p style={styles.subtitle}>Déplacez les cartes pour les trier du plus petit au plus grand</p>

                <div style={styles.mainCard}>
                    {isSorted() && (
                        <div style={styles.successBanner}>
                            ✓ Bravo ! Le tableau est trié !
                        </div>
                    )}

                    <div style={styles.cardsContainer}>
                        {cards.map((value, index) => (
                            <div
                                key={`${value}-${index}`}
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, index)}
                                onDragEnd={handleDragEnd}
                                style={{
                                    ...styles.card,
                                    height: `${value * 30 + 60}px`,
                                    opacity: draggedIndex === index ? 0.5 : 1,
                                    transform: dragOverIndex === index ? 'scale(1.1)' : 'scale(1)',
                                    outline: dragOverIndex === index ? '4px solid #fbbf24' : 'none'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = dragOverIndex === index ? 'scale(1.1)' : 'scale(1)'}
                            >
                                <div style={styles.cardNumber}>{value}</div>
                                <div style={styles.cardPosition}>Pos {index + 1}</div>
                            </div>
                        ))}
                    </div>

                    <div style={styles.swapSection}>
                        <h3 style={styles.swapTitle}>Échanges rapides (adjacents) :</h3>
                        <div style={styles.swapButtons}>
                            {cards.map((value, index) => (
                                index < cards.length - 1 && (
                                    <button
                                        key={index}
                                        onClick={() => swapAdjacent(index)}
                                        style={styles.swapButton}
                                        onMouseEnter={(e) => e.target.style.background = '#7c3aed'}
                                        onMouseLeave={(e) => e.target.style.background = '#9333ea'}
                                    >
                                        Échanger {value} ↔ {cards[index + 1]}
                                    </button>
                                )
                            ))}
                        </div>
                    </div>

                    <div style={styles.buttonsContainer}>
                        <button
                            onClick={reset}
                            style={{...styles.button, ...styles.resetButton}}
                            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                        >
                            🔄 Réinitialiser
                        </button>
                        <button
                            onClick={shuffle}
                            style={{...styles.button, ...styles.shuffleButton}}
                            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                        >
                            🔀 Mélanger
                        </button>
                        <button
                            onClick={() => setShowPseudocode(!showPseudocode)}
                            style={{...styles.button, ...styles.codeButton}}
                            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                        >
                            {showPseudocode ? '📖 Masquer' : '📖 Afficher'} code
                        </button>
                    </div>
                </div>

                {showPseudocode && (
                    <div style={styles.pseudocodeSection}>
                        <h2 style={styles.codeTitle}>📝 Pseudocode du Tri à Bulles</h2>

                        <div style={styles.grid}>
                            <div>
                                <h3 style={{color: '#60a5fa', marginBottom: '0.75rem', fontWeight: 'bold'}}>Version de base</h3>
                                <div style={styles.codeBlock}>
                  <pre style={{margin: 0, color: '#93c5fd'}}>
{`ALGORITHME TriABulles(tableau)
    n ← longueur(tableau)
    
    POUR i DE 0 À n-2 FAIRE
        POUR j DE 0 À n-i-2 FAIRE
            SI tableau[j] > tableau[j+1] ALORS
                échanger(tableau[j], tableau[j+1])
            FIN SI
        FIN POUR
    FIN POUR
    
    RETOURNER tableau
FIN ALGORITHME`}
                  </pre>
                                </div>
                            </div>

                            <div>
                                <h3 style={{color: '#34d399', marginBottom: '0.75rem', fontWeight: 'bold'}}>Version optimisée</h3>
                                <div style={styles.codeBlock}>
                  <pre style={{margin: 0, color: '#6ee7b7'}}>
{`ALGORITHME TriABullesOptimisé(tableau)
    n ← longueur(tableau)
    échangeEffectué ← VRAI
    
    TANT QUE échangeEffectué FAIRE
        échangeEffectué ← FAUX
        
        POUR j DE 0 À n-2 FAIRE
            SI tableau[j] > tableau[j+1] ALORS
                échanger(tableau[j], tableau[j+1])
                échangeEffectué ← VRAI
            FIN SI
        FIN POUR
        n ← n - 1
    FIN TANT QUE
FIN ALGORITHME`}
                  </pre>
                                </div>
                            </div>
                        </div>

                        <div style={styles.grid}>
                            <div style={styles.infoCard}>
                                <h3 style={styles.infoTitle}>⏱️ Complexité</h3>
                                <ul style={{listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#cbd5e1'}}>
                                    <li>• Meilleur cas : O(n) - déjà trié</li>
                                    <li>• Cas moyen : O(n²)</li>
                                    <li>• Pire cas : O(n²)</li>
                                    <li>• Espace : O(1) - tri en place</li>
                                </ul>
                            </div>

                            <div style={styles.infoCard}>
                                <h3 style={styles.infoTitle}>✨ Caractéristiques</h3>
                                <ul style={{listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#cbd5e1'}}>
                                    <li>✓ Tri en place</li>
                                    <li>✓ Stable</li>
                                    <li>✓ Simple à comprendre</li>
                                    <li>✗ Lent sur grands tableaux</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}