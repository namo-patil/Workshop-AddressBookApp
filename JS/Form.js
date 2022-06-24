class Contact {
    get id() {
      return this._id;
    }
  
    set id(id) {
      this._id = id;
    }
  
    get name() {
      return this._name;
    }
  
    set name(name) {
      let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z]{2,}$');
      if (nameRegex.test(name)) 
      this._name = nameRegex;
      else throw "Incorrect Name";
    }
  
    get phoneNumber() {
        return this._phoneNumber;
    }

    set phoneNumber(phoneNumber) {
        const PHONE_NUMBER_REGEX = RegExp("^[0-9]{2}\s[789][0-9]{9}$");
        if (PHONE_NUMBER_REGEX.test(phoneNumber)) 
        {
            this._phoneNumber = phoneNumber;
        }
        else throw "Incorrect Phone Number";
    } 
    // "^[0-9]{2}\s[789][0-9]{9}"

    get address() {
        return this._address;
    }
    set address(address) 
    {
        const ADDRESS_REGEX = RegExp('^[a-zA-Z0-9#@,&]\s{3,}');
        if (ADDRESS_REGEX.test(address)) {
            this._address = address;
        }
        else throw "Address is incorrect";
    }

    get city() {
        return this._city;
    }

    set city(city) {
        this._city = city;
    }
    
    get state() {
        return this._state;
    }

    set state(state) {
        this._state = state;
    }

    get zip() {
        return this._zip;
    }

    set zip(zip) {
        const ZIP_REGEX = RegExp("^[1-9]{3}?\s[0-9]{3}$");
        if (ZIP_REGEX.test(zip)) {
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
        if (name.value.length == 0) {
            textError.textContent = " ";
            document.getElementById('submitButton').disabled = false;
            return;
        }
        try {
            (new Contact()).name = name.value;
            textError.textContent = " ";
        } catch (error) {
            document.getElementById('submitButton').disabled = true;
            textError.textContent = error;
        }
    });

    const phoneNumber = document.querySelector('#phonenumber');
    const phoneNumberError = document.querySelector('.phone-error');
    phoneNumber.addEventListener('input', function () {
        if (phoneNumber.value.length == 0) {
            phoneNumberError.textContent = " ";
            document.getElementById('submitButton').disabled = true;
            return;
        }
        try {
            (new Contact()).phoneNumber = phoneNumber.value;
            phoneNumberError.textContent = " ";
        } catch (error) {
            document.getElementById('submitButton').disabled = true;
            phoneNumberError.textContent = error;
        }
    });

    const address = document.querySelector('#address');
    const addressError = document.querySelector('.address-error');
    address.addEventListener('input', function () {
        if (address.value.length == 0) {
            addressError.textContent = " ";
            document.getElementById('submitButton').disabled = true;
            return;
        }
        try {
            (new Contact()).address = address.value;
            addressError.textContent = " ";
        } catch (error) {
            document.getElementById('submitButton').disabled = true;
            addressError.textContent = error;
        }
    });

    const zip = document.querySelector('#zip');
    const zipError = document.querySelector('.zip-error');
    zip.addEventListener('input', function () {

        if (zip.value.length == 0) {
            zipError.textContent = " ";
            document.getElementById('submitButton').disabled = true;
            return;
        }
        try {
            (new Contact()).zip = zip.value;
            zipError.textContent = " ";
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

function createContact() {
    let contact = new Contact();
    try 
    {
        contact.name = getInputValueById('#name');
        contact.id = Math.floor(Math.random() * 100);
        contact.phoneNumber = getInputValueById("#phonenumber");
        contact.address = getInputValueById('#address');
        contact.state = getInputValueById("#state");
        contact.city = getInputValueById("#city");
        contact.zip = getInputValueById("#zip");
    } 
    catch (error) 
    {
        console.log(error);
    }
    alert(contact);
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}