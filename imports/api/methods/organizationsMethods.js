import { check } from 'meteor/check';
import { OrganizationsCollection } from '/imports/db/OrganizationsCollection';  



const ORGANIZATION_PERMISSION_KEELA_ADMIN = [ 'view','insert','update', 'delete'];
const ORGANIZATION_PERMISSION_ADMIN = [ 'view'];
const ORGANIZATION_PERMISSION_COORDINATOR = [ 'view'];

const KEELA_ADMIN_USER_PERMISSION = 'keela-admin-permission';

Meteor.methods({

  'organizations.insert'(organization) {
    const currentUser = Meteor.user();
    if (currentUser.permission == KEELA_ADMIN_USER_PERMISSION ) {
      const insertedOrganizationId = OrganizationsCollection.insert({
        name: organization.name,
        email: organization.email,
        phone: organization.phone,
        createdAt: new Date,
        createdBy: currentUser._id,
      });
      console.log('insertedOrganizationId :' + insertedOrganizationId);

    } else {
      throw new Meteor.Error('This user is not authorized to insert.');
    }
  },
  'organizations.update'(organization) {
    const currentUser = Meteor.user();
    console.log(currentUser);
    if (currentUser.permission == KEELA_ADMIN_USER_PERMISSION) {
      OrganizationsCollection.update(organization._id, {
        $set: {
          name: organization.name,
          email: organization.email,
          phone: organization.phone,
          modifiedAt: new Date,
          modifiedBy: currentUser._id
        }
      });

    } else {
      throw new Meteor.Error('This user is not authorized to edit.');
    }
  },
  'organizations.remove'(organizationId) {
    const currentUser = Meteor.user();
    if (currentUser.permission == KEELA_ADMIN_USER_PERMISSION) {
      OrganizationsCollection.remove(organizationId);
    } else {
      throw new Meteor.Error('This user is not authorized to delete.');
    }
  },

});

