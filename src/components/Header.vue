<template>
  <header>
    <div class="intro">
      <div class="intro-l">
        <div class="logo">
          <img src="../assets/logo.png" alt />
        </div>
        <div class="lang">
          English
          <font-awesome-icon :icon="['fas', 'sort-down']" />
        </div>
      </div>
      <div class="intro-r">
        <div class="user">
          <img src="../assets/user.png" alt />
          <span class="name">Sabry ElSayed Farag Mahmoud</span>
        </div>
      </div>
    </div>
    <nav class="container">
      <div class="bars" @click="toggle">
        <font-awesome-icon :icon="['fas', 'bars']" />
      </div>
      <div class="main-nav">
        <font-awesome-icon :icon="['fas', 'home']" class="home-icon" />
        <router-link to="/">Home</router-link>
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
        <router-link to="/Product">Product</router-link>
      </div>
    </nav>
    <!-- <div class="sub-nav">
      <div class="overlay"></div>
      <div class="link">
        <router-link to="/Product">
          <img src="../assets/admin.svg" alt="" />
        </router-link>
      </div>
    </div>-->
  </header>

  <router-view />
</template>

<script >
export default {
  setup() {
    const toggle = () => {
      console.log("yess");
    };
    return {
      toggle,
    };
  },
};
</script>

<style lang="scss">
.intro {
  position: relative;
  margin-bottom: 5px;
  display: flex;
  background-color: #fff;
  padding: 0 5px;
  position: relative;
  z-index: 9;
  .intro-l {
    display: flex;
    justify-content: space-between;
    width: 85%;
    padding-right: 5px;

    .logo {
      width: 200px;
      img {
        width: 100%;
      }
    }
    .lang {
      display: flex;
      align-items: center;
      color: #1e57a8;
      border-right: 1px solid #ebe0e0;
      padding-right: 5px;
      cursor: pointer;
      svg {
        margin: 0 2px 10px;
      }
    }
  }
  .intro-r {
    .user {
      display: flex;
      align-items: center;
      transform: translateY(10px);
      .name {
        font-size: 11px;
        padding-left: 7px;
      }
    }
  }
}
nav {
  display: flex;
  background-color: #1e57a8;
  color: #fff;
  border-radius: 5px;
  position: relative;
  z-index: 9;
  .bars {
    color: #fff;
    padding: 5px 10px 4px 15px;
    border-right: 1px solid;
    svg {
      font-size: 18px;
    }
  }
  .main-nav {
    padding: 0 15px;
    margin: auto;
    width: 100%;
    .home-icon {
      margin-right: 10px;
    }
    a {
      color: #fff;
      font-weight: bold;
      margin: 0 5px;
    }
  }
}
// .sub-nav {
//   .overlay {
//     position: fixed;
//     background-color: #808080bf;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     z-index: 1;
//   }
//   .link {
//     height: 30px;
//     img {
//       height: 100%;
//     }
//   }
// }
</style>