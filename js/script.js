
const buttonForm = document.querySelector('.header__button--visit');
const cardField = document.querySelector('.field-card__list');

let token = '9baa5726-5329-404b-a22d-44c224eaa2d2';

const doctors = [' ','Dentist', 'Cardiologist', 'Therapist'];
const urgency = [' ', 'Low', 'Normal', 'High']


buttonForm.addEventListener('click', () =>{
    const newModal = new Modal();
    buttonForm.disabled = true;
    newModal.createModal();
})

function createElementForm( node, classNode, parent){
    const element = document.createElement(node);
    element.classList.add(classNode);
    parent.append(element);
    return element;
}

function request (url , method, data) {
        let token = localStorage.getItem('token')
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
}


function replaceSpan(childrenCollection){
    const [...childrens] = childrenCollection;
    childrens.map(element => {
        if(element.tagName.toLowerCase() === 'p'){
            const spanOnCard = element.childNodes[1];
            const spanData = spanOnCard.innerText;
            const spanClass = spanOnCard.classList.value.slice(6,-6);
            if(spanClass === 'doctor'){
                return;
                }
            if(spanClass === 'urgency'){
                const selectUrgencies = createElementForm('select','urgency__select', element);
                urgency.forEach(urgency => {
                    const optionUrgency = createElementForm('option','urgency__option',selectUrgencies);
                    optionUrgency.innerText = urgency;
                    optionUrgency.value = urgency;
                });
                selectUrgencies.value = spanData;
            } else {
                const inputCardUp = createElementForm('input',`${spanClass}__input`, element);
                if( spanClass === 'last-visit'){
                    inputCardUp.type="date";
                }
                inputCardUp.value = spanData;
            }

            spanOnCard.remove();
        }
        if(element.tagName.toLowerCase() === 'div'){
            replaceSpan(element.children);
        }
    })
}

function replaceInput(childrenCollection, data){
    const [...childrens] = childrenCollection;
    let inputClassDate;
    childrens.map(element => {
        if(element.classList.value === 'card__doctor'){
            console.log(element.classList);
            return;
        }
        if(element.tagName.toLowerCase() === 'p'){
            console.log(element);

            const inputOnCard = element.childNodes[1];
            const inputClass = inputOnCard.classList.value.split('__')[0];
            if(inputClass === 'last-visit'){
                const className = inputClass.split('-');
                console.log(className[0]+className[1]);
                inputClassDate = (className[0] + className[1]);
            }
            for (const key in data) {
                if (key.toLowerCase() === inputClass || key.toLowerCase() === inputClassDate) {
                const spanCardUp = createElementForm('span',`card__${inputClass}-value`, element);
                spanCardUp.innerText = data[key];
                }
            }
            inputOnCard.remove();
        }
        if(element.tagName.toLowerCase() === 'div'){
            replaceInput(element.children, data);
        }
    })
}


function gatheringInfo(doctor) {
    let data;
    const mainDataVisite = {};
    const name = document.querySelector('.name__input').value;
    const purpose = document.querySelector('.purpose__input').value;
    const urgency = document.querySelector('.urgency__select').value;
    const description = document.querySelector('.description__input').value;
    if(urgency === ' '){
        mainDataVisite.urgency = 'Normal';
    }
    if(urgency){
        mainDataVisite.urgency = urgency;
    }

    mainDataVisite.name = name;
    mainDataVisite.purpose = purpose;
    mainDataVisite.description = description;
    if(doctor === 'Dentist'){
        const lastVisit = document.querySelector('.last-visit__input').value;
        data = {
            title: 'Візит до стоматолога',
            doctor:doctor,
            name: name,
            purpose: purpose,
            description: description,
            urgency: urgency,
            lastVisit: lastVisit
        }
    }
    if(doctor === 'Cardiologist'){
        const age = document.querySelector('.age__input').value;
        const mass = document.querySelector('.mass__input').value;
        const pressure = document.querySelector('.pressure__input').value;
        const diseases = document.querySelector('.diseases__input').value;
        data = {
            title: 'Візит до кардіолога',
            doctor:doctor,
            name: name,
            purpose: purpose,
            description: description,
            urgency: urgency,
            age:age,
            mass:mass,
            pressure:pressure,
            diseases:diseases
        }
    }
    if(doctor=== 'Therapist'){
        const age = document.querySelector('.age__input').value;
        data = {
            title: 'Візит до терапевта',
            doctor:doctor,
            name: name,
            purpose: purpose,
            description: description,
            urgency: urgency,
            age:age
        }
    }
    return data;
}

