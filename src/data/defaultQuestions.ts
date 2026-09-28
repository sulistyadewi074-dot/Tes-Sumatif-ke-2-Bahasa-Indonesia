import { Question } from '../types';

export const INITIAL_QUESTIONS: Question[] = [
  // =========================================================================
  // BAGIAN 1: PILIHAN GANDA (20 BUTIR SOAL: NO. 1 - 20)
  // Setiap soal memiliki 4 opsi jawaban (A, B, C, D) dengan 1 jawaban benar.
  // =========================================================================
  {
    id: 1,
    type: 'pg',
    topic: 'Pengertian & Karakteristik Teks Eksplanasi',
    difficulty: 'Mudah',
    text: 'Teks eksplanasi adalah teks yang bertujuan untuk...',
    options: [
      { id: 'A', text: 'Menjelaskan proses terjadinya atau terbentuknya suatu fenomena alam, sosial, atau ilmu pengetahuan berdasarkan fakta ilmiah' },
      { id: 'B', text: 'Menceritakan kisah khayalan tokoh tertentu guna menghibur dan mengisi waktu luang pembaca' },
      { id: 'C', text: 'Mempromosikan keunggulan suatu produk atau jasa agar pembaca tertarik membelinya' },
      { id: 'D', text: 'Memberikan petunjuk teknis cara membuat suatu kerajinan dengan urutan angka' }
    ],
    correctAnswer: 'A',
    explanation: 'Teks eksplanasi bertujuan memaparkan proses terjadinya peristiwa (alam, sosial, atau ilmiah) secara logis dengan prinsip sebab-akibat (kausalitas) dan urutan kronologis.',
  },
  {
    id: 2,
    type: 'pg',
    topic: 'Mencari Informasi Penting: Unsur Adiksimba (Kata Tanya "Mengapa")',
    difficulty: 'Mudah',
    text: 'Bacalah kutipan teks eksplanasi berikut!\n\n"Pelangi terbentuk karena adanya pembiasan cahaya matahari oleh butir-butir air hujan di atmosfer. Saat cahaya matahari yang berwarna putih mengenai titik air, cahaya tersebut mengalami pembelokan dan terurai menjadi spektrum warna yang indah."\n\nInformasi penting mengenai "penyebab terbentuknya pelangi" dalam kutipan di atas dapat ditemukan dengan mengajukan kata tanya...',
    options: [
      { id: 'A', text: 'Mengapa pelangi dapat terbentuk di atmosfer bumi?' },
      { id: 'B', text: 'Di mana pelangi pertama kali ditemukan oleh manusia?' },
      { id: 'C', text: 'Kapan pelangi akan berhenti menampakkan warnanya?' },
      { id: 'D', text: 'Siapa yang pertama kali melukis keindahan pelangi?' }
    ],
    correctAnswer: 'A',
    explanation: 'Kata tanya "Mengapa" digunakan untuk menggali informasi tentang alasan atau sebab terjadinya suatu peristiwa dalam teks eksplanasi.',
  },
  {
    id: 3,
    type: 'pg',
    topic: 'Mencari Informasi Penting: Unsur Adiksimba (Kata Tanya "Bagaimana")',
    difficulty: 'Sedang',
    text: 'Kata tanya dalam kaidah ADiKSiMBa yang paling tepat digunakan untuk mengetahui rincian proses, mekanisme kerja, atau urutan tahapan terjadinya suatu fenomena alam adalah kata tanya...',
    options: [
      { id: 'A', text: 'Bagaimana' },
      { id: 'B', text: 'Siapa' },
      { id: 'C', text: 'Kapan' },
      { id: 'D', text: 'Di mana' }
    ],
    correctAnswer: 'A',
    explanation: 'Kata tanya "Bagaimana" berfungsi menanyakan proses, cara kerja, atau mekanisme urutan peristiwa secara mendalam.',
  },
  {
    id: 4,
    type: 'pg',
    topic: 'Menemukan Gagasan Pokok Paragraf Deduktif',
    difficulty: 'Sedang',
    text: 'Bacalah paragraf berikut!\n\n"Pembangkit Listrik Tenaga Air (PLTA) memanfaatkan energi kinetik aliran air untuk memutar turbin. Aliran air yang deras dari waduk atau air terjun diarahkan menuju turbin air sehingga turbin berputar kencang. Putaran poros turbin ini kemudian memutar generator yang akan mengubah energi kinetik menjadi energi listrik."\n\nGagasan pokok paragraf eksplanasi tersebut adalah...',
    options: [
      { id: 'A', text: 'Pemanfaatan energi kinetik aliran air oleh PLTA untuk memutar turbin' },
      { id: 'B', text: 'Generator adalah alat penghasil arus listrik terbesar di dunia' },
      { id: 'C', text: 'Waduk dan air terjun adalah tempat wisata alam yang indah' },
      { id: 'D', text: 'Energi listrik hanya dapat dihasilkan di pedesaan' }
    ],
    correctAnswer: 'A',
    explanation: 'Gagasan pokok terletak pada kalimat pertama (paragraf deduktif): PLTA memanfaatkan energi kinetik aliran air untuk memutar turbin, yang kemudian dijelaskan oleh kalimat-kalimat pengembang berikutnya.',
  },
  {
    id: 5,
    type: 'pg',
    topic: 'Struktur Teks Eksplanasi: Pernyataan Umum',
    difficulty: 'Mudah',
    text: 'Bagian struktur pembangun teks eksplanasi yang berisi gambaran umum, definisi, atau pengenalan latar belakang fenomena yang akan dibahas disebut...',
    options: [
      { id: 'A', text: 'Pernyataan umum (identifikasi fenomena)' },
      { id: 'B', text: 'Deretan penjelas (rangkaian proses)' },
      { id: 'C', text: 'Ulasan (interpretasi)' },
      { id: 'D', text: 'Koda (amanat moral)' }
    ],
    correctAnswer: 'A',
    explanation: 'Pernyataan umum merupakan bagian pembuka yang memuat definisi dan gambaran ringkas topik fenomena sebelum dijelaskan proses detailnya.',
  },
  {
    id: 6,
    type: 'pg',
    topic: 'Struktur Teks Eksplanasi: Deretan Penjelas',
    difficulty: 'Mudah',
    text: 'Ciri utama dari bagian deretan penjelas dalam teks eksplanasi adalah...',
    options: [
      { id: 'A', text: 'Memuat uraian rincian sebab-akibat (kausalitas) dan kronologis proses terjadinya fenomena' },
      { id: 'B', text: 'Memuat perkenalan riwayat hidup dan biodata lengkap penulis teks' },
      { id: 'C', text: 'Hanya berisi salam penutup dan permohonan maaf kepada pembaca' },
      { id: 'D', text: 'Berisi dialog rekaan antara dua tokoh cerita fiksi' }
    ],
    correctAnswer: 'A',
    explanation: 'Deretan penjelas adalah bagian inti yang memaparkan rangkaian proses bagaimana dan mengapa fenomena itu dapat terjadi.',
  },
  {
    id: 7,
    type: 'pg',
    topic: 'Struktur Teks Eksplanasi: Ulasan (Interpretasi)',
    difficulty: 'Sedang',
    text: 'Bacalah penggalan teks berikut!\n\n"Oleh karena itu, gempa bumi merupakan bencana alam yang tidak dapat diprediksi secara pasti kapan terjadinya. Masyarakat yang bermukim di daerah rawan bencana sebaiknya selalu memahami langkah-langkah mitigasi dan jalur evakuasi mandiri demi keselamatan bersama."\n\nDalam struktur teks eksplanasi, penggalan paragraf di atas menempati bagian...',
    options: [
      { id: 'A', text: 'Ulasan / Interpretasi' },
      { id: 'B', text: 'Pernyataan umum' },
      { id: 'C', text: 'Deretan penjelas' },
      { id: 'D', text: 'Orientasi cerita' }
    ],
    correctAnswer: 'A',
    explanation: 'Bagian ulasan (interpretasi) memuat simpulan, intisari penjelasan, atau pandangan/sikap reflektif penulis mengenai dampak fenomena.',
  },
  {
    id: 8,
    type: 'pg',
    topic: 'Mencari Fakta Ilmiah dalam Teks Eksplanasi',
    difficulty: 'Mudah',
    text: 'Perhatikan kalimat-kalimat berikut!\n(1) Air laut mengalami penguapan (evaporasi) karena pemanasan sinar matahari.\n(2) Menurut saya, hujan deras selalu membuat orang merasa malas belajar.\n(3) Titik-titik air di awan jatuh ke bumi sebagai hujan saat awan jenuh.\n(4) Hujan es mungkin adalah peristiwa alam yang paling menakutkan bagi anak-anak.\n\nKalimat yang berisi fakta ilmiah dalam teks eksplanasi ditunjukkan oleh nomor...',
    options: [
      { id: 'A', text: '(1) dan (3)' },
      { id: 'B', text: '(1) dan (2)' },
      { id: 'C', text: '(2) dan (4)' },
      { id: 'D', text: '(3) dan (4)' }
    ],
    correctAnswer: 'A',
    explanation: 'Kalimat (1) dan (3) menyajikan peristiwa nyata dan dapat dibuktikan kebenarannya secara ilmiah (fakta), sedangkan (2) dan (4) memuat opini subjektif ("menurut saya", "mungkin paling menakutkan").',
  },
  {
    id: 9,
    type: 'pg',
    topic: 'Variasi Konjungsi Kausalitas (Sebab-Akibat)',
    difficulty: 'Sedang',
    text: 'Perhatikan kalimat berikut:\n"Penebangan hutan secara liar terus terjadi, [...] saat hujan lebat turun, tanah tidak mampu menyerap air dan terjadilah tanah longsor."\n\nKonjungsi kausalitas yang paling tepat untuk mengisi bagian rumpang tersebut adalah...',
    options: [
      { id: 'A', text: 'sehingga' },
      { id: 'B', text: 'meskipun' },
      { id: 'C', text: 'tetapi' },
      { id: 'D', text: 'melainkan' }
    ],
    correctAnswer: 'A',
    explanation: 'Kata hubung "sehingga" merupakan konjungsi kausalitas yang menghubungkan peristiwa sebab (tanah tidak mampu menyerap air) dengan peristiwa akibat (terjadinya tanah longsor).',
  },
  {
    id: 10,
    type: 'pg',
    topic: 'Variasi Konjungsi Kronologis (Urutan Waktu)',
    difficulty: 'Mudah',
    text: 'Dalam teks eksplanasi yang menjelaskan tahapan siklus air, konjungsi yang berfungsi menandai urutan waktu (kronologis) adalah...',
    options: [
      { id: 'A', text: 'kemudian, setelah itu, lalu' },
      { id: 'B', text: 'karena, sebab, oleh karena itu' },
      { id: 'C', text: 'walaupun, kendatipun, biarpun' },
      { id: 'D', text: 'tetapi, padahal, melainkan' }
    ],
    correctAnswer: 'A',
    explanation: 'Kata "kemudian", "setelah itu", dan "lalu" adalah konjungsi kronologis/temporal yang merangkaikan tahapan waktu peristiwa secara runtut.',
  },
  {
    id: 11,
    type: 'pg',
    topic: 'Kosakata Teknis Ilmiah dalam Fenomena Vulkanik',
    difficulty: 'Sedang',
    text: 'Bacalah teks berikut!\n"Ketika gunung berapi meletus, lelehan batuan pijar yang sangat panas dari dalam perut bumi terdorong keluar menuju permukaan bumi."\n\nIstilah teknis ilmiah untuk lelehan batuan pijar yang sudah keluar mengalir di permukaan bumi adalah...',
    options: [
      { id: 'A', text: 'Lava' },
      { id: 'B', text: 'Magma' },
      { id: 'C', text: 'Kawah' },
      { id: 'D', text: 'Seismik' }
    ],
    correctAnswer: 'A',
    explanation: 'Magma adalah batuan cair pijar yang masih berada di dalam perut bumi, sedangkan jika sudah keluar ke permukaan bumi disebut lava.',
  },
  {
    id: 12,
    type: 'pg',
    topic: 'Informasi Tersurat dalam Teks Penemuan Listrik',
    difficulty: 'Sedang',
    text: 'Bacalah kutipan teks berikut!\n\n"Michael Faraday lahir pada tahun 1791 di Newington, Inggris. Berkat ketekunan dan eksperimen gigihnya pada tahun 1831, Faraday berhasil menemukan bahwa arus listrik dapat dihasilkan dengan menggerakkan magnet di dalam kumparan kawat. Penemuan ini menjadi cikal bakal terciptanya generator listrik modern."\n\nBerdasarkan kutipan di atas, bagaimana cara Faraday pertama kali menghasilkan arus listrik?',
    options: [
      { id: 'A', text: 'Dengan menggerakkan magnet di dalam kumparan kawat' },
      { id: 'B', text: 'Dengan menyambungkan baterai ke air garam' },
      { id: 'C', text: 'Dengan membakar batu bara pada turbin uap' },
      { id: 'D', text: 'Dengan menangkap kilatan petir menggunakan layang-layang' }
    ],
    correctAnswer: 'A',
    explanation: 'Informasi tersurat tertulis jelas pada teks: Faraday menemukan bahwa arus listrik dihasilkan dengan menggerakkan magnet di dalam kumparan kawat.',
  },
  {
    id: 13,
    type: 'pg',
    topic: 'Langkah Menulis Teks Eksplanasi: Tahap 1 (Menentukan Topik)',
    difficulty: 'Mudah',
    text: 'Langkah pertama yang harus dilakukan seorang penulis sebelum menyusun teks eksplanasi adalah...',
    options: [
      { id: 'A', text: 'Menentukan topik fenomena nyata (alam, sosial, atau ilmiah) yang menarik dan berbobot' },
      { id: 'B', text: 'Langsung mempublikasikan naskah di media sosial' },
      { id: 'C', text: 'Membeli buku ensiklopedia sebanyak mungkin' },
      { id: 'D', text: 'Menghafal seluruh nama ilmuwan di dunia' }
    ],
    correctAnswer: 'A',
    explanation: 'Langkah awal penulisan teks eksplanasi adalah menentukan topik atau fenomena yang ingin dijelaskan proses terjadinya.',
  },
  {
    id: 14,
    type: 'pg',
    topic: 'Langkah Menulis Teks Eksplanasi: Tahap 2 (Mengumpulkan Fakta & Informasi)',
    difficulty: 'Mudah',
    text: 'Setelah menentukan topik, langkah penting berikutnya adalah mengumpulkan fakta dan data ilmiah. Cara yang tepat untuk mengumpulkan informasi ilmiah adalah...',
    options: [
      { id: 'A', text: 'Membaca buku referensi tepercaya, ensiklopedia, atau artikel ilmiah' },
      { id: 'B', text: 'Mengarang bebas cerita rekaan khayalan sendiri' },
      { id: 'C', text: 'Menyalin cerita dongeng dari buku cerita anak' },
      { id: 'D', text: 'Menyebarkan kabar bohong (hoaks) yang belum diverifikasi' }
    ],
    correctAnswer: 'A',
    explanation: 'Informasi teks eksplanasi harus berbasis kebenaran ilmiah, sehingga dapat dikumpulkan lewat riset kepustakaan, ensiklopedia, jurnal teruji, atau wawancara narasumber ahli.',
  },
  {
    id: 15,
    type: 'pg',
    topic: 'Langkah Menulis Teks Eksplanasi: Tahap 3 (Menyusun Kerangka Karangan)',
    difficulty: 'Sedang',
    text: 'Mengapa menyusun kerangka karangan (outline) sangat penting sebelum mengembangkan teks eksplanasi menjadi tulisan utuh?',
    options: [
      { id: 'A', text: 'Agar alur penjelasan runtut, sistematis, dan terarah sesuai urutan sebab-akibat' },
      { id: 'B', text: 'Agar tulisan tidak perlu disunting lagi di masa mendatang' },
      { id: 'C', text: 'Untuk membuat tulisan menjadi penuh dengan istilah bahasa gaul' },
      { id: 'D', text: 'Sebagai pengganti teks sehingga penulis tidak perlu menulis kalimat lengkap' }
    ],
    correctAnswer: 'A',
    explanation: 'Kerangka karangan berfungsi sebagai pemandu agar penulisan tetap runtut, logis, terfokus pada topik, serta sesuai kaidah struktur teks eksplanasi.',
  },
  {
    id: 16,
    type: 'pg',
    topic: 'Struktur Kerangka: Penempatan Gagasan Pokok',
    difficulty: 'Sedang',
    text: 'Dalam kerangka tulisan teks eksplanasi mengenai "Gerhana Matahari", gagasan pokok yang paling tepat diletakkan pada bagian pernyataan umum adalah...',
    options: [
      { id: 'A', text: 'Pengertian gerhana matahari dan posisi bulan yang berada di antara bumi dan matahari' },
      { id: 'B', text: 'Waktu tepat terjadinya kiamat menurut ramalan zaman kuno' },
      { id: 'C', text: 'Harga kacamata khusus pengamat gerhana matahari di toko optik' },
      { id: 'D', text: 'Daftar nama astronaut yang pernah mendarat di planet Mars' }
    ],
    correctAnswer: 'A',
    explanation: 'Pernyataan umum memuat definisi topik dan pengenalan posisi sejajar antara matahari, bulan, dan bumi.',
  },
  {
    id: 17,
    type: 'pg',
    topic: 'Langkah Menulis Teks Eksplanasi: Tahap 4 (Mengembangkan Kerangka)',
    difficulty: 'Sedang',
    text: 'Saat mengembangkan kerangka karangan menjadi draf teks eksplanasi lengkap, hal yang harus diperhatikan penulis agar antarparagraf saling terhubung erat dan padu adalah...',
    options: [
      { id: 'A', text: 'Menggunakan konjungsi penghubung kalimat yang tepat (kohesi dan koherensi)' },
      { id: 'B', text: 'Menyelipkan kata-kata sindiran kepada pembaca teks' },
      { id: 'C', text: 'Mengganti topik tulisan setiap berganti paragraf baru' },
      { id: 'D', text: 'Menulis seluruh paragraf hanya dengan satu kata saja' }
    ],
    correctAnswer: 'A',
    explanation: 'Keterpaduan paragraf (kohesi dan koherensi) dibangun menggunakan konjungsi antarkalimat dan antarparagraf yang tepat sehingga alur ide logis dan mudah dipahami.',
  },
  {
    id: 18,
    type: 'pg',
    topic: 'Langkah Menulis Teks Eksplanasi: Tahap 5 (Menyunting & Merevisi)',
    difficulty: 'Mudah',
    text: 'Kegiatan membaca ulang naskah teks eksplanasi untuk memeriksa dan membetulkan kekeliruan ejaan kata baku, tanda baca, serta keefektifan kalimat dinamakan...',
    options: [
      { id: 'A', text: 'Menyunting (editing / merevisi)' },
      { id: 'B', text: 'Mendeklamasikan' },
      { id: 'C', text: 'Mempromosikan' },
      { id: 'D', text: 'Menggandakan' }
    ],
    correctAnswer: 'A',
    explanation: 'Menyunting (editing) adalah tahap akhir untuk memperbaiki kesalahan ejaan tanda baca EYD, kebakuan kata, dan kelogisan bahasa sebelum naskah dipublikasikan.',
  },
  {
    id: 19,
    type: 'pg',
    topic: 'Kebahasaan: Penggunaan Kata Baku dalam Teks Ilmiah',
    difficulty: 'Sedang',
    text: 'Penulisan kata baku yang tepat dalam teks eksplanasi menurut KBBI adalah...',
    options: [
      { id: 'A', text: 'Fotosintesis dan sistem' },
      { id: 'B', text: 'Fotosintesa dan sistim' },
      { id: 'C', text: 'Fotosintesa dan sistem' },
      { id: 'D', text: 'Fotosintesis dan sistim' }
    ],
    correctAnswer: 'A',
    explanation: 'Menurut Kamus Besar Bahasa Indonesia (KBBI), bentuk baku yang benar adalah "fotosintesis" (bukan fotosintesa) dan "sistem" (bukan sistim).',
  },
  {
    id: 20,
    type: 'pg',
    topic: 'Urutan Runtut Langkah-Langkah Menulis Teks Eksplanasi',
    difficulty: 'Sukar',
    text: 'Perhatikan tahapan menulis teks eksplanasi berikut!\n(1) Mengumpulkan fakta dan informasi ilmiah\n(2) Menyunting naskah teks eksplanasi\n(3) Menentukan topik fenomena\n(4) Mengembangkan kerangka menjadi teks utuh\n(5) Menyusun kerangka karangan\n\nUrutan langkah-langkah menulis teks eksplanasi yang benar dan sistematis adalah...',
    options: [
      { id: 'A', text: '(3) - (1) - (5) - (4) - (2)' },
      { id: 'B', text: '(1) - (3) - (5) - (4) - (2)' },
      { id: 'C', text: '(3) - (5) - (1) - (4) - (2)' },
      { id: 'D', text: '(5) - (3) - (1) - (2) - (4)' }
    ],
    correctAnswer: 'A',
    explanation: 'Urutan sistematis menulis teks eksplanasi: 1) Menentukan topik (3), 2) Mengumpulkan fakta/informasi (1), 3) Menyusun kerangka (5), 4) Mengembangkan kerangka (4), dan 5) Menyunting (2).',
  },

  // =========================================================================
  // BAGIAN 2: PILIHAN GANDA KOMPLEKS (5 BUTIR SOAL: NO. 21 - 25)
  // Kemungkinan lebih dari satu pilihan jawaban benar (Pilihlah 2 atau 3 jawaban benar).
  // =========================================================================
  {
    id: 21,
    type: 'pgk',
    topic: 'Kata Tanya ADiKSiMBa untuk Menggali Informasi Teks Eksplanasi',
    difficulty: 'Sedang',
    text: 'Kaidah kata tanya ADiKSiMBa (5W+1H) digunakan untuk menemukan informasi penting dalam teks eksplanasi secara menyeluruh. Manakah di antara fungsi kata tanya berikut yang sesuai?\n(Pilihlah lebih dari satu jawaban yang benar!)',
    options: [
      { id: 'A', text: 'Kata tanya "Apa" berfungsi untuk menanyakan objek atau peristiwa apa yang sedang dijelaskan.' },
      { id: 'B', text: 'Kata tanya "Mengapa" berfungsi untuk mencari tahu penyebab atau alasan timbulnya fenomena.' },
      { id: 'C', text: 'Kata tanya "Bagaimana" berfungsi untuk menjelaskan urutan kronologis atau proses tahapan peristiwa.' },
      { id: 'D', text: 'Kata tanya "Kapan" hanya boleh digunakan untuk menanyakan harga barang di toko.' }
    ],
    correctAnswer: ['A', 'B', 'C'],
    explanation: 'Pilihan A, B, dan C benar menjelaskan fungsi kata tanya dalam kaidah ADiKSiMBa. Pilihan D salah karena "kapan" berfungsi menanyakan keterangan waktu terjadinya peristiwa.',
  },
  {
    id: 22,
    type: 'pgk',
    topic: 'Ciri-Ciri Kebahasaan Teks Eksplanasi',
    difficulty: 'Sedang',
    text: 'Sebuah teks eksplanasi yang berkualitas memiliki karakteristik kebahasaan yang khas. Manakah ciri kebahasaan yang menandai teks eksplanasi?\n(Pilihlah lebih dari satu jawaban yang benar!)',
    options: [
      { id: 'A', text: 'Memuat istilah ilmiah teknis sesuai bidang ilmu pengetahuan yang dibahas.' },
      { id: 'B', text: 'Banyak menggunakan konjungsi kausalitas (sebab-akibat) dan kronologis (urutan waktu).' },
      { id: 'C', text: 'Menggunakan kata kerja material dan rasional yang bermakna sebenarnya (denotatif).' },
      { id: 'D', text: 'Tersusun atas bait-bait puisi dengan sajak berirama a-a-b-b.' }
    ],
    correctAnswer: ['A', 'B', 'C'],
    explanation: 'Karakteristik teks eksplanasi: istilah ilmiah, konjungsi kausalitas/kronologis, dan kata denotatif. Pilihan D salah karena sajak bait adalah ciri puisi.',
  },
  {
    id: 23,
    type: 'pgk',
    topic: 'Mencari Informasi Penting Siklus Hidrologi',
    difficulty: 'Sedang',
    text: 'Dalam teks eksplanasi tentang siklus air (hidrologi), manakah istilah teknis proses perubahan wujud air yang lazim ditemukan?\n(Pilihlah lebih dari satu jawaban yang benar!)',
    options: [
      { id: 'A', text: 'Evaporasi (penguapan air permukaan bumi menuju atmosfer)' },
      { id: 'B', text: 'Kondensasi (pengembunan uap air menjadi titik-titik air pembentuk awan)' },
      { id: 'C', text: 'Presipitasi (jatuhnya curahan air hujan dari awan ke bumi)' },
      { id: 'D', text: 'Teleportasi (perpindahan manusia secara gaib)' }
    ],
    correctAnswer: ['A', 'B', 'C'],
    explanation: 'Evaporasi, kondensasi, dan presipitasi adalah istilah ilmiah siklus air. Pilihan D adalah fiksi ilmiah yang tidak relevan dengan siklus air.',
  },
  {
    id: 24,
    type: 'pgk',
    topic: 'Fokus Penyuntingan (Editing) Teks Eksplanasi',
    difficulty: 'Sedang',
    text: 'Ketika seorang siswa kelas VI menyunting draf teks eksplanasi yang baru saja ditulisnya, aspek apa saja yang wajib diperiksa dan disempurnakan?\n(Pilihlah lebih dari satu jawaban yang benar!)',
    options: [
      { id: 'A', text: 'Ketepatan penggunaan huruf kapital, tanda titik, tanda koma, dan ejaan kata baku (EYD)' },
      { id: 'B', text: 'Kelogisan hubungan sebab-akibat antarparagraf agar runtut dan mudah dipahami' },
      { id: 'C', text: 'Keakuratan fakta ilmiah agar informasi yang disajikan benar dan tidak menyesatkan pembaca' },
      { id: 'D', text: 'Menyisipkan dongeng binatang (fabel) khayalan di tengah paragraf' }
    ],
    correctAnswer: ['A', 'B', 'C'],
    explanation: 'Penyuntingan mencakup ketepatan ejaan EYD, kelogisan hubungan kausalitas, serta keakuratan fakta ilmiah. Cerita fabel khayalan tidak boleh dimasukkan dalam teks eksplanasi ilmiah.',
  },
  {
    id: 25,
    type: 'pgk',
    topic: 'Langkah Awal Menulis Teks Eksplanasi',
    difficulty: 'Sedang',
    text: 'Manakah tindakan yang tepat dilakukan oleh penulis pada tahap pra-penulisan (menentukan topik dan mengumpulkan bahan) teks eksplanasi?\n(Pilihlah lebih dari satu jawaban yang benar!)',
    options: [
      { id: 'A', text: 'Memilih fenomena alam atau sosial nyata yang sedang terjadi dan dekat dengan kehidupan sehari-hari.' },
      { id: 'B', text: 'Mencari referensi data dan sumber informasi dari buku perpustakaan atau situs edukasi tepercaya.' },
      { id: 'C', text: 'Mencatat pokok-pokok informasi penting yang akan dijadikan bahan kerangka karangan.' },
      { id: 'D', text: 'Mengarang sendiri angka statistik tanpa melakukan pengecekan data ilmiah.' }
    ],
    correctAnswer: ['A', 'B', 'C'],
    explanation: 'Tindakan yang tepat: menentukan fenomena nyata, mencari literatur tepercaya, dan mencatat pokok informasi penting. Mengarang angka tanpa bukti adalah pelanggaran prinsip teks eksplanasi.',
  },

  // =========================================================================
  // BAGIAN 3: PILIHAN GANDA KOMPLEKS KATEGORI (5 BUTIR SOAL: NO. 26 - 30)
  // Pernyataan yang harus direspon dengan Benar/Salah, Sesuai/Tidak Sesuai, Setuju/Tidak Setuju.
  // =========================================================================
  {
    id: 26,
    type: 'pgk_kategori',
    topic: 'Mencari Informasi Penting dalam Paragraf Eksplanasi',
    difficulty: 'Sedang',
    text: 'Tentukan apakah setiap pernyataan mengenai cara mencari informasi penting dalam teks eksplanasi berikut Benar atau Salah!',
    categoryLabels: {
      positive: 'Benar',
      negative: 'Salah',
    },
    statements: [
      {
        id: 's1',
        text: 'Informasi penting dalam teks eksplanasi dapat digali dengan menyusun pertanyaan menggunakan kata tanya ADiKSiMBa.',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'Gagasan utama paragraf hanya dapat ditemukan di akhir teks eksplanasi saja.',
        correctAnswer: false, // Gagasan pokok bisa di awal (deduktif), akhir (induktif), atau campuran
      },
      {
        id: 's3',
        text: 'Membaca memindai (scanning) dan membaca intensif membantu menemukan kata kunci dan data fakta ilmiah dengan cepat.',
        correctAnswer: true,
      },
    ],
    explanation: '1) Benar: ADiKSiMBa sangat efektif menggali informasi teks eksplanasi.\n2) Salah: Gagasan pokok bisa terletak di awal (deduktif), akhir (induktif), maupun campuran.\n3) Benar: Teknik membaca intensif mempermudah menemukan kata kunci informasi penting.',
  },
  {
    id: 27,
    type: 'pgk_kategori',
    topic: 'Kesesuaian Struktur Teks Eksplanasi',
    difficulty: 'Sedang',
    text: 'Tentukan apakah pernyataan mengenai urutan struktur teks eksplanasi berikut Sesuai atau Tidak Sesuai!',
    categoryLabels: {
      positive: 'Sesuai',
      negative: 'Tidak Sesuai',
    },
    statements: [
      {
        id: 's1',
        text: 'Pernyataan umum disajikan di awal untuk memperkenalkan definisi fenomena yang akan diulas.',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'Deretan penjelas berisi cerita rekaan percakapan komedi antara tokoh kartun.',
        correctAnswer: false,
      },
      {
        id: 's3',
        text: 'Bagian interpretasi/ulasan memuat rangkuman atau pandangan reflektif penulis mengenai dampak fenomena.',
        correctAnswer: true,
      },
    ],
    explanation: 'Pernyataan 1 dan 3 Sesuai dengan kaidah struktur teks eksplanasi. Pernyataan 2 Tidak Sesuai karena deretan penjelas memuat penjelasan ilmiah sebab-akibat, bukan dialog kartun.',
  },
  {
    id: 28,
    type: 'pgk_kategori',
    topic: 'Kebakuaan Kata dalam Penulisan Ilmiah',
    difficulty: 'Sedang',
    text: 'Tentukan apakah penulisan kosakata ilmiah berikut Benar (Baku) atau Salah (Tidak Baku) menurut KBBI!',
    categoryLabels: {
      positive: 'Benar',
      negative: 'Salah',
    },
    statements: [
      {
        id: 's1',
        text: 'Kata "atmosfer", "energi", dan "oksigen" adalah penulisan kosakata baku bahasa Indonesia.',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'Penulisan kata "praktek" dan "jadwal" keduanya merupakan bentuk baku dalam penulisan ilmiah.',
        correctAnswer: false, // "praktek" tidak baku (yang baku: praktik)
      },
      {
        id: 's3',
        text: 'Penulisan kata "seismograf" untuk alat pendeteksi getaran gempa merupakan bentuk baku yang tepat.',
        correctAnswer: true,
      },
    ],
    explanation: '1) Benar: Atmosfer, energi, dan oksigen merupakan bentuk baku.\n2) Salah: Kata "praktek" tidak baku, bentuk baku yang benar adalah "praktik".\n3) Benar: Seismograf adalah kata baku.',
  },
  {
    id: 29,
    type: 'pgk_kategori',
    topic: 'Tahapan Menulis Teks Eksplanasi',
    difficulty: 'Sedang',
    text: 'Tentukan apakah pernyataan mengenai tahapan menulis teks eksplanasi berikut Sesuai atau Tidak Sesuai!',
    categoryLabels: {
      positive: 'Sesuai',
      negative: 'Tidak Sesuai',
    },
    statements: [
      {
        id: 's1',
        text: 'Menyusun kerangka karangan dilakukan sebelum mengembangkan teks menjadi rangkaian paragraf utuh.',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'Tahap menyunting dilakukan paling awal sebelum menentukan topik bahasan.',
        correctAnswer: false, // Menyunting dilakukan di tahap akhir
      },
      {
        id: 's3',
        text: 'Pengumpulan fakta dan informasi ilmiah dilakukan agar isi penjelasan akurat dan dapat dipercaya pembaca.',
        correctAnswer: true,
      },
    ],
    explanation: '1) Sesuai: Kerangka dibuat terlebih dahulu sebagai panduan menulis.\n2) Tidak Sesuai: Menyunting dilakukan di bagian akhir setelah teks selesai ditulis.\n3) Sesuai: Pengumpulan fakta ilmiah menjamin kebenaran isi teks eksplanasi.',
  },
  {
    id: 30,
    type: 'pgk_kategori',
    topic: 'Sikap Penulis dalam Menyusun Teks Eksplanasi',
    difficulty: 'Sedang',
    text: 'Tentukan apakah sikap seorang siswa saat menulis teks eksplanasi berikut Setuju atau Tidak Setuju!',
    categoryLabels: {
      positive: 'Setuju',
      negative: 'Tidak Setuju',
    },
    statements: [
      {
        id: 's1',
        text: 'Menghindari menyalin (plagiasi) tulisan orang lain tanpa mencantumkan sumber referensi rujukan.',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'Mengubah fakta ilmiah menjadi berita heboh yang tidak benar agar teks banyak dibaca orang.',
        correctAnswer: false,
      },
      {
        id: 's3',
        text: 'Memeriksa kembali ketepatan tanda baca titik dan koma pada setiap akhir kalimat sebelum dikumpulkan.',
        correctAnswer: true,
      },
    ],
    explanation: '1) Setuju: Sikap jujur ilmiah menghindari plagiasi.\n2) Tidak Setuju: Teks eksplanasi menjunjung tinggi kejujuran dan fakta ilmiah, tidak boleh memuat hoaks.\n3) Setuju: Memeriksa tanda baca memastikan kerapian dan keterbacaan teks.',
  },

  // =========================================================================
  // BAGIAN 4: ISIAN SINGKAT (5 BUTIR SOAL: NO. 31 - 35)
  // Siswa mengetikkan jawaban singkat, diperiksa secara case-insensitive.
  // =========================================================================
  {
    id: 31,
    type: 'isian',
    topic: 'Mencari Informasi Penting: Kata Tanya Sebab',
    difficulty: 'Mudah',
    text: 'Kata tanya dalam rumus ADiKSiMBa yang digunakan untuk mencari informasi penting mengenai latar belakang atau penyebab terjadinya suatu fenomena alam dalam teks eksplanasi adalah kata tanya...',
    correctAnswer: 'Mengapa',
    acceptableAnswers: ['mengapa', 'Mengapa', 'MENGAPA', 'kenapa', 'Kenapa'],
    explanation: 'Kata tanya "mengapa" secara khusus digunakan untuk menanyakan sebab, alasan, atau latar belakang terjadinya suatu fenomena.',
  },
  {
    id: 32,
    type: 'isian',
    topic: 'Struktur Teks Eksplanasi: Bagian Awal',
    difficulty: 'Mudah',
    text: 'Bagian pembuka dalam struktur teks eksplanasi yang berfungsi mengenalkan fenomena atau memberikan gambaran definisi umum tentang topik disebut bagian...',
    correctAnswer: 'Pernyataan umum',
    acceptableAnswers: [
      'pernyataan umum',
      'Pernyataan umum',
      'Pernyataan Umum',
      'PERNYATAAN UMUM',
      'identifikasi fenomena',
      'Identifikasi fenomena',
      'identifikasi'
    ],
    explanation: 'Bagian awal struktur teks eksplanasi adalah "Pernyataan Umum" (atau Identifikasi Fenomena).',
  },
  {
    id: 33,
    type: 'isian',
    topic: 'Kaidah Kebahasaan: Jenis Konjungsi',
    difficulty: 'Sedang',
    text: 'Kata penghubung seperti "karena", "sebab", "oleh karena itu", dan "sehingga" dalam teks eksplanasi dikelompokkan ke dalam jenis konjungsi...',
    correctAnswer: 'Kausalitas',
    acceptableAnswers: [
      'kausalitas',
      'Kausalitas',
      'KAUSALITAS',
      'sebab akibat',
      'sebab-akibat',
      'konjungsi kausalitas',
      'kausal'
    ],
    explanation: 'Konjungsi kausalitas adalah kata penghubung yang menyatakan hubungan sebab-akibat antarperistiwa.',
  },
  {
    id: 34,
    type: 'isian',
    topic: 'Langkah Menulis: Tahap Akhir',
    difficulty: 'Mudah',
    text: 'Tahap akhir dalam proses menulis teks eksplanasi yang bertujuan membaca ulang, memperbaiki kesalahan ejaan tanda baca, dan merapikan kalimat sebelum naskah dipublikasikan dinamakan tahap...',
    correctAnswer: 'Menyunting',
    acceptableAnswers: [
      'menyunting',
      'Menyunting',
      'MENYUNTING',
      'penyuntingan',
      'Penyuntingan',
      'revisi',
      'Revisi',
      'mengedit',
      'editing'
    ],
    explanation: 'Tahap menyunting (editing / penyuntingan / revisi) dilakukan untuk memeriksa dan memperbaiki ejaan, tanda baca, pilihan kata, dan struktur kalimat.',
  },
  {
    id: 35,
    type: 'isian',
    topic: 'Kosakata Teknis: Siklus Air (Penguapan)',
    difficulty: 'Mudah',
    text: 'Istilah teknis ilmiah untuk proses penguapan air laut, danau, dan sungai ke atmosfer bumi karena pengaruh panas energi matahari adalah...',
    correctAnswer: 'Evaporasi',
    acceptableAnswers: [
      'evaporasi',
      'Evaporasi',
      'EVAPORASI',
      'penguapan',
      'proses evaporasi'
    ],
    explanation: 'Evaporasi adalah istilah ilmiah untuk peristiwa penguapan air permukaan bumi ke atmosfer akibat pemanasan sinar matahari.',
  },
];
