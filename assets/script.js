let questaoAtual = 0;
let respostasCorretas = 0;

mostrarQuestao();

// events
document.querySelector('.scoreArea button').addEventListener('click', resetarQuiz)

// functions
function mostrarQuestao() {
  if (questions[questaoAtual]) {
    let q = questions[questaoAtual];

    let porcentagem = Math.floor((questaoAtual / questions.length) * 100);

    document.querySelector(".progress--bar").style.width = `${porcentagem}%`;

    document.querySelector(".scoreArea").style.display = "none";
    document.querySelector(".questionArea").style.display = "block";

    document.querySelector(".question").innerHTML = q.question;
    document.querySelector(".options").innerHTML = "";

    let optionsHtml = "";

    for (let i in q.options) {
      optionsHtml += `<div data-op="${i}" class="option"><span>${
        parseInt(i) + 1
      }</span>${q.options[i]}</div>`;
    }

    document.querySelector(".options").innerHTML = optionsHtml;

    document.querySelectorAll(".options .option").forEach((item) => {
      item.addEventListener("click", optionClickEvent);
    });
  } else {
    // acabaram as questões
    finishQuiz();
  }
}

function optionClickEvent(e) {
  let clickedOption = parseInt(e.target.getAttribute("data-op"));

  if (questions[questaoAtual].answer === clickedOption) {
    respostasCorretas++;
  }

  questaoAtual++;
  mostrarQuestao();
}

function finishQuiz() {
  let pontos = Math.floor((respostasCorretas / questions.length) * 100);

  if(pontos < 30){
    document.querySelector(".scoreText1").innerHTML = 'Ta horrível, que vergonha!'
    document.querySelector(".scorePct").style.color = '#FF0000'
  }else if(pontos >= 30 && pontos < 70){
    document.querySelector(".scoreText1").innerHTML = 'Muito bom!'
    document.querySelector(".scorePct").style.color = '#FFFF00'
  }else if(pontos >= 70){
    document.querySelector(".scoreText1").innerHTML = 'Parabéns'
    document.querySelector(".scorePct").style.color = '#0d630d'
  }

  document.querySelector('.scorePct').innerHTML = `Acertou ${pontos}%`
  document.querySelector(".scoreText2").innerHTML = `Você respondeu ${questions.length} questões e acertou ${respostasCorretas}`

  document.querySelector(".scoreArea").style.display = "block";
  document.querySelector(".questionArea").style.display = "none";
  document.querySelector(".progress--bar").style.width = "100%";
}

function resetarQuiz(){
  respostasCorretas = 0
  questaoAtual = 0
  mostrarQuestao()
}
