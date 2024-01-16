function getDate() {
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth() + 1;
    var currentDate = new Date().getDate()
    console.log(currentYear)
    return `${currentYear} / ${currentMonth} / ${currentDate}`;
}

const todayDate = getDate()

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString();
    const minutes = now.getMinutes().toString();
    return hours + ':' + minutes;
}

let myDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

for(let i = 0 ; i<myDays.length ; i++) {
    const dateTr = document.querySelector('.date-time')
    const dateTh = document.createElement('th')
    dateTh.colSpan = '2'
    if (i === new Date().getDay() - 1) { dateTh.innerHTML = todayDate;

    } else {
        dateTh.innerHTML = '';
    }
    dateTr.appendChild(dateTh)
}

for(let i=0; i<myDays.length ; i++) {
    const myTr = document.querySelector('.day')
    const myTh = document.createElement('th')
    myTh.colSpan = '2'
    myTh.innerHTML = myDays[i]
    myTr.appendChild(myTh)
}

function displayEmployeeRecords() {
    let employeeArray = JSON.parse(localStorage.getItem('employee_data')) || []
    return employeeArray
}

function addEmployee() {
    const employeeNameInput = document.getElementById("employeeName")
    const employeeIdInput = document.getElementById("employee_id")

    const employeeName = employeeNameInput.value.trim()
    const employeeId = employeeIdInput.value.trim()

    if (employeeName === "") {
        alert("Please enter the employee name.");
        return;
    }

    const employeeData = displayEmployeeRecords()

    employeeData.push({
        'id': employeeId,
        'name': employeeName
        
    })

    localStorage.setItem('employee_data', JSON.stringify(employeeData))
//
    addRows(employeeName)

    employeeNameInput.value = ''
    employeeIdInput.value = ''

    displayEmployeeRecords()

    alert('New record added')
}

function addRows(employeeName) {
    const tbody = document.querySelector('#employeeRows')
    const row = document.createElement('tr')

    const nameCell = document.createElement('th');
    nameCell.textContent = employeeName;
    row.appendChild(nameCell);

    for(let i = 0 ; i<myDays.length ; i++) {
        const inTh = document.createElement('th')
        const outTh = document.createElement('th')
        const inButton = document.createElement('button')
        const outButton = document.createElement('button')
        if (i === new Date().getDay() - 1) { 
            inButton.textContent = 'In'
            outButton.textContent = 'Out'

            inButton.addEventListener('click', function() {
                inTh.textContent = getCurrentTime()
              

            })

            outButton.addEventListener('click', function() {
                outTh.textContent = getCurrentTime()

            })

            inTh.appendChild(inButton)
            outTh.appendChild(outButton)
        } else {
            inTh.innerHTML = '';
            outTh.innerHTML = '';
        }
        row.appendChild(inTh);
        row.appendChild(outTh);
    }

    tbody.appendChild(row)
}

const records = displayEmployeeRecords()
records.map((item) => {
    addRows(item.name) 
})