# 🌤️ Weather App

Aplicação simples de clima desenvolvida em **JavaScript**, que permite ao usuário buscar informações meteorológicas de uma cidade utilizando a **API Open-Meteo**.

## 📌 Funcionalidades
- Busca de clima a partir do nome da cidade (ex: Olinda, Tokyo)
- Conversão de cidade em latitude e longitude via geocodificação
- Exibição de dados climáticos atuais
- Tratamento básico de erros (cidade inválida ou falha na API)

## 🛠️ Tecnologias utilizadas
- JavaScript (ES6)
- HTML
- CSS
- API Open-Meteo
- Fetch API

## ⚙️ Como funciona
1. O usuário informa o nome da cidade.
2. A aplicação utiliza a API de **Geocodificação do Open-Meteo** para obter latitude e longitude.
3. Com essas coordenadas, é feita a requisição do clima atual.
4. Os dados são exibidos de forma amigável na interface.

## 🚀 Como executar o projeto
1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/weather-app.git
