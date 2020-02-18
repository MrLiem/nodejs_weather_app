const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageTwo.innerHTML = '';
    messageOne.innerHTML = 'Loading!!!'

    let location = search.value;
    if (!location) {
        messageOne.innerHTML = 'Please enter a location!!!'
    }


    fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageOne.innerHTML = error

            } else {
                messageOne.innerHTML = data.location;
                messageTwo.innerHTML = data.forecastData
            }
        })
    })
    search.value = '';
})