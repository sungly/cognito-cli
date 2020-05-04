import minimist from 'minimist';

import init from './init';
import login from './login';
import UserCmd from './user';
import logger from '../util/logger';

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
            logger.info(packageJson.version);
            break;
        case 'help':
            logger.info('help todo');
            break;
        case 'login':
            logger.info('@NOTE: Only user password auth is supported ATM.');
            login();
            break;
        case 'create-user':
            logger.info('Creating user');

            userCmd.createUser();
            break;
        case 'confirm-user':
            logger.info('Confirming user registration with confirmation code');

            userCmd.confirmUserSignup();
            break;
        case 'resend-confirmation-code':
            logger.info('Resending registration confirmation code');

            userCmd.resendConfirmationCode();
            break;
        case 'forgot-password':
            logger.info('Send forgot password');

            userCmd.forgotPassword();
            break;
        case 'set-user-password':
            logger.info('Setting user password');
            logger.warn('*** Requires admin permission ***');

            userCmd.setUserPassword();
            break;
        case 'get-user-profile':
            logger.info('Getting user profile');
            logger.warn('*** Requires admin permission ***');

            userCmd.getUserProfile();
            break;
        case 'verify-user-email':
            logger.info('Verifying user email');
            logger.warn('*** Requires admin permission ***');

            userCmd.verifyUserEmail();
            break;
        case 'disable-user':
            logger.info('Disabling User');
            logger.warn('*** Requires admin permission ***');

            userCmd.disableUser();
            break;
        case 'enable-user':
            logger.info('Enabling User');
            logger.warn('*** Requires admin permission ***');

            userCmd.enableUser();
            break;
        default:
            logger.error(`"${cmd}" is not a valid command!`);
            break;
    }
};

export default cli;
