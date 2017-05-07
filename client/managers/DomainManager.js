export default class DomainManager{
	constructor(api) {
		this.api = api;
	}

	phone_verification(params, success, error){
		this.api.phone_verification(params, success, error);
	}

	phone_verification_finish(params, success, error){
		this.api.phone_verification_finish(params, success, error);
	}

	email_verification(params, success, error){
		this.api.email_verification(params, success, error);
	}

	email_verification_status(token, success, error){
		this.api.email_verification_status(token, success, error);
	}

	new_user(params, success, error){
		this.api.new_user(params, success, error);
	}

	login(params, success, error){
		this.api.login(params, success, error);
	}
}
