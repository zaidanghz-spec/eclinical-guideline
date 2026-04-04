import re

with open('src/pages/DynamicPathwayPage.tsx', 'r') as f:
    text = f.read()

match = re.search(r'saveDraft\([\s\S]*?\)', text)
if match:
    print("Found saveDraft call:", match.group(0))

match2 = re.search(r'handleProceedWithVariation\([\s\S]*?\)', text)
if match2:
    print("Found variation handler...", match2.group(0)[:500])
