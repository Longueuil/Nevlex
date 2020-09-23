// THA-2/Payment Page
// Author: Ihor Stashchuk
'use strict'
var movieInfo = {};
var movieSummary = document.getElementById("deliverTo");
var paymentInfo = {};
var paymentSummary = document.getElementById("order");
var ccInfo = {};

function processMovieInfo() {
    
    movieInfo.name = document.getElementById("nameinput").value;
    movieInfo.movie = document.querySelector("select option:checked").innerText;
    movieInfo.seat = document.getElementById("seatinput").value;
    movieInfo.date = document.getElementById("dateinput").value;
    movieInfo.time = document.getElementById("timeinput").value;
    
    movieSummary.innerHTML += "<p><span>Name</span>: " + movieInfo.name + "</p>";
    movieSummary.innerHTML += "<p><span>Movie</span>: " + movieInfo.movie + "</p>";
    movieSummary.innerHTML += "<p><span>Seat</span>: " + movieInfo.seat + "</p>";
    movieSummary.innerHTML += "<p><span>Date</span>: " + movieInfo.date + "</p>";
    movieSummary.innerHTML += "<p><span>Time</span>: " + movieInfo.time + "</p>";
}

function processPaymentInfo() {

    let movie = document.getElementById("movieinput");
    let movieIndex = movie.selectedIndex;
    let stotal = movie.options[movieIndex].value;
    document.getElementById("stotalinput").value = stotal;
    const TAX_RATE = 0.15;
    let tax = stotal * TAX_RATE;
    document.getElementById("taxinput").value = tax.toFixed(2);
    let total = (parseFloat(stotal) + tax);
    document.getElementById("totalinput").value = total.toFixed(2);
    

    paymentSummary.innerHTML += "<p><span>Subtotal</span>: $" + stotal + "</p>";
    paymentSummary.innerHTML += "<p><span>Taxes</span>: $" + tax.toFixed(2) + "</p>";
    paymentSummary.innerHTML += "<p><span>Total</span>: $" + total.toFixed(2) + "</p>";
}

function selectCardType() {

    ccInfo.ccname = document.getElementById("ccnameinput").value;
    
    let cardNumValue = document.getElementById("ccNum").value;
    let visa = /^4[0-9]{12}(?:[0-9]{3})?$/;
    let mc = /^5[1-5][0-9]{14}$/;
    let discover = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
    let amex = /^3[47][0-9]{13}$/;

    if (visa.test(cardNumValue)) {
        document.getElementById("visa").checked = "checked";
        } else if (mc.test(cardNumValue)) {
        document.getElementById("mc").checked = "checked";
        } else if (discover.test(cardNumValue)) {
        document.getElementById("discover").checked = "checked";
        } else if (amex.test(cardNumValue)) {
        document.getElementById("amex").checked = "checked";
        }
}

function previewOrder() {
    if(validateForm()) {
        processMovieInfo();
        movieSummary = {};
        paymentSummary = {};
        document.getElementsByTagName("section")[0].style.display = "block";
        document.getElementById("deliverTo").style.display = "block";
        document.getElementById("order").style.display = "block";
    }
}

function confirmOrder() {
    alert("Your purchase is confirmed!");
}

/* open seat select in separate window */
function seatSelect() {
    var params = "menubar=no,location=no,resizable=yes,scrollbars=no,status=yes,width=848,height=600";
    var openWindow = window.open("seatSelect.html", "newWindow", params);
    openWindow.focus();

}
function resultCloseParent(data) {
    document.getElementById('seatinput').value = data;
}

/* ---------------EVENT LISTENERS--------------- */

function createEventListeners() {

    var btn = document.getElementById("previewBtn");
    if(btn.addEventListener) {
        btn.addEventListener("click", previewOrder, false);
    } else if (btn.attachEvent) {
        btn.attachEvent("onclick", previewOrder);
    }

    var cardNum = document.getElementById("ccNum");
    if (cardNum.addEventListener) {
    cardNum.addEventListener("change", selectCardType, false);
    } else if (cardNum.attachEvent) {
    cardNum.attachEvent("onchange", selectCardType);
    }

    var confirm = document.getElementById("confirmBtn");
    if(confirm.addEventListener) {
        confirmBtn.addEventListener("click", confirmOrder, false);
    } else if (confirmBtn.attachEvent) {
        confirm.attachEvent("onclick", confirmOrder);
    }

    var seatSelectBtn = document.getElementById("seatSelect");
    if(seatSelectBtn.addEventListener) {
        seatSelectBtn.addEventListener("click", seatSelect, false);
    } else if (seatSelectBtn.attachEvent) {
        seatSelectBtn.attachEvent("onclick", seatSelect);
    }
}

