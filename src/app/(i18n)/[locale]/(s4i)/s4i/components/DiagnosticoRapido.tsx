'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { DIAGNOSTIC_QUESTION_SCORES } from '../constants';

type Option = { label: string; score: number };
type Question = {
  id: string;
  question: string;
  options: Option[];
};

type RawQuestion = {
  id: string;
  question: string;
  options: string[];
};

type PhaseKey = 'P1' | 'P2' | 'P3';
type PhaseData = { name: string; accent: string; message: string };

const PHASE_ACCENTS: Record<PhaseKey, string> = {
  P1: '#60a5fa',
  P2: '#818cf8',
  P3: '#a78bfa',
};

type Answers = Record<string, Option | undefined>;

type Step = 'quiz' | 'email' | 'result';

export default function DiagnosticoRapido() {
  const t = useTranslations('S4i.DiagnosticoRapido');
  const yesPrefix = t('yesPrefix');

  const QUESTIONS: Question[] = useMemo(() => {
    const raw = t.raw('questions') as RawQuestion[];
    return raw.map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options.map((label, i) => ({
        label,
        score: DIAGNOSTIC_QUESTION_SCORES[q.id]?.[i] ?? 0,
      })),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const PHASE_DATA: Record<PhaseKey, PhaseData> = useMemo(() => {
    const phases = t.raw('phases') as Record<
      PhaseKey,
      { name: string; message: string }
    >;
    return {
      P1: { ...phases.P1, accent: PHASE_ACCENTS.P1 },
      P2: { ...phases.P2, accent: PHASE_ACCENTS.P2 },
      P3: { ...phases.P3, accent: PHASE_ACCENTS.P3 },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function computeResult(answers: Answers) {
    const total = Object.values(answers).reduce(
      (sum, a) => sum + (a?.score || 0),
      0,
    );
    const maxScore = QUESTIONS.length * 2;
    let phaseKey: PhaseKey = 'P1';

    if (
      answers.accelerator?.label.startsWith(yesPrefix) &&
      answers.funds?.label.startsWith(yesPrefix)
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
      setProcessingText(t('saving'));
      setTimeout(() => {
        setCurrentQ((prev) => prev + 1);
        setIsProcessing(false);
      }, 800);
    } else {
      setProcessingText(t('compiling'));
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
      setProcessingText(t('decrypting'));
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
          <span>{t('eyebrow')}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-5">
          {t('titleSoft')} <span className="text-white/55">{t('titleStrong')}</span>
        </h2>
        <p className="text-base md:text-lg text-white/65 font-light leading-relaxed">
          {t('instructionsLead')}{' '}
          <span className="font-mono text-[12px] bg-white/10 px-1.5 py-0.5 rounded text-white">
            [1] - [{activeQuestion?.options?.length || 4}]
          </span>{' '}
          {t('instructionsTrail')}
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
                  &gt;_ {t('moduleLabel')} {String(currentQ + 1).padStart(2, '0')}/
                  {String(QUESTIONS.length).padStart(2, '0')}
                </span>
                <span className="font-mono text-[11px] text-white/30">
                  [{progress.toFixed(0)}{t('scannedLabel')}]
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
                  {t('revert')}
                </button>
              )}
            </div>
          )}

          {step === 'email' && (
            <div className="py-6 text-center animate-fadeIn">
              <span className="font-mono text-[11px] text-green-400 uppercase tracking-[0.2em] mb-4 block">
                {t('emailHeader')}
              </span>
              <h3 className="text-2xl md:text-[28px] font-semibold text-white tracking-tight leading-tight mb-4">
                {t('emailTitle')}
              </h3>
              <p className="text-[15px] text-white/50 font-light mb-10 max-w-md mx-auto leading-relaxed">
                {t('emailDescription')}
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
                  placeholder={t('emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-lg pl-10 pr-4 py-4 text-[15px] font-mono text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 mb-6 transition-all"
                />
                <button
                  type="submit"
                  className="cta-primary w-full justify-center shadow-[0_0_20px_rgba(96,165,250,0.15)]"
                >
                  {t('emailSubmit')}
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
                    {t('resultHeader')}
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
                      {t('resultIndex')}
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
                      {t('recommendedLabel')}
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
                      {t('ctaIntegrate')}
                    </a>
                    <button
                      onClick={handleRestart}
                      className="font-mono text-[11px] text-white/30 hover:text-white/70 uppercase tracking-[0.2em] transition"
                    >
                      {t('reset')}
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
