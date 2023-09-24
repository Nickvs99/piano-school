import { createRouter, createWebHistory } from "vue-router";

import AboutView from "@/views/AboutView.vue";
import HomeView from "@/views/HomeView.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/about",
        name: "about",
        component: AboutView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

/**
 * Since this is a SPA, directly going to a url would not work, when
 * the site is published on github pages. Instead github pages would throw a 404 error. 
 * This then displays the 404.html in the public directory. This file redirects to the index
 * page with a string query. This string query is catched by vue and the user is redirected
 * accordingly.
 */
router.beforeEach(to => {    
    if (to.query.redirect) {
        let direct = to.query.redirect.replace(" ", "%20");
        router.replace(direct);
        return;
    }
});

export default router;
