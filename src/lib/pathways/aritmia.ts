import { DynamicPathway } from '../dynamicPathways';

// ============================================================
// PANDUAN TATALAKSANA ARITMIA KOMPREHENSIF
// Referensi:
// - Pedoman Tata Laksana Fibrilasi Atrium - PERKI/InaHRS 2019
// - Pedoman Tatalaksana Takiaritmia Supraventrikular (TaSuV) - InaHRS
// - AHA ACLS Guidelines 2020 (diadaptasi dalam praktik kardiologi Indonesia)
// - KMK No. HK.01.07/MENKES/1186/2022 (PPK FKTP) - Aritmia & Kegawatan Jantung
// ============================================================

export const aritmiPathway: DynamicPathway = {
  diseaseId: 'arrhythmias',
  diseaseName: 'Tatalaksana Aritmia Komprehensif (SVT, AF, VT, Bradikardi)',
  startNodeId: 'aritmia-initial',
  nodes: {

    // ============================================================
    // NODE 1: RAPID INITIAL ASSESSMENT (60 DETIK!)
    // ============================================================
    'aritmia-initial': {
      id: 'aritmia-initial',
      type: 'checklist',
      title: 'Node 1: Rapid Assessment — Cek Nadi & EKG dalam 60 Detik!',
      description: 'PRIORITAS: Pastikan pasien MASIH ADA NADI sebelum apapun. Jika tidak ada nadi → Langsung ke protokol CPR. Jangan buang waktu mencari EKG dulu.',
      items: [
        {
          id: 'ar-cek-nadi-kesadaran',
          title: 'CEK NADI + KESADARAN (< 10 DETIK)',
          description: 'Panggil nama pasien, tepuk bahu. Raba nadi karotis atau radialis. \n✅ ADA NADI + SADAR → Lanjut assessment.\n🚨 TIDAK ADA NADI / TIDAK SADAR → MULAI CPR SEKARANG, panggil bantuan, RUJUK CITO!',
          required: true,
          category: 'safety'
        },
        {
          id: 'ar-ttv-cepat',
          title: 'VITAL SIGNS CEPAT (Bersamaan dengan EKG)',
          description: 'Tekanan darah (sistolik < 90 = INSTABIL!), Nadi (cepat/lambat/tidak teratur?), SpO2 (< 94% = pasang O2), RR, Suhu. \nHiti nadi selama 60 detik penuh untuk irama ireguler (AF).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ar-ekg-stat',
          title: 'EKG 12-Lead STAT (Rekam < 5 Menit dari Datang!)',
          description: 'Sambil pasang EKG, tanyakan: keluhan apa (palpitasi, pingsan, sesak, nyeri dada, lemas)? Sudah berapa lama? Riwayat aritmia sebelumnya? Riwayat jantung, DM, hipertensi? Sedang minum obat apa?\nPasang monitor EKG lead II atau sadapan lengkap 12 lead jika memungkinkan.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ar-gejala-serius',
          title: 'Cek Tanda Hemodinamik TIDAK STABIL',
          description: 'Tandai jika ada SALAH SATU: \n🔴 TD Sistolik < 90 mmHg (atau turun mendadak > 30 mmHg dari baseline)\n🔴 Penurunan kesadaran / sinkop / pre-sinkop\n🔴 Nyeri dada akut (iskemik) yang muncul bersamaan\n🔴 Edema paru akut / sesak napas berat\nJika ada → PASIEN TIDAK STABIL → Jalur merah!',
          required: true,
          category: 'safety'
        }
      ],
      nextNodeId: 'aritmia-arrest-check'
    },

    // ============================================================
    // NODE 2: ARREST / HEMODINAMIK CHECK
    // ============================================================
    'aritmia-arrest-check': {
      id: 'aritmia-arrest-check',
      type: 'decision',
      title: 'Node 2: Status Hemodinamik — Arrest, Instabil, atau Stabil?',
      description: 'Tiga jalur penanganan berdasarkan status klinis pasien.',
      warningLevel: 'critical',
      branches: [
        {
          id: 'ar-cardiac-arrest',
          title: '🔴 CARDIAC ARREST (Tidak Ada Nadi)',
          description: 'Tidak responsif, tidak bernapas/gasping, tidak teraba nadi karotis > 10 detik. Termasuk VF/pVT (Pulseless Ventricular Tachycardia).',
          color: 'red',
          nextNodeId: 'aritmia-cpr-protocol',
          riskLevel: 'high'
        },
        {
          id: 'ar-unstable-with-pulse',
          title: '🟠 ADA NADI TAPI TIDAK STABIL',
          description: 'Ada nadi, TAPI: TD sistolik < 90, kesadaran menurun, nyeri dada iskemik, edema paru. Aritmia yang menyebabkan gangguan hemodinamik akut.',
          color: 'orange',
          nextNodeId: 'aritmia-unstable-management',
          riskLevel: 'high'
        },
        {
          id: 'ar-stable',
          title: '🟢 STABIL (Ada Nadi, Hemodinamik Aman)',
          description: 'Ada nadi, TD > 90, sadar dan waspada, tidak ada nyeri dada berat, tidak ada edema paru. Dapat duduk/berbicara normal.',
          color: 'green',
          nextNodeId: 'aritmia-ekg-classification',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 3A: CARDIAC ARREST → CPR
    // ============================================================
    'aritmia-cpr-protocol': {
      id: 'aritmia-cpr-protocol',
      type: 'checklist',
      title: 'Node 3A: CARDIAC ARREST — CPR Berkualitas Tinggi & Rujuk CITO!',
      description: '⚠️ KLINIK TANPA DEFIBRILLATOR: Lakukan CPR berkualitas tinggi sambil SEGERA RUJUK ke RS dengan kemampuan defibrilasi dan CATH LAB. Setiap menit tanpa CPR = 10% penurunan survival.',
      items: [
        {
          id: 'cpr-mulai',
          title: '1. MULAI CPR SEGERA — 30:2 (30 kompresi : 2 napas)',
          description: 'Posisi: keempat jari di atas prosesus xiphoideus. Tekan keras (5-6 cm) dan cepat (100-120x/menit). Biarkan dada mengembang penuh (full recoil). JANGAN ADA INTERUPSI > 10 detik. Ganti penolong tiap 2 menit untuk hindari kelelahan.',
          required: true,
          category: 'action'
        },
        {
          id: 'cpr-airway',
          title: '2. Airway — Buka & Bebaskan Jalan Napas',
          description: 'Head-tilt chin-lift. Jika curiga trauma servikal: jaw thrust. Keluarkan benda asing jika terlihat. Pasang OROPHARYNGEAL AIRWAY (OPA) jika tersedia.',
          required: true,
          category: 'action'
        },
        {
          id: 'cpr-suction-if-needed',
          title: '3. SUCTION Jika Ada Muntah/Sekret (Cegah Aspirasi)',
          description: 'Gunakan mesin suction klinik jika ada muntahan atau sekret berlebih di orofaring SEBELUM memberikan ventilasi. Suction maksimal 10 detik, tidak boleh menghentikan CPR lebih dari itu.',
          required: false,
          category: 'action'
        },
        {
          id: 'cpr-oksigen',
          title: '4. Oksigen High-Flow',
          description: 'Pasang O2 via BVM (Bag-Valve-Mask) 10-15 L/menit jika tersedia. Satu napas diberikan selama 1 detik. Jika tidak ada BVM, berikan mouth-to-mouth atau mouth-to-mask rescue breathing.',
          required: true,
          category: 'action'
        },
        {
          id: 'cpr-iv-epinefrin',
          title: '5. Akses IV + Epinefrin 1 mg IV/IO setiap 3-5 Menit',
          description: 'Epinefrin 1 mg (1 mL dari larutan 1:1000) IV bolus, diikuti flush 20mL NaCl 0.9%. Ulangi setiap 3-5 menit selama CPR. JANGAN hentikan kompresi untuk pasang IV.',
          required: true,
          category: 'medication'
        },
        {
          id: 'cpr-cek-ritme',
          title: '6. Cek Ritme di EKG setiap 2 Menit (Saat Ganti Penolong)',
          description: 'Pasang lead EKG selama CPR. Setiap 2 menit hentikan kompresi < 10 detik untuk cek ritme: \n• VF / pVT (Shockable): → BUTUH DEFIBRILASI → di klinik tanpa AED: LANJUT CPR + RUJUK CITO!\n• Asistol / PEA (Non-shockable): → CPR + Epinefrin + Cari penyebab reversible (5H5T).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'cpr-5h5t',
          title: '7. Cari & Koreksi Penyebab Reversible (5H 5T)',
          description: '5H: Hypovolemia, Hypoxia, Hydrogen ion (Asidosis), Hypo/Hyperkalemia, Hypothermia.\n5T: Tension pneumothorax, Tamponade jantung, Toxin (keracunan), Thrombosis koroner (STEMI), Thrombosis paru (PE).\nTangani penyebab yang bisa dikoreksi di klinik sambil CPR.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'cpr-rujuk-cito',
          title: '8. RUJUK CITO ke IGD RS dengan Kemampuan Defibrilasi & Resusitasi',
          description: 'SAMBIL TERUS CPR di ambulan (jangan hentikan saat transportasi). Hubungi RS tujuan terlebih dahulu. Sertakan surat rujukan dengan: waktu arrest, ritme EKG, tindakan yang sudah dilakukan, dan obat yang sudah diberikan.',
          required: true,
          category: 'safety'
        }
      ]
    },

    // ============================================================
    // NODE 3B: UNSTABLE WITH PULSE → STABILISASI + RUJUK
    // ============================================================
    'aritmia-unstable-management': {
      id: 'aritmia-unstable-management',
      type: 'checklist',
      title: 'Node 3B: ADA NADI TAPI INSTABIL — Stabilisasi Darurat & Rujuk',
      description: 'Pasien membutuhkan SYNCHRONIZED CARDIOVERSION (kejut listrik terkontrol). Klinik tanpa cardioverter: stabilisasi semaksimal mungkin lalu RUJUK SEGERA.',
      items: [
        {
          id: 'unstable-o2',
          title: '1. Oksigen High-Flow Segera',
          description: 'NRM (Non-Rebreathing Mask) 10-15 L/menit atau nasal kanul 4-6 L/menit. Target SpO2 > 94%. Pasang monitor EKG terus-menerus.',
          required: true,
          category: 'action'
        },
        {
          id: 'unstable-iv',
          title: '2. IV Line + Cairan Jika TD Rendah',
          description: 'Pasang IV line 2 jalur jika memungkinkan. Jika TD < 90 dan tanda syok: bolus RL/NaCl 0.9% 250-500 mL. HATI-HATI pada pasien edema paru (jangan overload cairan).',
          required: true,
          category: 'action'
        },
        {
          id: 'unstable-ekg-rekam',
          title: '3. Rekam EKG & Identifikasi Ritme',
          description: 'Rekam EKG 12-lead. Apakah ritme: Tachyarrhythmia sempit (SVT/AF cepat)? Tachyarrhythmia lebar (VT)? Atau bradiaritmia ekstrem?\nCatat dan simpan strip EKG untuk dokter RS.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'unstable-amiodarone-vt',
          title: '4. Amiodarone IV JIKA Dugaan VT + Masih Ada Nadi',
          description: 'HANYA jika ritme WIDE COMPLEX (QRS > 120ms) + ada nadi:\nAmiodarone 150 mg IV dalam 10 menit → dilanjutkan 1 mg/menit per jam. \nJANGAN berikan jika ritme sempit (SVT/AF) atau tidak tahu jenis aritmia.',
          required: false,
          category: 'medication'
        },
        {
          id: 'unstable-rujuk',
          title: '5. RUJUK CITO — Pasien Butuh Cardioversi di RS',
          description: 'Aritmia instabil dengan nadi = indikasi SYNCHRONIZED CARDIOVERSION. Tidak bisa dilakukan di klinik tanpa peralatan cardioverter. Sambil pasien ditransportasikan: tetap monitor EKG, O2 tetap jalan, pantau TD tiap 5 menit.',
          required: true,
          category: 'safety'
        }
      ]
    },

    // ============================================================
    // NODE 4: EKG CLASSIFICATION — STABLE
    // ============================================================
    'aritmia-ekg-classification': {
      id: 'aritmia-ekg-classification',
      type: 'decision',
      title: 'Node 4: Klasifikasi EKG — Jenis Aritmia Apa? (Pasien STABIL)',
      description: 'Lihat EKG: HR? Irama reguler/ireguler? Lebar QRS (sempit < 120ms atau lebar > 120ms)? Ada gelombang P?',
      warningLevel: 'warning',
      branches: [
        {
          id: 'ar-narrow-tachycardia',
          title: 'TAKIKARDIA SEMPIT (QRS < 120ms, HR > 100)',
          description: 'QRS sempit + cepat. Bisa: SVT regular (AVNRT/AVRT), AF ireguler, AFL regular. Ritme berasal dari atrium / AV node (supraventrikular).',
          color: 'orange',
          nextNodeId: 'aritmia-svt-af-branch',
          riskLevel: 'medium'
        },
        {
          id: 'ar-wide-tachycardia',
          title: 'TAKIKARDIA LEBAR (QRS > 120ms, HR > 100)',
          description: 'QRS lebar + cepat. Anggap VT (Ventricular Tachycardia) sampai terbukti sebaliknya. Bisa juga SVT dengan aberan konduksi. Lebih berbahaya.',
          color: 'red',
          nextNodeId: 'aritmia-vt-management',
          riskLevel: 'high'
        },
        {
          id: 'ar-bradyarrhythmia',
          title: 'BRADIARITMIA (HR < 60, atau Bergejala)',
          description: 'Nadi lambat (< 60/menit) + bergejala (pusing, presinkop, sinkop, Lemas, sesak). Bisa: Blok AV derajat II/III, Sinus bradikardia berat, Sick Sinus Syndrome.',
          color: 'blue',
          nextNodeId: 'aritmia-bradycardia-management',
          riskLevel: 'medium'
        }
      ]
    },

    // ============================================================
    // NODE 5A: NARROW COMPLEX TACHYCARDIA — SVT vs AF
    // ============================================================
    'aritmia-svt-af-branch': {
      id: 'aritmia-svt-af-branch',
      type: 'decision',
      title: 'Node 5A: Takikardia Sempit — SVT Reguler atau AF/AFL Ireguler?',
      description: 'Lihat irama di EKG: apakah interval R-R reguler atau ireguler?',
      warningLevel: 'warning',
      branches: [
        {
          id: 'svt-regular',
          title: 'REGULER — SVT (AVNRT / AVRT)',
          description: 'Interval R-R konstan / reguler. HR biasanya 150-250/menit. Gelombang P bisa tidak terlihat atau retrograd. Paling sering AVNRT.',
          color: 'orange',
          nextNodeId: 'aritmia-svt-management',
          riskLevel: 'medium'
        },
        {
          id: 'af-irregular',
          title: 'IREGULER — Fibrilasi Atrium (AF) / Flutter Atrium',
          description: 'Interval R-R ireguler, tidak ada pola. Tidak ada gelombang P. Baseline bergelombang halus (AF) atau gigi gergaji (AFL 300/menit dengan konduksi 2:1/4:1).',
          color: 'red',
          nextNodeId: 'aritmia-af-management',
          riskLevel: 'high'
        }
      ]
    },

    // ============================================================
    // NODE 6A: SVT MANAGEMENT (STABLE)
    // ============================================================
    'aritmia-svt-management': {
      id: 'aritmia-svt-management',
      type: 'checklist',
      title: 'Node 6A: SVT Stabil — Vagal Maneuver & Medikasi (PERKI/InaHRS TaSuV)',
      description: 'SVT (AVNRT/AVRT): 90% dapat dikonversi dengan Vagal Maneuver + Adenosin. Urutkan tatalaksana dari yang paling tidak invasif.',
      items: [
        {
          id: 'svt-vagal-valsalva',
          title: '1. Valsalva Maneuver (Modifikasi — Efektivitas 43-65%)',
          description: 'Minta pasien: Ambil napas dalam, tiup mouthpiece/jarum suntik 10 mL sekuat mungkin selama 15 detik, LANGSUNG baringkan dengan kaki ditinggikan 45° selama 15 detik, lalu dudukkan kembali. \n(Modifikasi Postural = lebih efektif dari Valsalva standar. Eur Heart J 2015).',
          required: true,
          category: 'action'
        },
        {
          id: 'svt-carotid-massage',
          title: '2. Karotid Sinus Massage (Jika Valsalva Gagal)',
          description: 'HANYA pada pasien < 65 tahun tanpa bruit karotid. Tekan sinus karotid kanan (setinggi kartilago tiroid) memutar selama 5-10 detik sambil monitor EKG. Jangan lakukan pada keduanya bersamaan (risiko stroke).',
          required: false,
          category: 'action'
        },
        {
          id: 'svt-adenosin',
          title: '3. Adenosin 6 mg IV Bolus Cepat (Jika Vagal Gagal)',
          description: 'Adenosin 6 mg IV push CEPAT (< 2 detik) di vena antecubital + segera flush 20 mL NaCl 0.9% cepat. \nJika tidak respons dalam 1-2 menit → Adenosin 12 mg IV, dapat ulang 1x lagi dengan 12 mg. \nEFEK SAMPING NORMAL: rasa terbakar di dada, sesak 10-30 detik (aminkan pasien ini normal!).\nKONTRAINDIKASI: Asma berat, blok AV derajat 2-3, sindrom WPW dengan AF.',
          required: true,
          category: 'medication'
        },
        {
          id: 'svt-verapamil-alternative',
          title: '4. Verapamil 5 mg IV ATAU Diltiazem IV (Alternatif Adenosin)',
          description: 'Jika Adenosin tidak tersedia: Verapamil 5-10 mg IV perlahan 2-3 menit. Bisa ulang 5-10 mg setelah 30 menit. \nKONTRAINDIKASI: Gagal jantung sistolik, WPW, beta-blocker baru diterima (risiko blok).',
          required: false,
          category: 'medication'
        },
        {
          id: 'svt-refer-if-failed',
          title: '5. RUJUK jika Medikasi Gagal atau Rekuren',
          description: 'Jika SVT tidak terminasi setelah 3 upaya Adenosin → Rujuk ke RS/Spesialis kardiologi/elektrofisiologi untuk evaluasi: Kardioversi elektrik, Penyebab struktural (WPW, accessory pathway), dan RF Ablasi jangka panjang.',
          required: true,
          category: 'documentation'
        }
      ]
    },

    // ============================================================
    // NODE 6B: AF MANAGEMENT (STABLE)
    // ============================================================
    'aritmia-af-management': {
      id: 'aritmia-af-management',
      type: 'checklist',
      title: 'Node 6B: Fibrilasi Atrium Stabil — Rate Control & Antikoagulan (PERKI/InaHRS FA)',
      description: 'AF stabil: prioritas adalah: (1) RATE CONTROL — jaga HR < 110 x/menit, (2) ANTIKOAGULAN — cegah stroke tromboemboli, (3) RUJUK untuk evaluasi rhythm control jika perlu.',
      items: [
        {
          id: 'af-hitung-hr',
          title: '1. Hitung Ventricular Rate (HR di EKG)',
          description: 'Hitung HR dengan menghitung interval R-R selama 60 detik (karena ireguler). Target rate control: HR < 110 x/menit saat istirahat (RACE II Trial). Jika HR > 150 + gejala berat → risiko dekompensasi.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'af-rate-control-beta-blocker',
          title: '2. Rate Control: Beta-Blocker (Lini Pertama)',
          description: 'Bisoprolol 2.5-10 mg oral ATAU Metoprolol 25-100 mg oral. \nKONTRAINDIKASI: Asma berat, PPOK berat (relatif), Gagal jantung akut dekompensasi, Blok AV ≥ derajat 2. \nAlternatif jika gagal jantung: Digoxin 0.125-0.25 mg oral.',
          required: true,
          category: 'medication'
        },
        {
          id: 'af-antikoagulan',
          title: '3. ANTIKOAGULAN — Wajib jika CHA₂DS₂-VASc ≥ 2 (Laki) / ≥ 3 (Perempuan)',
          description: 'Hitung CHA₂DS₂-VASc: CHF(1), Hipertensi(1), Age ≥75(2), DM(1), Stroke/TIA(2), Vascular disease(1), Age 65-74(1), Sex female(1).\nAntikogualn: Warfarin (target INR 2-3) ATAU NOAC — Rivaroxaban 20mg OD, Apixaban 5mg BD, Dabigatran 150mg BD.',
          required: true,
          category: 'medication'
        },
        {
          id: 'af-thyroid-check',
          title: '4. Singkirkan Penyebab Reversible: TSH (Hipertiroid)',
          description: 'AF bisa dipicu hipertiroid. Tanyakan: berat badan turun padahal makan banyak, berdebar, berkeringat, tangan gemetar, diare? → Periksa TSH (jika tersedia lab). Hipertiroid → rujuk ke internis.',
          required: false,
          category: 'assessment'
        },
        {
          id: 'af-rujuk-kardio',
          title: '5. RUJUK Kardiologi untuk Evaluasi Rhythm Control & Ablasi',
          description: 'Semua pasien AF baru → rujuk spesialis jantung untuk evaluasi: Strategi rhythm control (kardioversi, antiaritmia), Ekokardiografi (Rujuk RS) (fungsi jantung, trombus LA), dan kemungkinan RF Ablasi pada AF simtomatik berulang.',
          required: true,
          category: 'documentation'
        }
      ]
    },

    // ============================================================
    // NODE 6C: VT MANAGEMENT (STABLE)
    // ============================================================
    'aritmia-vt-management': {
      id: 'aritmia-vt-management',
      type: 'checklist',
      title: 'Node 6C: Takikardia Lebar / Dugaan VT — ANGGAP VT SAMPAI TERBUKTI SEBALIKNYA!',
      description: 'Wide Complex Tachycardia: Selalu anggap VT (Ventricular Tachycardia) di setting akut, meskipun pasien tampak stabil. VT bisa deteriorasi mendadak ke VF.',
      items: [
        {
          id: 'vt-pantau-ketat',
          title: '1. MONITOR TERUS MENERUS + Siapkan CPR',
          description: 'Pasang monitor EKG kontinyu. Pasien berbaring di tempat tidur. Jangan biarkan pasien berjalan/ke toilet sendiri. Siapkan peralatan CPR di samping pasien (ambubag, epinefrin).',
          required: true,
          category: 'safety'
        },
        {
          id: 'vt-iv-line',
          title: '2. Pasang IV Line Segera',
          description: 'Akses vena antecubital besar. Mulai infus NaCl 0.9% pelan (KVO/keep vein open). Untuk jalur medikasi cepat bila pasien deteriorasi.',
          required: true,
          category: 'action'
        },
        {
          id: 'vt-amiodarone',
          title: '3. Amiodarone 150 mg IV (Lini Pertama VT Stabil)',
          description: 'Amiodarone 150 mg dilarutkan dalam D5W 100 mL, infus selama 10 menit. \nJika respons (+) → lanjutkan 1 mg/menit selama 6 jam, kemudian 0.5 mg/menit selama 18 jam. \nJika gagal → RUJUK SEGERA untuk kardioversi atau overdrive pacing.',
          required: true,
          category: 'medication'
        },
        {
          id: 'vt-koreksi-elektrolit',
          title: '4. Koreksi Hipokalemia / Hipomagnesemia (Jika Ada)',
          description: 'VT polimorfik (Torsades de Pointes): Berikan MgSO4 2 gram IV dalam 15 menit. \nHipokalemia: Koreksi KCl secara perlahan (hati-hati pemberian IV cepat). \nPenyebab reversible VT paling sering: kelainan elektrolit dan iskemia.',
          required: false,
          category: 'medication'
        },
        {
          id: 'vt-rujuk-cito',
          title: '5. RUJUK CITO RS dengan Kemampuan Kardiologi / ICU',
          description: 'Semua VT harus dirujuk karena: butuh kardioversi jika gagal medikasi, butuh ekokardiografi (Rujuk RS) (fungsi ventrikel), butuh evaluasi penyebab struktural (IHD, kardiomiopati), dan kemungkinan ICD (Implantable Cardioverter-Defibrillator).',
          required: true,
          category: 'safety'
        }
      ]
    },

    // ============================================================
    // NODE 6D: BRADYARRHYTHMIA MANAGEMENT
    // ============================================================
    'aritmia-bradycardia-management': {
      id: 'aritmia-bradycardia-management',
      type: 'checklist',
      title: 'Node 6D: Bradiaritmia Bergejala — Atropin & Persiapan Pacu Jantung Sementara',
      description: 'Bradiaritmia bergejala = Gejala yang disebabkan oleh nadi lambat (sinkop, presinkop, sesak, nyeri dada). Bradikardi asimtomatis → observasi. Simtomatis → intervensi segera.',
      items: [
        {
          id: 'brady-konfirmasi-ekg',
          title: '1. Konfirmasi di EKG: Jenis Bradiaritmia?',
          description: 'Cek EKG: \n• Sinus bradikardia (P ada sebelum tiap QRS, PR normal): paling jinak.\n• Blok AV Derajat 1 (PR > 200ms): observasi.\n• Blok AV Derajat 2 Mobitz I (Wenckebach — PR memanjang lalu drop): umumnya jinak.\n• Blok AV Derajat 2 Mobitz II (PR konstan, QRS tiba-tiba drop): BERBAHAYA → rujuk.\n• Blok AV Derajat 3 / Total (P dan QRS tak menyambung): DARURAT → rujuk.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'brady-singkirkan-penyebab',
          title: '2. Cari Penyebab Reversible',
          description: 'Obat: Beta-blocker, Digoxin, CCB, Antiaritmia. \nMetabolik: Hipotiroid (tiroid besar, kulit kering, suara serak), Hiperkalemia. \nInferior MI/STEMI: ST elevasi di lead II, III, aVF (AV node disuplai dari RCA). \nVagal (refleks): Bersamaan nyeri, muntah, BAB. → Koreksi penyebab jika memungkinkan.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'brady-atropin',
          title: '3. Atropin 0.5 mg IV (Lini Pertama Bradikardi Bergejala)',
          description: 'Atropin 0.5 mg IV bolus. Dapat diulang setiap 3-5 menit. Dosis total maksimal 3 mg. \nEFEK: Memblok vagal → HR meningkat dalam 1-2 menit. \nKURAN EFEKTIF pada: Blok AV Mobitz II, Blok derajat 3 (blok infranodal) → Pada kasus ini RUJUK lebih prioritas.',
          required: true,
          category: 'medication'
        },
        {
          id: 'brady-o2-iv',
          title: '4. O2 + IV Line + Posisi Trendelenburg (Jika TD Rendah)',
          description: 'O2 nasal kanul 2-4 L/menit. Pasang IV line. Jika TD < 90: posisi Trendelenburg (kaki lebih tinggi dari kepala) + bolus cairan 250 mL RL.',
          required: true,
          category: 'action'
        },
        {
          id: 'brady-rujuk-pacu',
          title: '5. RUJUK ke RS untuk Temporary Pacing (Pacemaker Sementara)',
          description: 'Indikasi rujuk segera (Transvenous/Transcutaneous Pacing): \n• Blok AV derajat 2 Mobitz II atau Derajat 3\n• Sinus arrest berulang + sinkop\n• Bradikardi refrakter (tidak respons Atropin 3 mg)\n• Inferior STEMI + blok AV (RCA occlusion).',
          required: true,
          category: 'safety'
        }
      ]
    }

  },
  references: [
    'Pedoman Tatalaksana Takiaritmia Supraventrikular (TaSuV) — PERKI & InaHRS (Indonesian Heart Rhythm Society).',
    'Pedoman Tata Laksana Fibrilasi Atrium Nonvalvular — PERKI/InaHRS 2019.',
    'AHA/ACC/HRS Guideline for Management of Patients with Ventricular Arrhythmias and Prevention of Sudden Cardiac Death. J Am Coll Cardiol. 2018.',
    'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2020 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care. Circulation. 2020.',
    'KMK No. HK.01.07/MENKES/1186/2022 – PPK Dokter di FKTP: Emergency Kardiovaskular.',
    'Appelboam A, et al. Postural modification to the standard Valsalva manoeuvre for emergency SVT treatment (REVERT trial). Lancet. 2015.'
  ]
};
