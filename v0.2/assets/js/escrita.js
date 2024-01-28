function decryptEffect2(element) {
    element.classList.remove('text-invisible');
    const originalText = element.textContent;
    const duration = 40; // Duração entre cada mudança de caractere aleatório.
    const phases = 2; // Número de caracteres aleatórios antes de mostrar o original.
    element.textContent = ""; // Limpa o texto para começar a animação.
    let index = 0;
    let phaseCount = 0;
  
    function randomChar() {
      const chars =
        "▐";
      return chars.charAt(Math.floor(Math.random() * chars.length));
    }
    function randomChar2() {
      const chars =
        "⁣";
      return chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    function update() {
      if (index < originalText.length) {
        if (phaseCount < phases) {
          // Substitua o último caractere por um novo caractere aleatório.
          element.textContent =
            element.textContent.substring(0, index) +
            randomChar() +
            Array.from({ length: originalText.length - index - 1 }, () =>
              randomChar2()
            ).join("");
          phaseCount++;
          setTimeout(update, duration);
        } else {
          // Substitua o último caractere aleatório pelo caractere original.
          element.textContent =
            element.textContent.substring(0, index) +
            originalText[index] +
            Array.from({ length: originalText.length - index - 1 }, () =>
              randomChar2()
            ).join("");
          index++;
          phaseCount = 0;
          setTimeout(update, duration);
        }
      }
    }
  
    // Comece a animação preenchendo todo o texto com caracteres aleatórios.
    element.textContent = Array.from({ length: originalText.length }, () =>
      randomChar2()
    ).join("");
    setTimeout(update, duration);
  }
  
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  document.addEventListener('DOMContentLoaded', (event) => {
    const elementsToDecrypt2 = document.querySelectorAll('.text-decrypt2');
    
    function checkAndDecrypt2() {
        elementsToDecrypt2.forEach(element => {
            if (isInViewport(element) && !element.dataset.decrypted) {
                decryptEffect2(element);
                element.dataset.decrypted = 'true'; // Marcar como descriptografado para não repetir.
            }
        });
    }
  
    window.addEventListener('scroll', checkAndDecrypt2);
    setTimeout(function() {
      checkAndDecrypt2();
  }, 2000);  // atraso de 2000 milissegundos (2 segundos)
  });
  