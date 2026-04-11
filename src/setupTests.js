import '@testing-library/jest-dom';
const crypto = require('crypto');
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: crypto.randomUUID
  }
});
