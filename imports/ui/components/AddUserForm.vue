<template>
  <div>
    <h3>Add Users</h3>
    <b>Username : </b> {{ username }} <input v-model="username" /> <br />
    <b>Password : </b> {{ password }}
    <input type="password" v-model="password" /> <br />

    <div id="container">
      <b>Permission : </b>
      <v-select
        v-model="selectedPermission"
        :options="permissionOptions"
        label="displayName"
      ></v-select>
      <b>Organizations : </b>
      <v-select
        multiple
        v-model="selected"
        :options="organizations"
        label="name"
      ></v-select>
    </div>
    <button @click="addUser">Add</button> <br />
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { OrganizationsCollection } from "../../db/OrganizationsCollection";

export default {
  meteor: {
    $subscribe: {
      organizations: [],
    },
    organizations() {
      return OrganizationsCollection.find({}).fetch();
    },
  },
  props: ["users"],
  data() {
    return {
      username: "username",
      password: "password",
      selected: [],
      selectedPermission: {
        permission: "coodinator-user-permission",
        displayName: "Coordinator",
      },
      permissionOptions: [
        {
          permissionName: "keela-admin-permission",
          displayName: "Keela Admin",
        },
        { permission: "admin-permission", displayName: "Admin" },
        {
          permission: "coodinator-user-permission",
          displayName: "Coordinator",
        },
      ],
    };
  },
  methods: {
    addUser(event) {
      const userToInsert = {};
      userToInsert.username = this.username;
      userToInsert.password = this.password;
      userToInsert.permission = this.selectedPermission;

      let orgAssociated = [];
      if (this.selected.length > 0) {
        this.selected.forEach((org) => {
          orgAssociated.push(org);
        });
        userToInsert.orgAssociated = orgAssociated;
      }
      Meteor.call("users.insert", userToInsert);
    },
  },
};
</script>
