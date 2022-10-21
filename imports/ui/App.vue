<template>
  <div class="app">
    <header>
      <div className="app-bar">
        <div className="app-header">
          <h1>CRM</h1>
        </div>
      </div>
    </header>

    <div class="main">
      <template v-if="currentUser">
        <div class="user" v-on:click="logout">
          🚪 {{ currentUser.username }} 🚪
        </div>
        <template v-if="isKeelaAdmin">
          <div>
            <h1>Organizations</h1>
            <OrganizationForm />
            <h3>All Organizations</h3>
            <ul>
              <Organization
                v-for="organization in organizations"
                v-bind:key="organization._id"
                v-bind:organization="organization"
              />
            </ul>
          </div>
          <div>
            <h1>Users</h1>
            <AddUserForm />
            <AddUserToOrganization />
            <h1>All USERS</h1>
            <ol type="1">
              <Users
                v-for="user in userList"
                v-bind:key="user._id"
                v-bind:user="user"
              />
            </ol>
          </div>
        </template>
        <h1>Contacts</h1>
        <ContactForm />
        <h3>All Contacts</h3>
        <ul>
          <Contacts
            v-for="contact in contacts"
            v-bind:key="contact._id"
            v-bind:contact="contact"
          />
        </ul>
        <h1>Tags</h1>
        <TagForm />
        <h3>All Tags</h3>
        <ul>
          <Tags v-for="tag in tags" v-bind:key="tag._id" v-bind:tag="tag" />
        </ul>
      </template>

      <template v-else>
        <LoginForm />
      </template>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Meteor } from "meteor/meteor";
import LoginForm from "./components/LoginForm";
import Contacts from "./components/Contacts";
import Tags from "./components/Tags";

import { ContactsCollection } from "../db/ContactsCollection";
import { TagsCollection } from "../db/TagsCollection";
import { OrganizationsCollection } from "../db/OrganizationsCollection";
import ContactForm from "./components/ContactForm.vue";
import TagForm from "./components/TagForm.vue";
import OrganizationForm from "./components/OrganizationForm.vue";
import Organization from "./components/Organization.vue";
import AddUserForm from "./components/AddUserForm.vue";
import AddUserToOrganization from "./components/AddUserToOrganization.vue";
import Users from "./components/Users.vue";

export default {
  components: {
    LoginForm,
    Contacts,
    ContactForm,
    Tags,
    TagForm,
    OrganizationForm,
    Organization,
    AddUserForm,
    AddUserToOrganization,
    Users,
  },
  methods: {
    logout() {
      Meteor.logout();
    },
  },
  computed: {
    currentUser() {
      return Meteor.user();
    },
  },
  meteor: {
    $subscribe: {
      contacts: [],
      organizations: [],
      tags: [],
      userList: [],
    },
    currentUser() {
      return Meteor.user();
    },
    isKeelaAdmin() {
      return Meteor.user().profile.isKeelaAdmin;
    },
    contacts() {
      console.log(
        "Collections in app.vue " + ContactsCollection.find().count()
      );
      if (ContactsCollection.find().count() > 0) {
        return ContactsCollection.find({}).fetch();
      }
    },
    tags() {
      console.log("Tags in app.vue " + TagsCollection.find().count());
      if (TagsCollection.find().count() > 0) {
        return TagsCollection.find({}).fetch();
      }
    },
    organizations() {
      if (OrganizationsCollection.find().count() > 0) {
        return OrganizationsCollection.find({}).fetch();
      }
    },
    userList() {
      // return Meteor.users.find({}, { fields: { username: 1 } });
      return Meteor.users.find({});

    },
  },
};
</script>

<style></style>
