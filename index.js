function createEmployeeRecord(array0) {
    return {
        firstName: array0[0],
        familyName: array0[1],
        title: array0[2],
        payPerHour: array0[3],
        timeInEvents: new Array(),
        timeOutEvents: new Array()
    }
}

function createEmployeeRecords(array1) {
    let array2 = new Array();
    for (let element0 of array1) {
        array2.push(createEmployeeRecord(element0));
    }
    return array2
}

function createTimeInEvent(emplyeRec0, string0) {
    const date = string0.slice(0, 10);
    const time = parseInt(string0.slice(11, 15), 10);
    const newObj = {
        type: "TimeIn",
        hour: time,
        date: date,
    }
    emplyeRec0.timeInEvents.push(newObj);
    return emplyeRec0;
}

function createTimeOutEvent(emplyeRec0, string0) {
    const date = string0.slice(0, 10);
    const time = parseInt(string0.slice(11, 15), 10);
    const newObj = {
        type: "TimeOut",
        hour: time,
        date: date,
    }
    emplyeRec0.timeOutEvents.push(newObj);
    return emplyeRec0;
}

function hoursWorkedOnDate(emplyeRec1, string1) {
    const newArray0 = new Array();
    const findTime = (target0) => {
        for (let element2 of target0) {
            const newArray1 = Object.values(element2);
            if (newArray1[2] === string1) {
                return newArray1[1];
            }
        }
    }
    newArray0.push(findTime(emplyeRec1.timeInEvents), findTime(emplyeRec1.timeOutEvents))
    const hoursWorked = (array0) => {
        return array0[1] - array0[0];
    }
    return Math.floor(hoursWorked(newArray0) / 100);
}

function wagesEarnedOnDate(emplyeRec2, string2) {
    return hoursWorkedOnDate(emplyeRec2, string2) * emplyeRec2.payPerHour;
}

function allWagesFor(emplyeRec3) {
    const target1 = emplyeRec3.timeInEvents;
    const newArray2 = new Array()
    for (let element0 of target1) {
        const a = element0.date;
        newArray2.push(wagesEarnedOnDate(emplyeRec3, a));
    }
    return newArray2.reduce((accumulator, currentvalue) => accumulator + currentvalue, 0);
}

function calculatePayroll(array2){
    let newArray3 = new Array ();
    for (let element3 of array2) {
        const target2 = element3.timeInEvents;
        for (let element4 of target2) {
            newArray3.push(wagesEarnedOnDate(element3, element4.date));
        }
    }
    return  newArray3.reduce((accumulator,currentvalue) => accumulator + currentvalue, 0);
}

const a = [["Julius", "Caesar", "General", 1000],["Rafiki", "", "Aide", 10]];
const b = createEmployeeRecords(a);

createTimeInEvent(b[0], "0044-03-15 0900");
createTimeOutEvent(b[0], "0044-03-15 1100");
createTimeInEvent(b[0], "0044-03-16 0800");
createTimeOutEvent(b[0], "0044-03-16 1700");
createTimeInEvent(b[1], "0044-03-15 0700");
createTimeOutEvent(b[1], "0044-03-15 1700");
createTimeInEvent(b[1], "0044-03-16 0600");
createTimeOutEvent(b[1], "0044-03-16 1800");
console.log(calculatePayroll(b));
