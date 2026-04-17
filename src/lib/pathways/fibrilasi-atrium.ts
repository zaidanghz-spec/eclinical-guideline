// ============================================================
// FIBRILASI ATRIUM NON-VALVULAR - PERKI 2019 / InaHRS
// Pedoman Tata Laksana Fibrilasi Atrium Non-Valvular Edisi Kedua
// Perhimpunan Dokter Spesialis Kardiovaskular Indonesia (PERKI) 2019
// Flow: IGD Initial Assessment → Hemodynamic Stability → 
//       UNSTABLE (Emergency Cardioversion) OR STABLE (Diagnose → Antikoagulan → Rate/Rhythm Control → Follow-up)
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const fibrilasiAtriumPathway: DynamicPathway = {
  diseaseId: 'arrhythmias',
  diseaseName: 'Fibrilasi Atrium Non-Valvular (PERKI 2019 / InaHRS)',
  startNodeId: 'fa-initial-assessment',
  nodes: {

    // ============================================================
    // NODE 1: INITIAL ASSESSMENT (IGD - First 5 Minutes)
    // ============================================================
    'fa-initial-assessment': {
      id: 'fa-initial-assessment',
      type: 'checklist',
      title: 'Node 1: Initial Assessment IGD — First 5 Minutes!',
      description: 'Rapid assessment untuk semua pasien dengan palpitasi, nadi ireguler, atau sesak mendadak. Jangan tunda EKG!',
      items: [
        {
          id: 'fa-primary-survey-abcde',
          title: 'PRIMARY SURVEY — ABCDE',
          description: 'Airway patent? Breathing adequate (RR, SpO₂)? Circulation (nadi ireguler? cepat? lemah?)? Disability (GCS, kesadaran)? Exposure (pasang monitor EKG SEGERA!).',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'fa-vital-signs-stat',
          title: 'Vital Signs STAT — Continuous Monitoring',
          description: 'HR (ireguler = karakteristik FA!), BP, RR, SpO₂, Suhu. Pasang cardiac monitor SEGERA. HR pada FA tidak terkontrol biasanya 100–160 bpm.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'fa-hemodynamic-stability-screen',
          title: 'HEMODYNAMIC STABILITY — CRITICAL ASSESSMENT!',
          description: 'UNSTABLE jika ada SATU dari: Penurunan kesadaran/altered MS, Nyeri dada aktif (iskemia), Edema paru akut (sesak berat, ronki, SpO₂ turun cepat), Hipotensi (SBP <90 mmHg), Tanda syok (akral dingin, CRT >3 detik). ANY ONE = UNSTABLE → Cardioversion NOW!',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'fa-anamnesis-kilat',
          title: 'Anamnesis Kilat — Gejala Akut',
          description: 'Palpitasi (merasa debar tidak beraturan)? Sesak napas? Chest discomfort/pain? Dizziness/presyncope? Sinkop (red flag!)? Onset kapan — <48 jam atau >48 jam? Pernah FA sebelumnya?',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'fa-ecg-12-lead-stat',
          title: 'ECG 12-Lead STAT — Dalam 5 Menit!',
          description: 'MANDATORY! 3 tanda FA di EKG: (1) Interval R-R ireguler, (2) Tidak ada gelombang P → diganti gelombang fibrilasi (f) 350–600×/mnt, (3) QRS sempit (kecuali ada BBB/preeksitasi). Record strip panjang di lead II!',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'fa-hitung-laju-ventrikel',
          title: 'Hitung Laju Ventrikel & Kategorikan',
          description: 'Hitung QRS dalam 6 detik (30 kotak besar) × 10. Kategori: Cepat >100×/mnt (RVR) | Normal 60–100×/mnt | Lambat <60×/mnt. FA dengan RVR (rapid ventricular response) → prioritas kendali laju!',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'fa-wpw-screen',
          title: 'Singkirkan WPW (Preeksitasi) — KRITIS!',
          description: 'FA + WPW = BAHAYA MAUT! Cari: delta wave + PR pendek di EKG baseline. JIKA ADA → JANGAN berikan digoxin, verapamil, diltiazem, adenosin → dapat menyebabkan VFib! Pilih amiodaron IV atau kardioversi elektrik.',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'fa-iv-access',
          title: 'IV Access — Large Bore (18G)',
          description: 'Minimal 1 jalur IV perifer besar. 2 jalur IV jika unstable atau rencana kardioversi. Ambil sampel darah bersamaan: DL, elektrolit, kreatinin, TSH, enzim jantung (jika nyeri dada).',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'fa-o2-supplementasi',
          title: 'Oxygen Supplementation',
          description: 'INDIKASI: SpO₂ <94% atau dyspnea. O₂ nasal cannula 2–4 L/mnt. Masker non-rebreather jika SpO₂ <90%. Prepare airway management jika unstable!',
          required: false,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'fa-crash-cart-standby',
          title: 'Crash Cart & Defibrillator STANDBY',
          description: 'Siapkan defibrillator di bedside SEMUA pasien FA dengan HD tidak stabil atau potensi deteriorasi. Pasang pads kardioversi pada pasien unstable. Set ke SYNCHRONIZED mode!',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'fa-onset-penting',
          title: 'Konfirmasi Onset: <48 Jam atau >48 Jam? — PENTING!',
          description: 'PALING PENTING untuk keputusan kardioversi! <48 jam → kardioversi relatif aman tanpa TEE. >48 jam atau TIDAK PASTI → risiko trombus tinggi → perlu antikoagulan 3 minggu dulu ATAU TEE untuk singkirkan trombus AAK sebelum kardioversi.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        }
      ],
      nextNodeId: 'fa-hemodynamic-decision'
    },

    // ============================================================
    // NODE 2: HEMODYNAMIC STABILITY DECISION
    // ============================================================
    'fa-hemodynamic-decision': {
      id: 'fa-hemodynamic-decision',
      type: 'decision',
      title: 'Node 2: Hemodynamic Stability — Immediate Decision!',
      description: 'UNSTABLE = Kardioversi elektrik SEGERA! STABLE = Evaluasi bertahap (EKG, onset, antikoagulan, kendali laju/irama).',
      warningLevel: 'critical',
      branches: [
        {
          id: 'fa-branch-unstable',
          title: 'UNSTABLE — CARDIOVERSION STAT!',
          description: 'Penurunan kesadaran, nyeri dada aktif, edema paru akut, hipotensi SBP <90, tanda syok. DO NOT DELAY! Setiap menit memperparah iskemia organ.',
          color: 'red',
          nextNodeId: 'fa-emergency-cardioversion',
          riskLevel: 'high'
        },
        {
          id: 'fa-branch-stable',
          title: 'STABLE — Evaluasi Terstruktur',
          description: 'Alert, tidak ada nyeri dada aktif, BP terjaga, tidak ada edema paru. Lanjut ke klasifikasi, antikoagulan, dan kendali laju/irama.',
          color: 'green',
          nextNodeId: 'fa-classification-workup',
          riskLevel: 'low'
        }
      ]
    },

    // ============================================================
    // NODE 3: EMERGENCY CARDIOVERSION (FA Tidak Stabil)
    // ============================================================
    'fa-emergency-cardioversion': {
      id: 'fa-emergency-cardioversion',
      type: 'checklist',
      title: 'Node 3: EMERGENCY — Synchronized Cardioversion STAT!',
      description: 'FA dengan gangguan hemodinamik = indikasi kardioversi elektrik segera. Jangan tunda menunggu antikoagulan atau konfirmasi onset!',
      items: [
        {
          id: 'fa-ev-call-team',
          title: 'CALL TEAM — Alert Resuscitation/Code Team',
          description: 'Hubungi kardiolog/dokter senior segera. Siapkan anestesi jika tersedia. Lebih baik 2 dokter untuk prosedur ini!',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'fa-ev-pads-sync',
          title: 'Pasang Pads Kardioversi — SET SYNCHRONIZED MODE!',
          description: 'Posisi anteroposterior (depan-belakang) lebih efektif dari anterolateral! PASTIKAN SYNC MODE AKTIF — cek tanda marker muncul di tiap QRS pada monitor. BUKAN unsynchronized (defibrilasi)!',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'fa-ev-sedasi',
          title: 'Sedasi Singkat (Jika Hemodinamik Memungkinkan)',
          description: 'Midazolam 1–2mg IV pelan ATAU Propofol 0.5–1 mg/kgBB IV pelan ATAU Etomidate 0.1–0.2 mg/kgBB (pilihan terbaik jika hemodinamik terbatas). SKIP sedasi jika syok berat/arrest imminent → kardioversi langsung!',
          required: false,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'fa-ev-energi',
          title: 'Energy Level: 120–200 J Bifasik (RECOMMENDED)',
          description: 'Start: 120–200 J bifasik (lebih disukai) ATAU 200 J monofasik. Jika gagal → naikkan energi, ulangi. Max 3 attempt dengan eskalasi energi. Bifasik lebih efisien, perlu energi lebih rendah dari monofasik.',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'fa-ev-deliver-shock',
          title: '"CLEAR!" — Deliver Synchronized Shock',
          description: 'Umumkan "OXYGEN OFF, SEMUA MINGGIR!". Visual check semua clear. Tekan tombol SHOCK. Note: pada SYNC mode, ada sedikit delay (menunggu QRS) — tahan tombol hingga shock delivered!',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'fa-ev-assess-post-shock',
          title: 'Assess Rhythm Immediately Post-Shock',
          description: 'Berhasil (irama sinus): HR turun tiba-tiba, muncul P wave reguler. Gagal: masih ireguler. Jika gagal → eskalasi energi, periksa posisi pads, ulangi. Jika 3x gagal → konsul SpJP, pertimbangkan amiodaron IV dulu lalu reattempt.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'fa-ev-ecg-post',
          title: 'ECG 12-Lead Post-Kardioversi',
          description: 'Dokumentasi irama post-kardioversi. Cari: delta wave (WPW?), iskemia, baseline abnormalities. Catat: waktu, energi yang digunakan, respons pasien.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'fa-ev-antikoagulan-post',
          title: 'Antikoagulan WAJIB 4 Minggu Post-Kardioversi!',
          description: 'Meski darurat dan irama sinus tercapai → fungsi mekanik atrium butuh waktu pulih (atrial stunning). Risiko tromboemboli tetap ada 3–4 minggu. Mulai antikoagulan segera setelah kondisi stabil. AVK (INR 2–3) atau AKD.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'fa-ev-icu-admit',
          title: 'Rawat ICU / HCU — Monitoring Ketat Post-Kardioversi',
          description: 'Pasien FA emergency → observasi HCU/ICU post-kardioversi. Monitor EKG kontinu, vital signs q15 menit. Watch for: rekurensi FA, aritmia baru, perubahan hemodinamik.',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'fa-ev-investigate-cause',
          title: 'Investigasi Penyebab FA Setelah Stabil',
          description: 'Setelah stabilisasi → cari underlying cause: Ekokardiografi (Rujuk RS), Lab lengkap (TSH, DL, elektrolit), EKG baseline, Foto toraks. Komorbid perlu diobati untuk cegah rekurensi!',
          required: true,
          category: 'assessment',
          role: 'nurse',
        }
      ],
      nextNodeId: 'fa-long-term-plan'
    },

    // ============================================================
    // NODE 4: CLASSIFICATION & WORKUP (FA Stabil)
    // ============================================================
    'fa-classification-workup': {
      id: 'fa-classification-workup',
      type: 'checklist',
      title: 'Node 4: Klasifikasi FA & Workup Lengkap',
      description: 'Tipe FA menentukan strategi kardioversi dan risiko trombus. Workup awal juga mencari komorbid dan penyebab yang bisa diobati.',
      items: [
        {
          id: 'fa-tipe-klasifikasi',
          title: 'Klasifikasi Tipe FA — Tanyakan Riwayat!',
          description: 'FA Pertama Kali: baru terdiagnosis, belum jelas durasi. Paroksismal: berhenti sendiri ≤7 hari. Persisten: menetap >7 hari, butuh kardioversi. Persisten Lama: ≥1 tahun, masih rencana kendali irama. Permanen: dokter+pasien sepakat tidak upayakan irama sinus lagi.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'fa-ehra-score',
          title: 'Nilai Beban Gejala — Skor EHRA',
          description: 'EHRA 1: Asimtomatis (FA ditemukan tidak sengaja). EHRA 2a: Gejala ringan, aktivitas normal. EHRA 2b: Gejala sedang, ada keluhan tapi bisa aktivitas. EHRA 3: Berat, aktivitas terbatas. EHRA 4: Tidak bisa aktivitas/sangat terganggu. Skor ≥2b → pertimbangkan kendali irama!',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'fa-komorbid-risiko',
          title: 'Identifikasi Komorbid & Faktor Risiko FA',
          description: 'Wajib tanyakan & periksa: Hipertensi (paling sering!), Gagal Jantung (HFrEF vs HFpEF), PJK, DM, Obesitas, OSA (ngorok + mengantuk?), PPOM, Penyakit Ginjal Kronik, Hipertiroid, Konsumsi alkohol berlebih. Komorbid terkontrol = FA lebih mudah dikelola.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'fa-labs-mandatory',
          title: 'Labs Wajib — Ambil Bersamaan Saat Pasang IV',
          description: 'Darah Lengkap (anemia/infeksi?). Elektrolit (K⁺, Mg²⁺ — koreksi dulu!). Kreatinin + eGFR (tentukan dosis antikoagulan). TSH (hipertiroid = penyebab FA reversibel!). Enzim jantung troponin (Rujuk RS) (jika ada nyeri dada → singkirkan SKA).',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'fa-ekokardiografi (Rujuk RS)',
          title: 'Ekokardiografi (Rujuk RS) Transtorakal (ETT)',
          description: 'Dikerjakan semua pasien FA baru/tidak jelas etiologi. Nilai: ukuran atrium kiri (besar = FA lebih persisten), EF ventrikel (FA + EF turun = tidak boleh CCB!), kelainan katup (FA valvular? → warfarin!), tekanan paru. Jika rencana kardioversi + onset >48 jam → TEE untuk cek trombus AAK!',
          required: true,
          category: 'assessment',
          role: 'doctor',
        },
        {
          id: 'fa-fa-valvular-check',
          title: 'Bedakan FA Valvular vs Non-Valvular — Penting untuk Antikoagulan!',
          description: 'FA VALVULAR: ada stenosis mitral sedang-berat OR katup prostetik mekanik → Wajib WARFARIN, AKD DILARANG! FA NON-VALVULAR: semua FA lainnya → AKD lebih diutamakan dari warfarin.',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'fa-foto-toraks',
          title: 'Foto Toraks',
          description: 'Nilai: kardiomegali (pembesaran jantung), edema paru (kerley B lines, bat wing), efusi pleura, penyakit paru yang mendasari (PPOM, pneumonia sebagai pencetus). Bisa dilakukan segera di IGD.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        }
      ],
      nextNodeId: 'fa-anticoagulation-decision'
    },

    // ============================================================
    // NODE 5: ANTICOAGULATION — CHA₂DS₂-VASc Decision
    // ============================================================
    'fa-anticoagulation-decision': {
      id: 'fa-anticoagulation-decision',
      type: 'decision',
      title: 'Node 5: Antikoagulan — Hitung Skor CHA₂DS₂-VASc Dulu!',
      description: 'ANTIKOAGULAN LEBIH PENTING dari kendali irama! Hitung skor: C=Gagal jantung/EF≤40%(1), H=Hipertensi(1), A²=Usia≥75th(2), D=DM(1), S²=Riwayat Stroke/TIA(2), V=Penyakit Vaskular/IMA/PAD(1), A=Usia 65–74th(1), Sc=Perempuan(1).',
      warningLevel: 'warning',
      branches: [
        {
          id: 'fa-cha-rendah',
          title: 'Skor 0 (♂) atau 1 (♀) — Risiko Rendah',
          description: 'Tidak ada faktor risiko stroke selain jenis kelamin. Antikoagulan TIDAK dianjurkan. Pantau dan kontrol faktor risiko. Re-evaluasi skor tiap tahun.',
          color: 'green',
          nextNodeId: 'fa-rate-rhythm-decision',
          riskLevel: 'low'
        },
        {
          id: 'fa-cha-sedang',
          title: 'Skor 1 (♂) atau 2 (♀) — Pertimbangkan Antikoagulan',
          description: 'Diskusikan risiko stroke vs risiko perdarahan. Hitung skor HAS-BLED untuk risiko perdarahan. Jika HAS-BLED <3 → cenderung mulai antikoagulan. Keputusan bersama dengan pasien!',
          color: 'orange',
          nextNodeId: 'fa-anticoagulation-therapy',
          riskLevel: 'medium'
        },
        {
          id: 'fa-cha-tinggi',
          title: 'Skor ≥2 (♂) atau ≥3 (♀) — WAJIB Antikoagulan',
          description: 'Manfaat pencegahan stroke jauh > risiko perdarahan. AKD (dabigatran/rivaroksaban/apiksaban/edoksaban) lebih diutamakan dari warfarin. Mulai sekarang!',
          color: 'red',
          nextNodeId: 'fa-anticoagulation-therapy',
          riskLevel: 'high'
        }
      ]
    },

    // ============================================================
    // NODE 6: ANTICOAGULATION THERAPY
    // ============================================================
    'fa-anticoagulation-therapy': {
      id: 'fa-anticoagulation-therapy',
      type: 'checklist',
      title: 'Node 6: Pemilihan & Inisiasi Antikoagulan',
      description: 'AKD (Antikoagulan Direk) lebih diutamakan dari warfarin pada FA non-valvular — lebih efektif, lebih aman untuk perdarahan intrakranial, tidak perlu monitoring INR rutin.',
      items: [
        {
          id: 'fa-akd-lini-pertama',
          title: 'PILIHAN UTAMA: AKD untuk FA Non-Valvular',
          description: 'Dabigatran 2×150mg (atau 2×110mg: usia >75th atau risiko perdarahan tinggi). Rivaroksaban 1×20mg (1×15mg jika eGFR 30–49). Apiksaban 2×5mg (2×2.5mg jika ≥2 dari: usia ≥80th / BB ≤60kg / kreatinin ≥1.5). Edoksaban 1×60mg (1×30mg jika eGFR 30–50 atau BB ≤60kg). Semua terbukti ≥ warfarin dalam mencegah stroke, dengan perdarahan intrakranial lebih rendah!',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'fa-warfarin-indikasi-spesifik',
          title: 'Warfarin: HANYA untuk FA Valvular atau AKD Tidak Tersedia',
          description: 'WAJIB Warfarin: Stenosis mitral sedang-berat, Katup prostetik mekanik, eGFR <15 ml/mnt atau hemodialisis. Target INR 2–3. Monitor INR. Gunakan Skor SAMe-TT2R2 → jika >2: sulit capai TTR, pertimbangkan AKD.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'fa-has-bled-check',
          title: 'Hitung Skor HAS-BLED — Risiko Perdarahan',
          description: 'H=Hipertensi tidak terkontrol(1), A=Ginjal/hati abnormal(1–2), S=Riwayat stroke(1), B=Riwayat perdarahan/predisposisi(1), L=INR labil(1), E=Usia >65th(1), D=Obat/alkohol(1–2). Skor ≥3: WASPADA — bukan alasan stop antikoagulan! Tapi koreksi faktor yang bisa diubah dulu (kontrol tensi, stop NSAID, dll).',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'fa-no-antiplatelet',
          title: 'JANGAN Ganti Antikoagulan dengan Aspirin/Antiplatelet!',
          description: 'Aspirin TIDAK efektif mencegah stroke FA dan risiko perdarahannya SAMA dengan antikoagulan. Tidak ada dasar ilmiah untuk substitusi aspirin sebagai pengganti antikoagulan pada FA. (Antiplatelet boleh ditambahkan HANYA jika ada indikasi mandiri: SKA, PCI baru.)',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'fa-egfr-monitor',
          title: 'Monitor eGFR Minimal 1× per Tahun',
          description: 'Semua pasien FA + antikoagulan wajib cek eGFR tiap tahun (atau tiap 6 bulan jika eGFR <60). Sesuaikan dosis AKD jika eGFR turun. Hindari AKD jika eGFR <15 atau dialisis.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'fa-antikoagulan-kardioversi',
          title: 'Antikoagulan Sebelum Kardioversi Elektif — Aturan Wajib!',
          description: 'Onset FA <48 jam: kardioversi bisa langsung (lanjutkan antikoagulan 4 minggu sesudah). Onset ≥48 jam atau TIDAK PASTI: PILIH salah satu: (A) Antikoagulan terapi 3 minggu dulu → lalu kardioversi, atau (B) TEE untuk singkirkan trombus AAK → kardioversi. Setelah kardioversi: antikoagulan 4 minggu wajib (atrial stunning)!',
          required: true,
          category: 'safety',
          role: 'nurse',
        }
      ],
      nextNodeId: 'fa-rate-rhythm-decision'
    },

    // ============================================================
    // NODE 7: RATE vs RHYTHM CONTROL DECISION
    // ============================================================
    'fa-rate-rhythm-decision': {
      id: 'fa-rate-rhythm-decision',
      type: 'decision',
      title: 'Node 7: Strategi — Kendali Laju atau Kendali Irama?',
      description: 'KEDUANYA valid! Pilih berdasarkan: usia, gejala, tipe FA, komorbid, preferensi pasien. Kendali laju lebih aman untuk FA kronis/tua. Kendali irama untuk yang muda/simtomatis/FA onset baru.',
      warningLevel: 'info',
      branches: [
        {
          id: 'fa-rate-control-path',
          title: 'KENDALI LAJU — FA Permanen / Usia >65 / Gejala Minimal (EHRA ≤2a)',
          description: 'Usia >65th, penyakit arteri koroner, FA permanen, keluhan minimal, tidak cocok untuk kardioversi, atau FA dengan atrium kiri sangat besar. Target: HR <110×/mnt (longgar). Antikoagulan tetap jalan!',
          color: 'blue',
          nextNodeId: 'fa-rate-control',
          riskLevel: 'low'
        },
        {
          id: 'fa-rhythm-control-path',
          title: 'KENDALI IRAMA — Usia <65 / Simtomatis / FA Onset Baru / FA + Gagal Jantung Baru',
          description: 'Usia muda, gejala berat (EHRA ≥2b), FA paroksismal pertama, FA onset baru <48 jam, gagal jantung yang diduga diinduksi takikardia. Tujuan: kembalikan ke irama sinus.',
          color: 'orange',
          nextNodeId: 'fa-rhythm-control',
          riskLevel: 'medium'
        }
      ]
    },

    // ============================================================
    // NODE 8: RATE CONTROL THERAPY
    // ============================================================
    'fa-rate-control': {
      id: 'fa-rate-control',
      type: 'checklist',
      title: 'Node 8: Kendali Laju — Obat, Target & Monitoring',
      description: 'Target awal: HR ≤110×/mnt saat istirahat (kendali longgar). Jika masih bergejala → ketatkan ke <80×/mnt istirahat. Antikoagulan TETAP diberikan bersamaan!',
      items: [
        {
          id: 'fa-rc-target-laju',
          title: 'Target Laju: ≤110×/mnt Istirahat (Longgar Dulu)',
          description: 'Studi RACE II membuktikan kendali laju longgar (≤110) sama baiknya dengan ketat (<80) dalam hal outcome. Mulai dari target longgar. Perketat hanya jika masih bergejala!',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'fa-rc-beta-bloker',
          title: 'PILIHAN PERTAMA: Beta-Blocker (Penyekat Beta)',
          description: 'Bisoprolol 1×2.5–10mg | Metoprolol 2×25–100mg | Carvedilol 2×3.125–25mg | Atenolol 1×25–100mg. IV: Metoprolol 2.5–5mg IV pelan, max 3 dosis. Diutamakan pada: GJ dengan EF turun, pasca-IMA, hipertiroid. Efek samping: bradikardia, bronkospasme (hati-hati PPOM).',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'fa-rc-ccb-nondhp',
          title: 'ALTERNATIF: CCB Non-DHP (HANYA Jika EF Normal!)',
          description: 'Diltiazem 3×30mg → 1×200mg SR | Verapamil 2×40mg → 1×240mg SR. IV: Diltiazem 0.25 mg/kgBB bolus. KONTRAINDIKASI KETAT: gagal jantung dengan EF turun (memperburuk kontraktilitas → hati-hati!). Efektif dan bisa ditoleransi pada PPOM.',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'fa-rc-digoksin',
          title: 'TAMBAHAN: Digoksin (Jika Monoterapi Belum Cukup)',
          description: 'Digoksin 1×0.125–0.25mg/hari. Kerja hanya via tonus parasimpatis → efektif saat istirahat, kurang efektif saat aktivitas fisik. JANGAN monoterapi pada pasien aktif. Hati-hati dosis pada eGFR turun → monitor kadar digoksin. Kombinasikan dengan beta-bloker untuk cakupan penuh.',
          required: false,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'fa-rc-amiodaron-rate',
          title: 'Amiodaron untuk Kendali Laju — Opsi Terakhir',
          description: 'Hanya jika beta-bloker, CCB, dan digoksin kombinasi tetap gagal kontrol laju. Efek samping jangka panjang banyak (pulmo, tiroid, hepar). Tidak ideal untuk maintenance rate control kronik.',
          required: false,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'fa-rc-evaluasi-holter',
          title: 'Evaluasi Kecukupan Laju — Uji Berjalan / Holter',
          description: 'Cek: HR <110×/mnt saat istirahat? Uji berjalan 6 menit: HR <110 setelah berjalan? Holter 24 jam untuk evaluasi menyeluruh dan deteksi bradikardia. Jika kendali laju farmakologis gagal → pertimbangkan ablasi NAV + pacu jantung permanen (pilihan invasif terakhir).',
          required: true,
          category: 'assessment',
          role: 'nurse',
        }
      ],
      nextNodeId: 'fa-monitoring-followup'
    },

    // ============================================================
    // NODE 9: RHYTHM CONTROL THERAPY
    // ============================================================
    'fa-rhythm-control': {
      id: 'fa-rhythm-control',
      type: 'checklist',
      title: 'Node 9: Kendali Irama — Strategi Konversi ke Irama Sinus',
      description: 'Tujuan: kembalikan dan pertahankan irama sinus. INGAT: antikoagulan harus jalan bersamaan. Onset <48 jam → bisa langsung. Onset ≥48 jam → antikoagulan dulu atau TEE!',
      items: [
        {
          id: 'fa-rhy-antikoagulan-dulu',
          title: 'ATURAN EMAS: Antikoagulan SEBELUM Kardioversi Elektif!',
          description: 'Onset <48 jam: kardioversi elektif aman. Onset ≥48 jam atau tidak pasti: (A) Antikoagulan terapi 3 minggu → kardioversi, ATAU (B) TEE untuk singkirkan trombus AAK → kardioversi segera. Melanggar rule ini = risiko stroke embolik pasca-kardioversi!',
          required: true,
          category: 'safety',
          role: 'nurse',
        },
        {
          id: 'fa-rhy-kardioversi-listrik',
          title: 'Kardioversi Elektrik (DC Cardioversion) — Gold Standard',
          description: 'SYNC MODE aktif! Energi 120–200 J bifasik (preferred) atau 200 J monofasik. Posisi anteroposterior lebih efektif. Premedikasi amiodaron sebelumnya meningkatkan keberhasilan. Success rate 80–96% pada FA persisten. Sedasi singkat sebelum prosedur.',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'fa-rhy-kardioversi-farmakologi',
          title: 'Kardioversi Farmakologis (Alternatif atau Pra-Kardioversi Elektrik)',
          description: 'Amiodaron IV 5 mg/kgBB dalam 1 jam → rumatan 50 mg/jam (satu-satunya IV tersedia di Indonesia). Konversi terjadi beberapa jam setelah pemberian. Propafenon 450–600mg oral ("pil dalam saku"/PILDAKU) — untuk FA paroksismal jarang dan EF normal. Hanya di bawah pengawasan medis!',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'fa-rhy-obat-antiaritmia',
          title: 'Obat Antiaritmia Jangka Panjang — Cegah Rekurensi',
          description: 'Pilih berdasarkan kondisi jantung: Tanpa penyakit struktural: Propafenon atau Flekainid (jangan jika ada PJK!). Dengan HT atau PJK: Sotalol (monitor QT, perlu hospitalisasi inisiasi). Semua kondisi: Amiodaron (paling efektif mempertahankan irama sinus, tapi efek samping banyak → gunakan dosis terkecil efektif).',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'fa-rhy-ablasi-kateter',
          title: 'Ablasi Kateter (AFR/Krioablasi) — Pilihan Kuratif',
          description: 'Indikasi: Simtomatis + gagal ≥1 obat antiaritmia, ATAU pasien muda paroksismal yang pilih tanpa obat seumur hidup. AFR (Ablasi Frekuensi Radio) isolasi VP: success 85% tahun pertama, 52% pada 5 tahun. Krioablasi: efikasi setara, opsi di pusat berpengalaman. Rujuk SpJP di RS tersier!',
          required: false,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'fa-rhy-antikoagulan-post-cv',
          title: 'Antikoagulan WAJIB 4 Minggu Post-Kardioversi — Jangan Lupa!',
          description: 'Meski irama sinus tercapai → atrial stunning! Fungsi mekanik atrium butuh 2–4 minggu pulih. Risiko tromboemboli 1–2% pertama pasca-kardioversi. Setelah 4 minggu: re-evaluasi CHA₂DS₂-VASc → jika skor ≥1(♂) atau ≥2(♀) = antikoagulan SEUMUR HIDUP meski irama sinus!',
          required: true,
          category: 'medication',
          role: 'doctor',
        }
      ],
      nextNodeId: 'fa-monitoring-followup'
    },

    // ============================================================
    // NODE 10: LONG-TERM PLAN (After Emergency)
    // ============================================================
    'fa-long-term-plan': {
      id: 'fa-long-term-plan',
      type: 'checklist',
      title: 'Node 10: Rencana Jangka Panjang Post-Emergency',
      description: 'Setelah stabilisasi pasca-kardioversi darurat → rencana tatalaksana definitif dan investigasi penyebab.',
      items: [
        {
          id: 'fa-lt-antikoagulan-lanjut',
          title: 'Lanjutkan Antikoagulan — Wajib Minimal 4 Minggu',
          description: 'Hitung CHA₂DS₂-VASc setelah stabil. Mulai AKD atau warfarin sesuai indikasi. Jika sudah kronik FA → antikoagulan seumur hidup!',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'fa-lt-etiologi',
          title: 'Investigasi Etiologi & Komorbid',
          description: 'Ekokardiografi (Rujuk RS) (struktur jantung, EF, katup). TSH (hipertiroid?). Elektrolit, DL. EKG baseline (WPW?). Foto toraks. Holter 24 jam jika curiga FA paroksismal berulang.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'fa-lt-konsul-spjp',
          title: 'Konsul SpJP / Kardiologi Elektrofisiologi',
          description: 'Semua FA post-emergency → konsul SpJP untuk: evaluasi etiologi, rencana kendali irama jangka panjang, pertimbangan rujukan ablasi, optimasi antikoagulan.',
          required: true,
          category: 'action',
          role: 'nurse',
        }
      ],
      nextNodeId: 'fa-monitoring-followup'
    },

    // ============================================================
    // NODE 11: MONITORING & FOLLOW-UP
    // ============================================================
    'fa-monitoring-followup': {
      id: 'fa-monitoring-followup',
      type: 'checklist',
      title: 'Node 11: Monitoring & Follow-Up Jangka Panjang',
      description: 'FA adalah kondisi kronik — pengendalian jangka panjang sama pentingnya dengan tatalaksana akut. Setiap kunjungan follow-up: evaluasi 4 aspek utama.',
      items: [
        {
          id: 'fa-fu-nadi-td',
          title: 'Setiap Kunjungan: Cek Nadi & Tekanan Darah',
          description: 'HR saat istirahat: target <110×/mnt (longgar) atau <80×/mnt (ketat jika simtomatis). TD: kontrol ketat BP → faktor risiko stroke paling dapat dimodifikasi! Jika nadi masih cepat → eskalasi obat kendali laju.',
          required: true,
          category: 'assessment',
          role: 'nurse',
        },
        {
          id: 'fa-fu-antikoagulan-kepatuhan',
          title: 'Evaluasi Kepatuhan & Keamanan Antikoagulan',
          description: 'Apakah rutin minum obat? Keluhan perdarahan (gusi, memar, BAB hitam, BAK kemerahan)? Jika warfarin: cek INR (target 2–3, TTR >70%). Review interaksi obat baru. Jangan pernah hentikan antikoagulan tanpa konsultasi!',
          required: true,
          category: 'medication',
          role: 'doctor',
        },
        {
          id: 'fa-fu-komorbid',
          title: 'Kontrol Komorbid — Kunci Cegah Rekurensi FA',
          description: 'Hipertensi terkontrol? DM terkontrol? BB? Tidur nyenyak (OSA dengan CPAP?)? Fungsi tiroid normal? Alkohol dibatasi? Komorbid tidak terkontrol = FA akan terus kambuh. Tatalaksana holistik = outcome lebih baik.',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'fa-fu-gaya-hidup',
          title: 'Modifikasi Gaya Hidup — Turunkan Beban FA',
          description: 'Penurunan BB 10–15kg pada obesitas: terbukti turunkan rekurensi FA (ARREST-AF). Batasi alkohol & kafein berlebih. Aerobik sedang teratur. Berhenti merokok. Manage stres. Tidur cukup.',
          required: true,
          category: 'action',
          role: 'nurse',
        },
        {
          id: 'fa-fu-edukasi-stroke',
          title: 'Edukasi Tanda Stroke & Kapan Kembali ke IGD',
          description: 'Ajarkan: FAST = Face drooping, Arm weakness, Speech difficulty, Time to call ambulance. Pasien FA risiko stroke 5× lebih tinggi! Gejala stroke = EMERGENCY — ke IGD dalam 4.5 jam (window trombolisis). Jangan tunda meski sudah minum antikoagulan.',
          required: true,
          category: 'documentation',
          role: 'both',
        },
        {
          id: 'fa-fu-ekg-berkala',
          title: 'EKG Berkala & Holter Sesuai Indikasi',
          description: 'EKG minimal tiap 6–12 bulan, atau jika keluhan baru/perubahan kondisi. Holter 24–72 jam: untuk evaluasi rekurensi FA asimtomatis (terutama pada kendali irama). Monitor interval QT jika pakai obat antiaritmia (sotalol, amiodaron).',
          required: false,
          category: 'assessment',
          role: 'both',
        },
        {
          id: 'fa-fu-rujuk-spjp',
          title: 'Indikasi Rujuk ke SpJP / Elektrofisiologi',
          description: 'RUJUK jika: FA + gagal jantung memburuk, FA refrakter (tidak terkontrol ≥2 obat), pertimbangan ablasi kateter, FA + WPW (preeksitasi) — URGENT!, FA onset baru <50 tahun (singkirkan penyebab struktural), pascastroke untuk optimalkan antikoagulan.',
          required: true,
          category: 'action',
          role: 'doctor',
        }
      ]
    }

  },
  references: [
    'Pedoman Tata Laksana Fibrilasi Atrium Non-Valvular Edisi Kedua 2019 – Perhimpunan Dokter Spesialis Kardiovaskular Indonesia (PERKI) / Indonesian Heart Rhythm Society (InaHRS). Tim Penyusun: Beny Hartono, Dicky Armein Hanafy, et al.',
    '2020 ESC Guidelines for the Diagnosis and Management of Atrial Fibrillation. Eur Heart J. 2021;42(5):373–498',
    'January CT, et al. 2019 AHA/ACC/HRS Focused Update of the 2014 Guideline for Patients with Atrial Fibrillation. Circulation. 2019;140:e125–e151',
    'Registry FA Indonesia (OneAF) — Registri 10 RS Indonesia, 615 Pasien: 71% simtomatis, 39.3% paroksismal, 28.6% persisten',
    'RE-LY Trial 2009 (Dabigatran), ROCKET-AF Trial 2011 (Rivaroksaban), ARISTOTLE Trial 2011 (Apiksaban), ENGAGE AF-TIMI 48 Trial 2013 (Edoksaban) — Fase III AKD vs Warfarin',
    'RACE II Trial (Lenient vs Strict Rate Control in AF). N Engl J Med 2010;362:1363–73',
    'Cappato R, et al. ARREST-AF Cohort Study (Weight Loss and AF Burden). Europace. 2015'
  ]
};
