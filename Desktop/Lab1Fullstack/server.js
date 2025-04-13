
// Importerar bibliotek

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dishRoutes = require('./dishRoutes');
const cors = require('cors');



dotenv.config(); // Laddar in miljövariabler från .env

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(express.json());// Tillåter JSON-data i förfrågningar
app.use('/api/dishes', dishRoutes);// Använd rutter från dishRoutes

// Anslut till MongoDB

mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Ansluten till MongoDB'))
.catch(err => console.error('❌ Fel vid anslutning:', err));
// Startar servern

app.listen(port, () => {
  console.log(`🚀 Servern körs på http://localhost:${port}`);
});
