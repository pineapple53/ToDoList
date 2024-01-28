document.addEventListener("DOMContentLoaded", function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const spans = document.querySelectorAll('span');
    const removeButton = document.getElementById('removeSelected');

    removeButton.addEventListener('click', function() {
        const checkedIndexes = [];
        checkboxes.forEach(function(checkbox, index) {
            if (checkbox.checked) {
                checkedIndexes.push(index);
            }
        });

        checkedIndexes.sort((a, b) => b - a); // Um von hinten nach vorne zu entfernen, um Indexänderungen zu vermeiden
        checkedIndexes.forEach(function(index) {
            spans[index].parentNode.remove();
        });
    });

    checkboxes.forEach(function(checkbox, index) {
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                spans[index].classList.add('strikethrough');
            } else {
                spans[index].classList.remove('strikethrough');
            }
        });
    });
});

