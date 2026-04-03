// ============================================================
// ANGINA PEKTORIS STABIL (APS) - PNPK Kemenkes 2023
// ============================================================
// Sumber: PNPK HK.01.07/MENKES/1419/2023 (PERKI)
// EBM: ESC Guidelines Chronic Coronary Syndrome 2019,
//      ACC/AHA Stable Ischemic Heart Disease 2012 (Updated),
//      COMPASS Trial 2018, ISCHEMIA Trial 2020
// ICD-10: I20.8 (Stable Angina), I25.1 (Atherosclerotic HD)
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const apsPathway: DynamicPathway = {
  diseaseId: 'angina-pektoris-stabil',
  diseaseName: 'Angina Pektoris Stabil (APS)',
  startNodeId: 'aps-anamnesis',
  nodes: {

    // NODE 1: ANAMNESIS & KLASIFIKASI NYERI
    'aps-anamnesis': {
      id: 'aps-anamnesis',
      type: 'checklist',
      title: 'Node 1: Anamnesis & Klasifikasi Nyeri Dada',
      description: 'PNPK 2023 BAB III-B: Anamnesis adalah landasan diagnosis APS. Klasifikasi nyeri dada menentukan pre-test probability (PTP) PJK.',
      items: [
        {
          id: 'aps-chest-pain-character',
          title: 'Karakteristik Nyeri Dada (3 Kriteria Angina Tipikal)',
          description: 'Tanyakan 3 kriteria: (1) Rasa tidak nyaman substernal dengan kualitas menekan/sesak/berat, (2) Diprovokasi aktivitas fisik atau stres emosional, (3) Hilang dengan istirahat atau nitrogliserin <10 menit. Angina TIPIKAL = 3/3. ATIPIKAL = 2/3. NON-ANGINAL = 0-1/3.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'aps-location-radiation',
          title: 'Lokasi & Penjalaran',
          description: 'Lokasi: substernal, dapat menjalar ke rahang bawah, bahu kiri, lengan hingga jari, area interskapular, epigastrium. Rasa ditekan/sesak/terbakar. Beberapa pasien tidak merasa nyeri tapi sesak napas atau fatigue (angina ekuivalen).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'aps-duration-pattern',
          title: 'Durasi & Pola Gejala',
          description: 'APS: durasi <10 menit, hilang dengan istirahat. Pola stabil minimal 4 minggu. Nyeri sangat singkat (<30 detik) bukan angina. Perburukan progresif atau nyeri istirahat: pertimbangkan SKA, ikuti PNPK SKA.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'aps-ccs-class',
          title: 'Klasifikasi CCS (Canadian Cardiovascular Society)',
          description: 'Kelas I: angina hanya aktivitas berat/cepat. Kelas II: sedikit limitasi aktivitas biasa (jalan >2 blok, naik >1 tangga). Kelas III: limitasi jelas aktivitas ringan. Kelas IV: tidak bisa aktivitas fisik apapun tanpa angina. Dokumentasikan kelas CCS untuk panduan terapi dan follow-up.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'aps-cardiovascular-rf',
          title: 'Faktor Risiko Kardiovaskular',
          description: 'Nilai: usia (pria >45th, wanita >55th), merokok aktif/pasif, hipertensi, DM, dislipidemia, obesitas (IMT >25), riwayat keluarga PJK prematur (<55th pria, <65th wanita), penyakit vaskular perifer. Semakin banyak FR, semakin tinggi clinical likelihood PJK.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'aps-aka-screening',
          title: 'Skrining Gejala SKA & Red Flag',
          description: 'WAJIB: Apakah nyeri dada memenuhi kriteria SKA? SKA = nyeri istirahat >20 menit, onset baru CCS III-IV, atau perburukan angina stabil dalam 4 minggu. Jika YA: HENTIKAN pathway ini, ikuti PNPK SKA. Juga skrining: syncope, edema tungkai, sesak napas progresif, palpitasi.',
          required: true,
          category: 'safety'
        },
        {
          id: 'aps-prior-diagnosis',
          title: 'Riwayat PJK & Pengobatan Sebelumnya',
          description: 'Riwayat IMA, IKP, BPAK, angiografi koroner, ekokardiografi sebelumnya. Obat kardiovaskular yang sedang dikonsumsi. Hasil uji latih atau pencitraan sebelumnya. Riwayat alergi (terutama aspirin, kontras iodium, statin).',
          required: true,
          category: 'assessment'
        }
      ],
      nextNodeId: 'aps-physical-exam'
    },

    // NODE 2: PEMERIKSAAN FISIK & DASAR
    'aps-physical-exam': {
      id: 'aps-physical-exam',
      type: 'checklist',
      title: 'Node 2: Pemeriksaan Fisik & Pemeriksaan Dasar',
      description: 'PNPK 2023 BAB III-B2&B3. Tidak ada tanda fisik spesifik APS. Tujuan: nilai komorbid, eksklusi penyebab lain nyeri dada, baseline sebelum terapi.',
      items: [
        {
          id: 'aps-vital-signs',
          title: 'Tanda Vital Lengkap',
          description: 'TD kedua lengan, nadi, frekuensi napas, SpO2, berat & tinggi badan (hitung IMT). Hipertensi: TD >140/90. Takikardia istirahat (>70 bpm): faktor risiko independen untuk luaran buruk APS (PNPK 2023).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'aps-heart-lung-exam',
          title: 'Pemeriksaan Jantung & Paru',
          description: 'Auskultasi: bising jantung (stenosis/regurgitasi aorta, HOCM), S3/S4 (disfungsi ventrikel), ronki (gagal jantung). Nilai JVP. Tanda-tanda penyakit jantung katup harus dieksklusi karena dapat menyerupai angina.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'aps-peripheral-vascular',
          title: 'Pemeriksaan Vaskular Perifer',
          description: 'Palpasi nadi perifer (femoralis, poplitea, dorsalis pedis, tibialis posterior). Bruit karotis/femoralis. Ankle-Brachial Index (ABI) jika ada kecurigaan PAD. Penyakit vaskular perifer meningkatkan clinical likelihood PJK.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'aps-ecg-rest',
          title: 'EKG 12-Lead Istirahat (Wajib)',
          description: 'PNPK 2023: EKG istirahat wajib pada semua pasien suspek APS. Nilai: gelombang Q (infark lama), perubahan ST/T (iskemia/strain), LBBB, LVH, aritmia, blok AV. EKG normal TIDAK menyingkirkan PJK. Perubahan gelombang Q/ST/T meningkatkan clinical likelihood PJK.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'aps-laboratory',
          title: 'Pemeriksaan Laboratorium Dasar',
          description: 'PNPK 2023: HbA1c (target <7% umum), profil lipid lengkap (LDL target <55 mg/dL pada risiko sangat tinggi), kreatinin & GFR, hemoglobin (anemia memperburuk angina), TSH (tiroid), CBC. Troponin jika ada kecurigaan SKA.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'aps-echo-rest',
          title: 'Ekokardiografi Istirahat',
          description: 'PNPK 2023: Ekokardiografi istirahat direkomendasikan untuk nilai fungsi sistolik (LVEF), kelainan gerak dinding (wall motion abnormality), dan eksklusi penyakit katup. KUNCI: LVEF <50% + angina tipikal = LANJUT LANGSUNG KE ANGIOGRAFI INVASIF tanpa perlu tes non-invasif lebih lanjut.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'aps-cxr',
          title: 'Rontgen Toraks (Jika Diindikasikan)',
          description: 'Rontgen toraks diindikasikan jika: sesak napas, kecurigaan gagal jantung, penyakit paru komorbid, atau sebelum operasi jantung. Nilai: kardiomegali (CTR >0.5), kongesti paru, efusi pleura, kalsifikasi aorta.',
          required: false,
          category: 'assessment'
        }
      ],
      nextNodeId: 'aps-lvef-decision'
    },

    // NODE 3: DECISION - LVEF
    'aps-lvef-decision': {
      id: 'aps-lvef-decision',
      type: 'decision',
      title: 'Decision: Hasil Ekokardiografi - LVEF & Angina Tipikal',
      description: 'PNPK 2023 BAB III-B3: Pasien dengan LVEF <50% dan angina tipikal memiliki risiko tinggi dan LANGSUNG dianjurkan angiografi koroner invasif.',
      warningLevel: 'warning',
      branches: [
        {
          id: 'aps-lvef-low',
          title: 'LVEF <50% + Angina Tipikal',
          description: 'Risiko tinggi komplikasi kardiovaskular. LANGSUNG anjurkan angiografi koroner invasif untuk evaluasi dan kemungkinan revaskularisasi. Tidak perlu melewati pemeriksaan non-invasif terlebih dahulu.',
          color: 'red',
          nextNodeId: 'aps-invasive-angiography',
          riskLevel: 'high'
        },
        {
          id: 'aps-lvef-normal',
          title: 'LVEF >=50% - Lanjut ke Penilaian PTP',
          description: 'Nilai Pre-Test Probability (PTP) berdasarkan karakteristik nyeri dada, usia, dan jenis kelamin untuk menentukan modalitas diagnostik selanjutnya.',
          color: 'blue',
          nextNodeId: 'aps-ptp-assessment',
          riskLevel: 'medium'
        }
      ]
    },

    // NODE 4: PTP ASSESSMENT
    'aps-ptp-assessment': {
      id: 'aps-ptp-assessment',
      type: 'checklist',
      title: 'Node 4: Penilaian Pre-Test Probability (PTP) PJK',
      description: 'PNPK 2023 BAB III-B4: PTP dikalkulasi berdasarkan usia, jenis kelamin, dan tipe nyeri dada (sesuai Tabel 3, ESC 2019). PTP menentukan jalur pemeriksaan diagnostik selanjutnya.',
      items: [
        {
          id: 'aps-ptp-age-sex-pain',
          title: 'Hitung PTP Berdasarkan Usia, JK, & Tipe Nyeri',
          description: 'Gunakan Tabel PTP ESC 2019 (PNPK Tabel 3). Contoh PTP tinggi: pria usia 65-69 tahun dengan angina tipikal ~73%. PTP rendah: wanita usia 45-49 tahun dengan nyeri non-anginal ~3%. PTP juga berlaku untuk dispnea saja. Catat nilai PTP perkiraan pasien.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'aps-clinical-likelihood-modifiers',
          title: 'Modifikasi Clinical Likelihood',
          description: 'PTP dapat DITINGKATKAN oleh: faktor risiko PJK banyak, perubahan EKG (Q/ST/T), disfungsi LV sugestif iskemia, skor kalsium CT positif, uji latih abnormal. PTP dapat DITURUNKAN oleh: EKG uji latih normal, skor kalsium Agatston=0 (risiko KV tahunan <1%).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'aps-ptp-ebm-note',
          title: '[EBM] Studi PROMISE 2019: Re-klasifikasi PTP',
          description: 'PNPK 2023 menggunakan PTP ESC 2019 (lebih rendah dari ESC 2013). Studi PROMISE: 50% pasien yang sebelumnya risiko sedang di-reklasifikasi menjadi PTP <15%. Risiko tahunan pasien PTP <15% adalah <1%. Ini mengurangi kebutuhan pemeriksaan invasif yang tidak perlu.',
          required: false,
          category: 'documentation'
        }
      ],
      nextNodeId: 'aps-ptp-stratification'
    },

    // NODE 5: DECISION - PTP STRATIFICATION
    'aps-ptp-stratification': {
      id: 'aps-ptp-stratification',
      type: 'decision',
      title: 'Decision: Stratifikasi PTP untuk Pemilihan Modalitas Diagnostik',
      description: 'PNPK 2023 BAB III-C: Pemilihan pemeriksaan diagnostik berdasarkan nilai PTP. Tujuan: konfirmasi PJK dan stratifikasi risiko kejadian kardiovaskular.',
      warningLevel: 'info',
      branches: [
        {
          id: 'aps-ptp-low',
          title: 'PTP Rendah (<=5%) - Probabilitas Sangat Rendah',
          description: 'Kemungkinan besar bukan PJK. Tidak perlu pemeriksaan diagnostik tambahan untuk APS. Cari penyebab nyeri dada non-kardiak. Nilai dan koreksi faktor risiko.',
          color: 'green',
          nextNodeId: 'aps-low-ptp-management',
          riskLevel: 'low'
        },
        {
          id: 'aps-ptp-low-intermediate',
          title: 'PTP Rendah-Sedang (5-15%) - Pertimbangkan Diagnostik',
          description: 'Pemeriksaan diagnostik dapat dipertimbangkan setelah menilai clinical likelihood. Pilihan utama: CCTA (sensitivitas tinggi untuk PTP rendah). Nilai ulang faktor risiko dan modifikasi clinical likelihood.',
          color: 'blue',
          nextNodeId: 'aps-noninvasive-testing',
          riskLevel: 'low'
        },
        {
          id: 'aps-ptp-intermediate',
          title: 'PTP Sedang (15-85%) - Pemeriksaan Non-Invasif',
          description: 'Kelompok yang paling bermanfaat dari pemeriksaan non-invasif. Pilih modalitas berdasarkan ketersediaan fasilitas, karakteristik pasien, dan expertise lokal.',
          color: 'orange',
          nextNodeId: 'aps-noninvasive-testing',
          riskLevel: 'medium'
        },
        {
          id: 'aps-ptp-high',
          title: 'PTP Tinggi (>85%) + Gejala Refrakter/Risiko Tinggi',
          description: 'Probabilitas PJK sangat tinggi. Angiografi koroner invasif dapat langsung dipertimbangkan. Terapi medis optimal (TMO) dimulai segera.',
          color: 'red',
          nextNodeId: 'aps-invasive-angiography',
          riskLevel: 'high'
        }
      ]
    },

    // NODE 6: LOW PTP MANAGEMENT
    'aps-low-ptp-management': {
      id: 'aps-low-ptp-management',
      type: 'checklist',
      title: 'Node 6: Tatalaksana PTP Rendah (<=5%)',
      description: 'Kemungkinan besar bukan PJK obstruktif. Fokus pada penyebab lain nyeri dada dan koreksi faktor risiko kardiovaskular.',
      items: [
        {
          id: 'aps-non-cardiac-eval',
          title: 'Evaluasi Penyebab Nyeri Dada Non-Kardiak',
          description: 'Pertimbangkan: GERD/esofagitis (nyeri terbakar, berhubungan makan, respons PPI), muskuloskeletal (costochondritis - nyeri tekan), anxiety/panic disorder, pleuritis, penyakit paru. Evaluasi sesuai klinis.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'aps-rf-correction-low',
          title: 'Koreksi Faktor Risiko Kardiovaskular',
          description: 'Walaupun PTP rendah, koreksi FR tetap penting untuk pencegahan primer. Target: TD <140/90, LDL sesuai skor risiko, HbA1c <7%, berhenti merokok, IMT normal, aktivitas fisik rutin.',
          required: true,
          category: 'action'
        },
        {
          id: 'aps-followup-low',
          title: 'Rencana Follow-Up',
          description: 'Kontrol 1-3 bulan jika gejala persisten. Jika gejala berubah (onset baru, perburukan, gejala istirahat): re-evaluasi PTP dan pertimbangkan pemeriksaan diagnostik. Edukasi tanda bahaya.',
          required: true,
          category: 'documentation'
        }
      ]
    },

    // NODE 7: NON-INVASIVE TESTING SELECTION
    'aps-noninvasive-testing': {
      id: 'aps-noninvasive-testing',
      type: 'checklist',
      title: 'Node 7: Pemilihan Modalitas Diagnostik Non-Invasif',
      description: 'PNPK 2023 BAB III-C: Pemilihan berdasarkan PTP, karakteristik pasien, & ketersediaan fasilitas. Sensitivitas/Spesifisitas berbagai modalitas tersedia di Tabel 5 PNPK 2023.',
      items: [
        {
          id: 'aps-ecg-stress-test',
          title: 'Uji Latih EKG (Exercise Stress Test / EST)',
          description: 'INDIKASI: PTP 15-85%, kemampuan berolahraga adekuat, EKG baseline normal. KONTRAINDIKASI diagnostik: LBBB, irama pacu jantung, WPW, depresi ST >=1mm istirahat, digitalis. Sensitivitas 45-50%, Spesifisitas 85-90%. Hitung Duke Treadmill Score (DTS): >5=risiko rendah, -10 s.d 4=sedang, <-11=tinggi. [EBM] Rekomendasi Kelas I, Level C (PNPK 2023).',
          required: false,
          category: 'assessment'
        },
        {
          id: 'aps-stress-echo',
          title: 'Stress Echocardiography',
          description: 'INDIKASI: EKG baseline abnormal, PTP sedang-tinggi. Stres: latihan (treadmill/sepeda) atau dobutamin. Nilai kelainan gerak dinding (wall motion abnormality). Sensitivitas 79-83%, Spesifisitas 82-86%. Risiko TINGGI: >=3 dari 16 segmen hipokinesia/akinesia. [EBM] Rekomendasi Kelas I, Level B.',
          required: false,
          category: 'assessment'
        },
        {
          id: 'aps-spect-pet',
          title: 'Myocardial Perfusion Imaging (SPECT/PET)',
          description: 'INDIKASI: PTP sedang, kemampuan latihan terbatas. Agen Tc-99m, stres latihan atau adenosin/dobutamin. SPECT: Sensitivitas 73-92%, Spesifisitas 63-87%. Risiko TINGGI: area iskemia >=10% miokardium. [EBM] Vasodilator Stress PET lebih akurat (Se 81-97%, Sp 74-91%).',
          required: false,
          category: 'assessment'
        },
        {
          id: 'aps-ccta',
          title: 'Coronary CT Angiography (CCTA)',
          description: 'INDIKASI: PTP rendah-sedang (15-50%), belum didiagnosis PJK sebelumnya. KONTRAINDIKASI: aritmia ireguler, kalsifikasi koroner ekstensif, obesitas signifikan, kesulitan menahan napas. Sensitivitas 95-99%, Spesifisitas 64-83%. CAD-RADS 4-5: risiko tinggi. Skor Kalsium Agatston=0: risiko tahunan <1%. [EBM] Rekomendasi Kelas I, Level B.',
          required: false,
          category: 'assessment'
        },
        {
          id: 'aps-stress-cmr',
          title: 'Stress Cardiac MRI (CMR)',
          description: 'INDIKASI: PTP sedang-tinggi, gambar ekokardiografi suboptimal. Adenosin (perfusi) atau dobutamin (wall motion). MRI 3 Tesla lebih akurat dari 1.5 Tesla. Risiko TINGGI: >=2 dari 16 segmen defek perfusi atau >=3 segmen disfungsi. Sensitivitas 67-94%, Spesifisitas 61-91%.',
          required: false,
          category: 'assessment'
        },
        {
          id: 'aps-calcium-scoring',
          title: 'Coronary Calcium Scoring (CCS/Skor Agatston)',
          description: 'CATATAN: CCS tidak direkomendasikan untuk identifikasi PJK obstruktif (Kelas III, PNPK 2023), namun berguna untuk modifikasi clinical likelihood. Agatston=0: risiko sangat rendah (<1%/tahun). Agatston >300: statin intensitas tinggi + Aspirin 81mg. [EBM] CAC-DRS digunakan untuk komunikasi temuan dan panduan terapi statin.',
          required: false,
          category: 'assessment'
        }
      ],
      nextNodeId: 'aps-risk-stratification'
    },

    // NODE 8: DECISION - RISK STRATIFICATION
    'aps-risk-stratification': {
      id: 'aps-risk-stratification',
      type: 'decision',
      title: 'Decision: Stratifikasi Risiko Kejadian Kardiovaskular',
      description: 'PNPK 2023 BAB III-E & Tabel 12: Stratifikasi risiko berdasarkan hasil pemeriksaan non-invasif menentukan apakah pasien perlu angiografi invasif atau dapat dikelola dengan TMO.',
      warningLevel: 'warning',
      branches: [
        {
          id: 'aps-high-risk',
          title: 'Risiko Tinggi (Mortalitas/IMA >3%/tahun)',
          description: 'Salah satu dari: LVEF <35%, area iskemia >10% pada SPECT/PET, >=3 segmen hipokinesia stress echo, DTS <-11, 3VD proksimal/LM >50% pada CCTA, FFR <=0.8. Anjurkan angiografi koroner invasif segera.',
          color: 'red',
          nextNodeId: 'aps-invasive-angiography',
          riskLevel: 'high'
        },
        {
          id: 'aps-intermediate-risk',
          title: 'Risiko Sedang (Mortalitas/IMA 1-3%/tahun)',
          description: 'LVEF 35-49%, area iskemia 5-9.9%, DTS -10 s.d. 4, 1 VD atau stenosis sedang 50-69% >2 arteri. Pilihan: TMO selama 3 bulan ATAU angiografi invasif (diskusi dengan pasien).',
          color: 'orange',
          nextNodeId: 'aps-optimal-medical-therapy',
          riskLevel: 'medium'
        },
        {
          id: 'aps-low-risk',
          title: 'Risiko Rendah (Mortalitas/IMA <1%/tahun)',
          description: 'DTS >5, area iskemia <5%, tidak ada WMA saat latihan, tidak ada stenosis >50% pada CCTA, Agatston=0. Tatalaksana dengan TMO. Revaskularisasi tidak meningkatkan survival pada kelompok ini.',
          color: 'green',
          nextNodeId: 'aps-optimal-medical-therapy',
          riskLevel: 'low'
        }
      ]
    },

    // NODE 9: OPTIMAL MEDICAL THERAPY
    'aps-optimal-medical-therapy': {
      id: 'aps-optimal-medical-therapy',
      type: 'checklist',
      title: 'Node 9: Terapi Medis Optimal (TMO)',
      description: 'PNPK 2023 BAB III-F&G: Kombinasi minimal 1 obat anti-angina + obat pencegahan. Target: kontrol gejala, cegah SKA, dan perbaiki prognosis.',
      items: [
        {
          id: 'aps-nitrat-cepat',
          title: 'Nitrat Kerja Cepat (Terapi Angina Akut) - Kelas I, Level B',
          description: 'Nitrogliserin sublingual 0.3-0.6mg setiap 5 menit, maks 1.2mg dalam 15 menit. Atau Isosorbid dinitrat 5mg sublingual. EDUKASI PASIEN: duduk saat pakai (berdiri=sinkop, berbaring=meningkat venous return). Nitrogliserin spray kerja lebih cepat. KONTRAINDIKASI ABSOLUT: kombinasi dengan inhibitor PDE5 (sildenafil/tadalafil).',
          required: true,
          category: 'medication'
        },
        {
          id: 'aps-beta-blocker',
          title: 'Penyekat Beta (Lini Pertama Anti-Angina) - Kelas I, Level A',
          description: 'Direkomendasikan sebagai terapi antiangina lini pertama. Target HR istirahat 55-60 bpm. Pilihan: Bisoprolol 2.5-10mg/hari, Metoprolol 25-100mg 2x/hari, Atenolol 25-100mg/hari. Pada post-IMA atau gagal jantung: tambahkan manfaat prognostik. HINDARI kombinasi dengan verapamil/diltiazem (risiko bradikardia dan blok AV).',
          required: true,
          category: 'medication'
        },
        {
          id: 'aps-ccb',
          title: 'Calcium Channel Blocker (CCB) - Lini Pertama atau Tambahan',
          description: 'DHP: Amlodipine 5-10mg/hari (paruh panjang, toleransi baik) atau Nifedipine extended-release 30-90mg/hari. Non-DHP: Verapamil 80-360mg/hari atau Diltiazem 60-360mg/hari (keduanya menurunkan HR). PNPK 2023: CCB lini pertama jika beta-blocker dikontraindikasikan. Efek samping DHP: edema tungkai, sakit kepala. [EBM] Uji ACTION: Nifedipine ER aman untuk APS (Kelas I, Level A).',
          required: true,
          category: 'medication'
        },
        {
          id: 'aps-nitrat-panjang',
          title: 'Nitrat Kerja Panjang (Lini Kedua) - Kelas IIa, Level B',
          description: 'Isosorbid mononitrat 20-60mg 2x/hari (dengan interval bebas nitrat 8-10 jam untuk cegah toleransi) atau Isosorbid dinitrat extended-release 40mg 2x/hari. PENTING: interval bebas nitrat wajib untuk cegah toleransi. Berikan jika beta-blocker/CCB dikontraindikasikan atau tidak adekuat.',
          required: false,
          category: 'medication'
        },
        {
          id: 'aps-second-line-antiangina',
          title: 'Anti-Angina Lini Kedua - Kelas IIa, Level B',
          description: 'Pertimbangkan jika gejala tidak terkontrol dengan beta-blocker/CCB/nitrat: (1) Ivabradine 5-7.5mg 2x/hari (irama sinus, HR >60 bpm), (2) Nicorandil 10-20mg 2x-3x/hari, (3) Ranolazine 500-1000mg 2x/hari (tidak ubah HR/TD), (4) Trimetazidine 35mg 2x/hari (hindari pada Parkinson). [EBM] PNPK 2023 merekomendasikan ranolazine/trimetazidine untuk pasien HR rendah/TD rendah (Kelas IIb, Level C).',
          required: false,
          category: 'medication'
        },
        {
          id: 'aps-antiplatelet',
          title: 'Antiplatelet - Aspirin (Pencegahan) - Kelas I, Level A',
          description: 'Aspirin 75-100mg/hari direkomendasikan pasca IMA atau revaskularisasi. Pada pasien tanpa riwayat IMA/revaskularisasi tapi ada bukti definitif PJK: Aspirin 75-100mg/hari dapat dipertimbangkan (Kelas IIb, Level C). Clopidogrel 75mg/hari sebagai alternatif jika intoleransi aspirin. TAMBAHKAN PPI jika risiko perdarahan GI tinggi. [EBM] COMPASS: Rivaroxaban 2.5mg 2x/hari + Aspirin menurunkan MACE vs Aspirin saja.',
          required: true,
          category: 'medication'
        },
        {
          id: 'aps-statin',
          title: 'Statin (Wajib Semua Pasien APS) - Kelas I, Level A',
          description: 'Semua pasien APS = risiko sangat tinggi. Target LDL <55 mg/dL atau penurunan >=50% dari baseline. Pilihan intensitas tinggi: Rosuvastatin 20-40mg/hari atau Atorvastatin 40-80mg/hari. Jika target LDL tidak tercapai: tambahkan Ezetimibe 10mg/hari (Kelas I, Level B). Jika masih tidak tercapai: inhibitor PCSK9 (Kelas I, Level A). [EBM] Penurunan LDL sebelum IKP terbukti mengurangi kejadian periprosedural.',
          required: true,
          category: 'medication'
        },
        {
          id: 'aps-acei-arb',
          title: 'ACEI / ARB (Jika Ada Komorbid) - Kelas I, Level A',
          description: 'WAJIB jika ada: gagal jantung, hipertensi, DM, atau LVEF <=40%. Pilihan: Ramipril 2.5-10mg/hari, Perindopril 4-8mg/hari, Lisinopril 5-40mg/hari. Pertimbangkan pada semua pasien APS risiko sangat tinggi (Kelas IIa, Level A). ARB sebagai alternatif jika ACEI tidak ditoleransi. Spironolakton/Eplerenone jika: post-IMA + DM + gagal jantung + LVEF <=40% tanpa disfungsi renal berat.',
          required: false,
          category: 'medication'
        }
      ],
      nextNodeId: 'aps-lifestyle-modification'
    },

    // NODE 10: LIFESTYLE MODIFICATION
    'aps-lifestyle-modification': {
      id: 'aps-lifestyle-modification',
      type: 'checklist',
      title: 'Node 10: Modifikasi Gaya Hidup & Rehabilitasi',
      description: 'PNPK 2023 BAB III-F1: Rehabilitasi kardiovaskular berbasis latihan terbukti menurunkan mortalitas total dan angka hospitalisasi PJK.',
      items: [
        {
          id: 'aps-smoking-cessation',
          title: 'Berhenti Merokok (Prioritas Tertinggi)',
          description: 'Berhenti merokok menurunkan mortalitas 36% pasca IMA. Terapi: konseling intensif, Nicotine Replacement Therapy (aman untuk PJK), Bupropion atau Varenicline (gunakan hati-hati - ada laporan sedikit peningkatan KV). Hindari paparan asap rokok pasif.',
          required: true,
          category: 'action'
        },
        {
          id: 'aps-diet-therapy',
          title: 'Diet Sehat Kardiovaskular',
          description: 'Target: IMT 18.5-23 kg/m2, lingkar perut <90cm (pria) / <80cm (wanita). Pola diet: tinggi serat (30-45g/hari), buah >=200g/hari, sayur >=200g/hari, ikan 1-2x/minggu (ikan berlemak). Batasi: lemak jenuh <10% kalori, lemak trans <1%, natrium <2300mg/hari, gula <10% kalori. Pilih minyak zaitun/kanola. PNPK 2023: suplementasi rutin tidak diperlukan jika diet sudah baik.',
          required: true,
          category: 'action'
        },
        {
          id: 'aps-physical-activity',
          title: 'Aktivitas Fisik & Rehabilitasi Jantung',
          description: 'Latihan aerobik intensitas sedang-berat >=3x/minggu, 30 menit/sesi. Program rehabilitasi jantung formal direkomendasikan untuk semua pasien PJK termasuk angina kronis. Pada PJK signifikan bukan kandidat revaskularisasi: latihan fisik sebagai alternatif perbaiki gejala dan prognosis. [EBM] Meta-analisis: rehabilitasi jantung menurunkan mortalitas KV 26% dan hospitalisasi 18%.',
          required: true,
          category: 'action'
        },
        {
          id: 'aps-comorbid-management',
          title: 'Manajemen Komorbid & Faktor Risiko',
          description: 'Hipertensi: target <140/90 mmHg (DM: <140/85). DM: target HbA1c <7% (individual), SGLT2i/GLP-1 RA dipertimbangkan untuk manfaat KV tambahan. Dislipidemia: LDL <55 mg/dL. Obesitas: penurunan BB 5-10% memperbaiki profil KV. Sleep apnea: skrining terutama pada pasien obesitas.',
          required: true,
          category: 'action'
        },
        {
          id: 'aps-sexual-activity',
          title: 'Aktivitas Seksual & Disfungsi Ereksi',
          description: 'Aktivitas seksual setara 6 MET - umumnya aman pada angina ringan atau pasca revaskularisasi. Disfungsi ereksi lebih sering pada PJK (disfungsi endotel). Inhibitor PDE5 (sildenafil, tadalafil) efektif dan aman pada risiko rendah-sedang. KONTRAINDIKASI ABSOLUT: kombinasi PDE5 inhibitor + nitrat (risiko hipotensi fatal). Jika pasien konsumsi keduanya dan nyeri dada: JANGAN beri nitrat 24 jam (sildenafil/vardenafil) atau 48 jam (tadalafil).',
          required: true,
          category: 'documentation'
        },
        {
          id: 'aps-psychosocial',
          title: 'Faktor Psikososial',
          description: 'Skrining depresi dan kecemasan (umum pada PJK). Nilai aspek psikososial: stres kerja, dukungan sosial. Jika ada depresi/ansietas signifikan: rujuk untuk psikoterapi dan/atau farmakoterapi. [EBM] Depresi tidak ditangani meningkatkan risiko MACE 2-3x lipat pada pasien PJK.',
          required: false,
          category: 'assessment'
        }
      ],
      nextNodeId: 'aps-treatment-response'
    },

    // NODE 11: DECISION - TREATMENT RESPONSE
    'aps-treatment-response': {
      id: 'aps-treatment-response',
      type: 'decision',
      title: 'Decision: Evaluasi Respons TMO (2-4 Minggu Setelah Inisiasi)',
      description: 'PNPK 2023: Evaluasi respons terapi diindikasikan 2-4 minggu setelah inisiasi obat. Jika gejala tidak terkontrol dengan TMO, pertimbangkan eskalasi atau angiografi.',
      warningLevel: 'info',
      branches: [
        {
          id: 'aps-symptoms-controlled',
          title: 'Gejala Terkontrol - TMO Berhasil',
          description: 'Angina terkendali, kualitas hidup baik. Lanjutkan TMO jangka panjang. Follow-up rutin 3-6 bulan. Evaluasi target terapi (TD, LDL, HbA1c, HR).',
          color: 'green',
          nextNodeId: 'aps-followup-plan',
          riskLevel: 'low'
        },
        {
          id: 'aps-symptoms-partial',
          title: 'Gejala Parsial Terkontrol - Eskalasi TMO',
          description: 'Angina masih ada tapi berkurang. Optimasi dosis obat lini pertama, tambahkan obat lini kedua (ivabradine, nicorandil, ranolazine, trimetazidine). Pertimbangkan angiografi jika risiko sedang.',
          color: 'orange',
          nextNodeId: 'aps-optimal-medical-therapy',
          riskLevel: 'medium'
        },
        {
          id: 'aps-symptoms-refractory',
          title: 'Gejala Refrakter - TMO Gagal',
          description: 'Angina persisten meskipun TMO optimal. Kualitas hidup terganggu. Ini adalah indikasi kuat untuk angiografi koroner invasif dan revaskularisasi.',
          color: 'red',
          nextNodeId: 'aps-invasive-angiography',
          riskLevel: 'high'
        }
      ]
    },

    // NODE 12: INVASIVE ANGIOGRAPHY
    'aps-invasive-angiography': {
      id: 'aps-invasive-angiography',
      type: 'checklist',
      title: 'Node 12: Angiografi Koroner Invasif',
      description: 'PNPK 2023 BAB III-D: Indikasi angiografi invasif pada APS. Tujuan: konfirmasi diagnosis dan/atau panduan revaskularisasi.',
      items: [
        {
          id: 'aps-angio-indication',
          title: 'Konfirmasi Indikasi Angiografi',
          description: 'Indikasi valid: (1) Stratifikasi risiko non-invasif menunjukkan risiko tinggi, (2) LVEF <50% + angina tipikal, (3) PTP tinggi + gejala refrakter/berat, (4) TMO gagal, (5) Hasil pemeriksaan non-invasif tidak konklusif, (6) Pasien menghendaki revaskularisasi setelah informed consent.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'aps-angio-contraindication',
          title: 'Eksklusi Kontraindikasi Angiografi',
          description: 'TIDAK dilakukan jika: pasien menolak prosedur invasif, bukan kandidat IKP/BPAK, komorbiditas berat (expected mortality prosedur > manfaat), tidak ada rencana revaskularisasi karena pertimbangan klinis. Nilai fungsi ginjal (kontras) dan alergi kontras iodium.',
          required: true,
          category: 'safety'
        },
        {
          id: 'aps-ffr-assessment',
          title: 'Penilaian FFR/iFR Intrakoroner',
          description: 'PNPK 2023: FFR (Fractional Flow Reserve) membantu evaluasi stenosis 50-90% (stenosis fungsional). FFR <=0.8 atau iFR <=0.89 = signifikan secara hemodinamik, pertimbangkan revaskularisasi. FFR >0.8 = TMO lebih baik dari revaskularisasi. Tidak diperlukan untuk stenosis >90% (secara praktis pasti FFR <=0.8). [EBM] Uji DEFER, FAME, FAME2: FFR-guided PCI superior vs angiography-guided.',
          required: false,
          category: 'assessment'
        },
        {
          id: 'aps-ivus-oct',
          title: 'Pencitraan Intrakoroner (IVUS/OCT)',
          description: 'IVUS: nilai ukuran dan komposisi plak, panduan ekspansi stent. OCT: resolusi tinggi (<10 mikron), nilai komponen superfisial plak (fibrous cap, plak lipid). IVUS lebih baik dari FFR untuk karakterisasi lesi. IVUS/OCT digunakan di pusat tersier untuk kasus kompleks (LM, bifurkasi, kalsifikasi berat).',
          required: false,
          category: 'assessment'
        },
        {
          id: 'aps-pre-angio-prep',
          title: 'Persiapan Pra-Angiografi',
          description: 'Hidrasi adekuat (terutama pasien DM dan GFR rendah - N-acetylcysteine atau sodium bicarbonate). TMO dimulai atau dilanjutkan. Pre-loading Aspirin + Clopidogrel 600mg (jika IKP direncanakan). Nilai risiko perdarahan. Akses radial lebih dipilih (risiko komplikasi lebih rendah).',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'aps-revascularization-decision'
    },

    // NODE 13: DECISION - REVASCULARIZATION
    'aps-revascularization-decision': {
      id: 'aps-revascularization-decision',
      type: 'decision',
      title: 'Decision: Strategi Revaskularisasi Berdasarkan Angiografi',
      description: 'PNPK 2023 BAB III-K & Tabel 17: Pemilihan IKP vs BPAK berdasarkan anatomi koroner, SYNTAX Score, dan kondisi pasien.',
      warningLevel: 'warning',
      branches: [
        {
          id: 'aps-ikp-candidate',
          title: 'Kandidat IKP (Intervensi Koroner Perkutan)',
          description: '1-2 vessel disease, SYNTAX Score rendah (<22), lesi anatomis sesuai untuk stent, pasien menolak bedah, risiko bedah tinggi. Atau: stenosis LM dengan SYNTAX low-intermediate. DES generasi terbaru direkomendasikan.',
          color: 'blue',
          nextNodeId: 'aps-pci-protocol',
          riskLevel: 'medium'
        },
        {
          id: 'aps-bpak-candidate',
          title: 'Kandidat BPAK (Bedah Pintas Arteri Koroner)',
          description: '3 vessel disease proksimal, LM disease, SYNTAX Score tinggi (>32), kombinasi dengan katup jantung, DM dengan multivessel disease (SYNTAX >22). Cangkok arteri mamaria interna ke LAD adalah teknik standar (survival lebih baik).',
          color: 'purple',
          nextNodeId: 'aps-cabg-protocol',
          riskLevel: 'high'
        },
        {
          id: 'aps-tmo-only',
          title: 'TMO Saja - Tidak Perlu Revaskularisasi',
          description: 'FFR >0.8 pada semua lesi, atau lesi non-signifikan secara fungsional, atau pasien risiko rendah yang stabil. [EBM] ISCHEMIA Trial 2020: pada PJK stabil dengan iskemia sedang-berat terkontrol, TMO tidak inferior vs revaskularisasi untuk mortalitas dan IMA. Optimasi TMO.',
          color: 'green',
          nextNodeId: 'aps-followup-plan',
          riskLevel: 'low'
        }
      ]
    },

    // NODE 14: PCI PROTOCOL
    'aps-pci-protocol': {
      id: 'aps-pci-protocol',
      type: 'checklist',
      title: 'Node 14: Protokol IKP (Intervensi Koroner Perkutan)',
      description: 'PNPK 2023 BAB III-I1: Panduan stent dan antiplatelet pasca IKP pada APS.',
      items: [
        {
          id: 'aps-des-recommendation',
          title: 'Stent: DES Generasi Terbaru Direkomendasikan - Kelas I',
          description: 'DES generasi kedua (thin-strut, biodegradable polymer) direkomendasikan pada semua APS yang tidak memiliki kontraindikasi DAPT jangka pendek. DES menurunkan restenosis dibanding BMS. Insiden late stent thrombosis lebih rendah dari DES generasi pertama. SYNTAX Score wajib dihitung untuk pemilihan strategi.',
          required: true,
          category: 'action'
        },
        {
          id: 'aps-dapt-post-pci',
          title: 'DAPT Pasca IKP: Aspirin + Clopidogrel 6 Bulan - Kelas I, Level A',
          description: 'Aspirin 75-100mg/hari + Clopidogrel 75mg/hari selama 6 bulan pasca pemasangan DES. Jika risiko perdarahan sangat tinggi: DAPT 1-3 bulan dapat dipertimbangkan (Kelas IIa, Level A). Prasugrel atau Ticagrelor TIDAK direkomendasikan rutin untuk APS elective PCI (hanya jika risiko trombosis stent sangat tinggi).',
          required: true,
          category: 'medication'
        },
        {
          id: 'aps-pci-statin-pre',
          title: 'Statin Intensitas Tinggi Pre- dan Post-IKP',
          description: 'Atorvastatin 80mg atau Rosuvastatin 40mg sebelum IKP efektif menurunkan insiden IMA periprosedural (pasien baru statin maupun yang sudah lama konsumsi). Lanjutkan statin intensitas tinggi setelah IKP. Target LDL <55 mg/dL.',
          required: true,
          category: 'medication'
        },
        {
          id: 'aps-pci-af-management',
          title: 'Manajemen Antitrombotik jika Ada Fibrilasi Atrium',
          description: 'Pasien FA + IKP: gunakan NOAC (apixaban 5mg 2x/hari, dabigatran 150mg 2x/hari, rivaroxaban 20mg/hari, atau edoxaban 60mg/hari) + Clopidogrel 75mg/hari. Aspirin dihentikan segera <=1 minggu pasca-IKP jika risiko perdarahan > risiko trombosis. VKA jika NOAC tidak tersedia (INR target 2.0-2.5). [EBM] Studi AUGUSTUS: Apixaban + Clopidogrel tanpa Aspirin = perdarahan paling rendah.',
          required: false,
          category: 'medication'
        }
      ],
      nextNodeId: 'aps-followup-plan'
    },

    // NODE 15: CABG PROTOCOL
    'aps-cabg-protocol': {
      id: 'aps-cabg-protocol',
      type: 'checklist',
      title: 'Node 15: Protokol BPAK (Bedah Pintas Arteri Koroner)',
      description: 'PNPK 2023 BAB III-I2: Panduan BPAK pada APS. Teknik dan manajemen antitrombotik perioperatif.',
      items: [
        {
          id: 'aps-cabg-graft-choice',
          title: 'Pilihan Cangkok: Arteri Mamaria Interna ke LAD (Standar)',
          description: 'Arteri mamaria interna kiri ke LAD = teknik standar BPAK. Patensi superior dibanding vena saphena. BIMA (bilateral mamaria) tidak meningkatkan mortalitas dini, namun meningkatkan risiko wound dehiscence 1.9% vs 0.6%. Arteri radialis: patensi lebih baik dari vena saphena pada beberapa penelitian. Vena saphena tetap digunakan untuk pembuluh non-LAD.',
          required: true,
          category: 'action'
        },
        {
          id: 'aps-cabg-antiplatelet-periop',
          title: 'Manajemen Antiplatelet Perioperatif',
          description: 'Lanjutkan Aspirin pre-BPAK. Hentikan: Prasugrel >=7 hari sebelum operasi, Clopidogrel >=5 hari, Ticagrelor >=3 hari, Rivaroxaban/Apixaban/Edoxaban 1-2 hari, Dabigatran 1-2 hari (sesuai fungsi ginjal). Restart Aspirin pasca-BPAK untuk patensi cangkok. DAPT pasca-BPAK (Aspirin + Rivaroxaban) menunjukkan patensi cangkok lebih baik vs monoterapi Aspirin.',
          required: true,
          category: 'medication'
        },
        {
          id: 'aps-cabg-offpump',
          title: 'Off-Pump vs On-Pump BPAK',
          description: 'Off-pump BPAK: dikembangkan untuk kurangi komplikasi kardiopulmonal bypass. Uji ROOBY & CORONARY: tidak ada perbedaan mortalitas signifikan pada 30 hari. Off-pump: sedikit penurunan stroke, transfusi, dan komplikasi perdarahan pada beberapa meta-analisis. Pilihan teknik bergantung pada expertise bedah dan anatomi pasien.',
          required: false,
          category: 'documentation'
        },
        {
          id: 'aps-preop-non-cardiac-surgery',
          title: 'Pertimbangan Operasi Non-Kardiak Selanjutnya',
          description: 'Pasien yang berencana operasi non-kardiak: tunda operasi elektif hingga DAPT selesai (3-6 bulan). Penundaan operasi non-kardiak 3-6 bulan dapat dipertimbangkan pasca IKP. Jika operasi non-kardiak tidak dapat ditunda: akses risiko perdarahan vs trombosis bersama tim bedah.',
          required: false,
          category: 'documentation'
        }
      ],
      nextNodeId: 'aps-followup-plan'
    },

    // NODE 16: FOLLOW-UP PLAN
    'aps-followup-plan': {
      id: 'aps-followup-plan',
      type: 'checklist',
      title: 'Node 16: Rencana Follow-Up & Pencegahan Sekunder Jangka Panjang',
      description: 'PNPK 2023: Evaluasi rutin untuk pantau efikasi terapi, adherensi, efek samping, dan target klinis. Pencegahan sekunder optimal menurunkan risiko SKA dan mortalitas.',
      items: [
        {
          id: 'aps-followup-schedule',
          title: 'Jadwal Kontrol Rutin',
          description: 'Pasca inisiasi TMO: kontrol 2-4 minggu untuk evaluasi respons. Pasca IKP/BPAK: kontrol 1 bulan, 3 bulan, 6 bulan, kemudian tiap 6-12 bulan. Evaluasi: gejala angina (kelas CCS), HR, TD, berat badan, efek samping obat, adherensi, dan target klinis (LDL, HbA1c, BP).',
          required: true,
          category: 'documentation'
        },
        {
          id: 'aps-target-monitoring',
          title: 'Monitoring Target Terapi',
          description: 'Profil lipid (LDL target <55 mg/dL): kontrol 4-6 minggu setelah inisiasi/eskalasi statin, lalu 3-6 bulan. HbA1c: tiap 3 bulan jika DM. Kreatinin/GFR: monitor terutama jika ada ACEI/diuretik. EKG: jika ada perubahan gejala. Ekokardiografi: tiap 1-2 tahun atau jika ada perubahan klinis.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'aps-post-revasc-evaluation',
          title: 'Evaluasi Pasca Revaskularisasi (Sesuai Tabel 4 PNPK)',
          description: 'Pasca IKP: uji latih atau imaging iskemia jika simtomatik (after >=2 tahun). Pasca BPAK: imaging iskemia jika simtomatik (after >=5 tahun atau >=2 tahun). Stent LM: uji latih atau imaging modalitas apapun direkomendasikan untuk evaluasi rutin. Jangan lakukan stress test rutin dalam 2 tahun pasca IKP jika asimtomatik.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'aps-patient-education',
          title: 'Edukasi Pasien & Tanda Bahaya',
          description: 'Edukasi komprehensif: penyakit, tujuan terapi, cara minum obat (terutama nitrat sublingual), kapan ke IGD (nyeri dada >20 menit, tidak respons 3 dosis nitrat, nyeri istirahat baru). Edukasi modifikasi gaya hidup berkelanjutan. Edukasi interaksi obat kritis (PDE5 inhibitor + nitrat = DILARANG). Libatkan keluarga dalam edukasi.',
          required: true,
          category: 'documentation'
        },
        {
          id: 'aps-ebm-ischemia-trial',
          title: '[EBM Terbaru] ISCHEMIA Trial 2020 - Implikasi Klinis',
          description: 'ISCHEMIA Trial (n=5179, NEJM 2020): Pada APS stabil dengan iskemia sedang-berat yang terkontrol, strategi invasif awal (angiografi + revaskularisasi) TIDAK superior vs TMO saja untuk endpoint primer (mortalitas KV + IMA). NAMUN: strategi invasif menurunkan angina dan meningkatkan kualitas hidup, terutama pada gejala lebih berat. IMPLIKASI: TMO adalah fondasi tatalaksana APS. Revaskularisasi terutama untuk kontrol gejala dan kasus risiko tinggi anatomis.',
          required: false,
          category: 'documentation'
        },
        {
          id: 'aps-ecp-refractory',
          title: 'ECP (External Counterpulsation) untuk Angina Refrakter',
          description: 'INDIKASI: angina refrakter yang tidak bisa dilakukan IKP/BPAK: anatomi distal/difus, pasien menolak invasif, komorbiditas berat, post-BPAK dengan oklusi graft. [EBM] ESC Kelas IIa Level B untuk angina refrakter. Studi MUST-EECP: menurunkan episode angina dan meningkatkan fungsi ventrikel. KONTRAINDIKASI: regurgitasi katup berat, aneurisma aorta, aritmia tidak terkontrol, DVT, antikoagulan tidak terkontrol.',
          required: false,
          category: 'action'
        }
      ]
    }
  }
};
