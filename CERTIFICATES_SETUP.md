# Panduan Menggunakan Sertifikat Lokal

## 📋 Daftar File Baru

### 1. `src/data/certificateData.ts`
File ini berisi semua data sertifikat Anda. Setiap sertifikat memiliki struktur:

```typescript
{
  title: string;           // Judul sertifikat
  issuer: string;         // Organisasi penerbit
  id: string;             // ID unik sertifikat
  date: string;           // Tanggal penerbitan (format: YYYY.MM.DD)
  color: string;          // Gradient background (Tailwind classes)
  image: string;          // Path ke file gambar (dari folder public/certificates/)
  icon: typeof Award;     // Icon dari lucide-react
  details: string;        // Deskripsi detail sertifikat
}
```

### 2. `public/certificates/`
Folder untuk menyimpan semua file gambar sertifikat lokal.

### 3. File struktur yang diperbarui
- `src/components/sections/Certificates.tsx` - Sekarang import data dari `certificateData.ts`

## 🎯 Cara Menggunakan

### Step 1: Simpan Gambar Sertifikat
Letakkan file gambar sertifikat Anda di folder `public/certificates/` dengan nama:
- `dicoding-javascript.jpg` (untuk sertifikat JavaScript Dicoding)
- `neural-network.jpg` (untuk sertifikat Neural Network)
- `cyber-security.jpg` (untuk sertifikat Cyber Security)
- `hpc-computing.jpg` (untuk sertifikat HPC)

### Step 2: Update Path (Opsional)
Jika Anda ingin mengubah nama file atau menambah sertifikat baru, buka `src/data/certificateData.ts` dan ubah field `image`:

```typescript
image: "/certificates/nama-file-anda.jpg"
```

### Step 3: Tambah/Edit Sertifikat (Opsional)
Untuk menambah sertifikat baru atau mengedit yang sudah ada, edit array `certs` di `src/data/certificateData.ts`:

```typescript
{
  title: "Nama Sertifikat Baru",
  issuer: "Nama Organisasi",
  id: "UNIQUE-ID-123",
  date: "2025.05.15",
  color: "from-blue-500/20 to-purple-500/10",
  image: "/certificates/sertifikat-baru.jpg",
  icon: Award,  // Pilih dari: Award, ShieldCheck, Cpu, Globe
  details: "Deskripsi detail tentang sertifikat ini..."
}
```

## 🎨 Pilihan Icon
Tersedia pilihan icon dari lucide-react:
- `Globe` - Untuk general/programming
- `Cpu` - Untuk AI/Computing
- `ShieldCheck` - Untuk Security
- `Award` - Untuk Achievement

Jika ingin menambah icon baru, import dari lucide-react di `certificateData.ts`:
```typescript
import { Award, ShieldCheck, Cpu, Globe, YourNewIcon } from 'lucide-react';
```

## 🎨 Gradient Colors (Tailwind)
Gunakan format Tailwind untuk gradient:
- `from-blue-900/40 to-cyan-900/20` - Blue variant
- `from-purple-500/20 to-pink-500/10` - Purple variant
- `from-emerald-500/20 to-blue-500/10` - Green variant
- `from-orange-500/20 to-yellow-500/10` - Orange variant

## ✅ Keuntungan Struktur Baru

✨ **Pemisahan Data & UI** - Data sertifikat terpisah dari komponen React
✨ **Mudah Dikelola** - Semua data terpusat di satu file
✨ **Scalable** - Mudah menambah sertifikat baru
✨ **Reusable** - File lokal tidak bergantung pada link eksternal
✨ **Type-Safe** - Full TypeScript support dengan interface

## 🚀 Testing Lokal

1. Simpan gambar ke `public/certificates/`
2. Jalankan `npm run dev`
3. Aplikasi akan serve file dari folder public secara otomatis
4. Kunjungi halaman certificates dan lihat gambar lokal ditampilkan

## 📝 Catatan Penting

- ✅ Path di TypeScript: `/certificates/nama-file.jpg` (BUKAN `public/certificates/...`)
- ✅ File harus berada di folder: `public/certificates/`
- ✅ Format file: JPG, PNG, atau WebP
- ✅ Nama file: gunakan lowercase dengan dash `-` (contoh: `sertifikat-baru.jpg`)
- ✅ Ukuran optimal: minimal 1200x850px

## 🔗 Struktur Folder Akhir

```
portofolio/
├── public/
│   └── certificates/          ← Folder untuk gambar lokal
│       ├── README.md
│       ├── dicoding-javascript.jpg
│       ├── neural-network.jpg
│       ├── cyber-security.jpg
│       └── hpc-computing.jpg
├── src/
│   ├── data/
│   │   └── certificateData.ts  ← File data sertifikat
│   └── components/
│       └── sections/
│           └── Certificates.tsx ← Component yang menggunakan data
```

## 💡 Tips

- Gunakan resolusi tinggi untuk gambar (1200x850px atau lebih)
- Compress gambar untuk performa lebih baik (gunakan tools seperti TinyPNG)
- Pastikan nama file konsisten dengan path di `certificateData.ts`
