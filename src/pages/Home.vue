<template>
  <div class="home container">
    <div class="layer"></div>
    <div class="home-content">
      <div class="img">
        <img src="../assets/home.png" alt />
      </div>
      <div class="greet">Welcome</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
<style lang="scss">
.home {
  background-color: #fff;
  min-height: 80vh;
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  position: relative;
  .layer {
    position: absolute;
    background-color: #eaf5f185;
    top: 19%;
    left: -10%;
    width: 1800px;
    height: 1200px;
    border-radius: 50%;
  }
  .home-content {
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding-top: 50px;

    .img {
      margin: auto;

      img {
        width: 100%;
      }
    }
    .greet {
      margin-top: 20px;
      font-size: 20px;
    }
  }
}
a.router-link-active.router-link-exact-active.active.nav-links + * {
  display: none;
}
</style>
