import React, { useState, useEffect, useMemo } from 'react';

// Curated pool of recognizable MTG cards
const CARD_POOL = [
  { name: "Lightning Bolt", colors: ["R"], cmc: 1, type: "Instant", rarity: "common", year: 1993, power: null, toughness: null },
  { name: "Counterspell", colors: ["U"], cmc: 2, type: "Instant", rarity: "uncommon", year: 1993, power: null, toughness: null },
  { name: "Dark Ritual", colors: ["B"], cmc: 1, type: "Instant", rarity: "common", year: 1993, power: null, toughness: null },
  { name: "Giant Growth", colors: ["G"], cmc: 1, type: "Instant", rarity: "common", year: 1993, power: null, toughness: null },
  { name: "Swords to Plowshares", colors: ["W"], cmc: 1, type: "Instant", rarity: "uncommon", year: 1993, power: null, toughness: null },
  { name: "Llanowar Elves", colors: ["G"], cmc: 1, type: "Creature", rarity: "common", year: 1993, power: 1, toughness: 1 },
  { name: "Serra Angel", colors: ["W"], cmc: 5, type: "Creature", rarity: "uncommon", year: 1993, power: 4, toughness: 4 },
  { name: "Shivan Dragon", colors: ["R"], cmc: 6, type: "Creature", rarity: "rare", year: 1993, power: 5, toughness: 5 },
  { name: "Black Lotus", colors: [], cmc: 0, type: "Artifact", rarity: "rare", year: 1993, power: null, toughness: null },
  { name: "Sol Ring", colors: [], cmc: 1, type: "Artifact", rarity: "uncommon", year: 1993, power: null, toughness: null },
  { name: "Wrath of God", colors: ["W"], cmc: 4, type: "Sorcery", rarity: "rare", year: 1993, power: null, toughness: null },
  { name: "Birds of Paradise", colors: ["G"], cmc: 1, type: "Creature", rarity: "rare", year: 1993, power: 0, toughness: 1 },
  { name: "Brainstorm", colors: ["U"], cmc: 1, type: "Instant", rarity: "common", year: 1995, power: null, toughness: null },
  { name: "Force of Will", colors: ["U"], cmc: 5, type: "Instant", rarity: "uncommon", year: 1996, power: null, toughness: null },
  { name: "Necropotence", colors: ["B"], cmc: 3, type: "Enchantment", rarity: "rare", year: 1995, power: null, toughness: null },
  { name: "Tarmogoyf", colors: ["G"], cmc: 2, type: "Creature", rarity: "rare", year: 2007, power: 0, toughness: 1 },
  { name: "Snapcaster Mage", colors: ["U"], cmc: 2, type: "Creature", rarity: "rare", year: 2011, power: 2, toughness: 1 },
  { name: "Thoughtseize", colors: ["B"], cmc: 1, type: "Sorcery", rarity: "rare", year: 2007, power: null, toughness: null },
  { name: "Path to Exile", colors: ["W"], cmc: 1, type: "Instant", rarity: "uncommon", year: 2009, power: null, toughness: null },
  { name: "Goblin Guide", colors: ["R"], cmc: 1, type: "Creature", rarity: "rare", year: 2009, power: 2, toughness: 2 },
  { name: "Jace, the Mind Sculptor", colors: ["U"], cmc: 4, type: "Planeswalker", rarity: "mythic", year: 2010, power: null, toughness: null },
  { name: "Liliana of the Veil", colors: ["B"], cmc: 3, type: "Planeswalker", rarity: "mythic", year: 2011, power: null, toughness: null },
  { name: "Delver of Secrets", colors: ["U"], cmc: 1, type: "Creature", rarity: "common", year: 2011, power: 1, toughness: 1 },
  { name: "Thragtusk", colors: ["G"], cmc: 5, type: "Creature", rarity: "rare", year: 2012, power: 5, toughness: 3 },
  { name: "Deathrite Shaman", colors: ["B", "G"], cmc: 1, type: "Creature", rarity: "rare", year: 2012, power: 1, toughness: 2 },
  { name: "Monastery Swiftspear", colors: ["R"], cmc: 1, type: "Creature", rarity: "uncommon", year: 2014, power: 1, toughness: 2 },
  { name: "Siege Rhino", colors: ["W", "B", "G"], cmc: 4, type: "Creature", rarity: "rare", year: 2014, power: 4, toughness: 5 },
  { name: "Collected Company", colors: ["G"], cmc: 4, type: "Instant", rarity: "rare", year: 2015, power: null, toughness: null },
  { name: "Fatal Push", colors: ["B"], cmc: 1, type: "Instant", rarity: "uncommon", year: 2017, power: null, toughness: null },
  { name: "Teferi, Hero of Dominaria", colors: ["W", "U"], cmc: 5, type: "Planeswalker", rarity: "mythic", year: 2018, power: null, toughness: null },
  { name: "Arclight Phoenix", colors: ["R"], cmc: 4, type: "Creature", rarity: "mythic", year: 2018, power: 3, toughness: 2 },
  { name: "Omnath, Locus of Creation", colors: ["W", "U", "R", "G"], cmc: 4, type: "Creature", rarity: "mythic", year: 2020, power: 4, toughness: 4 },
  { name: "Ragavan, Nimble Pilferer", colors: ["R"], cmc: 1, type: "Creature", rarity: "mythic", year: 2021, power: 2, toughness: 1 },
  { name: "Murktide Regent", colors: ["U"], cmc: 2, type: "Creature", rarity: "mythic", year: 2021, power: 3, toughness: 3 },
  { name: "The One Ring", colors: [], cmc: 4, type: "Artifact", rarity: "mythic", year: 2023, power: null, toughness: null },
  { name: "Sheoldred, the Apocalypse", colors: ["B"], cmc: 4, type: "Creature", rarity: "mythic", year: 2022, power: 4, toughness: 5 },
  { name: "Fable of the Mirror-Breaker", colors: ["R"], cmc: 3, type: "Enchantment", rarity: "rare", year: 2022, power: null, toughness: null },
  { name: "Atraxa, Grand Unifier", colors: ["W", "U", "B", "G"], cmc: 7, type: "Creature", rarity: "mythic", year: 2023, power: 7, toughness: 7 },
  { name: "Emrakul, the Aeons Torn", colors: [], cmc: 15, type: "Creature", rarity: "mythic", year: 2010, power: 15, toughness: 15 },
  { name: "Primeval Titan", colors: ["G"], cmc: 6, type: "Creature", rarity: "mythic", year: 2010, power: 6, toughness: 6 },
];

