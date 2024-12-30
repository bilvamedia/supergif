// phoneticFilter.ts

import DEFAULT_SUGGESTIONS from './defaultSuggestions'; // Adjust the path as necessary
import BANNED_WORDS from './bannedWords'; // Adjust the path as necessary
function soundex(word: string): string {
    const soundexMapping = {
        'b': '1', 'f': '1', 'p': '1', 'v': '1',
        'c': '2', 'g': '2', 'j': '2', 'k': '2', 'q': '2', 's': '2', 'x': '2',
        'd': '3', 't': '3',
        'l': '4',
        'm': '5', 'n': '5',
        'r': '6'
    };
    
    const firstLetter = word.charAt(0).toUpperCase();
    const rest = word.toLowerCase().slice(1).replace(/[hw]/g, ''); // Remove 'h' and 'w'
    
    let soundexCode = firstLetter;

    let previousCode = '';
    for (let char of rest) {
        const code = soundexMapping[char] || '0'; // Default to '0' if not found
        if (code !== '0' && code !== previousCode) {
            soundexCode += code;
        }
        previousCode = code;
    }

    return (soundexCode + '000').slice(0, 4); // Pad with zeros and limit to 4 characters
}

export function containsBannedWords(input, bannedWords = BANNED_WORDS) {
    const bannedSoundex = bannedWords.map(word => soundex(word));
    const inputWords = input.split(' ');

    // Check if any input word is a default suggestion
    for (const word of inputWords) {
        if (DEFAULT_SUGGESTIONS.includes(word)) {
            return false; // Allow default suggestions to pass through
        }
    }

    // Check for banned words using Soundex and full word matching
    for (const word of inputWords) {
        const inputSoundex = soundex(word);
        if ( bannedWords.includes(word.toLowerCase())) {
            console.log(`Banned word found: ${word}`); // Debugging line
            return true; // Found a banned word
        }
    }
    return false; // No banned words found
}