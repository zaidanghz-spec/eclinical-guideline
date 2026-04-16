// ============================================================
// TATA LAKSANA KONJUNGTIVITIS AKUT
// REFERENSI UTAMA:
// 1. KMK No. HK.01.07/MENKES/1186/2022 – PPK Dokter di FKTP
//    Bab: "Konjungtivitis" (Bakterialis, Viral, Alergik)
// 2. Pedoman Nasional Pelayanan Kedokteran (PNPK) Mata
//    Kemenkes RI – Konjungtivitis & Penyakit Segmen Anterior
// 3. AAO-PPP (American Academy of Ophthalmology – Preferred
//    Practice Pattern): Conjunctivitis 2018 (Updated 2023)
// 4. Azari AA, Barney NP. Conjunctivitis: A Systematic Review
//    of Diagnosis and Treatment. JAMA. 2013;310(16):1721–1730.
// 5. WHO Primary Eye Care Guidelines – Community Eye Health (ICEH)
// ============================================================
// CATATAN KAPASITAS KLINIK:
// Alat: TTV (tensi, termometer, oxymeter), EKG, Suction, Nebulizer
// Tidak tersedia: Slit lamp, Snellen chart, fluoresein, kultur
// → Diagnosis klinis + penlight + rujuk sesuai indikasi
// KECUALI CHEMICAL INJURY: IRIGASI MATA DARURAT dengan APAPUN
//   air bersih yang tersedia — jangan tunggu apapun!
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const konjungtivitisPathway: DynamicPathway = {
  diseaseId: 'konjungtivitis',
  diseaseName: 'Konjungtivitis Akut (KMK 1186/2022 + AAO PPP 2023)',
  startNodeId: 'konj-initial-assessment',
  nodes: {

    // ============================================================
    // NODE 1: INITIAL ASSESSMENT (SOAP Order)
    // ============================================================
    'konj-initial-assessment': {
      id: 'konj-initial-assessment',
      type: 'checklist',
      title: 'Node 1: Initial Assessment — Anamnesis, TTV & Pemeriksaan Mata Dasar',
      description: 'Konjungtivitis = peradangan konjungtiva. Diagnosis KLINIS. Wajib singkirkan kondisi serius (chemical injury, keratitis, glaukoma akut, uveitis) yang tampak mirip tapi butuh penanganan BERBEDA!',
      items: [
        {
          id: 'konj-anamnesis',
          title: 'Anamnesis — Subjective (DAHULU DIISI!)',
          description: '(1) Mata mana yang sakit? Satu (unilateral) atau dua (bilateral)? (2) Onset & durasi: mendadak atau bertahap? (3) Jenis sekret: berair/encer (viral/alergik), kental kuning-hijau (bakteri), tidak ada sekret tapi merah (iritasi). (4) Gatal dominan? (alergik 80%). (5) Ada kontak dengan penderita mata merah? (viral = sangat menular). (6) Riwayat alergi/rinitis/asma/eksim? (alergik). (7) RIWAYAT PAPARAN KIMIA/BAHAN BERBAHAYA? → DARURAT, tanya SEGERA!',
          required: true,
          category: 'assessment'
        },
        {
          id: 'konj-vital-signs',
          title: 'Vital Signs — TTV Lengkap',
          description: 'Tensi, Suhu (termometer), SpO₂ (oxymeter), Nadi. Demam + konjungtivitis bilateral + rhinitis → curiga konjungtivitis viral adenovirus (Epidemic Keratoconjunctivitis/EKC). Demam tinggi + sekret purulen berlebih pada neonatus → Ophthalmia Neonatorum (darurat!). Suhu normal pada konjungtivitis alergik dan iritasi.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'konj-visus-dasar',
          title: 'VISUS / KETAJAMAN PENGLIHATAN — Wajib Dinilai! (Tanpa Snellen Chart)',
          description: 'KLINIK TANPA SNELLEN: Nilai visus kasar dengan: (A) Pasien baca tulisan/handphone dari jarak 30–40 cm — normal? (B) Hitung jari tangan dari jarak 3–6 meter. (C) Persepsi cahaya: pasien tutup satu mata, arahkan lampu — bisa bedakan terang-gelap? Visus TURUN dari baseline = RED FLAG! → Rujuk SpM segera, bisa keratitis/uveitis/glaukoma akut, bukan konjungtivitis biasa!',
          required: true,
          category: 'safety'
        },
        {
          id: 'konj-inspeksi-penlight',
          title: 'Inspeksi Mata dengan Penlight/Lampu Senter',
          description: 'Periksa dengan penlight (senter HP bisa digunakan): (1) Injeksi konjungtiva: merah di pinggir? (konj. perifer = konjungtivitis biasa) atau merah di sekeliling kornea/limbus? (injeksi siliar = uveitis/glaukoma/keratitis = RUJUK!). (2) Sekret: encer/berair vs kental/purulen vs tidak ada. (3) Kemosis: konjungtiva bengkak/menonjol? (alergik berat). (4) Papil atau folikel di konjungtiva tarsal bawah (balikkan kelopak bawah): papil besar → alergik, folikel kecil-kecil → viral/klamidia. (5) Kornea: JERNIH atau ada bercak putih/keruh? Keruh = keratitis = RUJUK!',
          required: true,
          category: 'assessment'
        },
        {
          id: 'konj-red-flag-screen',
          title: 'RED FLAG SCREEN — Bukan Konjungtivitis Biasa Jika Ada Ini!',
          description: 'RUJUK SEGERA ke SpMata (Oftalmologis) jika ada SATU dari: (A) Visus menurun dari BASELINE, (B) Nyeri DALAM/BERAT (bukan hanya sensasi berpasir/gatal), (C) Kornea keruh/bercak putih, (D) Pupil tidak reguler atau tidak reaktif cahaya, (E) Mata sangat keras saat diraba (curiga glaukoma akut), (F) Fotofobia berat, (G) Riwayat trauma/benda asing menembus bola mata, (H) PAPARAN KIMIA (DARURAT — irigasi SEGERA!), (I) Neonatus <28 hari dengan sekret purulen (ophthalmia neonatorum).',
          required: true,
          category: 'safety'
        }
      ],
      nextNodeId: 'konj-emergency-decision'
    },

    // ============================================================
    // NODE 2: EMERGENCY DECISION — Chemical Injury or Not?
    // ============================================================
    'konj-emergency-decision': {
      id: 'konj-emergency-decision',
      type: 'decision',
      title: 'Node 2: Chemical Injury / Trauma — Urgent Triage!',
      description: 'Chemical eye injury = satu-satunya kondisi mata di mana TIDAK perlu anamnesis lengkap dulu — IRIGASI DAHULU, anamnesis kemudian! Setiap menit tunda = kerusakan permanen lebih luas.',
      warningLevel: 'critical',
      branches: [
        {
          id: 'konj-chemical',
          title: 'PAPARAN KIMIA / CHEMICAL INJURY — IRIGASI MATA SEGERA!',
          description: 'Apapun bahan kimia yang masuk ke mata: asam (pemutih, aki), basa (kapur, NaOH — PALING BAHAYA), semprotan kimia, pestisida. Atau: trauma tumpul/tajam, benda asing menembus. → IRIGASI DAHULU sebelum apapun, lalu RUJUK SpM CITO!',
          color: 'red',
          nextNodeId: 'konj-chemical-management',
          riskLevel: 'high'
        },
        {
          id: 'konj-red-flag-rujuk',
          title: 'RED FLAG POSITIF — Visus Turun / Nyeri Dalam / Kornea Keruh / Glaukoma',
          description: 'Salah satu red flag positif tanpa riwayat paparan kimia. Curiga: uveitis anterior, keratitis, glaukoma akut sudut tertutup, endoftalmitis. → RUJUK SpM segera, jangan terapi sendiri dulu!',
          color: 'orange',
          nextNodeId: 'konj-referral-management',
          riskLevel: 'medium'
        },
        {
          id: 'konj-no-red-flag',
          title: 'TIDAK ADA RED FLAG — Lanjut Klasifikasi Jenis Konjungtivitis',
          description: 'Tidak ada tanda bahaya. Visus baik, kornea jernih, nyeri hanya sensasi berpasir/gatal/tidak nyaman. → Tentukan jenis konjungtivitis untuk terapi yang tepat.',
          color: 'green',
          nextNodeId: 'konj-type-decision',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 3: CHEMICAL INJURY — DARURAT!
    // ============================================================
    'konj-chemical-management': {
      id: 'konj-chemical-management',
      type: 'checklist',
      title: 'Node 3: CHEMICAL EYE INJURY — Irigasi Mata SEGERA! (DARURAT)',
      description: 'Chemical injury: SETIAP MENIT PENTING. Basa (kapur, NaOH) jauh lebih berbahaya dari asam karena penetrasi lebih dalam. Kebutaan permanen bisa terjadi dalam menit. IRIGASI ADALAH TERAPI DEFINITIF PERTAMA — apapun yang tersedia!',
      items: [
        {
          id: 'chem-irigasi-segera',
          title: 'IRIGASI SEGERA — Gunakan Apapun Air Bersih yang Tersedia!',
          description: 'JANGAN TUNDA untuk mencari larutan khusus! Gunakan: NaCl 0.9% IV (ideal, tersedia di klinik), atau Air PAM bersih, atau Air mineral botol. TEKNIK: pasien berbaring atau duduk condong, kepala miring ke sisi mata sakit. Cuci mata dengan alur air mengalir TERUS-MENERUS dari sudut dalam ke luar selama MINIMAL 20–30 MENIT tanpa henti. Buka kelopak paksa dengan jari sambil pasien berkedip/memutar bola mata.',
          required: true,
          category: 'action'
        },
        {
          id: 'chem-ph-check',
          title: 'Cek pH Mata (Jika Tersedia Kertas Lakmus/pH Strip)',
          description: 'Target: pH 7.0–7.4 (netral) setelah irigasi. Jika klinik tidak punya pH strip → TETAP IRIGASI minimal 20–30 menit tanpa henti, lanjutkan hingga SpM yang nilai pH. Jangan hentikan irigasi hanya karena tidak ada alat ukur pH.',
          required: false,
          category: 'assessment'
        },
        {
          id: 'chem-identifikasi-bahan',
          title: 'Identifikasi Bahan Kimia (Sambil Irigasi Berlangsung)',
          description: 'Tanya sambil tangan tetap memegang wadah irigasi: Bahan apa? Konsentrasi? Asam atau basa? Berapa lama paparan sebelum irigasi? Bawa botol/kemasan bahan kimia ke RS bersama pasien. Info ini penting untuk SpM menilai kedalaman kerusakan.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'chem-analgesia',
          title: 'Analgesia — Mata Chemical Injury Sangat Nyeri',
          description: 'Tetes anestesi topikal (Tetrakain/Prokain 0.5%) jika tersedia → membantu pasien kooperatif selama irigasi. Jika tidak ada → tetap lakukan irigasi meski nyeri (kebutaan > nyeri sementara). Ibuprofen atau parasetamol oral sambil menunggu rujuk.',
          required: false,
          category: 'medication'
        },
        {
          id: 'chem-rujuk-cito-spm',
          title: 'RUJUK CITO ke SpMata / RS dengan Fasilitas Oftalmologi!',
          description: 'Setelah irigasi minimal 20–30 menit → RUJUK SEGERA ke SpMata. Surat rujukan: jenis bahan kimia, waktu paparan, lama irigasi yang dilakukan, kondisi visus saat diperiksa. TIDAK ADA terapi topikal antibiotik atau steroid yang bisa substitute untuk evaluasi SpM pada chemical injury. Selama transportasi: minta pasien tutup mata, jangan dikucek.',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'konj-education-followup'
    },

    // ============================================================
    // NODE 4: RED FLAG — RUJUK SpMata
    // ============================================================
    'konj-referral-management': {
      id: 'konj-referral-management',
      type: 'checklist',
      title: 'Node 4: Red Flag Positif — Stabilisasi & Rujuk SpMata',
      description: 'Kondisi mata serius yang tampak seperti konjungtivitis tetapi BUKAN konjungtivitis biasa. Klinik tanpa slit lamp tidak bisa menegakkan diagnosis pasti — rujuk adalah tindakan yang benar.',
      items: [
        {
          id: 'ref-jangan-terapi-dulu',
          title: 'JANGAN Berikan Steroid Tetes Mata Tanpa Diagnosis Pasti!',
          description: 'Steroid topikal pada keratitis herpetik → perburukan dramatis (kornea bisa berlubang!). Steroid pada glaukoma → naikkan TIO, perparah kebutaan. Jika tidak yakin diagnosis → JANGAN berikan steroid. Antibiotik topikal boleh diberikan sementara jika curiga komponen bakteri sambil menunggu rujuk.',
          required: true,
          category: 'safety'
        },
        {
          id: 'ref-pereda-nyeri',
          title: 'Pereda Nyeri Oral Sambil Menunggu Rujuk',
          description: 'Parasetamol 500–1000 mg atau Ibuprofen 400 mg oral untuk analgesia. Jangan tetes anestesi (tetrakain) sebagai pereda nyeri kronik → menyebabkan kerusakan kornea lebih parah dan menutupi gejala!',
          required: true,
          category: 'medication'
        },
        {
          id: 'ref-surat-rujukan',
          title: 'Surat Rujukan Lengkap ke SpMata',
          description: 'Isi surat: temuan klinis (visus kasar, injeksi siliar/konjungtival, kondisi kornea, keadaan pupil), riwayat singkat, obat yang sudah diberikan, tanda vital. Rujuk ke RS terdekat dengan spesialisasi mata dan slit lamp. Prioritas hari ini/segera jika ada visus turun atau nyeri berat.',
          required: true,
          category: 'documentation'
        }
      ],
      nextNodeId: 'konj-education-followup'
    },

    // ============================================================
    // NODE 5: TYPE CLASSIFICATION
    // ============================================================
    'konj-type-decision': {
      id: 'konj-type-decision',
      type: 'decision',
      title: 'Node 5: Klasifikasi Jenis Konjungtivitis — Tentukan Terapi!',
          description: 'Perbedaan jenis menentukan terapi. Jangan berikan antibiotik topikal untuk semua kasus mata merah — 65–80% konjungtivitis akut adalah viral atau alergik dan self-limiting!',
      warningLevel: 'info',
      branches: [
        {
          id: 'konj-bacterial',
          title: 'BAKTERI — Sekret Kental Kuning/Hijau, Kelopak Lengket Pagi Hari',
          description: 'Sekret purulen, satu atau dua mata. Kelopak mata sering lengket/kering saat bangun tidur. Biasanya dimulai dari satu mata → menyebar. Penyebab: Staphylococcus aureus, Streptococcus, Haemophilus. Pada neonatus <1 bulan: → rujuk (gonococcal/chlamydial).',
          color: 'orange',
          nextNodeId: 'konj-bacterial-management',
          riskLevel: 'medium'
        },
        {
          id: 'konj-viral',
          title: 'VIRAL — Sekret Berair, Sangat Menular, Sering Bilateral',
          description: 'Sekret encer/berair, mulai dari satu mata lalu ke dua mata. Sering bersamaan infeksi saluran napas atas (ISPA/flu/faringitis). Limfadenopati preaurikuler (kelenjar getah bening di depan telinga) bisa teraba. SANGAT MENULAR (adenovirus = epidemic keratoconjunctivitis).',
          color: 'blue',
          nextNodeId: 'konj-viral-management',
          riskLevel: 'low'
        },
        {
          id: 'konj-allergic',
          title: 'ALERGIK — GATAL DOMINAN, Bilateral, Riwayat Atopi',
          description: 'GATAL adalah gejala utama dan dominan (bukan nyeri, bukan sekret banyak). Selalu bilateral. Bisa ada kemosis (konjungtiva bengkak). Riwayat atopi (rinitis alergi, asma, eksim). Musiman atau sepanjang tahun. Tidak menular.',
          color: 'green',
          nextNodeId: 'konj-allergic-management',
          riskLevel: 'low'
        },
        {
          id: 'konj-chlamydial',
          title: 'KLAMIDIA — Kronik, Sekret Mukopurulen, Sering Berkaitan STI',
          description: 'Konjungtivitis yang tidak sembuh >3 minggu dengan antibiotik biasa. Sekret mukopurulen kronis. Folikel besar di konjungtiva tarsal. Dewasa: sering berkaitan penyakit menular seksual (gonore/klamidia). Anak-anak: transmisi perinatal. Butuh antibiotik SISTEMIK, bukan topikal saja.',
          color: 'purple',
          nextNodeId: 'konj-chlamydial-management',
          riskLevel: 'medium'
        }
      ]
    },

    // ============================================================
    // NODE 6: BACTERIAL CONJUNCTIVITIS
    // Ref: KMK 1186/2022 + AAO PPP 2023
    // ============================================================
    'konj-bacterial-management': {
      id: 'konj-bacterial-management',
      type: 'checklist',
      title: 'Node 6: Konjungtivitis Bakterialis — Antibiotik Topikal 5–7 Hari',
      description: 'Mayoritas konjungtivitis bakterialis non-komplikata adalah SELF-LIMITING (sembuh 7–14 hari tanpa antibiotik). Namun antibiotik topikal mempercepat penyembuhan dan mengurangi penularan.',
      items: [
        {
          id: 'bakt-bersihkan-sekret',
          title: 'Bersihkan Sekret Mata — Kompres + Usap Lembut',
          description: 'Kompres kapas/kain bersih yang dibasahi air hangat steril pada mata tertutup 2–3 menit untuk melembutkan krusta. Usap lembut dari sudut dalam ke luar. Pasien harus cuci tangan sebelum dan sesudah! Gunakan kapas/tisu berbeda untuk masing-masing mata. Ini penting agar obat topikal bisa masuk ke konjungtiva.',
          required: true,
          category: 'action'
        },
        {
          id: 'bakt-antibiotik-topikal',
          title: 'Antibiotik Topikal Mata — 5–7 Hari',
          description: 'Pilihan tetes mata antibiotik (urutan preferensi): (1) Ofloksasin 0.3% → 1 tetes tiap 2–4 jam hari 1–2, lalu tiap 4–6 jam hari 3–7 (broad spectrum, coverage baik). (2) Kloramfenikol 0.5% → 1–2 tetes tiap 3–4 jam (murah, tersedia luas di Indonesia). (3) Gentamisin 0.3% → 1 tetes tiap 4–6 jam. Atau salep: Tetrasiklin HCl 1% salep mata 3–4× sehari. Cara tetes: kepala menengadah, tarik kelopak bawah, teteskan di kantung konjungtiva bawah.',
          required: true,
          category: 'medication'
        },
        {
          id: 'bakt-tidak-perlu-oral',
          title: 'Antibiotik Oral — Tidak Diperlukan untuk Kasus Non-Komplikata',
          description: 'Antibiotik oral TIDAK dibutuhkan untuk konjungtivitis bakterial non-komplikata. Berikan HANYA jika: ada tanda otitis media bersamaan (pada anak), sinusitis bakterial, atau gonococcal konjungtivitis (hiperpirulen = RUJUK + ceftriaxone IM). Jangan over-prescribe antibiotik oral untuk mata merah biasa.',
          required: true,
          category: 'safety'
        },
        {
          id: 'bakt-evaluasi-7-hari',
          title: 'Evaluasi 7 Hari — Respons Terapi?',
          description: 'Pasien kontrol atau bilang kembali ke klinik dalam 7 hari. Membaik (sekret berkurang, mata tidak merah) → lanjut antibiotik sampai selesai 7 hari. Tidak membaik → evaluasi ulang: apakah benar diagnosisnya (bukan viral/alergik), pertimbangkan resistensi, RUJUK SpM.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'bakt-rujuk-neonatus',
          title: 'Neonatus <28 Hari — RUJUK CITO! (Gonococal/Chlamydial)',
          description: 'Ophthalmia neonatorum = darurat mata! Jika bayi <28 hari dengan sekret mata → RUJUK ke SpM + SpA. Bisa disebabkan Neisseria gonorrheae (hiperpirulen, bisa buta dalam 24–48 jam) atau Chlamydia (kronik). Butuh: kultur okular, antibiotik IV/IM, pemeriksaan orang tua.',
          required: true,
          category: 'safety'
        }
      ],
      nextNodeId: 'konj-education-followup'
    },

    // ============================================================
    // NODE 7: VIRAL CONJUNCTIVITIS
    // Ref: AAO PPP 2023 + KMK 1186/2022
    // ============================================================
    'konj-viral-management': {
      id: 'konj-viral-management',
      type: 'checklist',
      title: 'Node 7: Konjungtivitis Viral — Suportif, Isolasi, Self-Limiting',
      description: 'Konjungtivitis viral (adenovirus tersering) adalah SELF-LIMITING — 65–80% sembuh sendiri dalam 1–2 minggu TANPA antibiotik. Terapi utama: suportif + isolasi! Antibiotik tidak efektif untuk virus.',
      items: [
        {
          id: 'viral-suportif',
          title: 'Terapi Suportif — Kompres Dingin + Air Mata Artifisial',
          description: 'Kompres dingin/es pada kelopak mata tertutup 3–4× sehari 10–15 menit (mengurangi edema dan nyeri). Air mata artifisial (artificial tears) yang tidak mengandung preservatif: 4–6× sehari (lubrikasi dan mengeluarkan virus). Salep pelumas malam hari jika ada kekeringan. Kacamata hitam mengurangi photophobia.',
          required: true,
          category: 'action'
        },
        {
          id: 'viral-jangan-antibiotik',
          title: 'JANGAN Antibiotik Topikal — Tidak Efektif untuk Virus!',
          description: 'Antibiotik topikal TIDAK perlu untuk konjungtivitis viral murni. Berikan HANYA jika curiga ada superinfeksi bakteri (sekret menjadi purulen, kelopak semakin lengket, tidak ada perbaikan >5–7 hari). Overuse antibiotik meningkatkan resistensi bakteri.',
          required: true,
          category: 'safety'
        },
        {
          id: 'viral-isolasi-penting',
          title: 'ISOLASI — Sangat Menular! (Terutama Adenovirus/EKC)',
          description: 'Adenovirus = SANGAT MENULAR (EKC bisa menyerang satu kantor/sekolah sekaligus!). Edukasi: Cuci tangan sering dengan sabun. Jangan berbagi handuk/bantal/alat mandi. Hindari kontak fisik (berjabat tangan) dengan mata. Cuti sekolah/kerja 7–14 hari atau hingga sekret hilang. Buang tisu yang telah digunakan segera.',
          required: true,
          category: 'action'
        },
        {
          id: 'viral-antiviral-hsv',
          title: 'Tetes Antiviral (Khusus Suspek Herpes Simplex Virus)',
          description: 'Jika dicurigai HSV: ada riwayat herpes labialis, lesi vesikel di kelopak mata, keratitis dendritik (di kornea). Acyclovir tetes mata 3% 5× sehari ATAU Acyclovir oral 5×400 mg × 7 hari. NAMUN: diagnosis pasti HSV keratitis butuh slit lamp (dendrit fluorescence) → RUJUK SpM terlebih dahulu sebelum mulai antiviral.',
          required: false,
          category: 'medication'
        },
        {
          id: 'viral-rujuk-bila-perlu',
          title: 'Rujuk SpM Jika Tidak Membaik dalam 1 Minggu / Ada Keratitis',
          description: 'Konjungtivitis viral seharusnya mulai membaik dalam 7–10 hari. Jika tidak membaik atau ada fotofobia meningkat/visus turun → curiga keterlibatan kornea (keratitis) → RUJUK SpM. EKC bisa ada corneal subepithelial infiltrates → kelola SpM.',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'konj-education-followup'
    },

    // ============================================================
    // NODE 8: ALLERGIC CONJUNCTIVITIS
    // Ref: AAO PPP 2023 + KMK 1186/2022
    // ============================================================
    'konj-allergic-management': {
      id: 'konj-allergic-management',
      type: 'checklist',
      title: 'Node 8: Konjungtivitis Alergik — Antihistamin & Hindari Alergen',
      description: 'Konjungtivitis alergik = GATAL adalah gejala utama. Tidak menular. Penatalaksanaan: hindari alergen + antihistamin topikal/oral. JANGAN steroid topikal tanpa konfirmasi SpM.',
      items: [
        {
          id: 'alerg-hindari-alergen',
          title: 'Identifikasi & Hindari Alergen — Langkah Pertama Terpenting',
          description: 'Tanya: Gejala setiap musim tertentu (serbuk sari = seasonal), sepanjang tahun (tungau debu/bulu hewan = perennial), setelah pakai lensa kontak atau kosmetik mata (contact lens-related). Strategi: hindari alergen, kompres dingin 10–15 mnt beberapa kali sehari, kacamata hitam di luar ruangan, dokter menyarankan cuci muka dan tangan setelah outdoor.',
          required: true,
          category: 'action'
        },
        {
          id: 'alerg-antihistamin-topikal',
          title: 'Antihistamin Topikal Mata — Lini Pertama',
          description: 'Tetes mata antihistamin H1 (pilihan terbaik untuk konjungtivitis alergik, kerja cepat, efek samping minimal): Ketotifen 0.025% atau 0.05% → 1 tetes 2–4× sehari. Olopatadin 0.1% → 1 tetes 2× sehari (tersedia di Indonesia). Jika tidak tersedia: antihistamin oral saja. Tetes vasokonstriktor murni (tetrahidrozolin) → tidak disarankan, efek sementara, bisa menyebabkan rebound.',
          required: true,
          category: 'medication'
        },
        {
          id: 'alerg-antihistamin-oral',
          title: 'Antihistamin Oral — Tambahan / Jika Bersamaan Rinitis Alergik',
          description: 'Cetirizine 1×10 mg atau Loratadine 1×10 mg (non-sedatif). Feksofenadin 120–180 mg (non-sedatif, pilihan jika harus bekerja/berkendara). Antihistamin oral terutama berguna jika ada gejala rinitis alergik bersamaan (bersin, pilek, hidung tersumbat). Sedatif (klorfeniramin) hindari pada siang hari.',
          required: true,
          category: 'medication'
        },
        {
          id: 'alerg-air-mata-artifisial',
          title: 'Air Mata Artifisial (Artificial Tears) — Bilas dan Lembabkan',
          description: 'Artificial tears (CMC/HPMC tetes mata) → flush alergen dari permukaan mata, lubrikasi. Bisa digunakan sangat sering (tiap 1–2 jam) sesuai kebutuhan. Simpan di kulkas untuk efek cooling yang mengurangi gatal. Lebih nyaman daripada mengucek mata!',
          required: true,
          category: 'medication'
        },
        {
          id: 'alerg-jangan-steroid',
          title: 'Steroid Topikal — Tidak Untuk Klinik Tanpa SpM!',
          description: 'Steroid topikal (Deksametason, Prednisolon tetes mata) HANYA boleh diresepkan oleh atau atas rekomendasi SpMata. Risiko serius tanpa monitoring slit lamp: glaukoma steroid, katarak posterior, aktivasi keratitis herpetik laten. Kasus alergik yang tidak respons antihistamin → RUJUK SpM.',
          required: true,
          category: 'safety'
        },
        {
          id: 'alerg-rujuk-vernal',
          title: 'Rujuk SpM Jika Berat / Giant Papillary / Vernal Keratoconjunctivitis',
          description: 'Rujuk bila: Konjungtivitis alergik berat dengan kemosis massif, atau GPC (Giant Papillary Conjunctivitis = papil raksasa >1 mm) atau VKC (Vernal Keratoconjunctivitis = pada anak-anak, bisa sebabkan kerusakan kornea). Kondisi ini butuh steroid topikal yang harus dipantau SpM.',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'konj-education-followup'
    },

    // ============================================================
    // NODE 9: CHLAMYDIAL CONJUNCTIVITIS
    // ============================================================
    'konj-chlamydial-management': {
      id: 'konj-chlamydial-management',
      type: 'checklist',
      title: 'Node 9: Konjungtivitis Klamidia — Antibiotik Sistemik + Skrining STI',
      description: 'Konjungtivitis klamidia membutuhkan antibiotik SISTEMIK (bukan hanya topikal). Sering berkaitan dengan infeksi saluran kemih/genital pada pasangan. Skrining STI diperlukan.',
      items: [
        {
          id: 'klam-antibiotik-sistemik',
          title: 'Antibiotik Sistemik — Wajib! Topikal Saja Tidak Cukup!',
          description: 'PILIHAN UTAMA: Azitromisin 1 g oral dosis tunggal (paling efektif, kepatuhan tinggi). Alternatif: Doksisiklin 2×100 mg selama 7–14 hari (hindari kehamilan & anak <8 tahun). Atau Eritromisin 4×500 mg × 14 hari (untuk ibu hamil dan anak). Topikal antibiotik (tetrasiklin/eritromisin salep) hanya sebagai TAMBAHAN, bukan pengganti sistemik.',
          required: true,
          category: 'medication'
        },
        {
          id: 'klam-skrining-sti',
          title: 'Skrining STI Pasien + Pasangan — Wajib!',
          description: 'Periksa: urin/swab uretra/serviks untuk kultur/PCR Chlamydia trachomatis dan Neisseria gonorrhoeae. Pasangan seksual HARUS diperiksa dan diobati bersamaan (jika tidak, akan reinfeksi). Edukasi penggunaan kondom. Konfidensialitas dijaga. Jika tidak bisa skrining di klinik → rujuk ke poli PMS atau SpKulit-Kelamin.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'klam-rujuk-spk',
          title: 'Rujuk SpMata + SpKulit-Kelamin (PMS)',
          description: 'Konjungtivitis klamidia butuh konfirmasi diagnosis (ideally kultur/PCR) dan pengawasan terapi. Rujuk: SpMata untuk pemantauan mata (trachoma? pannus kornea?), SpKulit-Kelamin atau Puskesmas PMS untuk penanganan infeksi genital dan contact tracing.',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'konj-education-followup'
    },

    // ============================================================
    // NODE 10: EDUKASI & FOLLOW-UP
    // ============================================================
    'konj-education-followup': {
      id: 'konj-education-followup',
      type: 'checklist',
      title: 'Node 10: Edukasi Pasien & Tanda Bahaya untuk Kembali',
      description: 'Edukasi yang baik membantu pasien memonitor kondisinya sendiri dan mencegah penyebaran, terutama pada konjungtivitis viral yang sangat menular.',
      items: [
        {
          id: 'edu-higienitas-tangan',
          title: 'Higienitas Tangan — Mencegah Penyebaran',
          description: 'Cuci tangan 20 detik dengan sabun sebelum dan setelah menyentuh mata. Jangan berbagi handuk wajah, bantal, atau alat makeup. Jangan menyentuh mata lalu menyentuh benda lain. Pada konjungtivitis viral: tidak ke sekolah/kerja hingga sekret hilang.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'edu-cara-tetes-mata',
          title: 'Cara Meneteskan Obat Mata yang Benar',
          description: 'Kepala menengadah atau berbaring. Cuci tangan dulu. Tarik kelopak bawah ke bawah → teteskan obat di kantung konjungtiva bawah (BUKAN langsung ke bola mata/kornea). Tutup mata 1–2 menit, tekan sudut dalam mata (punctum lakrimalis) untuk mencegah absorbsi sistemik. Jika >1 jenis tetes: tunggu 5 menit antar tetes. Jangan sentuh ujung botol ke mata.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'edu-larangan',
          title: 'Yang Harus Dihindari Selama Pengobatan',
          description: 'JANGAN: mengucek mata (memperparah peradangan dan menyebarkan infeksi), memakai lensa kontak hingga mata sembuh total (lensa kontak bisa menjadi tempat infeksi), memakai makeup mata, berenang, berbagi obat tetes dengan orang lain.',
          required: true,
          category: 'action'
        },
        {
          id: 'edu-tanda-darurat',
          title: 'Kembali ke Klinik / IGD Segera Jika:',
          description: 'Penglihatan menurun atau buram mendadak. Nyeri mata BERAT (bukan hanya gatal/berpasir). Mata tidak bisa melihat cahaya (fotofobia ekstrem). Pupil terlihat tidak simetris atau berbentuk tidak bulat. Kornea terlihat keruh/berwarna putih. Tidak ada perbaikan sama sekali dalam 7 hari. Mata makin merah dan nyeri setelah mulai obat.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'edu-jadwal-kontrol',
          title: 'Jadwal Kontrol',
          description: 'Konjungtivitis bakterial: kontrol 7 hari. Viral: kontrol 10–14 hari atau jika memburuk. Alergik: kontrol 2 minggu atau sesuai respons. Klamidia: kontrol 3–4 minggu pasca terapi, termasuk test-of-cure jika tersedia. Bila ada pasangan/kontak serumah bergejala → bawa berobat bersamaan.',
          required: true,
          category: 'documentation'
        }
      ]
    }

  },
  references: [
    'KMK No. HK.01.07/MENKES/1186/2022 – Panduan Praktik Klinis bagi Dokter di Fasilitas Pelayanan Kesehatan Tingkat Pertama. Kemenkes RI. Bab: Konjungtivitis.',
    'AAO Preferred Practice Pattern (PPP): Conjunctivitis. American Academy of Ophthalmology. 2018 (Updated 2023). Available at: aao.org/ppp.',
    'Azari AA, Barney NP. Conjunctivitis: A Systematic Review of Diagnosis and Treatment. JAMA. 2013;310(16):1721–1730. DOI: 10.1001/jama.2013.280318.',
    'Shekhawat NS, et al. Incidence and Rate of Treatment of Conjunctivitis in Emergency Departments. JAMA Ophthalmol. 2017;135(10):1117–1124.',
    'Jefferis JM, et al. Acute infective conjunctivitis in primary care: Who needs antibiotic treatment? BMJ. 2011;342:d3421.',
    'WHO Primary Eye Care. International Centre for Eye Health (ICEH), London School of Hygiene & Tropical Medicine. Community Eye Health guidelines for Red Eye.',
    'Kemenkes RI. Pedoman Nasional Pelayanan Kedokteran (PNPK) Tata Laksana Penyakit Mata Segmen Anterior – Konjungtivitis dan Chemical Eye Injury.'
  ]
};