class Modal{
    constructor(){
    }

    createModal () {
        const form = document.querySelector('.modal-form');
        if(form){
            form.remove();
        }
        const wrapper = createElementForm('div', 'wrapper-form', document.body);
        wrapper.addEventListener('click', (eventForm) => {
            const modalFormOnPage = wrapper.querySelector('.modal-form');
                const withinBoundariesForm = eventForm.composedPath().includes(modalFormOnPage);
                if (!withinBoundariesForm) {
                    buttonForm.disabled = false;
                    wrapper.remove();
                }
        })
        const modalForm = createElementForm('form', 'modal-form', wrapper);
        const labelListDoctor = createElementForm('label','list-doctor__label', modalForm);
        const selectDoctor = createElementForm('select','list-doctor__select', labelListDoctor);
        doctors.forEach(doctor => {
            const optionDoctor = createElementForm('option','list-doctor__option',selectDoctor);
            optionDoctor.innerText = doctor;
            optionDoctor.value = doctor;
        });
        const buttonClose = createElementForm('button','modal-form__btnClose',modalForm );
        buttonClose.innerText = 'Close form';
        buttonClose.addEventListener('click', () =>{
            buttonForm.disabled = false;
            wrapper.remove();
        })
        this.submitBlock(modalForm);
        selectDoctor.addEventListener('change', (event) =>{
            const formDoctor = document.querySelector('.modal-form__doctor');
            const formMainData = document.querySelector('.modal-form__main-data');
            if (event.target.value === " ") {
                return;
            }
            if (!formMainData) {
                this.createMainData(modalForm);
            }
            if(formDoctor){
                formDoctor.remove();
            }
            if(event.target.value === 'Dentist'){
                this.createDentistBlock(modalForm);
            }
            if(event.target.value === 'Cardiologist'){
                this.createCardiologistBlock(modalForm);
            }
            if(event.target.value === 'Therapist'){
                this.createTherapistBlock(modalForm);
            }

        })



    }

    createMainData(parent){
        const mainDataForm = createElementForm('div', 'modal-form__main-data',parent )

        const labelName= createElementForm('label','name__label', mainDataForm);
        labelName.innerText = `Ім'я відвідувача:`;
        const inputName = createElementForm('input','name__input', labelName);
        inputName.type ='text';

        const labelPurpose = createElementForm('label','purpose__label', mainDataForm);
        labelPurpose.innerText = `Ціль візиту:`;
        const inputPurpose = createElementForm('input','purpose__input', labelPurpose);
        inputPurpose.type ='text';

        const labelDescription = createElementForm('label','description__label', mainDataForm);
        labelDescription.innerText = `Короткий опис візиту:`;
        const inputDescription = createElementForm('textarea','description__input', labelDescription);

        const labelUrgency = createElementForm('label','urgency__label', mainDataForm);
        labelUrgency.innerText = 'Терміновість візиту:';
        const selectUrgencies= createElementForm('select','urgency__select', labelUrgency);
        urgency.forEach(urgency => {
            const optionUrgency = createElementForm('option','urgency__option',selectUrgencies);
            optionUrgency.innerText = urgency;
            optionUrgency.value = urgency;
        });
    }

