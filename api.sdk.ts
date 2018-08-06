import * as user_interface from './src/modules/user/interface/user.interface' 
import * as user_entity from './src/modules/user/user.entity' 
import * as auth_entity from './src/modules/auth/auth.entity' 
import * as auth_interface from './src/modules/auth/interface/auth.interface' 
 
export default { user: {...user_interface,...user_entity}, auth: {...auth_entity,...auth_interface},  };
