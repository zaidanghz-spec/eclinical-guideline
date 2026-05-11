export const CONSULTATION_DOCTORS = [
  {
    email: 'dokter.firda@staff.itk.ac.id',
    name: 'dr. Firda',
  },
  {
    email: 'dokter.mina@staff.itk.ac.id',
    name: 'dr. Mina',
  },
] as const;

export function normalizeEmail(email?: string | null) {
  return (email || '').trim().toLowerCase();
}

export function isConsultationDoctor(email?: string | null) {
  const normalized = normalizeEmail(email);
  return CONSULTATION_DOCTORS.some((doctor) => doctor.email === normalized);
}

export function consultationDoctorNames() {
  return CONSULTATION_DOCTORS.map((doctor) => doctor.name).join(' dan ');
}

export function consultationDoctorEmails() {
  return CONSULTATION_DOCTORS.map((doctor) => doctor.email);
}
