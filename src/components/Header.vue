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
      <div class="bars">
        <q-icon name="apps" @click="toggleMenu" />
      </div>
      <div class="main-nav">
        <q-icon size="1.5em" name="home" />

        <router-link to="/" class="active">
          <q-icon size="1.5em" name="chevron_right" />Home</router-link
        >

        <router-link to="/Product">
          <q-icon size="1.5em" name="chevron_right" />Product</router-link
        >
      </div>
    </nav>
    <div class="sub-nav">
      <div class="overlay"></div>
      <div class="link container">
        <router-link to="/Product">
          <img src="../assets/admin.svg" alt="" />
          <span>product</span>
        </router-link>
      </div>
    </div>
  </header>

  <router-view />
</template>

<script>
export default {
  setup() {
    const toggleMenu = () => {
      console.log("hi");
    };

    return {
      toggleMenu,
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
    i {
      font-size: 20px;
      cursor: pointer;
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
      color: #fff9;
      font-weight: bold;
      margin: 0 5px;
    }
    a.active {
      color: #fff;
    }
  }
}
.sub-nav {
  display: none;
  z-index: 2;
  position: relative;
  .overlay {
    position: fixed;
    background-color: #808080bf;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .link {
    height: fit-content;
    background-color: #fff;
    z-index: 99999999;
    position: relative;
    margin-top: 8px;
    border-radius: 5px;
    padding: 3px 10px;
    a {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding-left: 10px;
      width: fit-content;
      img {
        height: 100%;
        width: 28px;
      }
      span {
        font-size: 12px;
      }
    }
  }
}
</style>
