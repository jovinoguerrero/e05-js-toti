let form = document.querySelector('#form')
let cep = document.querySelector('#inputCEP')
let info = document.querySelector('#divInfo')

document.querySelector('input').classList.add('not-validated');
document.querySelectorAll('input:required').forEach(element => element.addEventListener('keyup', validate));

form.addEventListener("submit", function(e) {
    e.preventDefault()
    pesquisaCEP(cep.value)
})

function pesquisaCEP(cep){

    // console.log(cep)
    
    let url = 'https://viacep.com.br/ws/' + cep +'/json/'

    fetch(url, {method:'get'})
    .then(response => response.json())
    .then(json => {
        info.textContent = "O CEP consultado; " + json.cep + ", fica na " + json.logradouro + ", no bairro " + json.bairro + ", no município de " + json.localidade + ", " + json.uf + "."

        // console.log(json)
    })
}

function validate(e) {
    let field = e.target;
    let cep = field.value;
    // console.log(cep)

    if (cep.length !== 8) {
        displayError('CEP não é válido', field);
    } else {
        clearError(field);
    }

    field.classList.remove('not-validated');
    checkEnableSubmit();
}

function displayError(message, field) {
    clearError(field)
    field.classList.add('is-invalid');
    let error = document.createElement('small');
    error.style.color = 'red';
    error.classList.add('error-message');
    error.textContent = message;
    field.parentElement.appendChild(error);
}

function clearError(field) {
    let container = field.parentElement;
    let error = container.querySelector('.error-message');
    if (error) {
        container.removeChild(error);
    }
    field.classList.remove('is-invalid');
}

function checkEnableSubmit() {
    let form = document.querySelector('#form');
    let notValidated = form.querySelectorAll('.not-validated');
    let errors = form.querySelectorAll('.is-invalid');
    
    if (errors.length == 0 && notValidated.length == 0) {
        enableSubmit();
    } else {
        disableSubmit();
    }
}

function enableSubmit() {
    let form = document.querySelector('#form');
    let submit = form.querySelector('[type=submit]');

    submit.disabled = false;
}

function disableSubmit() {
    let form = document.querySelector('#form');
    let submit = form.querySelector('[type=submit]');

    submit.disabled = true;
}