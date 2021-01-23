import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./router.js";

Vue.use(Vuex);
Vue.use(Vuex);

export const mutations = {
  login: function(state, user) {
    state.loginState = { ...state.loginState, loggedIn: true, user: user};
  },
  logout: function(state) {
    state.loginState = { ...state.loginState, loggedIn: false };
  },
  storeItems(state, items) {
    state.spices = items;
  },
  storeTags(state, tags) {
    state.tags = tags;
  },
  appendTag(state, tag) {
    state.tags = [...state.tags, tag];
  },
  getBanners(state, banners){
    state.banners = banners;
  },
  deleteBanner(state,banner){
    state.banners = state.banners.filter(b => b.id !== banner.id);
  },
  updateSpice(state, spice) {
    state.spices = state.spices.map(s => (s.id === spice.id ? spice : s));
  },
  deleteSpice(state, spice) {
    state.spices = state.spices.filter(s => s.id !== spice.id);
  },
  createSpice(state, spice) {
    state.spices = [...state.spices, { ...spice}];
  },
  softUpdateSpice(state, spice) {
    state.spices = state.spices.map(s => (s.id === spice.id ? spice : s));
  },
  addToCart(state, item) {
    state.cart = [...state.cart, {... item}];
  },
  deleteCartItem(state, index) {
    state.cart = state.cart.filter(item => item.index !== index);
  },
  updateCartItem(state, item) {
    state.cart = state.cart.map(i => (i.index === item.index ? item : i));
  },
  clearCart(state) {
    state.cart = [];
  },
  storeOrders(state, orders) {
    state.orders = orders;
  },
  updateOrder(state, order) {
    state.orders = state.orders.map(o => (o.id === order.id ? order : o));
  },
  storeAllOrders(state, orders) {
    state.orders = orders;
  },
  storeStaff(state, staff) {
    state.staff = staff;
  },
  assignShopTag(state, tag) {
    state.shopTag = tag;
  },
  setShopSale(state, bool) {
    state.shopSale = bool;
  }
};

export const actions = {
  login: function({ commit }, payload) {
    const { email, password } = payload;
    return axios.post("/api/login", { email, password }).then((response) => {
      commit("login", response.data);
      // return dispatch("loadTodos");
    });
  },
  logout: function({ commit }) {
    return axios.get("/api/logout").then(() => {
      commit("logout");
    });
  },
  signup: function({commit}, payload){
    const {firstname, lastname, email, password} = payload;
    return axios.post("/api/signup", {firstname, lastname, email, password});
  },
  getAccounts({ commit }){
    return axios.get("/api/staff").then((response) => {
      commit("storeStaff", response.data);
      return response.data;
    })
  },
  createAlert({commit}, payload) {
    return axios.post("/api/staff_alert", payload).then((response) => {
      return response.data;
    })
  },
  getAlerts({commit}){
    return axios.get("/api/staff_alert").then((response) => {
      return response.data;
    })
  },
  updatePerm({ commit }, payload){
    return axios.put("/api/updatePerm", payload).then((response) => {
    })
  },
  getItems: function({commit}, payload){
    return axios.get("/api/item", payload).then((response) => {
      commit("storeItems", response.data);
    })
  },
  addBanner({commit}, banner) {
    return axios.post("/api/announcement", banner);
  },
  getBanners({commit}){
    return axios.get("/api/announcement").then((response) => {
      commit("getBanners", response.data);
    })
  },
  deleteBanner:function({commit}, payload) {
    return axios.delete(`/api/announcement/${payload.id}`).then(() => {
      commit("deleteBanner", payload);
    })
  },
  checkLoggedIn({ commit }) {
    return axios.get("/api/checkLogin").then((response) => {
      commit("login", response.data);
    }).catch((error) => {
      console.log(error);
    });
  },
  authorized({ commit }, permReq){
    axios.get("/api/checkLogin").then((response) => {
      if (response.data.permission > permReq) {
        router.push({path: "/"});
      }
    }).catch((error) => {
      if (error.response && error.response.status == 401){
        router.push({path: "/"});
      }
    })
  },
  getTags:function({commit}, payload) {
    return axios.get("/api/tag", payload).then((response) => {
      commit("storeTags", response.data);
    });
  },
  addTag:function({commit}, payload) {
    return axios.post("/api/tag", {title: payload}).then((response) => {
      commit("appendTag", response.data);
    })
  },
  deleteTag:function({commit}, payload){
    return axios.delete(`/api/tag/${payload.id}`, payload);
  },
  createSpice:function({commit}, payload) {
    return axios.post("/api/item", payload).then((response) => {
      commit("createSpice", response);
    })
  },
  updateSpice:function({commit}, payload) {
    var t = {};
    t.itemID = payload.id;
    t.tags = payload.tags;
    return axios.put(`/api/item/${payload.id}`, payload).then((response) => {
      return axios.post('/api/item_tag_1', t).then((response) => {
        return axios.get("/api/item", payload).then((response) => {
          commit("storeItems", response.data);
        })
      })
    })
  },
  deleteSpice:function({commit}, payload) {
    return axios.delete(`/api/item/${payload.id}`, payload).then(() => {
      commit("deleteSpice", payload);
    })
  },
  softUpdateSpice:function({commit}, payload) {
    commit("softUpdateSpice", payload);
  },
  addToCart: function({commit}, payload) {
    commit("addToCart", payload);
  },
  updateCartItem: function({commit}, payload) {
    commit("updateCartItem", payload);
  },
  deleteCartItem: function({commit}, payload) {
    commit("deleteCartItem", payload);
  },
  sendOrder: function({commit}, payload) {
    var items = {};
    for (var i = 0; i < this.state.cart.length; i++) {
      var item = this.state.cart[i];
      items["" + item.spice.id] = {weight: item.amount};
    }
    return axios.post(`/api/cart/`, Object.assign({}, {address: payload, order_items: items})).then((response) => {
      commit("clearCart");
    })
  },
  getOrders: function({commit}) {
    return axios.get(`/api/order`).then(response => {
      commit("storeOrders", response.data);
    })
  },
  updateOrder: function({commit}, payload) {
    return axios.put(`/api/order/${payload.id}`, payload).then(response => {
      commit("updateOrder", response.data);
    })
  },
  getAllOrders: function({commit}) {
    return axios.get(`/api/order_all`).then(response => {
      commit("storeAllOrders", response.data);
      return response.data;
    })
  },
  getUser: function({commit}, id){
    return axios.get(`/api/login/${id}`).then((response) => {
      return response.data;
    })
  },
  assignShopTag: function({commit}, tag) {
    commit("assignShopTag", tag);
  },
  setShopSale: function({commit}, bool) {
    commit("setShopSale", bool);
  }
};

export default new Vuex.Store({
  state: {
    loginState: {
      loggedIn: false,
      user: {}
    },
    spices: [],
    orders: [],
    tags: [],
    shopTag: null,
    shopSale: false,
    cart: [],
    banners: [],
    staff: []
  },
  mutations,
  actions
});
