
var company;
// global variables
var userCash = 20000.00;
// event = 1 Boom , 2 - ressession, 3 - crash
var stocksEvent = 0;
var turns = 0;
var stocksEventTurns = 0;

function randomStocksEvent() {

    stocksEventTurns -= 1;

    if (stocksEventTurns <= 0) {

        var randomNumber = Math.floor(Math.random()* (5 - 1 )) + 1;
        console.log("randomnumber = " + randomNumber);
        if (randomNumber == 1) {
          stocksEventTurns = Math.floor(Math.random()* (10 - 1 )) + 4;
          stocksEvent = 1;
        } else if (randomNumber == 2) {
          stocksEventTurns = Math.floor(Math.random()* (10 - 1 )) + 4;
          stocksEvent = 2;
        } else if (randomNumber == 3) {
          stocksEventTurns = Math.floor(Math.random()* (8 - 1 )) + 2;
          stocksEvent = 3;
        } else if (randomNumber == 4) {
          stocksEventTurns = Math.floor(Math.random()* (12 - 1 )) + 4;
          stocksEvent = 4;

        } else {

            return stocksEvent;
        }



    }

    return stocksEvent;
}

// small function to add <ul>'s to the html strings
function addUls(html) {
    var html = '<ul>' + html + "</ul>";
    return html;
}

// small function to round up/down decimal numbers
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

// update shares display function
function update() {

  var htmlCompanyName = "";
  var htmlTodaysPrice = "";
  var htmlYesterdaysPrice = "";
  var htmlPriceDiference = "";
  var htmlPlayerInvCompany = "";
  var htmlPlayerPriceBought = "";
  var htmlPlayerAmountheld = "";
  var htmlValueofShares = "";
  var priceDiference = 0.00;
  var displaySharePrice = 0.00;
  var displayYesterdaysSharePrice = 0.00;
  var displayPriceNoughtfor = 0.00;
  var htmlDisplayPlayerBoughtShare = "";
  var htmlValueOfShares;

  for (var i=0; i <companies.length; i +=1) {

    company = companies[i];

    // converts todays share price into a floating point nubmer with 2 decimals fomat (and makes it a sring)

    if (company.todaysSharePrice < 0) {
      displaySharePrice = 0;
      displayYesterdaysSharePrice = 0;
      company.todaysSharePrice = -200;
      htmlCompanyName += '<li class="red "><span class="linethrough">' + company.name + '</span> - GONE BUST!!</li>';
      htmlTodaysPrice += '<li>' + displaySharePrice + '</li>';
      htmlYesterdaysPrice += '<li>' + displayYesterdaysSharePrice + '</li>';

    } else {

    displaySharePrice = (company.todaysSharePrice).toFixed(2);
    displayYesterdaysSharePrice = (company.yesterdaysSharePrice).toFixed(2);

    htmlCompanyName += '<li>' + company.name + '</li>';
    htmlTodaysPrice += '<li>' + displaySharePrice + '</li>';
    htmlYesterdaysPrice += '<li>' + displayYesterdaysSharePrice + '</li>';

    priceDiference = company.todaysSharePrice - company.yesterdaysSharePrice;
    priceDiference = (priceDiference).toFixed(2);

  }

    if (company.todaysSharePrice <0 ) {
      priceDiference = -1;
    }

    if (priceDiference < 0) {
        htmlPriceDiference += '<li class="red">' + priceDiference + '</li>';
    } else {
        htmlPriceDiference += '<li class="green">+' + priceDiference + '</li>';
    }

    if (company.amountSharesPlayerHolds > 0) {
        htmlPlayerInvCompany += '<li>' + company.name + '</li>';
        htmlPlayerPriceBought += '<li>' + company.playerShareBought + '</li>';
        htmlPlayerAmountheld += '<li>' + company.amountSharesPlayerHolds + '</li>';

        pricePlayerBoughtShare = company.pricePlayerBoughtShare.toFixed(2);
        htmlDisplayPlayerBoughtShare += '<li>' + pricePlayerBoughtShare + ' p'+ '</li>'

        var valueOfShares = company.todaysSharePrice * company.amountSharesPlayerHolds;
        valueOfShares = valueOfShares / 100;
        valueOfShares = (valueOfShares).toFixed(2);
        htmlValueofShares += '<li>' + "£ " + valueOfShares + '</li>';
    }


  htmlCompanyName = addUls(htmlCompanyName);
  htmlTodaysPrice = addUls(htmlTodaysPrice);
  htmlYesterdaysPrice = addUls(htmlYesterdaysPrice);
  htmlPriceDiference = addUls(htmlPriceDiference);
  htmlPlayerInvCompany = addUls(htmlPlayerInvCompany);
  htmlPlayerAmountheld = addUls(htmlPlayerAmountheld);
  htmlDisplayPlayerBoughtShare = addUls(htmlDisplayPlayerBoughtShare);
  htmlValueofShares = addUls(htmlValueofShares);

      document.getElementById('displayName').innerHTML = htmlCompanyName;
      document.getElementById('displaySharePrice').innerHTML = htmlTodaysPrice;
      document.getElementById('yesterdaysSharePrice').innerHTML = htmlYesterdaysPrice;
      document.getElementById('displayPriceDifference').innerHTML = htmlPriceDiference;

// display player inventry
      document.getElementById('playerShareDisplay').innerHTML = htmlPlayerInvCompany;
      document.getElementById('playerAmountHeld').innerHTML = htmlPlayerAmountheld;
      document.getElementById('playerShareBought').innerHTML = htmlDisplayPlayerBoughtShare;
      document.getElementById('playerShareValue').innerHTML = htmlValueofShares;
    }

}

