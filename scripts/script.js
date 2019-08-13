// author: Jacob Patel

var lastBlob = {};

// bulma modal
// bulma toast

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

   var doc = new PDFDocument();
   var stream = doc.pipe(blobStream());

   const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl.";

   doc.fontSize(8);
   doc.text(`This text is left aligned. ${lorem}`, {
    width: 410,
    align: 'left'
   }
   );
   doc.moveDown();
   doc.text(`This text is centered. ${lorem}`, {
    width: 410,
    align: 'center'
   }
   );
   doc.moveDown();
   doc.text(`This text is right aligned. ${lorem}`, {
    width: 410,
    align: 'right'
   }
   );
   doc.moveDown();
   doc.text(`This text is justified. ${lorem}`, {
    width: 410,
    align: 'justify'
   }
   );
   // draw bounding rectangle
   doc.rect(doc.x, 0, 410, doc.y).stroke();

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