if (window.addEventListener) {
    window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", createEventListeners);
}

/* ---------------FORM VALIDATIONS--------------- */
function validateForm() {

    let selectedName = document.getElementById("nameinput");
    let nameInputError = document.getElementById("validatename");
    let selectedMovie = document.getElementById("movieinput");
    let movieSelectError = document.getElementById("validatemovie");
    let selectedSeat = document.getElementById("seatinput");
    let seatSelectError = document.getElementById("validateseat");
    let selectedDate = document.getElementById("dateinput");
    let dateSelectError = document.getElementById("validatedate");
    let selectedTime = document.getElementById("timeinput");
    let timeSelectError = document.getElementById("validatetime");
    let selectedCardHolder = document.getElementById("ccnameinput");
    let ccNameInputError = document.getElementById("validateccname");
    let selectedCardNumber = document.getElementById("ccNum");
    let ccNumInputError = document.getElementById("validateccNum");
    let selectedExpMonth = document.getElementById("expMo");
    let expMoSelectError = document.getElementById("validateexpMo");
    let selectedExpYear = document.getElementById("expYr");
    let expYrSelectError = document.getElementById("validateexpYr");
    let selectedCVV = document.getElementById("cvv");
    let cvvInputError = document.getElementById("validatecvv");
    

    // validate name
    if (selectedName.value == "" || !isNaN(selectedName)) {
        nameInputError.innerHTML = "<p><span>Fill in Name with non-numeric values</span></p>";
        selectedName.focus();
        return false;
    }
    else{
        nameInputError.innerHTML = "";
    }
    // validate movie
    if (selectedMovie.selectedIndex == 0) {
        movieSelectError.innerHTML = "<p><span>Select Movie</span></p>";
        selectedMovie.focus();
        return false;
    }
    else{
        movieSelectError.innerHTML = "";
    }

    // validate seat
    if (selectedSeat.value == "") {
        seatSelectError.innerHTML = "<p><span>Select Seat</span></p>";
        selectedSeat.focus();
        return false;
    }
    else{
        seatSelectError.innerHTML ="";
    }
    // validate date
    if (selectedDate.value == "") {
        dateSelectError.innerHTML = "<p><span>Select Date</span></p>";
        selectedDate.focus();
        return false;
    }
    else{
        dateSelectError.innerHTML ="";
    }
    // validate time
    if (selectedTime.value == "") {
        timeSelectError.innerHTML = "<p><span>Select Time</span></p>";
        selectedTime.focus();
        return false;
    }
    else{
        timeSelectError.innerHTML ="";
    }
    // validate card holder
    if (selectedCardHolder.value == "" || !isNaN(selectedCardHolder.value)) {
        ccNameInputError.innerHTML = "<p><span>Fill in Cardholder Name with non-numeric values</span></p>";
        selectedCardHolder.focus();
        return false;
    }
    else{
        ccNameInputError.innerHTML ="";
    }
    // validate card number
    if (selectedCardNumber.value == "") {
        ccNumInputError.innerHTML = "<p><span>Fill in Card Number</span></p>";
        selectedCardNumber.focus();
        return false;
    }
    else{
        ccNumInputError.innerHTML ="";
    }
    // validate expiration month
    if (selectedExpMonth.selectedIndex == 0) {
        expMoSelectError.innerHTML = "<p><span>Select Expiration Month</span></p>";
        selectedExpMonth.focus();
        return false;
    }
    else{
        expMoSelectError.innerHTML ="";
    }
    // validate expiration year
    if (selectedExpYear.selectedIndex == 0) {
        expYrSelectError.innerHTML = "<p><span>Select Expiration Year</span></p>";
        selectedExpYear.focus();
        return false;
    }
    else{
        expYrSelectError.innerHTML = "";
    }

    // validate CVV
    if (selectedCVV.value == "") {
        cvvInputError.innerHTML = "<p><span>Fill in CVV code</span></p>";
        selectedCVV.focus();
        return false;
    }
    else {
        cvvInputError.innerHTML = "";
        return true;
    }
    
} // end function validateForm
