<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12 nav-wrapper">
          <router-link class="btn btn-primary" to="/">Вернутся на главную</router-link>
        </div>
        <div class="col-12">
          <h2 class="text-center text-center mb-5">Результат:</h2>
          <div class="d-flex flex-row w-50 justify-content-between global-info">
            <p class="text-center"><span class="font-weight-bold">Дата:</span> {{ getUserData.choosenDate }}</p>
            <p class="text-center"><span class="font-weight-bold">Валюта:</span> {{ getUserData.currency }} </p>
          </div>

          <br/>

          <div v-for="result in resultData" class="d-flex justify-content-start result-container ">
            <p class="item-name">{{ result.name }}:</p>
            <p class="item-value ">{{ result.simpleValue }}</p>
            <p class="item-value item-value-sum ">{{ result.sum }}</p>
            <p class="item-value item-value-boolean">{{ result.oddEven }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from "vuex";

export default {
  data() {
    return {
      resultData: null
    };
  },

  computed: {
    ...mapState([
      "currencyData", "userData"
    ]),

    ...mapGetters(["getCurrencyData", "getUserData", "getChosenCurrencyInfo"])
  },

  mounted() {
    this.initValues();
  },

  beforeUnmount() {
    this.resultData = null
  },

  methods: {
    initValues() {
      let entriesNumbers = Object.values(this.getChosenCurrencyInfo);
      let numberEntries = [];
      entriesNumbers.forEach(function (item) {
        if (typeof item !== "string") {
          numberEntries.push(item);
        }
      });
      let entriesKeys = Object.keys(this.getChosenCurrencyInfo);
      let keysArr = [];
      entriesKeys.forEach(function (item) {
        keysArr.push(item);
      });
      let arrKeys = keysArr.splice(2, 4);
      let sumArr = numberEntries.map(function (num) {
        let numStr = num.toString();
        let filterNum = numStr.replace(/[\s.]/g, "");
        let numToArr = [...filterNum];
        let result = numToArr.map((e) => parseInt(e)).reduce((a, b) => a + b);
        return result;
      });
      let evenOddArray = numberEntries.map(function (num) {
        return Math.floor(num) % 2 == 0;
      });
      let valuesArr = [];
      numberEntries.forEach(function (item, index) {
        valuesArr.push(
            {
              name: arrKeys[index],
              simpleValue: item,
              sum: sumArr[index],
              oddEven: evenOddArray[index]
            }
        );
      });
      this.resultData = valuesArr;
    }
  }
};
</script>

<style lang="scss">
.nav-wrapper {
  margin-bottom: 30px;
  margin-top: 15px;
}

.global-info, .result-container {
  margin: 0 auto;
  max-width: 400px;
}

.result-container {
  .item-name {
    font-weight: 600;
    min-width: 120px;
    margin-right: 10px;
  }

  .item-value {
    min-width: 50px;

    &-sum {
      min-width: 40px;
      margin-left: auto;
      text-align: center;
    }

    &-boolean {
      min-width: 30px;
      margin-left: auto;
    }
  }
}
</style>