eas init
eas build --platform android
cat <<EOF > app.json
{
  "expo": {
    "name": "VibeTube-App",
    "slug": "vibetube-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "assets/*.png",
      "assets/*.jpg",
      "assets/*.jpeg"
    ],
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.sorgemauli.vibetube"
    },
    "sdkVersion": "50.0.0"
  }
}
EOF

cat <<EOF > app.json
{
  "expo": {
    "name": "VibeTube-App",
    "slug": "vibetube-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "assets/*.png",
      "assets/*.jpg",
      "assets/*.jpeg"
    ],
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.sorgemauli.vibetube"
    },
    "sdkVersion": "50.0.0"
  }
}
EOF

npx expo start --clear
rm app.json
cat <<EOF > app.json
{
  "expo": {
    "name": "VibeTube-App",
    "slug": "vibetube-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.sorgemauli.vibetube"
    },
    "sdkVersion": "51.0.0"
  }
}
EOF

rm -rf node_modules
rm package-lock.json
npm cache clean --force
npx expo install expo@^51.0.0 react-native@0.74.5 react@18.2.0 --fix
rm -rf node_modules
rm package-lock.json
npm cache clean --force
cat <<EOF > app.json
{
  "expo": {
    "name": "VibeTube-App",
    "slug": "vibetube-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.sorgemauli.vibetube"
    },
    "sdkVersion": "54.0.0"
  }
}
EOF

npm install expo@latest react-native@latest react@latest --save --legacy-peer-deps
npm install @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context --legacy-peer-deps
npx expo start --clear
export EXPO_DEBUG=false
npx expo start --no-dev --clear
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
export EXPO_DEBUG=false
export NODE_ENV=production
npx expo start --no-dev
