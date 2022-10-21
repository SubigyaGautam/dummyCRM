import { check } from 'meteor/check';
import { TagsCollection } from '/imports/db/TagsCollection';
import { ContactsTagsCollection } from '/imports/db/ContactsTagsCollection';



const TAG_PERMISSION_KEELA_ADMIN = ['view', 'insert', 'update', 'delete'];
const TAG_PERMISSION_ADMIN = ['view', 'insert', 'update', 'delete'];
const TAG_PERMISSION_COORDINATOR = ['view', 'insert', 'update', 'delete'];


const KEELA_ADMIN_USER_PERMISSION = 'keela-admin-permission';
const ADMIN_USER_PERMISSION = 'admin-permission';
const COORDINATOR_USER_PERMISSION = 'coodinator-user-permission';

const DML_PERMISSIONS_TAG = [KEELA_ADMIN_USER_PERMISSION, ADMIN_USER_PERMISSION, COORDINATOR_USER_PERMISSION];


Meteor.methods({
  'tags.insert'(tag) {
    const currentUser = Meteor.user();
    if (DML_PERMISSIONS_TAG.includes(currentUser.permission)) {
      const idOfinsertedTag = TagsCollection.insert({
        tagName: tag.tagName,
        createdAt: new Date,
        createdBy: currentUser._id,
      });

      if (tag.contactsAssociated && tag.contactsAssociated.length > 0) {
        const contactTags = [];
        tag.contactsAssociated.forEach(contact => {
          contactTags.push({
            contactId: contact._id,
            contactName: contact.firstName + ' ' + contact.lastName,
            tagId: idOfinsertedTag,
            createdAt: new Date,
            createdBy: currentUser._id,
          })
        });
        contactTags.forEach(contactTag => {
          const idOfinsertedContactTag = ContactsTagsCollection.insert(contactTag);
          console.log(idOfinsertedContactTag);
          console.log('#####################');
        })
      } else {
        throw new Meteor.Error('This user is not authorized to insert.');
      }
    }
  },
  'tags.update'(tag) {
    const currentUser = Meteor.user();
    if (DML_PERMISSIONS_TAG.includes(currentUser.permission)) {
      TagsCollection.update(tag._id, {
        $set: {
          tagName: tag.tagName,
          modifiedAt: new Date,
          modifiedBy: currentUser._id
        }
      });

    } else {
      throw new Meteor.Error('This user is not authorized to edit.');
    }
  },
  'tags.remove'(taskId) {
    const currentUser = Meteor.user();
    if (DML_PERMISSIONS_TAG.includes(currentUser.permission)) {
      TagsCollection.remove(taskId);
    } else {
      throw new Meteor.Error('This user is not authorized to delete.');
    }
  },

});