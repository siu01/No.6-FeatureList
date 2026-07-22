<script setup>
import { useRouter } from "vue-router";
import logoUrl from "../assets/manabi-ba-logo.png";

const router = useRouter();

// SSO はダミー。とりあえずログインを通してトップへ遷移する。
function signIn() {
  router.push({ name: "top" });
}
</script>

<template>
  <section class="login-view">
    <div class="login-logo">
      <img class="logo-mark" :src="logoUrl" alt="manabi-ba" />
    </div>

    <div class="login-actions">
      <button type="button" class="sso-btn sso-apple" @click="signIn">
        <svg class="sso-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M16.37 12.9c.02 2.34 2.05 3.12 2.07 3.13-.02.05-.32 1.11-1.07 2.2-.64.94-1.31 1.87-2.36 1.89-1.03.02-1.36-.61-2.54-.61-1.18 0-1.55.59-2.52.63-1.01.04-1.79-1.01-2.44-1.95-1.32-1.92-2.33-5.43-.97-7.8.67-1.18 1.88-1.92 3.19-1.94.99-.02 1.93.67 2.54.67.61 0 1.75-.83 2.95-.71.5.02 1.91.2 2.81 1.53-.07.05-1.68.98-1.66 2.96zM14.44 5.9c.54-.65.9-1.56.8-2.47-.78.03-1.72.52-2.28 1.17-.5.58-.94 1.5-.82 2.39.87.07 1.76-.44 2.3-1.09z"
          />
        </svg>
        <span><b>Apple</b>でサインイン</span>
      </button>

      <button type="button" class="sso-btn sso-google" @click="signIn">
        <svg class="sso-icon" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.8-.4-4H24v7.3h11.9c-.2 1.9-1.5 4.8-4.4 6.7l6.7 5.2c4-3.7 6.9-9.2 6.9-15.2z"/>
          <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.4c-1.9 1.3-4.4 2.2-7.6 2.2-5.8 0-10.7-3.9-12.5-9.2l-7.1 5.5C8.5 41.1 15.7 46 24 46z"/>
          <path fill="#FBBC05" d="M11.5 28.3c-.5-1.4-.7-2.9-.7-4.3s.3-2.9.7-4.3l-7.1-5.5C2.9 17.1 2 20.4 2 24s.9 6.9 2.4 9.8l7.1-5.5z"/>
          <path fill="#EA4335" d="M24 10.6c3.3 0 5.5 1.4 6.8 2.6l6-5.9C33.2 3.9 29.4 2 24 2 15.7 2 8.5 6.9 4.4 14.2l7.1 5.5C13.3 14.5 18.2 10.6 24 10.6z"/>
        </svg>
        <span><b>Google</b>でサインイン</span>
      </button>
    </div>

    <footer class="login-footer">
      <a href="#">マニュアル</a>
      <a href="#">利用規約・プライバシーポリシー</a>
    </footer>
  </section>
</template>

<style scoped>
.login-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100dvh;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  background: #fff;
}

.login-logo {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.logo-mark {
  width: 68%;
  max-width: 280px;
  height: auto;
  display: block;
}

.login-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 0 28px;
}

.sso-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 56px;
  border-radius: 14px;
  font: inherit;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s, box-shadow 0.15s;
}
.sso-btn:active {
  opacity: 0.85;
}

.sso-apple {
  background: #000;
  color: #fff;
  border: none;
}

.sso-google {
  background: #fff;
  color: #1f2530;
  border: 1px solid #e2e5ea;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.sso-icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
}
.sso-apple .sso-icon {
  color: #fff;
}
.sso-btn span b {
  font-weight: 700;
}

.login-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  margin-top: 40px;
  padding: 22px 16px;
  background: #f2f3f5;
}
.login-footer a {
  color: #6b7280;
  font-size: 13px;
  text-decoration: none;
}
.login-footer a:hover {
  text-decoration: underline;
}
</style>
