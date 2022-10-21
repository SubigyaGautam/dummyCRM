import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ContactsCollection } from '/imports/db/ContactsCollection';
import { OrganizationsCollection } from '/imports/db/OrganizationsCollection';
import { TagsCollection } from '/imports/db/TagsCollection';
import { ContactsTagsCollection } from '/imports/db/ContactsTagsCollection';

// import '/imports/api/methods/contactsMethods';
import '/imports/api/publications/index';
import '../imports/db/ContactsCollection';
import '../imports/api/methods/usersMethods';
import '../imports/api/methods/organizationsMethods';
import '../imports/api/methods/tagsMethods';
import '../imports/api/methods/contactsMethods';




const KEELA_ADMIN_USERNAME = 'KeelaAdmin';
const KEELA_ADMIN_PASSWORD = 'password';

const ADMIN_USERNAME = 'Admin';
const ADMIN_PASSWORD = 'password';

const COORDINATOR_USERNAME = 'co';
const COORDINATOR__PASSWORD = 'password';

const KEELA_ADMIN_USER_PERMISSION = 'keela-admin-permission';
const ADMIN_USER_PERMISSION = 'admin-permission';
const COORDINATOR_USER_PERMISSION = 'coodinator-user-permission';


const insertOrganization = organization => OrganizationsCollection.insert({
    name: organization.name,
    email: organization.email,
    phone: organization.phone
});

const insertContact = contact => ContactsCollection.insert({
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone
});

const insertTag = tagName => TagsCollection.insert({
    tagName: tagName
});

const insertContactTag = contactTag => ContactsTagsCollection.insert({
    contactId: contactTag.contactId,
    tagId: contactTag.tagId,
    contactName: contactTag.contactName,
    tagName: contactTag.tagName,
});

Meteor.startup(() => {

    const contactsToInsert = [
        {
            'firstName': 'contact1 for tag1',
            'lastName': 'test last name1',
            'email': 'testEmail@test.com',
            'phone': 123456
        },
        {
            'firstName': 'contact1 for tag2',
            'lastName': 'test last name2',
            'email': 'testEmail2@test.com',
            'phone': 223456
        },
        {
            'firstName': 'contact2 for tag1',
            'lastName': 'test last name3',
            'email': 'testEmail3@test.com',
            'phone': 333456
        }, {
            'firstName': 'contact2 for tag2',
            'lastName': 'test last name4',
            'email': 'testEmail4@test.com',
            'phone': 444456
        }, {
            'firstName': 'test first name5',
            'lastName': 'test last name5',
            'email': 'testEmail5@test.com',
            'phone': 555556
        },
    ]

    const tagsToInsert = ['Test Tag1', 'Test tag2'];

    const organizationsToInsert = [{
        name: 'Organization1',
        email: 'organization1@organization1.com',
        phone: 1111111111
    }, {
        name: 'Organization2',
        email: 'organization2@organization2.com',
        phone: 2222222222
    }, {
        name: 'Organization3',
        email: 'organization3@organization3.com',
        phone: 3333333333
    }];

    if (!Accounts.findUserByUsername(KEELA_ADMIN_USERNAME)) {
        Accounts.createUser({
            username: KEELA_ADMIN_USERNAME,
            password: KEELA_ADMIN_PASSWORD,
            profile : {
                isKeelaAdmin : true
            }
        });
        const keelaAdminUser = Accounts.findUserByUsername(KEELA_ADMIN_USERNAME);
        Meteor.users.update({ _id: keelaAdminUser._id }, { $set: { 'permission': KEELA_ADMIN_USER_PERMISSION, 'isKeelaAdmin:': true } });
    }

    if (!Accounts.findUserByUsername(ADMIN_USERNAME)) {
        Accounts.createUser({
            username: ADMIN_USERNAME,
            password: ADMIN_PASSWORD,
            profile : {
                isKeelaAdmin : false
            }
        });
        const adminUser = Accounts.findUserByUsername(ADMIN_USERNAME);
        Meteor.users.update({ _id: adminUser._id }, { $set: { 'permission': ADMIN_USER_PERMISSION } });

    }

    if (!Accounts.findUserByUsername(COORDINATOR_USERNAME)) {
        Accounts.createUser({
            username: COORDINATOR_USERNAME,
            password: COORDINATOR__PASSWORD,
            profile : {
                isKeelaAdmin : false
            }
        });
        const coordinatorUser = Accounts.findUserByUsername(COORDINATOR_USERNAME);
        Meteor.users.update({ _id: coordinatorUser._id }, { $set: { 'permission': COORDINATOR_USER_PERMISSION } });
    }

    console.log('Collections in server main.js' + ContactsCollection.find().count());
    if (ContactsCollection.find().count() === 0) {
        contactsToInsert.forEach(insertContact)
    }

    if (TagsCollection.find().count() === 0) {
        tagsToInsert.forEach(insertTag)
    }

    if (OrganizationsCollection.find().count() === 0) {
        organizationsToInsert.forEach(insertOrganization)
    }

    if (ContactsTagsCollection.find().count() == 0) {
        const contacts1 = ContactsCollection.find({ firstName: { $regex: /for tag1/ } }).fetch();
        const contacts2 = ContactsCollection.find({ firstName: { $regex: /for tag2/ } }).fetch();

        const tags = TagsCollection.find({}).fetch();
        console.log(contacts1);
        console.log(tags);


        [{
            'contactId': contacts1[0]._id,
            'tagId': tags[0]._id,
            'contactName': contacts1[0].firstName + ' ' + contacts1[0].lastName,
            'tagName': tags[0].tagName
        },
        {
            'contactId': contacts1[1]._id,
            'tagId': tags[1]._id,
            'contactName': contacts1[1].firstName + ' ' + contacts1[1].lastName,
            'tagName': tags[1].tagName
        }, {
            'contactId': contacts2[0]._id,
            'tagId': tags[0]._id,
            'contactName': contacts2[0].firstName + ' ' + contacts2[0].lastName,
            'tagName': tags[0].tagName
        }, {
            'contactId': contacts2[0]._id,
            'tagId': tags[1]._id,
            'contactName': contacts2[1].firstName + ' ' + contacts2[1].lastName,
            'tagName': tags[1].tagName
        }
        ].forEach(insertContactTag);

    }


});