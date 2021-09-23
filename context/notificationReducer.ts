import { schedulePushNotification } from "../components/Notification";

const notificationReducer = (
  state: any,
  { type, payload }: { type: string; payload: string }
) => {
  switch (type) {
    case "ENABLE_NOTIFICATION":
      return {
        ...state,
        notif: true,
      };
    case "DISABLE_NOTIFICATION":
      return {
        ...state,
        notif: false,
      };

    default:
      return state;
  }
};
export default notificationReducer;
