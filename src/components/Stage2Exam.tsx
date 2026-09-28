import React, { useState, useMemo, useEffect, useRef } from 'react';
import { CONFIG } from '../config';
import {
  Question,
  ShuffledQuestion,
  StudentIdentity,
  AnswerValue,
  ExamResult,
  OptionItem,
} from '../types';
import { gasService } from '../services/gasService';
import { downloadExamQuestionsPDF } from '../utils/pdfGenerator';
import {
  ChevronLeft,
  ChevronRight,
  Send,
  Download,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Loader2,
  User,
  Check,
  Clock,
  AlertTriangle,
} from 'lucide-react';

interface Stage2ExamProps {
  student: StudentIdentity;
  questions: Question[];
  onFinishExam: (result: ExamResult) => void;
}

// Fisher-Yates shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const Stage2Exam: React.FC<Stage2ExamProps> = ({
  student,
  questions,
  onFinishExam,
}) => {
  // 1. Acak urutan soal dan pilihan jawaban setiap kali tes dimulai
  const shuffledQuestions = useMemo<ShuffledQuestion[]>(() => {
    // Acak urutan soal
    const shuffledQ: Question[] = shuffleArray<Question>(questions);

    return shuffledQ.map((q: Question) => {
      if ((q.type === 'pg' || q.type === 'pgk') && q.options && q.options.length > 0) {
        // Acak opsi jawaban dan beri penamaan A, B, C, D yang rapi
        const shuffledOpts: OptionItem[] = shuffleArray<OptionItem>(q.options);
        const standardLabels = ['A', 'B', 'C', 'D'];
        const remappedOptions: OptionItem[] = shuffledOpts.map((opt, idx) => ({
          id: standardLabels[idx] || opt.id,
          text: opt.text,
        }));

        return {
          ...q,
          originalQuestionId: q.id,
          shuffledOptions: remappedOptions,
        };
      }
      return {
        ...q,
        originalQuestionId: q.id,
      };
    });
  }, [questions]);

  // State pengerjaan
  const [currentIndex, setCurrentIndex] = useState(0);
  // Answers state keyed by question index (0 to 39)
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  // Konfirmasi kirim modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // Status pengiriman
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Hitungan Mundur Waktu (02.00.00 s.d 00.00.00 = 7200 detik)
  const [timeLeft, setTimeLeft] = useState<number>(CONFIG.DURASI_DETIK || 7200);
  const [isTimeExpired, setIsTimeExpired] = useState<boolean>(false);
  const answersRef = useRef(answers);
  answersRef.current = answers;

  // Format detik menjadi 02.00.00 s.d 00.00.00
  const formatCountdown = (totalSeconds: number): string => {
    const s = Math.max(0, totalSeconds);
    const hours = Math.floor(s / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(hours)}.${pad(minutes)}.${pad(seconds)}`;
  };

  const currentQ = shuffledQuestions[currentIndex];
  const totalQuestions = shuffledQuestions.length;

  // Cek apakah soal nomor tertentu sudah dijawab
  const isQuestionAnswered = (idx: number): boolean => {
    const ans = answers[idx];
    if (ans === undefined || ans === null) return false;

    const q = shuffledQuestions[idx];
    if (q.type === 'pg') {
      return typeof ans === 'string' && ans.trim().length > 0;
    }
    if (q.type === 'pgk') {
      return Array.isArray(ans) && ans.length > 0;
    }
    if (q.type === 'pgk_kategori') {
      if (typeof ans === 'object' && !Array.isArray(ans)) {
        const statements = q.statements || [];
        return statements.length > 0 && statements.every((st) => ans[st.id] !== undefined);
      }
      return false;
    }
    if (q.type === 'isian') {
      return typeof ans === 'string' && ans.trim().length > 0;
    }
    return false;
  };

  // Hitung jumlah soal yang telah dijawab
  const answeredCount = useMemo(() => {
    let count = 0;
    for (let i = 0; i < totalQuestions; i++) {
      if (isQuestionAnswered(i)) count++;
    }
    return count;
  }, [answers, totalQuestions, shuffledQuestions]);

  const allAnswered = answeredCount === totalQuestions;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  // Handler jawaban Pilihan Ganda (PG)
  const handleSelectPG = (optionText: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionText,
    }));
  };

  // Handler jawaban Pilihan Ganda Kompleks (PGK)
  const handleTogglePGK = (optionText: string) => {
    setAnswers((prev) => {
      const currentList = Array.isArray(prev[currentIndex]) ? (prev[currentIndex] as string[]) : [];
      if (currentList.includes(optionText)) {
        return {
          ...prev,
          [currentIndex]: currentList.filter((item) => item !== optionText),
        };
      } else {
        return {
          ...prev,
          [currentIndex]: [...currentList, optionText],
        };
      }
    });
  };

  // Handler jawaban PGK Kategori (Benar/Salah, Sesuai/Tidak Sesuai, Setuju/Tidak Setuju)
  const handleSetCategoryStatement = (statementId: string, value: boolean) => {
    setAnswers((prev) => {
      const currentMap =
        typeof prev[currentIndex] === 'object' && !Array.isArray(prev[currentIndex])
          ? { ...(prev[currentIndex] as Record<string, boolean>) }
          : {};
      currentMap[statementId] = value;
      return {
        ...prev,
        [currentIndex]: currentMap,
      };
    });
  };

  // Handler jawaban Isian Singkat
  const handleSetIsian = (val: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: val,
    }));
  };

  // Navigasi soal
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) setCurrentIndex(currentIndex + 1);
  };

  // Hitung Nilai & Validasi
  const calculateResult = (customAnswers?: Record<number, AnswerValue>): ExamResult => {
    const activeAnswers = customAnswers || answers;
    let totalScore = 0;
    let benarCount = 0;

    shuffledQuestions.forEach((sq, idx) => {
      const userAns = activeAnswers[idx];
      // Cari soal original untuk periksa kunci jawaban
      const origQ = questions.find((q) => q.id === sq.originalQuestionId) || sq;

      if (sq.type === 'pg') {
        const correctOpt = origQ.options?.find((o) => o.id === origQ.correctAnswer);
        if (correctOpt && userAns === correctOpt.text) {
          totalScore += 1;
          benarCount += 1;
        }
      } else if (sq.type === 'pgk') {
        const correctKeys = Array.isArray(origQ.correctAnswer) ? origQ.correctAnswer : [];
        const correctTexts = (origQ.options || [])
          .filter((o) => correctKeys.includes(o.id))
          .map((o) => o.text);

        const userSelected = Array.isArray(userAns) ? userAns : [];
        const isMatch =
          correctTexts.length === userSelected.length &&
          correctTexts.every((txt) => userSelected.includes(txt));

        if (isMatch) {
          totalScore += 1;
          benarCount += 1;
        }
      } else if (sq.type === 'pgk_kategori') {
        const statements = origQ.statements || [];
        const userMap = (typeof userAns === 'object' && !Array.isArray(userAns) ? userAns : {}) as Record<string, boolean>;

        let statementsCorrect = 0;
        statements.forEach((st) => {
          if (userMap[st.id] === st.correctAnswer) {
            statementsCorrect += 1;
          }
        });

        if (statements.length > 0 && statementsCorrect === statements.length) {
          totalScore += 1;
          benarCount += 1;
        } else if (statements.length > 0) {
          totalScore += statementsCorrect / statements.length;
        }
      } else if (sq.type === 'isian') {
        const userText = typeof userAns === 'string' ? userAns.trim().toLowerCase() : '';
        const acceptable = (origQ.acceptableAnswers || [String(origQ.correctAnswer || '')]).map((a) =>
          a.trim().toLowerCase()
        );

        if (userText && acceptable.includes(userText)) {
          totalScore += 1;
          benarCount += 1;
        }
      }
    });

    // Skala 0 - 100
    const finalScore = Math.round((totalScore / totalQuestions) * 100);
    const salahCount = totalQuestions - benarCount;
    const status: 'Lulus' | 'Belum Lulus' = finalScore >= CONFIG.KKTP ? 'Lulus' : 'Belum Lulus';

    return {
      id: `res-${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID'),
      nama: student.nama,
      noAbsen: student.noAbsen,
      kelas: CONFIG.KELAS,
      benar: benarCount,
      salah: salahCount,
      nilai: finalScore,
      status,
      detailJawaban: activeAnswers,
    };
  };

  // Handler otomatis saat waktu habis (00.00.00)
  const handleTimeUpAutoSubmit = async () => {
    setIsSubmitting(true);
    setShowConfirmModal(false);
    const calculatedResult = calculateResult(answersRef.current);
    try {
      await gasService.submitExamResult(calculatedResult);
    } catch (e) {
      console.warn('Gagal sinkronisasi cloud saat waktu habis (tersimpan lokal):', e);
    } finally {
      setIsSubmitting(false);
      onFinishExam(calculatedResult);
    }
  };

  // Efek Countdown Timer dari 02.00.00 sampai 00.00.00
  useEffect(() => {
    if (timeLeft <= 0) {
      if (!isTimeExpired) {
        setIsTimeExpired(true);
        handleTimeUpAutoSubmit();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isTimeExpired]);

  // Proses Kirim Jawaban ke Google Apps Script
  const handleConfirmSubmit = async () => {
    // Validasi ulang: siswa tidak dapat mengirim tes sebelum seluruh soal dijawab
    if (!allAnswered) {
      alert('Masih ada butir soal yang belum dijawab. Harap jawab seluruh soal terlebih dahulu!');
      setShowConfirmModal(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const calculatedResult = calculateResult();

    try {
      // Kirim data ke Google Apps Script / Spreadsheet
      await gasService.submitExamResult(calculatedResult);
      setIsSubmitting(false);
      setShowConfirmModal(false);
      onFinishExam(calculatedResult);
    } catch (err: any) {
      setIsSubmitting(false);
      setSubmitError(
        err.message ||
          'Gagal mengirim data ke server. Periksa koneksi internet atau konfigurasi Google Apps Script.'
      );
    }
  };

  // Opsi aktif untuk soal saat ini
  const currentOptions = currentQ.shuffledOptions || currentQ.options || [];

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6">
      {/* Header Info Siswa & Progres */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">{student.nama}</span>
                <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded">
                  Absen: {student.noAbsen}
                </span>
                <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded">
                  Kelas {CONFIG.KELAS}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {CONFIG.SEKOLAH} • {CONFIG.MATA_PELAJARAN} ({CONFIG.MATERI})
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Indikator Hitungan Mundur Waktu (02.00.00 s.d 00.00.00) */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border transition-colors ${
                timeLeft <= 300
                  ? 'bg-rose-50 border-rose-300 text-rose-800'
                  : timeLeft <= 900
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
              title="Sisa Waktu Ujian (Hitungan Mundur 02.00.00 s.d 00.00.00)"
            >
              <Clock
                className={`w-4 h-4 shrink-0 ${
                  timeLeft <= 300
                    ? 'text-rose-600 animate-pulse'
                    : timeLeft <= 900
                    ? 'text-amber-600'
                    : 'text-blue-600'
                }`}
              />
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold text-slate-500 leading-none">
                  Sisa Waktu
                </span>
                <span className="font-mono tabular-nums font-black text-sm sm:text-base tracking-wider leading-tight text-slate-900 mt-0.5">
                  {formatCountdown(timeLeft)}
                </span>
              </div>
            </div>

            {/* Tombol Unduh Naskah Soal PDF */}
            <button
              id="btn-download-questions-pdf"
              onClick={() => downloadExamQuestionsPDF(questions)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-300 cursor-pointer"
              title="Unduh Lembar Naskah Soal dalam bentuk PDF"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Unduh Soal (PDF)</span>
            </button>
          </div>
        </div>

        {/* Progress Bar & Indikator */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
            <span className="text-slate-600">
              Progres Pengerjaan: <span className="text-blue-700 font-bold">{answeredCount}</span> dari {totalQuestions} Soal Terjawab
            </span>
            <span className="text-blue-700 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Layout: Konten Soal + Navigasi Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Kolom Kiri: Lembar Soal Aktif */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200 min-h-[420px] flex flex-col justify-between">
            <div>
              {/* Header Nomor & Tipe Soal */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm sm:text-base font-extrabold px-3 py-1 bg-blue-700 text-white rounded-xl shadow-2xs">
                    Soal No. {currentIndex + 1}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                    {currentQ.type === 'pg' && 'Pilihan Ganda'}
                    {currentQ.type === 'pgk' && 'Pilihan Ganda Kompleks'}
                    {currentQ.type === 'pgk_kategori' && 'PGK Kategori'}
                    {currentQ.type === 'isian' && 'Isian Singkat'}
                  </span>
                </div>
                <span className="text-xs font-medium text-slate-500">
                  {currentQ.topic}
                </span>
              </div>

              {/* Petunjuk Pengisian Berdasarkan Tipe */}
              <div className="mb-4 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-100 inline-block">
                {currentQ.type === 'pg' && 'Pilihlah salah satu jawaban yang paling tepat.'}
                {currentQ.type === 'pgk' && 'Pilihlah seluruh pilihan jawaban yang benar (bisa lebih dari satu).'}
                {currentQ.type === 'pgk_kategori' &&
                  `Tentukan pilihan ${currentQ.categoryLabels?.positive || 'Benar'} atau ${currentQ.categoryLabels?.negative || 'Salah'} untuk setiap pernyataan di bawah ini.`}
                {currentQ.type === 'isian' && 'Ketikkan jawaban singkat dan tepat pada kolom yang disediakan.'}
              </div>

              {/* Teks Soal */}
              <div className="text-sm sm:text-base text-slate-900 leading-relaxed font-medium whitespace-pre-line mb-4">
                {currentQ.text}
              </div>

              {/* Tampilan Gambar / Ilustrasi Simpul Jika Ada */}
              {currentQ.imageSvg && (
                <div className="mb-6 flex flex-col items-center justify-center p-4 bg-slate-50/90 border border-slate-200 rounded-2xl">
                  <div
                    className="flex items-center justify-center max-w-full overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: currentQ.imageSvg }}
                  />
                  <span className="text-[11px] text-slate-500 mt-2 font-medium">
                    Ilustrasi Pendukung Soal
                  </span>
                </div>
              )}

              {/* Tampilan Opsi: Pilihan Ganda (PG) */}
              {currentQ.type === 'pg' && (
                <div className="space-y-2.5">
                  {currentOptions.map((opt) => {
                    const isSelected = answers[currentIndex] === opt.text;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectPG(opt.text)}
                        className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/70 text-blue-950 font-semibold ring-1 ring-blue-500'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {opt.id}
                        </div>
                        <span className="text-xs sm:text-sm mt-0.5 leading-normal flex-1">
                          {opt.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Tampilan Opsi: Pilihan Ganda Kompleks (PGK) */}
              {currentQ.type === 'pgk' && (
                <div className="space-y-2.5">
                  {currentOptions.map((opt) => {
                    const currentList = Array.isArray(answers[currentIndex])
                      ? (answers[currentIndex] as string[])
                      : [];
                    const isChecked = currentList.includes(opt.text);

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleTogglePGK(opt.text)}
                        className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                          isChecked
                            ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-semibold ring-1 ring-emerald-500'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                            isChecked
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {isChecked ? <Check className="w-4 h-4" /> : opt.id}
                        </div>
                        <span className="text-xs sm:text-sm mt-0.5 leading-normal flex-1">
                          {opt.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Tampilan Opsi: PGK Kategori (Benar/Salah, Sesuai/Tidak, Setuju/Tidak) */}
              {currentQ.type === 'pgk_kategori' && (
                <div className="space-y-3">
                  {(currentQ.statements || []).map((st, sIdx) => {
                    const ansMap =
                      typeof answers[currentIndex] === 'object' && !Array.isArray(answers[currentIndex])
                        ? (answers[currentIndex] as Record<string, boolean>)
                        : {};
                    const currentVal = ansMap[st.id];
                    const posLabel = currentQ.categoryLabels?.positive || 'Benar';
                    const negLabel = currentQ.categoryLabels?.negative || 'Salah';

                    return (
                      <div
                        key={st.id}
                        className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/60"
                      >
                        <p className="text-xs sm:text-sm text-slate-800 font-medium mb-3">
                          <span className="font-bold text-blue-700 mr-1.5">
                            {sIdx + 1}.
                          </span>
                          {st.text}
                        </p>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleSetCategoryStatement(st.id, true)}
                            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 border cursor-pointer uppercase ${
                              currentVal === true
                                ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{posLabel}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSetCategoryStatement(st.id, false)}
                            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 border cursor-pointer uppercase ${
                              currentVal === false
                                ? 'bg-rose-600 border-rose-600 text-white shadow-xs'
                                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>{negLabel}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tampilan Isian Singkat */}
              {currentQ.type === 'isian' && (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Ketikkan Jawaban Anda di Bawah Ini:
                    </label>
                    <input
                      type="text"
                      value={typeof answers[currentIndex] === 'string' ? (answers[currentIndex] as string) : ''}
                      onChange={(e) => handleSetIsian(e.target.value)}
                      placeholder="Tulis jawaban singkat di sini..."
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-slate-900"
                    />
                    <p className="mt-1.5 text-[11px] text-slate-400">
                      Jawaban tidak membedakan huruf besar atau kecil (misal: "makrame" atau "Makrame").
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Tombol Aksi Bawah: Sebelumnya & Berikutnya */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100 gap-3">
              <button
                id="btn-prev-question"
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              {currentIndex < totalQuestions - 1 ? (
                <button
                  id="btn-next-question"
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  id="btn-finish-test-prompt"
                  type="button"
                  onClick={() => setShowConfirmModal(true)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Jawaban</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Grid Navigasi Nomor Soal & Ringkasan */}
        <div className="lg:col-span-4 space-y-4">
          {/* Kotak Hitungan Mundur Waktu (02.00.00 s.d 00.00.00) */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              timeLeft <= 300
                ? 'bg-rose-50 border-rose-300 text-rose-950 shadow-xs ring-1 ring-rose-200'
                : timeLeft <= 900
                ? 'bg-amber-50 border-amber-300 text-amber-950 shadow-xs'
                : 'bg-white border-slate-200 text-slate-800 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1">
              <span className="flex items-center gap-1.5">
                <Clock
                  className={`w-4 h-4 ${
                    timeLeft <= 300
                      ? 'text-rose-600 animate-pulse'
                      : timeLeft <= 900
                      ? 'text-amber-600'
                      : 'text-blue-600'
                  }`}
                />
                <span>Sisa Waktu Ujian</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">Mulai: 02.00.00</span>
            </div>

            <div className="text-center py-1.5">
              <span className="font-mono tabular-nums font-black text-3xl sm:text-4xl tracking-widest text-slate-900 block">
                {formatCountdown(timeLeft)}
              </span>
            </div>

            {timeLeft <= 300 ? (
              <div className="text-[11px] text-rose-700 font-bold text-center mt-1 flex items-center justify-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 animate-bounce" />
                <span>Waktu hampir habis! Segera selesaikan jawaban.</span>
              </div>
            ) : timeLeft <= 900 ? (
              <div className="text-[11px] text-amber-700 font-semibold text-center mt-1">
                Perhatian: Sisa waktu kurang dari 15 menit!
              </div>
            ) : (
              <div className="text-[11px] text-slate-500 text-center mt-1">
                Hitungan mundur otomatis ke 00.00.00
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center justify-between">
              <span>Nomor Soal Ujian</span>
              <span className="text-[11px] font-normal text-slate-500">{totalQuestions} Butir</span>
            </h4>

            {/* Grid 35 Soal */}
            <div className="grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-5 gap-2 mb-4">
              {shuffledQuestions.map((_, i) => {
                const isCurrent = currentIndex === i;
                const isAnswered = isQuestionAnswered(i);

                let btnClass = 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';
                if (isAnswered) {
                  btnClass = 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700';
                }
                if (isCurrent) {
                  btnClass = 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-300 font-extrabold';
                }

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
                    className={`h-9 rounded-lg font-bold text-xs flex items-center justify-center border transition-all cursor-pointer ${btnClass}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            {/* Keterangan Warna */}
            <div className="space-y-1.5 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600" />
                <span>Soal Sedang Dikerjakan</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-600" />
                <span>Sudah Dijawab ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-200" />
                <span>Belum Dijawab ({totalQuestions - answeredCount})</span>
              </div>
            </div>

            {/* Tombol Selesai / Kirim Jawaban Sidebar */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <button
                id="btn-sidebar-submit"
                type="button"
                onClick={() => setShowConfirmModal(true)}
                className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  allAnswered
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>
                  {allAnswered ? 'Selesai & Kirim Jawaban' : 'Kirim Jawaban'}
                </span>
              </button>

              {!allAnswered && (
                <p className="mt-2 text-[11px] text-amber-700 text-center font-medium">
                  Harap jawab seluruh {totalQuestions} soal sebelum mengirim.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Otomatis Jika Waktu Habis (00.00.00) */}
      {isTimeExpired && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-1">
              Waktu Ujian Telah Habis!
            </h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Hitungan mundur telah mencapai <span className="font-mono font-bold text-rose-600">00.00.00</span>. Jawaban Anda sedang disimpan dan dialihkan ke laporan hasil tes...
            </p>
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-blue-700">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Menyimpan nilai ke Google Spreadsheet...</span>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Kirim Jawaban */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Konfirmasi Pengiriman Jawaban
                </h3>
                <p className="text-xs text-slate-500">
                  Periksa kembali kepastian jawaban Anda
                </p>
              </div>
            </div>

            {!allAnswered ? (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs mb-5">
                <p className="font-bold mb-1">Peringatan: Belum Semua Soal Dijawab!</p>
                <p>
                  Anda baru menjawab <span className="font-bold">{answeredCount}</span> dari {totalQuestions} butir soal. Sesuai ketentuan, siswa tidak dapat mengirim tes sebelum seluruh soal dijawab.
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs mb-5 space-y-1">
                <p className="font-bold text-sm">Apakah Anda yakin ingin mengirim jawaban?</p>
                <p>
                  Setelah dikirim, nilai akhir Anda akan langsung dihitung dan otomatis tersimpan ke rekap Google Spreadsheet sekolah.
                </p>
              </div>
            )}

            {submitError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs mb-4">
                <p className="font-bold mb-1 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Gagal Mengirim Data
                </p>
                <p>{submitError}</p>
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                id="btn-cancel-submit"
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  setShowConfirmModal(false);
                  setSubmitError(null);
                }}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
              >
                Batal / Periksa Kembali
              </button>

              {allAnswered && (
                <button
                  id="btn-confirm-submit-answers"
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleConfirmSubmit}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Mengirim ke Server...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Ya, Kirim Jawaban</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
