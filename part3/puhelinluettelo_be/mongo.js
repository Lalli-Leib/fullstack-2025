const mongoose = require('mongoose')

const [password, name, number] = process.argv.slice(2)
if (!password || (!!name ^ !!number)) {
  process.exit(1)
}

const uri = `mongodb+srv://fullstack:${encodeURIComponent(password)}@cluster0.5swzkzf.mongodb.net/puhelinluettelo?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

const Person = mongoose.model('Person', new mongoose.Schema({ name: String, number: String }));

(async () => {

  try {
    await mongoose.connect(uri)

    if (!name) {
        const people = await Person.find({})
        console.log('Phonebook:')
        people.forEach(p => console.log(`${p.name} ${p.number}`))
        }
    else {
      await Person.create({ name, number })
      console.log(`Added ${name} number ${number} to phonebook`)
        }
  
    } catch (e) {
    console.error('Error:', e.message)
  } finally {
    await mongoose.connection.close()
  }

})()
