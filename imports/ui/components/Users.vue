<template>
  <div>
    <li>
      <b>Username : </b> {{ username }} <br />
      <b>Permission : </b> {{ permission }}
      <br />

      <div id="container">
        <b>Organizations : </b>
        <v-select
          multiple
          v-model="organizationsUsers"
          :options="organizationsUsers"
          label="orgName"
          :clearable="false"
          disabled
        ></v-select>
        <button class="delete" @click="deleteUser">Delete</button>
      </div>
    </li>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { OrganizationsUsersCollection } from "../../db/OrganizationsUsersCollection";

const kv = {
  "keela-admin-permission": "Keela Admin",
  "admin-permission": "Admin",
  "coodinator-user-permission ": "Coordinator",
};

export default {
  meteor: {
    $subscribe: {
      organizationsUsers: [],
    },
    organizationsUsers() {
      return OrganizationsUsersCollection.find({
        userId: { $eq: this.user._id },
      }).fetch();
    },
  },
  props: ["user"],
  data() {
    return {
      username: this.user.username,
      permission: kv[this.user.permission],
      selected: [],
      selectedPermission: {
        permission: this.user.permission,
        displayName: kv[this.user.permission],
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
    deleteUser(event) {
      console.log(this.user);

      Meteor.call("users.delete", this.user);

    },
  },
};
</script>
