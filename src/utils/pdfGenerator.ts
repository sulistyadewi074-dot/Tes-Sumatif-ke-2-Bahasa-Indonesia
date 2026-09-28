import { jsPDF } from 'jspdf';
import { CONFIG } from '../config';
import { ExamResult, Question } from '../types';

/**
 * Format tanggal dalam bahasa Indonesia
 */
export function formatIndonesianDate(dateStr?: string): string {
  const d = dateStr ? new Date(dateStr) : new Date();
  if (isNaN(d.getTime())) {
    return new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * 1. Download Lembar Hasil Tes Siswa (PDF Resmi Berkop dan Bertanda Tangan Guru & Orang Tua/Wali)
 */
export function downloadStudentResultPDF(result: ExamResult): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  // --- KOP SURAT SEKOLAH ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('PEMERINTAH KABUPATEN JEMBRANA', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.text('DINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA', pageWidth / 2, y, { align: 'center' });
  y += 6;
  doc.setFontSize(14);
  doc.text(CONFIG.SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(CONFIG.ALAMAT_SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 3;

  // Garis Pembatas Kop
  doc.setLineWidth(0.8);
  doc.line(15, y, pageWidth - 15, y);
  doc.setLineWidth(0.2);
  doc.line(15, y + 0.8, pageWidth - 15, y + 0.8);
  y += 8;

  // --- JUDUL DOKUMEN ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('LEMBAR LAPORAN HASIL TES SUMATIF', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Tahun Ajaran 2025/2026`, pageWidth / 2, y, { align: 'center' });
  y += 9;

  // --- DATA IDENTITAS SISWA ---
  doc.setDrawColor(200, 200, 200);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, y, pageWidth - 30, 36, 2, 2, 'FD');

  doc.setFontSize(10);
  const leftX = 20;
  const col2X = 58;
  const rightX = 115;
  const col4X = 150;

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Nama Peserta', leftX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${result.nama}`, col2X, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Mata Pelajaran', rightX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${CONFIG.MATA_PELAJARAN}`, col4X, y);

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Nomor Absen', leftX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${result.noAbsen}`, col2X, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Materi / Pokok', rightX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${CONFIG.MATERI}`, col4X, y);

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Kelas', leftX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${result.kelas || CONFIG.KELAS}`, col2X, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Standar KKTP', rightX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${CONFIG.KKTP} (Skala 100)`, col4X, y);

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Waktu Pengerjaan', leftX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${result.timestamp}`, col2X, y);

  y += 12;

  // --- TABEL PEROLEHAN HASIL ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('A. Hasil Perolehan Nilai Tes', 15, y);
  y += 5;

  // Header Tabel
  doc.setFillColor(30, 58, 138); // Dark Navy Blue
  doc.rect(15, y, pageWidth - 30, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text('Komponen Penilaian', 20, y + 5.5);
  doc.text('Jumlah / Nilai', pageWidth - 45, y + 5.5, { align: 'right' });
  doc.setTextColor(0, 0, 0);
  y += 8;

  const totalQuestionsCount =
    (result.benar || 0) + (result.salah || 0) > 0 ? (result.benar || 0) + (result.salah || 0) : 35;
  const tableRows = [
    { label: 'Jumlah Soal Keseluruhan', value: `${totalQuestionsCount} Butir Soal` },
    { label: 'Jumlah Jawaban Benar', value: `${result.benar} Soal` },
    { label: 'Jumlah Jawaban Salah / Tidak Tepat', value: `${result.salah} Soal` },
    { label: 'Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)', value: `${CONFIG.KKTP}` },
  ];

  doc.setFont('helvetica', 'normal');
  tableRows.forEach((row, i) => {
    doc.setFillColor(i % 2 === 0 ? 255 : 248, i % 2 === 0 ? 255 : 250, i % 2 === 0 ? 255 : 252);
    doc.rect(15, y, pageWidth - 30, 7.5, 'F');
    doc.rect(15, y, pageWidth - 30, 7.5, 'S');
    doc.text(row.label, 20, y + 5);
    doc.text(row.value, pageWidth - 45, y + 5, { align: 'right' });
    y += 7.5;
  });

  // Baris Nilai Akhir & Status
  const isPass = result.status === 'Lulus' || result.nilai >= CONFIG.KKTP;
  doc.setFillColor(isPass ? 240 : 254, isPass ? 253 : 242, isPass ? 244 : 242);
  doc.rect(15, y, pageWidth - 30, 10, 'F');
  doc.rect(15, y, pageWidth - 30, 10, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('NILAI AKHIR TES SUMATIF (Skala 0 - 100)', 20, y + 6.5);
  doc.setFontSize(13);
  doc.setTextColor(isPass ? 22 : 185, isPass ? 101 : 28, isPass ? 52 : 28);
  doc.text(String(result.nilai), pageWidth - 45, y + 7, { align: 'right' });
  doc.setTextColor(0, 0, 0);
  y += 10;

  // Status Baris
  doc.setFillColor(241, 245, 249);
  doc.rect(15, y, pageWidth - 30, 9, 'F');
  doc.rect(15, y, pageWidth - 30, 9, 'S');
  doc.setFontSize(10);
  doc.text('Keterangan Kelulusan', 20, y + 6);
  doc.setFontSize(10);
  doc.setTextColor(isPass ? 22 : 185, isPass ? 101 : 28, isPass ? 52 : 28);
  doc.text(isPass ? 'LULUS (Mencapai KKTP)' : 'BELUM LULUS (Perlu Remedial)', pageWidth - 45, y + 6, {
    align: 'right',
  });
  doc.setTextColor(0, 0, 0);
  y += 14;

  // --- CATATAN GURU ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('B. Catatan Pembelajaran Guru Seni Rupa:', 15, y);
  y += 4;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  const note = isPass
    ? 'Selamat atas pencapaian kompetensi materi ikatan dan macam-macam simpul. Tingkatkan terus kreativitas seni kriya makrame.'
    : 'Perlu bimbingan dan pengulangan materi praktik jenis-jenis simpul dan ikatan (remedial). Tetap tekun dan semangat belajar.';
  doc.text(note, 15, y, { maxWidth: pageWidth - 30 });
  y += 16;

  // --- TANDA TANGAN (GURU & ORANG TUA/WALI) ---
  const ttdY = Math.max(y, 220);
  const colLeft = 20;
  const colRight = pageWidth - 65;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);

  // Kolom Kiri: Orang Tua / Wali
  doc.text('Mengetahui,', colLeft, ttdY);
  doc.text('Orang Tua / Wali Siswa,', colLeft, ttdY + 5);

  // Kolom Kanan: Guru Kelas VI
  const tglFormatted = formatIndonesianDate();
  doc.text(`Jembrana, ${tglFormatted}`, colRight, ttdY);
  doc.text('Guru Mata Pelajaran Seni Rupa,', colRight, ttdY + 5);

  // Area tanda tangan
  const lineY = ttdY + 27;

  // Garis nama Orang Tua
  doc.line(colLeft, lineY, colLeft + 45, lineY);
  doc.text('( ......................................... )', colLeft, lineY + 4);

  // Garis nama Guru
  doc.setFont('helvetica', 'bold');
  doc.text(CONFIG.GURU, colRight, lineY - 1);
  doc.line(colRight, lineY, colRight + 48, lineY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(`${CONFIG.LABEL_NIP_GURU || 'NIP'}. ${CONFIG.NIP_GURU}`, colRight, lineY + 4);

  // Simpan PDF
  const safeName = (result.nama || 'siswa').replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`Hasil_Tes_Sumatif_Seni_Rupa_${safeName}_Absen_${result.noAbsen}.pdf`);
}

/**
 * 2. Download Naskah Soal Ujian (PDF)
 */
export function downloadExamQuestionsPDF(questions: Question[]): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 16;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 16) {
      doc.addPage();
      y = 16;
      addPageHeader();
    }
  };

  const addPageHeader = () => {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(
      `${CONFIG.SEKOLAH} | Naskah Soal Tes Sumatif ${CONFIG.MATA_PELAJARAN} Kelas ${CONFIG.KELAS}`,
      pageWidth / 2,
      9,
      { align: 'center' }
    );
    doc.setTextColor(0, 0, 0);
  };

  // --- KOP SOAL ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('PEMERINTAH KABUPATEN JEMBRANA', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.text(CONFIG.SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.setFontSize(13);
  doc.text('NASKAH SOAL TES SUMATIF ONLINE', pageWidth / 2, y, { align: 'center' });
  y += 3;

  doc.setLineWidth(0.6);
  doc.line(15, y, pageWidth - 15, y);
  y += 6;

  // Metadata Soal
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Mata Pelajaran : ${CONFIG.MATA_PELAJARAN}`, 16, y);
  doc.text(`Kelas / Semester : Kelas ${CONFIG.KELAS}`, 120, y);
  y += 4.5;
  doc.text(`Materi Pokok    : ${CONFIG.MATERI}`, 16, y);
  doc.text(`Alokasi Waktu    : 120 Menit (02.00.00)`, 120, y);
  y += 4.5;
  doc.text(`Kriteria KKTP   : ${CONFIG.KKTP}`, 16, y);
  doc.text(`Jumlah Soal      : ${questions.length} Butir`, 120, y);
  y += 6;

  doc.setDrawColor(180, 180, 180);
  doc.setFillColor(245, 247, 250);
  doc.rect(15, y, pageWidth - 30, 11, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.text('PETUNJUK UMUM:', 18, y + 4);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(
    '1. Isilah nama dan nomor absen Anda. 2. Kerjakan soal secara teliti dan mandiri. 3. Pastikan seluruh soal terjawab.',
    18,
    y + 8,
    { maxWidth: pageWidth - 36 }
  );
  y += 16;

  // Iterasi Soal
  questions.forEach((q, idx) => {
    checkPageBreak(25);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);

    let typeLabel = 'Pilihan Ganda';
    if (q.type === 'pgk') typeLabel = 'Pilihan Ganda Kompleks (Bisa >1 jawaban benar)';
    if (q.type === 'pgk_kategori') typeLabel = 'PGK Kategori (Benar/Salah, Sesuai/Tidak)';
    if (q.type === 'isian') typeLabel = 'Isian Singkat';

    doc.setTextColor(30, 58, 138);
    doc.text(`Soal No. ${idx + 1} [${typeLabel}]`, 15, y);
    doc.setTextColor(0, 0, 0);
    y += 5;

    // Teks Soal
    doc.setFont('helvetica', 'normal');
    const textLines = doc.splitTextToSize(q.text, pageWidth - 32);
    checkPageBreak(textLines.length * 4.5 + 15);
    doc.text(textLines, 16, y);
    y += textLines.length * 4.5 + 2;

    if (q.imageSvg) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      doc.text('[Lihat ilustrasi pendukung pada aplikasi ujian]', 16, y);
      y += 5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(0, 0, 0);
    }

    // Opsi Jawaban (PG / PGK)
    if (q.options && q.options.length > 0) {
      q.options.forEach((opt) => {
        checkPageBreak(8);
        const optLines = doc.splitTextToSize(`${opt.id}. ${opt.text}`, pageWidth - 36);
        doc.text(optLines, 20, y);
        y += optLines.length * 4.2 + 1;
      });
      y += 3;
    }

    // Pernyataan Kategori
    if (q.statements && q.statements.length > 0) {
      const posLabel = q.categoryLabels?.positive || 'Benar';
      const negLabel = q.categoryLabels?.negative || 'Salah';
      q.statements.forEach((st, sIdx) => {
        checkPageBreak(10);
        const stLines = doc.splitTextToSize(
          `Pernyataan ${sIdx + 1}: ${st.text}   [  ] ${posLabel}   [  ] ${negLabel}`,
          pageWidth - 36
        );
        doc.text(stLines, 20, y);
        y += stLines.length * 4.5 + 1.5;
      });
      y += 3;
    }

    // Isian Singkat
    if (q.type === 'isian') {
      checkPageBreak(8);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 116, 139);
      doc.text('Jawaban: .....................................................................................', 20, y);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      y += 6;
    }
  });

  doc.save(`Naskah_Soal_Bahasa_Indonesia_Kelas_VI_${CONFIG.SEKOLAH.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
}

