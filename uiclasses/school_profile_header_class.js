class SchoolProfile 

{

    // showSchoolHeader
    constructor()
    {
        this.schoolShortName = 'Al-ilham';
        this.schoolFulname = 'Al-ilham Islamic College';
        this.schoolSections = 'Day-care, Nursery, Primary, Secondary and Islamiyya School';
        this.schoolAddress = 'Kofar Guga Katsina';
        this.schoolPhone = '08060325997';
        this.schoolLogo = 'LOGO';
        this.motto = 'Knowlegde is light';
        this.email = 'alilhamislamiccollege2017@gmail.com';
    }



    showSchoolHeader()
    {
        //Create the school profile div 
        this.wrapperDiv = document.createElement('div');
        this.wrapperDiv.setAttribute('class', 'schoolAddressHeader');
        // this.wrapperDiv.append(this.wrapperDiv);

        //Create logo div 
        this.logoDiv = document.createElement('div');
        this.logoDiv.setAttribute('class', 'logo');

        //Create logo image
        this.logoImg = document.createElement('img');
        // this.logoDiv.style.width = '400px';
        // this.logoDiv.style.height = '400px';
        this.logoImg.src = './images/logo.jpg';

        //Put the image into the logo-div
        this.logoDiv.append(this.logoImg);
        this.wrapperDiv.append(this.logoDiv);

        //Create the profile div 
        this.profileDive = document.createElement('div');
        this.profileDive.setAttribute('class', 'profile');

        //Create the h1 for school name
        this.nameH1 = document.createElement('h1');
        this.nameH1.style.color = 'darkblue';
        this.nameH1.style.paddingTop = '2rem';
        this.nameH1.append(document.createTextNode(this.schoolFulname));
        this.profileDive.append(this.nameH1);

        //Create the h3 for school section 
        this.sectionH3 = document.createElement('h3');
        this.sectionH3.append(document.createTextNode(this.schoolSections));
        this.profileDive.append(this.sectionH3);

        //Create the school address paragraph
        this.schoolAddressParagraph = document.createElement('p');
        this.schoolAddressParagraph.append(document.createTextNode(this.schoolAddress));
        this.profileDive.append(this.schoolAddressParagraph);

        //Create the phone and email paragraph
        this.phoneEmailParagraph = document.createElement('p');
        //Tell
        this.tellBtag = document.createElement('b');
        this.tellBtag.append(document.createTextNode('Tell:'));
        this.phoneEmailParagraph.append(this.tellBtag);
        this.phoneEmailParagraph.append(document.createTextNode(this.schoolPhone));
        //Email
        this.emailBtag = document.createElement('b');
        this.emailBtag.append(document.createTextNode(' Email:'));
        this.phoneEmailParagraph.append(this.emailBtag);
        this.phoneEmailParagraph.append(document.createTextNode(this.email));
        this.profileDive.append(this.phoneEmailParagraph);

        //create the motto paragrap
        this.mottoParagraph = document.createElement('p');
        this.mottoBtag = document.createElement('b');
        this.mottoBtag.append(document.createTextNode('Motto:'));
        this.mottoParagraph.append(this.mottoBtag);
        this.mottoParagraph.append(document.createTextNode(this.motto));
        this.profileDive.append(this.mottoParagraph);

        
        this.wrapperDiv.append(this.profileDive);

        // document.querySelector('.only__applys').prepend(this.wrapperDiv);
        return this.wrapperDiv;

        

    }    
}


// let foo = new SchoolProfile();
// foo.buildInterface();