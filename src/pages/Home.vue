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
  min-height: 79vh;
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  position: relative;
  .layer {
    position: absolute;
    background-color: #d7e4f15e;
    top: 19%;
    left: 50%;
    width: 1800px;
    height: 1200px;
    border-radius: 50%;
    transform: translateX(-50%);
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

.tableheader {
  font-size: 12px;
  background: #d7e4f1;
}

.inputscont {
  background: #f5f7f9;
}

a.active.router-link-exact-active + * {
  display: none;
}
</style>
