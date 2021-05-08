console.log('main.js loaded');


//for now, stores an "Object", aka a dictionary, of the rates as of a given date
let state = {
    rates: [],
};


     

function doFetch() {
    console.log('function: doFetch')
    //let search = document.querySelector('#search').value
    //console.log('search: ', search)
    let dates = ['2020-04-04','2020-03-04','2020-02-04',];
    for (let date of dates) {
        console.log('date:', date);
        fetch('https://api.exchangerate.host/' + date + '?symbols=USD')
        .then(response => response.json())
        .then(data => {
            console.log('data.rates:', data.rates);
            state.rates.push(data.rates);
            console.log('state.rates:', state.rates);
            // Add this render function back eventually render();
            //for (let rate of state.Object) {
            //    console.log(rate);
            //};
        });
    }
    

};