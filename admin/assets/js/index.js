function createInputFields() {
    const numberOfInputs = parseInt(document.getElementById('numberOfInputs').value);
    const segmentInputsContainer = document.getElementById('segmentInputsContainer');
    const currentInputs = segmentInputsContainer.children.length;
    document.getElementById('numberOfInputs').value = numberOfInputs;
    // Compare current number of inputs with the new value
    if (numberOfInputs > currentInputs) {
      for (let i = currentInputs; i < numberOfInputs; i++) {
        const inputGroup = document.createElement('div');
        inputGroup.classList.add('col-12', 'mb-3');
  
        const inputLabel = document.createElement('label');
        inputLabel.classList.add('form-label');
        inputLabel.textContent = `Segment ${i + 1}:`;
  
        const inputField = document.createElement('textarea');
        inputField.classList.add('form-control');
        inputField.setAttribute('placeholder', `Segment ${i + 1} info`);
        inputField.setAttribute('name', `segmentInfo_${i + 1}`);
        inputField.setAttribute('rows', '2');
  
        inputGroup.appendChild(inputLabel);
        inputGroup.appendChild(inputField);
        segmentInputsContainer.appendChild(inputGroup);
      }
    } else if (numberOfInputs < currentInputs) {
      while (segmentInputsContainer.children.length > numberOfInputs) {
        segmentInputsContainer.removeChild(segmentInputsContainer.lastChild);
      }
    }
  }
  
  document.getElementById('numberOfInputs').addEventListener('change', createInputFields);
  createInputFields();
  
const today = new Date().toISOString().split('T')[0];
document.getElementById('startDate').setAttribute('min', today);
document.getElementById('endDate').setAttribute('min', today);

document.getElementById('startDate').addEventListener('change', function() {
    document.getElementById('endDate').setAttribute('min', this.value);
});