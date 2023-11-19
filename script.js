function getWeather() {
    const cityInput = document.getElementById('entradaCidade');
    const cityName = cityInput.value;
    cityInput.value = '';

    const loadingMessage = document.getElementById('mensagemCarregamento');
    const errorMessage = document.getElementById('mensagemErro');
    const weatherCard = document.getElementById('cartaoClima');

    // Verifica se o campo de entrada está vazio
    if (!cityName) {
        errorMessage.textContent = 'Por favor, insira o nome de uma cidade.';
        return;
    }

    loadingMessage.style.display = 'block';
    errorMessage.textContent = '';
    weatherCard.style.display = 'none';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3adf342557400a33545abde1b7a7bca9&units=metric&lang=pt_br`)
        .then(response => response.json())
        .then(data => {
            loadingMessage.style.display = 'none';

            if (data.cod !== 200) {
                errorMessage.textContent = data.message;
            } else {
                document.getElementById('nomeCidade').textContent = data.name;
                document.getElementById('temperatura').textContent = `Temperatura: ${data.main.temp}°C`;
                document.getElementById('temperaturaMinima').textContent = `Mínima: ${data.main.temp_min}°C`;
                document.getElementById('temperaturaMaxima').textContent = `Máxima: ${data.main.temp_max}°C`;
                document.getElementById('textoClima').textContent = `Clima: ${data.weather[0].description}`;
                document.getElementById('umidade').textContent = `Umidade: ${data.main.humidity}%`;
                document.getElementById('vento').textContent = `Vento: ${data.wind.speed} m/s`;
                document.getElementById('informacoesAdicionais').textContent = `Sensação térmica de ${data.main.feels_like}°C`;

                weatherCard.style.display = 'block';
            }
        })
        .catch(() => {
            loadingMessage.style.display = 'none';
            errorMessage.textContent = 'Ocorreu um erro ao buscar os dados do clima.';
        });
}

// Adiciona um ouvinte de evento ao campo de entrada
document.getElementById('entradaCidade').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});

