import { check } from 'meteor/check';
import { OrganizationsUsersCollection } from '../../db/OrganizationsUsersCollection';




const CONTACT_PERMISSION_KEELA_ADMIN = ['view', 'insert', 'update', 'delete'];
const CONTACT_PERMISSION_ADMIN = ['view', 'insert', 'update', 'delete'];
const CONTACT_PERMISSION_COORDINATOR = ['view'];

const KEELA_ADMIN_USER_PERMISSION = 'keela-admin-permission';
const ADMIN_USER_PERMISSION = 'admin-permission';
const COORDINATOR_USER_PERMISSION = 'coodinator-user-permission';


Meteor.methods({

  'users.insert'(user) {
    const currentUser = Meteor.user();
    if (currentUser.permission == KEELA_ADMIN_USER_PERMISSION) {
      const isKeelaAdmin = user.permission.permission == KEELA_ADMIN_USER_PERMISSION ? true : false;
      console.log('#######################');
      console.log(user);
      Accounts.createUser({
        username: user.username,
        password: user.password,
        profile: {
          isKeelaAdmin: isKeelaAdmin
        }
      });
      const insertedUser = Accounts.findUserByUsername(user.username);
      Meteor.users.update({ _id: insertedUser._id }, { $set: { 'permission': user.permission.permission, 'isKeelaAdmin:': isKeelaAdmin } });
      if (user.orgAssociated && user.orgAssociated.length > 0) {
        const orgUsers = [];
        user.orgAssociated.forEach(org => {
          orgUsers.push({
            userId: insertedUser._id,
            userName: user.username,
            orgId: org._id,
            orgName: org.name,
            createdAt: new Date,
            createdBy: currentUser._id,
            permission: user.permission.permission
          })
        });
        orgUsers.forEach(orgUser => {
          console.log('#######################');
          console.log(orgUser);


          OrganizationsUsersCollection.insert(orgUser);
        })


      }
    } else {
      throw new Meteor.Error('This user is not authorized to insert.');
    }
  },
  'usersOrgs.insert'(user) {
    const currentUser = Meteor.user();
    if (currentUser.permission == KEELA_ADMIN_USER_PERMISSION) {
      const isKeelaAdmin = user.permission.permission == KEELA_ADMIN_USER_PERMISSION ? true : false;
      console.log('#######################');
      console.log(user);
      Accounts.createUser({
        username: user.username,
        password: user.password,
        profile: {
          isKeelaAdmin: isKeelaAdmin
        }
      });
      const insertedUser = Accounts.findUserByUsername(user.username);
      Meteor.users.update({ _id: insertedUser._id }, { $set: { 'permission': user.permission.permission, 'isKeelaAdmin:': isKeelaAdmin } });
      if (user.orgAssociated && user.orgAssociated.length > 0) {
        const orgUsers = [];
        user.orgAssociated.forEach(org => {
          orgUsers.push({
            userId: insertedUser._id,
            userName: user.username,
            orgId: org._id,
            orgName: org.name,
            createdAt: new Date,
            createdBy: currentUser._id,
            permission: user.permission.permission
          })
        });
        orgUsers.forEach(orgUser => {
          console.log('#######################');
          console.log(orgUser);


          OrganizationsUsersCollection.insert(orgUser);
        })


      }
    } else {
      throw new Meteor.Error('This user is not authorized to insert.');
    }
  },
  'users.delete'(user) {
    const currentUser = Meteor.user();
    if(currentUser._id != user._id){
      if (currentUser.permission == KEELA_ADMIN_USER_PERMISSION || currentUser.permission == ADMIN_USER_PERMISSION) {
        if(user.permission != KEELA_ADMIN_USER_PERMISSION){
          Meteor.users.remove(user._id);
        } else {
          throw new Meteor.Error('Keela admin cannot be removed');

        }
      } else {
        throw new Meteor.Error('This user is not authorized to delete.');
      }
    } else {
      throw new Meteor.Error('You cannot remove yourself');
    }
  }

});