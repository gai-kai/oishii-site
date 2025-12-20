var defaultDate
const CUSTOMER="oishii"
const BASE_URL = "https://apiv2.gaikai.xyz/"+CUSTOMER;


const weekDayOpenMonday = [
    [17.00, 22.30]
]
let weekDayOpenTuesday = [
    [17.00, 22.30]
]
const weekDayOpenWednesday = [
    [17.00, 22.30]
]
const weekDayOpenThursday = [
    [17.00, 22.30]
]
const weekDayOpenFriday = [
    [12.00, 14.30],
    [17.30, 22.30]
]
const weekDayOpenSaturday = [
    [12.00, 22.30]
]
const weekDayOpenSunday = [
    [12.00, 22.30]
]

let weekDayOpenObjects = [
    weekDayOpenSunday,
    weekDayOpenMonday,
    weekDayOpenTuesday,
    weekDayOpenWednesday,
    weekDayOpenThursday,
    weekDayOpenFriday,
    weekDayOpenSaturday,
]

window.addEventListener('load', () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    now.setMonth(now.getMonth())
    let today = now.toISOString().slice(0,16)


    document.getElementById('dateTimeReservation').value = today
    defaultDate = today;
    loadDefaultValuesReservation()
});




function checkIfStopped(){
    let url = BASE_URL+"/api/ReservationService/noAuth/stoppedByAdmin";
    console.log(url);
   /* let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onreadystatechange = function () {
        console.log(xhr.responseText)
        if(xhr.responseText==="true"){
            console.log("did it")
            document.getElementById("failure").style.display="block";
            document.getElementById("reservationForm").style.display = 'none'
        }
    }

*/

document.getElementById("failure").style.display="block";
            document.getElementById("reservationForm").style.display = 'none'

}

function loadDefaultValuesReservation () {
    document.getElementById("numberOfKids").value = "0";
}
function wantNewsletter(){
    let url = BASE_URL+"/api/GuestUserService/noAuth/createUser/"+document.getElementById("newsletterInput").value;
    console.log(url);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.send();
    xhr.onreadystatechange = function () {
        console.log(xhr.responseText)
        document.getElementById("newsletterConfirmation").style.display="block";
        document.getElementById("newsletter").style.display = 'none'

    }


}

function displayInvalidTime() {
    document.getElementById("invalidTimeSign").style.display = "block"
    document.getElementById("agbCheck").checked = false
}

function checkTimeInput(){
    'use strict'
    let dateTimeElement = document.getElementById("dateTimeReservation")
    let dateTimeValue = new Date(dateTimeElement.value)
    let defaultDateTimeValue = new Date(defaultDate)
    if(dateTimeValue.getTime() === defaultDateTimeValue.getTime()) {
        displayInvalidTime()
        return false
    }
    let month = dateTimeValue.getMonth() +1
    if(month < 10) {
        month = "0" + month
    }

    let desiredDay = dateTimeValue.getDay();
    let desiredTime = dateTimeValue.getHours() + "." + dateTimeValue.getMinutes();


    if(dateTimeValue.getDate() === 31 && dateTimeValue.getMonth() === 11)
        desiredDay = 1;

    if(dateTimeValue.getDate() === 1 && dateTimeValue.getMonth() === 0)
        desiredDay = 1;

    if(isWeekdayToBook(desiredDay, desiredTime)) {
        document.getElementById("invalidTimeSign").style.display = "none"
        document.getElementById("invalidHoliday").style.display = "none"
        return true
    }
    else{
        document.getElementById("invalidHoliday").style.display = "none"
        displayInvalidTime()
        return false
    }


}

function isValentine (dateTimeForReservation) {
    var date = dateTimeForReservation.getMonth()
    var whops = dateTimeForReservation.getDate()


    if(dateTimeForReservation.getMonth() === 1 && dateTimeForReservation.getDate() >= 14) {
        return true;
    }


    return false;

}



function isWeekdayToBook(weekDay, desiredTime){
    let weekDayOpenHour = weekDayOpenObjects[weekDay];
    for( let i = 0; i < weekDayOpenHour.length; i++){
        let startDate = weekDayOpenHour[i][0];
        let endDate = weekDayOpenHour[i][1];
        if(desiredTime >= startDate && desiredTime <= endDate)
            return true;
    }
    return false;
}

function displayValentine(){
    document.getElementById("invalidHoliday").style.display = "block"
    document.getElementById("agbCheck").checked = false
}



