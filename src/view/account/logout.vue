<template>
    <div>
    </div>
</template>

<script>
export default {
  name: 'logout',
  methods: {
    logout () {
      sessionStorage.removeItem('userInfo')
      this.$api.http.get('/login/logout')
        .catch(err => {
          this.$message.error('您已退出登录！请勿重复操作！')
          console.log(err)
        })
      this.$router.push('/login')
    }
  },
  mounted () {
    this.logout()
  }
}
</script>

<style scoped>

</style>
