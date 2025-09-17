// @ts-nocheck
const globalWindow = typeof window !== "undefined" ? window : undefined;
const ReactGlobal = typeof React !== "undefined" ? React : globalWindow === null || globalWindow === void 0 ? void 0 : globalWindow.React;
const ReactDOMGlobal = typeof ReactDOM !== "undefined" ? ReactDOM : globalWindow === null || globalWindow === void 0 ? void 0 : globalWindow.ReactDOM;
if (!ReactGlobal || !ReactDOMGlobal) {
    throw new Error("React and ReactDOM must be loaded before ai-context.jsx");
}
const { useEffect, useMemo, useState } = ReactGlobal;
const COLOR_THEME = {
    context: { fill: "#bfdbfe", stroke: "#1d4ed8" },
    tools: { fill: "#bbf7d0", stroke: "#047857" },
    ontology: { fill: "#e9d5ff", stroke: "#7e22ce" },
    memory: { fill: "#fde68a", stroke: "#b45309" },
    permission: { fill: "#fecaca", stroke: "#b91c1c" },
    neutral: { fill: "#e5e7eb", stroke: "#475569" },
};
const GRID = {
    offsetX: 200,
    offsetY: 120,
    colWidth: 280,
    rowHeight: 120,
};
const GRADIENTS = {
    "context-tools": ["context", "tools"],
    "context-ontology": ["context", "ontology"],
    "memory-context": ["memory", "context"],
    "tools-permission": ["tools", "permission"],
};
const THEME_KEYS = ["context", "tools", "ontology", "memory", "permission", "neutral"];
const USER_ONTOLOGY_TABS = [
    {
        id: "homeowner",
        label: "Home Modeling",
        title: "Homeowner Insight Loop",
        description: "Pair Raw → Clean → Transform intervals with tariff lenses so homeowners can ask grounded questions about comfort, bills, and DER performance without leaving the governed workflow.",
        questionExamples: [
            "How did my site load change during last week's 4–9pm peak after inverter losses were applied?",
            "Where did the Arcadia tariff add most cost in July when self-consumption dropped?",
            "Can I replay the DERMS dispatch that lowered my August bill and see which assets responded?",
        ],
        throughLines: [
            "Signals → Ontology → Access surfaces comfort vs. cost anomalies for fast homeowner follow-up.",
            "Assembler → Ontology IDs → Workflows binds the correct household, tariff, and asset IDs before launching a CLI walkthrough.",
            "Policy & Audit Trail → Policies keeps customer communications aligned with current NEM eligibility language.",
        ],
        dataSignals: [
            "Utility_API net + import streams for verified consumption history.",
            "DER_API solar/battery payloads to distinguish AC vs. DC behavior per interval.",
            "Arcadia tariffs and TOU windows so pricing questions always cite authoritative rates.",
        ],
        ontologyMap: [
            "Utility_API + DER_API -> RawIntervals",
            "RawIntervals -> CleanIntervals -> TransformIntervals",
            "TransformIntervals -> OntologyHome",
            "TransformIntervals -> OntologyIntervals",
            "TransformIntervals -> DERMS Control Schedule",
            "OntologyIntervals -> Billing Calculators -> Home Insights",
            "TariffSchedule (Arcadia) -> Bills & Avoided Cost",
        ],
    },
    {
        id: "policy",
        label: "Policy & Regulators",
        title: "Regulatory Evidence Loop",
        description: "Align tariff updates, docket language, and ontology fields to help analysts review filings, de-identify sensitive data, and publish explainable impact memos.",
        questionExamples: [
            "Which accounts on PG&E EV-A saw bill swings greater than 15% after the July 2025 docket revision?",
            "What export credits must be redacted before sharing DER participation summaries with the commission?",
            "Where do telemetry feeds indicate a compliance gap with the new demand-charge carve out?",
        ],
        throughLines: [
            "Telemetry / Policy → Assembler → Policies ties real-time filings to the session buffer for side-by-side review.",
            "Access Model → Analyst enforces read-with-redaction workflows across role-based views.",
            "Policy & Audit Trail → Policies → LLM keeps generated memos linked to the docket IDs that informed them.",
        ],
        dataSignals: [
            "Arcadia raw tariff documents plus parsed `TariffSchedule` versions for before/after comparisons.",
            "Policy docket metadata (CPUC, FERC, local ordinances) stored as Policy objects with effective windows.",
            "Permissioned exports from OntologyIntervals, scrubbed via extensions for PII-safe sharing.",
        ],
        ontologyMap: [
            "Telemetry / Policy Feed -> RawArcadiaTariff",
            "RawArcadiaTariff -> TariffSchedule",
            "TariffSchedule -> OntologyIntervals (redacted views)",
            "Policy Dockets -> Policy objects",
            "Access Model -> Analyst Views -> Published Memo",
            "Policy & Audit Trail -> Evidence Links",
        ],
    },
    {
        id: "grid",
        label: "Grid Simulation",
        title: "Synthetic Twin Planning Loop",
        description: "Stage battery, solar, and load scenarios so operators can rehearse constraints, overlay emerging DER policies, and generate dispatch-ready playbooks.",
        questionExamples: [
            "Which feeders breach hosting capacity when I stagger the new DER policy across 500 synthetic homes?",
            "How does shifting DERMS setpoints by 30 minutes change export hours for dual-inverter sites?",
            "Can I clone the July 15th baseline into three optimizer runs and compare avoided cost trajectories?",
        ],
        throughLines: [
            "Assembler → Retriever → Graph keeps scenario twins linked to canonical assets and feeder topology.",
            "Workflows → Operator launches batch CLI simulations with audit logging pointed at Policy & Audit Trail.",
            "Signals → Session Buffer → Automation feeds anomaly flags back into scheduling bots for continuous tuning.",
        ],
        dataSignals: [
            "Utility_API net + DER_API solar/battery streams as seeds for synthetic clones.",
            "DERMS dispatch events and control schedules to test staggered calls and fallback logic.",
            "Financial metrics (avoided cost, LCOE) to quantify policy overlays without mutating the system of record.",
        ],
        ontologyMap: [
            "Utility_API + DER_API -> RawIntervals",
            "RawIntervals -> CleanIntervals -> TransformIntervals",
            "TransformIntervals -> OntologyIntervals (baseline)",
            "TransformIntervals -> Synthetic Twin Seeds",
            "Synthetic Twins -> Scenario Ontology -> Simulation Outputs",
            "DERMS Control Schedules -> Automation",
            "Signals -> Session Buffer -> Operator Actions",
            "Financial Metrics -> Scenario Comparison",
        ],
    },
];
function clamp01(value) {
    if (value <= 0)
        return 0;
    if (value >= 1)
        return 1;
    return value;
}
function parseHexColor(hex) {
    const normalized = hex.replace("#", "");
    if (normalized.length !== 6) {
        return null;
    }
    const r = parseInt(normalized.slice(0, 2), 16);
    const g = parseInt(normalized.slice(2, 4), 16);
    const b = parseInt(normalized.slice(4, 6), 16);
    if ([r, g, b].some((v) => Number.isNaN(v))) {
        return null;
    }
    return { r, g, b };
}
function rgbToHex({ r, g, b }) {
    const toHex = (v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
function mixHexColor(hex, withHex, amount) {
    const base = parseHexColor(hex);
    const mix = parseHexColor(withHex);
    if (!base || !mix) {
        return hex;
    }
    const t = clamp01(amount);
    return rgbToHex({
        r: base.r + (mix.r - base.r) * t,
        g: base.g + (mix.g - base.g) * t,
        b: base.b + (mix.b - base.b) * t,
    });
}
function lightenHexColor(hex, amount) {
    return mixHexColor(hex, "#ffffff", amount);
}
function darkenHexColor(hex, amount) {
    return mixHexColor(hex, "#000000", amount);
}
function resolveThemeKey(candidate) {
    switch (candidate) {
        case "context":
        case "tools":
        case "ontology":
        case "memory":
        case "permission":
        case "neutral":
            return candidate;
        default:
            return "context";
    }
}
const elements = {
    signals: { id: "signals", label: "Signals", sub: "metrics · alerts", col: 0, row: 0, w: 240, h: 90, theme: "context" },
    ontology: { id: "ontology", label: "Ontology", sub: "entities · edges", col: 1, row: 0, w: 240, h: 90, theme: "ontology", bold: true },
    session: { id: "session", label: "Session Buffer", sub: "replay · summarize", col: 2, row: 0, w: 230, h: 80, theme: "memory" },
    telemetry: { id: "telemetry", label: "Telemetry / Policy", sub: "ingest feeds", col: 3, row: 0, w: 240, h: 86, theme: "tools" },
    policies: { id: "policies", label: "Policies", sub: "validators · safeguards", col: 4, row: 0, w: 240, h: 96, theme: "permission" },
    user: { id: "user", label: "User / Agent", sub: "intent · history", col: 0, row: 1, w: 240, h: 96, theme: "context" },
    ontologyIds: { id: "ontologyIds", label: "Ontology IDs", sub: "site · tariff · interval", col: 1, row: 1, w: 240, h: 90, theme: "ontology" },
    working: { id: "working", label: "Working Memory", sub: "skills · snippets", col: 2, row: 1, w: 230, h: 82, theme: "memory" },
    system: { id: "system", label: "System of Record", sub: "source of truth", col: 3, row: 1, w: 240, h: 90, theme: "tools" },
    access: { id: "access", label: "Access Model", sub: "views · actions", col: 4, row: 1, w: 240, h: 90, theme: "permission", bold: true },
    assembler: { id: "assembler", label: "Context Assembler", sub: "prompt · cache", col: 0, row: 2, w: 240, h: 126, theme: "context", bold: true },
    graph: { id: "graph", label: "Ontology Graph", sub: "relations", col: 1, row: 2, w: 240, h: 96, theme: "ontology" },
    retriever: { id: "retriever", label: "Retriever", sub: "OG-RAG orchestrator", col: 2, row: 2, w: 240, h: 100, theme: "memory", bold: true },
    tools: { id: "tools", label: "Tools", sub: "APIs · functions", col: 3, row: 2, w: 240, h: 96, theme: "tools" },
    policyAudit: { id: "policyAudit", label: "Policy & Audit Trail", sub: "lineage", col: 4, row: 2, w: 240, h: 96, theme: "permission", pattern: "perm" },
    llm: { id: "llm", label: "LLM", sub: "spec-driven", col: 0, row: 3, w: 240, h: 120, theme: "context" },
    vector: { id: "vector", label: "Vector Store", sub: "embeddings", col: 0, row: 4, w: 240, h: 90, theme: "context" },
    evidence: { id: "evidence", label: "Evidence", sub: "ranked passages", col: 0, row: 5, w: 240, h: 90, theme: "context" },
    workflows: { id: "workflows", label: "Workflows", sub: "CLI examples/", col: 0, row: 6, w: 240, h: 96, theme: "context" },
    canonical: { id: "canonical", label: "Canonical Memory", sub: "governed entities", col: 2, row: 3, w: 230, h: 82, theme: "memory" },
    filters: { id: "filters", label: "Filters", sub: "tz · asset · tariff", col: 3, row: 3, w: 240, h: 90, theme: "neutral" },
    analyst: { id: "analyst", label: "Analyst", sub: "read", col: 4, row: 3, w: 220, h: 60, theme: "neutral", shape: "pill" },
    operator: { id: "operator", label: "Operator", sub: "write", col: 4, row: 4, w: 220, h: 60, theme: "neutral", shape: "pill" },
    automation: { id: "automation", label: "Automation", sub: "execute", col: 4, row: 5, w: 220, h: 60, theme: "neutral", shape: "pill" },
};
const COLUMN_INFO = [
    { label: "Context", theme: "context" },
    { label: "Ontology", theme: "ontology" },
    { label: "Memory", theme: "memory" },
    { label: "Tools", theme: "tools" },
    { label: "Permissions", theme: "permission" },
];
const MAX_ROW = Math.max(...Object.values(elements).map((el) => el.row));
const CANVAS_WIDTH = GRID.offsetX + (COLUMN_INFO.length - 1) * GRID.colWidth + GRID.colWidth;
const CANVAS_HEIGHT = GRID.offsetY + (MAX_ROW + 1) * GRID.rowHeight + 160;
const VIEWBOX_WIDTH = CANVAS_WIDTH + 160;
const VIEWBOX_HEIGHT = CANVAS_HEIGHT + 120;
const STAGE_LABELS = [
    { row: 0, label: "Observe & Govern" },
    { row: 1, label: "Reference & Access" },
    { row: 2, label: "Assemble & Route" },
    { row: 3, label: "Model Runtime" },
    { row: 4, label: "Retrieval Assets" },
    { row: 5, label: "Evidence & Audit" },
    { row: 6, label: "Execute & Feedback" },
];
function computeGeometry() {
    const map = {};
    Object.values(elements).forEach((el) => {
        var _a, _b;
        const width = (_a = el.w) !== null && _a !== void 0 ? _a : (el.shape === "pill" ? 200 : 220);
        const height = (_b = el.h) !== null && _b !== void 0 ? _b : (el.shape === "pill" ? 56 : 90);
        const cx = GRID.offsetX + el.col * GRID.colWidth;
        const cy = GRID.offsetY + el.row * GRID.rowHeight;
        map[el.id] = {
            x: cx - width / 2,
            y: cy - height / 2,
            w: width,
            h: height,
            cx,
            cy,
        };
    });
    return map;
}
const ELEMENT_GEOMETRY = computeGeometry();
const edges = [
    { id: "user_to_assembler", from: { elementId: "user", anchor: "right" }, to: { elementId: "assembler", anchor: "left" }, curvature: -0.18, theme: "context" },
    { id: "assembler_to_llm", from: { elementId: "assembler", anchor: "right" }, to: { elementId: "llm", anchor: "left" }, curvature: -0.18, theme: "context" },
    { id: "llm_to_tools", from: { elementId: "llm", anchor: "right" }, to: { elementId: "tools", anchor: "left" }, curvature: -0.1, mix: "context-tools" },
    { id: "tools_to_system", from: { elementId: "tools", anchor: "bottom" }, to: { elementId: "system", anchor: "top" }, curvature: -0.18, theme: "tools" },
    { id: "system_to_telemetry", from: { elementId: "system", anchor: "bottom" }, to: { elementId: "telemetry", anchor: "top" }, curvature: -0.12, theme: "tools" },
    { id: "telemetry_to_assembler", from: { elementId: "telemetry", anchor: "left" }, to: { elementId: "assembler", anchor: "bottom" }, curvature: 0.25, mix: "context-tools", label: "ingest" },
    { id: "ontology_to_assembler", from: { elementId: "ontology", anchor: "bottom" }, to: { elementId: "assembler", anchor: "top" }, curvature: -0.18, theme: "ontology" },
    { id: "assembler_to_ontologyIds", from: { elementId: "assembler", anchor: "top" }, to: { elementId: "ontologyIds", anchor: "bottom" }, curvature: -0.2, mix: "context-ontology", label: "bind" },
    { id: "ontologyIds_to_retriever", from: { elementId: "ontologyIds", anchor: "right" }, to: { elementId: "retriever", anchor: "left" }, curvature: -0.16, theme: "ontology" },
    { id: "retriever_to_vector", from: { elementId: "retriever", anchor: "bottom" }, to: { elementId: "vector", anchor: "top" }, curvature: -0.18, mix: "memory-context", label: "embed" },
    { id: "retriever_to_graph", from: { elementId: "retriever", anchor: "bottom" }, to: { elementId: "graph", anchor: "top" }, curvature: 0.02, theme: "ontology", label: "traverse" },
    { id: "retriever_to_filters", from: { elementId: "retriever", anchor: "bottom" }, to: { elementId: "filters", anchor: "top" }, curvature: 0.18, theme: "neutral" },
    { id: "vector_to_evidence", from: { elementId: "vector", anchor: "right" }, to: { elementId: "evidence", anchor: "left" }, curvature: -0.18, theme: "context" },
    { id: "graph_to_evidence", from: { elementId: "graph", anchor: "right" }, to: { elementId: "evidence", anchor: "left" }, curvature: 0.08, theme: "ontology" },
    { id: "filters_to_evidence", from: { elementId: "filters", anchor: "right" }, to: { elementId: "evidence", anchor: "top" }, curvature: -0.12, theme: "neutral" },
    { id: "evidence_to_llm", from: { elementId: "evidence", anchor: "bottom" }, to: { elementId: "llm", anchor: "top" }, curvature: 0.18, theme: "context" },
    { id: "session_to_assembler", from: { elementId: "session", anchor: "top" }, to: { elementId: "assembler", anchor: "bottom" }, curvature: -0.18, theme: "memory" },
    { id: "working_to_assembler", from: { elementId: "working", anchor: "top" }, to: { elementId: "assembler", anchor: "bottom" }, curvature: 0.02, theme: "memory" },
    { id: "canonical_to_assembler", from: { elementId: "canonical", anchor: "top" }, to: { elementId: "assembler", anchor: "bottom" }, curvature: 0.22, theme: "memory" },
    { id: "llm_to_session", from: { elementId: "llm", anchor: "bottom" }, to: { elementId: "session", anchor: "top" }, curvature: -0.28, dashed: true, theme: "memory", label: "summaries" },
    { id: "ontology_to_access", from: { elementId: "ontology", anchor: "bottom" }, to: { elementId: "access", anchor: "top" }, curvature: 0.22, theme: "permission" },
    { id: "telemetry_to_access", from: { elementId: "telemetry", anchor: "right" }, to: { elementId: "access", anchor: "left" }, curvature: -0.1, mix: "tools-permission" },
    { id: "access_to_analyst", from: { elementId: "access", anchor: "bottom" }, to: { elementId: "analyst", anchor: "top" }, curvature: -0.12, theme: "permission" },
    { id: "access_to_operator", from: { elementId: "access", anchor: "bottom" }, to: { elementId: "operator", anchor: "top" }, curvature: 0, theme: "permission" },
    { id: "access_to_automation", from: { elementId: "access", anchor: "bottom" }, to: { elementId: "automation", anchor: "top" }, curvature: 0.12, theme: "permission" },
    { id: "workflows_to_roles", from: { elementId: "workflows", anchor: "top" }, to: { elementId: "operator", anchor: "bottom" }, curvature: -0.22, theme: "context", label: "run" },
    { id: "workflows_to_policyAudit", from: { elementId: "workflows", anchor: "right" }, to: { elementId: "policyAudit", anchor: "left" }, curvature: -0.18, theme: "permission" },
    { id: "policyAudit_to_policies", from: { elementId: "policyAudit", anchor: "top" }, to: { elementId: "policies", anchor: "bottom" }, curvature: -0.24, theme: "permission" },
    { id: "signals_to_ontology", from: { elementId: "signals", anchor: "right" }, to: { elementId: "ontology", anchor: "left" }, curvature: -0.1, theme: "context" },
    { id: "signals_to_memory", from: { elementId: "signals", anchor: "bottom" }, to: { elementId: "session", anchor: "left" }, curvature: 0.24, mix: "memory-context" },
    { id: "signals_to_policies", from: { elementId: "signals", anchor: "bottom" }, to: { elementId: "policies", anchor: "top" }, curvature: -0.3, mix: "context-ontology", label: "guard" },
    { id: "policies_to_llm", from: { elementId: "policies", anchor: "right" }, to: { elementId: "llm", anchor: "top" }, curvature: 0.3, mix: "context-ontology", dashed: true },
];
const steps = [
    {
        id: 1,
        title: "Active Context Assembly",
        subtitle: "User → Assembler → LLM → Tools",
        activeElements: ["user", "assembler", "llm", "tools", "system", "telemetry"],
        activeEdges: [
            "user_to_assembler",
            "assembler_to_llm",
            "llm_to_tools",
            "tools_to_system",
            "system_to_telemetry",
            "telemetry_to_assembler",
        ],
    },
    {
        id: 2,
        title: "Ontology Binding",
        subtitle: "Ground fields + identifiers at assembly time",
        activeElements: ["ontology", "assembler", "ontologyIds", "telemetry", "system", "tools", "llm"],
        activeEdges: [
            "telemetry_to_assembler",
            "ontology_to_assembler",
            "assembler_to_ontologyIds",
            "ontologyIds_to_retriever",
            "assembler_to_llm",
        ],
    },
    {
        id: 3,
        title: "Ontology-Driven Retrieval",
        subtitle: "OG-RAG: vectors + graph + filters",
        activeElements: [
            "assembler",
            "llm",
            "ontology",
            "ontologyIds",
            "retriever",
            "vector",
            "graph",
            "filters",
            "evidence",
        ],
        activeEdges: [
            "assembler_to_ontologyIds",
            "ontologyIds_to_retriever",
            "retriever_to_vector",
            "retriever_to_graph",
            "retriever_to_filters",
            "vector_to_evidence",
            "graph_to_evidence",
            "filters_to_evidence",
            "evidence_to_llm",
        ],
    },
    {
        id: 4,
        title: "Layered Memory",
        subtitle: "Session ↔ Working ↔ Canonical",
        activeElements: ["session", "working", "canonical", "assembler", "llm", "user"],
        activeEdges: [
            "session_to_assembler",
            "working_to_assembler",
            "canonical_to_assembler",
            "llm_to_session",
            "user_to_assembler",
        ],
    },
    {
        id: 5,
        title: "Permissioned Workflows",
        subtitle: "Roles, views, actions, lineage",
        activeElements: [
            "ontology",
            "telemetry",
            "access",
            "analyst",
            "operator",
            "automation",
            "workflows",
            "policyAudit",
            "policies",
        ],
        activeEdges: [
            "ontology_to_access",
            "telemetry_to_access",
            "access_to_analyst",
            "access_to_operator",
            "access_to_automation",
            "workflows_to_roles",
            "workflows_to_policyAudit",
            "policyAudit_to_policies",
        ],
    },
    {
        id: 6,
        title: "Feedback Signals",
        subtitle: "Quality, drift, posture, explainability",
        activeElements: [
            "signals",
            "ontology",
            "session",
            "working",
            "canonical",
            "policies",
            "llm",
            "assembler",
        ],
        activeEdges: [
            "signals_to_ontology",
            "signals_to_memory",
            "signals_to_policies",
            "policies_to_llm",
            "llm_to_session",
            "canonical_to_assembler",
        ],
    },
];
function useAutoplay(enabled, onTick, delayMs = 2600) {
    useEffect(() => {
        if (!enabled)
            return;
        const t = setInterval(onTick, delayMs);
        return () => clearInterval(t);
    }, [enabled, onTick, delayMs]);
}
function Legend() {
    const items = [
        { label: "Context", color: COLOR_THEME.context.fill, stroke: COLOR_THEME.context.stroke },
        { label: "Tools", color: COLOR_THEME.tools.fill, stroke: COLOR_THEME.tools.stroke },
        { label: "Ontology", color: COLOR_THEME.ontology.fill, stroke: COLOR_THEME.ontology.stroke },
        { label: "Memory", color: COLOR_THEME.memory.fill, stroke: COLOR_THEME.memory.stroke },
        { label: "Permissions", color: COLOR_THEME.permission.fill, stroke: COLOR_THEME.permission.stroke },
        { label: "Neutral", color: COLOR_THEME.neutral.fill, stroke: COLOR_THEME.neutral.stroke },
    ];
    return (React.createElement("div", { className: "flex flex-wrap items-center gap-3 text-sm" }, items.map((i) => (React.createElement("div", { key: i.label, className: "flex items-center gap-2" },
        React.createElement("span", { style: { background: i.color, borderColor: i.stroke }, className: "inline-block h-3 w-3 rounded border" }),
        React.createElement("span", { className: "text-slate-600" }, i.label))))));
}
function UserOntologySection({ activeTab, setActiveTab }) {
    const current = useMemo(() => { var _a; return (_a = USER_ONTOLOGY_TABS.find((t) => t.id === activeTab)) !== null && _a !== void 0 ? _a : USER_ONTOLOGY_TABS[0]; }, [activeTab]);
    return (React.createElement("section", { className: "w-full rounded-3xl border bg-white p-5 md:p-7 shadow-sm", "aria-labelledby": "user-ontologies-heading" },
        React.createElement("div", { className: "flex flex-col gap-4" },
            React.createElement("div", null,
                React.createElement("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-500" }, "Orientation"),
                React.createElement("h2", { id: "user-ontologies-heading", className: "text-xl md:text-2xl font-semibold tracking-tight" }, "How does the Golden Grid support users?"),
                React.createElement("p", { className: "text-sm text-slate-600 mt-2 max-w-3xl" }, "Pick a role-centric view to see how the Golden Grid layers assemble data, policies, and workflows into question-ready ontologies. Each tab highlights user questions, connective tissue, and the signals that make the support loop work before you drop into the CLI tools below.")),
            React.createElement("div", { className: "flex flex-wrap gap-2" }, USER_ONTOLOGY_TABS.map((tab) => {
                const active = tab.id === current.id;
                const base = "px-4 py-2 rounded-full border text-sm font-semibold transition select-none";
                const classes = active
                    ? `${base} border-slate-900 bg-slate-900 text-white shadow`
                    : `${base} border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100`;
                return (React.createElement("button", { key: tab.id, onClick: () => setActiveTab(tab.id), className: classes }, tab.label));
            })),
            React.createElement("div", { className: "grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)]" },
                React.createElement("div", { className: "space-y-3" },
                    React.createElement("div", null,
                        React.createElement("h3", { className: "text-lg font-semibold text-slate-900" }, current.title),
                        React.createElement("p", { className: "text-sm text-slate-700 leading-relaxed" }, current.description)),
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-500" }, "Ontology map"),
                        React.createElement("pre", { className: "mt-2 whitespace-pre rounded-xl border border-slate-200 bg-slate-900/90 p-4 text-xs leading-5 text-slate-100 shadow-inner" }, current.ontologyMap.join("\n"))),
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-500" }, "Example questions"),
                        React.createElement("ul", { className: "mt-2 space-y-2 text-sm text-slate-700" }, current.questionExamples.map((question) => (React.createElement("li", { key: question, className: "rounded-xl border border-slate-200 bg-slate-50/60 p-3" }, question)))))),
                React.createElement("div", { className: "space-y-4" },
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-500" }, "Through lines"),
                        React.createElement("ul", { className: "mt-2 space-y-2 text-sm text-slate-700" }, current.throughLines.map((line) => (React.createElement("li", { key: line, className: "rounded-xl border border-slate-200 bg-white p-3 shadow-sm" }, line))))),
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-500" }, "Data & signals in play"),
                        React.createElement("ul", { className: "mt-2 space-y-2 text-sm text-slate-700" }, current.dataSignals.map((signal) => (React.createElement("li", { key: signal, className: "rounded-xl border border-slate-200 bg-white p-3" }, signal))))))))));
}
function TitleBar({ step }) {
    return (React.createElement("div", { className: "flex flex-wrap gap-4 items-baseline justify-between" },
        React.createElement("div", null,
            React.createElement("h1", { className: "text-2xl font-semibold tracking-tight" }, "Golden Grid: Context \u2194 Tools Feedback Loops"),
            React.createElement("p", { className: "text-slate-600 text-sm" },
                step.id,
                ". ",
                step.title,
                " \u00B7 ",
                step.subtitle)),
        React.createElement(Legend, null)));
}
function Controls({ index, setIndex, playing, setPlaying }) {
    const prev = () => setIndex((index + steps.length - 1) % steps.length);
    const next = () => setIndex((index + 1) % steps.length);
    const buttonBase = "px-4 py-2 rounded-full font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition";
    const backClasses = `${buttonBase} bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-slate-400`;
    const playClasses = playing
        ? `${buttonBase} bg-slate-800 text-white hover:bg-slate-900 focus:ring-slate-700`
        : `${buttonBase} bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-500`;
    const nextClasses = `${buttonBase} bg-slate-900 text-white hover:bg-slate-950 focus:ring-slate-700`;
    return (React.createElement("div", { className: "flex items-center gap-2" },
        React.createElement("button", { onClick: prev, className: backClasses }, "Back"),
        React.createElement("button", { onClick: () => setPlaying(!playing), className: playClasses }, playing ? "Pause Auto" : "Start Auto"),
        React.createElement("button", { onClick: next, className: nextClasses }, "Next")));
}
function ThumbStrip({ index, setIndex }) {
    return (React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-6 gap-2 w-full" }, steps.map((s, i) => (React.createElement("button", { key: s.id, onClick: () => setIndex(i), className: `rounded-xl border p-2 text-left transition ${i === index ? "border-slate-900 bg-slate-50" : "border-slate-200 hover:bg-slate-50"}` },
        React.createElement("div", { className: "text-xs font-semibold tracking-tight" },
            s.id,
            ". ",
            s.title),
        React.createElement("div", { className: "text-[11px] text-slate-600" }, s.subtitle))))));
}
function MarkerDefs() {
    return (React.createElement("defs", null,
        THEME_KEYS.flatMap((key) => {
            const theme = COLOR_THEME[key];
            const accent = theme.stroke;
            const mutedAccent = lightenHexColor(accent, 0.45);
            const accentHighlight = lightenHexColor(accent, 0.18);
            const dotMuted = lightenHexColor(accent, 0.55);
            const dotFillMuted = lightenHexColor(theme.fill, 0.4);
            return [
                React.createElement("marker", { key: `arrow-${key}-active`, id: `arrowhead-${key}-active`, markerWidth: "22", markerHeight: "22", refX: "16", refY: "11", orient: "auto", markerUnits: "userSpaceOnUse" },
                    React.createElement("path", { d: "M 5 4 L 20 11 L 5 18 Q 7.5 11 5 4", fill: accent }),
                    React.createElement("path", { d: "M 8.5 11 L 15 11", stroke: accentHighlight, strokeWidth: 1.8, strokeLinecap: "round" })),
                React.createElement("marker", { key: `arrow-${key}-muted`, id: `arrowhead-${key}-muted`, markerWidth: "22", markerHeight: "22", refX: "16", refY: "11", orient: "auto", markerUnits: "userSpaceOnUse" },
                    React.createElement("path", { d: "M 5 4 L 20 11 L 5 18 Q 7.5 11 5 4", fill: mutedAccent }),
                    React.createElement("path", { d: "M 8.5 11 L 15 11", stroke: lightenHexColor(mutedAccent, 0.25), strokeWidth: 1.4, strokeLinecap: "round" })),
                React.createElement("marker", { key: `dot-${key}-active`, id: `flow-dot-${key}-active`, markerWidth: "10", markerHeight: "10", refX: "5", refY: "5", orient: "auto", markerUnits: "userSpaceOnUse" },
                    React.createElement("circle", { cx: "5", cy: "5", r: "2.4", fill: accent, opacity: "0.85" }),
                    React.createElement("circle", { cx: "5", cy: "5", r: "1.2", fill: accentHighlight, opacity: "0.7" })),
                React.createElement("marker", { key: `dot-${key}-muted`, id: `flow-dot-${key}-muted`, markerWidth: "10", markerHeight: "10", refX: "5", refY: "5", orient: "auto", markerUnits: "userSpaceOnUse" },
                    React.createElement("circle", { cx: "5", cy: "5", r: "2.2", fill: dotMuted, opacity: "0.45" }),
                    React.createElement("circle", { cx: "5", cy: "5", r: "1", fill: dotFillMuted, opacity: "0.55" })),
            ];
        }),
        React.createElement("filter", { id: "soft", x: "-20%", y: "-20%", width: "140%", height: "140%" },
            React.createElement("feGaussianBlur", { in: "SourceAlpha", stdDeviation: "1.4", result: "blur" }),
            React.createElement("feOffset", { in: "blur", dx: "0", dy: "1.2", result: "offset" }),
            React.createElement("feComponentTransfer", null,
                React.createElement("feFuncA", { type: "linear", slope: "0.22" })),
            React.createElement("feMerge", null,
                React.createElement("feMergeNode", { in: "offset" }),
                React.createElement("feMergeNode", { in: "SourceGraphic" }))),
        React.createElement("pattern", { id: "perm", width: "6", height: "6", patternUnits: "userSpaceOnUse" },
            React.createElement("path", { d: "M0 6 L6 0", stroke: "#b91c1c", strokeWidth: "1" })),
        Object.entries(GRADIENTS).map(([key, [a, b]]) => {
            const start = COLOR_THEME[a].stroke;
            const end = COLOR_THEME[b].stroke;
            return (React.createElement("linearGradient", { key: key, id: `grad-${key}`, x1: "0%", y1: "0%", x2: "100%", y2: "0%" },
                React.createElement("stop", { offset: "0%", stopColor: start, stopOpacity: 0.95 }),
                React.createElement("stop", { offset: "100%", stopColor: end, stopOpacity: 0.95 })));
        })));
}
function anchorPoint(rect, anchor) {
    switch (anchor) {
        case "left":
            return { x: rect.x, y: rect.cy };
        case "right":
            return { x: rect.x + rect.w, y: rect.cy };
        case "top":
            return { x: rect.cx, y: rect.y };
        case "bottom":
            return { x: rect.cx, y: rect.y + rect.h };
        default:
            return { x: rect.cx, y: rect.cy };
    }
}
function ElementBox({ element, state, rect }) {
    const theme = COLOR_THEME[element.theme];
    const active = state === "active";
    const radius = element.shape === "pill" ? rect.h / 2 : 18;
    const labelColor = active ? "#0f172a" : "#94a3b8";
    const subColor = active ? "#475569" : "#a1a1aa";
    const fillOpacity = element.pattern ? 1 : active ? 1 : 0.25;
    const strokeOpacity = active ? 0.95 : 0.2;
    const filter = active ? "url(#soft)" : undefined;
    return (React.createElement("g", { filter: filter },
        React.createElement("rect", { x: rect.x, y: rect.y, width: rect.w, height: rect.h, rx: radius, ry: radius, fill: theme.fill, fillOpacity: fillOpacity, stroke: theme.stroke, strokeOpacity: strokeOpacity, strokeWidth: 2 }),
        element.pattern && state === "active" ? (React.createElement("rect", { x: rect.x, y: rect.y, width: rect.w, height: rect.h, rx: radius, ry: radius, fill: `url(#${element.pattern})`, fillOpacity: 0.5 })) : null,
        React.createElement("text", { x: rect.cx, y: rect.cy - (element.sub ? 4 : 0), textAnchor: "middle", fontSize: 12, fontWeight: element.bold ? 700 : 600, fill: labelColor }, element.label),
        element.sub ? (React.createElement("text", { x: rect.cx, y: rect.cy + 12, textAnchor: "middle", fontSize: 10, fill: subColor }, element.sub)) : null));
}
function FlowEdge({ edge, state, geometry }) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const fromRect = geometry[edge.from.elementId];
    const toRect = geometry[edge.to.elementId];
    if (!fromRect || !toRect) {
        return null;
    }
    const start = anchorPoint(fromRect, edge.from.anchor);
    const end = anchorPoint(toRect, edge.to.anchor);
    const x1 = start.x + ((_a = edge.from.dx) !== null && _a !== void 0 ? _a : 0);
    const y1 = start.y + ((_b = edge.from.dy) !== null && _b !== void 0 ? _b : 0);
    const x2 = end.x + ((_c = edge.to.dx) !== null && _c !== void 0 ? _c : 0);
    const y2 = end.y + ((_d = edge.to.dy) !== null && _d !== void 0 ? _d : 0);
    const dx = x2 - x1;
    const dy = y2 - y1;
    const midx = (x1 + x2) / 2;
    const midy = (y1 + y2) / 2;
    const length = Math.sqrt(dx * dx + dy * dy) || 1;
    const normX = -(dy / length);
    const normY = dx / length;
    const offsetMagnitude = length * ((_e = edge.curvature) !== null && _e !== void 0 ? _e : 0.2);
    const cx = midx + normX * offsetMagnitude;
    const cy = midy + normY * offsetMagnitude;
    const path = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
    const active = state === "active";
    const gradientThemes = edge.mix ? GRADIENTS[edge.mix] : undefined;
    const fallbackTheme = gradientThemes ? (_f = gradientThemes[1]) !== null && _f !== void 0 ? _f : gradientThemes[0] : null;
    const resolvedThemeKey = resolveThemeKey((_g = edge.theme) !== null && _g !== void 0 ? _g : fallbackTheme);
    const theme = COLOR_THEME[resolvedThemeKey];
    const baseStroke = theme.stroke;
    const strokeForState = active ? baseStroke : lightenHexColor(baseStroke, 0.45);
    const strokeSource = edge.mix
        ? active
            ? `url(#grad-${edge.mix})`
            : lightenHexColor(COLOR_THEME[resolvedThemeKey].stroke, 0.45)
        : strokeForState;
    const strokeOpacity = active ? 0.95 : 0.28;
    const labelX = (x1 + x2 + cx) / 3;
    const labelY = (y1 + y2 + cy) / 3 + ((_h = edge.labelOffsetY) !== null && _h !== void 0 ? _h : -12);
    const markerEnd = `url(#arrowhead-${resolvedThemeKey}-${active ? "active" : "muted"})`;
    const markerMid = `url(#flow-dot-${resolvedThemeKey}-${active ? "active" : "muted"})`;
    const dashArray = edge.dashed ? "8 12" : undefined;
    const dashOffset = edge.dashed ? 56 : undefined;
    const shouldAnimate = Boolean(dashArray) && active;
    const duration = edge.dashed ? 1.7 : 3.1;
    const labelColor = active ? darkenHexColor(baseStroke, 0.2) : lightenHexColor(baseStroke, 0.5);
    const textColor = labelColor;
    return (React.createElement("g", null,
        React.createElement("path", { d: path, fill: "none", stroke: strokeSource, strokeWidth: active ? 3.2 : 2.4, strokeOpacity: strokeOpacity, strokeLinecap: "round", strokeLinejoin: "round", strokeDasharray: dashArray, markerEnd: markerEnd, markerMid: markerMid }, shouldAnimate && dashOffset ? (React.createElement("animate", { attributeName: "stroke-dashoffset", values: `0;-${dashOffset}`, dur: `${duration}s`, repeatCount: "indefinite" })) : null),
        edge.label ? (React.createElement("text", { x: labelX, y: labelY, textAnchor: "middle", fontSize: 10, fill: textColor }, edge.label)) : null));
}
function Diagram({ step }) {
    const activeElementIds = useMemo(() => new Set(step.activeElements), [step.activeElements]);
    const activeEdgeIds = useMemo(() => new Set(step.activeEdges), [step.activeEdges]);
    const geometry = ELEMENT_GEOMETRY;
    const columnStartX = GRID.offsetX - GRID.colWidth / 2;
    const columnEndX = GRID.offsetX + (COLUMN_INFO.length - 1) * GRID.colWidth + GRID.colWidth / 2;
    const backgroundTop = GRID.offsetY - 80;
    const backgroundBottom = CANVAS_HEIGHT - 60;
    const backgroundHeight = backgroundBottom - backgroundTop;
    return (React.createElement("div", { className: "w-full rounded-3xl border bg-white p-4 md:p-6 shadow-sm" },
        React.createElement("svg", { viewBox: `0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`, className: "w-full h-[720px]" },
            React.createElement(MarkerDefs, null),
            COLUMN_INFO.map((col, idx) => {
                const cx = GRID.offsetX + idx * GRID.colWidth;
                const colX = cx - GRID.colWidth / 2;
                const theme = COLOR_THEME[col.theme];
                return (React.createElement("g", { key: col.label },
                    React.createElement("rect", { x: colX, y: backgroundTop, width: GRID.colWidth, height: backgroundHeight, fill: theme.fill, fillOpacity: 0.06, stroke: "none" }),
                    React.createElement("text", { x: cx, y: backgroundTop - 24, textAnchor: "middle", fontSize: 13, fontWeight: 600, fill: theme.stroke }, col.label)));
            }),
            STAGE_LABELS.map(({ row, label }) => {
                const y = GRID.offsetY + row * GRID.rowHeight;
                return (React.createElement("g", { key: `stage-${row}` },
                    React.createElement("line", { x1: columnStartX, y1: y, x2: columnEndX, y2: y, stroke: "#e2e8f0", strokeDasharray: "6 10" }),
                    React.createElement("text", { x: columnStartX - 10, y: y - 12, textAnchor: "end", fontSize: 11, fill: "#94a3b8" }, label)));
            }),
            edges.map((edge) => (React.createElement(FlowEdge, { key: edge.id, edge: edge, geometry: geometry, state: activeEdgeIds.has(edge.id) ? "active" : "muted" }))),
            Object.values(elements).map((el) => {
                const rect = geometry[el.id];
                if (!rect) {
                    return null;
                }
                return (React.createElement(ElementBox, { key: el.id, element: el, rect: rect, state: activeElementIds.has(el.id) ? "active" : "muted" }));
            }))));
}
function GoldenGridVisuals() {
    const [activeUserTab, setActiveUserTab] = useState(USER_ONTOLOGY_TABS[0].id);
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    useAutoplay(playing, () => setIndex((i) => (i + 1) % steps.length));
    const step = steps[index];
    return (React.createElement("div", { className: "w-full p-4 md:p-6 grid gap-6" },
        React.createElement(UserOntologySection, { activeTab: activeUserTab, setActiveTab: setActiveUserTab }),
        React.createElement("section", { className: "grid gap-4", "aria-labelledby": "tools-section-heading" },
            React.createElement("div", { className: "flex flex-col gap-2" },
                React.createElement("p", { id: "tools-section-heading", className: "text-xs font-semibold uppercase tracking-wide text-slate-500" }, "Tools"),
                React.createElement(TitleBar, { step: step })),
            React.createElement(Diagram, { step: step }),
            React.createElement("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between" },
                React.createElement(ThumbStrip, { index: index, setIndex: setIndex }),
                React.createElement(Controls, { index: index, setIndex: setIndex, playing: playing, setPlaying: setPlaying })),
            React.createElement("div", { className: "text-xs text-slate-500" }, "All components stay on canvas; inactive nodes and flows mute so you can see the full system. Use Start Auto to animate the loop or step manually with Back/Next."))));
}
function renderGoldenGridContext(targetId = "root") {
    const mountNode = document.getElementById(targetId);
    if (!mountNode) {
        throw new Error(`Cannot find mount node with id "${targetId}"`);
    }
    const root = ReactDOMGlobal.createRoot(mountNode);
    root.render(React.createElement(GoldenGridVisuals, null));
    return root;
}
if (globalWindow) {
    globalWindow.GoldenGridContextApp = {
        render: renderGoldenGridContext,
    };
}
