# 🔐 Login Accounts untuk Sistem Akademik

Berikut adalah akun-akun yang dapat digunakan untuk login setelah aplikasi di-deploy:

## 👨‍💼 **ADMINISTRATOR**
```
Username: admin
Password: admin123
Role: admin
Nama: Administrator
Email: admin@university.ac.id
```
**Akses:** Dashboard Admin, Manajemen Mahasiswa, Laporan, dll.

---

## 👨‍🏫 **DOSEN**

### Dosen 1
```
Username: dosen01
Password: dosen123
Role: dosen
Nama: Dr. Budi Santoso
Email: budi.santoso@university.ac.id
NIP: 198501012010011001
```

### Dosen 2
```
Username: dosen02
Password: dosen123
Role: dosen
Nama: Dr. Siti Aminah
Email: siti.aminah@university.ac.id
NIP: 198601012010012001
```
**Akses:** Dashboard Dosen, Data Mahasiswa, Input Nilai, dll.

---

## 🎓 **MAHASISWA**

### Mahasiswa 1 (Lulus)
```
Username: 20220001
Password: mhs123
Role: mahasiswa
Nama: Ahmad Rizki
Email: ahmad.rizki@student.university.ac.id
NIM: 20220001
Status: Lulus
IPK: 3.65
Jurusan: Teknik Informatika
Angkatan: 2022
```

### Mahasiswa 2 (Lulus)
```
Username: 20220002
Password: mhs123
Role: mahasiswa
Nama: Siti Nurhaliza
Email: siti.nurhaliza@student.university.ac.id
NIM: 20220002
Status: Lulus
IPK: 3.83
Jurusan: Sistem Informasi
Angkatan: 2022
```

### Mahasiswa 3 (Aktif)
```
Username: 20210001
Password: mhs123
Role: mahasiswa
Nama: Budi Pratama
Email: budi.pratama@student.university.ac.id
NIM: 20210001
Status: Aktif
IPK: 3.34
Jurusan: Teknik Informatika
Angkatan: 2021
```
**Akses:** Dashboard Mahasiswa, Nilai, Profil, dll.

---

## 📋 **Cara Deploy**

### 1. **Deploy JSON Server ke Render.com**
1. Push repository ke GitHub
2. Buat akun di [render.com](https://render.com)
3. Deploy sebagai Web Service
4. Set Build Command: `npm install`
5. Set Start Command: `npm run json-server:production`
6. Copy URL yang diberikan Render

### 2. **Deploy Frontend ke Netlify/Vercel**
1. Update file `.env.production` dengan URL API dari Render
2. Build aplikasi: `npm run build`
3. Deploy folder `dist` ke hosting provider

### 3. **Environment Variables untuk Production**
```bash
VITE_API_URL=https://your-render-app.onrender.com
VITE_APP_ENV=production
```

---

## 🧪 **Testing Login**
Setelah deploy, test dengan akun-akun di atas:
- Akses landing page
- Klik tombol "Login"
- Gunakan kombinasi username/password yang tersedia
- Verify redirect ke dashboard sesuai role

---

## 🔄 **Auto Login untuk Demo**
Landing page sudah menyediakan tombol "Login" yang mengarah ke halaman login dengan akun-akun yang tersedia di atas.