import minimist from 'minimist';

import init from './init';
import login from './login';
import UserCmd from './user';

const userCmd = new UserCmd();

const cli = () => {
    const args = minimist(process.argv.slice(2));
    const cmd = args._[0];

    switch (cmd) {
        case 'init':
            init();
            break;
        case 'version':
            const packageJson = require('../../package.json');
            console.log(packageJson.version);
            break;
        case 'help':
            console.log('help todo');
            break;
        case 'login':
            console.log('@NOTE: Only user password auth is supported ATM.');
            login();
            break;
        case 'create-user':
            console.log('Creating user');

            userCmd.createUser();
            break;
        case 'confirm-user':
            console.log('Confirming user registration with confirmation code');

            userCmd.confirmUserSignup();
            break;
        case 'resend-confirmation-code':
            console.log('Resending registration confirmation code');

            userCmd.resendConfirmationCode();
            break;
        case 'forgot-password':
            console.log('Send forgot password');

            userCmd.forgotPassword();
            break;
        case 'set-user-password':
            console.log('Setting user password');
            console.log('*** Requires admin permission ***');

            userCmd.setUserPassword();
            break;

        case 'get-user-profile':
            console.log('Getting user profile');
            console.log('*** Requires admin permission ***');

            userCmd.getUserProfile();
            break;
        case 'verify-user-email':
            console.log('Verifying user email');
            console.log('*** Requires admin permission ***');

            userCmd.verifyUserEmail();
            break;
        case 'disable-user':
            console.log('Disabling User');
            console.log('*** Requires admin permission ***');

            userCmd.disableUser();
            break;
        case 'enable-user':
            console.log('Enabling User');
            console.log('*** Requires admin permission ***');

            userCmd.enableUser();
            break;
        default:
            console.error(`"${cmd}" is not a valid command!`);
            break;
    }
};

export default cli;
