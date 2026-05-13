const resultNode = document.querySelector('.j-result');
const btnNode = document.querySelector('.j-btn-request');
const inputPageNode = document.querySelector('.j-input-page');
const inputLimitNode = document.querySelector('.j-input-limit');

function displayResult(apiData) {
  let cards = '';
  apiData.forEach(function(item) {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });
  resultNode.innerHTML = cards;
}

const lastResult = localStorage.getItem('lastResult');
if (lastResult) {
  displayResult(JSON.parse(lastResult));
}

function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
      resultNode.innerHTML = 'Не удалось загрузить изображения';
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };
  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
    resultNode.innerHTML = 'Не удалось загрузить изображения';
  };
  xhr.send();
}

btnNode.addEventListener('click', function() {
  const page = Number(inputPageNode.value);
  const limit = Number(inputLimitNode.value);

  const pageValid = Number.isInteger(page) && page >= 1 && page <= 10;
  const limitValid = Number.isInteger(limit) && limit >= 1 && limit <= 10;

  if (!pageValid || !limitValid) {
    if (!pageValid && !limitValid) {
      resultNode.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10';
      return;
    }
    if (!pageValid) {
      resultNode.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
      return;
    }
    resultNode.innerHTML = 'Лимит вне диапазона от 1 до 10';
    return;
  }

  useRequest(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`, function(data) {
    localStorage.setItem('lastResult', JSON.stringify(data));
    displayResult(data);
  });
});
