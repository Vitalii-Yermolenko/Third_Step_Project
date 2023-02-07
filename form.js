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
        alert('Change urgency')
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
            const age = document.querySelector('.modal-form__input-age').value;
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
    }
    createCardMain(){
        const cardField = document.querySelector('.field-card__list');
        const card = createElementForm('div','card',cardField);
        card.dataset.id = this.id;
        card.insertAdjacentHTML('afterbegin', `
        <div class="card" data-id='${this.id}'>
        <h2 class="card__title">${this.title}</h2>
        <p class="card__name">Ім'я:${this.name}</p>
        <p class="card__doctor">До якого лікаря:${this.doctor}</p>
        </div>`);
        const buttonMore = createElementForm('button','card__button-more',card);
        buttonMore.innerText = 'Більше інформації';
        buttonMore.addEventListener('click', () => {
            this.moreInformation(card,clientMainData);
        })

    }

    moreInformation(card, data){
        console.log('more information');
    }
}

class VisitDentist extends Visit{
    constructor(clientMainData){
        super(clientMainData);
        this.lastVisit = clientMainData.lastVisit;
    }
    moreInformation(card, data){
        console.log('more information dentist', this.name, data.name);
    }
}

class VisitCardiologist extends Visit{
    constructor(clientMainData, mass, pressure, diseases, age){
        super(clientMainData);
        this.mass = mass;
        this.pressure = pressure;
        this.diseases = diseases;
        this.age = age;
    }
    moreInformation(card,data){
        console.log('more information cardio');
    }
}

class VisitTherapist extends Visit{
    constructor(clientMainData,age){
        super(clientMainData);
        this.age = age;
    }
    moreInformation(card){
        console.log('more information therapist');
    }
}



// export {newVisite};