const MANA_COLORS = {
  W: { name: "White", bg: "#F8F6D8", text: "#333" },
  U: { name: "Blue", bg: "#0E68AB", text: "#fff" },
  B: { name: "Black", bg: "#2B2B2B", text: "#fff" },
  R: { name: "Red", bg: "#D32029", text: "#fff" },
  G: { name: "Green", bg: "#00733E", text: "#fff" },
};

const ManaSymbol = ({ color, size = 20 }) => {
  const colorData = MANA_COLORS[color];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: colorData.bg,
        color: colorData.text,
        fontSize: size * 0.6,
        fontWeight: 'bold',
        border: '1px solid rgba(0,0,0,0.3)',
        boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3)',
      }}
    >
      {color}
    </span>
  );
};

const CompareIndicator = ({ result, children }) => {
  const colors = {
    correct: { bg: '#2D5A27', border: '#4A9C3D' },
    partial: { bg: '#8B6914', border: '#D4A82B' },
    wrong: { bg: '#4A2C2C', border: '#6B3D3D' },
    higher: { bg: '#4A2C2C', border: '#6B3D3D' },
    lower: { bg: '#4A2C2C', border: '#6B3D3D' },
  };
  
  const style = colors[result] || colors.wrong;
  const arrow = result === 'higher' ? '↑' : result === 'lower' ? '↓' : '';
  
  return (
    <div style={{
      padding: '8px 12px',
      backgroundColor: style.bg,
      border: `2px solid ${style.border}`,
      borderRadius: '6px',
      textAlign: 'center',
      minWidth: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '4px',
    }}>
      {children}
      {arrow && <span style={{ fontSize: '14px' }}>{arrow}</span>}
    </div>
  );
};

const getDailyCard = () => {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = seed % CARD_POOL.length;
  return CARD_POOL[index];
};

const compareColors = (guess, target) => {
  if (guess.length === 0 && target.length === 0) return 'correct';
  if (guess.length === 0 || target.length === 0) return 'wrong';
  
  const guessSet = new Set(guess);
  const targetSet = new Set(target);
  
  const allMatch = guess.length === target.length && guess.every(c => targetSet.has(c));
  if (allMatch) return 'correct';
  
  const someMatch = guess.some(c => targetSet.has(c));
  if (someMatch) return 'partial';
  
  return 'wrong';
};

