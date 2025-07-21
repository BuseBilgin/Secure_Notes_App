 Proje Adı: Güvenli Not Tutma Uygulaması
 Hazırlayan: Buse Gül Rana Bilgin

🔧 Gerekli Kurulumlar:
1. Node.js (https://nodejs.org/)
2. MongoDB Community Server (https://www.mongodb.com/try/download/community)

📦 Projeyi Çalıştırmak İçin:

1. Terminal veya komut istemcisi (CMD/PowerShell) açılır.
2. Proje klasörünün bulunduğu dizine gidilir.
   Örnek:
   cd secure_notes_app

3. Gerekli bağımlılıklar yüklenir:
   npm install

4. MongoDB başlatılır (eğer arkaplanda çalışmıyorsa):
   mongod

5. Proje başlatılır:
   node app.js

6. Tarayıcıdan şu adrese gidilir:
   http://localhost:3000

🧪 Kullanım:
- İlk olarak "Register" sayfasından kayıt olun.
- Daha sonra "Login" ile giriş yapılır.
- "Dashboard" üzerinden not ekleme ekranına geçilir.

💡 Notlar:
- MongoDB localhost:27017'de çalışmalıdır.
- CSRF koruması ve bcrypt ile şifreleme aktif durumdadır.
- Tasarım pastel pembe & yeşil renktedir.