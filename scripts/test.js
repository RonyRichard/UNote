document.addEventListener('DOMContentLoaded', function() {
  // Better extraction of session ID using URLSearchParams
  var urlParams = new URLSearchParams(window.location.search);
  var sessionId = urlParams.get('session'); // Get the session parameter from the URL

  // Display the session ID in the HTML
  document.getElementById('session-id').innerText = sessionId || 'No session ID provided';

  // Initialize Quill editor
  var quill = new Quill('#editor', {
      modules: {
          toolbar: '#toolbar'
      },
      theme: 'snow'
  });

  // Initialize Socket.IO client
  var socket = io();  // Connect to the server
  socket.emit('join-session', sessionId);

  // Handle text changes
  quill.on('text-change', function(delta, oldDelta, source) {
      if (source === 'user') {
          socket.emit('text-change', { sessionId: sessionId, change: delta });
      }
  });

  // Apply changes received from server
  socket.on('receive-change', function(delta) {
      quill.updateContents(delta, 'silent');
  });

  // Load initial document state
  socket.on('load-document', function(documentState) {
    quill.setContents(documentState, 'silent'); // Use 'silent' to prevent emitting a change event
});

  // NavBar Toggle Logic
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

  // Save options toggle
  document.getElementById('saveBtn').addEventListener('click', function() {
      var saveOptions = document.getElementById('saveOptions');
      saveOptions.style.display = (saveOptions.style.display === 'block') ? 'none' : 'block';
  });

  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
      if (!event.target.matches('#saveBtn')) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          for (var i = 0; i < dropdowns.length; i++) {
              var openDropdown = dropdowns[i];
              openDropdown.style.display = 'none';
          }
      }
  };
});
