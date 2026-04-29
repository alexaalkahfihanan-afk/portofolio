# Certificates Images

Folder ini digunakan untuk menyimpan file gambar sertifikat lokal.

## Struktur & Cara Penggunaan

### File yang Diharapkan

Berdasarkan konfigurasi di `src/data/certificateData.ts`, Anda perlu menyimpan file gambar dengan nama-nama berikut:

1. **dicoding-javascript.jpg** - Sertifikat JavaScript dari Dicoding Indonesia
2. **neural-network.jpg** - Sertifikat Neural Network Specialization
3. **cyber-security.jpg** - Sertifikat Cyber Security Vanguard
4. **hpc-computing.jpg** - Sertifikat High Performance Computing

### Format File

- **Format**: JPG, PNG, atau WebP
- **Ukuran Minimum**: 1200x850px (recommended untuk tampilan optimal)
- **Aspect Ratio**: 3508:2481 (landscape format standar sertifikat)

### Cara Menambah/Mengubah Sertifikat

1. **Simpan file gambar** ke folder ini dengan nama yang sesuai
2. **Update path** di `src/data/certificateData.ts` jika menggunakan nama yang berbeda
3. **Contoh**:
   ```typescript
   {
     title: "Nama Sertifikat",
     issuer: "Penerbit",
     image: "/certificates/nama-file.jpg",  // Sesuaikan dengan nama file
     // ... data lainnya
   }
   ```

### Catatan Penting

- File harus disimpan di folder `public/certificates/`
- Path di `certificateData.ts` dimulai dengan `/certificates/` (bukan `public/certificates/`)
- Gunakan format lowercase dengan dash `-` untuk nama file (contoh: `dicoding-javascript.jpg`)
- Jika gambar tidak ditemukan, aplikasi akan menampilkan placeholder default

### Testing Lokal

Saat development dengan `npm run dev`, Vite akan otomatis serve file dari folder `public/` sehingga path `/certificates/...` akan bekerja dengan baik.

Untuk production build, pastikan file juga ter-copy ke folder public di output.
