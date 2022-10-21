<template>
  <div>
    <h3>Add tags</h3>
    <b>Tag Name : </b> {{ tagName }} <input v-model="tagName" /> <br />
    <div id="container">
      <br />
      <v-select
        multiple
        v-model="selected"
        :options="contacts"
        label="firstName"
      ></v-select>
    </div>
    <button @click="addTag">Add</button>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { ContactsCollection } from "../../db/ContactsCollection";

import Vue from "vue";
import vSelect from "vue-select";

Vue.component("v-select", vSelect);

export default {
  meteor: {
    $subscribe: {
      contacts: [],
    },
    contacts() {
      console.log(ContactsCollection.find({}).fetch());
      return ContactsCollection.find({}).fetch();
    },
  },
  props: ["tag"],
  data() {
    return {
      selected: [],
    };
  },
  methods: {
    addTag(event) {
      const tagToInsert = {};
      tagToInsert.tagName = this.tagName;

      let contactsAssociated = [];
      if (this.selected.length > 0) {
        this.selected.forEach((contact) => {
          contactsAssociated.push(contact);
        });
        tagToInsert.contactsAssociated = contactsAssociated;
      }

      console.log(tagToInsert);
      Meteor.call("tags.insert", tagToInsert);
    },
  },
};
</script>
