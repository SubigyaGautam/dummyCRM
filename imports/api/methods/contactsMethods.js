import { check } from 'meteor/check';
import { ContactsCollection } from '/imports/db/ContactsCollection';
import { ContactsTagsCollection } from '/imports/db/ContactsTagsCollection';



const CONTACT_PERMISSION_KEELA_ADMIN = ['view', 'insert', 'update', 'delete'];
const CONTACT_PERMISSION_ADMIN = ['view', 'insert', 'update', 'delete'];
const CONTACT_PERMISSION_COORDINATOR = ['view'];

const KEELA_ADMIN_USER_PERMISSION = 'keela-admin-permission';
const ADMIN_USER_PERMISSION = 'admin-permission';
const COORDINATOR_USER_PERMISSION = 'coodinator-user-permission';

  
Meteor.methods({

  'contacts.insert'(contact) {
    const currentUser = Meteor.user();
    if (currentUser.permission == KEELA_ADMIN_USER_PERMISSION || currentUser.permission == ADMIN_USER_PERMISSION) {
      const insertedContactId = ContactsCollection.insert({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        createdAt: new Date,
        createdBy: currentUser._id,
      });
      console.log('___________________');
      console.log(insertedContactId);

      if (contact.tags && contact.tags.length > 0) {
        const contactTags = [];
        contact.tags.forEach(tag => {
          contactTags.push({
            contactId: insertedContactId,
            contactName :  contact.firstName + ' ' + contact.lastName,
            tagId: tag._id, 
            tagName: tag.tagName,
            createdAt: new Date,
            createdBy: currentUser._id,
          })
        });
        contactTags.forEach(contactTag=>{
          ContactsTagsCollection.insert(contactTag);
        })
        
        
      }
    } else {
      throw new Meteor.Error('This user is not authorized to insert.');
    }
  },
  'contacts.update'(contact) {
    const currentUser = Meteor.user();
    console.log(currentUser);
    if (currentUser.permission == KEELA_ADMIN_USER_PERMISSION || currentUser.permission == ADMIN_USER_PERMISSION) {
      ContactsCollection.update(contact._id, {
        $set: {
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          phone: contact.phone,
          modifiedAt: new Date,
          modifiedBy: currentUser._id
        }
      });

    } else {
      throw new Meteor.Error('This user is not authorized to edit.');
    }
  },
  'contacts.remove'(taskId) {
    const currentUser = Meteor.user();
    if (currentUser.permission == KEELA_ADMIN_USER_PERMISSION || currentUser.permission == ADMIN_USER_PERMISSION) {
      ContactsCollection.remove(taskId);
    } else {
      throw new Meteor.Error('This user is not authorized to delete.');
    }
  },

});