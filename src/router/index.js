// importo le funzioni di vue router
import { createRouter, createWebHistory } from "vue-router";

// importo le pagine che voglio usare
import HomePage from "../pages/HomePage.vue";
import SuggestionFormPage from "../pages/SuggestionFormPage.vue";
import ShowPage from "../pages/ShowPage.vue"
// import NotFoundPage from "../pages/NotFoundPage.vue";

// creiamo il router e definiamo le rotte
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomePage },
    {
      path: "/suggestion",
      name: "suggestion-form",
      component: SuggestionFormPage,
    },
    {
      path: "/games/:id",
      name: "show-game",
      component: ShowPage,
    },
    // { path: "/:pathMatch(.*)*", name: "not-found", component: NotFoundPage },
  ],
});

export { router };
