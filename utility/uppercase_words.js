const wordtoUpper = (wordTitle) => {
    if (wordTitle.search('_') > 0) {

        let wordArr = wordTitle.split('_');
        let nu = '';
        wordArr.forEach(word => {
            nu += word.replace(word.charAt(0), word.slice(0, 1).toUpperCase())+' ';
        });
        return (nu);
    } else {
        return wordTitle.replace(wordTitle.charAt(0), wordTitle.slice(0, 1).toUpperCase());
    }     
};