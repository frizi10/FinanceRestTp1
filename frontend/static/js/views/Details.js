import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle(`Details-${params.ticker}`);
  }

  async getHtml() {
    const theTicker = this.params.ticker;

    // extraire les données à partir de l'url de notre fichier tickers d'une maniere asycnchrone
    async function getData(url) {
      const response = await fetch(url);
      return response.json(); // retourner la reponse sous forme de json
    }
    let data = await getData("/static/js/views/tickers.json");
    data = data["results"];

    const titre = data.find((symbole) => symbole.ticker === theTicker);

    //cette fonction cree un tableau d'objet qui contient le nom de la prpriete et la valeurd d'un titre donné
    //ce qui va nous permettre par la suite seules proprietés qui existe dans le litre d'une maniere dynamique

    function getPropriteNamesAndValues(titre) {
      const nameAndValues = [];
      for (const propriety in titre) {
        if (titre.hasOwnProperty(propriety)) {
          nameAndValues.push({ name: propriety, value: titre[propriety] });
        }
      }

      return nameAndValues;
    }

    let nameAndValues = getPropriteNamesAndValues(titre);
    // retourner un html  d'une maniere dynamique
    let res = nameAndValues.map((element) => {
      return `

            <li>${element.name}: <strong>${element.value}</strong></li>  
           `;
    });

    return `<h1>Details Of  ${titre.name}</h1>` + res.join("");
  }
}
