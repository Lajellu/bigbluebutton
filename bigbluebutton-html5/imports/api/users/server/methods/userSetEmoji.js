import { publish } from '/imports/api/common/server/helpers';
import { isAllowedTo } from '/imports/startup/server/userPermissions';
import { appendMessageHeader } from '/imports/api/common/server/helpers';

Meteor.methods({
  userSetEmoji(credentials, toRaiseUserId, status) {
    console.log("---imports/api/users/server/methods/userSetEmoji.js---");
    console.log("credentials");
    console.log(credentials);
    console.log("status");
    console.log(status);
    console.log("toRaiseUserId");
    console.log(toRaiseUserId);
    const REDIS_CONFIG = Meteor.settings.redis;
    const { meetingId, requesterUserId, requesterToken } = credentials;
    let message;
    if (isAllowedTo('setEmojiStatus', credentials)) {
      console.log("Was allowed to set emoji status");
      console.log(status);
      message = {
        payload: {
          emoji_status: status,
          userid: toRaiseUserId,
          meeting_id: meetingId,
        },
      };

      message = appendMessageHeader('user_emoji_status_message', message);

      // publish to pubsub
      publish(REDIS_CONFIG.channels.toBBBApps.users, message);
    }
  },
});
