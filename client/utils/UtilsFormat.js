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

export function formatUserParams(email, phone_number, secret, verificationIdPhone, country_code) {
    return {
        data:
            [
                {email, data_type: 'email'},
                {phone_number, data_type: 'phone',
                    verification: {
                        secret,
                        verification_id: verificationIdPhone
                    },
                country_code
                }
            ],
        type: "list"
    }
}

export function formatLoginParams(email_registered, phone_number, secret, verificationIdMail, verificationIdPhone, country_code) {
    return {
        data_points:{
            data:
                [
                    {email: email_registered, data_type:"email",
                        verification:{
                            secret,
                            verification_id: verificationIdMail}
                    },
                    {data_type:"phone", phone_number,
                        verification:{
                            secret,
                            verification_id:verificationIdPhone},
                    country_code}
                ],
            type:"list"
        }
    }
}
