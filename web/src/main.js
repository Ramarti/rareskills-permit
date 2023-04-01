import { createApp } from 'vue'
import App from './App.vue'
import "vue-connect-wallet/dist/style.css";
import VueConnectWallet from "vue-connect-wallet";

createApp(App).use(VueConnectWallet).mount("#app");
