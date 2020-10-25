var express = require('express');
var router = express.Router();
const PDFDocument = require('pdfkit')

router.get('/', (req, res) => {
  res.render('pdf')
})
router.post('/p', (req, res) => {
  const doc = new PDFDocument()
  console.log(req.body)
  // console.log(doc);
  let filename = req.body.filename
  // Stripping special characters
  filename = encodeURIComponent(filename) + '.pdf'
  // Setting response to 'attachment' (download).
  // If you use 'inline' here it will automatically open the PDF
  res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
  res.setHeader('Content-type', 'application/pdf')
  const content = req.body.content
  doc.y = 300
  doc.text(content, 50, 50)
  doc.pipe(res)
  doc.end()
})



module.exports = router;