import os
import re

pathway_dir = '/Users/zaidanghozali/.gemini/antigravity/scratch/eclinical-guideline/src/lib/pathways'

# Role definitions
# High Priority Nurse Keywords (even if doctor words are present, e.g. "Pasang infus untuk rujukan")
NURSE_PRIORITY = r'pasang infus|iv line|ttv|tensi|suhu|nadi|pernafasan|napas|spo2|gcs|triase|anamnesis|edukasi|ambil darah'

# Doctor Keywords
DOCTOR_KEYWORDS = r'diagnosis|diagnosa|resep|terapi|rujuk|rujukan|prosedur medis|invasif|operas|surat|resume|legal|keputusan|menentukan'

# General Nurse Keywords
NURSE_KEYWORDS = r'asesmen|informasi|posisi|oksigen|stabilisasi|awal'

# Both/Collaboration
BOTH_KEYWORDS = r'injeksi|pemberian|obat|monitor|evaluasi|respon|follow-up|catat|dokumentasi|observasi'

def update_roles(content):
    pattern = re.compile(r'\{[^{}]*?id:\s*\'[^\']+\'[^{}]*?\}', re.DOTALL)
    
    def replace_role(match):
        block = match.group(0)
        
        role = 'both'
        
        # 1. Nurse Priority (Technical actions)
        if re.search(NURSE_PRIORITY, block, re.IGNORECASE):
            role = 'nurse'
        # 2. Doctor (Clinical decision/legal)
        elif re.search(DOCTOR_KEYWORDS, block, re.IGNORECASE):
            role = 'doctor'
        # 3. Other Nurse
        elif re.search(NURSE_KEYWORDS, block, re.IGNORECASE):
            role = 'nurse'
        # 4. Both
        elif re.search(BOTH_KEYWORDS, block, re.IGNORECASE):
            role = 'both'
        
        # Override by category if role is still default or not matched specifically
        if role == 'both':
            if "'assessment'" in block:
                role = 'nurse'
            elif "'medication'" in block:
                role = 'doctor'
            elif "'safety'" in block:
                role = 'both'
            elif "'documentation'" in block:
                role = 'both'
        
        # Cleanup: "Pemberian [obat]" is Both, but "Resep [obat]" is Doctor.
        # If both present, the order above handles it.
        
        updated_block = re.sub(r"role:\s*'[^']+'", f"role: '{role}'", block)
        return updated_block

    return pattern.sub(replace_role, content)

for filename in os.listdir(pathway_dir):
    if filename.endswith('.ts'):
        file_path = os.path.join(pathway_dir, filename)
        with open(file_path, 'r') as f:
            content = f.read()
        updated_content = update_roles(content)
        with open(file_path, 'w') as f:
            f.write(updated_content)
