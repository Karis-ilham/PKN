# Marvatel Lapangan — React Frontend

Frontend Marvatel dipindahkan dari Laravel Blade ke React + Vite. Project ini hanya berisi frontend; tidak ada database, controller, model, maupun backend.

## Menjalankan project

1. Pastikan Node.js dan npm sudah terpasang.
2. Ekstrak folder project.
3. Buka folder `marvatel-react` di VS Code.
4. Jalankan terminal:

```bash
npm install
npm run dev
```

5. Buka alamat lokal yang ditampilkan Vite (biasanya `http://localhost:5173`).

Untuk mengecek hasil build:

```bash
npm run build
```

## Struktur

```text
marvatel-react/
├── public/
├── src/
│   ├── assets/
│   │   └── marvatel-markup.html
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── legacy-ui.js
│   ├── main.jsx
│   └── styles.css
├── .env.example
├── index.html
└── package.json
```

## Hal penting untuk integrasi backend

- `src/services/api.js` adalah tempat pemanggilan API Laravel.
- Salin `.env.example` menjadi `.env`, lalu sesuaikan `VITE_API_BASE_URL`.
- Endpoint contoh yang disiapkan: `POST /login`, `POST /logout`, `GET /customers`, `POST /customers`, `POST /customers/{kode}/payments`, dan `PATCH /customers/{kode}/invoice`.
- Format request/response masih mengikuti kontrak contoh pada project Laravel sebelumnya. Teman yang mengerjakan backend perlu mengonfirmasi endpoint, autentikasi, CSRF/CORS, dan bentuk JSON final.
- Saat ini UI tetap menggunakan data dummy/prototipe. Form dan tombol belum menyimpan data ke server. Ini disengaja karena backend belum dikerjakan.

## Catatan migrasi

Aplikasi sudah dijalankan melalui React (`createRoot`) dan dibangun menggunakan Vite. Untuk mempertahankan tampilan serta perilaku prototipe yang sudah ada, markup dan interaksi DOM lama dipisahkan ke `assets/marvatel-markup.html` dan `legacy-ui.js`, lalu dipasang saat komponen React dimuat. Ini adalah tahap migrasi frontend awal; komponen layar dapat dipecah menjadi komponen React murni secara bertahap setelah integrasi API disepakati.