    createDentistBlock(parent){
        parent.insertAdjacentHTML('beforeend', `  <div class="modal-form__doctor dantist">
        <label class="doctor__labe">Останній візит до стоматолога
            <input class="last-visit__input" type="date">
        </label>
    </div>`)
    }
    createCardiologistBlock(parent){
        parent.insertAdjacentHTML('beforeend', `  <div class="modal-form__doctor dantist">
        <label class="doctor__label">Звичний артеріальний тиск пацієнта
            <input class="pressure__input" type="text">
        </label>
        <label class="doctor__label">Індекс маси тіла
            <input class="mass__input" type="text">
        </label>
        <label class="doctor__label">Перенесені захворювання серцево-судинної системи
            <input class="diseases__input" type="text">
        </label>
        <label class="doctor__label">Вік пацієнта
            <input class="age__input" type="text">
        </label>
        </div>`)
    }
    createTherapistBlock(parent){
        parent.insertAdjacentHTML('beforeend', `  <div class="modal-form__doctor">
        <label class="doctor__label">Вік пацієнта
            <input class="age__input" type="text">
        </label>
    </div>`)
    }

    async submitBlock(parent){
        let newVisite;
        const submitButton = createElementForm('button', 'modal-form__button-submit', parent);
        submitButton.innerText = "Submit data";
        submitButton.addEventListener('click', (event) => {
            event.preventDefault();

            const doctor = document.querySelector('.list-doctor__select').value;
            if(doctor === ' '){
                alert('Change doctor')
                return;
            }

            const data = gatheringInfo(doctor);
            const dataRequest = request('https://ajax.test-danit.com/api/v2/cards', 'POST', data)
                .catch(e => console.log("Помилка: " + e.message));
            const getInfo = async () => {
                const data = await dataRequest;
                console.log(data.doctor);
                if(data.doctor === 'Dentist'){
                    newVisite = new VisitDentist(data);
                }
                if(data.doctor === 'Cardiologist'){
                    newVisite = new VisitCardiologist(data);
                }
                if(data.doctor === 'Therapist'){
                    newVisite = new VisitTherapist(data);
                }
                newVisite.createCardMain();

            };

            getInfo();
            if (event) {
                const form = document.querySelector('.modal-form');
                form.remove();
                buttonForm.disabled = false;
            }

        })

    }

    updateData (){
        this.createModal();

    }
}



