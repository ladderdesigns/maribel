// author: Jacob Patel

var lastBlob = {};

// bulma modal
// bulma toast

// or bulma notification, has js on docs page

// Set the paper info.

window.onload = function () {
   var studentName = document.getElementById('studentName').value;
   var className = document.getElementById('className').value;
   var profName = document.getElementById('profName').value;
   var dueDate = document.getElementById('dueDate').value;
   var paperTitle = document.getElementById('paperTitle').value;
   var paperBody = document.getElementById('paperBody').value;
}

// avoid all this with map function
s
// This is not a constructor.
function generatePaper() {

   var doc = new PDFDocument({autoFirstPage: false});
   var stream = doc.pipe(blobStream());

   // Set document font and size.
   doc
      .fontSize(12)
      .font("Times-Roman")
      .lineGap(24)

   // Set the page margins
   doc.addPage({
      margins: {
      top: 72,
      bottom: 72,
      left: 72,
      right: 72
      }
     });

     doc
      .text("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's")


   // end and display the document in the iframe to the right
   doc.end();
   stream.on('finish', function() {
      var iframe = document.querySelector('embed');
      // get a blob you can do whatever you like with
      const blob = stream.toBlob('application/pdf');
      // or get a blob URL for display in the browser
      const url = stream.toBlobURL('application/pdf');
      lastBlob = blob;
      iframe.src = url;
     });

     quarter()
}

const downloadFile = (blob, fileName) => {
   const link = document.createElement('a');
   // create a blobURI pointing to our Blob
   link.href = URL.createObjectURL(blob);
   link.download = fileName;
   // some browser needs the anchor to be in the doc
   document.body.append(link);
   link.click();
   link.remove();
   // in case the Blob uses a lot of memory
   window.addEventListener('focus', e=>URL.revokeObjectURL(link.href), {once:true});
 };

function clearFields(idArray) {

   idArray.forEach(id => {
      document.getElementById(id).value = "";
   });
}

function quarter() {
   window.resizeTo(
     window.screen.availWidth / 2,
     window.screen.availHeight / 2
   );
 }
