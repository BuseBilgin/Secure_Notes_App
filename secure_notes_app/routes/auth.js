const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Kayıt sayfası
router.get('/register', (req, res) => {
  res.render('register');
});

// Kayıt işlemi
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.send('Kullanıcı adı zaten mevcut.');
    }
    const user = new User({ username, password });
    await user.save();
    req.session.userId = user._id;
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send('Kayıt sırasında bir hata oluştu.');
  }
});

// Giriş sayfası
router.get('/login', (req, res) => {
  res.render('login');
});

// Giriş işlemi
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.send('Geçersiz kullanıcı adı veya şifre.');
    }
    req.session.userId = user._id;
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send('Giriş sırasında bir hata oluştu.');
  }
});

// Çıkış işlemi
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
