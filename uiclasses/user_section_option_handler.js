
class UserSchoolSection
{   
    static handleSectionOption(e)
    {
        if (+e.target.value === 3 && e.target.name === 'school_section') 
            sessionStorage.setItem(e.target.name, 'secondary'); 
        else 
            sessionStorage.clear();
    }

}
