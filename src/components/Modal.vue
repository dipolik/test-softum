<template>
  <div>
    <div class="modal" id="calendarModal" :class="{ show: modalVisibleStatus }">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <button
                type="button"
                class="close"
                @click="modalStatusControll(modalOpened)"
            >
              <span>&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <!-- Date -->
            <div class="form-group text-left">
              <label>Выберите дату</label>

              <datepicker
                  class="form-control input-datepicker"
                  v-model="pickedDate"
                  :locale="calendarSettings.locale"
                  :inputFormat="dateFormat"
              />

              <div
                  v-if="pickedDate && !dateIsValid && dataIsValidated"
                  class="text-danger"
              >
                Дата должна быть в промежутке
                {{ minDateSelectedFormatted }} -
                {{ maxDateSelectedFormatted }}
              </div>
            </div>

            <!-- Currency -->
            <div class="form-group text-left">
              <label>Выберите валюту</label>
              <custom-select
                  :options="getCurrencyData"
                  @select="selectCurrency"
              ></custom-select>
            </div>
          </div>

          <div class="modal-footer">
            <button
                @click="checkData"
                class="btn btn-primary"
                :disabled="checkIsDisabled"
            >
              Проверить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vue3-datepicker";
import CustomSelect from "@/components/CustomSelect";
import {sub, format, isWithinInterval} from "date-fns";
import ru from "date-fns/locale/ru";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Modal",
  components: {
    CustomSelect,
    Datepicker
  },
  props: {
    modalVisibleStatus: {
      type: Boolean
    }
  },
  data() {
    return {
      dateFormat: "dd-MM-yyyy",
      pickedDate: null,

      minDateSelected: null,
      maxDateSelected: null,
      minDateSelectedFormatted: "",
      maxDateSelectedFormatted: "",
      selectedCurrency: null,
      dataIsValidated: false,
      dateIsValid: null,
      currencyIsValid: null,
      modalOpened: false,
      calendarSettings: {
        locale: ru
      }
    };
  },
  mounted() {
    this.setDateRules();
  },

  computed: {
    ...mapGetters(["getPrivatBankData", "getCurrencyData"]),

    checkIsDisabled() {
      return !this.pickedDate || !this.selectedCurrency;
    }
  },

  methods: {
    ...mapActions(["takePrivatBankData", "saveUserCurrency"]),

    setDateRules() {
      const todayDate = new Date();

      this.minDateSelected = sub(todayDate, {years: 2});
      this.maxDateSelected = todayDate;

      this.minDateSelectedFormatted = format(
          this.minDateSelected,
          "dd-MM-yyyy"
      );
      this.maxDateSelectedFormatted = format(
          this.maxDateSelected,
          "dd-MM-yyyy"
      );
    },

    async checkData() {
      // check date
      this.dateIsValid = isWithinInterval(this.pickedDate, {
        start: this.minDateSelected,
        end: this.maxDateSelected
      });

      // check currency
      this.currencyIsValid = this.selectedCurrency;
      this.dataIsValidated = true;

      if (this.dateIsValid && this.currencyIsValid) {
        const dateFormatted = format(this.pickedDate, "dd.MM.yyyy");
        await this.takePrivatBankData(dateFormatted);
        this.saveUserCurrency(this.selectedCurrency);
      }
    },

    selectCurrency(option) {
      this.selectedCurrency = option;
      this.saveUserCurrency(this.selectedCurrency);
    },

    modalStatusControll(modalStatus) {
      this.modalOpened = modalStatus;
      this.$emit("close-modal", modalStatus);
    }
  }
};
</script>

<style lang="scss">
.modal {
  &.show {
    display: block;
  }
}

.input-datepicker:read-only {
  background-color: #ffffff !important;

  &:hover {
    cursor: pointer;
  }
}

.button {
  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
