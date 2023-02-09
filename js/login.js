// email: user777@ukr.net
// pass: danit2023
// token: 9baa5726-5329-404b-a22d-44c224eaa2d2


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
        .then(response => console.log(response.forEach( e => {
            console.log(e)

        })))

}





