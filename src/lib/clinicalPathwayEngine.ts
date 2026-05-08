import type {
  ChecklistNode,
  DecisionNode,
  DynamicPathway,
  PathwayChecklistItem,
  PathwayNode,
} from './dynamicPathways';
import type { ClinicalDecision, ClinicalVariation } from '../contexts/PathwaySessionsContext';

export type SubcardKind =
  | 'assessment'
  | 'red_flag'
  | 'decision'
  | 'immediate_action'
  | 'monitoring'
  | 'medication'
  | 'documentation'
  | 'contraindication';

export interface StructuredSubcard {
  kind: SubcardKind;
  label: string;
  content: string;
  bullets: string[];
  priority: 'normal' | 'warning' | 'critical';
}

export interface StructuredChecklistItem {
  title: string;
  subtitle: string;
  actionBadge: string;
  subcards: StructuredSubcard[];
}

export interface ClinicalActionRequest {
  id: string;
  title: string;
  source: string;
  subPathway: string;
  decisionNode?: string;
  priority: 'routine' | 'urgent' | 'critical';
  sourceState: 'checked' | 'unchecked' | 'variation' | 'decision' | 'locked';
  actions: string[];
  evidence: string[];
}

export interface AuditTimelineEntry {
  id: string;
  order: number;
  nodeId: string;
  nodeName: string;
  itemId?: string;
  title: string;
  subPathway: string;
  status: 'completed' | 'skipped' | 'variation' | 'justified' | 'non-compliant' | 'decision';
  role?: string;
  note?: string;
  details: string[];
}

export interface ComplianceSummary {
  status: 'compliant' | 'variation' | 'non_compliant';
  label: string;
  completed: number;
  skipped: number;
  variations: number;
  justified: number;
  nonCompliant: number;
  mandatoryTotal: number;
  mandatoryCompleted: number;
  warnings: string[];
}

export interface GuidelineMetadata {
  source: string;
  year: string;
  version: string;
  url?: string;
}

export interface ClinicalExecutionReport {
  actions: ClinicalActionRequest[];
  timeline: AuditTimelineEntry[];
  compliance: ComplianceSummary;
  guidelines: GuidelineMetadata[];
}

const guidelineRegistry: Record<string, GuidelineMetadata[]> = {
  'sindrom-koroner-akut': [
    {
      source: 'ACC/AHA/ACEP/NAEMSP/SCAI Guideline for the Management of Patients With Acute Coronary Syndromes',
      year: '2025',
      version: '2025 ACS guideline',
      url: 'https://www.acc.org/guidelines/guidelines/2025/02/27/17/21/acute-coronary-syndromes-2025',
    },
    {
      source: 'ESC Guidelines for the management of acute coronary syndromes',
      year: '2023',
      version: '2023 ESC ACS guideline',
      url: 'https://www.escardio.org/guidelines/clinical-practice-guidelines/all-esc-practice-guidelines/acute-coronary-syndromes-acs-guidelines/',
    },
    {
      source: 'PERKI Pedoman Tata Laksana Sindrom Koroner Akut',
      year: '2022',
      version: 'Update SKA Indonesia',
    },
  ],
  'hipertensi-dewasa': [
    {
      source: 'AHA/ACC Guideline for Prevention, Detection, Evaluation and Management of High Blood Pressure in Adults',
      year: '2025',
      version: '2025 High Blood Pressure guideline',
      url: 'https://professional.heart.org/en/science-news/2025-high-blood-pressure-guideline',
    },
    {
      source: 'ESC Guidelines for the Management of Elevated Blood Pressure and Hypertension',
      year: '2024',
      version: '2024 ESC hypertension guideline',
      url: 'https://www.escardio.org/guidelines/clinical-practice-guidelines/all-esc-practice-guidelines/elevated-blood-pressure-and-hypertension/',
    },
    {
      source: 'Konsensus Penatalaksanaan Hipertensi PERHI',
      year: '2021',
      version: 'Konsensus Indonesia',
    },
  ],
  tuberkulosis: [
    {
      source: 'WHO consolidated guidelines on tuberculosis: Module 3 Diagnosis',
      year: '2024',
      version: 'Rapid diagnostics, 3rd edition',
      url: 'https://www.who.int/publications/i/item/9789240089488',
    },
    {
      source: 'WHO consolidated guidelines on tuberculosis: Module 4 Treatment and care',
      year: '2025',
      version: 'Treatment and care',
      url: 'https://www.who.int/publications/i/item/9789240107243',
    },
  ],
  dbd: [
    {
      source: 'WHO dengue and severe dengue clinical overview',
      year: '2025',
      version: 'WHO fact sheet and clinical management principles',
      url: 'https://www.who.int/en/news-room/fact-sheets/detail/dengue-and-severe-dengue',
    },
    {
      source: 'Kemenkes RI PNPK/PPK Infeksi Dengue',
      year: '2021-2022',
      version: 'Indonesia dengue clinical pathway',
    },
  ],
};

