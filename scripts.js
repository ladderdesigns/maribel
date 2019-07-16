<script>

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

	var paperInfo = [studentName, className, profName, dueDate, paperTitle, paperBody];
	doc.paperInfo = paperInfo;

	// Set general paper guidelines.
	doc.setFont('times','normal')
	doc.setFontSize(12)
	doc.pageNumber = 0
	//doc.setLineWidth(6.5)

	alert(doc.paperInfo[4])

	//alert(makeLines(paperBody))

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

// Prototype to check if a character exists at that point.
String.prototype.isEmpty = function(bodyWord) {
    return (bodyWord.length === 0 || !bodyWord.trim());
};

function setPageNumber(currPageNumber) {
	var fullName = getPaperInfo()[0];
	alert(fullName)
	var lastName = fullName.substring((fullName.indexOf(" "))+1,-1);
	alert(lastName)
}

</script>