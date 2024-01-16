console.log("hello")

//variables
let age = 25
console.log(25)

const salary = 0
console.log(salary)

let sum = 0
sum = 5+3
console.log(sum)
const name = 'neema'
c``



<script>
function addEmployee() {

    var row1 = document.getElementById("myTemplate").innerHTML;
    var row2 = document.getElementById('myTemplate2').innerHTML;

    var table = document.getElementById('attendanceTable');
    var employeeRows = document.getElementById('employeeRows');
    // var newRow = document.createElement('tr');

    // for (var i = 0; i < table.rows[4].cells.length; i++) {
    //     var cell = document.createElement('td');
    //     newRow.appendChild(cell);
    // }

    // newRow.cells[0].textContent = employeeName;

    var newRow = employeeRows.insertRow(employeeRows.rows.length);
    newRow.innerHTML = row1;
    console.log(newRow)
        // var employeeField = document.getElementsByClassName("employeeName");
        var employeeField = newRow.querySelector(".employeeName")
        console.log(employeeField)
        employeeField.innerHTML = document.getElementById("employeeName").value; 
    var newRow2 = employeeRows.insertRow(employeeRows.rows.length);
    newRow2.innerHTML = row2;
    //employeeRows.append(employeeTemplate);
 // passing only inportant as parameter
 document.getElementById('employeeName').value = '';

 //array record
}



</script>