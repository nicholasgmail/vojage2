export default function ({error}) {
  if (error && error.statusCode === 500) {
    //return this.$router.push('/404');
  }
}
