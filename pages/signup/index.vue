<template>
  <div class="d-flex align-center justify-center">
    <v-card class="pa-5" width="450" elevation="5">
      <v-form ref="form" v-model="valid">
        <v-text-field
          prepend-icon="mdi-account"
          color="red"
          v-model="firstName"
          :rules="firstNameRules"
          label="First Name"
          required
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-account"
          color="red"
          v-model="lastName"
          :rules="lastNameRules"
          label="Last Name"
          required
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-phone"
          color="red"
          v-model="phone"
          :rules="phoneRules"
          label="Phone number"
          required
        ></v-text-field>

        <v-text-field
          prepend-icon="mdi-mail"
          color="red"
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-key"
          color="red"
          v-model="password"
          :rules="passwordRules"
          label="Password"
          type="password"
          required
        ></v-text-field>

        <v-text-field
          prepend-icon="mdi-calendar-today"
          color="red"
          v-model="dob"
          :rules="dobRules"
          label="Birth Day"
          type="date"
          required
        ></v-text-field>

        <v-radio-group v-model="gender" mandatory>
          <v-radio
            color="red"
            v-for="n in genderList"
            :key="n"
            :label="`${n}`"
            :value="n"
          ></v-radio>
        </v-radio-group>

        <v-btn
          :disabled="!valid"
          color="red darken-4"
          class="mr-4 white--text"
          @click="validate"
        >
          Sign up
        </v-btn>

        <v-btn color="yellow darken-2" class="mr-4 white--text" @click="reset">
          Reset Form
        </v-btn>
      </v-form>
    </v-card>
    <!-- verfication dialog -->
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-text class="pa-10">
          {{ this.message }}
        </v-card-text>
        <v-form ref="formTwo" class="pa-12">
          <v-text-field
            color="red"
            v-model="verfication"
            :rules="verficationRules"
            label="verfication code"
            required
          ></v-text-field>
          <v-btn
            :disabled="!valid"
            color="red darken-4"
            class="mr-4 white--text"
            @click="validateTwo"
          >
            continue
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- dialog appear to confirm verfication -->
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

<script>
import axios from 'axios'
export default {
  data: () => ({
    errMessage: '',
    errDialog: false,
    dialog: false,
    message: '',
    verfication: '',
    verficationRules: [v => !!v || 'Code is required'],
    messageTwo: '',
    dialogTwo: false,
    valid: true,
    firstName: '',
    firstNameRules: [
      v => !!v || 'First Name is required',
      v => (v && v.length >= 1) || 'First Name must be more than 1 character'
    ],
    lastName: '',
    lastNameRules: [
      v => !!v || 'Last Name is required',
      v => (v && v.length >= 1) || 'Last Name must be more than 1 character'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must be more than 6 characters'
    ],
    phone: '',
    phoneRules: [
      v => !!v || 'Phone Number is required',
      v => /^01[0125]\d{8}$/.test(v) || 'Phone must be valid'
    ],
    dob: '',
    dobRules: [v => !!v || 'Birth Day is required'],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    gender: '',
    genderList: ['male', 'female']
  }),

  methods: {
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
              birthDate: this.dob,
              gender: this.gender
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
    validateTwo() {
      if (this.$refs.formTwo.validate()) {
        axios
          .post(process.env.baseUrl + '/api/user/phone/confirmRegistration', {
            code: this.verfication,
            phone: this.phone
          })
          .then(res => {
            this.dialog = false
            this.dialogTwo = true
            this.messageTwo = res.data.message
            setTimeout(() => {
              this.$router.push('/')
            }, 2000)
          })
      }
    }
  }
}
</script>
