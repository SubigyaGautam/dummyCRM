
import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from '/imports/db/ContactsCollection';
import { OrganizationsCollection } from '/imports/db/OrganizationsCollection';
import { TagsCollection } from '/imports/db/TagsCollection';
import { ContactsTagsCollection } from '/imports/db/ContactsTagsCollection';
import { OrganizationsUsersCollection } from '/imports/db/OrganizationsUsersCollection';





Meteor.publish('contacts', function publishContacts() {
    return ContactsCollection.find({});
});

Meteor.publish('organizations', function publishOrganizations() {
    return OrganizationsCollection.find({});
});

Meteor.publish('tags', function publishTags() {
    return TagsCollection.find({});
});

Meteor.publish('contactsTags', function publishContactTags() {
    return ContactsTagsCollection.find({});
});

Meteor.publish('organizationsUsers', function publishorganizationsUsers() {
    return OrganizationsUsersCollection.find({});
});

Meteor.publish("userList", function () {
    return Meteor.users.find({}, {fields: {username:1, permission: 1, isKeelaAdmin: 1, profile : 1}});
})