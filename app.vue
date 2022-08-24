<template>
  <div>
    <button
      type="button"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="createDocument"
    >
      Create Document
    </button>
    <button
      type="button"
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      @click="deleteDocument"
    >
      Delete Document
    </button>
  </div>
</template>

<script>
import { Client, Account, Databases } from 'appwrite';

const client = new Client();

client
  .setEndpoint('http://localhost/v1') // Your Appwrite Endpoint
  .setProject('62ffd38121455a2d42e2');

const account = new Account(client);

const database = new Databases(client, '62ffd45b2ce1e0aa9ccd');

account.createAnonymousSession().then(
  (response) => {
    console.log(response);
  },
  (error) => {
    console.log(error);
  }
);

export default {
  data() {
    return {
      message: 'Welcome!',
      notifications: [],
      toast: '',
    };
  },
  methods: {
    async listDocuments() {
      try {
        this.notifications = [];
        let response = await database.listDocuments('62ffd4743c085797e7db');
        response.documents.map((document) =>
          this.notifications.push(document.$id)
        );

        console.log(this.notifications);
      } catch (error) {
        console.log(error);
      }
    },
    async createDocument() {
      try {
        await database.createDocument('62ffd4743c085797e7db', 'unique()', {
          message: 'Welcome!',
        });

        this.listDocuments();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteDocument() {
      if (this.notifications.length > 0) {
        try {
          let documentID = this.notifications[this.notifications.length - 1];

          await database.deleteDocument('62ffd4743c085797e7db', documentID);
          this.listDocuments();
        } catch (error) {
          console.log(error);
        }
      } else {
        alert('database is empty');
      }
    },
  },
  mounted() {
    const { $toast } = useNuxtApp();
    this.toast = $toast;

    if (account.get !== null) {
      try {
        client.subscribe('documents', (response) => {
          this.message = `This event was called at ${response.timestamp}`;
        });
      } catch (error) {
        console.log(error, 'error');
      }
    }
  },
  watch: {
    message: function (message) {
      this.toast.show({
        type: 'success',
        message,
        timeout: 2,
      });
    },
  },
};
</script>
