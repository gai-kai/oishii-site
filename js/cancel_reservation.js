const CUSTOMER="oishii"
const BASE_URL = "https://api.gaikai.xyz/"+CUSTOMER;

window.onload = function() {
    cancelReservation();
    // var getInput = prompt("Hey type something here: ");


  }
  function cancelReservation(){
    // loading(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    const uuid = urlParams.get('uuid');

    let url = BASE_URL + "/api/ReservationService/noAuth/cancel/" +email+"/"+uuid;
    console.log(url);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");


    xhr.onreadystatechange = function () {

      loading(false);
    };
    xhr.send();


  }

  function loading(boolean){
    if(!boolean){
      document.getElementById("wait").style.display = 'none'
      document.getElementById("success").style.display = 'block';
    }else{
      document.getElementById("wait").style.display = 'block'
      document.getElementById("success").style.display = 'none';
    }

  }
