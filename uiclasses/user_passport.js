class UserPassport
{
    static showOnScreen(e)
    {
        this.passport = e.target.files[0];
        this.userForm = e.target.form;

        let reader = new FileReader();
        reader.readAsDataURL(this.passport);
        reader.onload = () => 
        {
            if (this.userForm.querySelector('aside'))
            {
                this.userForm.querySelector('aside').remove();
                this.pixBin = reader.result;
                let aside = document.createElement('aside');
                aside.style.padding = '2rem';
                aside.style.background = 'white';

                let img = document.createElement('img');
                img.style.width = '150px';
                img.style.height = '150px';
                img.src = this.pixBin;

                aside.append(img);

                let header = this.userForm.querySelector('header');
                header.after(aside);

            }  
            else 
            {
                this.pixBin = reader.result;
                let aside = document.createElement('aside');
                aside.style.padding = '2rem';
                aside.style.background = 'white';

                let img = document.createElement('img');
                img.style.width = '150px';
                img.style.height = '150px';
                img.src = this.pixBin;

                aside.append(img);

                let header = this.userForm.querySelector('header');
                header.after(aside);
            }
        };
    }
}