<script>
export default {
  name: "before_details",
  methods: {
    async submit(event) {
      event.preventDefault();
      if (this.$validator.isEmail(this.email)) {
        this.email_false = false;
      } else {
        this.email_false = true;
      }
      if (this.$validator.isStrongPassword(this.password,
        {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 0,
          returnScore: false,
          pointsPerUnique: 0,
          pointsPerRepeat: 0,
          pointsForContainingLower: 0,
          pointsForContainingUpper: 0,
          pointsForContainingNumber: 0,
          pointsForContainingSymbol: 0
        })) {
        this.password_false = false;
      } else {
        this.password_false = true;
      }
      if (!this.password_false && !this.email_false) {
        await this.$store.dispatch('setRegister', {
          "email": this.email,
          "password": this.password
        })
        this.$nuxt.$router.push(`/`);
      }
    },
  }
}
</script>

<template>

</template>

<style scoped>

</style>
