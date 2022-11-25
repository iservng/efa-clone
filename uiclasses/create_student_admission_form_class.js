


class CreateAdmissionForm
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
                id: 'passport',
                type: 'file',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: true,
                placeholder: "...enter your firstname"

            },
            {
                id: 'firstname',
                type: 'text',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: true,
                placeholder: "...enter your firstname"

            },
            {
                id: 'lastname',
                type: 'text',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: true,
                placeholder: "...enter your lastname"

            },
            {
                id: 'othername',
                type: 'text',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: true,
                placeholder: "...enter your othername"

            },           
            {
                id: 'email',
                type: 'email',
                pattern: /^[a-zA-Z0-9\.@-]{3,30}$/,
                require: true,
                placeholder: "...enter your email"

            }, 
            {
                id: 'password',
                type: 'password',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: true,
                placeholder: "...enter your password"
            },
            {
                id: 'confirm_password',
                type: 'password',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: true,
                placeholder: "...re-enter your password"
            },
            {
                id: 'address',
                type: 'text',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: true,
                placeholder: "...enter your address"
            },
            {
                id: 'gender',
                type: 'text',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: true,
                placeholder: "...enter your gender"
            },
            {
                id: 'dateofbirth',
                type: 'date',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: true,
                placeholder: "...date of birth"
            },
            {
                id: 'phone',
                type: 'text',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: true,
                placeholder: "...enter your phone"
            },
            {
                id: 'state',
                type: 'text',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: true,
                placeholder: "...enter your state of origin"
            },
            {
                id: 'lga',
                type: 'text',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: true,
                placeholder: "...enter local government area"
            },
            {
                id: 'nationality',
                type: 'text',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: true,
                placeholder: "...enter your nationality"
            },
            {
                id: 'father_name',
                type: 'text',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: true,
                placeholder: "...enter father's full name"
            },
            {
                id: 'mother_name',
                type: 'text',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: true,
                placeholder: "...enter mother's full name"
            },
            {
                id: 'father_phone',
                type: 'text',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: true,
                placeholder: "...enter father's phone number"
            },

            {
                id: 'mother_phone',
                type: 'text',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: true,
                placeholder: "...enter mother's phone number"
            },
            

        ];

        if (sessionStorage.getItem('school_section') === 'secondary') 
        {
            this.fieldsProperties2.push({
                id: 'zlattan',
                type: 'file',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: true,
                placeholder: "...enter mother's phone number"
            });
        }

        this.createForm(this.user, this.fieldsProperties2);
    }

    static validateUserInfor(e) 
    {
        e.preventDefault();
        let fd = new CreateAdmissionForm(e.target);

        this.error = 0;
        this.errorMsg;
        
        let fieldsProperties2 = fd.fieldsProperties2;
        let inputs = (e.target.querySelectorAll('input.input'));
        for (let i = 0; i < inputs.length; i++) 
        {
            if (!(fieldsProperties2[i]['pattern'].test(inputs[i].value))) {
                this.error++;
                this.errorMsg = inputs[i].value + " - Invalid user or password!";
                break;
            }

        }
            
        
        //Loader animation
        document.querySelector("div.body").innerHTML = `<div class="loaderText"> Checking please wait </div>`;
       
        if (this.error === 0) {
            console.log("Wow no error");
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
        // form.style.marginBottom = '3rem';
        form.setAttribute('data-user', userInfoElem.dataset.user);
        form.setAttribute('class', 'container_x only__applys');

        //Inject the header
        this.schoolInterface = new SchoolProfile();
        form.prepend(this.schoolInterface.showSchoolHeader());

        //Create the header element for the form
        let headerTitleText = userInfoElem.dataset.user + ' Registration';
        let header = document.createElement('header');
        header.style.color = 'red';
        let h2 = document.createElement('h2');
        h2.style.paddingTop = '1.5rem';
        h2.style.paddingBottom = '1.5rem';
        h2.style.textAlign = 'center';
        let headerTitle = document.createTextNode(headerTitleText);


        //Subheading side of the form
        let small1 = document.createElement('div');
        small1.style.textAlign = 'center';
        let headerSubTitle = document.createTextNode('Please note, birth certificate and passport are required, all information provided must be accurate.');
        small1.append(headerSubTitle);

        h2.append(headerTitle);
        header.append(h2);
        header.append(small1);

        //Insert header element into the form
        form.append(header);
        
        //Create the section (body) element
        let section = document.createElement('section');
        let divBody = document.createElement('div');
        divBody.setAttribute('class', 'body fieldsWrapper');

        
        for (let i = 0; i < fields.length; i++) 
        {
            if (fields[i].id == 'passport') 
            {

                let div = document.createElement('div');
                let label = document.createElement('label');
                label.setAttribute('for', fields[i].id);
                let labelText = document.createTextNode(wordtoUpper(fields[i].id));
                label.append(labelText);
                div.append(label);

                let passportInput = document.createElement('input');
                passportInput.onchange = UserPassport.showOnScreen;
                passportInput.setAttribute('id', fields[i].id);
                passportInput.setAttribute('type', fields[i].type);
                passportInput.setAttribute('name', fields[i].id);
                passportInput.setAttribute('placeholder', fields[i].placeholder);
                passportInput.setAttribute('required', fields[i].require);
                passportInput.setAttribute('class', 'input');
                div.append(passportInput);
                divBody.append(div);

            } 
            else 
            {

                let div = document.createElement('div');
                let label = document.createElement('label');
                label.setAttribute('for', fields[i].id);
                let labelText = document.createTextNode(wordtoUpper(fields[i].id));
                label.append(labelText);
                div.append(label);

                let input = document.createElement('input');
                input.setAttribute('id', fields[i].id);
                input.setAttribute('type', fields[i].type);
                input.setAttribute('name', fields[i].id);
                input.setAttribute('placeholder', fields[i].placeholder);
                input.setAttribute('required', fields[i].require);
                input.setAttribute('class', 'input');
                div.append(input);
                divBody.append(div);

            }
        }
        /**
         * The submit btn
         */
        let subBtn = document.createElement('input');
        subBtn.setAttribute('type', 'submit');
        subBtn.setAttribute('value', 'Submit Application');
        subBtn.setAttribute('class', 'btn');
        
        // Insert divBody into the section-tag of the form and Add the section in to the form
        section.append(divBody);
        form.append(section);


        //create the div to contain only the submit btn
        let submitDiv = document.createElement('section');
        submitDiv.append(subBtn);
        form.append(submitDiv);

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

        //change logo url to point back to home when staff application is showing on the UI  <a href="#" id="app-logo" data-user="Admin" class="login-triggers"> E.F.A ict </a>
        let homeUrlElem = document.querySelector('.lebel-logo');
        let h3 = homeUrlElem.querySelector('h3');
        h3.innerHTML = `<a href="index.html"> E.F.A ict </a>`;
        homeUrlElem.append(h3);

        //Handle form submission
        form.onsubmit = CreateAdmissionForm.validateUserInfor;
        home.innerHTML = '';
        home.append(form);
    }  
}











