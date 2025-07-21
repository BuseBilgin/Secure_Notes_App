const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const crypto = require('crypto');

// Kullanıcı girişi kontrolü
function loginRequired(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    return res.redirect('/login');
  }
}

// AES ile şifreleme
function encrypt(text) {
  const key = crypto.scryptSync('notSifresi', 'salt', 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

// AES ile çözme (güvenli versiyon)
function decrypt(encrypted) {
  if (!encrypted || typeof encrypted !== 'string' || !encrypted.includes(':')) {
    return '[Çözülemedi]';
  }

  try {
    const key = crypto.scryptSync('notSifresi', 'salt', 32);
    const [ivHex, content] = encrypted.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(content, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    return '[Çözme Hatası]';
  }
}

// Not ekleme sayfası
router.get('/notes/add', loginRequired, (req, res) => {
  res.render('add-note');
});

// Not ekleme işlemi
router.post('/notes/add', loginRequired, async (req, res) => {
  const { title, content } = req.body;
  const encrypted = encrypt(content);
  const note = new Note({
    user: req.session.userId,
    title,
    encryptedContent: encrypted
  });
  await note.save();
  res.redirect('/notes');
});

// Notları listeleme
router.get('/notes', loginRequired, async (req, res) => {
  const notes = await Note.find({ user: req.session.userId });
  const decryptedNotes = notes
    .filter(note => note.encryptedContent)
    .map(note => ({
      title: note.title,
      content: decrypt(note.encryptedContent)
    }));
  res.render('notes', { notes: decryptedNotes });
});

module.exports = router;
