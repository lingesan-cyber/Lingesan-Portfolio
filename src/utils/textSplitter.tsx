import React from 'react';

interface SplitTextProps {
  text: string;
  type?: 'chars' | 'words';
  className?: string;
  charClassName?: string;
  wordClassName?: string;
}

export const SplitText: React.FC<SplitTextProps> = ({ 
  text, 
  type = 'chars', 
  className = '',
  charClassName = '',
  wordClassName = ''
}) => {
  if (!text) return null;

  if (type === 'chars') {
    const words = text.split(' ');
    return (
      <span className={`split-text-wrapper ${className}`} style={{ display: 'inline-block' }}>
        {words.map((word, wordIdx) => (
          <span 
            key={wordIdx} 
            className={`split-word-container ${wordClassName}`} 
            style={{ 
              display: 'inline-block', 
              whiteSpace: 'nowrap', 
              verticalAlign: 'bottom' 
            }}
          >
            {word.split('').map((char, charIdx) => (
              <span 
                key={charIdx} 
                className="split-char-container" 
                style={{ 
                  display: 'inline-block', 
                  overflow: 'hidden', 
                  verticalAlign: 'bottom' 
                }}
              >
                <span 
                  className={`split-char ${charClassName}`} 
                  style={{ 
                    display: 'inline-block',
                    transform: 'translateY(100%)',
                    willChange: 'transform'
                  }}
                >
                  {char}
                </span>
              </span>
            ))}
            {/* Space element between words */}
            {wordIdx < words.length - 1 && (
              <span 
                className="split-char-container"
                style={{ 
                  display: 'inline-block', 
                  overflow: 'hidden', 
                  verticalAlign: 'bottom' 
                }}
              >
                <span 
                  className={`split-char ${charClassName}`}
                  style={{ 
                    display: 'inline-block',
                    transform: 'translateY(100%)',
                    willChange: 'transform'
                  }}
                >
                  &nbsp;
                </span>
              </span>
            )}
          </span>
        ))}
      </span>
    );
  }

  if (type === 'words') {
    const words = text.split(' ');
    return (
      <span className={`split-text-wrapper ${className}`} style={{ display: 'inline-block' }}>
        {words.map((word, wordIdx) => (
          <React.Fragment key={wordIdx}>
            <span 
              className="split-word-container" 
              style={{ 
                display: 'inline-block', 
                overflow: 'hidden', 
                verticalAlign: 'bottom' 
              }}
            >
              <span 
                className={`split-word ${wordClassName}`} 
                style={{ 
                  display: 'inline-block',
                  transform: 'translateY(100%)',
                  willChange: 'transform'
                }}
              >
                {word}
              </span>
            </span>
            {wordIdx < words.length - 1 && (
              <span style={{ display: 'inline-block', verticalAlign: 'bottom' }}>&nbsp;</span>
            )}
          </React.Fragment>
        ))}
      </span>
    );
  }

  return <span className={className}>{text}</span>;
};
export default SplitText;
