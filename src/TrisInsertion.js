import React, { useState } from 'react';

export default function TrisInsertion() {
    const [cards, setCards] = useState([5, 3, 8, 4, 2, 7, 1, 6]);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [showPseudocode, setShowPseudocode] = useState(true);

    const isSorted = () => {
        for (let i = 0; i < cards.length - 1; i++) {
            if (cards[i] > cards[i + 1]) return false;
        }
        return true;
    };

    const reset = () => {
        setCards([5, 3, 8, 4, 2, 7, 1, 6]);
        setSelectedCard(null);
    };

    const shuffle = () => {
        const newCards = [...cards].sort(() => Math.random() - 0.5);
        setCards(newCards);
        setSelectedCard(null);
    };

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

    const insertCard = (index) => {
        if (index === 0) return;

        setSelectedCard(index);
        const newCards = [...cards];
        const cardToInsert = newCards[index];

        setTimeout(() => {
            let j = index - 1;
            while (j >= 0 && newCards[j] > cardToInsert) {
                newCards[j + 1] = newCards[j];
                j--;
            }
            newCards[j + 1] = cardToInsert;

            setCards(newCards);
            setSelectedCard(null);
        }, 800);
    };

    const getSortedCount = () => {
        let count = 1;
        for (let i = 1; i < cards.length; i++) {
            if (cards[i] >= cards[i - 1]) {
                count++;
            } else {
                break;
            }
        }
        return count;
    };

    const sortedCount = getSortedCount();

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #6b21a8 0%, #9333ea 100%)',
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
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            maxWidth: '1400px',
            margin: '0 auto'
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
            gap: '0.75rem',
            minHeight: '320px',
            marginBottom: '2rem',
            flexWrap: 'wrap'
        },
        card: {
            borderRadius: '0.75rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            padding: '1rem',
            border: '4px solid',
            cursor: 'move',
            transition: 'all 0.2s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '85px'
        },
        cardNumber: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        },
        cardPosition: {
            fontSize: '0.875rem',
            color: 'white',
            fontWeight: '500',
            opacity: 0.9
        },
        actionsSection: {
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            marginBottom: '1.5rem'
        },
        actionsTitle: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        actionsSubtitle: {
            color: '#e9d5ff',
            fontSize: '0.875rem',
            fontStyle: 'italic',
            marginBottom: '1rem'
        },
        actionsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0.75rem'
        },
        actionButton: {
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '0.875rem',
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
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Tri par Insertion Interactif</h1>
            <p style={styles.subtitle}>Insérez chaque carte à sa bonne position dans la partie triée</p>

            <div style={styles.mainCard}>
                {isSorted() && (
                    <div style={styles.successBanner}>
                        ✓ Bravo ! Le tableau est trié !
                    </div>
                )}

                <div style={styles.cardsContainer}>
                    {cards.map((value, index) => {
                        const isInSortedPortion = index < sortedCount;
                        return (
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
                                    background: isInSortedPortion
                                        ? 'linear-gradient(135deg, #34d399 0%, #10b981 100%)'
                                        : 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
                                    borderColor: isInSortedPortion ? '#059669' : '#7c3aed',
                                    opacity: draggedIndex === index ? 0.5 : 1,
                                    transform: dragOverIndex === index ? 'scale(1.1)' : 'scale(1)',
                                    outline: selectedCard === index ? '4px solid #ef4444' :
                                        dragOverIndex === index ? '4px solid #fbbf24' : 'none',
                                    animation: selectedCard === index ? 'pulse 1s infinite' : 'none'
                                }}
                            >
                                <div style={styles.cardNumber}>{value}</div>
                                <div style={styles.cardPosition}>Pos {index + 1}</div>
                            </div>
                        );
                    })}
                </div>

                <div style={styles.actionsSection}>
                    <h3 style={styles.actionsTitle}>
                        ← 📥 Actions de tri par insertion :
                    </h3>
                    <p style={styles.actionsSubtitle}>
                        💡 La carte sera insérée à sa position correcte dans la partie triée (verte)
                    </p>
                    <div style={styles.actionsGrid}>
                        {cards.map((value, index) => (
                            <button
                                key={index}
                                onClick={() => insertCard(index)}
                                disabled={selectedCard !== null || index === 0 || index < sortedCount}
                                style={{
                                    ...styles.actionButton,
                                    background: index > 0 && index >= sortedCount ? '#9333ea' : '#6b7280',
                                    color: 'white',
                                    cursor: index > 0 && index >= sortedCount && selectedCard === null ? 'pointer' : 'not-allowed',
                                    opacity: index > 0 && index >= sortedCount && selectedCard === null ? 1 : 0.6
                                }}
                                onMouseEnter={(e) => {
                                    if (index > 0 && index >= sortedCount && selectedCard === null) {
                                        e.target.style.background = '#7c3aed';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (index > 0 && index >= sortedCount) {
                                        e.target.style.background = '#9333ea';
                                    }
                                }}
                            >
                                {index === 0 ? '✓ Déjà trié' : `Insérer ${value} (pos ${index + 1})`}
                            </button>
                        ))}
                    </div>
                </div>

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
                        🔀 Mélanger
                    </button>
                    <button
                        onClick={() => setShowPseudocode(!showPseudocode)}
                        style={{...styles.button, background: '#c026d3'}}
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
                        📝 Pseudocode du Tri par Insertion
                    </h2>

                    <div style={styles.codeBlock}>
            <pre style={{margin: 0, color: '#c4b5fd'}}>
{`ALGORITHME TriParInsertion(tableau)
    n ← longueur(tableau)
    
    POUR i DE 1 À n-1 FAIRE
        // Sauvegarder l'élément à insérer
        clé ← tableau[i]
        j ← i - 1
        
        // Déplacer les éléments plus grands vers la droite
        TANT QUE j >= 0 ET tableau[j] > clé FAIRE
            tableau[j + 1] ← tableau[j]
            j ← j - 1
        FIN TANT QUE
        
        // Insérer l'élément à sa position correcte
        tableau[j + 1] ← clé
    FIN POUR
    
    RETOURNER tableau
FIN ALGORITHME

PROCÉDURE échanger(a, b)
    temp ← a
    a ← b
    b ← temp
FIN PROCÉDURE`}
            </pre>
                    </div>

                    <div style={styles.grid}>
                        <div style={styles.infoCard}>
                            <h3 style={{fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.75rem', color: '#c4b5fd'}}>
                                ⏱️ Complexité
                            </h3>
                            <ul style={{listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.6'}}>
                                <li>• Meilleur cas : O(n) - déjà trié</li>
                                <li>• Cas moyen : O(n²)</li>
                                <li>• Pire cas : O(n²) - ordre inverse</li>
                                <li>• Espace : O(1)</li>
                            </ul>
                        </div>

                        <div style={styles.infoCard}>
                            <h3 style={{fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.75rem', color: '#c4b5fd'}}>
                                ✨ Caractéristiques
                            </h3>
                            <ul style={{listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.6'}}>
                                <li>✓ Tri en place</li>
                                <li>✓ Stable</li>
                                <li>✓ Efficace pour petits tableaux</li>
                                <li>✓ Excellent si presque trié</li>
                                <li>✓ Algorithme adaptatif</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{marginTop: '1.5rem', background: '#4c1d95', borderRadius: '0.5rem', padding: '1rem'}}>
                        <h3 style={{fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.75rem', color: '#e9d5ff'}}>
                            📝 Exemple pas à pas
                        </h3>
                        <div style={{fontSize: '0.875rem', color: '#e9d5ff', fontFamily: 'monospace', lineHeight: '1.8'}}>
                            <p style={{margin: '0.25rem 0'}}>[5, 3, 8, 4, 2]  ← Initial</p>
                            <p style={{margin: '0.25rem 0'}}>[3, 5, 8, 4, 2]  ← Insérer 3 (déplacer 5)</p>
                            <p style={{margin: '0.25rem 0'}}>[3, 5, 8, 4, 2]  ← 8 déjà bien placé</p>
                            <p style={{margin: '0.25rem 0'}}>[3, 4, 5, 8, 2]  ← Insérer 4 (déplacer 5 et 8)</p>
                            <p style={{margin: '0.25rem 0'}}>[2, 3, 4, 5, 8]  ← Insérer 2 (déplacer tout)</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}