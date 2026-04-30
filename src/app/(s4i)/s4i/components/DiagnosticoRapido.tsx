'use client';

import { useState, useEffect } from 'react';

type Option = { label: string; score: number };
type Question = {
  id: string;
  question: string;
  options: Option[];
};

const QUESTIONS: Question[] = [
  {
    id: 'vertical',
    question: '¿En qué sector opera tu organización?',
    options: [
      { label: 'Educación', score: 2 },
      { label: 'Salud', score: 2 },
      { label: 'Empleabilidad', score: 2 },
      { label: 'Microfinanzas', score: 2 },
      { label: 'Otro sector social', score: 1 },
    ],
  },
  {
    id: 'team',
    question: '¿Cuántas personas trabajan en tu organización?',
    options: [
      { label: 'Menos de 5', score: 0 },
      { label: '5 – 15', score: 1 },
      { label: '15 – 50', score: 2 },
      { label: 'Más de 50', score: 1 },
    ],
  },
  {
    id: 'stack',
    question: '¿Cuál describe mejor tu stack tecnológico actual?',
    options: [
      { label: 'Mayormente Google Sheets / planillas', score: 2 },
      { label: 'Herramientas SaaS dispersas', score: 2 },
      { label: 'Sistema integrado funcional', score: 1 },
      { label: 'Stack maduro con BI o IA', score: 0 },
    ],
  },
  {
    id: 'accelerator',
    question: '¿Sos parte de una aceleradora o red de impacto?',
    options: [
      { label: 'Sí (Propel, Ashoka u otra)', score: 2 },
      { label: 'En proceso de aplicación', score: 1 },
      { label: 'No por ahora', score: 0 },
    ],
  },
  {
    id: 'funds',
    question: '¿Estás preparando postulación a fondos de impacto?',
    options: [
      { label: 'Sí, en los próximos 6 meses', score: 2 },
      { label: 'En 6 a 12 meses', score: 1 },
      { label: 'No por ahora', score: 0 },
    ],
  },
  {
    id: 'metrics',
    question: '¿Cómo medís el impacto de tu programa?',
    options: [
      { label: 'Métricas claras y sistematizadas', score: 1 },
      { label: 'Datos parciales, sin sistema', score: 2 },
      { label: 'Es algo que queremos mejorar', score: 2 },
    ],
  },
  {
    id: 'bottleneck',
    question: '¿Cuál es tu principal cuello de botella?',
    options: [
      { label: 'Operaciones manuales que consumen tiempo', score: 2 },
      { label: 'Falta de evidencia técnica para fondos', score: 2 },
      { label: 'Sin sistema para escalar el impacto', score: 2 },
      { label: 'Equipo sin capacidades técnicas', score: 2 },
    ],
  },
];

type PhaseData = { name: string; accent: string; message: string };

const PHASE_DATA: Record<'P1' | 'P2' | 'P3', PhaseData> = {
  P1: {
    name: 'P1 / Momentum',
    accent: '#60a5fa',
    message:
      'Tu organización tiene voluntad y datos. Empezás con coaching y un roadmap de 3 meses que ordena el camino antes de construir.',
  },
  P2: {
    name: 'P2 / Acelera',
    accent: '#818cf8',
    message:
      'Estás en momentum operativo. Es el momento de construir el tech core que rompe tu techo de crecimiento — MVP en sprints de 2 semanas.',
  },
  P3: {
    name: 'P3 / Inyecta',
    accent: '#a78bfa',
    message:
      'Estás en momento de oro: aceleradora + postulación próxima. P3 te da la justificación técnica nivel ingeniería senior que evaluadores no rechazan.',
  },
};

type Answers = Record<string, Option | undefined>;

function computeResult(answers: Answers) {
  const total = Object.values(answers).reduce(
    (sum, a) => sum + (a?.score || 0),
    0,
  );
  const maxScore = QUESTIONS.length * 2;
  let phaseKey: 'P1' | 'P2' | 'P3' = 'P1';

  if (
    answers.accelerator?.label.startsWith('Sí') &&
    answers.funds?.label.startsWith('Sí')
  ) {
    phaseKey = 'P3';
  } else if (total >= 11) {
    phaseKey = 'P2';
  }

  return {
    scorePct: Math.round((total / maxScore) * 100) || 0,
    ...PHASE_DATA[phaseKey],
  };
}

