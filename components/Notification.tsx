import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function schedulePushNotification(date: Date, activity: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: activity,
      data: { data: "goes here" },
    },
    trigger: { date: date },
  });
}
