//load view
import Home from "./views/Home.js";
import Details from "./views/Details.js";
import About from "./views/About.js";

//9 expressions regulieres
//     /details/2
const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );
  //console.log(Array.from(match.route.path.matchAll(/:(\w+)/g)))
  //return {}

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

// 1 router
const router = async () => {
  const routes = [
    { path: "/", view: Home },
    { path: "/details/:ticker", view: Details },
    { path: "/about", view: About },
  ];

  // 2 match function
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      //isMatch: location.pathname === route.path
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });
  //console.log(potentialMatches)

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    match = {
      route: routes[0],
      //isMatch: true
      result: [location.pathname],
    };
  }
  //console.log(match.result)
  //console.log(match.route.view())
  const view = new match.route.view(getParams(match));
  //console.log(getParams(match))
  document.querySelector("#app").innerHTML = await view.getHtml();
};

//4 recuperer pathname
const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

//
window.addEventListener("popstate", router);

//5
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});

