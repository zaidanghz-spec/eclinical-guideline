import re

with open('src/lib/dynamicPathways.ts', 'r') as f:
    content = f.read()

ispa_idx = content.find("'ispa': {")
if ispa_idx != -1:
    comment_idx = content.rfind("// ISPA (Infeksi Saluran Pernapasan Akut)", 0, ispa_idx)
    if comment_idx != -1:
        start_idx = comment_idx
    else:
        start_idx = ispa_idx
        
    braces = 0
    end_idx = -1
    for i in range(ispa_idx + 8, len(content)):
        if content[i] == '{':
            braces += 1
        elif content[i] == '}':
            if braces == 0:
                end_idx = i
                break
            braces -= 1
            
    if end_idx != -1:
        new_content = content[:start_idx] + "  'ispa': ispaPathway," + content[end_idx+1:]
        with open('src/lib/dynamicPathways.ts', 'w') as f:
            f.write(new_content)
        print("Successfully replaced inline 'ispa' with 'ispaPathway'!")
    else:
        print("Could not find matching brace for 'ispa': {")
else:
    print("Could not find 'ispa': {")
