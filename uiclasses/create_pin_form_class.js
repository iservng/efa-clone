




// THIS CLASS WORKS WITH THE SCHOOL-BRANCHES-CLASS TO ATTACH A BRANCH-ID TO EACH PIN ACCORDING TO THE BRANCH ITS GENERATED FOR ?

class CreatePinForm
{
    /**
     * This class will get information about the login form and who the form is for eaither the student login or the staff login
     */
    

    constructor(user) 
    {
       
        this.user = user;
        this.fieldsProperties2 = 
        [
           
            {
                id: 'PIN',
                name: 'PIN',
                type: 'text',
                pattern: /^[a-zA-Z0-9]{16}$/,
                require: true,
                placeholder: "...enter application PIN",
                inputfieldelem: 'input',

            }, 
            {
                id: 'section',
                name: 'school_section',
                type: 'text',
                pattern: /^[0-9]{1,2}$/,
                require: true,
                placeholder: "What section are applying to?",
                inputfieldelem: 'select',
                optionsArr: ['Nursery', 'Primary', 'Secondary'],

            }, 
            {
                id: 'class',
                name: 'class_option',
                type: 'text',
                pattern: /^[0-9]{1,2}$/,
                require: true,
                placeholder: "What class are you applying to?",
                inputfieldelem: 'select',
                
                optionsArr: ['Nursery', 'Primary', 'Secondary'],

            }, 
        ] ;
        this.createForm(this.user, this.fieldsProperties2);
    }

    static validateUserInfor(e) 
    {
        e.preventDefault();
        let fd = new CreatePinForm(e.target);
        this.error = 0;
        this.errorMsg;
        
        let fieldsProperties2 = fd.fieldsProperties2;
        let inputs = (e.target.querySelectorAll('input.input'));
        for (let i = 0; i < inputs.length; i++) 
            if (!(fieldsProperties2[i]['pattern'].test(inputs[i].value))) {
                this.error++;
                this.errorMsg = inputs[i].value + " - Invalid PIN!";
                break;
            }
        
        //Loader animationwordtoUpper
        document.querySelector("div.body").innerHTML = `<div class="loaderText">please wait</div>`;
       
        if (this.error === 0) {
            /**
             * THIS IS WHERE THE CLASS RESPONSIBLE FOR 
             * FIREBASE RETRIVAL OF PIN IS DONE 
             * 
             */
            AdmissionPin.validate(e.target);
        } else {

            document.querySelector(".home_container").innerHTML = '';
            let form = (e.target);
            let header = form.querySelector('header');
            let h2 = header.querySelector('h2');
            
            header.innerHTML = '';
            header.style.color = 'red';
            header.append(h2);
            header.append(this.errorMsg);
            
            document.querySelector(".home_container").append(form);
            return false;
        }
    }


    createForm(userInfoElem, fields)
    {
        //Create the form
        let form = document.createElement('form');
        form.setAttribute('data-user', userInfoElem.dataset.user);
        form.setAttribute('class', 'container only__logins');

        //Create the header element for the form
        let headerTitleText = userInfoElem.dataset.user + ' Pin';
        let header = document.createElement('header');
        let h2 = document.createElement('h2');
        let headerTitle = document.createTextNode(headerTitleText);
        h2.append(headerTitle);
        header.append(h2);

        //Insert header element into the form
        form.append(header);
        
        //Create the section (body) element
        let section = document.createElement('section');
        let divBody = document.createElement('div');
        divBody.setAttribute('class', 'body');

        
        for (let i = 0; i < fields.length; i++) 
        {
            // inputfieldelem
            if (fields[i].inputfieldelem == 'input') {

                let label = document.createElement('label');
                label.setAttribute('for', fields[i].name);
                let labelText = document.createTextNode(wordtoUpper(fields[i].name));
                label.append(labelText);
                divBody.append(label);

                let input = document.createElement(fields[i].inputfieldelem);
                input.setAttribute('id', fields[i].id);
                input.setAttribute('type', fields[i].type);
                input.setAttribute('name', fields[i].name);
                input.setAttribute('placeholder', fields[i].placeholder);
                input.setAttribute('required', fields[i].require);
                input.setAttribute('class', 'input');
                divBody.append(input);

            } else {

                let label = document.createElement('label');
                label.setAttribute('for', fields[i].name);
                let labelText = document.createTextNode(wordtoUpper(fields[i].name));
                label.append(labelText);
                divBody.append(label);
                let select = document.createElement(fields[i].inputfieldelem);
                
                if (fields[i].inputfieldelem === 'select' && fields[i].name === 'school_section')
                    select.onchange = UserSchoolSection.handleSectionOption;

                select.setAttribute('id', fields[i].id);
                select.setAttribute('name', fields[i].name);
                select.setAttribute('placeholder', fields[i].placeholder);
                select.setAttribute('required', fields[i].require);
                select.setAttribute('class', 'input');

                //Create an insert the empty options tag
                let option_empty = document.createElement('option');
                option_empty.setAttribute('value', '');
                option_empty.append(document.createTextNode('Select Section to apply to'));
                select.append(option_empty);
                
                //Create and insert the values of the options tag
                fields[i].optionsArr.forEach((item, j) => {

                    let option = document.createElement('option');
                    option.setAttribute('value', (j+1));
                    option.append(document.createTextNode(item));
                    //insert the two options tag
                    select.append(option);

                });

                divBody.append(select);
                
            }
            

            
            
        }
        
        /**
         * The submit btn
         */
        let subBtn = document.createElement('input');
        subBtn.setAttribute('type', 'submit');
        subBtn.setAttribute('value', 'Validate PIN');
        subBtn.setAttribute('class', 'btn');
        
        divBody.append(subBtn);
        section.append(divBody);

        //Add the section in to the form
        form.append(section);

        //Create the form-footer tag
        let footer = document.createElement('footer');
        let small = document.createElement('small');
        small.append(document.createTextNode('Powered by '))
        footer.append(small);

        let b = document.createElement('b');
        b.append(document.createTextNode('iservng'));
        footer.append(b);

        let home = document.querySelector('.home_container');
        form.append(footer);

        //Handle form submission
        form.onsubmit = CreatePinForm.validateUserInfor;
        home.innerHTML = '';
        home.append(form);
    }  
}

//Retrieve all anchor-tags that triggers login form
let pinTriggers = document.querySelectorAll('.pin-triggers');

pinTriggers.forEach((trigger, index, pinTriggers) => {
    trigger.addEventListener('click', e => {
        
        e.preventDefault();
        // console.log(e.target);
        new CreatePinForm(e.target);

    });
});









//