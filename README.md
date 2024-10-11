# backendAssignment

## Setup
- Create a `.env` file in the root of this folder `backendAssignment` with the following variables:
```
MONGO_URI=mongodb+srv://<username>:<password>@yourcluster.mongodb.net/assignmentPortal?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
PORT=8080
```
- Install `Node.js` (v16 and above) and it's dependencies by running the command `npm install` in the root folder of this repo
- Run the server using the command `npm start`

## APIs
1. Register a new user or admin -
  - **POST** `/api/register`
  - Body
```
{
  "username": "user1",
  "password": "password123",
  "isAdmin": true
}
```

2. Login to your account -
  - **POST** `/api/login`
  - Body
```
{
  "username": "user1",
  "password": "password123"
}
```

3. Fetch all admins -
  - **GET** `/api/admins`
  - Headers - `Authorization: Bearer <token>`

4. Upload an assignment -
  - **POST** `/api/upload`
  - Headers - `Authorization: Bearer <token>`
  - Body
```
{
  "task": "uploading the assignment to github",
  "admin": "you have to mention the admin id here not admin username"
}
```

5. Fetch all assignments for your admin account -
  - **GET** `/api/assignments`
  - Headers - `Authorization: Bearer <token>`

6. Accept an assignment -
  - **POST** `/api/assignments/:id/accept`
  - Headers - `Authorization: Bearer <token>`

7. Reject an assignment -
  - **POST** `/api/assignments/:id/reject`
  - Headers - `Authorization: Bearer <token>`

