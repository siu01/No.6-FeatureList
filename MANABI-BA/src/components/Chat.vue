<script setup>
import { computed, reactive, ref } from "vue";

const props = defineProps({
  chatId: {
    type: String,
    required: true,
  },
});

const reactionOptions = [
  { id: "like", symbol: "👍", label: "いいね" },
  { id: "heart", symbol: "❤️", label: "ハート" },
  { id: "check", symbol: "✅", label: "確認済み" },
];

function createReactions(counts = {}) {
  return reactionOptions.map((reaction) => ({
    ...reaction,
    count: counts[reaction.id] ?? 0,
    reacted: false,
  }));
}

const chats = reactive({
  xxx: {
    title: "全体チャット",
    messages: [
      {
        id: 1,
        userName: "UserA",
        avatar: "A",
        text: "今日の進捗を共有します。",
        time: "10:00",
        isMine: false,
        reactions: createReactions({ like: 2 }),
      },
      {
        id: 2,
        userName: "UserMe",
        avatar: "M",
        text: "お願いします。",
        time: "10:02",
        isMine: true,
        reactions: createReactions({ check: 1 }),
      },
      {
        id: 3,
        userName: "UserA",
        avatar: "A",
        text: "ログイン後の画面まで確認できています。",
        time: "10:05",
        isMine: false,
        reactions: createReactions({ like: 1, check: 2 }),
      },
    ],
  },
  yyy: {
    title: "教員チャット",
    messages: [
      {
        id: 1,
        userName: "UserB",
        avatar: "B",
        text: "チャット画面のデザイン案を見ました。",
        time: "11:15",
        isMine: false,
        reactions: createReactions({ heart: 1 }),
      },
      {
        id: 2,
        userName: "UserMe",
        avatar: "M",
        text: "気になるところがあれば教えてください。",
        time: "11:18",
        isMine: true,
        reactions: createReactions(),
      },
      {
        id: 3,
        userName: "UserB",
        avatar: "B",
        text: "一覧とフォームがまとまっていて見やすいです。",
        time: "11:21",
        isMine: false,
        reactions: createReactions({ like: 2, heart: 1 }),
      },
    ],
  },
  zzz: {
    title: "zzz chat",
    messages: [
      {
        id: 1,
        userName: "UserC",
        avatar: "C",
        text: "デモの流れを確認したいです。",
        time: "13:30",
        isMine: false,
        reactions: createReactions({ check: 1 }),
      },
      {
        id: 2,
        userName: "UserMe",
        avatar: "M",
        text: "トップから各チャットに入る形にします。",
        time: "13:33",
        isMine: true,
        reactions: createReactions({ like: 1 }),
      },
      {
        id: 3,
        userName: "UserC",
        avatar: "C",
        text: "それなら説明しやすそうです。",
        time: "13:36",
        isMine: false,
        reactions: createReactions({ heart: 1, check: 1 }),
      },
    ],
  },
});

const currentChat = computed(() => chats[props.chatId]);
const message = ref("");

