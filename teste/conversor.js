
async function fetchCurrencyRates() {
    try {
      const response = await fetch("https://economia.awesomeapi.com.br/json/all");
      if (!response.ok) {
        throw new Error('Falha ao obter dados');
      }
      return await response.json();
    } catch (error) {
      alert('Erro! O site não conseguiu carregar os valores atuais da cotação. Tente novamente mais tarde. :(');
      return {};
    }
  }
  
  let resultado = {};
  
  async function initialize() {
    resultado = await fetchCurrencyRates();
  }
  
  initialize();
  

  function converter() {
    const entrada = document.querySelector("#entrada").value;
    const moedaSelecionada = document.querySelector("#moedas").value;
  
    if (entrada.trim() === "" || isNaN(entrada) || moedaSelecionada === "NULL") {
      alert("Por favor, digite um valor válido e selecione uma moeda.");
      return;
    }
  
    const numeroDigitado = parseFloat(entrada);
    if (numeroDigitado <= 0) {
      alert("Valor inválido! Digite somente valores positivos e diferentes de zero.");
      return;
    }
  
    const bid = resultado[moedaSelecionada]?.bid;
    if (!bid) {
      alert("Cotação não disponível para a moeda selecionada.");
      return;
    }
  
    const calculo = (numeroDigitado * parseFloat(bid)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const numeroFormatado = numeroDigitado.toLocaleString('en-US', { style: 'currency', currency: moedaSelecionada });
    
    document.querySelector("#saida").innerHTML = `Resultado: ${numeroFormatado} = ${calculo}`;
    atualizarHorario(moedaSelecionada);
  }
  

  function atualizarHorario(codigoMoeda) {
    const data = resultado[codigoMoeda]?.create_date;
    if (!data) {
      document.querySelector("#atualizacao").innerHTML = 'Horário da última atualização não disponível.';
      return;
    }
  
    const [ano, mes, dia] = data.substring(0, 10).split('-');
    const hora = data.substring(11, 16);
    const dataFormatada = `${dia}/${mes}/${ano} às ${hora}`;
    
    document.querySelector("#atualizacao").innerHTML = 'Cotação atualizada em ' + dataFormatada;
  }
  