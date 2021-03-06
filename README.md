# TwillioAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.7.

    <script defer src="https://media.twiliocdn.com/sdk/js/chat/v4.0/twilio-chat.min.js"></script>
    declare var Twilio;
  
  Create twilio client:-
  
    this.twillioClient = await Twilio.Chat.Client.create('token');
  
  Create and join twilio channel :-
  
      this.twillioClient
          .createChannel({
            uniqueName: `${Date.now()} channel`,
            friendlyName: 'General Chat Channel',
          })
          .then((channel) => {
            this.channel = channel;
            // join channel after channel created
            this.channel.join().catch((err) => {
              console.error(
                `Couldn't join channel` + channel.friendlyName + ' because ' + err
              );
            });
          });
      
      
  Event for input message :-
    
    this.channel.on('messageAdded', (message) => {
          console.log('message received', message);
    });
    
  Method to send message :-
    
    this.channel.sendMessage('hello').then(res => {
      console.log('Message Sent', res);
    });
    
    
## Twilio At Backend Implementaion
    const Twilio = require('twilio');

    getMessageList = ()=>{
    // get chat service instance
    const service = getChatService();
    service.channels('channelId')
          .messages
          .list()
          .then(messages => console.log(messages));
    }


    function getChatService() {
      // Twilio Library
      const client = new Twilio(
        config.TWILIO_API_KEY,
        config.TWILIO_API_SECRET,
        {accountSid: config.TWILIO_ACCOUNT_SID}
      );

      // Get a reference to the user chat service instance
      const service = client.chat.services(
        config.TWILIO_CHAT_SERVICE_SID
      );

      return service;
    }  
    

## Full Story
    Add script to project :-
    <script defer src="assets/js//full-story.js"></script>
    
    Track user by user info, for that you need to register user with unique user id :-
    
        declare var FS;
        FS.identify(userId, {
          displayName: 'userName',
          email: 'user email',
          // TODO: Add your own custom user variables here, details at
          // https://help.fullstory.com/hc/en-us/articles/360020623294-FS-setUserVars-Recording-custom-user-data
          other_custom_variable: 1
        });
        
Full Story Track all the user activity during session including clicks, dead clicks, screen playback, error traces, User trends, top users, session length,
page speed insights also provides funnels to filter our data on the basis of default events and custom fields provided while user register.

## Full story also provides features to create custom events
    FS.event(event name, {
      description: 'desc',
      displayName: 'displayName',
      sku: 123
    });
    
Checkout full story api documentation for more [full story api doc](https://developer.fullstory.com/introduction)
        
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
