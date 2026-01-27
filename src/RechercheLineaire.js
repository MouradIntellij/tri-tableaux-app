import React, { useState } from 'react';

export default function RechercheLineaire() {
    const [cards, setCards] = useState([15, 3, 21, 7, 9, 12, 5, 18, 1, 25]);
    const [searchValue, setSearchValue] = useState('');
    const [searching, setSearching] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [found, setFound] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [comparisons, setComparisons] = useState(0);
    const [showPseudocode, setShowPseudocode] = useState(true);

    const reset = () => {
        setCards([15, 3, 21, 7, 9, 12, 5, 18, 1, 25]);
        setSearchValue('');
        setSearching(false);
        setCurrentIndex(null);
        setFound(null);
        setNotFound(false);
        setComparisons(0);
    };

    const shuffle = () => {
        const newCards = Array.from({length: 10}, () => Math.floor(Math.random() * 30) + 1);
        setCards(newCards);
        setSearchValue('');
        setSearching(false);
        setCurrentIndex(null);
        setFound(null);
        setNotFound(false);
        setComparisons(0);
    };

    const linearSearch = async (target) => {
        setSearching(true);
        setFound(null);
        setNotFound(false);
        setComparisons(0);

        for (let i = 0; i < cards.length; i++) {
            setCurrentIndex(i);
            setComparisons(i + 1);

            await new Promise(resolve => setTimeout(resolve, 800));

            if (cards[i] === target) {
                setFound(i);
                setCurrentIndex(null);
                setSearching(false);
                return;
            }
        }

        setNotFound(true);
        setCurrentIndex(null);
        setSearching(false);
    };

    const handleSearch = () => {
        const target = parseInt(searchValue);
        if (isNaN(target)) {
            alert('Veuillez entrer un nombre valide');
            return;
        }
        linearSearch(target);
    };

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
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
            border: '2px solid #14b8a6',
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
        statsBar: {
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
        },
        stat: {
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            fontWeight: 'bold',
            fontSize: '1rem',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white'
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
        infoBox: {
            background: 'rgba(20, 184, 166, 0.2)',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '2rem',
            color: '#ccfbf1',
            fontSize: '0.95rem',
            borderLeft: '4px solid #14b8a6'
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
            <h1 style={styles.title}>Recherche Linéaire Interactive</h1>
            <p style={styles.subtitle}>Parcourez le tableau élément par élément jusqu'à trouver la valeur recherchée</p>

            <div style={styles.mainCard}>
                {found !== null && (
                    <div style={styles.successBanner}>
                        ✓ Élément trouvé à l'index {found} après {comparisons} comparaison{comparisons > 1 ? 's' : ''} !
                    </div>
                )}

                {notFound && (
                    <div style={styles.errorBanner}>
                        ✗ Élément {searchValue} non trouvé après {comparisons} comparaisons
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
                    <p style={{color: '#ccfbf1', fontSize: '0.875rem', marginTop: '0.75rem', fontStyle: 'italic'}}>
                        💡 La recherche linéaire fonctionne sur les tableaux NON triés
                    </p>
                </div>

                <div style={styles.statsBar}>
                    <div style={styles.stat}>
                        📊 Comparaisons : {comparisons}
                    </div>
                    <div style={styles.stat}>
                        📏 Taille du tableau : {cards.length}
                    </div>
                    {currentIndex !== null && (
                        <div style={{...styles.stat, background: '#f59e0b', animation: 'pulse 1s infinite'}}>
                            👉 Position actuelle : {currentIndex}
                        </div>
                    )}
                </div>

                <div style={styles.cardsContainer}>
                    {cards.map((value, index) => {
                        let bgColor = 'linear-gradient(135deg, #5eead4 0%, #14b8a6 100%)';
                        let borderColor = '#0d9488';
                        let scale = 1;

                        if (found === index) {
                            bgColor = 'linear-gradient(135deg, #34d399 0%, #10b981 100%)';
                            borderColor = '#059669';
                            scale = 1.15;
                        } else if (currentIndex === index) {
                            bgColor = 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)';
                            borderColor = '#d97706';
                            scale = 1.1;
                        } else if (currentIndex !== null && index < currentIndex) {
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

                <div style={styles.infoBox}>
                    <strong>💡 Comment ça marche :</strong> La recherche linéaire parcourt chaque élément un par un,
                    de gauche à droite, jusqu'à trouver l'élément recherché ou atteindre la fin du tableau.
                    Les éléments déjà vérifiés deviennent gris, l'élément en cours de vérification est en jaune.
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
                        🔀 Nouveau tableau
                    </button>
                    <button
                        onClick={() => setShowPseudocode(!showPseudocode)}
                        style={{...styles.button, background: '#14b8a6'}}
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
                        📝 Pseudocode de la Recherche Linéaire
                    </h2>

                    <div style={styles.codeBlock}>
            <pre style={{margin: 0, color: '#5eead4'}}>
{`ALGORITHME RechercheLinéaire(tableau, cible)
    n ← longueur(tableau)
    
    POUR i DE 0 À n-1 FAIRE
        SI tableau[i] = cible ALORS
            RETOURNER i  // Élément trouvé à l'index i
        FIN SI
    FIN POUR
    
    RETOURNER -1  // Élément non trouvé
FIN ALGORITHME

// Version alternative avec TANT QUE
ALGORITHME RechercheLinéaireV2(tableau, cible)
    i ← 0
    n ← longueur(tableau)
    
    TANT QUE i < n FAIRE
        SI tableau[i] = cible ALORS
            RETOURNER i
        FIN SI
        i ← i + 1
    FIN TANT QUE
    
    RETOURNER -1
FIN ALGORITHME`}
            </pre>
                    </div>

                    <div style={styles.grid}>
                        <div style={styles.infoCard}>
                            <h3 style={{fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.75rem', color: '#5eead4'}}>
                                ⏱️ Complexité
                            </h3>
                            <ul style={{listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.6'}}>
                                <li>• Meilleur cas : <span style={{color: '#34d399'}}>O(1)</span> - élément au début</li>
                                <li>• Cas moyen : <span style={{color: '#fbbf24'}}>O(n/2) = O(n)</span></li>
                                <li>• Pire cas : <span style={{color: '#ef4444'}}>O(n)</span> - élément à la fin ou absent</li>
                                <li>• Espace : <span style={{color: '#34d399'}}>O(1)</span></li>
                            </ul>
                        </div>

                        <div style={styles.infoCard}>
                            <h3 style={{fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.75rem', color: '#5eead4'}}>
                                ✨ Caractéristiques
                            </h3>
                            <ul style={{listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.6'}}>
                                <li>✓ Fonctionne sur tableau NON trié</li>
                                <li>✓ Très simple à implémenter</li>
                                <li>✓ Pas de prétraitement nécessaire</li>
                                <li>✗ Lent pour grands tableaux</li>
                                <li>✗ Parcourt tout en cas d'absence</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{marginTop: '1.5rem', background: '#0f766e', borderRadius: '0.5rem', padding: '1rem'}}>
                        <h3 style={{fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.75rem', color: '#ccfbf1'}}>
                            📊 Comparaison avec Recherche Binaire
                        </h3>
                        <div style={{fontSize: '0.9rem', color: '#ccfbf1', lineHeight: '1.6'}}>
                            <table style={{width: '100%', borderCollapse: 'collapse'}}>
                                <thead>
                                <tr style={{borderBottom: '2px solid #14b8a6'}}>
                                    <th style={{padding: '0.5rem', textAlign: 'left'}}>Critère</th>
                                    <th style={{padding: '0.5rem', textAlign: 'center'}}>Linéaire</th>
                                    <th style={{padding: '0.5rem', textAlign: 'center'}}>Binaire</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td style={{padding: '0.5rem'}}>Tableau trié requis</td>
                                    <td style={{padding: '0.5rem', textAlign: 'center'}}>❌ Non</td>
                                    <td style={{padding: '0.5rem', textAlign: 'center'}}>✅ Oui</td>
                                </tr>
                                <tr>
                                    <td style={{padding: '0.5rem'}}>Complexité</td>
                                    <td style={{padding: '0.5rem', textAlign: 'center'}}>O(n)</td>
                                    <td style={{padding: '0.5rem', textAlign: 'center'}}>O(log n)</td>
                                </tr>
                                <tr>
                                    <td style={{padding: '0.5rem'}}>Pour 1000 éléments</td>
                                    <td style={{padding: '0.5rem', textAlign: 'center'}}>~500 comparaisons</td>
                                    <td style={{padding: '0.5rem', textAlign: 'center'}}>~10 comparaisons</td>
                                </tr>
                                <tr>
                                    <td style={{padding: '0.5rem'}}>Utilisation</td>
                                    <td style={{padding: '0.5rem', textAlign: 'center'}}>Petits tableaux</td>
                                    <td style={{padding: '0.5rem', textAlign: 'center'}}>Grands tableaux triés</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div style={{marginTop: '1.5rem', background: '#064e3b', borderRadius: '0.5rem', padding: '1rem'}}>
                        <h3 style={{fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.75rem', color: '#6ee7b7'}}>
                            💡 Quand utiliser la recherche linéaire ?
                        </h3>
                        <ul style={{fontSize: '0.9rem', color: '#a7f3d0', lineHeight: '1.6', margin: 0, paddingLeft: '1.5rem'}}>
                            <li>Le tableau est petit (moins de 100 éléments)</li>
                            <li>Le tableau n'est PAS trié et trier coûterait trop cher</li>
                            <li>On fait peu de recherches (trier puis recherche binaire ne vaut pas le coup)</li>
                            <li>Les données changent fréquemment</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}