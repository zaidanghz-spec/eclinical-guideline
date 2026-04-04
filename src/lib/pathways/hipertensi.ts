// ============================================================
// PEDOMAN NASIONAL PELAYANAN KEDOKTERAN (PNPK) - TATA LAKSANA HIPERTENSI DEWASA
// KEPUTUSAN MENTERI KESEHATAN NOMOR HK.01.07/MENKES/4634/2021
// ============================================================

import { DynamicPathway } from '../dynamicPathways';

export const hipertensiPathway: DynamicPathway = {
  diseaseId: 'hipertensi',
  diseaseName: 'Hipertensi Dewasa (PNPK 2021)',
  startNodeId: 'ht-triage-awal',
  nodes: {

    // NODE 1: TRIASE AWAL HIPERTENSI
    'ht-triage-awal': {
      id: 'ht-triage-awal',
      type: 'checklist',
      title: 'Triase Pengukuran Tekanan Darah & Evaluasi Awal',
      description: 'Lakukan pengukuran Tekanan Darah (TD) secara benar sesuai standar (pasien duduk tenang 5 menit, lengan sejajar jantung).',
      items: [
        {
          id: 'ht-ukur-dua-lengan',
          title: 'Ukur TD pada Kedua Lengan (Kunjungan Pertama)',
          description: 'Jika beda >15 mmHg curigai plak/aterosklerosis. Untuk seterusnya, gunakan lengan dengan TD tertinggi sebagai acuan.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-cek-nadi',
          title: 'Hitung Nadi Jantung Istirahat',
          description: 'Raba nadi, deteksi ada tidaknya pulsasi ireguler (kemungkinan Fibrilasi Atrial).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-krisis-gejala',
          title: 'Cek Tanda Bahaya (Red Flags) Krisis Hipertensi',
          description: 'Tanya adanya sakit kepala hebat, gangguan penglihatan/buta sesaat, nyeri dada, sesak, defisit neurologis/lemas separuh badan.',
          required: true,
          category: 'assessment'
        }
      ],
      nextNodeId: 'ht-kegawatdaruratan-decision'
    },

    // NODE 2: DECISION - KRISIS VS RAWAT JALAN
    'ht-kegawatdaruratan-decision': {
      id: 'ht-kegawatdaruratan-decision',
      type: 'decision',
      title: 'Status Kegawatdaruratan Tekanan Darah',
      description: 'Apakah pasien masuk ke dalam Kondisi Emergensi atau Hipertensi Biasa (Asimtomatik)?',
      warningLevel: 'critical',
      branches: [
        {
          id: 'ht-emergensi',
          title: 'Krisis/Emergensi (TD ≥180/110 + Gejala Kerusakan Organ)',
          description: 'HMOD akut (misal Edema Paru, Stroke, Ensefalopati, IMA).',
          color: 'red',
          nextNodeId: 'ht-emergensi-tatalaksana',
          riskLevel: 'high'
        },
        {
          id: 'ht-biasa',
          title: 'Hipertensi Tanpa Gejala Emergensi Akut',
          description: 'Lanjutkan ke anamnesis profil pasien.',
          color: 'green',
          nextNodeId: 'ht-anamnesis-komplit',
          riskLevel: 'low'
        }
      ]
    },

    // ALUR 1: EMERGENSI
    'ht-emergensi-tatalaksana': {
      id: 'ht-emergensi-tatalaksana',
      type: 'checklist',
      title: 'Tatalaksana Krisis Hipertensi Emergensi CITO',
      description: 'Faskes Primer harus segera menyegerakan pra-rujukan.',
      items: [
        {
          id: 'ht-iv-line',
          title: 'Pasang Jalur IV & Siapkan Rujukan IGD',
          description: 'Krisis Hipertensi Emergensi mutlak butuh antihipertensi IV (Nikardipin / Clonidin IV / Nitrogliserin) dan titrasi ketat.',
          required: true,
          category: 'action'
        },
        {
          id: 'ht-pantau-td',
          title: 'Pantau TD per 15 Menit',
          description: 'Waspada: Jangan menurunkan TD mendadak melebihi 20-25% MAP di 1 jam pertama (kecuali Stroke Iskemik trombolitik atau Diseksi Aorta).',
          required: true,
          category: 'action'
        }
      ]
    },

    // ALUR 2: RAWAT JALAN - ANAMNESIS & HMOD
    'ht-anamnesis-komplit': {
      id: 'ht-anamnesis-komplit',
      type: 'checklist',
      title: 'Anamnesis Komprehensif & Skrining Kerusakan Organ (HMOD)',
      description: 'Cari tahu onset, faktor risiko, pola hidup, dan skrining Hipertensi Sekunder.',
      items: [
        {
          id: 'ht-skrining-sekunder',
          title: 'Skrining Hipertensi Sekunder',
          description: 'Tanyakan: Ngorok/OSA? Kelemahan/kram otot (Hipokalemia/Aldosteronism)? Berkeringat/Palpitasi sesaat (Feokromositoma)? Muka sembab (Ginjal)?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-hmod-klinis',
          title: 'Pencarian HMOD (Hypertension-Mediated Organ Damage)',
          description: 'Poliuria/Nokturia (Ginjal)? Klaudikasio/kaki dingin saat jalan (Arteri Perifer)? Disfungsi ereksi?',
          required: true,
          category: 'assessment'
        },
        {
          id: 'ht-cek-komorbid',
          title: 'Pemetaan Komorbid',
          description: 'Cek riwayat Diabetes, Stroke, Asam Urat, Gagal Jantung dari buku kontrol/wawancara.',
          required: true,
          category: 'assessment'
        }
      ],
      nextNodeId: 'ht-derajat-decision'
    },

    // NODE 3: KLASIFIKASI DERAJAT
    'ht-derajat-decision': {
      id: 'ht-derajat-decision',
      type: 'decision',
      title: 'Klasifikasi Tekanan Darah Klinik Sesuai Kemenkes',
      description: 'Pilih rentang tekanan darah saat ini:',
      warningLevel: 'info',
      branches: [
        {
          id: 'ht-normal-tinggi',
          title: 'Normal Tinggi (130-139 / 85-89)',
          description: 'Modifikasi gaya hidup dahulu, kecuali pasien dengan risiko PJK tinggi.',
          color: 'blue',
          nextNodeId: 'ht-gaya-hidup',
          riskLevel: 'low'
        },
        {
          id: 'ht-derajat-1',
          title: 'Derajat 1 (140-159 / 90-99)',
          description: 'Penanganan Tergantung Komorbid dan Risiko Kardiovaskular.',
          color: 'orange',
          nextNodeId: 'ht-sasaran-terapi',
          riskLevel: 'medium'
        },
        {
          id: 'ht-derajat-2-3',
          title: 'Derajat 2/3 (≥160 / ≥100)',
          description: 'Indikasi mutlak medikamentosa serentak dengan perubahan gaya hidup.',
          color: 'red',
          nextNodeId: 'ht-sasaran-terapi',
          riskLevel: 'high'
        }
      ]
    },

    // NODE LIFESTYLE
    'ht-gaya-hidup': {
      id: 'ht-gaya-hidup',
      type: 'checklist',
      title: 'Edukasi Modifikasi Gaya Hidup (DASH Diet)',
      description: 'Terapi wajib fondasi semua pasien Hipertensi (bahkan jika sudah minum obat).',
      items: [
        {
          id: 'ht-diet-dash',
          title: 'Edukasi DASH Diet & Garam',
          description: 'Diet rendah lemak jenuh. Batasi Garam (Natrium <2 gram/hari = 1 sdt garam/hari).',
          required: true,
          category: 'action'
        },
        {
          id: 'ht-berat-badan',
          title: 'Managemen Berat Badan',
          description: 'Target IMT 18.5 - 22.9 kg/m2. Lingkar pinggang pria <90 cm, wanita <80 cm.',
          required: true,
          category: 'action'
        },
        {
          id: 'ht-olahraga',
          title: 'Resep Olahraga (Aerobik Medis)',
          description: 'Jalan kaki/sepeda 30-60 menit (intensitas sedang), 5-7 kali seminggu. Latihan beban ritmik.',
          required: true,
          category: 'action'
        }
      ],
      nextNodeId: 'ht-sasaran-terapi'
    },

    // PENENTUAN POPULASI KHUSUS & TERAPI
    'ht-sasaran-terapi': {
      id: 'ht-sasaran-terapi',
      type: 'decision',
      title: 'Strategi Pemilihan Formulasi Obat (Berdasarkan Kondisi)',
      description: 'Pilih panduan terapi empiris menurut PNPK Hipertensi:',
      warningLevel: 'info',
      branches: [
        {
          id: 'ht-terapi-uncomplicated',
          title: 'Hipertensi Esensial Biasa (Uncomplicated)',
          description: 'Untuk sebagian besar populasi.',
          color: 'blue',
          nextNodeId: 'ht-uncomplicated-plan',
          riskLevel: 'medium'
        },
        {
          id: 'ht-terapi-ckd',
          title: 'Dengan Diabetes, Albuminuria, CKB (Ginjal)',
          description: 'Target <130/80 mmHg. Prioritas Kardioproteksi.',
          color: 'red',
          nextNodeId: 'ht-ckd-dm-plan',
          riskLevel: 'high'
        },
        {
          id: 'ht-terapi-geriatri',
          title: 'Geriatri / Lansia (>60 - >80 Tahun & Frail)',
          description: 'Target khusus, hindari diastolik turun berlebih, dosis go low go slow.',
          color: 'orange',
          nextNodeId: 'ht-geriatri-plan',
          riskLevel: 'medium'
        }
      ]
    },

    // PLAN: UNCOMPLICATED
    'ht-uncomplicated-plan': {
      id: 'ht-uncomplicated-plan',
      type: 'checklist',
      title: 'Tata Laksana Hipertensi Umum',
      description: 'Secara prinsip, utamakan KOMBINASI 2 OBAT.',
      items: [
        {
          id: 'ht-rx-kombinasi-awal',
          title: 'Inisiasi RAS Blocker (ACEi / ARB) + CCB / Diuretik',
          description: 'Kombinasi (cth: Amlodipin + Candesartan) sangat dianjurkan sebagai terapi utama untuk sebagian besar pasien guna mencapai target optimal.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ht-peringatan-arbacei',
          title: 'Peringatan: JANGAN MENGKOMBINASI ACEI + ARB',
          description: 'Captopril TIDAK BOLEH dicampur Candesartan. Pilih salah satu.',
          required: true,
          category: 'safety'
        },
        {
          id: 'ht-cek-kalium',
          title: 'Pemantauan Berkelanjutan',
          description: 'Tetrasi obat bila belum capai target <140/90. Pantau K+ dan Kreatinin bila menggunakan ACEI/ARB (K+ > 5,5 mEq waspada).',
          required: true,
          category: 'assessment'
        }
      ]
    },

    // PLAN: CKD / DM
    'ht-ckd-dm-plan': {
      id: 'ht-ckd-dm-plan',
      type: 'checklist',
      title: 'Tata Laksana Hipertensi + Penyakit Ginjal (PGK) & DM',
      description: 'Punya peranan besar pada renoprotektif.',
      items: [
        {
          id: 'ht-ckd-ras',
          title: 'Wajibkan Penggunaan RAS Blocker (ACEI/ARB)',
          description: 'Lebih efektif menurunkan Albuminuria. Bila target <130/80 belum tercapai, tambahkan CCB atau Diuretik.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ht-ckd-loop',
          title: 'Bila GFR < 30 (Gagal Ginjal Lanjut): Ganti Tiazid dengan Loop Diuretik',
          description: 'Tiazid tidak efektif, pakailah Furosemid/Torsemid bagi pasien ini.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ht-ckd-monitor',
          title: 'Monitor Kreatinin 2-4 Minggu Pertama',
          description: 'Estimasi LFG biasanya turun 10-20% ringan di awal terapi ACEI/ARB (fisiologis). Akan tapi hentikan jika turun drastis (curiga Stenosis A. Renalis).',
          required: true,
          category: 'assessment'
        }
      ]
    },

    // PLAN: GERIATRI
    'ht-geriatri-plan': {
      id: 'ht-geriatri-plan',
      type: 'checklist',
      title: 'Tata Laksana Geriatri Khusus',
      description: 'Pasien Renta (Frail) & Berumur Lanjut perlu "Go Slow".',
      items: [
        {
          id: 'ht-geriatri-pilihan',
          title: 'Monoterapi Disarankan Awal: CCB atau Tiazid',
          description: 'Bagi usia >80 tahun, mulai dengan Amlodipin/Nifedipin atau Tiazid dosis kecil.',
          required: true,
          category: 'medication'
        },
        {
          id: 'ht-geriatri-waspada',
          title: 'Waspada Hipotensi Ortostatik & Hiponatremia',
          description: 'Ukur TD posisi berdiri. Hindari Diuretik Loop bila tiada edema/gagal ginjal (bahaya hiperurisemia & hiponatremia tua).',
          required: true,
          category: 'safety'
        },
        {
          id: 'ht-geriatri-target',
          title: 'Target Relaksasi: 130-150 mmHg (Tidak usah terlalu rendah)',
          description: 'Jika diturunkan <130 kadang iskemik otak / hipoksia pada geriatri renta.',
          required: false,
          category: 'action'
        }
      ]
    }

  }
};
