// Set the paper info.
var studentName = document.getElementById('studentName').value;
var className = document.getElementById('className').value;
var profName = document.getElementById('profName').value;
var dueDate = document.getElementById('dueDate').value;
var paperTitle = document.getElementById('paperTitle').value;
var paperBody = document.getElementById('paperBody').value;

// This is not a constructor.
function generatePaper() {

    // Make the paper.
    var doc = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: 'letter'
    })

    // Set general paper guidelines.
    doc.setFont('times', 'normal')
    doc.setFontSize(12)
    doc.pageNumber = 0

    // Set all the information inside the doc object.
    var paperInfo = [studentName, className, profName, dueDate, paperTitle, paperBody];
    doc.paperInfo = paperInfo;

    // Set the page numbering.
    // placeOnPage = getPageNumbering('fullName', 9)
    

    doc.text('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ', 1, 1)
    doc.save('two-by-four.pdf')

}

// Makes lines of no more than 120 chars that can be pasted onto the document - simulating margins.
function makeLines(paperBody) {
    var words = paperBody.split()
    var totalLines = []
    var y = 0
    for (var x = 0; x < words.length; x++) {
        var runningWord = ''
        if ((words[x].length + charCount) < 120) {
            runningWord += words[x]
            y + words[x].length
        } else {
            totalLines.push(runningWord)
            charCount = 0
        }
    }
    return totalLines
}


function getPageNumbering(fullName, pageNumber) {
    lastName = fullName.split(" ")
    return lastName[lastName.length-1] + " " + pageNumber
}

// Prototype to check if a character exists at that point.
String.prototype.isEmpty = function (bodyWord) {
    return (bodyWord.length === 0 || !bodyWord.trim());
};

function clearInput(idArray) {

    idArray.forEach(id => {
        document.getElementById(id).value = "";
    });
}