type Step = 'quiz' | 'email' | 'result';

export default function DiagnosticoRapido() {
  const [step, setStep] = useState<Step>('quiz');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [email, setEmail] = useState('');

  const [typedQuestion, setTypedQuestion] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingText, setProcessingText] = useState('');

  const activeQuestion = QUESTIONS[currentQ];

  useEffect(() => {
    if (step !== 'quiz' || isProcessing || !activeQuestion) return;

    const textToType = activeQuestion.question;
    let currentText = '';
    let index = 0;

    setTypedQuestion('');

    const timerId = setInterval(() => {
      currentText += textToType[index];
      setTypedQuestion(currentText);
      index++;
      if (index >= textToType.length) {
        clearInterval(timerId);
      }
    }, 20);

    return () => clearInterval(timerId);
  }, [currentQ, step, isProcessing, activeQuestion]);

  const processAnswer = (option: Option) => {
    if (isProcessing) return;

    setIsProcessing(true);

    setAnswers((prev) => ({ ...prev, [activeQuestion.id]: option }));

    if (currentQ < QUESTIONS.length - 1) {
      setProcessingText('> GUARDANDO_INPUT...');
      setTimeout(() => {
        setCurrentQ((prev) => prev + 1);
        setIsProcessing(false);
      }, 800);
    } else {
      setProcessingText('> COMPILANDO_ARQUITECTURA...');
      setTimeout(() => {
        setStep('email');
        setIsProcessing(false);
      }, 800);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (step !== 'quiz' || isProcessing || !activeQuestion) return;
      const keyNum = parseInt(e.key, 10);
      if (
        !isNaN(keyNum) &&
        keyNum > 0 &&
        keyNum <= activeQuestion.options.length
      ) {
        processAnswer(activeQuestion.options[keyNum - 1]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, currentQ, isProcessing, activeQuestion]);

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setIsProcessing(true);
      setProcessingText('> DESENCRIPTANDO_MATCH...');
      setTimeout(() => {
        console.log('Lead capturado:', email, answers);
        setStep('result');
        setIsProcessing(false);
      }, 800);
    }
  };

  const handleRestart = () => {
    setStep('quiz');
    setCurrentQ(0);
    setAnswers({});
    setEmail('');
    setIsProcessing(false);
  };

  const progress =
    step === 'quiz' ? ((currentQ + 1) / QUESTIONS.length) * 100 : 100;

  return (
    <section
      id="diagnostico"
      className="pb-32 md:pb-40 max-w-3xl mx-auto scroll-mt-24"
    >
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <div className="eyebrow mb-5">
          <span>System Scan</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-5">
          Diagnóstico <span className="text-white/55">Estructural.</span>
        </h2>
        <p className="text-base md:text-lg text-white/65 font-light leading-relaxed">
          Usa las teclas{' '}
          <span className="font-mono text-[12px] bg-white/10 px-1.5 py-0.5 rounded text-white">
            [1] - [{activeQuestion?.options?.length || 4}]
          </span>{' '}
          para escanear tu organización en 60 segundos.
        </p>
      </div>

      <div className="diagnostico-terminal">
        <div className="terminal-header">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
            GSI_Core_Scanner_v3.0.exe
          </div>
          <div></div>
        </div>

        <div className="terminal-body relative">
          {isProcessing && (
            <div className="absolute inset-0 z-50 bg-[#030406] bg-opacity-95 flex flex-col items-center justify-center rounded-b-2xl">
              <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="font-mono text-[12px] text-blue-400 font-bold uppercase tracking-widest animate-pulse">
                {processingText}
              </p>
            </div>
          )}

          {step === 'quiz' && (
            <div className="animate-fadeIn">
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-[11px] text-blue-400 uppercase tracking-[0.2em]">
                  &gt;_ MODULE {String(currentQ + 1).padStart(2, '0')}/
                  {String(QUESTIONS.length).padStart(2, '0')}
                </span>
                <span className="font-mono text-[11px] text-white/30">
                  [{progress.toFixed(0)}% SCANNED]
                </span>
              </div>

              <h3 className="text-xl md:text-[24px] font-semibold text-white tracking-tight leading-tight mb-8 min-h-[60px]">
                {typedQuestion}
                <span className="animate-pulse text-blue-400 ml-1">_</span>
              </h3>

              <div className="space-y-3">
                {activeQuestion.options.map((opt, index) => (
                  <button
                    key={opt.label}
                    onClick={() => processAnswer(opt)}
                    className="terminal-option group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[11px] text-white/30 group-hover:text-blue-400 transition-colors">
                        [{index + 1}]
                      </span>
                      <span>{opt.label}</span>
                    </div>
                    <span className="terminal-option-arrow">↵ Enter</span>
                  </button>
                ))}
              </div>

              {currentQ > 0 && (
                <button
                  onClick={() => setCurrentQ((prev) => prev - 1)}
                  className="mt-8 font-mono text-[10px] text-white/30 hover:text-white/75 uppercase tracking-[0.2em] transition"
                >
                  &lt; REVERTIR_INPUT
                </button>
              )}
            </div>
          )}

          {step === 'email' && (
            <div className="py-6 text-center animate-fadeIn">
              <span className="font-mono text-[11px] text-green-400 uppercase tracking-[0.2em] mb-4 block">
                &gt; SYSTEM_READY
              </span>
              <h3 className="text-2xl md:text-[28px] font-semibold text-white tracking-tight leading-tight mb-4">
                Ingresa tu email para recibir el diagnóstico
              </h3>
              <p className="text-[15px] text-white/50 font-light mb-10 max-w-md mx-auto leading-relaxed">
                Hemos compilado tu reporte de arquitectura y tu índice de
                match. ¿A qué dirección lo enviamos?
              </p>

              <form
                onSubmit={handleEmailSubmit}
                className="max-w-sm mx-auto relative"
              >
                <span className="absolute left-4 top-4 font-mono text-blue-400">
                  &gt;_
                </span>
                <input
                  type="email"
                  required
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-lg pl-10 pr-4 py-4 text-[15px] font-mono text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 mb-6 transition-all"
                />
                <button
                  type="submit"
                  className="cta-primary w-full justify-center shadow-[0_0_20px_rgba(96,165,250,0.15)]"
                >
                  [ EJECUTAR REPORTE ]
                </button>
              </form>
            </div>
          )}

          {step === 'result' &&
            (() => {
              const r = computeResult(answers);
              return (
                <div className="py-4 text-center animate-fadeIn">
                  <span className="font-mono text-[11px] text-green-400 uppercase tracking-[0.2em] block mb-6">
                    &gt; DECRYPTION_SUCCESS
                  </span>

                  <div className="mb-8">
                    <div
                      className="font-mono text-[64px] md:text-[80px] font-bold text-white leading-none tracking-tighter"
                      style={{ textShadow: `0 0 40px ${r.accent}66` }}
                    >
                      {r.scorePct}
                      <span className="text-[40px] text-white/30">%</span>
                    </div>
                    <div className="font-mono text-[10px] text-white/40 uppercase tracking-[0.22em] mt-2">
                      System Match Index
                    </div>
                  </div>

                  <div
                    className="terminal-recommendation"
                    style={{
                      borderColor: `${r.accent}40`,
                      background: `${r.accent}10`,
                    }}
                  >
                    <span className="font-mono text-[10px] text-white/60 uppercase tracking-[0.2em] mb-2 block">
                      &gt; RECOMMENDED_PATH
                    </span>
                    <h4
                      className="font-mono text-xl md:text-[24px] font-bold uppercase tracking-tight mb-3"
                      style={{ color: r.accent }}
                    >
                      {r.name}
                    </h4>
                    <p className="text-[14px] text-white/70 font-light leading-relaxed max-w-md mx-auto">
                      {r.message}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                    <a
                      href="#agenda"
                      className="cta-primary bg-white text-black hover:scale-105 transition-transform"
                    >
                      Iniciar Integración
                    </a>
                    <button
                      onClick={handleRestart}
                      className="font-mono text-[11px] text-white/30 hover:text-white/70 uppercase tracking-[0.2em] transition"
                    >
                      [ RESET_SYSTEM ]
                    </button>
                  </div>
                </div>
              );
            })()}
        </div>
      </div>
    </section>
  );
}
