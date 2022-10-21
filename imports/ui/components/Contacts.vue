<template>
  <li>
    <b>First Name : </b> {{ firstName }} <input v-model="firstName" /> <br />

    <b>Last Name : </b> {{ lastName }} <input v-model="lastName" /> <br />

    <b>Email : </b> {{ email }} <input v-model="email" /> <br />

    <b>Phone : </b> {{ phone }} <input v-model="phone" /> <br />
    <v-select
      multiple
      v-model="contactsTags"
      :options="contactsTags"
      disabled
      :clearable="false"
      label="tagName"
    ></v-select>

    <button @click="editContact" class="delete">Edit</button>
    <button class="delete" @click="removeContact">Delete</button>
  </li>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { ContactsTagsCollection } from "/imports/db/ContactsTagsCollection";

export default {
  meteor: {
    $subscribe: {
      contactsTags: [],
    },
    contactsTags() {
      console.log("ContactsTagsin Contacts.vue");
      console.log(ContactsTagsCollection.find({contactId: { $eq: this.contact._id },}).fetch());
      
      return ContactsTagsCollection.find({contactId: { $eq: this.contact._id},}).fetch();
    },
  },
  props: ["contact"],
  data() {
    return {
      firstName: this.contact.firstName,
      lastName: this.contact.lastName,
      email: this.contact.email,
      phone: this.contact.phone,
      selected: [],
    };
  },
  methods: {
    editContact(event) {
      this.contact.firstName = this.firstName;
      this.contact.lastName = this.lastName;
      this.contact.email = this.email;
      this.contact.phone = this.phone;
      Meteor.call("contacts.update", this.contact);
    },
    removeContact(event) {
      Meteor.call("contacts.remove", this.contact._id);
    },
  },
};
</script>
