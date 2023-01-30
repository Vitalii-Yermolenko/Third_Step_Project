const userEmail = 'user777@ukr.net'
const userPassword = 'danit2023'

async function init() {
    if (localStorage.getItem('token')) {
        console.log('logined');
        await getCards();
    } else {
        await login();
        await getCards();
    }
}

function login() {
    return fetch('https://ajax.test-danit.com/api/v2/cards/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: pass }),
    })
        .then((response) => response.text())
        .then((token) => {
            console.log(token);
            localStorage.setItem('token', token);
        });
}

function getCards() {
    return fetch('https://ajax.test-danit.com/api/v2/cards', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
        .then((r) => r.json())
        .then((d) => {
            console.log(d);
        });
}

init();
