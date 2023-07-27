function toggleTheme() {
    var body = document.body;
    var themeIcon = document.getElementById("theme-icon");
    body.classList.toggle("dark-theme");
    if (body.classList.contains("dark-theme")) {
        themeIcon.setAttribute('data-feather', 'sun');
    } else {
        themeIcon.setAttribute('data-feather', 'moon');
    }
    feather.replace();
}

// Get modal elements
var helpModal = document.getElementById('myModal');
var statsModal = document.getElementById('stats-modal');
var imgModal = document.getElementById('imgModal');

// Open the help modal
function openHelpModal() {
    helpModal.style.display = "block";
}

// Open the stats modal
function openStatsModal() {
    statsModal.style.display = "block";
}

// Get all the close buttons
var closeButtons = document.querySelectorAll(".close");

// Assign the onclick event to each close button
closeButtons.forEach(function(closeButton) {
    closeButton.onclick = function() { 
        console.log('Close button clicked'); // Log a message when a close button is clicked
        helpModal.style.display = "none";
        statsModal.style.display = "none";
        imgModal.style.display = "none";
    }
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == helpModal || event.target == statsModal || event.target == imgModal) {
        helpModal.style.display = "none";
        statsModal.style.display = "none";
        imgModal.style.display = "none";
    }
}

window.addEventListener('load', (event) => {
    feather.replace();
});

let imageNums = [3, 18, 4, 2, 19]; 
let userInputs = [];
let inputs = document.querySelectorAll('.cell input');
let rows = document.querySelectorAll('.row');

for(let i=2; i<rows.length; i++) {
    for(let j=0; j<rows[i].children.length; j++) {
        rows[i].children[j].firstElementChild.disabled = true;
        rows[i].children[j].firstElementChild.addEventListener('keydown', function(e) {
            handleInput(i-1, j, e);
        });
    }
}

for(let i=0; i<rows[1].children.length; i++) {
    rows[1].children[i].firstElementChild.disabled = false;
    rows[1].children[i].firstElementChild.addEventListener('keydown', function(e) {
            handleInput(0, i, e);
    });
}

function handleInput(rowIndex, cellIndex, e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        let allCellsFilled = true;
        for(let cellIndex=0; cellIndex<rows[rowIndex+1].children.length; cellIndex++) {
            let val = parseInt(rows[rowIndex+1].children[cellIndex].firstElementChild.value);
            if(isNaN(val) || val < 1 || val > 20) {
                allCellsFilled = false;
                break;
            } else {
                userInputs[rowIndex * 5 + cellIndex] = val;
            }
        }
        if(allCellsFilled) {
            for(let cellIndex=0; cellIndex<rows[rowIndex+1].children.length; cellIndex++) {
                let val = userInputs[rowIndex * 5 + cellIndex];
                let column = cellIndex;
                if(val === imageNums[column]) {
                    rows[rowIndex+1].children[cellIndex].firstElementChild.style.backgroundColor = 'green';
                    rows[rowIndex+1].children[cellIndex].firstElementChild.style.color = 'white';
                } else if(Math.abs(val - imageNums[column]) <= 2) {
                    rows[rowIndex+1].children[cellIndex].firstElementChild.style.backgroundColor = '#F6BE00';
                    rows[rowIndex+1].children[cellIndex].firstElementChild.style.color = 'white';
                } else {
                    rows[rowIndex+1].children[cellIndex].firstElementChild.style.backgroundColor = '#53565B';
                    rows[rowIndex+1].children[cellIndex].firstElementChild.style.color = 'white';
                }
            }
            // Disable the current row
            for(let i=0; i<rows[rowIndex+1].children.length; i++) {
                rows[rowIndex+1].children[i].firstElementChild.disabled = true;
            }
            // Enable the next row if it exists
            if(rowIndex+2 < rows.length) {
                for(let i=0; i<rows[rowIndex+2].children.length; i++) {
                    rows[rowIndex+2].children[i].firstElementChild.disabled = false;
                }
            }
        } else {
            // Show an alert or a message when there's any unfilled or invalid cell in the current row
            alert("Please fill all cells in the current row with numbers between 1 and 20 before proceeding.");
        }
    }
}

window.onload = function() {
    var closeButtons = document.querySelectorAll(".close");

    closeButtons.forEach(function(closeButton) {
        closeButton.onclick = function() { 
            console.log('Close button clicked');
            helpModal.style.display = "none";
            statsModal.style.display = "none";
            imgModal.style.display = "none";
        }
    });

    var modalImg = document.getElementById("modalImage");
    var images = document.querySelectorAll(".cell img");
    images.forEach(function(img) {
        img.onclick = function(){
            imgModal.style.display = "block";
            modalImg.src = this.src;
        }
    })
}