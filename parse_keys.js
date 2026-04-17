import fs from 'fs';

const content = fs.readFileSync('src/lib/dynamicPathways.ts', 'utf8');

// A very naive regex to get top-level keys in the dynamicPathways object.
const match = content.match(/export const dynamicPathways: Record<string, DynamicPathway> = \{([\s\S]*?)\n\};/);
if (match) {
    const body = match[1];
    // console.log("Body length:", body.length);
    // write a simple parser to find the start and end of 'ispa': { ... }
    let ispaStart = content.indexOf(`'ispa': {`);
    if (ispaStart !== -1) {
        let braces = 0;
        let ispaEnd = -1;
        for (let i = ispaStart + 8; i < content.length; i++) {
            if (content[i] === '{') braces++;
            else if (content[i] === '}') {
                if (braces === 0) {
                    ispaEnd = i;
                    break;
                }
                braces--;
            }
        }
        
        if (ispaEnd !== -1) {
            // Remove the block
            // Also need to get right before 'ispa' to find the comment
            const commentStart = content.lastIndexOf('// ISPA (Infeksi Saluran Pernapasan Akut)', ispaStart);
            if (commentStart !== -1) {
                ispaStart = commentStart;
            }
            const newContent = content.substring(0, ispaStart) + "  'ispa': ispaPathway," + content.substring(ispaEnd + 1);
            fs.writeFileSync('src/lib/dynamicPathways.ts', newContent);
            console.log("Successfully replaced inline 'ispa' with 'ispaPathway'!");
        } else {
            console.log("Could not find matching brace");
        }
    } else {
        console.log("could not find 'ispa': {");
    }
}
