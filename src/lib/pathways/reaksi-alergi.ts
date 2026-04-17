import { DynamicPathway } from '../dynamicPathways';

export const reaksiAlergiPathway: DynamicPathway = {
  diseaseId: 'reaksi-alergi',
  diseaseName: 'Reaksi Alergi Akut & Urtikaria',
  startNodeId: 'alergi-initial-assessment',
  nodes: {

    // ============================================================
    // NODE 1: INITIAL ASSESSMENT — ANAMNESIS & TTV
    // ============================================================
    'alergi-initial-assessment': {
      id: 'alergi-initial-assessment',
      type: 'checklist',
      title: 'Node 1: Initial Assessment — Anamnesis & TTV Segera',
      description: 'PRIORITAS UTAMA: Singkirkan Anafilaksis dalam 60 detik pertama. Anafilaksis = Ancaman Nyawa Langsung yang Bisa Membunuh dalam Menit.',
      items: [
        {
          id: 'alergi-anamnesis-onset',
          title: 'Anamnesis Cepat: Onset & Pencetus',
          description: 'Kapan mulai? Muncul mendadak setelah apa? (Makanan, Obat, Sengatan, Kontak kulit). Ini episode pertama atau berulang? Ada riwayat alergi berat sebelumnya?',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'alergi-ttv-cepat',
          title: 'VITAL SIGNS CEPAT — Prioritas Tensi & Nadi!',
          description: 'Tekanan darah, Nadi, SpO2, Suhu, RR. \nTanda ANAFILAKSIS: TD Sistolik <90 mmHg (atau drop >30%) ATAU Nadi >120 cepat & lemah. SpO2 <92%. Ini GAWAT DARURAT!',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'alergi-inspeksi-kulit',
          title: 'Inspeksi Kulit & Selaput Lendir',
          description: 'Adakah: Urtikaria (bentol-bentol merah gatal)? Angioedema (bengkak bibir, lidah, kelopak mata, wajah, leher)? Kemerahan difus (flushing)? Lesi bernanah/melepuh? Distribusinya lokal atau seluruh tubuh?',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'alergi-gejala-sistemik',
          title: 'Cek Gejala Sistem Lain (Selain Kulit)',
          description: 'Sistem Napas: Sesak, mengi (wheezing), serak/stridor, nyeri menelan (angioedema laring)? \nSistem Cerna: Mual, muntah, kram perut, diare? \nSistem Saraf: Pusing, rasa mau pingsan/pingsan?',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'alergi-red-flag-anaphylaxis',
          title: 'SKRINING ANAFILAKSIS (World Allergy Organization Criteria)',
          description: 'Diagnosis KLINIS Anafilaksis jika ≥1 dari kriteria ini: \n1) Gejala kulit/mukosa (urtikaria, angioedema) PLUS gangguan napas ATAU TD drop/sinkop.\n2) ≥2 organ terkena cepat setelah paparan alergen.\n3) TD drop terisolasi setelah paparan alergen yang diketahui (terutama obat/sengatan).',
          required: true,
          category: 'safety',
          role: 'nurse',
        }
      ],
      nextNodeId: 'alergi-triage-decision'
    },

    // ============================================================
    // NODE 2: TRIAGE DECISION — ANAFILAKSIS VS LOKAL
    // ============================================================
    'alergi-triage-decision': {
      id: 'alergi-triage-decision',
      type: 'decision',
      title: 'Node 2: Triage Keparahan — Anafilaksis atau Alergi Lokal?',
      description: 'Tentukan jalur berdasarkan keterlibatan sistem dan hemodinamik.',
      warningLevel: 'critical',
      branches: [
        {
          id: 'alergi-anaphylaxis',
          title: 'ANAFILAKSIS (Multi-sistem / Hemodinamik Tidak Stabil)',
          description: 'Gangguan napas (sesak/stridor/wheezing berat) ATAU TD drop/sinkop ATAU angioedema lidah/laring. Ini mengancam jiwa → Epinefrin SEKARANG!',
          color: 'red',
          nextNodeId: 'alergi-anaphylaxis-management',
          riskLevel: 'high'
        },
        {
          id: 'alergi-angioedema-saja',
          title: 'ANGIOEDEMA TANPA SHOCK (Bengkak Wajah/Bibir, Stabil)',
          description: 'Bengkak wajah/bibir/kelopak mata tanpa gangguan napas, TD stabil, tidak sesak. Perlu dipantau ketat karena bisa progresi ke angioedema laring.',
          color: 'orange',
          nextNodeId: 'alergi-angioedema-management',
          riskLevel: 'medium'
        },
        {
          id: 'alergi-urtikaria-lokal',
          title: 'URTIKARIA / REAKSI LOKAL (Gejala Kulit Saja, Stabil)',
          description: 'Hanya bentol-bentol gatal (urtikaria), kemerahan lokal, atau dermatitis. TTV normal. Tidak ada gangguan napas, cerna, atau sirkulasi.',
          color: 'green',
          nextNodeId: 'alergi-urticaria-management',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 3A: ANAFILAKSIS — MANAJEMEN DARURAT
    // ============================================================
    'alergi-anaphylaxis-management': {
      id: 'alergi-anaphylaxis-management',
      type: 'checklist',
      title: 'Node 3A: ANAFILAKSIS — Emergency Protocol (Menit Pertama Menentukan!)',
      description: 'EPINEFRIN adalah terapi utama. Jangan tunda untuk antihistamin dulu! Antihistamin TIDAK mengobati anafilaksis, hanya Epinefrin yang bisa.',
      items: [
        {
          id: 'ana-epinefrin',
          title: '1. EPINEFRIN (ADRENALIN) — INJEKSI SEGERA! (Lini Pertama)',
          description: 'Epinefrin 1:1000 (1 mg/mL), Dosis: 0.3-0.5 mg (dewasa) / 0.01 mg/kgBB (anak, max 0.5 mg). \nROUTE: Injeksi IM ke PAHA LUAR (vastus lateralis) — BUKAN subkutan, BUKAN lengan. \nBisa diulang setiap 5-15 menit jika tidak respons. Catat waktu injeksi!',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'ana-posisi',
          title: '2. Posisi Pasien',
          description: 'JIKA TD drop/sinkop: Baringkan, angkat kedua kaki (posisi Trendelenburg). \nJIKA sesak berat: Duduk tegak / setengah duduk agar nyaman bernapas. \nJANGAN biarkan pasien berdiri tiba-tiba (risiko sudden cardiac arrest).',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'ana-oksigen',
          title: '3. Oksigen High-Flow',
          description: 'Berikan O2 via sungkup muka simple mask 8-10 L/menit atau sungkup NRM (Non-Rebreathing Mask) jika tersedia. Target SpO2 >94%.',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'ana-iv-line',
          title: '4. Akses IV & Cairan Resusitasi',
          description: 'Pasang IV line perifer, berikan bolus RL/NaCl 0.9% 500-1000 mL cepat (IV push) jika ada tanda syok/hipotensi. Pantau TD setiap 5 menit.',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'ana-nebul-wheezing',
          title: '5. Nebulisasi Salbutamol (JIKA Ada Bronkospasme/Wheezing)',
          description: 'TERAPI TAMBAHAN (bukan pengganti Epinefrin). Jika masih ada wheezing setelah Epinefrin, tambahkan Salbutamol nebul 2.5 mg. Ini membantu bronkospasme yang persisten.',
          required: false,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'ana-kortikosteroid',
          title: '6. Kortikosteroid IV (Cegah Reaksi Bifasik)',
          description: 'Dexamethasone 5-10 mg IV ATAU Metilprednisolon 1-2 mg/kgBB IV. Tidak cepat bekerja (efek 4-6 jam kemudian), tetapi penting cegah reaksi anafilaksis fase kedua yang bisa memburuk 4-12 jam kemudian.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'ana-antihistamin',
          title: '7. Antihistamin IV (Terapi ADJUVANT - Bukan Utama!)',
          description: 'Difenhidramin (CTM) 10-20 mg IV / Chlorphenamine ATAU Dimenhidrinat IV. INGAT: antihistamin hanya untuk gejala kulit (gatal, urtikaria), BUKAN untuk mengatasi anafilaksis.',
          required: false,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'ana-ekg',
          title: '8. Pasang EKG Monitor (Jika Tersedia)',
          description: 'EKG untuk mendeteksi aritmia (takikardia, SVT, ataupun perubahan ST yang mungkin terjadi pada anafilaksis berat pada pasien dengan faktor risiko jantung). Monitor nadi terus-menerus.',
          required: false,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'ana-rujuk',
          title: '9. RUJUK IGD RS SEGERA (Setelah Stabilisasi Awal)',
          description: 'Semua anafilaksis HARUS dirujuk ke IGD RS untuk observasi minimal 6-24 jam (risiko reaksi bifasik). Pastikan pasien stabil sebelum dipindahkan. Dampingi selama transfer.',
          required: true,
          category: 'safety',
          role: 'doctor',
        }
      ]
    },

    // ============================================================
    // NODE 3B: ANGIOEDEMA TANPA SHOCK
    // ============================================================
    'alergi-angioedema-management': {
      id: 'alergi-angioedema-management',
      type: 'checklist',
      title: 'Node 3B: Angioedema Tanpa Shock — Pantau & Terapi Agresif',
      description: 'Angioedema wajah/bibir bisa progresi ke angioedema laring dalam menit-jam. Pantau ketat tanda obstruksi napas (stridor, suara serak, kesulitan menelan).',
      items: [
        {
          id: 'angioedema-pantau-napas',
          title: 'Pantau Tanda Obstruksi Napas Setiap 10-15 Menit!',
          description: 'DARURAT JIKA muncul: Suara serak baru (disfonia), Stridor (napas berbunyi kasar dari leher), Kesulitan menelan (disfagia), atau bengkak semakin progresif ke area leher. → Segera injeksi Epinefrin & Rujuk!',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'angioedema-kortikosteroid',
          title: 'Kortikosteroid Sistemik (Oral atau Injeksi)',
          description: 'Dexamethasone 0.15-0.6 mg/kgBB oral/IM ATAU Prednisone 0.5-1 mg/kgBB oral. Untuk menekan respons inflamasi dan mengurangi bengkak.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'angioedema-antihistamin',
          title: 'Antihistamin Oral/IM',
          description: 'Cetirizine 10 mg oral ATAU Loratadine 10 mg oral. Untuk mengurangi gatal dan reaksi histamin. Pada anak: sesuaikan dosis per kgBB.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'angioedema-siapkan-epi',
          title: 'Siapkan Epinefrin Siap Suntik (Jika Progresif)',
          description: 'Persiapkan spuit Epinefrin 0.3-0.5 mg siap pakai di dekat pasien. JIKA angioedema bertambah ke area laring/leher atau muncul sesak → injeksi segera tanpa menunggu konfirmasi lebih lanjut.',
          required: true,
          category: 'safety',
          role: 'both',
        },
        {
          id: 'angioedema-rujuk-pantau',
          title: 'Rujuk ke RS untuk Observasi',
          description: 'Angioedema yang alergi (bukan herediter) dengan area wajah/bibir: observasi minimal 4-6 jam di faskes atau rujuk RS. Angioedema yang tidak jelas penyebabnya → rujuk untuk evaluasi C1-inhibitor (Hereditary Angioedema).',
          required: true,
          category: 'documentation',
          role: 'doctor',
        }
      ]
    },

    // ============================================================
    // NODE 3C: URTIKARIA / REAKSI LOKAL
    // ============================================================
    'alergi-urticaria-management': {
      id: 'alergi-urticaria-management',
      type: 'checklist',
      title: 'Node 3C: Urtikaria & Reaksi Lokal — Tatalaksana Rawat Jalan',
      description: 'Urtikaria akut (< 6 minggu) mayoritas bisa diobati simptomatik. Identifikasi pencetus adalah kunci cegah berulang.',
      items: [
        {
          id: 'urt-antihistamin-generasi2',
          title: 'Antihistamin Non-Sedatif (Lini Pertama)',
          description: 'Cetirizine 10 mg 1x sehari ATAU Loratadine 10 mg 1x sehari ATAU Fexofenadine 120-180 mg 1x sehari. Minum rutin selama 5-7 hari, bukan hanya saat gatal. \nEFEK: 1-2 jam. Aman pada kelelahan & mengemudi.',
          required: true,
          category: 'medication',
          role: 'nurse',
        },
        {
          id: 'urt-kortikosteroid-oral',
          title: 'Kortikosteroid Oral Singkat (Jika Urtikaria Berat/Luas)',
          description: 'Prednisone / Methylprednisolone 0.5 mg/kgBB/hari (max 40 mg/hari) selama 3-5 hari (tapering singkat). JANGAN pakai jangka panjang untuk urtikaria kronik.',
          required: false,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'urt-salep-kulit',
          title: 'Topikal (Jika Lesi Lokal Terbatas)',
          description: 'Krim Calamine lotion atau Hidrokortison 1% (OTC) untuk area gatal yang terbatas. JANGAN pakai kortikosteroid topikal di wajah jangka panjang.',
          required: false,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'urt-identifikasi-pencetus',
          title: 'Identifikasi & Eliminasi Pencetus (KUNCI!)',
          description: 'Tanyakan & catat: \n• MAKANAN: Seafood, kacang, telur, susu, buah-buahan (strawberry, kiwi)?\n• OBAT: Aspirin, NSAID, antibiotik penisilin/sulfa?\n• FISIK: Dingin, tekanan, panas, olahraga?\n• LINGKUNGAN: Debu, bulu binatang, latex, parfum?\n• Infeksi: Viral (common cold sebelumnya)?',
          required: true,
          category: 'documentation',
          role: 'both',
        },
        {
          id: 'urt-edukasi-hindari',
          title: 'Edukasi Pasien: Yang Harus Dihindari Selama Gejala',
          description: 'Hindari air panas (mandi air panas/sauna memperburuk urtikaria). \nHindari pakaian ketat/menggesek. \nHindari alkohol. \nHindari aspirin/NSAID (bisa memperburuk urtikaria histamin). \nHindari pencetus yang teridentifikasi.',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'urt-kapan-kembali',
          title: 'Return Precautions — Kapan Harus Kembali Segera',
          description: 'Edukasi pasien: Langsung ke IGD atau hubungi klinik jika muncul: \n• Sesak napas mendadak \n• Bengkak bibir/lidah/leher \n• Pingsan atau hampir pingsan \n• Gejala bertambah berat meski sudah minum obat',
          required: true,
          category: 'safety',
          role: 'nurse',
        }
      ],
      nextNodeId: 'alergi-followup'
    },

    // ============================================================
    // NODE 4: FOLLOW-UP & EDUKASI JANGKA PANJANG
    // ============================================================
    'alergi-followup': {
      id: 'alergi-followup',
      type: 'checklist',
      title: 'Node 4: Follow-Up & Edukasi Jangka Panjang (Cegah Berulang)',
      description: 'Alergi yang tidak diidentifikasi pencetusnya akan terus berulang. Tujuan visit ini adalah strategi pencegahan dan desensitisasi jika perlu.',
      items: [
        {
          id: 'fl-kontrol-7hari',
          title: 'Kontrol dalam 5-7 Hari',
          description: 'Evaluasi respons terapi. Apakah bentol/bengkak membaik? Adakah pencetus yang teridentifikasi selama seminggu ini? Lanjutkan atau hentikan antihistamin?',
          required: true,
          category: 'documentation',
          role: 'doctor',
        },
        {
          id: 'fl-skin-prick-test',
          title: 'Pertimbangkan Rujuk Alergi-Imunologi (Jika Kronik/Berulang)',
          description: 'Jika alergi berulang/kronik (> 6 minggu = urtikaria kronik) atau penyebab tidak jelas, rujuk ke Spesialis Alergi-Imunologi untuk: Skin Prick Test, IgE spesifik, atau Uji Provocasi.',
          required: false,
          category: 'documentation',
          role: 'doctor',
        },
        {
          id: 'fl-epipen-prescription',
          title: 'Pertimbangkan Epinefrin Auto-Injector (EpiPen) untuk Pasien Risiko Tinggi',
          description: 'Berikan resep Epinefrin auto-injector (jika tersedia) untuk pasien dengan: Riwayat anafilaksis sebelumnya, Alergi makanan berat (kacang, seafood), atau Asma berat + alergi. Ajari pasien cara penggunaan.',
          required: false,
          category: 'safety',
          role: 'doctor',
        },
        {
          id: 'fl-edukasi-kartu-alergi',
          title: 'Buatkan "Kartu Alergi" Pasien',
          description: 'Dokumentasikan di rekam medis dan anjurkan pasien menyimpan catatan: Alergen yang sudah terkonfirmasi, Riwayat reaksi terparah, Obat yang sudah terbukti aman untuk pasien ini. Berguna saat pasien berobat ke tempat lain.',
          required: true,
          category: 'documentation',
          role: 'nurse',
        }
      ]
    }

  },
  references: [
    'KMK No. HK.01.07/MENKES/1186/2022 – PPK Dokter di FKTP: Urtikaria, Angioedema, Reaksi Anafilaktik.',
    'PNPK Tatalaksana Anafilaksis – Kemenkes RI (Permenkes No. 52 Tahun 2016).',
    'Simons FE, et al. World Allergy Organization Guidelines for the Assessment and Management of Anaphylaxis. WAO Journal. 2011.',
    'Zuberbier T, et al. The EAACI/GA²LEN/EDF/WAO Guideline for the Definition, Classification, Diagnosis and Management of Urticaria (2018 Revision). Allergy. 2018.',
    'Shaker MS, et al. Anaphylaxis – A 2023 practice parameter update. Ann Allergy Asthma Immunol. 2023.'
  ]
};
