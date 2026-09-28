/**
 * Definisi Type & Interface Aplikasi Tes Sumatif
 */

export type QuestionType = 'pg' | 'pgk' | 'pgk_kategori' | 'isian';
export type Difficulty = 'Mudah' | 'Sedang' | 'Sukar';

export interface StudentBirthDate {
  hari?: string;
  bulan?: string;
  tahun?: string;
}

export interface StudentIdentity {
  nama: string;
  noAbsen: string;
  tglLahir?: StudentBirthDate;
}

export interface OptionItem {
  id: string; // e.g. 'A', 'B', 'C', 'D'
  text: string;
}

export interface StatementItem {
  id: string; // e.g. 's1', 's2', 's3'
  text: string;
  correctAnswer: boolean; // true = Benar/Sesuai/Setuju, false = Salah/Tidak Sesuai/Tidak Setuju
}

export interface Question {
  id: number;
  type: QuestionType;
  text: string;
  imageSvg?: string; // Format SVG visual ilustrasi simpul & ikatan
  options?: OptionItem[]; // Untuk 'pg' (4 opsi) dan 'pgk' (3 atau 4 opsi)
  statements?: StatementItem[]; // Untuk 'pgk_kategori' (pernyataan)
  categoryLabels?: {
    positive: string; // Misal: 'Benar', 'Setuju', atau 'Sesuai'
    negative: string; // Misal: 'Salah', 'Tidak Setuju', atau 'Tidak Sesuai'
  };
  correctAnswer?: string | string[]; // string untuk 'pg' & 'isian', array string untuk 'pgk'
  acceptableAnswers?: string[]; // Variasi jawaban benar untuk soal isian singkat
  difficulty: Difficulty;
  explanation: string;
  topic: string;
}

export interface ShuffledQuestion extends Question {
  originalQuestionId: number;
  shuffledOptions?: OptionItem[];
}

export type AnswerValue = string | string[] | Record<string, boolean>;

export interface ExamResult {
  id?: string;
  timestamp: string;
  nama: string;
  noAbsen: string;
  kelas: string;
  tglLahir?: string;
  benar: number;
  salah: number;
  nilai: number;
  status: 'Lulus' | 'Belum Lulus';
  detailJawaban?: Record<number, AnswerValue>;
}

export type AppStage = 1 | 2 | 3 | 4;
