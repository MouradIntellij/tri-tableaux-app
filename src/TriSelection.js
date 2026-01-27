import React, { useState } from 'react';

export default function TriSelection() {
    const [cards, setCards] = useState([5, 3, 8, 4, 2, 7, 1, 6]);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);
    const [selectedMin, setSelectedMin] = useState(null);
    const [showPseudocode, setShowPseudocode] = useState(true);

    const isSorted = () => {
        for (let i = 0; i < cards.length - 1; i++) {
            if (cards[i] > cards[i + 1]) return false;
        }
        return true;
    };

    const reset = () => {
        setCards([5, 3, 8, 4, 2, 7, 1, 6]);
        setSelectedMin(null);
    };

    const shuffle = () => {
        const newCards = [...cards].sort(() => Math.random() - 0.5);
        setCards(newCards);
        setSelectedMin(null);
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

    const selectMinimum = (startIndex) => {
        setSelectedMin(startIndex);
        let minIndex = startIndex;
        for (let i = startIndex + 1; i < cards.length; i++) {
            if (cards[i] < cards[minIndex]) {
                minIndex = i;
            }
        }
        setTimeout(() => {
            if (minIndex !== startIndex) {
                swapCards(startIndex, minIndex);
            }
            setSelectedMin(null);
        }, 800);
    };

    const swapCards = (index1, index2) => {
        const newCards = [...cards];
        [newCards[index1], newCards[index2]] = [newCards[index2], newCards[index1]];
        setCards(newCards);
    };

    const getSortedCount = () => {
        let count = 0;
        for (let i = 0; i < cards.length - 1; i++) {
            if (cards[i] <= cards[i + 1]) {
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
            background: 'linear-gradient(135deg, #0f766e 0%, #0e7490 100%)',
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
            color: '#ccfbf1',
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
            <h1 style={styles.title}>Tri par Sélection Interactif</h1>
            <p style={styles.subtitle}>Sélectionnez le minimum et placez-le à sa position finale</p>

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
                                        : 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)',
                                    borderColor: isInSortedPortion ? '#059669' : '#0891b2',
                                    opacity: draggedIndex === index ? 0.5 : 1,
                                    transform: dragOverIndex === index ? 'scale(1.1)' : 'scale(1)',
                                    outline: selectedMin === index ? '4px solid #ef4444' :
                                        dragOverIndex === index ? '4px solid #fbbf24' : 'none'
                                }}
                            >
                                <div style={styles.cardNumber}>{value}</div>
                                <div style={styles.cardPosition}>Pos {index + 1}</div>
                            </div>
                        );
                    })}
                </div>

                <div style={styles.actionsSection}>
                    <h3 style={styles.actionsTitle}>🔍 Actions de tri par sélection :</h3>
                    <div style={styles.actionsGrid}>
                        {cards.map((value, index) => (
                            <button
                                key={index}
                                onClick={() => selectMinimum(index)}
                                disabled={selectedMin !== null || index >= sortedCount}
                                style={{
                                    ...styles.actionButton,
                                    background: index >= sortedCount ? '#0891b2' : '#6b7280',
                                    color: 'white',
                                    cursor: index >= sortedCount && selectedMin === null ? 'pointer' : 'not-allowed',
                                    opacity: index >= sortedCount && selectedMin === null ? 1 : 0.6
                                }}
                                onMouseEnter={(e) => {
                                    if (index >= sortedCount && selectedMin === null) {
                                        e.target.style.background = '#0e7490';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (index >= sortedCount) {
                                        e.target.style.background = '#0891b2';
                                    }
                                }}
                            >
                                {index === 0 ? '✓ Déjà trié' : `Trouver min depuis pos ${index + 1}`}
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
                        style={{...styles.button, background: '#0891b2'}}
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
                        📝 Pseudocode du Tri par Sélection
                    </h2>

                    <div style={styles.codeBlock}>
            <pre style={{margin: 0, color: '#5eead4'}}>
{`ALGORITHME TriParSélection(tableau)
    n ← longueur(tableau)
    
    POUR i DE 0 À n-2 FAIRE
        // Trouver l'indice du minimum dans la portion non triée
        indiceMin ← i
        
        POUR j DE i+1 À n-1 FAIRE
            SI tableau[j] < tableau[indiceMin] ALORS
                indiceMin ← j
            FIN SI
        FIN POUR
        
        // Échanger le minimum trouvé avec l'élément en position i
        SI indiceMin ≠ i ALORS
            échanger(tableau[i], tableau[indiceMin])
        FIN SI
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
                            <h3 style={{fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.75rem', color: '#5eead4'}}>
                                ⏱️ Complexité
                            </h3>
                            <ul style={{listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.6'}}>
                                <li>• Meilleur cas : O(n²)</li>
                                <li>• Cas moyen : O(n²)</li>
                                <li>• Pire cas : O(n²)</li>
                                <li>• Espace : O(1)</li>
                            </ul>
                        </div>

                        <div style={styles.infoCard}>
                            <h3 style={{fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.75rem', color: '#5eead4'}}>
                                ✨ Caractéristiques
                            </h3>
                            <ul style={{listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.6'}}>
                                <li>✓ Tri en place</li>
                                <li>✓ Nombre minimal d'échanges</li>
                                <li>✗ Non stable</li>
                                <li>✗ Toujours O(n²) comparaisons</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}