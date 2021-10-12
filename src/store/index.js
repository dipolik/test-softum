import { createStore } from "vuex";
import axios from "axios";
import router from "../router";

export default createStore({
  state: {
    bankData: [],
    currencyData: [
      {
        name: "USD",
        id: "1"
      },
      {
        name: "EUR",
        id: "2"
      },
      {
        name: "RUB",
        id: "3"
      },
      {
        name: "PLN",
        id: "4"
      },
      {
        name: "GBP",
        id: "5"
      }
    ],
    userData: {},
    chosenCurrencyInfo: {}
  },
  actions: {
    async takePrivatBankData(ctx, date) {
      let userDate = date;

      async function sendRequest() {
        const url = `https://api.privatbank.ua/p24api/exchange_rates?json&date=${userDate}`;
        let response = await axios.get(url, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/html charset=utf-8"
          }
        });
        return response.data;
      }

      sendRequest().then(function(data) {
        ctx.commit("updatePrivatBankData", data);
        ctx.commit("updateUserDate", data);
        ctx.commit("filterDate", data);
      })
        .then(() => {
          router.push({ path: "result" });
        });
    },

    saveUserCurrency(ctx, data) {
      ctx.commit("updateUserCurrencyData", data);
    }


  },

  getters: {
    getPrivatBankData(state) {
      return state.bankData;
    },
    getCurrencyData(state) {
      return state.currencyData;
    },
    getUserData(state) {
      return state.userData;
    },
    getChosenCurrencyInfo(state) {
      return state.chosenCurrencyInfo;
    }
  },

  mutations: {
    updatePrivatBankData(state, data) {
      state.bankData = data;
    },

    updateCurrencyData(state, data) {
      state.currencyData = data;
    },

    updateUserCurrencyData(state, data) {
      state.userData.currency = data;
    },

    updateUserDate(state, data) {
      state.userData.choosenDate = data.date;
    },

    filterDate(state, data) {
      let currency = state.userData.currency;
      let exchangeRate = data.exchangeRate;

      let filteredCurrencyData = exchangeRate.filter((obj) => {
        return obj.currency === currency;
      });

      let filteredData = filteredCurrencyData[0];
      state.chosenCurrencyInfo = filteredData;

    }
  }
});
