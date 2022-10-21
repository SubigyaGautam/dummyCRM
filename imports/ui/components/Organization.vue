<template>
  <li>
    <b>Name : </b> {{ name }} <input v-model="name" /> <br />
    <b>Email : </b> {{ email }} <input v-model="email" /> <br />
    <b>Phone : </b> {{ phone }} <input v-model="phone" /> <br />
    <button @click="editOrg" class="delete">Edit</button>
    <button class="delete" @click="removeOrg">Delete</button>
  </li>
</template>

<script>
import { Meteor } from "meteor/meteor"
import { OrganizationsCollection } from "/imports/db/OrganizationsCollection";

export default {
  meteor: {
    $subscribe: {
      contactsTags: [],
    },
    contactsTags() {
      return OrganizationsCollection.find().fetch();
    },
  },
  props: ["organization"],
  data() {
    return {
      name : this.organization.name,
      email : this.organization.email,
      phone : this.organization.phone,
  }
  },
  methods: {
    editOrg(event) {
      this.organization.name = this.name;
      this.organization.email = this.email;
      this.organization.phone = this.phone;
      Meteor.call("organizations.update", this.organization);
    },
    removeOrg(event) {
      Meteor.call("organizations.remove", this.organization._id);
    },
  },
};
</script>
