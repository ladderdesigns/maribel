
// Set the paper info.

window.onload = function() {
    // var studentName = document.getElementById('studentName').value;
    // var className = document.getElementById('className').value;
    // var profName = document.getElementById('profName').value;
    // var dueDate = document.getElementById('dueDate').value;
    // var paperTitle = document.getElementById('paperTitle').value;
    // var paperBody = document.getElementById('paperBody').value;
}

// const PDFDocument = require('pdfkit');



// This is not a constructor.
function generatePaper() {

    // // Make the paper.
    // var doc = new jsPDF({
    //     orientation: 'portrait',
    //     unit: 'in',
    //     format: 'letter'
    // })

    const PDFDocument = require('pdfkit');

    // Create a document
    const doc = new PDFDocument;
    
    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream('output.pdf'));
    
    // Embed a font, set the font size, and render some text
    doc.font('fonts/PalatinoBold.ttf')
       .fontSize(25)
       .text('Some text with an embedded font!', 100, 100);
    
    // Add an image, constrain it to a given size, and center it vertically and horizontally
    doc.image('path/to/image.png', {
       fit: [250, 300],
       align: 'center',
       valign: 'center'
    });
    
    // Add another page
    doc.addPage()
       .fontSize(25)
       .text('Here is some vector graphics...', 100, 100);
    
    // Draw a triangle
    doc.save()
       .moveTo(100, 150)
       .lineTo(100, 250)
       .lineTo(200, 250)
       .fill("#FF3300");
    
    // Apply some transforms and render an SVG path with the 'even-odd' fill rule
    doc.scale(0.6)
       .translate(470, -380)
       .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
       .fill('red', 'even-odd')
       .restore();
    
    // Add some text with annotations
    doc.addPage()
       .fillColor("blue")
       .text('Here is a link!', 100, 100)
       .underline(100, 100, 160, 27, {color: "#0000FF"})
       .link(100, 100, 160, 27, 'http://google.com/');
    
    // Finalize PDF file
    doc.end();

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
    return lastName[lastName.length-1] + " " + pageNumber
}


function clearFields(idArray) {
 	
	idArray.forEach(id => {
		document.getElementById(id).value = "";
	});
}