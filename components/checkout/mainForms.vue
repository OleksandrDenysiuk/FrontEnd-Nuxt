<template>
  <div>
    <!-- appear if you not user -->
    <v-card elevation="5" class="paymentContainerNewUser pa-5" v-if="!getUser">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="firstName"
          :rules="firstNameRules"
          label="First Name"
          required
          color="red"
        ></v-text-field>
        <v-text-field
          v-model="lastName"
          :rules="lastNameRules"
          label="Last Name"
          required
          color="red"
        ></v-text-field>

        <v-text-field
          v-model="phone"
          :rules="phoneRules"
          label="Phone number"
          required
          color="red"
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="Email"
          color="red"
          :rules="emailRules"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          color="red"
          type="password"
          :rules="passwordRules"
        ></v-text-field>
        <v-radio-group v-model="paymentValue" mandatory>
          <p>Choose payment method</p>
          <div class="paymentContainer container">
            <div class="row">
              <div class="paymentCard col-sm-4 col-md-2 mx-4" v-for="(n, index) in paymentList" :key="index">
                <v-radio :value="n.method" color="red">
                  <template slot="label">
                    <!-- img -->
                    <img :src="n.img" :alt="n.method">

                    <v-img
                      class="d-block"
                      v-if="n.method == 'Aman / Masary'"
                      :src="require('../../assets/images/masary.png')"
                      width="150"
                    ></v-img>
                  </template
                ></v-radio>
              </div>
            </div>
          </div>
        </v-radio-group>
        <v-btn
          :disabled="!valid"
          color="red darken-4"
          class="mr-4 white--text"
          @click="validate"
        >
          Continue
        </v-btn>

        <v-btn color="yellow darken-2" class="mr-4" @click="reset" dark>
          Reset Form
        </v-btn>
      </v-form>
    </v-card>
    <!-- appear for user -->
    <v-card elevation="5" class="pa-5" v-if="getUser">
      <v-form v-model="valid" lazy-validation>
        <v-radio-group v-model="paymentValueTwo" mandatory>
          <p class="text-center">Choose payment method</p>

          <div class="paymentContainer container">
            <div class="row">
              <div class="paymentCard col-sm-4 col-md-2 mx-4" v-for="(n, index) in paymentList" :key="index">
                <v-radio :value="n.method" color="red">
                  <template slot="label">
                    <!-- img -->
                    <img class="w-100 h-100" :src="n.img" :alt="n.method">
                    <!-- <v-img class="d-block" v-if="n.method == 'Masary'" :src="require('../../assets/images/masary.png')" width="150"></v-img> -->
                  </template>
                </v-radio>
              </div>
            </div>
          </div>

          
        </v-radio-group>
        <v-btn
          color="red darken-4"
          class="mr-4 white--text"
          @click="goToPayment(paymentValueTwo)"
        >
          Continue
        </v-btn>

        <v-btn color="yellow darken-2" class="mr-4" @click="reset" dark>
          Reset Form
        </v-btn>
      </v-form>
    </v-card>
    <!-- verification dialog -->
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-text class="pa-10">
          {{ this.message }}
        </v-card-text>
        <v-form ref="formTwo" class="pa-12">
          <v-text-field
            color="red"
            v-model="verification"
            :rules="verificationRules"
            label="verification code"
            required
          ></v-text-field>
          <v-btn
            :disabled="!valid"
            color="red darken-4"
            class="mr-4 white--text"
            @click="validateTwo(paymentValue)"
          >
            continue
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- dialog appear to confirm verification -->
    <v-dialog v-model="dialogTwo" max-width="290">
      <v-card>
        <v-card-text>
          {{ this.messageTwo }}
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- dialog appear if there is problem in sign up -->
    <v-dialog v-model="errDialog" max-width="290">
      <v-card>
        <v-card-text class="pa-10">
          {{ errMessage }}
        </v-card-text>
        <v-btn
          color="red darken-4"
          class="mr-4 white--text"
          block
          tile
          @click="errDialog = false"
        >
          close
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>


<style scoped>
.paymentContainerNewUser {
  width: 60%;
  margin: auto;
}

.paymentContainer img {
  width: 100%;
  max-height: 200px;
  border-radius: 20px;
}

.paymentCard {
  max-height: 250px;
  /* border: 1px solid black; */
  border-radius: 15px;
  align-self: center;
}
</style>


<script>
import axios from 'axios'
export default {
  data: () => ({
    errMessage: '',
    errDialog: false,
    dialog: false,
    message: '',
    messageTwo: '',
    dialogTwo: false,
    valid: true,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    radioValue: '',
    paymentValue: '',
    radioValueTwo: '',
    paymentValueTwo: '',
    verification: '',
    paymentList: [
      { method: 'Visa', img: require('../../assets/images/visa.png') },
      { method: 'Fawry', img: require('../../assets/images/fawry.png') },
      { method: 'Masary', img: require('../../assets/images/aman.png') },
      { method: 'wallet', img: require('../../assets/images/wallet.png') },
      { method: 'Points', img: require('../../assets/images/points.png') }
    ],
    //form validations
    firstNameRules: [
      v => !!v || 'First Name is required',
      v => (v && v.length >= 1) || 'First Name must be more than 1 character'
    ],
    lastNameRules: [
      v => !!v || 'Last Name is required',
      v => (v && v.length >= 1) || 'Last Name must be more than 1 character'
    ],
    phoneRules: [
      v => !!v || 'Phone Number is required',
      v => /^01[0125]\d{8}$/.test(v) || 'Phone must be valid'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must be more than 6 characters'
    ],
    verificationRules: [
      v => !!v || 'Verification is required',
      v => (v && v.length >= 3) || 'Verification must be more than 3 characters'
    ]
  }),

  methods: {
    //check if form true then route the user to payment user
    validate() {
      if (this.$refs.form.validate()) {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        axios
          .post(
            process.env.baseUrl + '/api/user/signup',
            {
              firstName: this.firstName,
              lastName: this.lastName,
              password: this.password,
              phone: this.phone,
              email: this.email,
              birthDate: '2020-03-24',
              gender: 'male'
            },
            config
          )
          .then(res => {
            this.dialog = true
            this.message = res.data.message
          })
          .catch(err => {
            this.errMessage = 'Email or phone number already existing in our accounts.'
            this.errDialog = true
          })
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    //validate dialog form
    validateTwo(link) {
      if (this.$refs.formTwo.validate()) {
        axios
          .post(process.env.baseUrl + '/api/user/phone/confirmRegistration', {
            code: this.verification,
            phone: this.phone
          })
          .then(res => {
            this.dialog = false
            this.dialogTwo = true
            this.messageTwo = res.data.message
            setTimeout(() => {
              this.$router.push({
                path: `/checkout/${link}`,
                query: this.$route.query
              })
            }, 2000)
          })
      }
    },
    //go to payment method
    goToPayment(link) {
      this.$router.push({
        path: `/checkout/${link}`,
        query: this.$route.query
      })
    }
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser
    }
  }
}
</script>
