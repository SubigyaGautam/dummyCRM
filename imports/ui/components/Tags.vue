<template>
  <li>
    <b>Tag Name : </b>  {{ tagName}}
    <input v-model="tagName"> <br>
    <v-select
      multiple
      v-model="contactsTags"
      :options="contactsTags"
      disabled
      :clearable="false"
      label="contactName"
    ></v-select>
    <button @click="editTag" class="delete">Edit</button>
    <button class="delete" @click="removeTag">Delete</button>
  </li>
</template>

<script>
import { Meteor } from "meteor/meteor"
import { ContactsTagsCollection } from "/imports/db/ContactsTagsCollection";

export default {
  meteor: {
    $subscribe: {
      contactsTags: [],
    },
    contactsTags() {
      console.log("ContactsTagsin tags.vue");
      console.log(ContactsTagsCollection.find({tagId: { $eq: this.tag._id },}).fetch());
      
      return ContactsTagsCollection.find({tagId: { $eq: this.tag._id},}).fetch();
    },
  },
  props: ["tag"],
  data() {
    return {
      tagName : this.tag.tagName,
      selected : []
  }
  },
  methods: {
    editTag(event) {
      this.tag.tagName = this.tagName;
      Meteor.call("tags.update", this.tag);
    },
    removeTag(event) {
      Meteor.call("tags.remove", this.tag._id);
    },
  },
};
</script>
