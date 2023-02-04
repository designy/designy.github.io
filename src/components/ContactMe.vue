<template>
  <div
    class="bg-white rounded rounded-tr-none rounded-br-none h-full w-full lg:absolute lg:overflow-auto"
  >
    <heading-title first-word="ارتباط" another-words="با من" />

    <div class="p-8">
      <p>
        <a :href="`tel:${phoneNumber}`" class="fanum">
          <i class="fa fa-phone"></i> {{ phoneNumber }}</a
        >
      </p>
      <form id="contact-me-form" action="" method="post">
        <h3 class="my-3 rounded p-3 bg-blue-100">
          می‌تونی برام یه پیام بفرستی تا از طریق ایمیل با هم در ارتباط باشیم.
        </h3>
        <label for="email" class="block text-sm font-medium text-gray-700">
          ایمیلت رو بنویس تا جواب بدم
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          name="email"
          placeholder="email"
          class="block rounded border w-full mb-3"
          dir="ltr"
        />
        <label for="subject" class="block text-sm font-medium text-gray-700">
          موضوع
        </label>
        <input
          id="subject"
          v-model="form.subject"
          type="text"
          name="subject"
          placeholder="موضوع"
          class="block border rounded w-full mb-3"
        />
        <label for="message" class="block text-sm font-medium text-gray-700">
          متن پیام
        </label>
        <textarea
          v-model="form.message"
          required
          name="message"
          placeholder="پیامت رو اینجا بنویس"
          class="border rounded block w-full my-3"
          cols="30"
          rows="5"
        ></textarea>
        <button
          class="block py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          @click.prevent="formSubmitted"
        >
          ارسال
        </button>
      </form>
      <transition
        name="successMessage"
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <div v-if="showSuccessMessage" class="bg-green-200 rounded p-4 mt-3">
          پیام شما با موفقیت ارسال شد.
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { init, send } from 'emailjs-com';

  export default {
    name: 'ContactMe',
    data: () => ({
      form: {
        email: '',
        subject: '',
        message: '',
      },
      showSuccessMessage: false,
    }),
    created() {
      init('user_bx0uG9YG3zkCIJOTbjfgv');
    },
    computed: {
      ...mapGetters('profile', ['phoneNumber']),
    },
    methods: {
      formSubmitted() {
        const templateParams = {
          ...this.form,
          accessToken: '3c2e26b0d6f5931847db819770596d10',
        };
        send('service_4f1wkk4', 'template_io22kod', templateParams)
          .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            this.form = {
              email: '',
              subject: '',
              message: '',
            };
            this.showSuccessMessage = true;
            setTimeout(() => (this.showSuccessMessage = false), 5000);
          })
          .catch((err) => console.error(err));
      },
    },
  };
</script>
