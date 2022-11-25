


class CreateApplyForm
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
                id: 'marital_status',
                type: 'text',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: true,
                placeholder: "...single or married?"
            }

            ,
            {
                id: 'application_letter',
                type: 'file',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: true,
                placeholder: "...single or married?"
            }
            ,
            {
                id: 'cv',
                type: 'file',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: true,
                placeholder: "...single or married?"
            }
            ,
            {
                id: 'Olevel_certificate',
                type: 'file',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: true,
                placeholder: "...single or married?"
            }
            ,
            {
                id: 'Olevel_certificate_optional',
                type: 'file',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: false,
                placeholder: "...single or married?"
            },
            {
                id: 'Alevel_certificate',
                type: 'file',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: true,
                placeholder: "...single or married?"
            }
            ,
            {
                id: 'professional_certificate_optional',
                type: 'file',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: false,
                placeholder: "...single or married?"
            }


        ] ;
        this.createForm(this.user, this.fieldsProperties2);
    }

    static validateUserInfor(e) 
    {
        e.preventDefault();
        let fd = new CreateApplyForm(e.target);

        this.error = 0;
        this.errorMsg;
        
        let fieldsProperties2 = fd.fieldsProperties2;
        let inputs = (e.target.querySelectorAll('input.input'));

        for (let i = 0; i < inputs.length; i++) 
            if (!(fieldsProperties2[i]['pattern'].test(inputs[i].value))) {
                this.error++;
                this.errorMsg = inputs[i].value + " - Invalid user or password!";
                break;
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
            console.log(h2);
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
        //Create the form//
        let form = document.createElement('form');
        form.setAttribute('data-user', userInfoElem.dataset.user);
        form.setAttribute('class', 'container_x only__applys');

        //Create the header element for the form
        let headerTitleText = userInfoElem.dataset.user + ' Application Form - [01]';
        let header = document.createElement('header');
        header.style.color = 'darkblue';
        let h2 = document.createElement('h2');
        let headerTitle = document.createTextNode(headerTitleText);
        let headerSubTitle = document.createTextNode('The form below is expected to be filled only candidates seeking employment.');
        h2.append(headerTitle);
        header.append(h2);
        // header.append(headerSubTitle)

        //Insert header element into the form
        form.append(header);
        
        //Create the section (body) element
        let section = document.createElement('section');
        let divBody = document.createElement('div');
        divBody.setAttribute('class', 'body fieldsWrapper');

        
        for (let i = 0; i < fields.length; i++) 
        {
            let div = document.createElement('div');

            let label = document.createElement('label');
            label.setAttribute('for', fields[i].id);
            let labelText = document.createTextNode(wordtoUpper(fields[i].id));
            label.append(labelText);
            div.append(label);
            // divBody.append(label);

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
        
        /**
         * The submit btn
         */
        let subBtn = document.createElement('input');
        subBtn.setAttribute('type', 'submit');
        subBtn.setAttribute('value', 'Submit Application');
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

        //change logo url to point back to home when staff application is showing on the UI  <a href="#" id="app-logo" data-user="Admin" class="login-triggers"> E.F.A ict </a>//
        let homeUrlElem = document.querySelector('.lebel-logo');
        let h3 = homeUrlElem.querySelector('h3');
        h3.innerHTML = `<a href="index.html"> E.F.A ict </a>`;
        homeUrlElem.append(h3);

        //Handle form submission//
        form.onsubmit = CreateApplyForm.validateUserInfor;
        home.innerHTML = '';
        home.append(form);
    }  
}

//Retrieve all anchor-tags that triggers login form
let applyTriggers = document.querySelectorAll('.apply-triggers');

applyTriggers.forEach((trigger, index, applyTriggers) => {
    trigger.addEventListener('click', e => {
        
        e.preventDefault();
        console.log(e.target);
        new CreateApplyForm(e.target);

    });
});









