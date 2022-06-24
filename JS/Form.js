class Contact {
    get id() {
      return this._id;
    }
  
    set id(value) {
      this._id = value;
    }
  
    get name() {
      return this._name;
    }
  
    set name(value) {
      let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z]{2,}\s[A-Z]{1}[a-zA-Z]{2,}$');
      if (nameRegex.test(value)) 
      this._name =value;
      else throw "Incorrect Name";
    }
  
    get phoneNumber() {
        return this._phoneNumber;
    }

    set phoneNumber(value) {
        const PHONE_NUMBER_REGEX = RegExp("^[0-9]{2}\\s[789][0-9]{9}$");
        if (PHONE_NUMBER_REGEX.test(value)) 
        {
            this._phoneNumber = value;
        }
        else throw "Incorrect Phone Number";
    } 

    get address() {
        return this._address;
    }
    set address(value) 
    {
        const ADDRESS_REGEX = RegExp('(^[a-zA-Z0-9#@,&()*\\s]{3,}$)*');
        if (ADDRESS_REGEX.test(value)) {
            this._address = value;
        }
        else throw "Address is incorrect";
    }

    get city() {
        return this._city;
    }

    set city(value) {
        this._city = value;
    }
    
    get state() {
        return this._state;
    }

    set state(value) {
        this._state = value;
    }

    get zip() {
        return this._zip;
    }

    set zip(value) {
        const ZIP_REGEX = RegExp("^[1-9]{3}?\s[0-9]{3}$");
        if (ZIP_REGEX.test(value)) {
            this._zip = value;
        }
        else throw "Zip code is incorrect";        
    }

    toString() 
    {
        return 'name=' + this._name + 
        ', phone number=' + this._phoneNumber + ', address=' + this._address + ', city=' + this._city + 
        ', state=' + this._state + ', zip code=' + this._zip;
    }
}  

window.addEventListener('DOMContentLoaded', (event) => {

    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length != 0) {
            textError.textContent = "";
            document.getElementById('submitButton').disabled = false;
            return;
        }
        try {
            (new Contact()).name = name.value;
            textError.textContent = "";
        } catch (error) {
            document.getElementById('submitButton').disabled = true;
            textError.textContent = error;
        }
    });

    const phoneNumber = document.querySelector('#phonenumber');
    const phoneNumberError = document.querySelector('.phone-error');
    phoneNumber.addEventListener('input', function () {
        if (phoneNumber.value.length == 0) {
            phoneNumberError.textContent = "";
            document.getElementById('submitButton').disabled = true;
            return;
        }
        try {
            (new Contact()).phoneNumber = phoneNumber.value;
            phoneNumberError.textContent = "";
        } catch (error) {
            document.getElementById('submitButton').disabled = true;
            phoneNumberError.textContent = error;
        }
    });

    const address = document.querySelector('#address');
    const addressError = document.querySelector('.address-error');
    address.addEventListener('input', function () {
        if (address.value.length == 0) {
            addressError.textContent = "";
            document.getElementById('submitButton').disabled = true;
            return;
        }
        try {
            (new Contact()).address = address.value;
            addressError.textContent = "";
        } catch (error) {
            document.getElementById('submitButton').disabled = true;
            addressError.textContent = error;
        }
    });

    const zip = document.querySelector('#zip');
    const zipError = document.querySelector('.zip-error');
    zip.addEventListener('input', function () {

        if (zip.value.length == 0) {
            zipError.textContent = "";
            document.getElementById('submitButton').disabled = true;
            return;
        }
        try {
            (new Contact()).zip = zip.value;
            zipError.textContent = "";
            if (zip.value && phoneNumber.value && name.value == true) {
                document.getElementById('submitButton').disabled = false;
            }
            
        } catch (error) {
            document.getElementById('submitButton').disabled = true;
            zipError.textContent = error;
        }
    });
});

const save = () => {
    try {
        let contact = createContact();
        createAndUpdateStorage(contact);
    } catch (error) {
        return;
    }
}

const createContact = () => {
    let contact = new Contact();
    try {
    } catch(e){
        setTextValue(".text-error", e);
      throw e;
    }
    try {
        contact.name = getInputValueById("#name");
        contact.id = Math.floor(Math.random() * 100);
        contact.phoneNumber = getInputValueById("#phonenumber");
        contact.address = getInputValueById("#address");
        contact.state = getSelectedValues("[name=state]");
        contact.city = getInputValueById("[name=city]");
        contact.zip = getInputValueById("#zip");
    } 
    catch (error) {
        console.log(error);
    }
   return contact;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    // let setItems = [];
    allItems.forEach((item) => {
      if (item.checked) setItems.push(item.value);
    });
    return setItems;
};

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

// function createAndUpdateStorage() {
//     let contactList = JSON.parse(localStorage.getItem("ContactList"));
// }

const createAndUpdateStorage = (contact) => {
    let contactList = JSON.parse(localStorage.getItem("ContactList"));
    if (contactList != undefined) {
      contactList.push(contact);
    } else {
      contactList = [contact];
    }
    alert("Contact Added Sucessfully");
    localStorage.setItem("ContactList", JSON.stringify(contactList));
}

const resetForm = () => {
    setValue('#name', ' ');
    setValue('#address', ' ');
    setValue('#phoneNumber', ' ');
    setValue('#zip', ' ');
    unsetSelectedValues('[name=state');
    unsetSelectedValues('[name=city]');
  }

// const cancel = () => {
//     lin
// }  
  
  const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
  }
  
  const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
  }
  
  const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
  }
  
  const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
  }
  
  const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
  }