class Visit {
    constructor(clientMainData){
        this.title = clientMainData.title;
        this.doctor = clientMainData.doctor;
        this.name = clientMainData.name;
        this.id = clientMainData.id;
        this.purpose = clientMainData.purpose;
        this.description = clientMainData.description;
        this.urgency = clientMainData.urgency;

    }
    createCardMain(){
        const card = createElementForm('div','card',cardField);
        card.dataset.id = this.id;
        const buttonUpdate = createElementForm('button','card__button-update',card);
        buttonUpdate.innerText = 'Редагувати';
        card.insertAdjacentHTML('afterbegin', `
        <h2 class="card__title">${this.title}</h2>
        <p class="card__name">Ім'я:<span class='card__name-value'>${this.name}</span></p>
        <p class="card__doctor">До якого лікаря:<span class='card__doctor-value'>${this.doctor}</span></p>`);
        const buttonMore = createElementForm('button','card__button-more',card);
        const buttonDel = createElementForm('button', 'card__button-del',card);
        buttonDel.innerText = 'X';
        buttonMore.innerText = 'Більше інформації';

        const buttonHide = createElementForm('button', 'card__button-hide',card);
        buttonHide.innerText ='Сховати';
        buttonHide.style.display = 'none';
        card.addEventListener('click', (e) => {
            const idCard = e.currentTarget.dataset.id;
            const cardMoreInfo = document.querySelector(`.card__more[data-id = "${idCard}"]`);
            if(e.target.classList.contains('card__button-update')){
                if(!cardMoreInfo){
                    this.moreInformation(card);
                } else {
                    cardMoreInfo.style.display = 'block';
                }
                buttonMore.style.display ='none';
                buttonHide.style.display = 'none';
                buttonUpdate.style.display = 'none';

                replaceSpan(card.children);
                const saveCard = gatheringInfo(this.doctor);

                if(e.currentTarget !== card){
                    buttonHide.style.display = 'block';
                    buttonUpdate.style.display = 'block';
                }

                const buttonSubmitUp = createElementForm('button', 'card__button-submit-up',card);
                const buttonCancel = createElementForm('button', 'card__button-cancel',card);
                buttonSubmitUp.innerText = 'Зберегти';
                buttonCancel.innerText ='Скасувати';
                buttonSubmitUp.addEventListener('click', () => {
                    const dataup = gatheringInfo(this.doctor);
                request(`https://ajax.test-danit.com/api/v2/cards/${idCard}`, 'PUT', dataup);
                replaceInput(card.children, dataup);
                buttonCancel.remove();
                buttonSubmitUp.remove();
                buttonHide.style.display = 'block';
                buttonUpdate.style.display = 'block';
                })
                buttonCancel.addEventListener('click', () => {
                    replaceInput(card.children, saveCard);
                    buttonCancel.remove();
                    buttonSubmitUp.remove();
                    buttonHide.style.display = 'block';
                    buttonUpdate.style.display = 'block';
                })

            }
            if(e.target.classList.contains('card__button-del')){
                fetch(`https://ajax.test-danit.com/api/v2/cards/${idCard}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            })
            card.remove();
            }

            if(e.target.classList.contains('card__button-more')){
                if(!cardMoreInfo){
                    this.moreInformation(card);
                } else {
                    cardMoreInfo.style.display = 'block';
                }
                buttonMore.style.display ='none';
                buttonHide.style.display = 'block';

            }

            if(e.target.classList.contains('card__button-hide')){
                cardMoreInfo.style.display ='none';
                buttonMore.style.display = 'block';
                buttonHide.style.display = 'none';
            }
        })
    }

    static clearAllCards() {
        cardField.innerHTML = '';
    }


    moreInformation(card){
        const cardMore = createElementForm('div','card__more',card);
        cardMore.dataset.id = this.id;
        cardMore.insertAdjacentHTML('afterbegin', `
        <p class="card__purpose">Ціль візиту:<span class='card__purpose-value'> ${this.purpose}</span></p>
        <p class="card__description">Короткий опис:<span class='card__description-value'> ${this.description}</span></p>
        <p class="card__urgency">Терміновість: <span class='card__urgency-value'>${this.urgency}</span></p>`);
        this.specificInformation(cardMore);
        return cardMore;
    }
    specificInformation(card){
    }
}

class VisitDentist extends Visit{
    constructor(clientMainData){
        super(clientMainData);
        this.lastVisit = clientMainData.lastVisit;
    }
    specificInformation(card){
        card.insertAdjacentHTML('beforeend', `<p class="card__last-visit">Дата останнього візиту: <span class='card__last-visit-value'>${this.lastVisit}</span></p>`);
    }
}

class VisitCardiologist extends Visit{
    constructor(clientMainData){
        super(clientMainData);
        this.mass = clientMainData.mass;
        this.pressure = clientMainData.pressure;
        this.diseases = clientMainData.diseases;
        this.age = clientMainData.age;
    }
    specificInformation(card){
        card.insertAdjacentHTML('beforeend', `<p class="card__mass">Індекс ваги: <span class='card__mass-value'>${this.mass}</span></p>
        <p class="card__pressure">Звичний артеріальний тиск: <span class='card__pressure-value'>${this.pressure}</span></p>
        <p class="card__diseases">Перенесені захворювання серцево-судинної системи:<span class='card__diseases-value'> ${this.diseases}</span></p>
        <p class="card__age">Вік: <span class='card__age-value'>${this.age}</span></p>`);
    }
}

class VisitTherapist extends Visit{
    constructor(clientMainData){
        super(clientMainData);
        this.age = clientMainData.age;
    }
    specificInformation(card){
        card.insertAdjacentHTML('beforeend', `<p class="card__age">Вік: <span class='card__age-value'>${this.age}</span></p>`);
    }
}






//---------------------

const buttonLogin = document.querySelector('.header__button')
const changeButtonLogin = document.querySelector('.header__button--visit')
const containerMain = document.querySelector('.main')

function changeLoginButton () {
    if (localStorage.getItem('token')) {
        changeButtonLogin.style.display = 'block'
        buttonLogin.style.display = 'none'
    }
    else {
        changeButtonLogin.style.display = 'none'
        buttonLogin.style.display = 'block'
    }
}

function removeLoginModal () {
    containerMain.innerHTML = ''
}

function renderLoginModal () {
    containerMain.insertAdjacentHTML('afterbegin', `  <form class="login__form">
        <div class="login__header">Please enter your credentials</div>
        <label>
            <input class="login__email" type="email" placeholder="Email">
        </label>
        <label>
            <input class="login__password" type="password" placeholder="Password">
        </label>
        <div class="login__buttons">
        <button class="login__send" type="submit"> Send</button>
        <button class="login__close" type="button">Cancel</button>
        </div>
    </form>`)
    document.querySelector('.login__form').addEventListener('submit', loginHandler, {once: true})
    const buttonClose = document.querySelector('.login__close')
    buttonClose.addEventListener('click', removeLoginModal)
}

function loginHandler (event) {
    event.preventDefault()
    const email = event.target.querySelector('.login__email').value
    const password = event.target.querySelector('.login__password').value
    login(email, password).then((token) => {
        console.log(token);
        localStorage.setItem('token', token)
    }).then(() => init())
        .then(() => changeLoginButton())

}

async function init() {
    if (localStorage.getItem('token')) {
        console.log('logined');
        removeLoginModal()
        getCards()
    } else {
        await login()
        console.log('Need cards')
    }
}

function login(email, password) {
    return fetch('https://ajax.test-danit.com/api/v2/cards/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    })
        .then((response) => response.text())
}

buttonLogin.addEventListener('click', renderLoginModal)
token = localStorage.getItem('token')


function getCards () {
    let token = localStorage.getItem('token')
    fetch('https://ajax.test-danit.com/api/v2/cards', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    }).then(response => response.json())
        .then(response => {
            console.log(response)
            cards = response
            filteredCards = response
            if (cards.length === 0) {
                const startPage = document.createElement('div')
               startPage.classList.add('start-page')
                startPage.innerText = 'No items has been added'
                containerMain.append(startPage)

            } else {
           handleRenderCards(cards)
            }})

}

function handleRenderCards (cards, filtering) {

    if (filtering) {
        Visit.clearAllCards();
    }

    cards.forEach( e => {

        if (e.doctor.toLowerCase() === 'dentist') {
            const cardsDentist = new VisitDentist(e)
            cardsDentist.createCardMain()
        }

        if (e.doctor.toLowerCase() === 'cardiologist') {
            const cardsCardiologist = new VisitCardiologist(e)
            cardsCardiologist.createCardMain()
        }

        if (e.doctor.toLowerCase() === 'therapist') {
            const cardsTherapist = new VisitTherapist(e)
            cardsTherapist.createCardMain()
        }
    })
}

let cards
const filterForm = document.querySelector('.filterForm__input')

let filteredCards = cards;

// console.log("INITIAL FILTERED CARDS", filteredCards)


const filterUrgency = document.querySelector('.urgency')

function filterCards() {
    const urgencyValue = filterUrgency.value?.toLowerCase() || '';
    const filterValue = filterForm.value?.toLowerCase() || '';

    const filteredCards = cards.filter(card => {
        if (card?.name?.toLowerCase().includes(filterValue) || card?.description?.toLowerCase().includes(filterValue)) {
            return card;
        }
    }).filter(card => {

        if (urgencyValue === 'all') {
            return cards;
        }

        if (card?.urgency?.toLowerCase() === urgencyValue.toLowerCase()) {
            return card;
        }
    })

        handleRenderCards(filteredCards, true)
}

filterForm.addEventListener('input', filterCards)

filterUrgency.addEventListener('input', filterCards)