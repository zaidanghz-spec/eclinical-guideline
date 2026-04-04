import { DynamicPathway } from '../dynamicPathways';

export const diareDewasaPathway: DynamicPathway = {
  diseaseId: 'acute-gastroenteritis',
  diseaseName: 'Diare Akut dan Kronik Dewasa (PGI 2024)',
  startNodeId: 'diare-initial-assessment',
  nodes: {
    'diare-initial-assessment': {
      id: 'diare-initial-assessment',
      type: 'checklist',
      title: 'Fase 1: Evaluasi Klinis dan Skrining Dehidrasi',
      description: 'Penilaian awal status hemodinamik, tingkat keparahan dehidrasi, dan klasifikasi jenis diare pada pasien dewasa.\n\n[REFERENSI: Konsensus Nasional Penatalaksanaan Diare pada Pasien Dewasa di Indonesia Tahun 2024 (PB PGI & PP PETRI).]',
      items: [
        {
          id: 'diare-dehidrasi-daldiyono',
          title: 'Evaluasi Skoring Daldiyono / Tanda Vital',
          description: 'Lakukan pemeriksaan tekanan darah, nadi, napas, kesadaran, turgor, dan ekstremitas. Skor Daldiyono digunakan untuk menghitung defisit cairan pada dehidrasi berat: Kebutuhan IV = (Skor/15) x 10% x KgBB x 1 Liter.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'diare-anamnesis-durasi',
          title: 'Anamnesis Durasi dan Frekuensi',
          description: 'Tentukan apakah Diare Akut (<14 hari), Persisten (14-30 hari), atau Kronik (>30 hari). Diare didefinisikan sebagai peningkatan buang air besar ≥3 kali/hari atau konsistensi cair/lunak (Skala Bristol 5-7).',
          required: true,
          category: 'assessment'
        },
        {
          id: 'diare-alarm-symptoms',
          title: 'Skrining Alarm Symptoms (Gejala Waspada)',
          description: 'Cari tahu apakah feses berdarah/disentri, demam >38°C yang menetap >72 jam, penurunan berat badan drastis yang tidak diinginkan, anemia, usia >50 tahun baru awitan, atau riwayat IBD/Keganasan dalam keluarga.',
          required: true,
          category: 'assessment'
        },
        {
          id: 'diare-riwayat-makanan-travel',
          title: 'Riwayat Konsumsi, Antibiotik, & Perjalanan',
          description: 'Identifikasi potensi penyebab: Keracunan toksin onset cepat (<6 jam: Staphylococcus/B.cereus), riwayat antibiotik memicu C. difficile, alergi laktosa, atau area Traveler\'s Diarrhea endemis.',
          required: true,
          category: 'assessment'
        }
      ],
      nextNodeId: 'diare-decision'
    },

    'diare-decision': {
      id: 'diare-decision',
      type: 'decision',
      title: 'Triage Tatalaksana Diare',
      description: 'Pemilihan jalur tatalaksana berdasarkan klasifikasi inflamatorik, durasi penyakit, dan ketersediaan fasilitas diagnostik.',
      branches: [
        {
          id: 'diare-akut-berair-stabil',
          title: 'Diare Akut Berair (Non-Inflamatorik)',
          description: 'Diare cair tanpa darah, tanpa demam parah (>38°C), tanpa manifestasi sepsis. Gejala umum mual, perut kram.',
          color: 'green',
          nextNodeId: 'diare-akut-berair'
        },
        {
          id: 'diare-akut-inflamatorik',
          title: 'Diare Akut Inflamatorik / Disentri',
          description: 'Diare akut disertai BAB berdarah/lendir, demam menetap >72 jam, ada tanda sepsis, kondisi imunokompromi, atau Traveler\'s Diarrhea sedang-berat.',
          color: 'orange',
          nextNodeId: 'diare-akut-inflamatorik-terapi'
        },
        {
          id: 'diare-kronik-alarm',
          title: 'Diare Kronik (>30 Hari) / Alarm Sign (+) / Gagal Terapi',
          description: 'Pasien memiliki gejala alarm (penurunan berat badan, anemia, usia >50 awitan) atau diare berlanjut lebih dari 14-30 hari / gagal antibiotik empiris 3 hari.',
          color: 'red',
          nextNodeId: 'diare-rujuk-kronik'
        }
      ]
    },

    'diare-akut-berair': {
      id: 'diare-akut-berair',
      type: 'checklist',
      title: 'Tatalaksana Diare Akut Berair (Non-Inflamatorik)',
      description: 'Kasus ini didominasi oleh etiologi virus dan swasirna (self-limiting). Pemberian antibiotik sangat tidak dianjurkan. Pendekatan utama adalah cairan dan terapi simptomatik suportif.\n\n[REFERENSI Dosis & EBM: Konsensus Nasional Penatalaksanaan Diare Dewasa 2024 - Bab Tata Laksana.]',
      items: [
        {
          id: 'diare-cairan-suportif',
          title: 'Resusitasi Cairan Oral / IV',
          description: 'Berikan Oralit 400-600 mL/jam. Pada pasien dehidrasi berat / tak dapat minum / muntah profus: Inisiasi IV Kristaloid (RL) menggunakan kalkulasi Daldiyono atau pedoman klinis dehidrasi (Contoh: Berikan 50% cairan defisit pada 1 jam pertama, sisa dalam 3 jam).',
          required: true,
          category: 'medication'
        },
        {
          id: 'diare-loperamide',
          title: 'Pemberian Loperamide (Antimotilitas)',
          description: 'Obat Loperamide (EBM: memperpendek waktu diare 1.5 hari, menurunkan frekuensi 16%). Dosis: Awal 4 mg p.o., lalu 2 mg setiap BAB cair. Maksimum 16 mg/hari (Dewasa) / Max 8 mg/hari (Geriatri). Hentikan pemakaian jika melampaui 48 jam.',
          required: true,
          category: 'medication'
        },
        {
          id: 'diare-probiotik',
          title: 'Pemberian Suplementasi Probiotik',
          description: 'Probiotik (EBM Konsensus PGI: Kombinasi Lactobacillus acidophilus & rhamnosus turunkan durasi/gejala signifikan). Dosis: 3x2 kapsul per hari selama 7 hari. Alternatif: Lactobacillus rhamnosus GG minimal 2x10^9 CFU/hari.',
          required: true,
          category: 'medication'
        },
        {
          id: 'diare-adsorben',
          title: 'Alternatif: Adsorben / Attapulgite',
          description: 'Pertimbangkan Attapulgite atau pektin untuk meningkatkan konsistensi feses apabila gejala perut begah/kembung tidak membaik, walau peranannya sebagai support sekunder. Edukasi diet hindari laktosa dan pedas.',
          required: false,
          category: 'medication'
        }
      ]
    },

    'diare-akut-inflamatorik-terapi': {
      id: 'diare-akut-inflamatorik-terapi',
      type: 'checklist',
      title: 'Tatalaksana Diare Inflamatorik / Infeksi Bakteri Invasi',
      description: 'Tata laksana lini pertama bagi suspek bakteri enteropatogenik kuat invasif, pelancong (Traveler\'s Diarrhea moderate-severe), maupun pasien dengan tanda kegawatan infeksi sistemik/sepsis.\n\n[REFERENSI Dosis Antimikroba: Tabel 6 Rekomendasi Pemberian Antibiotik Konsensus PGI 2024.]',
      items: [
        {
          id: 'diare-cairan-agresif',
          title: 'Resusitasi Cairan dan Cek Darah',
          description: 'Lakukan stabilisasi tekanan darah menggunakan RL IV guyur bila hipotensi (TD <90/60). Jika fasilitas memadai, idealnya ambil kultur/feses PCR sebelum pemberian obat (meski sering tidak ada di klinik terbatas).',
          required: true,
          category: 'safety'
        },
        {
          id: 'diare-antibiotik-empiris',
          title: 'Antibiotik Empiris Gol. Kuinolon / Makrolid',
          description: 'Dosis Acuan: Azitromisin (pilihan lini pertama kuat di Asia Tenggara hindari resisten Campylobacter) 1x500mg/hari p.o selama 3 hari. ALT Kuinolon: Siprofloksasin 2x500mg p.o 3 hari, ATAU Levofloksasin 1x500mg p.o 3 hari.',
          required: true,
          category: 'medication'
        },
        {
          id: 'diare-hindari-loperamide',
          title: 'Hindari Antimotilitas (Loperamide)',
          description: 'KONTRAINDIKASI Loperamide pada kasus sindrom disentri dan demam menetap tinggi. Pelambatan laju intestinal dapat memicu toksisitas sistemik bakteri menetap dan berisiko komplikasi megakolon sekunder / invasi.',
          required: true,
          category: 'safety'
        },
        {
          id: 'diare-probiotik-inflamasi',
          title: 'Probiotik Penunjang Penyembuhan',
          description: 'Bermanfaat tinggi mencegah Diarrhea Susulan akibat Antibiotik (AAD). Berikan probiotik strain teruji (Lactobacillus acidophilus + rhamnosus / Saccharomyces boulardii 1x10^10 CFU per hari).',
          required: true,
          category: 'medication'
        }
      ]
    },

    'diare-rujuk-kronik': {
      id: 'diare-rujuk-kronik',
      type: 'checklist',
      title: 'Persiapan Rujukan Fasilitas Lanjut (Diare Kronik / Sulit Tuntas)',
      description: 'Intervensi dan edukasi bagi pasien yang wajib dievaluasi oleh Spesialis / Fasilitas Endoskopi. Penyebab kronik sering infeksi terselubung, malabsorpsi seliak, IBD, atau keganasan.\n\n[REFERENSI: Algoritma Investigasi Awal Diare Kronik Konsensus PGI 2024.]',
      items: [
        {
          id: 'diare-simptomatik-empirik',
          title: 'Trial Empirik Loperamide & Diet',
          description: 'Sambil mendiskusikan proses rujuk, klinisi dpt mencoba terapi diet rendah karbohidrat fermentasi/laktosa/alkohol (mencurigai Osmotik kronik/IBS). Boleh trial Loperamide 2-4mg setiap sebelum makan / aktivitas bila tanpa alarm inflamatori.',
          required: true,
          category: 'medication'
        },
        {
          id: 'diare-rujuk-molekuler',
          title: 'EDUKASI: Indikasi Rujuk Laboratorium Lanjut',
          description: 'Fasilitas primer harus merujuk untuk pemeriksaan lanjutan seperti PCR Multipleks Feses (Syndromic Testing Panel Gastrointestinal QIAstat Dx), Fecal Calprotectin, dan Celiac marker. Ini dilakukan karna kultur biasa miliki sensitivitas rendah (2%).',
          required: true,
          category: 'documentation'
        },
        {
          id: 'diare-rujuk-endoskopi',
          title: 'EDUKASI: Indikasi Rujuk Radiologi & Kolonoskopi',
          description: 'Apabila ada Alarm Gejala (Usia >50, Berdarah, Penurunan BB, Curiga TB Usus), rujuk tegas untuk pelaksanaan MR Enterography atau Endoskopi / Biopsi Jaringan dalam mengeksklusi Keganasan / Radang Usus IBD.',
          required: true,
          category: 'action'
        }
      ]
    }
  }
};
