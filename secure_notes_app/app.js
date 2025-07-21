const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');

dotenv.config();

const app = express();

// Middleware'ler
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'gizliAnahtar',
  resave: false,
  saveUninitialized: false
}));

// CSRF koruması
const csrfProtection = csrf();
app.use(csrfProtection);

// Tüm ejs dosyalarına csrfToken otomatik gönder
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

// EJS ayarları
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Giriş kontrol middleware’i
function loginRequired(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    return res.redirect('/login');
  }
}

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/secure_notes', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB bağlantısı başarılı');
}).catch((err) => {
  console.log('MongoDB bağlantı hatası:', err);
});

// Rotalar
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');

app.use(authRoutes);
app.use(noteRoutes);

// Sayfalar
app.get('/', (req, res) => {
  res.send('Güvenli Not Uygulaması Çalışıyor!');
});

app.get('/dashboard', loginRequired, (req, res) => {
  res.render('dashboard');
});

// Sunucu başlat
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
