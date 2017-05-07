class Context {
	constructor() {
		this.managers = [];
	}
    
	addManager(manager: Manager, managerName: string){
		manager.context = this;
		this.managers.push(manager);
	}

	setDomainManager(manager: Manager){
		this.domainManager = manager;
		this.addManager(manager, 'DomainManager');
	}
}

let ContextSingleton = (function () {
    let instance;

    function createInstance() {
        let object = new Context();
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
    };
})();

export default ContextSingleton.getInstance();