const kindLabels: Record<SubcardKind, string> = {
  assessment: 'Assessment',
  red_flag: 'Red Flag',
  decision: 'Decision Point',
  immediate_action: 'Immediate Action',
  monitoring: 'Monitoring',
  medication: 'Medication',
  documentation: 'Documentation',
  contraindication: 'Contraindication',
};

function normalizeText(text: string) {
  return text.replace(/\s+/g, ' ').trim();
}

function classifyKind(text: string, category?: string): SubcardKind {
  const lower = text.toLowerCase();
  if (lower.includes('kontraindikasi') || lower.includes('dilarang') || lower.includes('jangan')) return 'contraindication';
  if (lower.includes('red flag') || lower.includes('bahaya') || lower.includes('emergency') || lower.includes('cito') || lower.includes('syok')) return 'red_flag';
  if (lower.includes('jika') || lower.includes('bila') || lower.includes('target') || lower.includes('curiga') || lower.includes('→')) return 'decision';
  if (lower.includes('monitor') || lower.includes('observasi') || lower.includes('ulang') || lower.includes('serial') || lower.includes('cek')) return 'monitoring';
  if (category === 'medication' || lower.includes('mg') || lower.includes('dosis') || lower.includes('oral') || lower.includes('iv')) return 'medication';
  if (category === 'documentation' || lower.includes('catat') || lower.includes('surat') || lower.includes('dokumentasi')) return 'documentation';
  if (category === 'action' || lower.includes('rujuk') || lower.includes('pasang') || lower.includes('berikan') || lower.includes('aktivasi')) return 'immediate_action';
  return 'assessment';
}

function labelForLine(line: string, kind: SubcardKind) {
  const colonMatch = line.match(/^([^:：]{2,32})[:：]\s*(.+)$/);
  if (colonMatch) return colonMatch[1].trim();
  if (kind === 'red_flag') return 'Red Flag';
  if (kind === 'contraindication') return 'Kontraindikasi';
  if (kind === 'decision') return 'Decision Point';
  if (kind === 'immediate_action') return 'Action';
  return kindLabels[kind];
}

function contentForLine(line: string) {
  const colonMatch = line.match(/^([^:：]{2,32})[:：]\s*(.+)$/);
  return normalizeText(colonMatch ? colonMatch[2] : line);
}

function splitIntoClinicalLines(description: string) {
  return description
    .split(/\n+|•|✅|🚨|⚠️|;(?=\s*[A-ZÀ-ž])/g)
    .map((part) => part.replace(/^[-–—]\s*/, '').trim())
    .filter(Boolean);
}

function priorityFor(kind: SubcardKind, text: string): StructuredSubcard['priority'] {
  const lower = text.toLowerCase();
  if (kind === 'red_flag' || lower.includes('cito') || lower.includes('emergency') || lower.includes('syok') || lower.includes('stemi')) return 'critical';
  if (kind === 'contraindication' || kind === 'decision' || lower.includes('wajib')) return 'warning';
  return 'normal';
}

export function structureChecklistItem(item: PathwayChecklistItem): StructuredChecklistItem {
  const lines = splitIntoClinicalLines(item.description);
  const sourceLines = lines.length > 0 ? lines : [item.description];
  const subcards = sourceLines.map((line): StructuredSubcard => {
    const kind = classifyKind(line, item.category);
    const content = contentForLine(line);
    const bullets = content
      .split(/,\s+(?=[A-ZÀ-ž0-9<≥>])|\s+\/\s+/)
      .map((part) => normalizeText(part))
      .filter((part) => part.length > 0 && part.length < content.length - 5);

    return {
      kind,
      label: labelForLine(line, kind),
      content,
      bullets: bullets.length > 1 && content.length > 90 ? bullets : [],
      priority: priorityFor(kind, line),
    };
  });

  return {
    title: item.title.replace(/^[0-9]+[.)]\s*/, ''),
    subtitle: item.role === 'doctor' ? 'Perlu evaluasi / instruksi dokter' : item.role === 'nurse' ? 'Dapat dijalankan perawat sesuai pathway' : 'Kolaborasi dokter dan perawat',
    actionBadge: item.category.toUpperCase(),
    subcards,
  };
}

function visitedNodeIds(pathway: DynamicPathway, currentNodeId: string, pathwayHistory: Array<{ nodeId: string }>) {
  const ids = [...pathwayHistory.map((entry) => entry.nodeId), currentNodeId].filter(Boolean);
  const unique = Array.from(new Set(ids));
  return unique.length > 0 ? unique : [pathway.startNodeId];
}

