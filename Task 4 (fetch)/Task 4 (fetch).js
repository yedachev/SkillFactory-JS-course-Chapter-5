const resultNode = document.querySelector('.j-result');
const btnNode = document.querySelector('.j-btn-request');
const inputWidthNode = document.querySelector('.j-input-width');
const inputHeightNode = document.querySelector('.j-input-height');

function displayResult(imageUrl) {
  resultNode.innerHTML = `
    <div class="card">
      <img
        src="${imageUrl}"
        class="card-image"
      />
    </div>
  `;
}

btnNode.addEventListener('click', () => {
  const width = Number(inputWidthNode.value);
  const height = Number(inputHeightNode.value);

  if (
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width < 100 ||
    width > 300 ||
    height < 100 ||
    height > 300
  ) {
    resultNode.textContent = 'одно из чисел вне диапазона от 100 до 300';
    return;
  }

  fetch(`https://picsum.photos/${width}/${height}`)
    .then(response => {
      displayResult(response.url);
    })
    .catch(() => {
      resultNode.textContent = 'Не удалось загрузить изображение';
    });
});
