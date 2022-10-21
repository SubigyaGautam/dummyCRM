<template>
  <div>
    <h3>Add Users to Organizations</h3>
          <b>User : </b>
      <v-select
        v-model="username"
        :options="userList"
        label="username"
      ></v-select>

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
    <button @click="addUserToOrg">Add</button> <br />
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { OrganizationsCollection } from "../../db/OrganizationsCollection";

export default {
  meteor: {
    $subscribe: {
      organizations: [],
      userList : [],
    },
    organizations() {
      return OrganizationsCollection.find({}).fetch();
    },
    userList(){
      console.log('@@@@@@@');
      console.log(Meteor.users.find({}, {fields: {username:1, permission: 1, isKeelaAdmin: 1, profile : 1}}));
      return Meteor.users.find({}, {fields: {username:1}});
    }
  },
  props: ["users"],
  data() {
    return {
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
    addUserToOrg(event) {
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
      Meteor.call("usersOrgs.insert", userToInsert);
    },
  },
};
</script>
