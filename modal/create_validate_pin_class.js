class AdmissionPin
{

    //This class is realy responsible for talking to firebase not checking if the pin entered is correct, rather it checks to see if firebase has a record of this particular pin and that its not been used.
    static validate(form)
    {
        this.pinIsAvailable = true;
        this.errorMsg;

        if(this.pinIsAvailable)
        {
            console.log('Yess');
            this.formCreated = new CreateAdmissionForm(form);
            return;
        }
        else 
        {
            document.querySelector(".home_container").innerHTML = '';
            
            let header = form.querySelector('header');
            let h2 = header.querySelector('h2');

            header.innerHTML = '';
            header.style.color = 'red';
            header.append(h2);
            header.append('Firebase cant find this PIN');
            
            document.querySelector(".home_container").append(form);
            return false;
        }
    }

}