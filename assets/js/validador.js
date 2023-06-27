const camposDoFormulario = document.querySelectorAll('[required]');
const button = document.querySelector('#button');
button.disabled = true;

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    //campo.addEventListener("invalid", evento => evento.preventDefault());

})

function verificaCampo(campo) {
    let mensagem = "";
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
        }
    })
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }

    if ((campo.name === "nome" || campo.name === "assunto") && campo.value.length > 50) {
        mensagemErro.textContent = mensagens[campo.name].tooLong;
    }

    if (campo.name === "mensagem" && campo.value.length > 300) {
        mensagemErro.textContent = mensagens[campo.name].tooLong;
    }

    verificarFormulario();
}

function verificarFormulario() {
    const inputsValidos = Array.from(camposDoFormulario).every((campo) => campo.checkValidity());
    button.disabled = !inputsValidos;

    if (inputsValidos) {
        button.classList.remove('disabled');
        button.classList.add('enabled');
      } else {
        button.classList.remove('enabled');
        button.classList.add('disabled');
      }

}

const tiposDeErro = [
    'tooLong',
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const mensagens = {
    nome: {
        patternMismatch: "Por favor, preencha um nome válido.",
        tooLong: "Deve conter no máximo 50 caracteres.",
        valueMissing: "O campo nome não pode estar vazio.",
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    assunto: {
        valueMissing: "O campo assunto não pode estar vazio.",
        patternMismatch: "Por favor, preencha um assunto válido.",
        tooLong: "Deve conter no máximo 50 caracteres."
    },
    mensagem: {
        valueMissing: "O campo mensagem não pode estar vazio.",
        patternMismatch: "Por favor, preencha com uma mensagem válida.",
        tooLong: "Deve conter no máximo 300 caracteres."
    },
}