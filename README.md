# FullStack Todo List

Aplikasi sederhana untuk mencatat kegiatan Todo yang terintegrasi dengan database MySQL & fitur drag-drop, menggunakan tech stack ExpressJS & NextJS

## Demo Video

[Klik untuk menonton demo](https://drive.google.com/file/d/1LBwBpRduevzK61D8AQFpq2eCIGqMl4oo/view?usp=drive_link)

### Pre-requisite

Pastikan Anda telah menginstal:

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Node.js](https://nodejs.org/)

### Step by step

1. Clone Repositori, ketikkan pada terminal
   ```bash
   git clone https://github.com/akhsanby/full-stack-todolist.git
   ```
2. Setelah selesai, ketikkan perintah pada terminal

   ```bash
   cd full-stack-todolist
   docker compose up -d
   ```

3. Ketikkan perintah berikut untuk akses terminal docker
   ```bash
   docker exec -it server_container sh
   ```
   lalu ketikkan lagi perintah berikut untuk inisiasi database
   ```bash
   npx prisma generate
   npx prisma migrate dev
   npm run run:seeder
   ```
4. Buka browser dan masuk ke url http://localhost:3000/ masukkan username **Akhsan** untuk data yang sudah ada atau masukkan username lain untuk membuat akun baru
