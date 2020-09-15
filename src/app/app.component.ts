import { Component, OnInit } from '@angular/core';
import { TwillioChatService } from './services/twillio-chat.service';
declare var Twilio;
declare var FS;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'twillio-angular';
  token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2M3OWRiMGUxOGZmNzBiYjZmZGExNzMwNGFiMzNkNTliLTE2MDAwOTA2NTgiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJXaWNrZWRVbHlzc2VzRGF2ZW5wb3J0IiwidmlkZW8iOnt9LCJjaGF0Ijp7InNlcnZpY2Vfc2lkIjoiSVMxN2VhMWY5NzJkNzA0ZDFmYmU4NWQ0YWNjOGRjNTE4NSJ9LCJkYXRhX3N5bmMiOnsic2VydmljZV9zaWQiOiJkZWZhdWx0In19LCJpYXQiOjE2MDAwOTA2NTgsImV4cCI6MTYwMDA5NDI1OCwiaXNzIjoiU0tjNzlkYjBlMThmZjcwYmI2ZmRhMTczMDRhYjMzZDU5YiIsInN1YiI6IkFDODNiNDBmNDI2YzczZDcwNWViN2RhY2E3Y2YwZTJiYTgifQ.C9FldOaT5UkRUP7auWGWkb4JpbzUJD0RF7Bn7Wfm4PA`;
  twillioClient;
  channel;
  constructor(private chatService: TwillioChatService) { }
  ngOnInit(): void {
    this.createClient();
    // Register full story user
    FS.identify('1', {
      displayName: 'Izhar Ahmad',
      email: 'izhar.ahmad@kiwitech.com',
      // TODO: Add your own custom user variables here, details at
      // https://help.fullstory.com/hc/en-us/articles/360020623294-FS-setUserVars-Recording-custom-user-data
      reviewsWritten_int: 1
    });
  }

  async createClient(): Promise<void> {
    this.twillioClient = await Twilio.Chat.Client.create(this.token);
    this.twillioClient
      .createChannel({
        uniqueName: `${Date.now()} channel`,
        friendlyName: 'General Chat Channel',
      })
      .then((channel) => {
        this.channel = channel;
        console.log('Created general channel:');
        console.log(channel);
        // join channel after channel created
        this.channel.join().catch((err) => {
          console.error(
            `Couldn't join channel` + channel.friendlyName + ' because ' + err
          );
        });

        this.channel.on('channelJoined', (joinedChann) => {
          console.log('Joined channel ' + joinedChann.friendlyName);
        });

        // message event
        this.channel.on('messageAdded', (message) => {
          console.log('message received', message);
        });
      });

      // code to fetch messages through channel sid
    // this.twillioClient.Chat.services('AC83b40f426c73d705eb7daca7cf0e2ba8')
    //   .channels('CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    //   .fetch()
    //   .then(channel => console.log(channel.friendlyName));
  }


  sendMessage() {
    // send message to channel
    this.channel.sendMessage('hello').then(res => {
      console.log('Message Sent', res);
    });
  }

}