function makeReservation()
{
    class Reservation {
        constructor() {
            this.numberOfPeople = 0;
            this.numberOfKids = 0;
            this.haveArrived = false;
            this.timestamp = null;
            this.reservationDate = null;
            this.phoneNumber = "";
            this.firstName = "";
            this.lastName = "";
            this.uuid = "";
            this.guestUserID = "";
            this.commentFromGuestUser = "";
            this.wantsNewsletter = false;
            this.wantsCouponCampaign = false;
            this.reservationStatus = "ACCEPTED";
            this.agbaccepted = false;
            this.birthday = false;
            this.romanticDate = false;
            this.windowSeat = false;
            this.arrived = false;
        }

        setEmail(email) { this.guestUserID = email; return this; }
        setReservationDate(date) { this.reservationDate = date; return this; }
        setNumberOfPeople(num) { this.numberOfPeople = num; return this; }
        setNumberOfKids(num) { this.numberOfKids = num; return this; }
        setPhoneNumber(phone) { this.phoneNumber = phone; return this; }
        setFirstName(name) { this.firstName = name; return this; }
        setLastName(name) { this.lastName = name; return this; }
        setComment(comment) { this.commentFromGuestUser = comment; return this; }
        setNewsletter(wants) { this.wantsNewsletter = wants; return this; }
        setCouponCampaign(wants) { this.wantsCouponCampaign = wants; return this; }
        setAgbAccepted(accepted) { this.agbaccepted = accepted; return this; }
        setBirthday(isBirthday) { this.birthday = isBirthday; return this; }
        setRomanticDate(isRomantic) { this.romanticDate = isRomantic; return this; }
        setWindowSeat(isWindow) { this.windowSeat = isWindow; return this; }
    }
    if(checkIfInputFilled()) {
        loading(true);
        let url = BASE_URL + "/api/v2/noauth/reservations";
        console.log(url);
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url);

        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.responseText);
                var reservation = JSON.parse(xhr.responseText);
                console.log(reservation)
                if (reservation.id !== -1) {
                    loading(false);
                    makeSuccessVisible()

                }
            }
        };

        const guestUserID = document.getElementById("eMail").value;
        let reservationDate = document.getElementById("dateTimeReservation").value;
        let numberOfPeople = document.getElementById("numberOfPeople").value;
        let numberOfKids = document.getElementById("numberOfKids").value;
        let phoneNumber = document.getElementById("phoneNumber").value;
        let commentFromGuestUser = document.getElementById("commentFromUser").value;
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let isBirthday = false;
        let isRomanticDate = false;
        let isWindowSeat = false;
        let wantsCouponCampaign = document.getElementById("coupons").checked;
        const reservation = new Reservation()
            .setEmail(guestUserID)
            .setReservationDate(reservationDate)
            .setNumberOfPeople(numberOfPeople)
            .setNumberOfKids(numberOfKids)
            .setPhoneNumber(phoneNumber)
            .setComment(commentFromGuestUser)
            .setFirstName(firstName)
            .setLastName(lastName)
            .setBirthday(isBirthday)
            .setRomanticDate(isRomanticDate)
            .setWindowSeat(isWindowSeat)
            .setCouponCampaign(wantsCouponCampaign)
            .setNewsletter(false);
        let reservationJSON = JSON.stringify(reservation);
        xhr.send(reservationJSON);
    }


}

function loading(boolean){
    if(boolean){
        document.getElementById("loading").style.display = 'block'
        document.getElementById("reservationButton").style.display = 'none';
    }else{
        document.getElementById("loading").style.display = 'none'
    }

}


function makeReservationVisible() {
    var reservationButton = document.getElementById("reservationButton");

    if (checkIfInputFilled()) {
        reservationButton.style.display = 'block';
        reservationButton.style.marginTop = '4%'
        reservationButton.classList.add('btn_1','mx-auto');
    }else {
        reservationButton.style.display = 'none';
    }

}
function setFocusToSuccessBox(){
    window.scrollTo({ top: document.getElementById("reservation").offsetTop, behavior: 'smooth' });
}
function makeSuccessVisible(){
    document.getElementById("reservationForm").style.display = 'none'
    document.getElementById("reservationComplete").style.display = 'block'
    document.getElementById("success").style.display = 'block';
    setFocusToSuccessBox();
}

function resetInvalidText(){
    document.getElementById("invalidInformation").style.display = 'none'
    document.getElementById("invalidTimeSign").style.display = 'none'
}

function checkIfInputFilled(){
    resetInvalidText()
    let numberOfFilledInputBox = 0;
    if(document.getElementById("eMail").value !== "")
        numberOfFilledInputBox++;
    if(document.getElementById("numberOfPeople").value !== "")
        numberOfFilledInputBox++;
    if(document.getElementById("numberOfKids").value !== "")
        numberOfFilledInputBox++;
    if(document.getElementById("phoneNumber").value !== "")
        numberOfFilledInputBox++;

    let timeCorrect = checkTimeInput()
    if(!timeCorrect){
        return false;
    }
    let isReservationValid = numberOfFilledInputBox >= 4 && document.getElementById("agbCheck").checked && timeCorrect
    if(!isReservationValid){
        showWarnText()
    }
    return isReservationValid

}

