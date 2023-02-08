const buttonForm =document.querySelector('.header__button--visit');

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
    return fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        // .then(response => console.log(response))
}

function gatheringInfo(doctor) {
    let data;
    const mainDataVisite = {};
    const name = document.querySelector('.name__input').value;
    const purpose = document.querySelector('.purpose__input').value;
    const urgency = document.querySelector('.urgency__select').value;
    const description = document.querySelector('.description__textarea').value;
    if(urgency === ' '){
        alert('Change urgency');
        return;
    }
    if(urgency){
        mainDataVisite.urgency = urgency;
    }

    mainDataVisite.name = name;
    mainDataVisite.purpose = purpose;
    mainDataVisite.description = description;
    if(doctor === 'Dentist'){
        const lastVisit = document.querySelector('.last-visite__input').value;
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
        
        const modalForm = createElementForm('form', 'modal-form', document.body);

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
            modalForm.remove();
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
        labelName.innerText = `visiter's name`;
        const inputName = createElementForm('input','name__input', labelName);
        inputName.type ='text';

        const labelPurpose = createElementForm('label','purpose__label', mainDataForm);
        labelPurpose.innerText = `Purpose of the visit`;
        const inputPurpose = createElementForm('input','purpose__input', labelPurpose);
        inputPurpose.type ='text';

        const labelDescription = createElementForm('label','description__label', mainDataForm);
        labelDescription.innerText = `Short description of the visit`;
        const inputDescription = createElementForm('textarea','description__textarea', labelDescription);

        const labelUrgency = createElementForm('label','urgency__label', mainDataForm);
        labelUrgency.innerText = 'The urgency of the visit:';
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
            <input class="last-visite__input" type="date">
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
        const cardField = document.querySelector('.field-card__list');
        const card = createElementForm('div','card',cardField);
        card.dataset.id = this.id;
        const buttonUpdate = createElementForm('button','card__button-more',card);
        buttonUpdate.innerText = 'Редагувати';
        card.insertAdjacentHTML('afterbegin', `
        <h2 class="card__title">${this.title}</h2>
        <p class="card__name">Ім'я:${this.name}</p>
        <p class="card__doctor">До якого лікаря:${this.doctor}</p>`);
        const buttonMore = createElementForm('button','card__button-more',card);
        buttonMore.innerText = 'Більше інформації';
        console.log(this.name);
        buttonUpdate.addEventListener('click', (event) => {
            console.log(event.currentTarget);
            console.log(event.target);
        })
        buttonMore.addEventListener('click', () => {
            this.moreInformation(card,buttonMore);
            buttonMore.style.display ='none';
        })


    }
    moreInformation(card,button){
        const cardMore = createElementForm('div','card__more',card);
        cardMore.dataset.id = this.id;
        cardMore.insertAdjacentHTML('afterbegin', `
        <p class="card__purpose">Ціль візиту: ${this.purpose}</p>
        <p class="card__description">Короткий опис: ${this.description}</p>
        <p class="card__urgency">Терміновість: ${this.urgency}</p>`);
        this.specificInformation(cardMore);
        const buttonHide = createElementForm('button', 'card__button-hide',card);
        buttonHide.innerText ='Сховати';
        buttonHide.addEventListener('click', () => {
            cardMore.remove();
            button.style.display = 'block';
            buttonHide.style.display = 'none';
        })
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
        console.log(this.lastVisit);
        card.insertAdjacentHTML('beforeend', `<p class="card__last-visite">Дата останнього візиту: ${this.lastVisit}</p>`);
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
        card.insertAdjacentHTML('beforeend', `<p class="card__mass">Індекс ваги: ${this.mass}</p>
        <p class="card__pressure">Звичний артеріальний тиск: ${this.pressure}</p>
        <p class="card__diseases">перенесені захворювання серцево-судинної системи: ${this.diseases}</p>
        <p class="card__age">Вік: ${this.age}</p>`);
    }
}

class VisitTherapist extends Visit{
    constructor(clientMainData){
        super(clientMainData);
        this.age = clientMainData.age;
    }
    specificInformation(card){
        card.insertAdjacentHTML('beforeend', `<p class="card__last-visite">Вік: ${this.age}</p>`);
    }
}

