var selectedRow = null;

document.addEventListener('DOMContentLoaded', function () {
    loadRecordsFromLocalStorage();

    document.getElementById('recordForm').addEventListener('submit', function (event) {
        event.preventDefault();
        onFormSubmit();
    });

    var editLinks = document.querySelectorAll('.edit-link');
    editLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            onEdit(link);
        });
    });

    var deleteLinks = document.querySelectorAll('.delete-link');
    deleteLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            onDelete(link);
        });
    });
});

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();

        updateLocalStorage();

        loadRecordsFromLocalStorage();
    }
}

function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["contactNumber"] = document.getElementById("contactNumber").value;
    formData["address"] = document.getElementById("address").value;
    formData["date"] = document.getElementById("date").value;

    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data["fullName"];
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = data["contactNumber"];
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = data["address"];
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = data["date"];
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<a href="#" class="edit-link">Edit</a> 
                       <a href="#" class="delete-link">Delete</a>`;
    
    cell5.querySelector('.edit-link').addEventListener('click', function () {
        onEdit(this);
    });
    cell5.querySelector('.delete-link').addEventListener('click', function () {
        onDelete(this);
    });

    updateLocalStorage();
}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("contactNumber").value = "";
    document.getElementById("address").value = "";
    document.getElementById("date").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("contactNumber").value = selectedRow.cells[1].innerHTML;
    document.getElementById("address").value = selectedRow.cells[2].innerHTML;
    document.getElementById("date").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.contactNumber;
    selectedRow.cells[2].innerHTML = formData.address;
    selectedRow.cells[3].innerHTML = formData.date;

    updateLocalStorage();
}

function onDelete(td) {
    if (confirm("Are you sure to delete this record?")) {
        var row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        row.remove();
        resetForm();

        updateLocalStorage();
    }
}

function validate() {
    var isValid = true;
    var fullName = document.getElementById("fullName").value;
    var nameValidationError = document.getElementById("fullNameValidationError");

    if (fullName.trim() === "") {
        isValid = false;
        nameValidationError.classList.remove("hide");
        nameValidationError.innerText = "Please enter a valid name.";
    } else {
        nameValidationError.classList.add("hide");
    }

    return isValid;
}

function updateLocalStorage() {
    var records = Array.from(document.getElementById("employeeList").getElementsByTagName('tbody')[ 0].rows).map(row => {
        return {
            fullName: row.cells[0].innerHTML,
            contactNumber: row.cells[1].innerHTML,
            address: row.cells[2].innerHTML,
            date: row.cells[3].innerHTML
        };
    });

    localStorage.setItem('records', JSON.stringify(records));

    console.log('Data stored in Local Storage:', JSON.parse(localStorage.getItem('records')));
}


function loadRecordsFromLocalStorage() {
    var storedRecords = JSON.parse(localStorage.getItem('records')) || [];
    
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    table.innerHTML = '';

    storedRecords.forEach(function (record) {
        var newRow = table.insertRow(table.length);
        var cell1 = newRow.insertCell(0);
        cell1.innerHTML = record.fullName;
        var cell2 = newRow.insertCell(1);
        cell2.innerHTML = record.contactNumber;
        var cell3 = newRow.insertCell(2);
        cell3.innerHTML = record.address;
        var cell4 = newRow.insertCell(3);
        cell4.innerHTML = record.date;
        var cell5 = newRow.insertCell(4);
        cell5.innerHTML = `<a href="#" class="edit-link">Edit</a> 
                           <a href="#" class="delete-link">Delete</a>`;

        cell5.querySelector('.edit-link').addEventListener('click', function () {
            onEdit(this);
        });
        cell5.querySelector('.delete-link').addEventListener('click', function () {
            onDelete(this);
        });
    });
}
