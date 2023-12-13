$(document).on('change', '.file-input', function() {
        

    var filesCount = $(this)[0].files.length;
    
    var textbox = $(this).prev();
  
    if (filesCount === 1) {
      var fileName = $(this).val().split('\\').pop();
      textbox.text(fileName);
    } else {
      textbox.text(filesCount + ' files selected');
    }
  });

// Not yet implemented and in the wrong file
// or just rename the file
function changeProfilePicture() {
  const input = document.getElementById('profilePicture');
  const file = input.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const imageData = e.target.result;
      fetch('/updateProfilePicture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Profile picture updated:', data);
      })
      .catch(error => console.error('Error updating profile picture:', error));
    };

    reader.readAsDataURL(file);
  }
}