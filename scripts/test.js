// NavBar Collapse/Expand button
document.getElementById('toggle-button').addEventListener('click', function() {
    var header = document.querySelector('header');
    var optionsBar = document.getElementById('options-bar');
    header.classList.toggle('collapsed'); 

    if (header.classList.contains('collapsed')) {
        optionsBar.style.top = '43px';
    } else {
        optionsBar.style.top = '70px';
    }
});

// Session ID Generation
function generateSessionID(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

document.getElementById('session-id').innerText = generateSessionID(10); 

// Options Bar
let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");


//Initial Settings
const initializer = () => {
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  fontList.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });
};


const modifyText = (command, defaultUi, value) => {
  
  document.execCommand(command, defaultUi, value);
};

optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});


advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");
  if (userLink) {
    if (!/http/i.test(userLink)) {
      userLink = "http://" + userLink;
    }
    document.execCommand("createLink", false, userLink);
    
    // Add class to the created hyperlink
    const selection = window.getSelection();
    if (selection.rangeCount) {
      let element = selection.anchorNode;
      while (element && element.nodeType !== 1) {
        element = element.parentNode;
      }
      if (element && element.tagName === "A") {
        element.id = "hyperlink";
        element.classList.add("custom-hyperlink");
      }
    }
  }
});

const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      if (needsRemoval) {
        let alreadyActive = false;

        if (button.classList.contains("active")) {
          alreadyActive = true;
        }

        highlighterRemover(className);
        if (!alreadyActive) {
          button.classList.add("active");
        }
      } else {
        button.classList.toggle("active");
      }
    });
  });
};

const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

window.onload = initializer();

document.getElementById('pageColor').addEventListener('change', function() {
    var pages = document.querySelectorAll('.page');

    pages.forEach(function(page) {
        page.style.backgroundColor = this.value;
    }.bind(this)); 
});



document.getElementById('document').addEventListener('mouseup', updateFontUI);
document.getElementById('document').addEventListener('keyup', updateFontUI);

function updateFontUI() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        let element = selection.getRangeAt(0).startContainer;
        while (element.nodeType !== 1) { 
            element = element.parentNode;
        }

        const fontFamily = window.getComputedStyle(element).fontFamily.replace(/["']/g, ""); 
        const fontSelector = document.getElementById('fontName');
        if (fontFamily) {
            fontSelector.value = fontFamily;
            if (fontSelector.selectedIndex === -1) { 
                fontSelector.value = "default";
            }
        }
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const fontSizeDropdown = document.getElementById('fontSizeDropdown');
    const fontSizeInput = document.getElementById('fontSizeInput');
    const documentArea = document.getElementById('document');

    fontSizeDropdown.addEventListener('change', function() {
        applyFontSize(this.value);
        fontSizeInput.value = parseInt(this.value.replace('px', '')); 
    });

    fontSizeInput.addEventListener('change', function() {
        const size = this.value + 'px'; 
        applyFontSize(size);
        fontSizeDropdown.value = ''; 
    });

    function applyFontSize(size) {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        let range = selection.getRangeAt(0);
        if (range.collapsed) return;

        const span = document.createElement('span');
        span.style.fontSize = size;
        span.innerHTML = range.extractContents().textContent;

        range.insertNode(span);

        selection.removeAllRanges();
        const newRange = document.createRange();
        newRange.selectNodeContents(span);
        selection.addRange(newRange);
    }

    document.getElementById('document').addEventListener('mouseup', updateFontUI);
    document.getElementById('document').addEventListener('keyup', updateFontUI);

    function updateFontUI() {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            let element = selection.getRangeAt(0).startContainer;
            while (element.nodeType !== 1) { 
                element = element.parentNode;
            }

            const fontSize = window.getComputedStyle(element).fontSize;
            fontSizeInput.value = parseInt(fontSize.replace('px', '')); 
            fontSizeDropdown.value = fontSize; 
            if (fontSizeDropdown.selectedIndex === -1) {
                fontSizeDropdown.value = '';
            }
        }
    }
});







document.getElementById('saveBtn').addEventListener('click', function() {
    var element = document.querySelector('.container'); // Selects the first element with class 'container'
    var date = new Date(); // Current date and time
    var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Formatting month
    var day = date.getDate().toString().padStart(2, '0'); // Formatting day
    var hour = date.getHours().toString().padStart(2, '0'); // Formatting hour
    var minute = date.getMinutes().toString().padStart(2, '0'); // Formatting minute
    var fileName = `${month}${day}_${hour}${minute}.pdf`; // Constructing file name with timestamp

    var opt = {
      margin: [0.5, 0.5, 0.5, 0.5], // Set uniform margins (top, left, bottom, right) in inches
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, logging: true, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Call html2pdf(), pass the options, and start the download
    html2pdf().set(opt).from(element).save();
});
