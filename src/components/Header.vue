<template>
  <header>
    <div class="intro">
      <div class="intro-l">
        <div class="logo">
          <img src="../assets/logo.png" alt />
        </div>
        <div class="search-sec">
          <input
            type="text"
            placeholder="search for patient (name, code, phone number)"
          />
          <div class="magnifying">
            <q-icon name="search" />
          </div>
        </div>
        <div class="lang">
          English
          <q-icon name="arrow_drop_down" />
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

        <router-link to="/" class="route__link" active-class="active">
          <q-icon size="1.5em" name="chevron_right" />Home</router-link
        >

        <router-link
          to="/Product"
          id="product-link"
          class="route__link"
          active-class="active"
        >
          <q-icon
            size="1.5em"
            name="chevron_right"
            ref="productSelector"
          />Product</router-link
        >
      </div>
    </nav>
    <div class="sub-nav container" @click="toggleMenu">
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
import { ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const toggleIndicator = ref(false);
    const homeSelector = ref(null);
    const productSelector = ref(null);

    const toggleMenu = () => {
      const toggleButton = document.querySelector(".sub-nav");
      console.log(document.querySelectorAll(".nav-links")[1]);
      console.log(toggleButton, toggleButton.value);

      if (toggleIndicator.value) {
        toggleButton.style.display = "none";
        toggleIndicator.value = false;
      } else if (!toggleIndicator.value) {
        toggleButton.style.display = "block";
        toggleIndicator.value = true;
      }
    };

    return {
      toggleMenu,
      homeSelector,
      productSelector,
    };
  },
};
</script>

<style lang="scss">
header {
  position: relative;
  z-index: 4;
}
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
      width: 130px;
      img {
        width: 100%;
      }
    }
    .search-sec {
      margin-top: 5px;
      margin-right: auto;
      margin-left: 22px;
      input {
        width: 350px;
        height: 25px;
        border: none;
        border-right: 2px solid darkblue;
        background: #f5f7f9;
        border-radius: 5px 0 0 5px;
        outline: none;
        padding: 2px 20px;
      }
      .magnifying {
        display: inline-block;
        background: #f5f7f9;
        border-radius: 0 5px 5px 0;
        height: 25px;
        padding: 2px 7px;
        i {
          font-weight: 900;
          color: darkblue;
        }
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
      transform: translateY(2px);
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
  z-index: 1;
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
    position: relative;
    margin-top: 8px;
    border-radius: 5px;
    padding: 3px 10px;
    z-index: 9;
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
