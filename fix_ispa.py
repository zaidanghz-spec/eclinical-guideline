import re

with open('src/lib/dynamicPathways.ts', 'r') as f:
    content = f.read()

# 1. Add import
if "import { ispaPathway }" not in content:
    content = content.replace("import { sprainStrainPathway } from './pathways/sprain-strain';", "import { sprainStrainPathway } from './pathways/sprain-strain';\nimport { ispaPathway } from './pathways/ispa';")

# 2. Remove ispa-non-pneumonia placeholder
pattern1 = re.compile(r"  // ISPA NON-PNEUMONIA.*?},\n\n", re.DOTALL)
content = pattern1.sub("", content)

# 3. Modify 'ispa' to reference the imported pathway
# Look for: // ISPA (Infeksi Saluran Pernapasan Akut) - PPK Indonesia + WHO + IDSA/ATS 2019
# 'ispa': { ... }
# Wait, let's just do a big regex to remove everything from 'ispa': { down to the end of the object.
# A simpler way: we know 'ispa': { ... } is defined at line 777.
pattern2 = re.compile(r" // ISPA \(Infeksi Saluran Pernapasan Akut\).*?'ispa': \{.*?(?= // VERTIGO - OLD inline pathway)", re.DOTALL)
content = pattern2.sub("  'ispa': ispaPathway,\n\n", content)

with open('src/lib/dynamicPathways.ts', 'w') as f:
    f.write(content)

