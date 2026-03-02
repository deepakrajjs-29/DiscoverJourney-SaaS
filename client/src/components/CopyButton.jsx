import { useState } from 'react';

const CopyButton = ({ text, label = 'Copy', style = {} }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="btn-secondary"
      style={{ fontSize: 13, padding: '8px 16px', ...style }}
    >
      {copied ? '✓ Copied!' : label}
    </button>
  );
};

export default CopyButton;
