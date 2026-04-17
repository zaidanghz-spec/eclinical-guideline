import json
import re

with open('src/lib/dynamicPathways.ts', 'r') as f:
    text = f.read()

# Replace import
text = text.replace("import { konjungtivitisPathway } from './pathways/konjungtivitis';", "import { konjungtivitisPathway } from './pathways/konjungtivitis';\nimport { ispaPathway } from './pathways/ispa';")

# Replace placeholder
placeholder_pattern = re.compile(r"  // ISPA NON-PNEUMONIA.*?  },\n\n", re.DOTALL)
text = placeholder_pattern.sub("", text)

# Now, find 'ispa': { ... } and count braces very carefully.
ispa_start = text.find("'ispa': {")
if ispa_start != -1:
    comment_start = text.rfind("// ISPA (Infeksi Saluran Pernapasan Akut)", 0, ispa_start)
    if comment_start != -1:
        replace_start = comment_start
    else:
        replace_start = ispa_start
        
    braces = 0
    # The 'ispa': { has the { at text.find('{', ispa_start)
    brace_start = text.find('{', ispa_start)
    braces = 1
    replace_end = -1
    
    for i in range(brace_start + 1, len(text)):
        if text[i] == '{':
            braces += 1
        elif text[i] == '}':
            braces -= 1
            if braces == 0:
                replace_end = i
                break
                
    if replace_end != -1:
        # Before replace
        print(f"Replacing from index {replace_start} to {replace_end}")
        new_text = text[:replace_start] + "  'ispa': ispaPathway\n" + text[replace_end + 1:]
        
        with open('src/lib/dynamicPathways.ts', 'w') as f:
            f.write(new_text)
        print("Success!")
    else:
        print("Brace match failed.")
else:
    print("Could not find 'ispa': {")
