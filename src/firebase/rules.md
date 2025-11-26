
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    

    function isAdmin() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    match /users/{userId} {

      allow read: if request.auth != null; 

      allow write: if request.auth.uid == userId;
    }


    match /incidents/{incidentId} {

      allow read: if true;

      allow create: if request.auth != null; 

      allow delete: if isAdmin();
      

      allow update: if 
        (request.resource.data.verified != resource.data.verified && isAdmin()) ||
        

        (resource.data.userId == request.auth.uid);
    }
  }
}

service firebase.storage {
  match /b/{bucket}/o {

    match /images/{fileName} {

        allow write: if request.auth != null; 

        allow read: if true;
    }
  }
}