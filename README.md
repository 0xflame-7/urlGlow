# urlGlow

urlGlow/
│── backend/             
│   ├── src/
│   │   ├── config/      
│   │   │   ├── db.js
│   │   │   ├── redis.js
│   │   │   └── logger.js
│   │   ├── models/      
│   │   │   ├── Url.js
│   │   │   ├── User.js
│   │   │   └── Click.js
│   │   ├── routes/      
│   │   │   ├── url.routes.js
│   │   │   ├── user.routes.js
│   │   │   └── stats.routes.js
│   │   ├── controllers/ 
│   │   │   ├── url.controller.js
│   │   │   ├── user.controller.js
│   │   │   └── stats.controller.js
│   │   ├── middleware/  
│   │   │   ├── auth.js
│   │   │   ├── rateLimiter.js
│   │   │   └── errorHandler.js
│   │   ├── services/    
│   │   │   ├── url.service.js
│   │   │   ├── user.service.js
│   │   │   └── stats.service.js
│   │   ├── workers/     
│   │   │   └── clickWorker.js
│   │   ├── utils/       
│   │   │   ├── generateShortId.js
│   │   │   └── validateUrl.js
│   │   ├── app.js       
│   │   └── server.js    
│   ├── tests/           # ✅ Backend tests
│   │   ├── unit/
│   │   │   ├── url.service.test.js
│   │   │   └── user.service.test.js
│   │   ├── integration/
│   │   │   ├── url.routes.test.js
│   │   │   └── user.routes.test.js
│   │   └── setup.js     # e.g., test DB setup
│   ├── docs/            # ✅ API Documentation
│   │   ├── swagger.yaml
│   │   └── postman_collection.json
│   ├── scripts/         # ✅ DevOps / Utilities
│   │   ├── seed.js      # Seed DB with sample data
│   │   ├── backup.js    # Mongo backup script
│   │   └── migrate.js   # Example migration tool
│   ├── package.json
│   └── Dockerfile
│
│── frontend/            
│   ├── public/          
│   ├── src/
│   │   ├── components/  
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── UrlCard.jsx
│   │   ├── pages/       
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Login.jsx
│   │   ├── hooks/       
│   │   │   └── useAuth.js
│   │   ├── context/     
│   │   │   └── AuthContext.jsx
│   │   ├── services/    
│   │   │   ├── urlService.js
│   │   │   ├── userService.js
│   │   │   └── statsService.js
│   │   ├── styles/      
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── tests/           # ✅ Frontend tests
│   │   ├── components/
│   │   │   ├── Navbar.test.jsx
│   │   │   └── UrlCard.test.jsx
│   │   ├── pages/
│   │   │   └── Home.test.jsx
│   │   └── setupTests.js
│   ├── package.json
│   └── Dockerfile
│
│── docker-compose.yml
│── .env                 
│── README.md
│── .gitignore
