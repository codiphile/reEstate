# reEstate

reEstate is a React Native full-stack application that allows users to list and sell properties. It leverages Appwrite for backend services and Expo for building and running the app.

## Features

- User authentication with OAuth2 (Google)
- List and view properties
- Search and filter properties
- View featured properties
- User profile with avatar

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/reEstate.git
   cd reEstate
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your Appwrite configuration:

   ```env
   EXPO_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
   EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID=your_galleries_collection_id
   EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID=your_reviews_collection_id
   EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID=your_agents_collection_id
   EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID=your_properties_collection_id
   ```

4. Start the development server:
   ```sh
   npm start
   ```

## Scripts

- `npm start`: Start the Expo development server
- `npm run android`: Start the app on an Android emulator or device
- `npm run ios`: Start the app on an iOS simulator or device
- `npm run web`: Start the app in a web browser
- `npm run test`: Run tests with Jest
- `npm run lint`: Run linter

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
Feel free to connect about the project!

## License

This project is licensed under the MIT License.
