import React, { useState } from 'react';
import { CONFIG } from '../config';
import { StudentIdentity } from '../types';
import {
  User,
  Hash,
  ArrowRight,
  School,
  FileText,
  CheckCircle2,
  AlertCircle,
  BookOpen,
} from 'lucide-react';

interface Stage1IdentityProps {
  onStartExam: (identity: StudentIdentity) => void;
  initialIdentity?: StudentIdentity;
}

export const Stage1Identity: React.FC<Stage1IdentityProps> = ({
  onStartExam,
  initialIdentity,
}) => {
  const [nama, setNama] = useState(initialIdentity?.nama || '');
  const [noAbsen, setNoAbsen] = useState(initialIdentity?.noAbsen || '');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Data wajib diisi sebelum siswa dapat melanjutkan ke soal
    if (!nama.trim()) {
      setErrorMessage('Silakan isi Nama Lengkap terlebih dahulu.');
      return;
    }
    if (!noAbsen.trim()) {
      setErrorMessage('Silakan isi Nomor Absen.');
      return;
    }

    setErrorMessage('');
    onStartExam({
      nama: nama.trim(),
      noAbsen: noAbsen.trim(),
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Header Pengumuman Tes */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3 border border-blue-200">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{CONFIG.SEKOLAH}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Tes Sumatif {CONFIG.MATA_PELAJARAN} Kelas {CONFIG.KELAS}
        </h2>
        <p className="mt-2 text-sm text-slate-600 max-w-2xl mx-auto">
          Materi Pokok: <span className="font-semibold text-slate-800">{CONFIG.MATERI}</span> • Kriteria KKTP: <span className="font-semibold text-blue-700">{CONFIG.KKTP}</span>.
          Silakan masukkan identitas diri Anda sebelum menekan tombol Mulai Tes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Kolom Kiri: Formulir Identitas Siswa */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Tahap 1 — Identitas Siswa
              </h3>
              <p className="text-xs text-slate-500">
                Seluruh kolom bertanda bintang (<span className="text-red-500">*</span>) wajib diisi
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              Siswa Terdaftar
            </span>
          </div>

          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nama Lengkap */}
            <div>
              <label
                htmlFor="input-nama-lengkap"
                className="block text-xs font-bold text-slate-700 mb-1.5"
              >
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="input-nama-lengkap"
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Contoh: I Putu Agus Wirawan"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                  required
                  autoFocus
                />
              </div>
            </div>

            {/* Nomor Absen */}
            <div>
              <label
                htmlFor="input-no-absen"
                className="block text-xs font-bold text-slate-700 mb-1.5"
              >
                Nomor Absen <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Hash className="w-4 h-4" />
                </div>
                <input
                  id="input-no-absen"
                  type="number"
                  min="1"
                  max="60"
                  value={noAbsen}
                  onChange={(e) => setNoAbsen(e.target.value)}
                  placeholder="Contoh: 15"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            {/* Informasi Kelas */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs text-slate-600">
              <span className="font-medium">Kelas / Jenjang:</span>
              <span className="font-bold text-slate-800">Kelas {CONFIG.KELAS} ({CONFIG.SEKOLAH})</span>
            </div>

            {/* Tombol Mulai Tes */}
            <div className="pt-2">
              <button
                id="btn-mulai-tes"
                type="submit"
                className="w-full py-3.5 px-5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
              >
                <span>Mulai Tes</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Kolom Kanan: Rincian Info Tes & Ketentuan Soal */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-400" />
              Struktur &amp; Komposisi Soal
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <span>1. Pilihan Ganda (PG)</span>
                <span className="font-bold text-blue-300">20 Butir</span>
              </div>
              <div className="flex items-center justify-between bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <span>2. Pilihan Ganda Kompleks (PGK)</span>
                <span className="font-bold text-emerald-300">5 Butir</span>
              </div>
              <div className="flex items-center justify-between bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <span>3. PGK Kategori (Benar/Salah, Sesuai/Tidak)</span>
                <span className="font-bold text-amber-300">5 Butir</span>
              </div>
              <div className="flex items-center justify-between bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <span>4. Isian Singkat</span>
                <span className="font-bold text-indigo-300">5 Butir</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-slate-300">
                <span>Total Butir Soal:</span>
                <span className="font-extrabold text-white text-sm">35 Butir</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1.5">
              <p className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>Soal dan opsi jawaban diacak setiap kali tes dimulai.</span>
              </p>
              <p className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>Seluruh 35 butir soal wajib dijawab sebelum jawaban dapat dikirim.</span>
              </p>
              <p className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>Waktu Pengerjaan: <strong>{CONFIG.DURASI_LABEL}</strong> (Hitungan mundur otomatis 02.00.00 s.d 00.00.00).</span>
              </p>
              <p className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>Kriteria Ketercapaian Tujuan Pembelajaran (KKTP): <strong>{CONFIG.KKTP}</strong>.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
