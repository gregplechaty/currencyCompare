console.log('main.js loaded');


//for now, stores an "Object", aka a dictionary, of the rates as of a given date

let stateObjects = [];


function calculateDateArray() {
    let startMonth = document.querySelector('#start_month').value;
    let startYear = document.querySelector('#start_year').value;
    let startDate = new Date(startYear, startMonth, 1);
    //let startDate = startYear + '-' + startMonth + '-01'
    let numOfMonths = document.querySelector('#numOfMonths').value;
    let dateArray = [];
    for (let i = 0; i < numOfMonths; i++) {
        dateArray.push(new Date (startDate));
        //console.log('dateArray:', dateArray)
        startDate.setMonth(startDate.getMonth() + 1);
      }


     let dateArrayFormatted = [];
    for (let date of dateArray) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month < 10) {
            month = '0' + month.toString();
        }
        if (day < 10) {
            day = '0' + day.toString();
        }
        
        dateArrayFormatted.push(year + '-' + month + '-' + day);
    };

    console.log('dateArrayFormatted: ', dateArrayFormatted)
    return dateArrayFormatted; 
};

function calculateAddBarPercent() {
    console.log('function: calculateAddBarPercent')
    //Get array of rates
    let rateArray = []
    for (let item of stateObjects) {
        rateArray.push(item.rate)
    };
    console.log('rateArray: ', rateArray)
    let greatestRate = Math.max(...rateArray);
    console.log('greatestRate: ', greatestRate)
    for (let item of stateObjects) {
        let barPercent = item.rate /  greatestRate * 100;
        item['percent'] = barPercent;
    };
};


function createBar() {
    //TODO: this creates the graph 3 times. This is not efficient.
    let container = document.querySelector('.ExchangeRateChart-display')
    container.innerHTML = '';
    let barHeight = 95/stateObjects.length;
    for (let item of stateObjects) {
        let container = document.querySelector('.ExchangeRateChart-display')
        bar = document.createElement('div');
        bar.className = "ExchangeRateChart-bar";
        bar.setAttribute('style', 'width: ' + item.percent + '%; height: ' + barHeight +'%')
        barText = document.createElement('div');
        barText.className = "ExchangeRateChart-bar-text";
        bar.appendChild(barText);
        barPara = document.createElement('p');
        barPara.textContent = item.date + ': The value of ' + item.currency + ' is '+ item.rate;
        barText.appendChild(barPara);
        // Set Alert. OOOORRRR the hover appear thing from solution, ideally
        container.appendChild(bar);
    }

};

function doFetch() {
    console.log('function: doFetch')
    let container = document.querySelector('.ExchangeRateChart-display')
    container.innerHTML = '';
    stateObjects = [];
    //let search = document.querySelector('#search').value
    //console.log('search: ', search)
    // TODO: This is where I add calculateDateArray
    //let dates = ['2020-04-04','2020-03-04','2020-02-04', '2020-01-04'];
    let dates = calculateDateArray();
    for (let date of dates) {
        console.log('date:', date);
        let symbol = document.querySelector('#currency_select');
        let ticker = symbol.value;
        console.log('https://api.exchangerate.host/' + date + '?symbols=' + ticker);
        fetch('https://api.exchangerate.host/' + date + '?symbols=' + ticker)
        .then(response => response.json())
        .then(data => {
            console.log('data.rates:', data.rates[ticker]);
            ////////////////// THIS IS WHAT WE WANT TO MODIFY
            //state.rates.push(data.rates.USD);
            // new one:
            //let barPercent = data
            barObject = {
                'date': date,
                'currency': ticker,
                'rate': data.rates[ticker]
            }
            stateObjects.push(barObject);
            ////////////
            console.log('stateObjects:', stateObjects);
            // Add this render function back eventually render();
            //for (let rate of state.Object) {
            //    console.log(rate);
            //};
            render()
        })
    };




};
/*
function doFetchFancy() {
    console.log('function: doFetchFancy')
    let container = document.querySelector('.ExchangeRateChart-display')
    container.innerHTML = '';
    state.rates = [];
    //let search = document.querySelector('#search').value
    //console.log('search: ', search)
    let dates = ['2020-04-04','2020-03-04','2020-02-04',];
    const promise1 = fetch('https://api.exchangerate.host/2020-04-04?symbols=USD')
        .then(response => response.json())
        .then(data => {
            console.log('data.rates:', data.rates.USD);
            state.rates.push(data.rates.USD);
            console.log('state.rates:', state.rates);
        });
    const promise2 = fetch('https://api.exchangerate.host/2020-03-04?symbols=USD')
        .then(response => response.json())
        .then(data => {
            console.log('data.rates:', data.rates.USD);
            state.rates.push(data.rates.USD);
            console.log('state.rates:', state.rates);
        });
    const promise3 =  fetch('https://api.exchangerate.host/2020-02-04?symbols=USD')
        .then(response => response.json())
        .then(data => {
            console.log('data.rates:', data.rates.USD);
            state.rates.push(data.rates.USD);
            console.log('state.rates:', state.rates);
        });
    Promise.all([promise1, promise2, promise3]).then(render());
   

    
};
*/

function render() {
    console.log('function: render');
    calculateAddBarPercent();
    createBar();
};