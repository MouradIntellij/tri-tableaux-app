import React, { useState } from 'react';
import TrisBulle from './TrisBulle';
import TriSelection from './TriSelection';
import TrisInsertion from './TrisInsertion';
import RechercheBinaire from './RechercheBinaire';
import RechercheLineaire from './RechercheLineaire';
import RechercheInterpolation from './RechercheInterpolation';
import RechercheFibonacci from './RechercheFibonacci';
import BigOComplexity from "./BigOComplexity";

function App() {
  const [currentPage, setCurrentPage] = useState('menu');

  const styles = {
    menuContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    },
    menuCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '2rem',
      padding: '3rem',
      maxWidth: '900px',
      width: '100%',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
    },
    title: {
      fontSize: '3.5rem',
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginBottom: '0.5rem',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },
    subtitle: {
      fontSize: '1.3rem',
      color: '#e9d5ff',
      textAlign: 'center',
      marginBottom: '3rem'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#fbbf24',
      marginBottom: '1rem',
      marginTop: '1.5rem'
    },
    buttonsGrid: {
      display: 'grid',
      gap: '1rem',
      marginBottom: '1rem'
    },
    algorithmButton: {
      padding: '1.5rem',
      borderRadius: '1rem',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: 'white',
      transition: 'transform 0.2s, box-shadow 0.2s',
      boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
      textAlign: 'left'
    },
    buttonTitle: {
      fontSize: '1.3rem',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    buttonDesc: {
      fontSize: '0.95rem',
      opacity: 0.9,
      fontWeight: 'normal'
    },
    footer: {
      textAlign: 'center',
      color: '#c4b5fd',
      fontSize: '0.9rem',
      marginTop: '2rem',
      paddingTop: '1.5rem',
      borderTop: '1px solid rgba(255,255,255,0.2)'
    },
    backButton: {
      position: 'fixed',
      top: '2rem',
      left: '2rem',
      padding: '1rem 2rem',
      borderRadius: '0.75rem',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: 'white',
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      transition: 'transform 0.2s',
      zIndex: 1000
    }
  };

  const renderPage = () => {
    const backButton = (
        <button
            onClick={() => setCurrentPage('menu')}
            style={styles.backButton}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          ← Retour au menu
        </button>
    );

    switch(currentPage) {
      case 'bulle': return <>{backButton}<TrisBulle /></>;
      case 'selection': return <>{backButton}<TriSelection /></>;
      case 'insertion': return <>{backButton}<TrisInsertion /></>;
      case 'binaire': return <>{backButton}<RechercheBinaire /></>;
      case 'lineaire': return <>{backButton}<RechercheLineaire /></>;
      case 'interpolation': return <>{backButton}<RechercheInterpolation /></>;
      case 'fibonacci': return <>{backButton}<RechercheFibonacci /></>;
      case 'bigO': return <>{backButton}<BigOComplexity /></>;
      default: return null;
    }
  };

  if (currentPage !== 'menu') {
    return renderPage();
  }

  return (
      <div style={styles.menuContainer}>
        <div style={styles.menuCard}>
          <h1 style={styles.sectionTitle}><center>420-SD4-AS gr. 02821 - Collège LaSalle 🎓</center></h1>
          <p style={styles.subtitle}> 🤔  Tableaux: tri et recherche - Mourad Sehboub</p>
             <h2 style={styles.sectionTitle}>📊 Algorithmes de Tri</h2>
          <div style={styles.buttonsGrid}>
            <button
                onClick={() => setCurrentPage('bulle')}
                style={{
                  ...styles.algorithmButton,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                }}
            >
              <div style={styles.buttonTitle}>🫧 Tri à Bulles</div>
              <div style={styles.buttonDesc}>Les grandes valeurs "remontent" vers la droite</div>
            </button>

            <button
                onClick={() => setCurrentPage('selection')}
                style={{
                  ...styles.algorithmButton,
                  background: 'linear-gradient(135deg, #0f766e 0%, #0e7490 100%)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(14, 116, 144, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                }}
            >
              <div style={styles.buttonTitle}>🔍 Tri par Sélection</div>
              <div style={styles.buttonDesc}>Trouvez le minimum et placez-le à sa position finale</div>
            </button>

            <button
                onClick={() => setCurrentPage('insertion')}
                style={{
                  ...styles.algorithmButton,
                  background: 'linear-gradient(135deg, #6b21a8 0%, #9333ea 100%)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(147, 51, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                }}
            >
              <div style={styles.buttonTitle}>📥 Tri par Insertion</div>
              <div style={styles.buttonDesc}>Insérez chaque carte à sa bonne position</div>
            </button>

            <button onClick={() => setCurrentPage('bigO')}
                style={{
                  ...styles.algorithmButton,
                  background: 'linear-gradient(135deg, #6b21a8 0%, #9333ea 100%)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(147, 51, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                }}
            >
              <div style={styles.buttonTitle}>📊 Complexité Big O</div>
              <div style={styles.buttonDesc}>O(1), O(log n), O(n), O(n^2) ...</div>
            </button>

          </div>

          <h2 style={styles.sectionTitle}>🔎 Algorithmes de Recherche</h2>
          <div style={styles.buttonsGrid}>
            <button
                onClick={() => setCurrentPage('lineaire')}
                style={{
                  ...styles.algorithmButton,
                  background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(20, 184, 166, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                }}
            >
              <div style={styles.buttonTitle}>📍 Recherche Linéaire</div>
              <div style={styles.buttonDesc}>Parcourt élément par élément - O(n) - Tableaux non triés</div>
            </button>

            <button
                onClick={() => setCurrentPage('binaire')}
                style={{
                  ...styles.algorithmButton,
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                }}
            >
              <div style={styles.buttonTitle}>🎯 Recherche Binaire</div>
              <div style={styles.buttonDesc}>Divise par 2 à chaque étape - O(log n) - Tableaux triés</div>
            </button>

            <button
                onClick={() => setCurrentPage('interpolation')}
                style={{
                  ...styles.algorithmButton,
                  background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(168, 85, 247, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                }}
            >
              <div style={styles.buttonTitle}>🧮 Recherche par Interpolation</div>
              <div style={styles.buttonDesc}>Estime la position - O(log log n) - Données uniformes</div>
            </button>

            <button
                onClick={() => setCurrentPage('fibonacci')}
                style={{
                  ...styles.algorithmButton,
                  background: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(249, 115, 22, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                }}
            >
              <div style={styles.buttonTitle}>🔢 Recherche de Fibonacci</div>
              <div style={styles.buttonDesc}>Utilise Fibonacci - O(log n) - Évite la division</div>
            </button>
          </div>

          <div style={styles.footer}>
            <p style={{fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.5rem'}}>
              🎯 7 Algorithmes Interactifs
            </p>
            <p>💡 Glissez-déposez les cartes ou utilisez les boutons d'action</p>
            <p style={{marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.7}}>
              Projet pédagogique - Algorithmes de tri et recherche
            </p>
          </div>
        </div>
      </div>
  );
}

export default App;