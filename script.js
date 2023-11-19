// Função para exibir mensagens de erro
function displayError(message) {
    const errorMessage = document.getElementById('mensagemErro');
    errorMessage.textContent = message;
}

// Função para exibir dados de clima no card
function displayWeatherData(data) {
    const weatherCard = document.getElementById('cartaoClima');

    // Limpa a mensagem de erro
    displayError('');

    // Preenche os dados do clima
    document.getElementById('nomeCidade').textContent = data.name;
    document.getElementById('temperatura').textContent = `Temperatura: ${data.main.temp}°C`;
    document.getElementById('temperaturaMinima').textContent = `Mínima: ${data.main.temp_min}°C`;
    document.getElementById('temperaturaMaxima').textContent = `Máxima: ${data.main.temp_max}°C`;
    document.getElementById('textoClima').textContent = `Clima: ${data.weather[0].description}`;
    document.getElementById('umidade').textContent = `Umidade: ${data.main.humidity}%`;
    document.getElementById('vento').textContent = `Vento: ${data.wind.speed} m/s`;
    document.getElementById('informacoesAdicionais').textContent = `Sensação térmica de ${data.main.feels_like}°C`;

    // Exibe o card apenas quando há dados válidos
    weatherCard.style.display = 'block';
}

// Função para obter dados de clima
function getWeather() {
    const cityInput = document.getElementById('entradaCidade');
    const cityName = cityInput.value.trim(); // Remove espaços em branco do início e do final
    cityInput.value = '';

    const loadingMessage = document.getElementById('mensagemCarregamento');

    // Limpa mensagens de erro
    displayError('');

    // Verifica se o campo de entrada está vazio
    if (!cityName) {
        displayError('Insira o nome de uma cidade.');
        return;
    }

    loadingMessage.style.display = 'block';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3adf342557400a33545abde1b7a7bca9&units=metric&lang=pt_br`)
        .then(response => {
            loadingMessage.style.display = 'none';

            if (!response.ok) {
                // Se a resposta não for OK, trata como erro
                throw new Error('Cidade não encontrada');
            }

            return response.json();
        })
        .then(data => {
            if (!data || !data.name || !data.main || !data.weather) {
                throw new Error('Dados de clima inválidos.');
            }

            // Exibe os dados do clima
            displayWeatherData(data);
        })
        .catch(error => {
            // Exibe a mensagem de erro
            displayError(error.message);
        });
}

// Adiciona um ouvinte de evento ao botão
document.querySelector('button').addEventListener('click', getWeather);

// Adiciona um ouvinte de evento ao campo de entrada para a tecla Enter
document.getElementById('entradaCidade').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Impede que o formulário seja enviado
        getWeather();
    }
});
