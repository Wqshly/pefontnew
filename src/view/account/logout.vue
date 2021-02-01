<template>
    <div>
    </div>
</template>

<script>
export default {
  name: 'logout',
  methods: {
    logout () {
      this.$api.http.get('/login/logout')
        .then(res => {
          this.$router.push('/login')
          sessionStorage.removeItem('userInfo')
        })
        .catch(err => {
          this.$router.push.go(-1)
          this.$message.error('退出失败，检查是否处于登录状态')
          console.log(err)
        })
    }
  },
  mounted () {
    this.logout()
  }
}
</script>

<style scoped>

</style>
