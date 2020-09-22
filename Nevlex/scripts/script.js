// THA-2/Payment Page
// Author: Ihor Stashchuk

var movieInfo = new Object();
var movieSummary = document.getElementById("deliverTo");
var paymentInfo = new Object();
var paymentSummary = document.getElementById("order");
var ccInfo = new Object();

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
    processMovieInfo();
    movieSummary = {};
    paymentSummary = {};
    document.getElementsByTagName("section")[0].style.display = "block"; 
    document.getElementById("deliverTo").style.display = "block";
    document.getElementById("order").style.display = "block";
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

function createEventListeners() {

    var btn = document.getElementById("previewBtn");
    if(btn.addEventListener) {
        previewBtn.addEventListener("click", previewOrder, false);
    } else if (form.attachEvent) {
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

function validateForm() {

    let selectedName = document.getElementById('nameinput');
    let selectedMovie = document.getElementById('movieinput');
    let selectedSeat = document.getElementById('seatinput');
    let selectedDate = document.getElementById('dateinput');
    let selectedTime = document.getElementById('timeinput');
    let selectedCardHolder = document.getElementById('ccnameinput');
    let selectedCardNumber = document.getElementById('ccNum');
    let selectedExpMonth = document.getElementById('expMo');
    let selectedExpYear = document.getElementById('expYr');
    let selectedCVV = document.getElementById('cvv');

    // validate name
    if (selectedName.value == "" || !isNaN(selectedName)) {
        window.alert('Fill in Name with non-numeric values');
        selectedName.focus();
        return false;
    }
    else
    // validate movie
    if (selectedMovie.selectedIndex == 0) {
        window.alert('Select Movie');
        selectedMovie.focus();
        return false;
    }
    else 
    // validate seat
    if (selectedSeat.value === "") {
        window.alert("Select Seat");
        selectedSeat.focus();
        return false;
    }
    else
    // validate date
    if (selectedDate.value == "") {
        window.alert("Select Date");
        selectedDate.focus();
        return false;
    }
    else
    // validate time
    if (selectedTime.value == "") {
        window.alert("Please select Time");
        selectedTime.focus();
        return false;
    }
    else
    // validate card holder
    if (selectedCardHolder.value == "" || !isNaN(selectedCardHolder.value)) {
        window.alert("Fill in Cardholder Name with non-numeric values");
        selectedCardHolder.focus();
        return false;
    }
    else
    // validate card number
    if (selectedCardNumber.value == "") {
        window.alert("Fill in Card Number");
        selectedCardNumber.focus();
        return false;
    }
    else
    // validate expiration month
    if (selectedExpMonth.selectedIndex == 0) {
        window.alert("Please select Expiration Month");
        selectedExpMonth.focus();
        return false;
    }
    else
    // validate expiration year
    if (selectedExpYear.selectedIndex == 0) {
        window.alert("Please select Expiration Year");
        selectedExpYear.focus();
        return false;
    }
    else
    // validate CVV
    if (selectedCVV.value == "") {
        window.alert("Fill in CVV code");
        selectedCVV.focus();
        return false;
    }
    else {
        return true;
    }

    // let fields = [
    // document.getElementById('nameinput'),
    // document.getElementById('movieinput'),
    // document.getElementById('seatinput'),
    // document.getElementById('dateinput'),
    // document.getElementById('timeinput'),
    // document.getElementById('ccnameinput'),
    // document.getElementById('ccNum'),
    // document.getElementById('expMo'),
    // document.getElementById('expYr'),
    // document.getElementById('cvv'),
    // ]
    
    // for (let i = 0; i < 10; i++) {
    //     if (fields[i] == "" || fields[i] == 0) {
    //         window.alert("Please fill in missing information");
    //         fields[i].focus();
    //     }
    // }
    
} // end function validateForm