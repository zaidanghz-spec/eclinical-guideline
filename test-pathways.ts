import { diseases } from './src/lib/diseases';
import { dynamicPathways } from './src/lib/dynamicPathways';

console.log("Konjungtivitis in diseases:", diseases.find(d => d.id === 'konjungtivitis'));
console.log("Konjungtivitis in dynamicPathways:", !!dynamicPathways['konjungtivitis']);

