// const defaultMessages = [];

// const defaultBackgrounds = [
//   'party',
//   'neon',
//   'galaxy',
//   'rainbow',
//   'confetti'
// ];

// const defaultCharacters = [
//   'Dancing Avocado',
//   'Goofy Robot',
//   'Sassy Unicorn'
// ];

// const generateDefaultTemplates = () => {
//   const templates = [];

//   for (const message of defaultMessages) {
//     for (const background of defaultBackgrounds) {
//       for (const character of defaultCharacters) {
//         templates.push({ message, background, character });
//       }
//     }
//   }

//   return templates;
// };

// const generateDefaultTemplatesWithPermutations = () => {
//   const templates = [];

//   for (const message of defaultMessages) {
//     for (const background of defaultBackgrounds) {
//       for (const character of defaultCharacters) {
//         templates.push({ message, background, character });
//         templates.push({ message: character, background, character: message });
//         templates.push({ message, background: character, character: background });
//         templates.push({ message: background, background: message, character });
//       }
//     }
//   }

//   return templates;
// };

// export { generateDefaultTemplates, generateDefaultTemplatesWithPermutations };