function getNodeTitle(node?: PathwayNode) {
  if (!node) return 'Clinical Pathway';
  return node.title.replace(/^Node\s+\d+[A-Z]?:\s*/i, '');
}

function getChecklistNodes(pathway: DynamicPathway, currentNodeId: string, pathwayHistory: Array<{ nodeId: string }>) {
  return visitedNodeIds(pathway, currentNodeId, pathwayHistory)
    .map((nodeId) => ({ nodeId, node: pathway.nodes[nodeId] }))
    .filter((entry): entry is { nodeId: string; node: ChecklistNode } => !!entry.node && entry.node.type === 'checklist');
}

function decisionActions(decision: ClinicalDecision, node?: DecisionNode): ClinicalActionRequest | null {
  if (!node) return null;
  const branch = node.branches.find((item) => item.id === decision.branchId);
  const priority = branch?.riskLevel === 'high' ? 'critical' : branch?.riskLevel === 'medium' ? 'urgent' : 'routine';
  return {
    id: `decision-${decision.nodeId}-${decision.branchId}`,
    title: `Keputusan klinis: ${branch?.title || decision.branchTitle}`,
    source: node.title,
    subPathway: getNodeTitle(node),
    decisionNode: node.title,
    priority,
    sourceState: 'decision',
    actions: [
      branch?.description || decision.branchTitle,
      priority === 'critical' ? 'Aktifkan eskalasi/rujukan sesuai cabang risiko tinggi yang dipilih.' : 'Lanjutkan pathway sesuai cabang yang dipilih.',
    ],
    evidence: [node.description],
  };
}

function actionForItem(
  item: PathwayChecklistItem,
  node: ChecklistNode,
  checked: boolean,
  hasNote: boolean,
  effectiveMode: 'full' | 'nurse-only',
): ClinicalActionRequest | null {
  const structured = structureChecklistItem(item);
  const isLockedDoctorItem = effectiveMode === 'nurse-only' && item.role === 'doctor';
  const containsEscalation = /cito|rujuk|emergency|stemi|syok|red flag|dilarang|kontraindikasi/i.test(`${item.title} ${item.description}`);
  const priority = containsEscalation || item.category === 'safety' ? 'critical' : item.required ? 'urgent' : 'routine';

  if (isLockedDoctorItem && !checked) {
    return {
      id: `locked-${item.id}`,
      title: `Mohon evaluasi dokter: ${structured.title}`,
      source: item.title,
      subPathway: getNodeTitle(node),
      priority,
      sourceState: 'locked',
      actions: [
        structured.subcards.find((card) => card.kind === 'decision')?.content || structured.subcards[0]?.content || item.description,
        'Berikan instruksi tatalaksana, resep, rujukan, atau kontraindikasi yang perlu dicatat perawat.',
      ],
      evidence: [item.description],
    };
  }

  if (!checked && item.required) {
    return {
      id: `missing-${item.id}`,
      title: `Mandatory step belum selesai: ${structured.title}`,
      source: item.title,
      subPathway: getNodeTitle(node),
      priority,
      sourceState: hasNote ? 'variation' : 'unchecked',
      actions: [
        hasNote ? 'Review catatan klinis sebagai kemungkinan variasi pathway.' : 'Lengkapi tindakan atau dokumentasikan variasi klinis sebelum lanjut.',
        structured.subcards.find((card) => card.kind === 'immediate_action' || card.kind === 'decision')?.content || structured.subcards[0]?.content || item.description,
      ],
      evidence: [item.description],
    };
  }

  if (checked && containsEscalation) {
    return {
      id: `escalation-${item.id}`,
      title: `Eskalasi terdeteksi: ${structured.title}`,
      source: item.title,
      subPathway: getNodeTitle(node),
      priority,
      sourceState: 'checked',
      actions: [
        'Pastikan dokter/RS rujukan menerima informasi kondisi kritis ini.',
        structured.subcards.find((card) => card.priority === 'critical')?.content || item.description,
      ],
      evidence: [item.description],
    };
  }

  return null;
}

export function getGuidelineMetadata(pathway: DynamicPathway): GuidelineMetadata[] {
  const explicit = (pathway.references || []).map((reference) => ({
    source: reference,
    year: (reference.match(/\b(20\d{2})\b/) || [])[1] || 'N/A',
    version: 'Pathway reference',
  }));
  return [...(guidelineRegistry[pathway.diseaseId] || []), ...explicit];
}

