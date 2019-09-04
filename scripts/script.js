// author: Jacob Patel

var lastBlob = {};


// This is not a constructor.

var currentPage;

var documentTitle;

var makeWorkCited;


lorem = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry" + "s standard dummy" + "text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."


// Main tool for generating the paper.
function generatePaper() {

   currentPage = 0;

   var studentName = document.getElementById('studentName').value;
   var profName = document.getElementById('profName').value;
   var className = document.getElementById('className').value;
   var dueDate = document.getElementById('dueDate').value;
   var paperTitle = document.getElementById('paperTitle').value;
   var paperContents = document.getElementById('paperContents').value;

   var doc = new PDFDocument({ autoFirstPage: false });
   var stream = doc.pipe(blobStream());

   // Set document MLA guidelines.
   doc
      .fontSize(12)
      .font('Times-Roman')
      .lineGap(24)

   doc.on('pageAdded', function () {
      doc.moveUp()
      currentPage += 1;
      doc.text(getLastName(studentName) + ' ' + currentPage, {
         align: 'right'
      }
      );
   })


   // Set the page margins
   doc.addPage({
      margins: {
         top: 72,
         bottom: 72,
         left: 72,
         right: 72
      }
   });

   // Configure the heading in the top left corner.
   if (currentPage == 1) {
      doc
         .text(studentName, 72, 72)
         .text(profName, 72, 108)
         .text(className, 72, 144)
         .text(dueDate, 72, 180)
         .text(paperTitle, {
            align: 'center'
         }
         );

   }

   doc
      .text(paperContents)

   // edit the document's metadata
   doc
      .info['Title'] = paperTitle


   // Set the name to be saved of the document.
   documentTitle = paperTitle

   // Add the Work Cited page.

   if (makeWorkCited) {
      citations = document.getElementById('workCited').value,

         doc
            .addPage()
            .text('Works Cited', {
               align: 'center'
            }
            )
   }




   var x;
   // for (x = 0; indivCitations.length; x++) {
   //    doc.text(indivCitations[x], {
   //       align: 'left'
   //    }
   //    );
   //    x++;
   // }


   // End and display the document in the iframe to the right
   doc.end();

   stream.on('finish', function () {
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

function toggleMakeWorkCited() {
   makeWorkCited = true;
}

function getDocumentTitle() {
   return documentTitle
}

function getLastName(words) {
   var n = words.split(" ");
   n.shift()
   return n
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
   window.addEventListener('focus', e => URL.revokeObjectURL(link.href), { once: true });
};

// Clear all user inputted fields.
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

// Event listener for the hamburger.
document.addEventListener('DOMContentLoaded', () => {

   // Get all "navbar-burger" elements
   const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

   // Check if there are any navbar burgers
   if ($navbarBurgers.length > 0) {

      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
         el.addEventListener('click', () => {

            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');

         });
      });
   }

});

$(".delete").click(function () {
   $(".modal").addClass("is-active");
});

$(".modal-close").click(function () {
   $(".modal").removeClass("is-active");
});

// Remove the article box.
function removeMessage() {
   var elem = document.getElementById('message');
   elem.parentNode.removeChild(elem);
   return false;
}

// Show and hide divs.
function showhide(id) {
   if (document.getElementById) {
      var divid = document.getElementById(id);
      var divs = document.getElementsByClassName("hideable");
      for (var i = 0; i < divs.length; i = i + 1) {
         $(divs[i]).fadeOut("slow");
      }
      $(divid).fadeIn("slow");
   }
   return false;
}

function toggleWorkCited() {
   var x = document.getElementById("workCited");
   if (x.style.display === "none") {
      document.getElementById("toggleWorkCited").textContent = 'Add Citations'
   } else {
      document.getElementById("toggleWorkCited").textContent = 'Add Citations'
      x.style.display = "block";
   }
}