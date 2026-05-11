const CONSULTATION_DOCTOR_EMAILS = [
  'dokter.firda@staff.itk.ac.id',
  'dokter.mina@staff.itk.ac.id',
];

function isConsultationDoctorEmail(email) {
  return CONSULTATION_DOCTOR_EMAILS.includes(String(email || '').trim().toLowerCase());
}

module.exports = { CONSULTATION_DOCTOR_EMAILS, isConsultationDoctorEmail };
