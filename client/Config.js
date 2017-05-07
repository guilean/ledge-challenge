import Context from './managers/Context';
import DomainManager from './managers/DomainManager';

import Api from './domain/API';

Context.setDomainManager(new DomainManager(new Api()));

export default Context;
