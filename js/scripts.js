// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, address, email) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.address = address
  this.email= email
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}
//User interface logic----------
//variable to store our new contact
let addressBook = new AddressBook()

function displayContactDetails(addressBookToDisplay){
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact){
    htmlForContactInfo += "<li id=" + contact.id +">" + contact.firstName + " " + contact.lastName + "</li>" 
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId){
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".contact-address").html(contact.address);
  $(".contact-email").html(contact.email);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}


function attachContactListeners(){
  $("ul#contacts").on("click", "li", function(){
   showContact(this.id);
  })

  $("#buttons").on("click", ".deleteButton", function(){
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function(){
  attachContactListeners();
  $("form#addresses").submit(function(event){
    event.preventDefault(); 
    const contactFirstName = $("input#contactFName").val();
    const contactLastName = $("input#contactLName").val();
    const contactPhoneNumber = $("input#phoneNumber").val();
    const contactAddress = $("input#contact-address").val();
    const contactEmail = $("input#contact-email").val();
  
    $("input#contactFName").val(" ");
    $("input#contactLName").val(" ");
    $("input#phoneNumber").val(" ");
    $("input#contact-address").val(" ");
    $("input#contact-email").val(" ");
    let newContact = new Contact(contactFirstName, contactLastName, contactPhoneNumber, contactAddress, contactEmail);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});

