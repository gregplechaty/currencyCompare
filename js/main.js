let stateObjects = [];

function calculateDateArray() {
    let startMonth = document.querySelector('#start_month').value;
    let startYear = document.querySelector('#start_year').value;
    let startDate = new Date(startYear, startMonth, 1);
    let numOfMonths = document.querySelector('#numOfMonths').value;
    let dateArray = [];
    for (let i = 0; i < numOfMonths; i++) {
        dateArray.push(new Date (startDate));
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
    return dateArrayFormatted; 
};

function calculateAddBarPercent() {
    let rateArray = []
    for (let item of stateObjects) {
        rateArray.push(item.rate)
    };
    let greatestRate = Math.max(...rateArray);
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
        container.appendChild(bar);
    }
};

function doFetch() {
    console.log('function: doFetch')
    let container = document.querySelector('.ExchangeRateChart-display')
    container.innerHTML = '';
    stateObjects = [];
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
            barObject = {
                'date': date,
                'currency': ticker,
                'rate': data.rates[ticker]
            }
            stateObjects.push(barObject);
            console.log('stateObjects:', stateObjects);

            render()
        })
    };
};

function render() {
    console.log('function: render');
    calculateAddBarPercent();
    createBar();
};