const output = document.getElementById('output');
const form = document.querySelector('form');
const inputEl = document.querySelector('input');

const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'dark'];

let list = [];

const getRandomNumber = () => {
    list = [];
    for(let i = 0; i < 5; i++) {
        const number = Math.floor(Math.random() * 1000);
        list.push(number);
    }
    renderNumber();
}

const renderNumber = () => {
    output.innerHTML = '';
    list.forEach(el => {
        const cardEl = document.createElement('div');
        cardEl.className = 'card mr-3 mb-3';
        cardEl.innerHTML = `
                              <div class="card-body">
                                <h5>${el}</h5>
                                <button class="btn btn-danger btn-sm delete">X</button>
                              </div>
                           `;
        output.appendChild(cardEl)                   
    })
}

window.addEventListener('click', (e) => {
    if(e.target.classList.contains('reset')) {
        getRandomNumber();
    }

    if(e.target.classList.contains('ascending')) {
        if(list.length > 0) {
            ascendNumber();
        }
    }

    if(e.target.classList.contains('descending')) {
        if(list.length > 0) {
            descendNumber();
        }
    }

    if(e.target.classList.contains('add')) {
        const number = Math.floor(Math.random() * 1000);
        list.push(number);
        renderNumber();
    }

    if(e.target.classList.contains('delete')) {
        const number = e.target.parentElement.querySelector('h5').innerText;
        const index = list.indexOf(list.find(el => +el === +number));
        list.splice(index, 1);
        console.log(list);
        e.target.parentElement.remove();
    }

    if(e.target.classList.contains('similar')) {
        let listOfSimilar = [];
        for(let i = 0; i < list.length - 1; i++) {
            for(let j = i + 1; j < list.length; j++) {
                if(list[i] === list[j] && !listOfSimilar.includes(list[i])) {
                    const cards = document.querySelectorAll('.card');
                    listOfSimilar.push(list[i]);
                    for(let i = 0; i < listOfSimilar.length; i++) {
                        cards.forEach(el => {
                            if(+el.querySelector('h5').innerText === listOfSimilar[i]) {
                                el.classList.add(`border-${colors[i]}`);
                            }
                        })                        
                    }
                }
            }
        }
    }

    if(e.target.classList.contains('max')) {
        const sortedList = list.sort((a,b) => a-b);
        const max = sortedList[sortedList.length - 1];
        const cards = document.querySelectorAll('.card');
        cards.forEach(el => el.classList.remove('border-primary'))
        cards.forEach(el => {
            if(+el.querySelector('h5').innerText === +max) {
                el.classList.add('border-primary');
            }
        })
    }

    if(e.target.classList.contains('min')) {
        const sortedList = list.sort((a,b) => a-b);
        const min = sortedList[0];
        const cards = document.querySelectorAll('.card');
        cards.forEach(el => el.classList.remove('border-primary'))
        cards.forEach(el => {
            if(+el.querySelector('h5').innerText === +min) {
                el.classList.add('border-primary');
            }
        })
    }
})


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const number = +inputEl.value;
    list.push(number);
    renderNumber();
    inputEl.value = '';
})

const ascendNumber = () => {
    list = list.sort((a,b) => a-b);
    renderNumber();
}

const descendNumber = () => {
    list = list.sort((a,b) => b-a);
    renderNumber();
}

getRandomNumber();