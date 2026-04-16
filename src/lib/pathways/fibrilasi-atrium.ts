// ============================================================
// PEDOMAN TATA LAKSANA FIBRILASI ATRIUM NON-VALVULAR
// PERHIMPUNAN DOKTER SPESIALIS KARDIOVASKULAR INDONESIA (PERKI) 2019
// Edisi Kedua – Indonesian Heart Rhythm Society (InaHRS)
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const fibrilasiAtriumPathway: DynamicPathway = {
  diseaseId: 'arrhythmias',
  diseaseName: 'Fibrilasi Atrium Non-Valvular (Pedoman PERKI 2019)',
  startNodeId: 'fa-triage-stabilitas',
  nodes: {

    // ─────────────────────────────────────────────
    // LANGKAH 1: TRIAGE — STABIL ATAU TIDAK?
    // ─────────────────────────────────────────────
    'fa-triage-stabilitas': {
      id: 'fa-triage-stabilitas',
      type: 'checklist',
      title: '🚨 Langkah 1: Nilai Stabilitas Hemodinamik — SEGERA!',
      description: 'Lakukan dalam 1–2 menit pertama. Tujuan: tentukan apakah pasien butuh tindakan CITO atau bisa dievaluasi bertahap.',
      items: [
        {
          id: 'fa-nadi-ireguler',
          title: '✅ Cek Nadi: Ireguler + Cepat?',
          description: 'Nadi ireguler, laju >100×/mnt → curiga FA. Pulsus defisit (nadi teraba < denyut jantung saat auskultasi)? Catat laju nadi.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fa-td-syok',
          title: '✅ Tekanan Darah & Tanda Syok',
          description: 'Hipotensi (TDS <90 mmHg)? Kulit pucat/dingin/basah? Akral dingin? Penurunan kesadaran? → Syok kardiogenik = CITO.',
          required: true,
          category: 'safety'
        },
        {
          id: 'fa-sesak-berat',
          title: '✅ Sesak Napas Berat / Edema Paru Akut?',
          description: 'Sesak mendadak memberat, SpO₂ turun <94%, ronki basah bilateral, posisi ortopnea → Edema paru = CITO.',
          required: true,
          category: 'safety'
        },
        {
          id: 'fa-nyeri-dada',
          title: '✅ Nyeri Dada Aktif (Iskemia)?',
          description: 'Nyeri dada tipikal/atipikal yang sedang berlangsung → FA mungkin dipicu SKA, atau FA sendiri menyebabkan iskemia. Perlu EKG segera.',
          required: true,
          category: 'safety'
        },
        {
          id: 'fa-defisit-neuro',
          title: '✅ Penurunan Kesadaran / Defisit Neurologis?',
          description: 'Bicara pelo, kelemahan separuh tubuh, penurunan kesadaran → Curiga stroke embolik akibat FA. CITO neuro + antikoagulan.',
          required: true,
          category: 'safety'
        }
      ],
      nextNodeId: 'fa-stabilitas-decision'
    },

    // ─────────────────────────────────────────────
    // DECISION: STABIL vs TIDAK STABIL
    // ─────────────────────────────────────────────
    'fa-stabilitas-decision': {
      id: 'fa-stabilitas-decision',
      type: 'decision',
      title: 'Apakah Pasien Hemodinamik STABIL?',
      description: 'Tentukan jalur tatalaksana berdasarkan kondisi hemodinamik saat ini.',
      warningLevel: 'critical',
      branches: [
        {
          id: 'fa-branch-tidak-stabil',
          title: '🔴 TIDAK STABIL — ada syok / edema paru / sinkop',
          description: 'Hipotensi, edema paru akut, penurunan kesadaran, atau iskemia aktif. → JALUR EMERGENCY: Kardioversi elektrik segera.',
          color: 'red',
          nextNodeId: 'fa-emergency-kardioversi',
          riskLevel: 'high'
        },
        {
          id: 'fa-branch-stabil',
          title: '🟢 STABIL — hemodinamik terjaga',
          description: 'TD baik, tidak sesak berat, tidak ada gangguan kesadaran. → Lanjut evaluasi EKG & konfirmasi diagnosis.',
          color: 'green',
          nextNodeId: 'fa-konfirmasi-diagnosis',
          riskLevel: 'low'
        }
      ]
    },

    // ─────────────────────────────────────────────
    // === JALUR EMERGENCY ===
    // ─────────────────────────────────────────────
    'fa-emergency-kardioversi': {
      id: 'fa-emergency-kardioversi',
      type: 'checklist',
      title: '🚨 EMERGENCY: Kardioversi Elektrik Segera (FA Tidak Stabil)',
      description: 'FA dengan gangguan hemodinamik berat = indikasi KARDIOVERSI ELEKTRIK SEGERA. Jangan tunda menunggu antikoagulan. Lakukan simultan dengan stabilisasi.',
      items: [
        {
          id: 'fa-ev-o2-iv',
          title: '⚡ Pasang O₂, IV Line, Monitor EKG + Saturasi',
          description: 'O₂ nasal kanul/masker sesuai kebutuhan. 2 jalur IV besar. Pasang monitor EKG kontinu. Siapkan defibrilator/kardioverter.',
          required: true,
          category: 'action'
        },
        {
          id: 'fa-ev-sedasi',
          title: '⚡ Sedasi Singkat (bila kondisi memungkinkan)',
          description: 'Midazolam 1–2 mg IV atau Propofol 0.5–1 mg/kgBB pelan IV. HANYA jika TD masih toleransi. Pada syok berat → skip sedasi, kardioversi segera.',
          required: true,
          category: 'medication'
        },
        {
          id: 'fa-ev-kardioversi',
          title: '⚡ Kardioversi Sinkronisasi (SYNC mode)',
          description: '• Pastikan mode SYNC aktif (tombol "Sync" di alat). • Energi awal: 120–200 J bifasik atau 200 J monofasik. • Paddle posisi anteroposterior > anterolateral. • Jika gagal: naikkan energi, ulangi.',
          required: true,
          category: 'action'
        },
        {
          id: 'fa-ev-cek-irama',
          title: '⚡ Cek EKG Pasca-Kardioversi',
          description: 'Irama sinus berhasil? → lanjut rawat inap & antikoagulan. Gagal → konsul SpJP/kardiologi segera. Catat waktu, energi yang digunakan, dan respons.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'fa-ev-antikoagulan-pasca',
          title: '⚡ Antikoagulan Post-Kardioversi (Wajib 4 Minggu)',
          description: 'Setelah konversi berhasil → lanjutkan antikoagulan minimal 4 minggu (risiko tromboemboli tetap ada meski irama kembali ke sinus). AVK (target INR 2–3) atau AKD.',
          required: true,
          category: 'medication'
        },
        {
          id: 'fa-ev-rujuk',
          title: '⚡ Rujuk SpJP / ICU / HCU Segera',
          description: 'Setelah stabilisasi → rawat di unit atau rujuk ke SpJP. Sertakan: rekaman EKG sebelum dan sesudah, obat yang diberikan, respons kardioversi.',
          required: true,
          category: 'documentation'
        }
      ]
    },

    // ─────────────────────────────────────────────
    // === JALUR STABIL ===
    // LANGKAH 2: KONFIRMASI DIAGNOSIS
    // ─────────────────────────────────────────────
    'fa-konfirmasi-diagnosis': {
      id: 'fa-konfirmasi-diagnosis',
      type: 'checklist',
      title: 'Langkah 2: Konfirmasi Diagnosis FA via EKG',
      description: 'Diagnosis FA wajib dikonfirmasi EKG. Tidak cukup hanya dari perabaan nadi.',
      items: [
        {
          id: 'fa-ekg-12-sadapan',
          title: '✅ Rekam EKG 12 Sadapan',
          description: '3 tanda utama FA di EKG: (1) Interval R-R ireguler, (2) Tidak ada gelombang P yang jelas → diganti gelombang fibrilasi (f) ireguler 350–600×/mnt, (3) Kompleks QRS sempit (kecuali ada BBB atau preeksitasi).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fa-hitung-laju',
          title: '✅ Hitung Laju Ventrikel',
          description: 'Hitung QRS dalam 6 detik (30 kotak besar) × 10. Kategori: Cepat >100×/mnt | Normal 60–100×/mnt | Lambat <60×/mnt. Catat hasil.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fa-preeksitasi',
          title: '✅ Singkirkan Preeksitasi (WPW syndrome)',
          description: 'Cari delta wave + interval PR pendek. FA + WPW = BAHAYA → obat yang blok NAV (digoksin, verapamil, diltiazem) DIKONTRAINDIKASIKAN → dapat menyebabkan VF. Pilih amiodaron atau kardioversi.',
          required: true,
          category: 'safety'
        },
        {
          id: 'fa-bedakan-kepak',
          title: '✅ Bedakan dengan Kepak Atrium (Flutter)',
          description: 'Flutter: irama REGULER, gelombang "gigi gergaji" di lead II/III/aVF, laju atrium 240–320×/mnt. FA: benar-benar ireguler. Tatalaksana mirip, tetapi penting dibedakan.',
          required: false,
          category: 'assessment'
        }
      ],
      nextNodeId: 'fa-klasifikasi-tipe'
    },

    // ─────────────────────────────────────────────
    // LANGKAH 3: KLASIFIKASI TIPE FA
    // ─────────────────────────────────────────────
    'fa-klasifikasi-tipe': {
      id: 'fa-klasifikasi-tipe',
      type: 'decision',
      title: 'Langkah 3: Klasifikasi Tipe FA (Berdasarkan Durasi)',
      description: 'Tipe FA menentukan pilihan strategi kendali irama dan risiko trombus. Tanyakan: kapan pertama kali gejala muncul? Apakah pernah sebelumnya?',
      warningLevel: 'info',
      branches: [
        {
          id: 'fa-pertama-kali',
          title: '🆕 FA Terdiagnosis Pertama Kali',
          description: 'Pasien pertama kali datang dengan FA. Belum tahu durasi. Tangani seperti persisten jika onset tidak pasti >48 jam.',
          color: 'blue',
          nextNodeId: 'fa-anamnesis-komorbid',
          riskLevel: 'medium'
        },
        {
          id: 'fa-paroksismal',
          title: '⚡ FA Paroksismal (berhenti sendiri ≤7 hari)',
          description: 'FA berhenti spontan, umumnya dalam 48 jam. Episode berulang namun selalu konversi spontan. Mekanisme dominan: fokus ektopik dari vena pulmonalis.',
          color: 'green',
          nextNodeId: 'fa-anamnesis-komorbid',
          riskLevel: 'low'
        },
        {
          id: 'fa-persisten',
          title: '⏱ FA Persisten (menetap >7 hari, perlu kardioversi)',
          description: 'Tidak berhenti sendiri. Butuh kardioversi farmakologis atau elektrik. Onset <48 jam: kardioversi relatif aman. Onset >48 jam atau tidak pasti: perlu antikoagulan 3 minggu dulu atau TEE.',
          color: 'orange',
          nextNodeId: 'fa-anamnesis-komorbid',
          riskLevel: 'medium'
        },
        {
          id: 'fa-persisten-lama',
          title: '📅 FA Persisten Lama (≥1 tahun, masih rencana kendali irama)',
          description: 'FA sudah >1 tahun tapi dokter dan pasien masih ingin usaha kembali ke irama sinus. Risiko rekurensi pasca kardioversi lebih tinggi.',
          color: 'red',
          nextNodeId: 'fa-anamnesis-komorbid',
          riskLevel: 'high'
        },
        {
          id: 'fa-permanen',
          title: '🔒 FA Permanen (dokter + pasien sepakat tidak coba irama sinus)',
          description: 'Strategi kendali irama tidak lagi diupayakan. Fokus: kendali laju + antikoagulan seumur hidup. Jika berubah pikiran → reklasifikasi ke persisten lama.',
          color: 'purple',
          nextNodeId: 'fa-anamnesis-komorbid',
          riskLevel: 'medium'
        }
      ]
    },

    // ─────────────────────────────────────────────
    // LANGKAH 4: ANAMNESIS KOMORBID & LAB
    // ─────────────────────────────────────────────
    'fa-anamnesis-komorbid': {
      id: 'fa-anamnesis-komorbid',
      type: 'checklist',
      title: 'Langkah 4: Anamnesis, Pemeriksaan Fisik & Lab Awal',
      description: 'Cari penyebab & faktor risiko FA. FA hampir selalu ada komorbid yang harus diobati bersamaan.',
      items: [
        {
          id: 'fa-gejala-EHRA',
          title: '✅ Nilai Gejala Pasien (Skor EHRA)',
          description: 'EHRA 1: Tidak bergejala. EHRA 2a: Gejala ringan (aktivitas normal tidak terganggu). EHRA 2b: Gejala sedang (ada keluhan, tapi OK). EHRA 3: Gejala berat (aktivitas terbatas). EHRA 4: Gejala tidak bisa beraktivitas. → Skor ≥2b: pertimbangkan kendali irama.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fa-faktor-pencetus',
          title: '✅ Tanyakan Faktor Pencetus',
          description: 'Apakah ada: Aktivitas berat sebelumnya? Infeksi/demam? Konsumsi alkohol berlebih? Kurang tidur? Stress? Obat-obatan (bronkodilator, dekongestan, kemoterapi)? Hipertiroid? Kafein?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fa-komorbid-utama',
          title: '✅ Identifikasi Komorbid Utama',
          description: 'Wajib tanyakan & obati: Hipertensi (faktor risiko stroke terbesar!), Gagal Jantung (HFrEF/HFpEF), Penyakit Jantung Koroner, Diabetes Melitus, Obesitas, OSA (ngorok+mengantuk?), PPOM, Penyakit Ginjal Kronik.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fa-lab-dasar',
          title: '✅ Lab Wajib: Darah Lengkap, Elektrolit, Fungsi Ginjal, Tiroid',
          description: '• Darah Lengkap: anemia, infeksi. • Kreatinin + eGFR: tentukan dosis antikoagulan. • Elektrolit (K⁺, Na⁺): koreksi gangguan elektrolit. • TSH: singkirkan hipertiroid sebagai penyebab FA. • Enzim jantung (bila ada nyeri dada): singkirkan SKA.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fa-ekokardiografi',
          title: '✅ Ekokardiografi Transtorakal (ETT)',
          description: 'Lakukan untuk nilai: ukuran atrium kiri, fungsi ventrikel (EF), kelainan katup (singkirkan FA valvular), tekanan paru. Jika rencana kardioversi dini + onset >48 jam → pertimbangkan TEE (cari trombus AAK).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fa-holter-hbpm',
          title: '(Opsional) Holter EKG untuk FA Paroksismal Asimtomatis',
          description: 'FA paroksismal sering tidak terdeteksi EKG sesaat. Holter 24–72 jam atau TTM meningkatkan deteksi. Wajib pada: pascastroke dengan EKG normal, pasien ≥65 tahun dengan palpitasi episodik.',
          required: false,
          category: 'assessment'
        }
      ],
      nextNodeId: 'fa-antikoagulan-decision'
    },

    // ─────────────────────────────────────────────
    // LANGKAH 5: ANTIKOAGULAN (CHA2DS2-VASc)
    // ─────────────────────────────────────────────
    'fa-antikoagulan-decision': {
      id: 'fa-antikoagulan-decision',
      type: 'decision',
      title: 'Langkah 5: Indikasi Antikoagulan — Hitung Skor CHA₂DS₂-VASc',
      description: 'Hitung skor CHA₂DS₂-VASc dulu. C=Gagal jantung(1), H=Hipertensi(1), A=Usia≥75th(2), D=DM(1), S₂=Stroke/TIA(2), V=Penyakit vaskular(1), A=Usia 65–74th(1), Sc=Jenis kelamin perempuan(1). Antikoagulan LEBIH PENTING dari kendali irama!',
      warningLevel: 'warning',
      branches: [
        {
          id: 'fa-skor-rendah',
          title: '🟢 Skor 0 (♂) atau 1 (♀) — Risiko Rendah',
          description: 'Tidak ada faktor risiko stroke selain jenis kelamin. Antikoagulan TIDAK dianjurkan. Pantau dan kontrol faktor risiko.',
          color: 'green',
          nextNodeId: 'fa-kendali-laju-irama',
          riskLevel: 'low'
        },
        {
          id: 'fa-skor-medium',
          title: '🟡 Skor 1 (♂) atau 2 (♀) — Risiko Sedang, Pertimbangkan',
          description: 'Pertimbangkan antikoagulan dengan diskusi risiko-manfaat bersama pasien. Hitung HAS-BLED untuk risiko perdarahan.',
          color: 'orange',
          nextNodeId: 'fa-antikoagulan-pilihan',
          riskLevel: 'medium'
        },
        {
          id: 'fa-skor-tinggi',
          title: '🔴 Skor ≥2 (♂) atau ≥3 (♀) — Risiko Tinggi, WAJIB Antikoagulan',
          description: 'Antikoagulan oral DIREKOMENDASIKAN. Manfaat pencegahan stroke jauh melebihi risiko perdarahan. Pilih AKD (dabigatran/rivaroksaban/apiksaban/edoksaban) lebih diutamakan dari warfarin.',
          color: 'red',
          nextNodeId: 'fa-antikoagulan-pilihan',
          riskLevel: 'high'
        }
      ]
    },

    // ─────────────────────────────────────────────
    // PILIHAN ANTIKOAGULAN
    // ─────────────────────────────────────────────
    'fa-antikoagulan-pilihan': {
      id: 'fa-antikoagulan-pilihan',
      type: 'checklist',
      title: 'Pemilihan & Pemberian Antikoagulan',
      description: 'AKD (Antikoagulan Direk) LEBIH DIUTAMAKAN dari warfarin pada FA non-valvular. Warfarin hanya wajib pada FA valvular (stenosis mitral berat / katup prostetik mekanik).',
      items: [
        {
          id: 'fa-akd-pilihan-utama',
          title: '✅ Pilih AKD sebagai Lini Pertama (FA Non-Valvular)',
          description: '• Dabigatran 2×150mg (atau 2×110mg bila usia >75th / risiko perdarahan tinggi). • Rivaroksaban 1×20mg (1×15mg bila eGFR 30–49). • Apiksaban 2×5mg (2×2.5mg bila ≥2 dari: usia ≥80th / BB ≤60kg / kreatinin ≥1.5). • Edoksaban 1×60mg (1×30mg bila eGFR 30–50 atau BB ≤60kg). Semua lebih aman dari warfarin untuk perdarahan intrakranial.',
          required: true,
          category: 'medication'
        },
        {
          id: 'fa-warfarin-indikasi',
          title: '✅ Warfarin: HANYA untuk FA Valvular atau Tidak Ada AKD',
          description: 'Wajib warfarin pada: Stenosis mitral sedang-berat, Katup prostetik mekanik. Target INR 2–3. Monitor INR tiap 1–4 minggu. Gunakan skor SAME-TT2R2: bila >2 → pindah ke AKD. AKD DILARANG pada katup prostetik.',
          required: true,
          category: 'medication'
        },
        {
          id: 'fa-has-bled',
          title: '✅ Hitung Skor HAS-BLED (Risiko Perdarahan)',
          description: 'H=Hipertensi tidak terkontrol(1), A=Ginjal/hati abnormal(1–2), S=Riwayat stroke(1), B=Riwayat perdarahan(1), L=INR labil(1), E=Usia >65th(1), D=Obat/alkohol(1–2). Skor ≥3: waspadai! BUKAN alasan stop antikoagulan, tapi koreksi faktor yang bisa diperbaiki.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fa-antiplatelet-bukan',
          title: '🚫 JANGAN Ganti Antikoagulan dengan Antiplatelet (Aspirin)',
          description: 'Aspirin atau plavix TIDAK efektif mencegah stroke pada FA dan risikonya perdarahan sama. Tidak ada indikasi antiplatelet untuk menggantikan antikoagulan di FA. (kecuali ada indikasi PJK bersamaan).',
          required: true,
          category: 'safety'
        },
        {
          id: 'fa-monitor-fungsi-ginjal',
          title: '✅ Monitor eGFR Minimal 1 Tahun Sekali',
          description: 'Semua pasien FA yang mendapat antikoagulan → cek kreatinin/eGFR minimal tiap tahun. Sesuaikan dosis AKD jika eGFR turun. AKD hindari bila eGFR <15 ml/mnt atau dialisis.',
          required: true,
          category: 'assessment'
        }
      ],
      nextNodeId: 'fa-kendali-laju-irama'
    },

    // ─────────────────────────────────────────────
    // LANGKAH 6: STRATEGI KENDALI LAJU vs IRAMA
    // ─────────────────────────────────────────────
    'fa-kendali-laju-irama': {
      id: 'fa-kendali-laju-irama',
      type: 'decision',
      title: 'Langkah 6: Pilih Strategi — Kendali Laju atau Kendali Irama?',
      description: 'Keduanya bisa dipilih tergantung kondisi pasien. KENDALI LAJU lebih aman pada pasien tua atau FA persisten lama. KENDALI IRAMA untuk pasien muda, simtomatis, atau FA baru.',
      warningLevel: 'info',
      branches: [
        {
          id: 'fa-pilih-laju',
          title: '🔵 Kendali Laju — Untuk FA Permanen / Usia Tua / Gejala Minimal',
          description: 'Usia >65th, penyakit arteri koroner, keluhan minimal (EHRA 1–2a), FA permanen, atau tidak cocok untuk kardioversi. Target: nadi istirahat <110×/mnt (longgar) atau <80×/mnt (ketat jika masih bergejala).',
          color: 'blue',
          nextNodeId: 'fa-kendali-laju-detail',
          riskLevel: 'low'
        },
        {
          id: 'fa-pilih-irama',
          title: '🟠 Kendali Irama — Untuk FA Muda / Bergejala / Onset Baru',
          description: 'Usia <65th, gejala berat (EHRA ≥2b), FA paroksismal pertama, FA dengan penyebab yang bisa dikoreksi, atau gagal jantung yang diinduksi takikardia. Tujuan: kembalikan ke irama sinus.',
          color: 'orange',
          nextNodeId: 'fa-kendali-irama-detail',
          riskLevel: 'medium'
        }
      ]
    },

    // ─────────────────────────────────────────────
    // DETAIL KENDALI LAJU
    // ─────────────────────────────────────────────
    'fa-kendali-laju-detail': {
      id: 'fa-kendali-laju-detail',
      type: 'checklist',
      title: 'Kendali Laju: Obat & Target',
      description: 'Target: nadi <110×/mnt saat istirahat (kendali longgar) dahulu. Jika masih bergejala → ketatkan ke <80×/mnt saat istirahat + <110×/mnt saat aktivitas.',
      items: [
        {
          id: 'fa-laju-beta-bloker',
          title: '✅ Pilihan Pertama: Penyekat Beta (Beta-Blocker)',
          description: '• Bisoprolol 1×2.5–10mg • Metoprolol 2×25–100mg • Carvedilol 2×3.125–25mg • Atenolol 1×25–100mg. DIUTAMAKAN pada: gagal jantung EF rendah, pasca-IMA, hipertiroid. Efek samping: bradikardia, bronkospasme (hati-hati PPOM).',
          required: true,
          category: 'medication'
        },
        {
          id: 'fa-laju-ccb-nondhp',
          title: '✅ Alternatif: CCB Non-Dihidropiridin (bila tidak ada GJ/LVEF turun)',
          description: '• Diltiazem 3×30mg–1×200mg SR • Verapamil 2×40mg–1×240mg SR. HANYA jika LVEF NORMAL. KONTRAINDIKASI bila gagal jantung dengan EF turun (memperburuk kontraktilitas).',
          required: true,
          category: 'medication'
        },
        {
          id: 'fa-laju-digoksin',
          title: '✅ Digoksin: Tambahan jika Monoterapi Tidak Cukup',
          description: '• Digoksin 1×0.125–0.25mg/hari. Kerja lambat, efektif hanya saat istirahat (tonus parasimpatis). JANGAN sebagai monoterapi pada pasien aktif. Monitor kadar digoksin jika eGFR turun.',
          required: false,
          category: 'medication'
        },
        {
          id: 'fa-laju-amiodaron',
          title: '(Hanya jika obat lain gagal) Amiodaron untuk Kendali Laju',
          description: 'Amiodaron tidak ideal jangka panjang untuk kendali laju karena efek samping banyak (tiroid, paru, hati). Gunakan sebagai cadangan terakhir jika kombinasi gagal.',
          required: false,
          category: 'medication'
        },
        {
          id: 'fa-laju-evaluasi',
          title: '✅ Evaluasi Kecukupan Kendali Laju (Uji Berjalan/Holter)',
          description: 'Nadi target <110×/mnt saat istirahat. Jika masih bergejala: uji berjalan 6 menit (target <110×/mnt setelah berjalan) atau Holter 24 jam. Pertimbangkan ablasi NAV + pacu jantung jika kendali laju tidak bisa dicapai dengan obat.',
          required: true,
          category: 'assessment'
        }
      ],
      nextNodeId: 'fa-monitoring-followup'
    },

    // ─────────────────────────────────────────────
    // DETAIL KENDALI IRAMA
    // ─────────────────────────────────────────────
    'fa-kendali-irama-detail': {
      id: 'fa-kendali-irama-detail',
      type: 'checklist',
      title: 'Kendali Irama: Kardioversi Farmakologis & Elektrik',
      description: 'Tujuan: kembalikan ke irama sinus. PENTING: Antikoagulan harus sudah diberikan dulu jika onset >48 jam atau tidak pasti, SEBELUM kardioversi!',
      items: [
        {
          id: 'fa-irama-antikoagulan-dulu',
          title: '🔑 Aturan Emas: Antikoagulan Sebelum Kardioversi',
          description: '• Onset FA <48 jam → kardioversi bisa dilakukan tanpa antikoagulan dulu (tetap lanjutkan pasca 4 minggu). • Onset ≥48 jam atau TIDAK PASTI → Pilih: (A) antikoagulan terapi 3 minggu DULU, atau (B) TEE untuk singkirkan trombus AAK, lalu kardioversi.',
          required: true,
          category: 'safety'
        },
        {
          id: 'fa-irama-kardioversi-elek',
          title: '✅ Kardioversi Elektrik (DC Cardioversion)',
          description: '• Mode SYNC aktif pada alat. • Energi 120–200 J bifasik (lebih disarankan) atau 200 J monofasik. • Posisi anteroposterior > anterolateral. • Premedikasi: amiodaron meningkatkan keberhasilan. • Berhasil pada 80–96% kasus FA persisten.',
          required: true,
          category: 'action'
        },
        {
          id: 'fa-irama-kardioversi-farm',
          title: '✅ Kardioversi Farmakologis (Obat untuk Konversi)',
          description: '• Amiodaron IV: 5 mg/kgBB dalam 1 jam → 50 mg/jam rumatan. Satu-satunya yang tersedia di Indonesia untuk IV. • Konversi terjadi beberapa jam setelah pemberian. • Propafenon oral 450–600mg ("pil dalam saku"/PILDAKU) jika FA paroksismal jarang dan TEVK normal.',
          required: true,
          category: 'medication'
        },
        {
          id: 'fa-irama-obat-antiaritmia',
          title: '✅ Obat Antiaritmia Jangka Panjang (Cegah Rekurensi)',
          description: 'Pilih berdasarkan kondisi jantung: • Tanpa penyakit jantung struktural: Propafenon atau Flekainid. • Dengan PJK/HT berat: Sotalol (perlu monitor QT). • Semua kondisi: Amiodaron (terakhir karena efek samping banyak). EVALUASI pro-aritmia sebelum mulai.',
          required: true,
          category: 'medication'
        },
        {
          id: 'fa-irama-ablasi-kateter',
          title: '✅ Ablasi Kateter (AFR/Krioablasi) — Pilihan Invasif',
          description: 'Dipertimbangkan jika: Simtomatis + gagal ≥1 obat antiaritmia, atau pasien muda paroksismal simtomatis yang pilih tanpa obat seumur hidup. Keberhasilan: 85% dalam 1 tahun, 52% dalam 5 tahun. Dilakukan di pusat SpJP berpengalaman.',
          required: false,
          category: 'action'
        },
        {
          id: 'fa-irama-antikoagulan-pasca',
          title: '🔑 Antikoagulan WAJIB 4 Minggu Pasca-Kardioversi',
          description: 'Meski irama sinus berhasil → fungsi mekanik atrium butuh waktu pulih (stunning effect). Risiko tromboemboli tetap ada 1–2% dalam 4 minggu pertama. Lanjutkan antikoagulan 4 minggu. Setelah itu: evaluasi CHA₂DS₂-VASc → jika ≥1(♂) atau ≥2(♀) → antikoagulan seumur hidup.',
          required: true,
          category: 'medication'
        }
      ],
      nextNodeId: 'fa-monitoring-followup'
    },

    // ─────────────────────────────────────────────
    // LANGKAH 7: MONITORING & FOLLOW-UP
    // ─────────────────────────────────────────────
    'fa-monitoring-followup': {
      id: 'fa-monitoring-followup',
      type: 'checklist',
      title: 'Langkah 7: Monitoring & Follow-Up Jangka Panjang',
      description: 'FA adalah kondisi kronik. Pengendalian jangka panjang sama pentingnya dengan tatalaksana akut. Pantau antikoagulan, komorbid, dan gejala setiap kunjungan.',
      items: [
        {
          id: 'fa-monitor-nadi-td',
          title: '✅ Setiap Kunjungan: Cek Nadi & Tekanan Darah',
          description: 'Evaluasi laju nadi saat istirahat (target <110×/mnt longgar atau <80×/mnt ketat). Tekanan darah terkontrol? Hipertensi tidak terkontrol = faktor risiko stroke DAN perdarahan.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'fa-monitor-antikoagulan',
          title: '✅ Evaluasi Kepatuhan & Keamanan Antikoagulan',
          description: 'Tanya: apakah rutin minum obat? Ada perdarahan (gusi, memar, BAB hitam, BAK kemerahan)? Jika warfarin: cek INR (target 2–3). Review interaksi obat baru. Jangan hentikan tanpa konsultasi.',
          required: true,
          category: 'medication'
        },
        {
          id: 'fa-monitor-komorbid',
          title: '✅ Kontrol Komorbid (Hipertensi, DM, GJ, Tiroid)',
          description: 'Komorbid yang tidak terkontrol → FA sulit dikontrol dan terus kambuh. Pantau: TD, gula darah, berat badan, fungsi tiroid (TSH), fungsi ginjal. Manajemen OSA dengan CPAP jika ada.',
          required: true,
          category: 'action'
        },
        {
          id: 'fa-monitor-gaya-hidup',
          title: '✅ Modifikasi Gaya Hidup (Turunkan Beban FA)',
          description: 'Penurunan BB 10–15kg pada obesitas → terbukti kurangi rekurensi FA. Batasi alkohol & kafein berlebih. Olahraga teratur (aerobik moderat). Berhenti merokok. Kelola stres.',
          required: true,
          category: 'action'
        },
        {
          id: 'fa-monitor-stroke-edukasi',
          title: '✅ Edukasi Tanda Stroke & Kapan ke IGD',
          description: 'Ajarkan pasien dan keluarga: tanda stroke (FAST — Face drooping, Arm weakness, Speech difficulty, Time to call). Jika ada: LANGSUNG ke IGD, jangan tunda. Pasien FA berisiko stroke 5× lebih tinggi.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'fa-rujuk-indikasi',
          title: '✅ Indikasi Rujuk ke SpJP',
          description: '• FA dengan gagal jantung yang memburuk. • FA refrakter (tidak terkontrol dengan 2 obat). • Pertimbangan ablasi kateter. • FA onset baru usia <50 th (singkirkan penyebab struktural). • Pascastroke untuk evaluasi antikoagulan optimal. • FA + WPW (preeksitasi).',
          required: true,
          category: 'action'
        },
        {
          id: 'fa-monitor-ekg-berkala',
          title: '✅ EKG Berkala & Holter jika Diperlukan',
          description: 'EKG minimal tiap 6–12 bulan, atau jika ada keluhan baru. Holter 24–72 jam jika curiga rekurensi FA asimtomatis (terutama pada strategi kendali irama). Evaluasi QT interval pada pengguna obat antiaritmia.',
          required: false,
          category: 'assessment'
        }
      ]
    }

  },
  references: [
    'Pedoman Tata Laksana Fibrilasi Atrium Non-Valvular Edisi Kedua 2019 – Perhimpunan Dokter Spesialis Kardiovaskular Indonesia (PERKI) / Indonesian Heart Rhythm Society (InaHRS)',
    '2020 ESC Guidelines for the Diagnosis and Management of Atrial Fibrillation. Eur Heart J. 2021;42:373-498',
    'January CT, et al. 2019 AHA/ACC/HRS Focused Update of the 2014 AHA/ACC/HRS Guideline for Management of Patients with Atrial Fibrillation. Circulation. 2019;140:e125-e151',
    'Registry FA Indonesia (OneAF) – Data 10 Rumah Sakit Indonesia, 615 Pasien',
    'RE-LY Trial (2009), ROCKET-AF Trial (2011), ARISTOTLE Trial (2011), ENGAGE AF-TIMI 48 Trial (2013) – Studi fase III AKD vs Warfarin'
  ]
};
