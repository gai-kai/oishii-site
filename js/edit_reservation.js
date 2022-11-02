/*

Edit Reservation
*/
const BASE_URL = "http://localhost:8888"
/*const weekDayOpenHours = [
    ["12:30", "21:30"],
    ["16:30", "21:30"],
    ["16:30", "21:30"],
    ["16:30", "21:30"],
    ["16:30", "21:30"],
    ["12:00", "21:30"],
    ["12:00", "21:30"],
];*/

const weekDayOpenMonday = [
    [16.30, 22.30]
]
const weekDayOpenTuesday = [
    [16.30, 22.30]
]
const weekDayOpenWednesday = [
    [16.30, 22.30]
]
const weekDayOpenThursday = [
    [16.30, 22.30]
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

const weekDayOpenObjects = [
    weekDayOpenSunday,
    weekDayOpenMonday,
    weekDayOpenTuesday,
    weekDayOpenWednesday,
    weekDayOpenThursday,
    weekDayOpenFriday,
    weekDayOpenSaturday,
]
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const email = urlParams.get('email');
const uuid = urlParams.get('uuid');
class EditReservation {
    constructor(uuid,email, lastName, phoneNumber, reservationDate, numberOfPeople, numberOfKids, commentFromGuestUser, birthday, romanticDate,windowSeat) {
        this.uuid=uuid
        this.reservationDate = reservationDate;
        this.numberOfPeople = numberOfPeople;
        this.numberOfKids = numberOfKids;
        this.commentFromGuestUser = commentFromGuestUser;
        this.phoneNumber = phoneNumber;
        this.email = email
        this.lastName = lastName;
        this.birthday = birthday;
        this.romanticDate = romanticDate;
        this.windowSeat = windowSeat;
    }
}
window.onload = function() {
    checkIfAuthorized();
    // var getInput = prompt("Hey type something here: ");


}
function setFocusToSuccessBox(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function checkIfAuthorized(){
    editingSuccessfull(true);
    //console.log("go!!!!!!!");
    var reservation="";


    let url = BASE_URL + "/api/ReservationService/noAuth/" +email+"/"+uuid;
    console.log(url);
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Access-Control-Allow-Origin","*");


    xhr.onreadystatechange = function () {

        console.log(xhr.responseText);
        var reservation = JSON.parse(xhr.responseText);
        localStorage.setItem("reservation",reservation)
        console.log("Reservation*:")
        console.log(reservation.email)
        //document.getElementById("reservationDate").value = reservation.reservationDate.split(".")[0];
        console.log("value");
        console.log(document.getElementById("reservationDate").value);
        console.log("dto:");
        console.log(reservation.reservationDate);
        document.getElementById("uuid").value =reservation.uuid;
        document.getElementById("email").value =reservation.email;
        document.getElementById("lastName").value =reservation.lastName;
        document.getElementById("phoneNumber").value =reservation.phoneNumber;
        document.getElementById("numberOfKids").value =reservation.numberOfKids;
        document.getElementById("numberOfPeople").value = reservation.numberOfPeople;
        document.getElementById("commentFromGuestUser").value = reservation.commentFromGuestUser;
        document.getElementById("birthday").checked = reservation.birthday;
        document.getElementById("romanticDate").checked = reservation.romanticDate;
        document.getElementById("windowSeat").checked = reservation.windowSeat;

       


    };
    xhr.send();
    console.log(localStorage.getItem("reservation"));
    editingSuccessfull(false);

}

function editReservation(){
    editingSuccessfull(true);
    let url = BASE_URL + "/api/ReservationService/noAuth/edit"
    console.log(url);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {

        console.log(xhr.responseText);
        var success = xhr.responseText;

        if (xhr.responseText=="true") {
            editingSuccessfull(true);
            setFocusToSuccessBox();
            //editingSuccessfull(true);
        }else{
            editingSuccessfull(false);
          //  editingSuccessfull(false);
        }

    };


    let reservationDate = document.getElementById("reservationDate").value;
    let numberOfPeople = document.getElementById("numberOfPeople").value;
    let numberOfKids = document.getElementById("numberOfKids").value;
    let commentFromGuestUser = document.getElementById("commentFromGuestUser").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let lastName = document.getElementById("lastName").value;
    let birthday = document.getElementById("birthday").checked;
    let romanticDate = document.getElementById("romanticDate").checked;
    let windowSeat = document.getElementById("windowSeat").checked;
    let email = document.getElementById("email").value;

    let reservation = new EditReservation(uuid, email, lastName, phoneNumber, reservationDate, numberOfPeople, numberOfKids,
        commentFromGuestUser,birthday,romanticDate,windowSeat);
    let reservationJSON = JSON.stringify(reservation);
    console.log(reservationJSON);
    xhr.send(reservationJSON);
}
var form = document.getElementById("edit_res_form");

function handleForm(event) { event.preventDefault(); }
 
form.addEventListener('submit', handleForm);

function editingSuccessfull(boolean){
    if(!boolean){
        document.getElementById("success").style.display = 'none'
        document.getElementById("editReservationBody").style.display = 'block';
    }else{
        document.getElementById("success").style.display = 'block'
        document.getElementById("editReservationBody").style.display = 'none';
    }


}