/////// --------------------------------- display money function !!!!! -------------------------------
function updateMoney() {

    var htmlDisplayMoney ="";
    var displayMoney = userCash / 100;
    var valueOfShares = 0;
    displayMoney = (displayMoney).toFixed(2);

    htmlDisplayMoney = '<span>Money : £ ' + displayMoney + '</span>';

    for (var i=0; i <companies.length; i +=1) {

      company = companies[i]
      valueOfShares += company.amountSharesPlayerHolds * company.todaysSharePrice;
    }
    valueOfShares = valueOfShares /100;
    valueOfShares = (valueOfShares).toFixed(2);
    htmlDisplayMoney += '<span> Total Value of Shares held: £' + valueOfShares + '</span>';

    document.getElementById('userInfo').innerHTML = htmlDisplayMoney;
    if (userCash <= 0) {
        alert("Bankrupt. Game over!");

    }
};

// function called when player clicks turn button - chnages value of shares and calls update() function
function nextTurn() {


// change prices
// gameEvent = 1 Boom , 2 - ressession, 3 - crash
// call randon stocks event function

  stocksEvent = randomStocksEvent();

  changeSharePrice(stocksEvent);

var htmluserMessages = "";
// -------------- update message box
if (stocksEvent == 1) {
    htmluserMessages = '<span>Boom Market</span>';

} else if (stocksEvent == 2) {
    htmluserMessages = '<span>Ressesion</span>';
} else if (stocksEvent == 3) {
    htmluserMessages = '<span>Market Meltdown. Crash!</span>';
} else {
    htmluserMessages = '<span>Normal Market conditions</span>';
}

htmluserMessages += '<span> Stocks Event Turns ' + stocksEventTurns + '</span>';
document.getElementById('userMessages').innerHTML = htmluserMessages;


    for (var i=0; i <companies.length; i +=1) {

        company = companies[i];

      //  company.yesterdaysSharePrice = company.todaysSharePrice;
      //  company.todaysSharePrice +=  Math.floor((Math.random() * 50) + 1);
    //   company.todaysSharePrice +=  Math.random()* (50 - 1 );
        // company.todaysSharePrice += 10;

        company.todaysSharePrice = round(company.todaysSharePrice, 2);
        company.yesterdaysSharePrice = round(company.yesterdaysSharePrice, 2);
    }
    update();
    updateMoney();
    return;
}
// fuction to get selected item from select box
  function getSelectedOption(sel) {
  var opt;
  for ( var i = 0, len = sel.options.length; i < len; i++ ) {
      opt = sel.options[i];
      if ( opt.selected === true ) {

          break;
      }
  }
  return opt;
}

// function called when user clicks buy button
function jdBuyButton() {

  var sel = document.getElementById('selectBox');

// get selected option in sel (reference obtained above)
var opt = getSelectedOption(sel);
console.log(opt.text);

for (var i=0; i <companies.length; i +=1) {

  company = companies[i];

  if (opt.text === company.name) {

            var amountToBuy = document.getElementById('howMuchForm').value;
            amountToBuy = parseInt(amountToBuy);
            var trasactionAmount = company.todaysSharePrice * amountToBuy
            var trasactionCost = amountToBuy * company.todaysSharePrice;
            console.log("userCash " + userCash + " trasactionCost: " + trasactionCost );
            if (trasactionCost <= userCash) {


                  userCash -= trasactionCost;
                //  alert("Trasaction Sucessful. you bought " + amountToBuy + " of " + company.name + " shares. At " + company.todaysSharePrice + " each. Trasaction cost: "+ trasactionCost * 10);

                  company.amountSharesPlayerHolds += parseInt(amountToBuy);

                  company.pricePlayerBoughtShare = company.todaysSharePrice;
                  console.log(company.amountSharesPlayerHolds);
                  updateMoney();
                  update();
                  selectUpdate();

            } else {
              alert("Not enough money!");
            }
          }
} // object loop

update();

} // end of buy button function

