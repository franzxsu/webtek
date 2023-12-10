function createInputFields() {
    const numberOfInputs = parseInt(document.getElementById('numberOfInputs').value);
    const segmentInputsContainer = document.getElementById('segmentInputsContainer');
  
    segmentInputsContainer.innerHTML = '';
  
    for (let i = 0; i < numberOfInputs; i++) {
      const inputGroup = document.createElement('div');
      inputGroup.classList.add('col-6', 'mb-3');
  
      const inputLabel = document.createElement('label');
      inputLabel.classList.add('form-label');
      inputLabel.textContent = `Segment ${i + 1}:`;
  
      const inputField = document.createElement('input');
      inputField.classList.add('form-control');
      inputField.setAttribute('placeholder', `Segment ${i + 1} info`);
      inputField.setAttribute('name', `segmentInfo_${i + 1}`);
  
      inputGroup.appendChild(inputLabel);
      inputGroup.appendChild(inputField);
      segmentInputsContainer.appendChild(inputGroup);
    }
  }
  
  document.getElementById('numberOfInputs').addEventListener('change', createInputFields);
  createInputFields();
  