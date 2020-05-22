# cognito-cli

CLI for Cognito user life cycle management and basic user authentication to retrieve JWTs (access token, id token and refresh token).

`cognito-cli` is a wrapper around [aws-sdk](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#constructor-property) and is intended to make user management easier instead of having to write a script for one time user management during local development.

## Requirements

-   #### AWS credentials

    When interacting with Amazon Cognito, it is a requirement to have aws credentials. There are a few methods available to you for getting these credentials. [Read here](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html).

    Once you have obtained aws access id and aws access secret, save them to ~/.aws/credentials:

    ```
    [default]
    aws_access_key_id=
    aws_secret_access_key=
    ```

-   #### Enable USER_PASSWORD_AUTH on the app client

    General > App client > show details > `Enable SRP (secure remote password) protocol based authentication (ALLOW_USER_SRP_AUTH)`

## Install

Install globally in order to call `cognito-cli` from anywhere:

```
npm install -g @sungly/cognito-cli
```

Add the following to ~/.cognito/config:

```
user_pool_id=
client_id=
client_secret=
region=ca-central-1
requiredAttributeList=["email", "given_name", "family_name"]
```

The `requiredAttributeList` is used for user registration. Make sure to include attributes that are `required` for your user pool.

## Usage

`cognito-cli <command>`

##### Available Commands:

```
init                        # initializing the CLI

login                       # retrieve access, id and refresh token via USER_PASSWORD_AUTH against a specified user pool in the config.

create-user                 # create a user profile using the `requiredAttributeList`

confirm-user                # confirm user registration with a confirmation code

resend-confirmation-user    # resend the confirmation code

forgot-password             # trigger the forgot password flow

### admin calls - Note these calls require additional IAM privileges

set-user-password           # set user with a new password

get-user-profile            # get the user profile from cognito

verify-user-email           # verify user email in order to get emails

disable-user                # disable user from logging in

enable-user                 # allow user to login

batch-delete-user           # delete all users from a user pool

```

##### Other commands

```
decode-token                # decode JSON web tokens

cognito-cli version         # get the cli version

cognito-cli help            # get help instruction
```

## License

[MIT](https://vjpr.mit-license.org/)
