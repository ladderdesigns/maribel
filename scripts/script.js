

// Set the paper info.

window.onload = function () {
   // var studentName = document.getElementById('studentName').value;
   // var className = document.getElementById('className').value;
   // var profName = document.getElementById('profName').value;
   // var dueDate = document.getElementById('dueDate').value;
   // var paperTitle = document.getElementById('paperTitle').value;
   // var paperBody = document.getElementById('paperBody').value;
}

// This is not a constructor.
function generatePaper() {

   // // Make the paper.
   // var doc = new jsPDF({
   //     orientation: 'portrait',
   //     unit: 'in',
   //     format: 'letter'
   // })

   // Create a document
   // create a document and pipe to a blob
var doc = new PDFDocument();
var stream = doc.pipe(blobStream());

// draw some text
doc.fontSize(25).text('Here is some vector graphics...', 100, 80);

// some vector graphics
doc
  .save()
  .moveTo(100, 150)
  .lineTo(100, 250)
  .lineTo(200, 250)
  .fill('#FF3300');

doc.circle(280, 200, 50).fill('#6600FF');

// an SVG path
doc
  .scale(0.6)
  .translate(470, 130)
  .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
  .fill('red', 'even-odd')
  .restore();

// and some justified text wrapped into columns
doc
  .text('And here is some wrapped text...', 100, 300)
  .font('Times-Roman', 13)
  .moveDown()
//   .text(lorem, {
//     width: 412,
//     align: 'justify',
//     indent: 30,
//     columns: 2,
//     height: 300,
//     ellipsis: true
//   });

// end and display the document in the iframe to the right
doc.end();
stream.on('finish', function() {
   var iframe = document.querySelector('embed');
   iframe.src = stream.toBlobURL('application/pdf');
});
   // // Set general paper guidelines.
   // doc.setFont('times', 'normal')
   // doc.setFontSize(12)
   // doc.pageNumber = 0

   // // Set all the information inside the doc object.
   // var paperInfo = [studentName, className, profName, dueDate, paperTitle, paperBody];
   // doc.paperInfo = paperInfo;

   // // Set the page numbering.
   // // placeOnPage = getPageNumbering('fullName', 9)


   // doc.text('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ', 1, 1)
   // doc.save('two-by-four.pdf')



}

// Makes lines of no more than 120 chars that can be pasted onto the document - simulating margins.
function makeLines(paperBody) {
   // var words = paperBody.split()
   // var totalLines = []
   // var y = 0
   // for (var x = 0; x < words.length; x++) {
   //     var runningWord = ''
   //     if ((words[x].length + charCount) < 120) {
   //         runningWord += words[x]
   //         y + words[x].length
   //     } else {
   //         totalLines.push(runningWord)
   //         charCount = 0
   //     }
   // }
   // return totalLines
}


function getPageNumbering(fullName, pageNumber) {
   lastName = fullName.split(" ")
   return lastName[lastName.length - 1] + " " + pageNumber
}


function clearFields(idArray) {

   idArray.forEach(id => {
      document.getElementById(id).value = "";
   });
}