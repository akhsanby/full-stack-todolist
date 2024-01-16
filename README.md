# FullStack Todo List

Aplikasi sederhana untuk mencatat kegiatan Todo yang dengan fitur CRUD & dragdrop Todo, menggunakan tech stack ExpressJS & NextJS

## Demo Video

[Klik untuk menonton demo](https://drive.google.com/file/d/1LBwBpRduevzK61D8AQFpq2eCIGqMl4oo/view?usp=drive_link)

## Instalasi

Berikut adalah langkah-langkah untuk menginstal dan menjalankan project ini secara lokal.

### Prasyarat

Pastikan Anda telah menginstal:

- [Node.js](https://nodejs.org/)
- [XAMPP](https://www.apachefriends.org/)

### Langkah-langkah

1. Clone Repositori:

   ```bash
   https://github.com/akhsanby/full-stack-todolist.git

   ```

2. Jalankan terminal pada folder repositori hasil clone, dan ketikkan perintah

   ```bash
   cd client && npm install && cd ../server && npm install

   ```

3. Buka aplikasi XAMPP dan nyalakan Apache & MySQL
4. Buka url http://localhost/phpmyadmin pada browser. Buat database dengan nama **todo-list**

5. Masuk ke folder **server** buatlah file **.env**, pastekan kode berikut

   ```bash
   DATABASE_URL="mysql://root:@localhost:3306/todo-list?schema=public"
   ```

6. Jalankan terminal pada folder **server** di repositori, dan ketikkan perintah

   ```bash
   npx prisma generate && npx prisma migrate dev
   ```

7. Jalankan aplikasinya dengan 2 terminal terpisah, ketikkan perintah

   ```bash
   cd client && npm run dev
   ```

   ```bash
   cd server && npm run start
   ```

8. Buka url http://localhost:3000 pada browser.