export function buildPathwayExecutionReport({
  pathway,
  currentNodeId,
  checkedSteps,
  notes,
  decisions,
  variations,
  pathwayHistory,
  effectiveMode,
}: {
  pathway: DynamicPathway;
  currentNodeId: string;
  checkedSteps: Record<string, boolean>;
  notes: Record<string, string>;
  decisions: ClinicalDecision[];
  variations: ClinicalVariation[];
  pathwayHistory: Array<{ nodeId: string; nodeName: string; completedAt?: string }>;
  effectiveMode: 'full' | 'nurse-only';
}): ClinicalExecutionReport {
  const checklistNodes = getChecklistNodes(pathway, currentNodeId, pathwayHistory);
  const variationsByItem = new Map<string, ClinicalVariation>();
  variations.forEach((variation) => {
    variation.incompleteSteps.forEach((stepId) => variationsByItem.set(stepId, variation));
  });

  const timeline: AuditTimelineEntry[] = [];
  const actions: ClinicalActionRequest[] = [];
  let order = 1;
  let mandatoryTotal = 0;
  let mandatoryCompleted = 0;
  let completed = 0;
  let skipped = 0;
  let justified = 0;
  let nonCompliant = 0;

  checklistNodes.forEach(({ nodeId, node }) => {
    node.items.forEach((item) => {
      const checked = !!checkedSteps[item.id];
      const note = notes[item.id] || '';
      const variation = variationsByItem.get(item.id);
      const isDoctorLocked = effectiveMode === 'nurse-only' && item.role === 'doctor';
      const status: AuditTimelineEntry['status'] = checked
        ? 'completed'
        : variation?.variationReason?.trim()
          ? 'justified'
          : variation || note.trim()
            ? 'variation'
            : item.required || isDoctorLocked
              ? 'non-compliant'
              : 'skipped';

      if (item.required) {
        mandatoryTotal++;
        if (checked) mandatoryCompleted++;
      }
      if (checked) completed++;
      if (status === 'justified') justified++;
      if (status === 'variation') skipped++;
      if (status === 'non-compliant') nonCompliant++;

      timeline.push({
        id: `${nodeId}-${item.id}`,
        order: order++,
        nodeId,
        nodeName: node.title,
        itemId: item.id,
        title: item.title,
        subPathway: getNodeTitle(node),
        status,
        role: item.role || 'both',
        note: variation?.variationReason || note,
        details: structureChecklistItem(item).subcards.map((card) => `${card.label}: ${card.content}`),
      });

      const action = actionForItem(item, node, checked, !!note.trim() || !!variation, effectiveMode);
      if (action) actions.push(action);
    });
  });

  decisions.forEach((decision) => {
    const node = pathway.nodes[decision.nodeId];
    if (node?.type !== 'decision') return;
    const action = decisionActions(decision, node);
    if (action) actions.push(action);
    timeline.push({
      id: `decision-${decision.nodeId}-${decision.branchId}`,
      order: order++,
      nodeId: decision.nodeId,
      nodeName: node.title,
      title: decision.branchTitle,
      subPathway: getNodeTitle(node),
      status: 'decision',
      details: [node.description],
    });
  });

  const warnings = timeline
    .filter((entry) => entry.status === 'non-compliant' || entry.status === 'variation')
    .map((entry) => `${entry.status === 'non-compliant' ? 'Mandatory step belum dijalankan' : 'Variasi belum memiliki justifikasi'}: ${entry.title}`);

  const status: ComplianceSummary['status'] =
    nonCompliant > 0 ? 'non_compliant' : variations.length > 0 || skipped > 0 ? 'variation' : 'compliant';

  return {
    actions: actions.sort((a, b) => {
      const rank = { critical: 0, urgent: 1, routine: 2 };
      return rank[a.priority] - rank[b.priority];
    }),
    timeline,
    compliance: {
      status,
      label:
        status === 'compliant'
          ? 'Sesuai Clinical Pathway'
          : status === 'variation'
            ? 'Terdapat variasi dan memerlukan justifikasi'
            : 'Ada pathway penting yang tidak dijalankan',
      completed,
      skipped,
      variations: variations.length + skipped,
      justified,
      nonCompliant,
      mandatoryTotal,
      mandatoryCompleted,
      warnings,
    },
    guidelines: getGuidelineMetadata(pathway),
  };
}

export function formatClinicalActionRequest(report: ClinicalExecutionReport, patientCode: string, diseaseName: string) {
  const lines = [
    `Permintaan evaluasi dokter untuk pasien ${patientCode || '-'} (${diseaseName})`,
    `Status pathway: ${report.compliance.label}`,
    '',
    ...report.actions.slice(0, 8).flatMap((action, index) => [
      `${index + 1}. ${action.title}`,
      `   Prioritas: ${action.priority}`,
      `   Subpathway: ${action.subPathway}`,
      ...action.actions.map((item) => `   - ${item}`),
    ]),
  ];
  return lines.join('\n');
}
