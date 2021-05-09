console.log('main.js loaded');


//for now, stores an "Object", aka a dictionary, of the rates as of a given date
let state = {
    rates: [],
    percents: [],
};




let stateObjects = [];


function calculateDateArray() {
    let search = document.querySelector('#lookbackDate').value
    console.log(search);
    sampleSearch = '2/14/2021';
    possibleDates = ['2021-01-01', '2021-02-01', '2021-03-01', '2021-04-01', '2021-05-01'];
    //console.log('possibleDates', possibleDates);
    // possible date conversion needed
    // i could use the date picker from bucketFinance
    for (let date of possibleDates) {
        console.log(date > search);
    };
};

function calculateAddBarPercent() {
    console.log('function: calculateAddBarPercent')
    //Get array of rates
    let rateArray = []
    for (let item of stateObjects) {
        rateArray.push(item.rate)
    };
    console.log('rateArray: ', rateArray)
    //get largest value; sash in variable 'greatestRate'
    let greatestRate = Math.max(...rateArray); // Not sure why it isn't taking an Array
    console.log('greatestRate: ', greatestRate)
    //cycle through objects. for each, PUSH calculated percent based on greatestRate
    for (let item of stateObjects) {
        let barPercent = item.rate /  greatestRate * 100;
        item['percent'] = barPercent; // need to figure out how to add new pair to object
    };
};

/* ORIGINAL createBar function
function createBar() {
    for (let item in state.rates) {
        let container = document.querySelector('.ExchangeRateChart-display')
        //
        bar = document.createElement('div');
        bar.className = "ExchangeRateChart-bar";
        bar.setAttribute('style', 'width: 60.4%; height: 10%')
        //
        barText = document.createElement('div');
        barText.className = "ExchangeRateChart-bar-text";
        bar.setAttribute('style', 'width: 60.4%; height: 10%')
        bar.appendChild(barText);
        //
        barPara = document.createElement('p');
        barPara.textContent = 'EUR';
        barText.appendChild(barPara);
        // Set Alert. OOOORRRR the hover appear thing from solution, ideally
        //
        container.appendChild(bar);
        //frame.setAttribute('class', result.embed_url);
        //outputSection = document.querySelector('#output');
        //outputSection.appendChild(frame);
    }

};
*/
//NEW function, looks at list of objects
function createBar() {
    //TODO: this creates the graph 3 times. This is not efficient.
    let container = document.querySelector('.ExchangeRateChart-display')
    container.innerHTML = '';
    for (let item of stateObjects) {
        let container = document.querySelector('.ExchangeRateChart-display')
        //
        bar = document.createElement('div');
        bar.className = "ExchangeRateChart-bar";
        // TODO: calculate number of items in array, aka number of bars
        // Use this to determine the height of each bar. like 90/(# of bars)
        bar.setAttribute('style', 'width: ' + item.percent + '%; height: 30%')
        //
        barText = document.createElement('div');
        barText.className = "ExchangeRateChart-bar-text";
        bar.appendChild(barText);
        //
        barPara = document.createElement('p');
        barPara.textContent = item.date + ': The value of ' + item.currency + ' is '+ item.rate;
        barText.appendChild(barPara);
        // Set Alert. OOOORRRR the hover appear thing from solution, ideally
        //
        container.appendChild(bar);
        //frame.setAttribute('class', result.embed_url);
        //outputSection = document.querySelector('#output');
        //outputSection.appendChild(frame);
    }

};



/*
Is this the same? is it different? who knows!


function doFetch() {
    console.log('function: doFetch')
    let container = document.querySelector('.ExchangeRateChart-display')
    container.innerHTML = '';
    //let search = document.querySelector('#search').value
    //console.log('search: ', search)
    let dates = ['2020-04-04','2020-03-04','2020-02-04',];
    for (let date of dates) {
        console.log('date:', date);
        fetch('https://api.exchangerate.host/' + date + '?symbols=USD')
        .then(response => response.json())
        .then(data => {
            console.log('data.rates:', data.rates.USD);
            state.rates.push(data.rates.USD);
            console.log('state.rates:', state.rates);
            // Add this render function back eventually render();
            //for (let rate of state.Object) {
            //    console.log(rate);
            //};
        })
    }
    render()
*/
    

function doFetch() {
    console.log('function: doFetch')
    let container = document.querySelector('.ExchangeRateChart-display')
    container.innerHTML = '';
    stateObjects = [];
    //let search = document.querySelector('#search').value
    //console.log('search: ', search)
    // TODO: This is where I add calculateDateArray
    let dates = ['2020-04-04','2020-03-04','2020-02-04'];
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

/*
doFetch
calculateAddBarPercent
createBar

*/

function render() {
    console.log('function: render');
    calculateAddBarPercent();
    createBar();
};