export function formatCountryCode(value) {
    const re = "^(\\+{1}[\\d]{1,3})?";
    let regex = value.match(re)[0].replace(/\+/g, '');
    if(regex){
        return regex
    }else{
        return;
    }
}

export function formatPhone(value) {
    const re = /^(\S+)\s(.*)/;
    let regex = value.match(re) !== null ? value.match(re)[2] ? value.match(re)[2].replace(/[- )(]/g,'') : null : null;
    if(regex){
        return regex
    }else{
        return;
    }
}

export function parseSecret(value) {
    return value.replace(/-/g,'')
}
