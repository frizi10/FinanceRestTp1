import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Home");
  }

  //cette fonction va recupérer les données et le html à injecter dans notre #pp
  async getHtml() {
    async function getData(url) {           //on recuere les donnees d<une maniere asynchrone a partir du url
      const response = await fetch(url);
      return response.json();
    }

    let data = await getData("/static/js/views/tickers.json");
    data = data["results"];
//On construit le Html
    let listTickers = "<ul>";
    for (let i in data) {
      listTickers +=
        "<li><a href='/details/" +
        data[i].ticker +
        "' data-link>" +
        data[i].ticker +
        "</a></li>";
    }
    listTickers += "</ul>";
    return (
      `
     <h1> LIST OF TICKERS </h1>
    ` + listTickers
    );
  }
}
