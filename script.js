// console.log('connected');

// Deeclaring Variables
const form = document.getElementById('form');
const email = document.getElementById('email');
const username = document.getElementById('username');
const phoneNo = document.getElementById('phoneNo');


// form.addEventListener('onblur', (event) =>{
//     event.preventDefault();
//     validateForm();
// });

form.addEventListener('submit', (event) => {
    event.preventDefault();
    validateForm();
});

const sendData = (firstName, phoneVal, SuccessRate, count) => {
    if (SuccessRate === count) {
        localStorage.setItem('useName', firstName);
        localStorage.setItem('userNo', phoneVal);
        let generateOtp = Math.floor(999 + Math.random()*9000);
        localStorage.setItem('OTP', generateOtp);
        console.log(generateOtp);
        location.href = `thankyou.html`;
    }
}

// success function 
const pureSuccess = (usernameval, phoneVal) => {
    let formCon = document.getElementsByClassName('formControl');
    var count = formCon.length - 1;
    for (let i = 0; i < formCon.length; i++) {
        if (formCon[i].className === 'formControl success') {
            var SuccessRate = 0 + i;
            sendData(usernameval, phoneVal, SuccessRate, count)
        } else {
            return false;
        }
    }
}

// Email Validation

const isEmail = (emailVal) => {
    let atSymbol = emailVal.indexOf('@');
    if (atSymbol < 1) {
        return false;
    }

    let dot = emailVal.lastIndexOf('.');
    if (dot <= atSymbol + 2) {
        return false;
    } else if (dot === emailVal.length - 1) {
        return false;
    } else {
        return true;
    }
}

// Validate Function

const validateForm = () => {
    const emailVal = email.value;
    const usernameval = username.value;
    const phoneVal = phoneNo.value;

    // Name Validation

    let arrName = usernameval.split(' ');
    let letters = /^[a-zA-Z][a-zA-Z\s]+$/
    let firstName = arrName[0];
    let lastName = arrName[arrName.length - 1];

    if (!usernameval.match(letters)) {
        setErrorMsg(username, 'Alphabets and spaces only');
    } else if (firstName.length <= 3) {
        setErrorMsg(username, 'First Name should have more than 4 characters');
    } else if (arrName.length == 1) {
        setErrorMsg(username, 'Please Enter Last Name');
    } else if (lastName.length <= 3) {
        setErrorMsg(username, 'Last Name should have more than 4 characters');
    } else {
        setSuccessMsg(username);
    }



    // Validate Email 
    if (emailVal === "") {
        setErrorMsg(email, 'Email Cannot be blank');
    } else if (!isEmail(emailVal)) {
        setErrorMsg(email, 'Not a valid Email');
    } else {
        setSuccessMsg(email)
    }

    // Mobile Validation
    if (phoneVal === "") {
        setErrorMsg(phoneNo, 'Phone Number cannot be blank');
    } else if (phoneVal.length < 10) {
        setErrorMsg(phoneNo, 'Invalid Number');
    } else {
        setSuccessMsg(phoneNo);
    }

    // Passing value to next page 
    pureSuccess(firstName, phoneVal);
}

function setErrorMsg(input, errorMsg) {
    const formControl = input.parentElement;
    const errorEle = formControl.querySelector('p');
    formControl.className = 'formControl error';
    errorEle.innerText = errorMsg;
}

function setSuccessMsg(input) {
    const formControl = input.parentElement;
    formControl.className = 'formControl success';
}

// phone format
function phoneFormat(numb) {
    numb = numb.replace(/\D/g, '');
    numb = numb.substring(0, 10);

    let size = numb.length;
    if (size == 0) {
        numb = numb;
    } else if (size < 4) {
        numb = '(' + numb;
    } else if (size < 7) {
        numb = '(' + numb.substring(0, 3) + ') ' + numb.substring(3, 6);
    } else {
        numb = '(' + numb.substring(0, 3) + ') ' + numb.substring(3, 6) + ' - ' + numb.substring(6, 10);
    }
    return numb;
}

function network(number) {
    let firstSet = number.substring(1, 4);
    let sim = document.getElementById('sim');

    if (firstSet <= 620) {
        sim.innerText = 'Invalid Number';
    } else if (firstSet >= 621 & firstSet <= 799) {
        sim.innerText = 'JIO';
    } else if (firstSet >= 801 & firstSet <= 920) {
        sim.innerText = 'IDEA';
    } else if (firstSet >= 921 & firstSet <= 999) {
        sim.innerText = 'VODAFONE';
    }
}

function stateIdentifier(numbers) {
    let secondSet = numbers.substring(5, 9);
    let statename = document.getElementById('state');

    const states = ['Maharasthra', 'Delhi', 'Karnataka', 'Andaman and Nicobar (UT)', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'UttaraKhand', 'Bihar', 'chandigarh (UT)', 'Chhattisgarh', 'Dadra and Nagar Haveli (UT)', 'Daman and Diu (UT)', 'Goa', 'Sikkim', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkand', 'Manipur', 'Kerala', 'Lakshwadeep (UT)', 'Madhya Pradesh', 'Meghalaya', 'Mizoram', 'Nagaland', 'Pondicherry (UT)', 'Orissa', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Tripura', 'West Bengal', 'Uttar Pradesh'];

    let a = Math.ceil(secondSet / 27.78);
    statename.innerText = states[a-1];
}

document.getElementById('phoneNo').addEventListener('keyup', () => {
    let phoneNum = document.getElementById('phoneNo');
    phoneNum.value = phoneFormat(phoneNum.value);
    network(phoneNum.value);
    stateIdentifier(phoneNum.value);
});


function validateName(usernamevalue) {
    const username = document.getElementById('username');
    var usernamevalue = username.value;
    let arrName = usernamevalue.split(' ');
    let letters = /^[a-zA-Z][a-zA-Z\s]+$/
    let firstName = arrName[0];
    let lastName = arrName[arrName.length - 1];
    console.log('event called');

    if (!usernamevalue.match(letters)) {
        setErrorMsg(username, 'Alphabets and spaces only');
        console.log('Start1');
    } else if (firstName.length <= 3) {
        setErrorMsg(username, 'First Name should have more than 4 characters');
        console.log('Start2');
    } else if (arrName.length == 1) {
        setErrorMsg(username, 'Please Enter Last Name');
        console.log('Start3');
    } else if (lastName.length <= 3) {
        setErrorMsg(username, 'Last Name should have more than 4 characters');
        console.log('Start4');
    } else {
        setErrorMsg(username, '');
        setSuccessMsg(username);
        console.log('Start1');
    }

}

const isEmailVal = (emailValValid) => {
    var emailValValid = email.value;
    let atSymbol = emailValValid.indexOf('@');
    if (atSymbol < 1) {
        return false;
    }

    let dot = emailValValid.lastIndexOf('.');
    if (dot <= atSymbol + 2) {
        return false;
    } else if (dot === emailValValid.length - 1) {
        return false;
    } else {
        return true;
    }
}

function validateEmail(emailValValid) {
    console.log('email called');
    if (emailValValid === "") {
        setErrorMsg(email, 'Email Cannot be blank');
    } else if (!isEmailVal(emailValValid)) {
        setErrorMsg(email, 'Not a valid Email');
    } else {
        setErrorMsg(email, '');
        setSuccessMsg(email);
    }
}