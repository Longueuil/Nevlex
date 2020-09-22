// THA-2/Payment Page
// Author: Ihor Stashchuk

"use strict";

var movieInfo = new Object();
var movieSummary = document.getElementById("deliverTo");
var paymentInfo = new Object();
var paymentSummary = document.getElementById("order");
var ccInfo = new Object();

function processMovieInfo() {
    
    movieInfo.name = document.getElementById("nameinput").value;
    // movieInfo.movie = document.getElementById("movieinput").value;
    // movieInfo.seat = document.getElementById("seatinput").value;
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
    document.getElementById("stotalinput").value =
    stotal;
    // window.alert(stotal);
    // let stotal = parseFloat(document.getElementById('stotalinput').value);
    const TAX_RATE = 0.15;
    let tax = stotal * TAX_RATE;
    document.getElementById("taxinput").value = tax.toFixed(2);
    document.getElementById("totalinput").value = total.toFixed(2);

    paymentSummary.innerHTML += "<p><span>Subtotal</span>: $" + stotal + "</p>";
    paymentSummary.innerHTML += "<p><span>Taxes</span>: $" + tax + "</p>";
    paymentSummary.innerHTML += "<p><span>Total</span>: $" + total + "</p>";
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
    
    var tx = document.getElementById("taxinput");
    if(tx.addEventListener) {
        taxinput.addEventListener("click", processPaymentInfo, false);
    } else if (form.attachEvent) {
        tx.attachEvent("onclick", processPaymentInfo);
    }

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
