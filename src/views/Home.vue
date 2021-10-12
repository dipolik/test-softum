<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="content-center">
            <h2 class="text-center mb-4">Добро Пожаловать!</h2>
            <button
              type="button"
              class="btn btn-primary"
              @click="showModal = !showModal"
            >
              Выбрать дату
            </button>
          </div>
        </div>
      </div>
    </div>

    <modal
      :modal-visible-status="showModal"
      @close-modal="modalStatusControll"
    ></modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal";

export default {
  name: "Home",
  components: {
    Modal
  },
  data() {
    return {
      info: null,
      showModal: false
    };
  },
  methods: {
    modalStatusControll(modalStatus) {
      this.showModal = modalStatus;
    }
  }
};
</script>

<style lang="scss">
.home {
  .content-center {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }



}
</style>