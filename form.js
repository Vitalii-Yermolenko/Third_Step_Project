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
    return fetch("https://ajax.test-danit.com/api/v2/cards", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: 'Визит к кардиологу',
          description: 'Плановый визит',
          doctor: 'Cardiologist',
          bp: '24',
          age: 23,
          weight: 70
        })
      })
        .then(response => response.json())
        .then(response => console.log(response))
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
        const divDentist = createElementForm('div', 'modal-form__doctor', parent);
        const labelDentist = createElementForm('label', 'dantist__label', divDentist);
        labelDentist.innerText = 'Last visite to datist';
        const inputlastVisit = createElementForm('input', 'modal-form__input-last-visite', divDentist);
        inputlastVisit.type = 'date';
    }
    createCardiologistBlock(parent){
        const divCardiologist = createElementForm('div', 'modal-form__doctor', parent);

        const labelMass = createElementForm('label', 'therapist__label-age', divCardiologist);
        labelMass.innerText = `Visiter's mass`;
        const inputMass = createElementForm('input', 'modal-form__input-mass', labelMass);
       
        const labelPress = createElementForm('label', 'therapist__label-age', divCardiologist);
        labelPress.innerText = `Visiter's pressure`;
        const inputPress = createElementForm('input', 'modal-form__input-pressure', labelPress);
        
        const labelDiseases = createElementForm('label', 'therapist__label-age', divCardiologist);
        labelDiseases.innerText = `Visiter's diseases`;
        const inputDiseases = createElementForm('input', 'modal-form__input-diseases', labelDiseases);

        const labelAge = createElementForm('label', 'therapist__label-age', divCardiologist);
        labelAge.innerText = `Visiter's age`;
        const inputAge = createElementForm('input', 'modal-form__input-age', labelAge);
    }
    createTherapistBlock(parent){
        const divTherapist = createElementForm('div', 'modal-form__doctor', parent);
        const labelAge = createElementForm('label', 'modal-form__label-age', divTherapist);
        labelAge.innerText = `Visiter's age`;
        const inputAge = createElementForm('input', 'modal-form__input-age', divTherapist);
    }

    submitBlock(parent){ 
        let newVisite;   
        const mainDataVisite = {};
        const submitButton = createElementForm('button', 'modal-form__button-submit', parent);
        submitButton.innerText = "Submit data";
        submitButton.addEventListener('click', (event) => {
            event.preventDefault();
            const doctor = document.querySelector('.list-doctor__select').value;
            if(doctor === ' '){
                alert('Change doctor')
                return;
            }
            if(doctor){
                mainDataVisite.doctor = doctor;
            }
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
                const lastVisit = document.querySelector('.modal-form__input-last-visite').value;

                newVisite = new VisitDentist(mainDataVisite, lastVisit);
            }
            if(doctor === 'Cardiologist'){
                const age = document.querySelector('.modal-form__input-age').value;
                const mass = document.querySelector('.modal-form__input-mass').value;
                const pressure = document.querySelector('.modal-form__input-pressure').value;
                const diseases = document.querySelector('.modal-form__input-diseases').value;
                newVisite = new VisitDentist(mainDataVisite, mass, pressure, diseases, age);
            }
            if(doctor=== 'Therapist'){
                const age = document.querySelector('.modal-form__input-age').value;
                newVisite = new VisitDentist(mainDataVisite, age);
            }
            console.log(newVisite);
        })

    }

    updateData (){
        this.createModal();

    }
}



class Visit {
    constructor(clientMainData){
        this.doctor = clientMainData.doctor;
        this.name = clientMainData.name;
        this.purposeVisite = clientMainData.purposeVisite;
        this.urgency = clientMainData.urgency;
        this.discriprionVisite = clientMainData.discriprionVisite;
    }

}

class VisitDentist extends Visit{
    constructor(clientMainData,lastVisit){
        super(clientMainData);
        this.lastVisit = lastVisit;
    }
}

class VisitCardiologist extends Visit{
    constructor(clientMainData){
        super(clientMainData);

    }
}

class VisitTherapist extends Visit{
    constructor(clientMainData,age){
        super(clientMainData);
        this.age = age;
    }
}