/**
 * 3. Export Rekap Nilai ke Format CSV (Excel)
 */
export function exportResultsToCSV(results: ExamResult[]): void {
  const headers = ['Timestamp', 'Nama Siswa', 'Kelas', 'Nomor Absen', 'Benar', 'Salah', 'Nilai', 'Status'];

  const rows = results.map((r) => [
    `"${r.timestamp || ''}"`,
    `"${r.nama || ''}"`,
    `"${r.kelas || CONFIG.KELAS}"`,
    `"${r.noAbsen || ''}"`,
    r.benar,
    r.salah,
    r.nilai,
    `"${r.status}"`,
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Rekap_Nilai_Bahasa_Indonesia_Kelas_${CONFIG.KELAS}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * 4. Download Rekapitulasi Data Nilai Siswa (PDF Resmi Berkop dan Bertanda Tangan)
 */
export function downloadResultsRecapPDF(results: ExamResult[]): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const marginLeft = 12;
  const marginRight = 12;

  // Hitung Statistik
  const total = results.length;
  const lulus = results.filter((r) => r.status === 'Lulus' || r.nilai >= CONFIG.KKTP).length;
  const belumLulus = total - lulus;
  const persenLulus = total > 0 ? Math.round((lulus / total) * 100) : 0;
  const rataRata =
    total > 0 ? (results.reduce((acc, r) => acc + (r.nilai || 0), 0) / total).toFixed(1) : '0';

  let y = 14;

  // --- KOP DOKUMEN SEKOLAH ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('PEMERINTAH KABUPATEN JEMBRANA', pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.text('DINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA', pageWidth / 2, y, { align: 'center' });
  y += 5.5;
  doc.setFontSize(13);
  doc.text(CONFIG.SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(CONFIG.ALAMAT_SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 2.5;

  // Garis Pembatas Kop Ganda
  doc.setLineWidth(0.8);
  doc.line(marginLeft, y, pageWidth - marginRight, y);
  doc.setLineWidth(0.2);
  doc.line(marginLeft, y + 0.8, pageWidth - marginRight, y + 0.8);
  y += 6;

  // Judul Rekap
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('REKAPITULASI HASIL TES SUMATIF SISWA', pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `Mata Pelajaran: ${CONFIG.MATA_PELAJARAN} (${CONFIG.MATERI}) | Kelas: ${CONFIG.KELAS} | KKTP: ${CONFIG.KKTP}`,
    pageWidth / 2,
    y,
    { align: 'center' }
  );
  y += 6;

  // Tabel Rekapitulasi Ringkas
  doc.setFontSize(8);
  doc.setFillColor(30, 58, 138);
  doc.rect(marginLeft, y, pageWidth - marginLeft - marginRight, 6, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('No', marginLeft + 2, y + 4.2);
  doc.text('Nama Siswa', marginLeft + 12, y + 4.2);
  doc.text('Absen', marginLeft + 80, y + 4.2);
  doc.text('Benar', marginLeft + 100, y + 4.2);
  doc.text('Salah', marginLeft + 118, y + 4.2);
  doc.text('Nilai', marginLeft + 138, y + 4.2);
  doc.text('Status Kelulusan', marginLeft + 155, y + 4.2);
  doc.setTextColor(0, 0, 0);
  y += 6;

  doc.setFont('helvetica', 'normal');
  results.forEach((r, idx) => {
    if (y > 255) {
      doc.addPage();
      y = 16;
    }
    const isP = r.status === 'Lulus' || r.nilai >= CONFIG.KKTP;
    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
    doc.rect(marginLeft, y, pageWidth - marginLeft - marginRight, 5.5, 'F');
    doc.rect(marginLeft, y, pageWidth - marginLeft - marginRight, 5.5, 'S');

    doc.text(String(idx + 1), marginLeft + 3, y + 4);
    doc.text(r.nama.substring(0, 30), marginLeft + 12, y + 4);
    doc.text(String(r.noAbsen), marginLeft + 84, y + 4);
    doc.text(String(r.benar), marginLeft + 104, y + 4);
    doc.text(String(r.salah), marginLeft + 122, y + 4);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(isP ? 22 : 185, isP ? 101 : 28, isP ? 52 : 28);
    doc.text(String(r.nilai), marginLeft + 141, y + 4);
    doc.text(isP ? 'Lulus' : 'Belum Lulus', marginLeft + 155, y + 4);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');

    y += 5.5;
  });

  // Statistik Ringkas di Bawah Tabel
  y += 5;
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text(
    `Total Siswa: ${total} | Lulus: ${lulus} (${persenLulus}%) | Belum Lulus: ${belumLulus} | Rata-rata: ${rataRata}`,
    marginLeft,
    y
  );

  // Tanda Tangan Guru
  y += 15;
  const colRight = pageWidth - 65;
  doc.setFont('helvetica', 'normal');
  doc.text(`Jembrana, ${formatIndonesianDate()}`, colRight, y);
  doc.text(`Guru Mata Pelajaran ${CONFIG.MATA_PELAJARAN},`, colRight, y + 4.5);
  y += 24;
  doc.setFont('helvetica', 'bold');
  doc.text(CONFIG.GURU, colRight, y);
  doc.line(colRight, y + 1, colRight + 48, y + 1);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`${CONFIG.LABEL_NIP_GURU || 'NIP'}. ${CONFIG.NIP_GURU}`, colRight, y + 5);

  doc.save(`Rekap_Hasil_Tes_Bahasa_Indonesia_Kelas_${CONFIG.KELAS}.pdf`);
}
