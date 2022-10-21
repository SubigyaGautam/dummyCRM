<template>
  <div>
    <h3>Add contacts</h3>
    <b>First Name : </b> {{ firstName }}
    <input v-model="firstName" placeholder="First Name" required /> <br />

    <b>Last Name : </b> {{ lastName }}
    <input v-model="lastName" placeholder="Last Name" required /> <br />

    <b>Email : </b> {{ email }}
    <input v-model="email" placeholder="Email" required />
    <br />

    <b>Phone : </b> {{ phone }}
    <input v-model="phone" placeholder="Phone" required />
    <br />

    <div id="container">
      <br />
      <v-select
        multiple
        v-model="selected"
        :options="tags"
        label="tagName"
      ></v-select>
    </div>
    <button @click="addContact">Add</button>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { TagsCollection } from "../../db/TagsCollection";
import Vue from "vue";
import vSelect from "vue-select";

Vue.component("v-select", vSelect);

export default {
  meteor: {
    $subscribe: {
      tags: [],
    },
    tags() {
      return TagsCollection.find({}).fetch();
    },
  },
  props: ["contact"],
  data() {
    return {
      selected: [],
    };
  },
  methods: {
    addContact(event) {
      const contactToInsert = {};
      contactToInsert.firstName = this.firstName;
      contactToInsert.lastName = this.lastName;
      contactToInsert.email = this.email;
      contactToInsert.phone = this.phone;
      let tagsAssociated = [];
      if (this.selected.length > 0) {
        debugger;
        this.selected.forEach((tag) => {
          tagsAssociated.push(tag);
        });
        contactToInsert.tags = tagsAssociated;
      }
      Meteor.call("contacts.insert", contactToInsert);
    },
  },
};
</script>
