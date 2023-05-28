const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 80;

const superherosRouter = require('./routes/api/superheros');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/superheroes', superherosRouter);
// app.get('/', (req, res) => {
//   res.end(`
//     <div>
//         <nav>
//             <ul>
//                 <li>
//                     <a href="/">Home</a>
//                 </li>
//                 <li>
//                     <a href="/about">About</a>
//                 </li>
//             </ul>
//         </nav>
//     </div>
//     <h1>Home page</h1>
//     `);
// });
// app.get('/about', (req, res) => {
//   res.end(`
//     <div>
//         <nav>
//             <ul>
//                 <li>
//                     <a href="/">Home</a>
//                 </li>
//                 <li>
//                     <a href="/about">About</a>
//                 </li>
//             </ul>
//         </nav>
//     </div>
//     <h1>About page</h1>
//     `);
// });

app.listen(PORT, () => {
  console.log(`Server has been started on ${PORT} port`);
});
