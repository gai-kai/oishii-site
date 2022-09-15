
class Reservation {
    constructor(email,reservationDate, numberOfPeople, numberOfKids,  timestamp, phoneNumber, commentFromGuestUser, firstName, lastName,
                isBirthday, isRomanticDate, isWindowSeat) {
        this.id = 0;
        this.guestUserID = email;
        this.reservationDate = reservationDate;
        this.numberOfPeople = numberOfPeople;
        this.numberOfKids = numberOfKids;
        this.haveArrived = false
        this.timestamp = timestamp;
        this.phoneNumber = phoneNumber;
        this.commentFromGuestUser = commentFromGuestUser;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isBirthday = isBirthday;
        this.isRomanticDate = isRomanticDate;
        this.isWindowSeat = isWindowSeat;
    }


}

function getReservation () {

}