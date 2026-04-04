import { DynamicPathway } from '../dynamicPathways';

export const insectBitePathway: DynamicPathway = {
  diseaseId: 'reaksi-gigitan-serangga',
  diseaseName: 'Reaksi Gigitan Serangga (Insect Bite/Sting)',
  startNodeId: 'insect-initial-assessment',
  nodes: {
    'insect-initial-assessment': {
      id: 'insect-initial-assessment',
      type: 'checklist',
      title: 'Fase 1: Asesmen Awal & Dekontaminasi',
      description: 'Pertolongan utama pada reaksi gigitan/sengatan (Hymenoptera, Arthropoda, Sengatan Hewan Berbisa).\n\n[REFERENSI: KMK Nomor HK.01.07/MENKES/1186/2022 (Panduan Praktik Klinis Tingkat Pertama) & Buku Pedoman Penanganan Gigitan, Sengatan Hewan Berbisa dan Keracunan Tumbuhan Kemenkes RI 2023.]',
      items: [
        {
          id: 'insect-abc-eval',
          title: 'Evaluasi Tanda Vital & Resusitasi (ABC)',
          description: 'Segera nilai jalan napas (Airway), pernapasan (Breathing), dan sirkulasi (Circulation). Siapkan oksigen dan alat resusitasi karena risiko syok anafilaktik dapat terjadi cepat (terutama sengatan tawon Vespa affinis).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'insect-ident',
          title: 'Identifikasi Hewan & Jejak Luka',
          description: 'Cari punctum (titik tusukan), vesikel, atau sengat yang tertinggal. Pastikan ini BUKAN gigitan ular (vulnus ictum 1-2 gigi taring). Jika ubur-ubur, berikan cuka 5%; jika lebah/tawon/arthropoda, periksa apakah ada sengat untuk segera dicabut secara tumpul.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'insect-decon',
          title: 'Dekontaminasi & Kompres Lokal',
          description: 'Cuci daerah gigitan/sengatan dengan air mengalir dan sabun. Berikan kompres dingin / es pack (kecuali ubur-ubur menggunakan air hangat 45°C/cuka) untuk mengurangi peradangan lokal dan progresi venom.',
          required: true,
          category: 'safety'
        },
        {
          id: 'insect-anamnesis',
          title: 'Waktu Gigitan & Riwayat Atopi',
          description: 'Cari tahu apakah rekasi bertipe cepat (<20 menit), tipe lambat (>20 menit - berjam-jam), atau reaksi tertunda (delayed reaction serum sickness-like). Tanyakan riwayat alergi keluarga atau asma.',
          required: true,
          category: 'assessment'
        }
      ],
      nextNodeId: 'insect-severity-decision'
    },

    'insect-severity-decision': {
      id: 'insect-severity-decision',
      type: 'decision',
      title: 'Algoritma Keputusan Sistemik vs Lokal',
      description: 'Menentukan apakah pasien dalam kondisi peradangan lokal aman atau terancam syok anafilaktik yang mengancam nyawa.',
      branches: [
        {
          id: 'insect-local-only',
          title: 'Hanya Reaksi Lokal',
          description: 'Nyeri, gatal, kemerahan (eritema), bengkak setempat tanpa sesak napas. Kondisi hemodinamik stabil.',
          color: 'teal',
          nextNodeId: 'insect-local-treatment'
        },
        {
          id: 'insect-systemic-anaphylaxis',
          title: 'Tanda Sistemik / Anafilaksis',
          description: 'Terdapat takipneu, stridor, wheezing, bronkospasme, angioedema luas, sinkop, atau hipotensi orthostatik.',
          color: 'red',
          nextNodeId: 'insect-anaphylactic-treatment'
        }
      ]
    },

    'insect-anaphylactic-treatment': {
      id: 'insect-anaphylactic-treatment',
      type: 'checklist',
      title: 'Tatalaksana Kegawatan (Syok Anafilaktik / Gejala Sistemik)',
      description: 'Langkah pengamanan nyawa segera (Life-saving) sebelum pasien di-Rujuk ke Fasilitas Lanjutan.\n\n[REFERENSI: Penanganan Akut Reaksi Toksin & Alergi Sistemik berdasarkan Permenkes Faskes Tk I.]',
      items: [
        {
          id: 'insect-epinephrine',
          title: 'Injeksi Epinefrin (Adrenalin) Segera',
          description: 'Pemberian adrenalin 1:1000 dosis 0.3 - 0.5 ml Intramuskular (IM) di paha anterolateral. Observasi respons, dapat diulang setiap 5-15 menit sesuai panduan syok anafilaktik darurat.',
          required: true,
          category: 'medication'
        },
        {
          id: 'insect-oxygen-fluid',
          title: 'Oksigenasi & Resusitasi Cairan',
          description: 'Pasang sungkup oksigen (8-10 L/mnt jika saturasi turun) dan berikan cairan resusitasi Kristaloid (NaCl 0.9% atau RL) secara cepat / guyur untuk menaikkan hipotensi.',
          required: true,
          category: 'safety'
        },
        {
          id: 'insect-steroid-systemic',
          title: 'Pemberian Kortikosteroid Sistemik',
          description: 'Dapat dilanjutkan dengan pemberian kortikosteroid Dexamethasone IV atau Prednison 60-80 mg/hari selama 3 hari lalu di tapering down (bila rujukan memerlukan waktu/jarak jauh).',
          required: true,
          category: 'medication'
        },
        {
          id: 'insect-referral',
          title: 'Rujuk CITO UGD RS',
          description: 'Evakuasi pasien segera menggunakan ambulans sambil mempertahankan resusitasi jalan napas dan pemantauan tanda vital hingga stabil di rumah sakit.',
          required: true,
          category: 'action'
        }
      ]
    },

    'insect-local-treatment': {
      id: 'insect-local-treatment',
      type: 'checklist',
      title: 'Tatalaksana Stabil (Reaksi Lokal Sederhana)',
      description: 'Pemberian Terapi Medikamentosa pada kasus gigitan/sengatan serangga lokal.\n\n[REFERENSI: Algoritma Pengobatan Simptomatik Reaksi Urtikaria Gigitan Serangga KMK Nomor HK.01.07/MENKES/1186/2022.]',
      items: [
        {
          id: 'insect-antihistamine',
          title: 'Antihistamin Sistemik (Sedatif / Non-Sedatif)',
          description: 'Berikan antihistamin untuk mengurangi gatal dan inflamasi. Opsi sedatif: CTM (Klorfeniramin maleat) 3 x 4 mg/hari selama 7 hari. Opsi non-sedatif: Cetirizine 1 x 10 mg/hari atau Loratadine 1 x 10 mg/hari (durasi 7 hari).',
          required: true,
          category: 'medication'
        },
        {
          id: 'insect-topical-steroid',
          title: 'Kortikosteroid Topikal Potensi Sedang/Kuat',
          description: 'Oleskan Krim Mometason Furoat 0.1% ATAU Krim Betametason Valerat 0.5% sebanyak 2 kali sehari selama 7 hari tepat di daerah punctum dan urtika eritematosa.',
          required: true,
          category: 'medication'
        },
        {
          id: 'insect-education',
          title: 'Edukasi Kebersihan & Pencegahan',
          description: 'HINDARI DIGARUK (risiko infeksi sekunder bernanah). Jaga kebersihan kasur (cegah tungau/kutu), pakai baju lengan panjang, atau gunakan kelambu/mosquito repellent bila dirasa perumahan banyak nyamuk dan agas.',
          required: true,
          category: 'action'
        },
        {
          id: 'insect-monitoring',
          title: 'Pemantauan Indikator Perburukan',
          description: 'Sampaikan kepada pasien atau keluarga: Wajib kembali (Kriteria Rujukan) apabila patch eritema makin meluas parah, timbul bula berair besar, atau berkembang ke demam, kelemahan, dan mual muntah (delayed systemic reaction).',
          required: true,
          category: 'documentation'
        }
      ]
    }
  }
};
