// jQuery
// $(document).on('change', '.file-input', function() {
//     var filesCount = $(this)[0].files.length;
//     var textbox = $(this).prev();

//     if (filesCount === 1) {
//         var fileName = $(this).val().split('\\').pop();
//         textbox.text(fileName);
//     } else {
//         textbox.text(filesCount + ' files selected');
//     }
// });

// vanilla js
document.addEventListener('change', function (event) {
    if (event.target.classList.contains('file-input')) {
        var filesCount = event.target.files.length;
        var textbox = event.target.previousElementSibling;
  
        if (filesCount === 1) {
            var fileName = event.target.value.split('\\').pop();
            textbox.textContent = fileName;
        } else {
            textbox.textContent = filesCount + ' files selected';
        }
    }
});



