class CreateLogin
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
                id: 'email',
                name: 'email',
                type: 'email',
                pattern: /^[a-zA-Z0-9\.@-]{3,30}$/,
                require: true,
                
                placeholder: "...enter your email"

            }, 
            {
                id: 'password',
                name: 'password',
                type: 'password',
                pattern: /^[a-zA-Z0-9]{3,30}$/,
                require: true,
                placeholder: "...enter your password"
            } 
        ] ;
        this.createForm(this.user, this.fieldsProperties2);
    }

    static validateUserInfor(e) 
    {
        e.preventDefault();
        console.log(e.target.dataset);
        let fd = new CreateLogin(e.target);
        console.log(fd);

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
        document.querySelector("div.body").innerHTML = `<div class="loaderText">please wait</div>`;
       
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
        //Create the form
        let form = document.createElement('form');
        form.setAttribute('data-user', userInfoElem.dataset.user);
        form.setAttribute('class', 'container only__logins');

        //Create the header element for the form
        let headerTitleText = userInfoElem.dataset.user + ' Login';
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
            let label = document.createElement('label');
            label.setAttribute('for', fields[i].name);
            let labelText = document.createTextNode(fields[i].name);
            label.append(labelText);
            divBody.append(label);

            let input = document.createElement('input');
            input.setAttribute('id', fields[i].id);
            input.setAttribute('type', fields[i].type);
            input.setAttribute('name', fields[i].name);
            input.setAttribute('placeholder', fields[i].placeholder);
            input.setAttribute('required', fields[i].require);
            input.setAttribute('class', 'input');
            divBody.append(input);
            
        }
        
        /**
         * The submit btn
         */
        let subBtn = document.createElement('input');
        subBtn.setAttribute('type', 'submit');
        subBtn.setAttribute('value', 'Login');
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
        form.onsubmit = CreateLogin.validateUserInfor;
        home.innerHTML = '';
        home.append(form);
    }  
}

//Retrieve all anchor-tags that triggers login form
let loginTriggers = document.querySelectorAll('.login-triggers');

loginTriggers.forEach((trigger, index, loginTriggers) => {
    trigger.addEventListener('click', e => {
        
        e.preventDefault();
        new CreateLogin(e.target);

    });
});