function sellButton() {
selectUpdate();
    var sel = document.getElementById('sellselect');
    var amountToSell = document.getElementById('howMuchForm').value;

// get selected option in sel (reference obtained above)
    var opt = getSelectedOption(sel);

    for (var i=0; i <companies.length; i +=1) {
    company = companies[i];

        if (opt.text === company.name) {
            console.log("shares held : " + company.amountSharesPlayerHolds + " amount wanting to sell: " + amountToSell);
            var amountToSellFloat = parseFloat(amountToSell);
            if (company.amountSharesPlayerHolds >= amountToSellFloat) {
                  company.amountSharesPlayerHolds -= parseInt(amountToSell);
                  userCash += (company.todaysSharePrice * amountToSell);
                  alert("sold for " + company.todaysSharePrice * amountToSell/10);
            } else {
                  alert("You dont have that many shares!!!!");
                    }
        }
    }

update();
updateMoney();
selectUpdate();

}

// function called to put company names into select box

function selectUpdate() {

    var htmlSelectBoxValue = "";
    var htmlSellSelectBox = "Test Message";
    var sellFlag = false;

    for (var i=0; i <companies.length; i +=1) {

      company = companies[i];
      htmlSelectBoxValue += '<option value="' + company.name + '">' + company.name + '</option>';
      if (company.amountSharesPlayerHolds > 0) {

        console.log("Amount Shares Player holds: " + company.name + company.amountSharesPlayerHolds);
        htmlSellSelectBox += '<option value="' + company.name + '">' + company.name + '</option>';
        sellflag = true;
      }

    }
    document.getElementById('selectBox').innerHTML = htmlSelectBoxValue;
    document.getElementById('sellselect').innerHTML = "No Shares Held";
    if (sellFlag = true) {
        document.getElementById('sellselect').innerHTML = htmlSellSelectBox;
        sellFlag = false;
    }
}

function init() {
  for (var i=0; i <companies.length; i +=1) {

    company = companies[i];
    company.preformance = Math.floor(Math.random()* (10 - 1 )) + 1;
    company.turnTrend = Math.floor(Math.random()* (10 - 1 )) + 1;

  }

}

function changeSharePrice(gameEvent) {

  for (var i=0; i <companies.length; i +=1) {

    company = companies[i];
    company.yesterdaysSharePrice = company.todaysSharePrice;

    if (company.turnTrend === 0 ) {

      company.preformance = Math.floor(Math.random()* (10 - 1 )) + 1;
      company.turnTrend = Math.floor(Math.random()* (10 - 1 )) + 1;

      console.log(company.name + " Turntrend reset preformance " + company.preformance + " Turns " + company.turnTrend);

    }


    if (company.preformance <= 3) {
      company.todaysSharePrice -=  Math.floor(Math.random()* (10 - 1 )) + 1;

    }

    else if (company.preformance >= 4 && company.preformance < 8) {
      company.todaysSharePrice += Math.floor(Math.random()* (3 - 1 )) + 1;

    }

    else if (company.preformance >=8) {
      company.todaysSharePrice += Math.floor(Math.random()* (10 - 1 )) + 1;

    }

company.turnTrend = company.turnTrend - 1;

    if (gameEvent === 1) {
      company.todaysSharePrice += Math.floor(Math.random()* (10 - 1 )) + 1;

    } else if (gameEvent === 2) {
          company.todaysSharePrice -= Math.floor(Math.random()* (10 - 1 )) + 1;

    } else if (gameEvent === 3) {
          company.todaysSharePrice -= Math.floor(Math.random()* (30 - 1 )) + 1;
    }


    if (company.todaysSharePrice <0 ) {

          company.amountSharesPlayerHolds = 0;

    }

  } // loop
} // end of function


// --------------------------- Main program starts-------------------------------------------



update();
updateMoney();
selectUpdate();
init();
