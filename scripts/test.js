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

// Initialize Quill editor
var quill = new Quill('#editor', {
  modules: {
      toolbar: '#toolbar'
  },
  theme: 'snow'
});

// Save options toggle
document.getElementById('saveBtn').addEventListener('click', function() {
var saveOptions = document.getElementById('saveOptions');
if (saveOptions.style.display === 'block') {
    saveOptions.style.display = 'none';
} else {
    saveOptions.style.display = 'block';
}
});

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
if (!event.target.matches('#saveBtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.style.display === 'block') {
            openDropdown.style.display = 'none';
        }
    }
}
}

// Additional scripts for saving content, etc.