function formatTime(date) {
  return new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function toggleReaction(chatMessage, reactionId) {
  const reaction = chatMessage.reactions.find((item) => item.id === reactionId);

  if (!reaction) {
    return;
  }

  reaction.reacted = !reaction.reacted;
  reaction.count += reaction.reacted ? 1 : -1;
}

function handleSubmit() {
  if (!currentChat.value) {
    return;
  }

  const trimmedMessage = message.value.trim();

  if (!trimmedMessage) {
    return;
  }

  currentChat.value.messages.push({
    id: Date.now(),
    userName: "UserMe",
    avatar: "M",
    text: trimmedMessage,
    time: formatTime(new Date()),
    isMine: true,
    reactions: createReactions(),
  });

  message.value = "";
}
</script>

<template>
  <article v-if="currentChat" class="chat">
    <header class="chat-header">
      <p class="chat-label">チャット</p>
      <h1>{{ currentChat.title }}</h1>
    </header>

    <div class="chat-list" aria-label="チャット履歴">
      <article
        v-for="chatMessage in currentChat.messages"
        :key="chatMessage.id"
        class="chat-message"
        :class="{ 'is-mine': chatMessage.isMine }"
      >
        <div class="avatar" aria-hidden="true">{{ chatMessage.avatar }}</div>

        <div class="message-body">
          <div class="message-meta">
            <span class="user-name">{{ chatMessage.userName }}</span>
            <time>{{ chatMessage.time }}</time>
          </div>
          <p>{{ chatMessage.text }}</p>

          <div class="reaction-list" aria-label="リアクション">
            <button
              v-for="reaction in chatMessage.reactions"
              :key="reaction.id"
              class="reaction-button"
              :class="{ 'is-reacted': reaction.reacted }"
              type="button"
              :aria-pressed="reaction.reacted"
              :aria-label="`${reaction.label} ${reaction.count}件`"
              @click="toggleReaction(chatMessage, reaction.id)"
            >
              <span aria-hidden="true">{{ reaction.symbol }}</span>
              <span>{{ reaction.count }}</span>
            </button>
          </div>
        </div>
      </article>
    </div>

    <form class="chat-form" @submit.prevent="handleSubmit">
      <label>
        メッセージ
        <input
          v-model="message"
          type="text"
          name="message"
          autocomplete="off"
          placeholder="メッセージを入力"
        />
      </label>

      <button type="submit">送信</button>
    </form>
  </article>

  <article v-else class="chat missing-chat">
    <h1>チャットが見つかりません</h1>
    <p>トップ画面からチャットを選び直してください。</p>
  </article>
</template>

<style scoped>
.chat {
  display: grid;
  gap: 20px;
  padding: 24px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
}

.chat-header {
  display: grid;
  gap: 4px;
}

.chat-label {
  margin: 0;
  color: #667085;
  font-size: 14px;
  font-weight: 700;
}

h1 {
  margin: 0;
  font-size: 28px;
}

.missing-chat p {
  margin: 0;
  color: #667085;
}

.chat-list {
  min-height: 320px;
  max-height: 460px;
  overflow-y: auto;
  display: grid;
  align-content: start;
  gap: 16px;
  padding: 16px;
  border: 1px solid #e4e7ec;
  border-radius: 8px;
  background: #f8fafc;
}

.chat-message {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 10px;
  align-items: end;
}

.chat-message.is-mine {
  grid-template-columns: minmax(0, 1fr) 40px;
}

.chat-message.is-mine .avatar {
  grid-column: 2;
}

.chat-message.is-mine .message-body {
  grid-column: 1;
  grid-row: 1;
  justify-self: end;
  background: #dff7ec;
}

.chat-message.is-mine .message-meta {
  justify-content: flex-end;
}

.avatar {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #2f6f56;
  color: #fff;
  font-weight: 700;
}

.message-body {
  width: fit-content;
  max-width: 100%;
  display: grid;
  gap: 6px;
  padding: 12px 14px;
  border: 1px solid #e4e7ec;
  border-radius: 8px;
  background: #fff;
}

.message-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #667085;
  font-size: 13px;
}

.user-name {
  color: #344054;
  font-weight: 700;
}

p {
  margin: 0;
  line-height: 1.6;
}

.reaction-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.reaction-button {
  min-width: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 5px 8px;
  border: 1px solid #d0d5dd;
  border-radius: 999px;
  background: #fff;
  color: #344054;
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
}

.reaction-button:hover {
  border-color: #42b883;
  background: #f2fbf7;
}

.reaction-button.is-reacted {
  border-color: #42b883;
  background: #e7f7ef;
  color: #256b4c;
}

time {
  white-space: nowrap;
}

.chat-form {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px;
  align-items: end;
}

label {
  display: grid;
  gap: 8px;
  color: #344054;
  font-weight: 700;
}

input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid #bbb;
  border-radius: 6px;
  font: inherit;
}

button {
  min-width: 80px;
  padding: 10px 16px;
  border: 0;
  border-radius: 6px;
  background: #42b883;
  color: #fff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

button:hover {
  background: #369b6f;
}

@media (max-width: 520px) {
  .chat-form {
    grid-template-columns: 1fr;
  }

  button {
    width: 100%;
  }
}
</style>
