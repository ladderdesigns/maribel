// author: Jacob Patel

var lastBlob = {};
var currentPage;
var documentTitle;
var makeWorksCited = false;
var documentTitle;

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
   doc.fontSize(12)
      .font('Times-Roman')
      .lineGap(12)

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
      doc.text(studentName, 72, 72)
         .text(profName, 72, 108)
         .text(className, 72, 144)
         .text(dueDate, 72, 180)
         .text(paperTitle, {
            align: 'center'
         });
   }

   doc.text(paperContents);

   // edit the document's metadata
   if (paperTitle != "") {
      doc.info['Title'] = paperTitle;
   } else {
      doc.info['Title'] = 'Maribel - MLA Formatter';
   }


   // Set the name to be saved of the document.
   documentTitle = paperTitle;

   // Add the Works Cited page.
   if (makeWorksCited) {
      doc.addPage()
         .text('Works Cited', {
            align: 'center'
         });
      citations = document.getElementById('worksCited').value;
      citations = citations.split('\n');
      citations = citations.filter(c => String(c).trim()); //remove empty citations

      var pos = 72;
      var lineInc = 36;
      let w = doc.page.width - 72 - 72;
      for (x = 0; x < citations.length; x++) {
         var brokenCitation = breakLine(citations[x], w, doc);
         console.log(brokenCitation);
         for (y = 0; y < brokenCitation.length; y++) {
            if (y >= 1) {
               doc.text(brokenCitation[y], {
                  align: 'left',
                  indent: 60
               });
            } else {
               doc.text(brokenCitation[y], {
                  align: 'left'
               });
            }
            
         }
         // TODO: loop over brokenCitation, writing each line to document, but each line after the first has a \t character prepended to it
      }
   }

   // End and display the document in the iframe to the right
   doc.end();

   stream.on('finish', function () {
      var iframe = document.querySelector('object');
      // get a blob you can do whatever you like with
      const blob = stream.toBlob('application/jpg');
      // or get a blob URL for display in the browser
      const url = stream.toBlobURL('application/pdf');
      lastBlob = blob;
      iframe.data = url;
   });
}

//TODO: implement this
// given a string str and a int width, return an array of strings that is created by splitting up the original string into
// smaller strings that have a width less than the given width, but only on spaces
// example: breakLine("This is an example string.", 10) -> ["This is an", "example", "string."]
/* Derwing, T. M., Rossiter, M. J., & Munro, M. J. (2002). Teaching native speakers to listen to foreign-accented speech. Journal of Multilingual and Multicultural Development, 23(4), 245-259. */

function breakLine(str, width, doc) {
   var lines = [];
   while (doc.widthOfString(str) > width) {
      var firstSpace = str.indexOf(" ");
      while (doc.widthOfString(str.substring(0,firstSpace+1)) < width) {
         var substr = str.substring(0,firstSpace+1);
         var nextSpace = str.indexOf(" ", firstSpace+1);
         if (doc.widthOfString(str.substring(0, nextSpace+1)) > width) {
            if (lines.length == 0) {
               width -= 72;
            }
            lines.push(str.substring(0, firstSpace));
            str = str.substring(firstSpace+1);
            break;
         }
         firstSpace = nextSpace;
      }
   }
   lines.push(str);
   return lines;
}

// color brackets

function getDocumentTitle() {
   if (documentTitle == "") {
      return "Maribel - MLA Formatter";
   } else {
      return documentTitle;
   }
}

function getLastName(fullName) {
   lastName = fullName.substring(fullName.indexOf(' ') + 1);
   return lastName;
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

function fadeOut(id) {
   var elem = document.getElementById(id);
   elem.className = "fadeOut";
   return false;
}

function fadeIn(id) {
   var elem = document.getElementById(id);
   elem.className = "fadeIn";
   return false;
}

function removeItem(id) {
   var elem = document.getElementById(id);
   elem.parentNode.removeChild(elem);
}

function toggleWorksCited() {
   var x = document.getElementById("worksCited");
   if (x.style.display === "none") {
      document.getElementById("toggleWorksCited").innerHTML = 'Remove Works Cited<i class="fas fa-book has-small-margin-left"></i>';
      x.style.display = "block";
      makeWorksCited = true;
   } else {
      x.style.display = "none";
      document.getElementById("toggleWorksCited").innerHTML = 'Add Works Cited<i class="fas fa-book has-small-margin-left"></i>';
   }
}