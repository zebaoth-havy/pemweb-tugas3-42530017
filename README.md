# Enchanted Library

Enchanted Library merupakan aplikasi web sederhana untuk mengelola koleksi buku dengan tema perpustakaan fantasi. Aplikasi ini dibuat untuk memenuhi Tugas 3 mata kuliah Pemrograman Web, dengan menerapkan konsep CRUD menggunakan Node.js, Express.js, EJS, dan MySQL.

## Fitur Aplikasi

Aplikasi ini memiliki beberapa fitur utama, yaitu:

- **Menampilkan Buku:** Menampilkan daftar koleksi buku yang tersimpan di database MySQL.
- **Tambah Buku:** Menambahkan data buku baru ke dalam koleksi.
- **Edit Buku:** Mengubah informasi buku berdasarkan ID.
- **Hapus Buku:** Menghapus data buku berdasarkan ID.
- **Pencarian:** Mencari buku berdasarkan judul atau nama penulis.
- **Filter Genre:** Menampilkan buku berdasarkan kategori genre.
- **Pagination:** Membagi daftar buku ke dalam beberapa halaman.

## Teknologi yang Digunakan

- Node.js
- Express.js
- EJS (Embedded JavaScript)
- MySQL
- mysql2
- dotenv
- HTML
- CSS

## Struktur Folder

```text
enchanted-library/
├── config/
│   └── db.js
├── controllers/
│   └── bookController.js
├── models/
│   └── bookModel.js
├── routes/
│   └── bookRoutes.js
├── views/
│   ├── pages/
│   │   ├── books.ejs
│   │   └── book-form.ejs
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
├── public/
│   └── css/
│       └── style.css
├── .env.example
├── .gitignore
├── app.js
├── database.sql
├── package.json
└── README.md
```

## Instalasi dan Menjalankan Aplikasi

1. Clone repository dari GitHub:

```bash
git clone https://github.com/USERNAME/pemweb-tugas3-NIM.git
```

2. Masuk ke direktori project:

```bash
cd pemweb-tugas3-NIM
```

3. Install seluruh dependencies:

```bash
npm install
```

4. Buat database MySQL dengan menjalankan file `database.sql`.

5. Buat file `.env` pada direktori utama project berdasarkan `.env.example`, kemudian sesuaikan konfigurasi database dengan MySQL yang digunakan.

Contoh konfigurasi:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password_mysql
DB_NAME=db_enchanted_library
PORT=3000
```

6. Jalankan aplikasi:

```bash
npm run dev
```

7. Buka aplikasi melalui browser:

```text
http://localhost:3000/books
```

## Database

Aplikasi ini menggunakan database MySQL dengan nama `db_enchanted_library` dan tabel utama `books`.

Struktur tabel dan data awal telah disediakan dalam file `database.sql` yang berada di direktori utama project.

## Penerapan Keamanan dan Pengelolaan Database

Dalam aplikasi ini diterapkan beberapa ketentuan pengelolaan database, yaitu:

- **MySQL Connection Pool:** Menggunakan `mysql2/promise` untuk mengelola koneksi database melalui connection pool.
- **Prepared Statements:** Menggunakan placeholder `?` pada query SQL untuk menghindari penyisipan nilai input secara langsung ke dalam query.
- **Environment Variables:** Menyimpan konfigurasi database dalam file `.env`.
- **Git Ignore:** Mengecualikan file `.env` dan folder `node_modules` agar tidak ikut diunggah ke repository.
- **Post/Redirect/Get (PRG):** Menggunakan `res.redirect()` setelah proses tambah, edit, dan hapus data.

## Identitas Pembuat

Nama: Zebaoth Havy
NIM: 42530017
Mata Kuliah: Pemrograman Web

