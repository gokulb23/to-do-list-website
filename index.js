var checked = 0;
var counter = 1;
var popup = document.querySelector('.popup');

// for drop down menu, disabled atm
document.addEventListener('click', e => {
    const isDropdownButton = e.target.matches('[data-dropdown-button]');
    if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return;

    var currentDropdown;
    if (isDropdownButton) {
        currentDropdown = e.target.closest('[data-dropdown]');
        currentDropdown.classList.toggle('active');
    }

    document.querySelectorAll('[data-dropdown].active').forEach(dropdown => {
        if (dropdown === currentDropdown) return;
        dropdown.classList.remove('active');
    })
});

function createNewItem(element) {
    var currDiv = element.parentElement;
    // console.log(currDiv);
    var newDiv = document.createElement('div');
    newDiv.className = 'item-container';

    // create checkbox
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    addCheckBoxFunctionality(checkbox);
    newDiv.appendChild(checkbox);

    // create text field
    var newTextField = document.createElement('input');
    newTextField.type = 'text';
    newTextField.className = 'textField';
    newTextField.placeholder = 'Enter item';
    newDiv.appendChild(newTextField);
    createNewItemFunctionality(newTextField);
    addDelFunctionality(newTextField);
    addArrowKeysFunctionality(newTextField);

    // create remove button
    var newRemoveButton = document.createElement('button');
    newRemoveButton.className = 'remove-button';
    newDiv.appendChild(newRemoveButton);
    addRemoveFunctionality(newRemoveButton);

    currDiv.insertAdjacentElement('afterend', newDiv);
    newTextField.focus();
}

function createNewItemFunctionality(element) {
    // text field enter key functionality
    if (element.className === 'textField') {
        element.addEventListener('keydown', e=> {
            if (e.key !== 'Enter') return;
            e.preventDefault;
            if (counter >= 20) {
                console.log('limit reached');
                return;
            }
            createNewItem(element);
            counter++;
        });        
    }
    // add button click functionality
    else {
        element.addEventListener('click', e => {
            if (counter >= 20) {
                console.log('limit reached');
                return;
            }
            var itemContainers = 
                element.parentElement.parentElement.querySelectorAll("div.item-container");
            var lastTextField = 
                itemContainers[itemContainers.length - 1].querySelector(".textField");
            createNewItem(lastTextField);
            counter++;
            // localStorage.setItem('counter', counter);
        })
    }

}

function addCheckBoxFunctionality(checkbox) {
    checkbox.addEventListener('click', function(e) {
        var currTextField = checkbox.parentElement.children[1];
        if (checkbox.checked === false) {
            currTextField.disabled = false;
            currTextField.style.textDecoration = 'none';
            currTextField.style.opacity = '1';
            checked--;
            return;
        }
        currTextField.disabled = true;
        currTextField.style.opacity = '0.5';
        //if (currTextField.value === '') return;
        currTextField.style.textDecoration = 'line-through'; 
        checked++;
        // check if all check boxes are checked
        if (checked === counter) {
            console.log('All done');
            // implement popup message box + confetti
            popup.classList.add('active');  
        }
        // localStorage.setItem('checked', checked);
    });
}

function addDelFunctionality(textField) {
    textField.addEventListener('keydown', function(e) {
        if (e.key !== 'Delete') return;
        textField.parentElement.previousSibling.children[1].focus();
        textField.parentElement.remove();
        counter--;
        // localStorage.setItem('counter', counter);
    });   
}

function addRemoveFunctionality(removeButton) {
    removeButton.addEventListener('click', function(e) {
        // var elemInFocus = document.activeElement;
        // if (elemInFocus.className === 'textField') {

        // }
        removeButton.parentElement.previousSibling.children[1].focus();
        removeButton.parentElement.remove();
        counter--;
        // localStorage.setItem('counter', counter);
    });
}

function addArrowKeysFunctionality(textField) {
    textField.addEventListener('keydown', e => {
        if (e.key === 'ArrowUp') {
            if (textField.id === 'textField0') return;
            textField.parentElement.previousSibling.children[1].focus();
        }
        else if (e.key === 'ArrowDown') {
            if (textField.parentElement.nextSibling.className !== 'item-container') return;
            textField.parentElement.nextSibling.children[1].focus();
        }     
    })
}

const checkbox0 = document.getElementById('checkbox0');
addCheckBoxFunctionality(checkbox0);
const textField0 = document.getElementById('textField0');
createNewItemFunctionality(textField0);
addArrowKeysFunctionality(textField0);
const addButton0 = document.getElementById('addButton0');
createNewItemFunctionality(addButton0);

var closeBtn = document.querySelector('.closePopup');
closeBtn.onclick = function() {
    popup.classList.remove('active')
}

// var confettiSettings = { target: 'my-canvas' };
// var confetti = new ConfettiGenerator(confettiSettings);
// confetti.render();