const compareValue = (guess, target) => {
  if (guess === target) return 'correct';
  if (guess === null || target === null) return 'wrong';
  return guess < target ? 'higher' : 'lower';
};

export default function MTGWordle() {
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  const targetCard = useMemo(() => getDailyCard(), []);
  
  const handleInputChange = (value) => {
    setInput(value);
    if (value.length > 0) {
      const filtered = CARD_POOL.filter(card => 
        card.name.toLowerCase().includes(value.toLowerCase()) &&
        !guesses.some(g => g.name === card.name)
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };
  
  const submitGuess = (card) => {
    if (gameOver) return;
    
    const newGuesses = [...guesses, card];
    setGuesses(newGuesses);
    setInput('');
    setSuggestions([]);
    
    if (card.name === targetCard.name) {
      setGameOver(true);
      setWon(true);
    } else if (newGuesses.length >= 6) {
      setGameOver(true);
    }
  };
  
  const formatColors = (colors) => {
    if (colors.length === 0) return <span style={{ opacity: 0.6 }}>Colorless</span>;
    return (
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
        {colors.map(c => <ManaSymbol key={c} color={c} size={22} />)}
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1a1520',
      backgroundImage: `
        radial-gradient(ellipse at 50% 0%, rgba(75, 50, 100, 0.4) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 80%, rgba(50, 40, 80, 0.3) 0%, transparent 50%),
        url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")
      `,
      color: '#E8E4D9',
      fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
      padding: '20px',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'normal',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            margin: 0,
            textShadow: '0 2px 20px rgba(180, 150, 100, 0.3)',
            background: 'linear-gradient(180deg, #D4C4A8 0%, #8B7355 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Spelldle
          </h1>
          <p style={{ 
            opacity: 0.7, 
            fontStyle: 'italic',
            margin: '8px 0 0 0',
            fontSize: '1.1rem',
          }}>
            Divine the card in 6 guesses
          </p>
        </header>

        {/* Game Status */}
        {gameOver && (
          <div style={{
            textAlign: 'center',
            padding: '20px',
            marginBottom: '20px',
            backgroundColor: won ? 'rgba(45, 90, 39, 0.3)' : 'rgba(74, 44, 44, 0.3)',
            border: `2px solid ${won ? '#4A9C3D' : '#6B3D3D'}`,
            borderRadius: '8px',
          }}>
            {won ? (
              <div>
                <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>✨ Divination Successful! ✨</div>
                <div>You found <strong>{targetCard.name}</strong> in {guesses.length} {guesses.length === 1 ? 'guess' : 'guesses'}!</div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>The spirits elude you...</div>
                <div>The card was <strong>{targetCard.name}</strong></div>
              </div>
            )}
          </div>
        )}

        {/* Input */}
        {!gameOver && (
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Enter a card name..."
              style={{
                width: '100%',
                padding: '16px 20px',
                fontSize: '1.1rem',
                backgroundColor: 'rgba(40, 35, 50, 0.8)',
                border: '2px solid rgba(180, 150, 100, 0.3)',
                borderRadius: '8px',
                color: '#E8E4D9',
                fontFamily: 'inherit',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            {suggestions.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: 'rgba(40, 35, 50, 0.98)',
                border: '2px solid rgba(180, 150, 100, 0.3)',
                borderTop: 'none',
                borderRadius: '0 0 8px 8px',
                zIndex: 100,
                maxHeight: '250px',
                overflowY: 'auto',
              }}>
                {suggestions.map(card => (
                  <div
                    key={card.name}
                    onClick={() => submitGuess(card)}
                    style={{
                      padding: '12px 20px',
                      cursor: 'pointer',
                      borderBottom: '1px solid rgba(180, 150, 100, 0.1)',
                      transition: 'background 0.15s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(180, 150, 100, 0.15)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <span style={{ fontWeight: 500 }}>{card.name}</span>
                    <span style={{ opacity: 0.6, marginLeft: '12px', fontSize: '0.9rem' }}>
                      {card.type} • {card.colors.length > 0 ? card.colors.join('') : 'C'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Hint */}
        {!gameOver && guesses.length >= 3 && (
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <button
              onClick={() => setShowHint(!showHint)}
              style={{
                background: 'none',
                border: '1px solid rgba(180, 150, 100, 0.4)',
                color: '#B4966E',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
              }}
            >
              {showHint ? 'Hide Hint' : 'Reveal Hint'}
            </button>
            {showHint && (
              <p style={{ marginTop: '10px', opacity: 0.8, fontStyle: 'italic' }}>
                First letter: {targetCard.name[0]}
              </p>
            )}
          </div>
        )}

        {/* Guesses */}
        {guesses.length > 0 && (
          <div>
            {/* Header Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.8fr 1fr 0.7fr 1fr 0.8fr 0.7fr 0.6fr 0.6fr',
              gap: '8px',
              padding: '10px 0',
              borderBottom: '1px solid rgba(180, 150, 100, 0.2)',
              marginBottom: '10px',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              opacity: 0.7,
            }}>
              <div>Card</div>
              <div style={{ textAlign: 'center' }}>Colors</div>
              <div style={{ textAlign: 'center' }}>CMC</div>
              <div style={{ textAlign: 'center' }}>Type</div>
              <div style={{ textAlign: 'center' }}>Rarity</div>
              <div style={{ textAlign: 'center' }}>Year</div>
              <div style={{ textAlign: 'center' }}>P</div>
              <div style={{ textAlign: 'center' }}>T</div>
            </div>

            {/* Guess Rows */}
            {guesses.map((guess, i) => {
              const colorResult = compareColors(guess.colors, targetCard.colors);
              const cmcResult = compareValue(guess.cmc, targetCard.cmc);
              const typeResult = guess.type === targetCard.type ? 'correct' : 'wrong';
              const rarityResult = guess.rarity === targetCard.rarity ? 'correct' : 'wrong';
              const yearResult = compareValue(guess.year, targetCard.year);
              const powerResult = (guess.power === null && targetCard.power === null) ? 'correct' : compareValue(guess.power, targetCard.power);
              const toughnessResult = (guess.toughness === null && targetCard.toughness === null) ? 'correct' : compareValue(guess.toughness, targetCard.toughness);
              
              return (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.8fr 1fr 0.7fr 1fr 0.8fr 0.7fr 0.6fr 0.6fr',
                    gap: '8px',
                    marginBottom: '8px',
                    animation: 'fadeIn 0.3s ease',
                  }}
                >
                  <div style={{
                    padding: '10px 12px',
                    backgroundColor: 'rgba(40, 35, 50, 0.6)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 500,
                  }}>
                    {guess.name}
                  </div>
                  <CompareIndicator result={colorResult}>
                    {formatColors(guess.colors)}
                  </CompareIndicator>
                  <CompareIndicator result={cmcResult}>
                    {guess.cmc}
                  </CompareIndicator>
                  <CompareIndicator result={typeResult}>
                    <span style={{ fontSize: '0.85rem' }}>{guess.type}</span>
                  </CompareIndicator>
                  <CompareIndicator result={rarityResult}>
                    <span style={{ fontSize: '0.8rem', textTransform: 'capitalize' }}>{guess.rarity}</span>
                  </CompareIndicator>
                  <CompareIndicator result={yearResult}>
                    {guess.year}
                  </CompareIndicator>
                  <CompareIndicator result={powerResult}>
                    {guess.power ?? '—'}
                  </CompareIndicator>
                  <CompareIndicator result={toughnessResult}>
                    {guess.toughness ?? '—'}
                  </CompareIndicator>
                </div>
              );
            })}
          </div>
        )}

        {/* Legend */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: 'rgba(40, 35, 50, 0.4)',
          borderRadius: '8px',
          fontSize: '0.9rem',
        }}>
          <div style={{ fontWeight: 500, marginBottom: '12px', opacity: 0.8 }}>How to read the clues:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: '#2D5A27', border: '2px solid #4A9C3D', borderRadius: '4px' }} />
              <span>Exact match</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: '#8B6914', border: '2px solid #D4A82B', borderRadius: '4px' }} />
              <span>Partial (some colors match)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: '#4A2C2C', border: '2px solid #6B3D3D', borderRadius: '4px' }} />
              <span>No match</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>↑↓</span>
              <span>Target is higher/lower</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '30px', 
          opacity: 0.5,
          fontSize: '0.85rem',
        }}>
          {CARD_POOL.length} cards in pool • New card daily at midnight
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        input::placeholder {
          color: rgba(232, 228, 217, 0.4);
        }
      `}</style>
    </div>
  );
}
