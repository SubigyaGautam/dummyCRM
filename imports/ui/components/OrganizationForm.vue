<template>
  <div>
    <h3>Add organizations</h3>
    <b>Name : </b> {{ name }} <input v-model="name" /> <br />
    <b>Email : </b> {{ email }} <input v-model="email" /> <br />
    <b>Phone : </b> {{ phone }} <input v-model="phone" /> <br />
    <button @click="addOrg">Add</button> <br />

    </div>
</template>

<script>
import { Meteor } from "meteor/meteor";


export default {
  props: ["organization"],
  data() {
    return {
    };
  },
  methods: {
    addOrg(event) {
      const orgToInsert = {};
      orgToInsert.name = this.name;
      orgToInsert.email = this.email;
      orgToInsert.phone = this.phone;
      Meteor.call("organizations.insert", orgToInsert);
    },
  },
};
</script>
